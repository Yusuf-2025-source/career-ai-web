// Client-side session + post-login routing. Frontend only — swap the storage for your real auth later.
const KEY = "session";

export function getSession() {
  try { return JSON.parse(localStorage.getItem(KEY) || sessionStorage.getItem(KEY) || "null"); } catch { return null; }
}

/** remember=true -> survives browser restarts; otherwise only for this tab/session. */
export function saveSession(session, remember = false) {
  try {
    localStorage.removeItem(KEY); sessionStorage.removeItem(KEY);
    (remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(session));
  } catch { /* storage unavailable */ }
}

export function updateSessionUser(patch) {
  const s = getSession();
  if (!s) return;
  const remember = !!localStorage.getItem(KEY);
  saveSession({ ...s, user: { ...s.user, ...patch } }, remember);
}

export function clearSession() {
  try { localStorage.removeItem(KEY); sessionStorage.removeItem(KEY); } catch { /* ignore */ }
}

/**
 * Where to go right after login.
 *  - student already onboarded with a known track  -> straight to that track
 *  - first time / track unknown                    -> the tracks selection view
 * Expected user shape from the API: { email, track: "<trackId>" | null }
 */
export function postLoginRoute(user) {
  const track = user?.track;
  return track ? `/tracks/${encodeURIComponent(track)}` : "/tracks";
}
