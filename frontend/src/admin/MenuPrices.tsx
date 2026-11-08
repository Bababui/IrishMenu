import { useEffect, useMemo, useState, type FormEvent } from "react";
import { GROUPS } from "../content/menu";
import { api, ApiError } from "./api";
import { euros, priceField } from "./dates";
import ItemForm from "./ItemForm";
import { ChevronDown, Pencil, Plus, PriceTag, Trash } from "./icons";
import type { ToastMessage } from "./Toast";
import type { AdminCategory, AdminItem, ItemInput } from "./types";

/** Menu & prices: the menu like guests see it, with prices to change, items to add and remove. */
function MenuPrices({ onToast }: { onToast: (message: ToastMessage) => void }) {
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [items, setItems] = useState<AdminItem[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [group, setGroup] = useState<string>(GROUPS[0].id);
  // Which heading is folded open, like on the guest page. Only one at a time.
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  // Set while the "Add" or "Change details" form fills the screen
  const [form, setForm] = useState<{ categoryId: string; item?: AdminItem } | null>(null);

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

  const query = search.trim().toLowerCase();

  // Searching shows every match at once; otherwise the chosen group's headings
  const sections = useMemo(() => {
    if (!categories || !items) return [];
    const matches = (item: AdminItem) =>
      !query || item.name_en.toLowerCase().includes(query) || (item.name_de ?? "").toLowerCase().includes(query);
    return categories
      .filter((category) => (query ? true : category.menu_group === group))
      .map((category) => ({
        category,
        items: items.filter((item) => item.category_id === category.id && matches(item)),
      }))
      .filter((section) => (query ? section.items.length > 0 : true));
  }, [categories, items, group, query]);

  function chooseGroup(id: string) {
    setGroup(id);
    setOpenCategory(null);
    setEditingId(null);
  }

  function toggle(categoryId: string) {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
    setEditingId(null);
  }

  async function remove(item: AdminItem) {
    try {
      await api.deleteItem(item.id);
      await reload();
      onToast({
        text: `“${item.name_en}” removed from the menu.`,
        action: {
          label: "Undo",
          run: async () => {
            await api.createItem(itemInput(item));
            await reload();
          },
        },
      });
    } catch (error) {
      onToast({ text: (error as ApiError).message });
    }
  }

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

  if (form && categories) {
    const before = form.item;
    return (
      <ItemForm
        key={before?.id ?? form.categoryId}
        categories={categories}
        categoryId={form.categoryId}
        item={before}
        onCancel={() => setForm(null)}
        onSaved={async (saved) => {
          await reload();
          const category = categories.find((c) => c.id === saved.category_id);
          if (category) {
            setGroup(category.menu_group);
            setOpenCategory(category.id);
          }
          setForm(null);
          window.scrollTo({ top: 0 });
          if (!before) {
            setSearch("");
            onToast({ text: `“${saved.name_en.trim()}” added to the menu. Guests see it now.` });
            return;
          }
          onToast({
            text: `Changes to “${saved.name_en.trim()}” saved. Guests see them now.`,
            action: {
              label: "Undo",
              run: async () => {
                await api.updateItem(before.id, itemInput(before));
                await reload();
              },
            },
          });
        }}
      />
    );
  }

  const renderItem = (item: AdminItem) =>
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
          {item.description_en && <p className="row-detail">{item.description_en}</p>}
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
            <PriceTag className="icon" />
            Change price{item.servings.length > 1 ? "s" : ""}
          </button>
          <button
            type="button"
            className="button button-quiet"
            onClick={() => setForm({ categoryId: item.category_id, item })}
          >
            <Pencil className="icon" />
            Change details
          </button>
          <button type="button" className="button button-quiet button-danger" onClick={() => remove(item)}>
            <Trash className="icon" />
            Remove
          </button>
        </div>
      </li>
    );

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

      {!query && (
        <div className="groups" role="group" aria-label="Part of the menu">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              className="group-button"
              aria-pressed={group === g.id}
              onClick={() => chooseGroup(g.id)}
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
      ) : query ? (
        sections.length === 0 ? (
          <p className="empty search-empty">
            Nothing on the menu matches “{search.trim()}”. Check the spelling or try a shorter word.
          </p>
        ) : (
          sections.map(({ category, items: found }) => (
            <section key={category.id} className="menu-section" aria-labelledby={`cat-${category.id}`}>
              <h2 id={`cat-${category.id}`} className="menu-heading">
                {category.label_en}
              </h2>
              <ul className="rows">{found.map(renderItem)}</ul>
            </section>
          ))
        )
      ) : (
        <div className="folds">
          {sections.map(({ category, items: inCategory }) => {
            const isOpen = openCategory === category.id;
            const panelId = `fold-${category.id}`;
            return (
              <section key={category.id} className="fold" data-open={isOpen || undefined}>
                <h2 className="fold-title">
                  <button
                    type="button"
                    className="fold-toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(category.id)}
                  >
                    <span>
                      {category.label_en}
                      <span className="fold-count">{inCategory.length}</span>
                    </span>
                    <ChevronDown className="fold-chevron" />
                  </button>
                </h2>
                {isOpen && (
                  <div id={panelId} className="fold-panel">
                    {inCategory.length > 0 ? (
                      <ul className="rows">{inCategory.map(renderItem)}</ul>
                    ) : (
                      <p className="empty">Nothing here yet.</p>
                    )}
                    <button type="button" className="button button-primary fold-add" onClick={() => setForm({ categoryId: category.id })}>
                      <Plus className="icon" />
                      Add to {category.label_en}
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}

/** An item as the backend expects it back: used by "Undo". */
function itemInput(item: AdminItem): ItemInput {
  return {
    category_id: item.category_id,
    name_en: item.name_en,
    name_de: item.name_de,
    description_en: item.description_en,
    description_de: item.description_de,
    codes: item.codes,
    servings: item.servings.map((s) => ({ label_en: s.label_en, label_de: s.label_de, price: s.price })),
  };
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
