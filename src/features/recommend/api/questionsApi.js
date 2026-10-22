// import { http } from "../../../core/api/httpClient";
import { QUESTIONS_MOCK } from "../../../mocks/questions.mock.js";
import { mapQuestion } from "./mappers.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** GET /recommendation/questions -> { questions, meta } */
export async function getQuestions() {
  // const data = await http("/recommendation/questions");   // TODO
  // return { questions: data.questions.map(mapQuestion), meta: {} };
  await wait(700); // MOCK
  return { questions: QUESTIONS_MOCK.questions.map(mapQuestion), meta: QUESTIONS_MOCK.meta };
}

/** POST /recommendation/answers — answers is { [questionId]: [optionId, ...] } */
export async function submitAnswers(answers) {
  // return http("/recommendation/answers", { method: "POST", body: { answers } });   // TODO
  await wait(900); // MOCK
  console.log("MOCK submit answers", answers);
  return { ok: true };
}
