import { useState, type FormEvent } from "react";
import { GROUPS } from "../content/menu";
import { api, ApiError } from "./api";
import { priceField } from "./dates";
import { FormError, GermanPart, TextField } from "./fields";
import { ChevronLeft, Plus, Trash } from "./icons";
import type { AdminCategory, AdminItem, ItemInput } from "./types";

// The codes from the legend on the paper menu: numbers = additives, letters = allergens
const ADDITIVES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const ALLERGENS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

type SizeRow = { key: number; label: string; labelDe: string; price: string };

let nextKey = 1;
const emptySize = (): SizeRow => ({ key: nextKey++, label: "", labelDe: "", price: "" });

type ItemFormProps = {
  categories: AdminCategory[];
  /** The heading he pressed "Add" under, or the item's own heading when changing it */
  categoryId: string;
  /** Set when changing an existing drink or dish ("Change details") */
  item?: AdminItem;
  onCancel: () => void;
  onSaved: (saved: ItemInput) => void;
};

/** The item's sizes as editable lines, or one empty line for a new item. */
function sizesOf(item?: AdminItem): SizeRow[] {
  if (!item) return [emptySize()];
  return item.servings.map((serving) => ({
    key: nextKey++,
    label: serving.label_en ?? "",
    labelDe: serving.label_de ?? "",
    price: priceField(serving.price),
  }));
}

/** Add a new drink or dish, or change the details of one. */
function ItemForm({ categories, categoryId, item, onCancel, onSaved }: ItemFormProps) {
  const [category, setCategory] = useState(item?.category_id ?? categoryId);
  const [name, setName] = useState(item?.name_en ?? "");
  const [nameDe, setNameDe] = useState(item?.name_de ?? "");
  const [description, setDescription] = useState(item?.description_en ?? "");
  const [descriptionDe, setDescriptionDe] = useState(item?.description_de ?? "");
  const [sizes, setSizes] = useState<SizeRow[]>(() => sizesOf(item));
  const [codes, setCodes] = useState<string[]>(item?.codes ?? []);
  const [error, setError] = useState<ApiError | null>(null);
  const [busy, setBusy] = useState(false);

  const categoryLabel = categories.find((c) => c.id === categoryId)?.label_en ?? "";

  function updateSize(key: number, change: Partial<SizeRow>) {
    setSizes((current) => current.map((size) => (size.key === key ? { ...size, ...change } : size)));
  }

  function toggleCode(code: string) {
    setCodes((current) => (current.includes(code) ? current.filter((c) => c !== code) : [...current, code]));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const input: ItemInput = {
      category_id: category,
      name_en: name,
      name_de: nameDe,
      description_en: description,
      description_de: descriptionDe,
      codes,
      servings: sizes.map((size) => ({ label_en: size.label, label_de: size.labelDe, price: size.price })),
    };
    setBusy(true);
    try {
      if (item) await api.updateItem(item.id, input);
      else await api.createItem(input);
      onSaved(input);
    } catch (err) {
      setError(err as ApiError);
      setBusy(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const fieldError = (path: string) => error?.fields[path];

  return (
    <form className="form" onSubmit={submit} noValidate>
      <button type="button" className="link-button back" onClick={onCancel}>
        <ChevronLeft className="icon" />
        Back to the menu
      </button>
      <h1 className="form-title">{item ? `Change ${item.name_en}` : `Add to ${categoryLabel}`}</h1>

      <FormError message={error ? error.message : null} />

      <TextField
        label="Name"
        hint="As it should appear on the menu, for example: Murphy's Irish Stout"
        value={name}
        onChange={setName}
        error={fieldError("name_en")}
        autoFocus={!item}
      />
      <TextField
        label="Short description (optional)"
        hint="For example: Irish stout, creamy"
        value={description}
        onChange={setDescription}
        error={fieldError("description_en")}
      />

      <fieldset className="sizes-editor">
        <legend className="field-label">Sizes and prices</legend>
        <p className="field-hint">One line per size, for example “0,5 l” for “6,50”. Leave the size empty if there is only one price.</p>
        {sizes.map((size, i) => (
          <div key={size.key} className="size-line">
            <TextField
              label={`Size ${sizes.length > 1 ? i + 1 : ""}`.trim()}
              value={size.label}
              onChange={(label) => updateSize(size.key, { label })}
              error={fieldError(`servings.${i}.label_en`) ?? fieldError(`servings.${i}`)}
              width="short"
            />
            <TextField
              label="Price"
              value={size.price}
              onChange={(price) => updateSize(size.key, { price })}
              inputMode="decimal"
              suffix="€"
              error={fieldError(`servings.${i}.price`)}
              width="short"
            />
            {sizes.length > 1 && (
              <button
                type="button"
                className="button button-quiet button-danger size-remove"
                onClick={() => setSizes((current) => current.filter((s) => s.key !== size.key))}
              >
                <Trash className="icon" />
                <span className="visually-hidden">Remove size {i + 1}</span>
              </button>
            )}
          </div>
        ))}
        {fieldError("servings") && <p className="field-error">Please add at least one price.</p>}
        <button
          type="button"
          className="button button-quiet add-size"
          onClick={() => setSizes((current) => [...current, emptySize()])}
        >
          <Plus className="icon" />
          Add another size
        </button>
      </fieldset>

      <fieldset className="codes">
        <legend className="field-label">Allergens and additives (optional)</legend>
        <p className="field-hint">Tick the codes from the legend on the paper menu.</p>
        <p className="codes-label">Additives</p>
        <div className="code-grid">
          {ADDITIVES.map((code) => (
            <button key={code} type="button" className="weekday" aria-pressed={codes.includes(code)} onClick={() => toggleCode(code)}>
              {code}
            </button>
          ))}
        </div>
        <p className="codes-label">Allergens</p>
        <div className="code-grid">
          {ALLERGENS.map((code) => (
            <button key={code} type="button" className="weekday" aria-pressed={codes.includes(code)} onClick={() => toggleCode(code)}>
              {code}
            </button>
          ))}
        </div>
        {fieldError("codes") && <p className="field-error">{fieldError("codes")}</p>}
      </fieldset>

      <div className="field">
        <label htmlFor="item-category" className="field-label">
          Where on the menu?
        </label>
        <select id="item-category" className="input" value={category} onChange={(event) => setCategory(event.target.value)}>
          {GROUPS.map((group) => (
            <optgroup key={group.id} label={group.label.en}>
              {categories
                .filter((c) => c.menu_group === group.id)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label_en}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <GermanPart open={Boolean(nameDe || descriptionDe || sizes.some((size) => size.labelDe))}>
        <TextField label="German name" value={nameDe} onChange={setNameDe} error={fieldError("name_de")} />
        <TextField
          label="German description"
          value={descriptionDe}
          onChange={setDescriptionDe}
          error={fieldError("description_de")}
        />
        {sizes
          .map((size, i) => ({ size, i }))
          .filter(({ size }) => size.label.trim())
          .map(({ size, i }) => (
            <TextField
              key={size.key}
              label={`German name for “${size.label.trim()}”`}
              value={size.labelDe}
              onChange={(labelDe) => updateSize(size.key, { labelDe })}
              error={fieldError(`servings.${i}.label_de`)}
            />
          ))}
      </GermanPart>

      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={busy}>
          {busy ? "Saving…" : item ? "Save changes" : "Add to the menu"}
        </button>
        <button type="button" className="button button-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
