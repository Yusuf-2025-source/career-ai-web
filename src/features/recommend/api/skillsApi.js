// import { http } from "../../../core/api/httpClient";
import { SKILLS_MOCK } from "../../../mocks/skills.mock.js";
import { TRACKS_MOCK } from "../../../mocks/tracks.mock.js";
import { mapSkill, mapRecommendation } from "./mappers.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** GET /skills */
export async function getSkills() {
  // const data = await http("/skills");           // TODO
  // return data.map(mapSkill);
  await wait(600); // MOCK
  return SKILLS_MOCK.map(mapSkill);
}

/** POST /recommendation/skills — skills is [{ id, custom }]. Returns { results, mock? } */
export async function submitSkills(skills) {
  // const data = await http("/recommendation/skills", { method: "POST", body: { skills } });  // TODO
  // return { results: data.results.map(mapRecommendation) };
  await wait(900); // MOCK — fixed placeholder list, NOT a recommendation. Does not use `skills`.
  console.log("MOCK submit skills", skills);
  return {
    mock: true,
    results: TRACKS_MOCK.slice(0, 3).map((t) => mapRecommendation({ trackId: t.id, name: t.name, description: t.summary, icon: t.icon })),
  };
}
