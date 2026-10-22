// Backend text may be a plain string or { en, ar }. These helpers make the UI work with both.
export function pickText(value, lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? Object.values(value)[0] ?? "";
}
export function pickList(value, lang) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return value[lang] ?? value.en ?? [];
  return [];
}
