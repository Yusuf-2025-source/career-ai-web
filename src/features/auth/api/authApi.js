// import { http } from "../../../core/api/httpClient";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// MOCK persistence of "which track did this student choose" — delete with the mocks when the API is ready.
const MOCK_KEY = "mock_user_tracks";
const mockTracks = () => { try { return JSON.parse(localStorage.getItem(MOCK_KEY) || "{}"); } catch { return {}; } };

/** US-03 — Login */
export async function login({ email, password, remember }) {
  // const data = await http("/auth/login", { method: "POST", body: { email, password, remember } });
  // Expected: { token, user }
  // Errors:   401 -> invalid credentials | 403 -> email not verified | 429 -> too many attempts
  // return data;

  await wait(900); // MOCK — remove when the API is connected
  if (password === "wrong") throw { status: 401, message: "Incorrect email or password." };
  // The real API should return the student's saved track (or null on first login) as user.track
  return { token: "mock-token", user: { email, track: mockTracks()[email.trim().toLowerCase()] ?? null } };
}

/** US-01 — Register */
export async function register({ name, email, password }) {
  // const data = await http("/auth/register", { method: "POST", body: { name, email, password } });
  // Expected: 201 { message }  (account created as unverified)
  // Errors:   409 -> email already registered | 422 -> validation errors
  // return data;

  await wait(1100); // MOCK — remove when the API is connected
  if (email === "taken@mail.com") throw { status: 409, message: "This email is already registered." };
  return { message: "Account created" };
}

/** US-02 — Resend verification email (rate limited on the server) */
export async function resendVerification({ email }) {
  // return http("/auth/resend-verification", { method: "POST", body: { email } });
  await wait(600);
  return { message: "Sent" };
}

/** US-02 — Verify 4-digit verification code */
export async function verifyCode({ email, code }) {
  // return http("/auth/verify-code", { method: "POST", body: { email, code } });
  await wait(800);
  if (!code || code.length !== 4) throw { status: 400, message: "Please enter the full 4-digit code." };
  if (code === "0000") throw { status: 400, message: "Invalid or expired verification code. Please request a new one." };
  return { success: true, message: "Email verified successfully!" };
}

/** US-03 — Logout */
export async function logout() {
  // return http("/auth/logout", { method: "POST", token });
}

/** US-04 — Forgot password: email a reset link. Always answer "sent" so we never reveal which emails exist. */
export async function forgotPassword({ email }) {
  // return http("/auth/forgot-password", { method: "POST", body: { email } });
  // Errors: 429 -> too many requests
  await wait(900); // MOCK
  return { message: "If that email exists, a reset link was sent." };
}

/** US-04 — Reset password with the token from the emailed link. */
export async function resetPassword({ token, password }) {
  // return http("/auth/reset-password", { method: "POST", body: { token, password } });
  // Errors: 400/410 -> token invalid or expired | 422 -> weak password
  await wait(900); // MOCK
  if (!token) throw { status: 400, message: "This reset link is invalid or has expired." };
  return { message: "Password updated" };
}

/** Save the student's chosen track (onboarding). */
export async function setMyTrack({ email, trackId }) {
  // return http("/me/track", { method: "PUT", body: { trackId }, token });
  await wait(400); // MOCK
  const all = mockTracks();
  all[email.trim().toLowerCase()] = trackId;
  localStorage.setItem(MOCK_KEY, JSON.stringify(all));
  return { track: trackId };
}
