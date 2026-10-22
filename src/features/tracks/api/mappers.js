// Maps a backend track DTO to the UI model. Adjust field names here once the real contract is known.
export function mapTrack(dto) {
  return {
    id: String(dto.id),
    icon: dto.icon || "compass",
    name: dto.name,
    summary: dto.summary ?? dto.description ?? "",
    problems: dto.problems ?? [],
    roles: dto.roles ?? [],
    prerequisites: dto.prerequisites ?? [],
    skills: dto.skills ?? [],
  };
}
