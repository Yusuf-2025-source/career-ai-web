// Maps a backend track DTO to the UI model. Adjust field names here once the real contract is known.
export function mapTrack(dto) {
  return {
    id: String(dto.id),
    icon: dto.icon || "compass",
    name: dto.name,
    summary: dto.summary ?? dto.description ?? "",
    nonFormalDescription: dto.nonFormalDescription ?? dto.summary ?? dto.description ?? "",
    formalDescription: dto.formalDescription ?? dto.summary ?? dto.description ?? "",
    whatItDoes: dto.whatItDoes ?? dto.summary ?? "",
    bestSkills: dto.bestSkills ?? dto.skills ?? [],
    problems: dto.problems ?? [],
    roles: dto.roles ?? [],
    prerequisites: dto.prerequisites ?? [],
    skills: dto.skills ?? [],
    marketDemand: dto.marketDemand ?? 80,
    roadmap: dto.roadmap ?? [],
  };
}
