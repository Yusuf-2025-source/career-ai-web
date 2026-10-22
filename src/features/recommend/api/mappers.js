// Backend DTO -> UI model. Adjust here when the real response format is provided.
export const mapQuestion = (dto) => ({
  id: String(dto.id),
  type: dto.type === "multiple" ? "multiple" : "single",
  required: dto.required !== false,
  maxSelect: dto.maxSelect ?? null,
  text: dto.text ?? dto.question,
  options: (dto.options ?? []).map((o) => ({ id: String(o.id), label: o.label ?? o.text })),
});
export const mapSkill = (dto) => ({ id: String(dto.id), label: dto.label ?? dto.name });
export const mapRecommendation = (dto) => ({
  trackId: dto.trackId ?? dto.id ?? null,
  icon: dto.icon || "compass",
  name: dto.name,
  description: dto.description ?? dto.summary ?? "",
  explanation: dto.explanation ?? dto.reason ?? null, // optional "why this track" text
});
