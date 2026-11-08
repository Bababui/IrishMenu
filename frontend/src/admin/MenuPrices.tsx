import { useEffect, useMemo, useState, type FormEvent } from "react";
import { GROUPS } from "../content/menu";
import { api, ApiError } from "./api";
import { euros, priceField } from "./dates";
import { Pencil } from "./icons";
import type { ToastMessage } from "./Toast";
import type { AdminCategory, AdminItem } from "./types";

/** Menu & prices: find a drink, change its prices. Everything else on the menu stays as it is. */
function MenuPrices({ onToast }: { onToast: (message: ToastMessage) => void }) {
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [items, setItems] = useState<AdminItem[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [group, setGroup] = useState<string>(GROUPS[0].id);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function reload() {
    try {
      const [newCategories, newItems] = await Promise.all([api.categories(), api.items()]);
      setCategories(newCategories);
      setItems(newItems);
      setLoadError(null);
    } catch (error) {
      setLoadError((error as Error).message);
    }
  }

  useEffect(() => {
    let cancelled = false;
    Promise.all([api.categories(), api.items()])
      .then(([newCategories, newItems]) => {
        if (cancelled) return;
        setCategories(newCategories);
        setItems(newItems);
      })
      .catch((error: Error) => {
        if (!cancelled) setLoadError(error.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // What to show: everything matching the search, or else the chosen group, under its headings
  const sections = useMemo(() => {
    if (!categories || !items) return [];
    const query = search.trim().toLowerCase();
    const matches = (item: AdminItem) =>
      query
        ? item.name_en.toLowerCase().includes(query) || (item.name_de ?? "").toLowerCase().includes(query)
        : true;
    return categories
      .filter((category) => query || category.menu_group === group)
      .map((category) => ({
        category,
        items: items.filter((item) => item.category_id === category.id && matches(item)),
      }))
      .filter((section) => section.items.length > 0);
  }, [categories, items, group, search]);

  if (loadError && !items) {
    return (
      <div className="notice notice-error" role="alert">
        <p>{loadError}</p>
        <button type="button" className="button button-secondary" onClick={reload}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      <h1 className="page-title">Menu &amp; prices</h1>

      <div className="field menu-search">
        <label htmlFor="menu-search" className="field-label">
          Find a drink or dish
        </label>
        <input
          id="menu-search"
          className="input"
          type="search"
          placeholder="For example: Guinness"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {!search.trim() && (
        <div className="groups" role="group" aria-label="Part of the menu">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              className="group-button"
              aria-pressed={group === g.id}
              onClick={() => {
                setGroup(g.id);
                setEditingId(null);
              }}
            >
              {g.label.en}
            </button>
          ))}
        </div>
      )}

      {items === null ? (
        <div className="rows rows-loading" aria-label="Loading">
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      ) : sections.length === 0 ? (
        <p className="empty">Nothing on the menu matches “{search.trim()}”. Check the spelling or try a shorter word.</p>
      ) : (
        sections.map(({ category, items: sectionItems }) => (
          <section key={category.id} className="menu-section" aria-labelledby={`cat-${category.id}`}>
            <h2 id={`cat-${category.id}`} className="menu-heading">
              {category.label_en}
            </h2>
            <ul className="rows">
              {sectionItems.map((item) =>
                editingId === item.id ? (
                  <PriceEditor
                    key={item.id}
                    item={item}
                    onCancel={() => setEditingId(null)}
                    onSaved={async (message) => {
                      setEditingId(null);
                      await reload();
                      onToast(message);
                    }}
                    reload={reload}
                  />
                ) : (
                  <li key={item.id} className="row price-row">
                    <div className="row-main">
                      <p className="row-title">{item.name_en}</p>
                      {item.name_de && <p className="row-german">German: {item.name_de}</p>}
                    </div>
                    <dl className="sizes">
                      {item.servings.map((serving) => (
                        <div key={serving.id} className="size">
                          <dt>{serving.label_en ?? "Price"}</dt>
                          <dd>{euros(serving.price)}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="row-actions">
                      <button type="button" className="button button-quiet" onClick={() => setEditingId(item.id)}>
                        <Pencil className="icon" />
                        Change price{item.servings.length > 1 ? "s" : ""}
                      </button>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </section>
        ))
      )}
    </>
  );
}

/* ---------- One item in edit mode: a price field per size ---------- */

function PriceEditor({
  item,
  onCancel,
  onSaved,
  reload,
}: {
  item: AdminItem;
  onCancel: () => void;
  onSaved: (message: ToastMessage) => void;
  reload: () => Promise<void>;
}) {
  const [values, setValues] = useState(() => item.servings.map((serving) => priceField(serving.price)));
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);

  async function save(event: FormEvent) {
    event.preventDefault();
    const changed = item.servings
      .map((serving, i) => ({ serving, value: values[i].trim() }))
      .filter(({ serving, value }) => value !== priceField(serving.price));
    if (changed.length === 0) {
      onCancel();
      return;
    }

    setBusy(true);
    const newErrors: Record<number, string> = {};
    const saved: typeof changed = [];
    for (const change of changed) {
      try {
        await api.changePrice(change.serving.id, change.value);
        saved.push(change);
      } catch (error) {
        newErrors[change.serving.id] = (error as ApiError).fields.price ?? (error as ApiError).message;
      }
    }
    setBusy(false);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (saved.length > 0) await reload();
      return;
    }
    onSaved({
      text: `New price${saved.length > 1 ? "s" : ""} for ${item.name_en} saved. Guests see ${saved.length > 1 ? "them" : "it"} now.`,
      action: {
        label: "Undo",
        run: async () => {
          for (const change of saved) await api.changePrice(change.serving.id, change.serving.price);
          await reload();
        },
      },
    });
  }

  return (
    <li className="row price-row editing">
      <form className="price-form" onSubmit={save} noValidate>
        <p className="row-title">{item.name_en}</p>
        <div className="price-fields">
          {item.servings.map((serving, i) => {
            const id = `price-${serving.id}`;
            const error = errors[serving.id];
            return (
              <div key={serving.id} className="field" data-width="short">
                <label htmlFor={id} className="field-label">
                  {serving.label_en ?? "Price"}
                </label>
                <p className="field-hint">Now {euros(serving.price)}</p>
                <div className="input-wrap">
                  <input
                    id={id}
                    className="input"
                    inputMode="decimal"
                    autoFocus={i === 0}
                    value={values[i]}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    onChange={(event) => {
                      const next = [...values];
                      next[i] = event.target.value;
                      setValues(next);
                    }}
                  />
                  <span className="input-suffix">€</span>
                </div>
                {error && (
                  <p id={`${id}-error`} className="field-error">
                    {error}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="form-actions">
          <button type="submit" className="button button-primary" disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </button>
          <button type="button" className="button button-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </li>
  );
}

export default MenuPrices;
