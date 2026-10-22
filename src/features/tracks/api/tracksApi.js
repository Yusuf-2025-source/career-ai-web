// import { http } from "../../../core/api/httpClient";
import { TRACKS_MOCK } from "../../../mocks/tracks.mock.js";
import { mapTrack } from "./mappers.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** GET /tracks  — list of career tracks. */
export async function getTracks() {
  // const data = await http("/tracks");           // TODO: connect when the API is ready
  // return data.map(mapTrack);
  await wait(700); // MOCK
  return TRACKS_MOCK.map(mapTrack);
}

/** GET /tracks/:id — one track with full details. Throw { status: 404 } when missing. */
export async function getTrackById(id) {
  // const data = await http(`/tracks/${id}`);     // TODO
  // return mapTrack(data);
  await wait(500); // MOCK
  const found = TRACKS_MOCK.find((t) => t.id === id);
  if (!found) throw { status: 404 };
  return mapTrack(found);
}
