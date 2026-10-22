// University email: must be an .edu address (also accepts country forms such as .edu.eg).
const UNIVERSITY_EMAIL = /^[^\s@]+@([a-z0-9-]+\.)+edu(\.[a-z]{2})?$/i;
export const UNIVERSITY_EMAIL_MSG = "Use your university email — it must end in .edu";
/** Live check while typing: returns an error message, or "" when OK. Empty input is left alone. */
export const liveUniversityEmail = (v = "") => (!v.trim() || UNIVERSITY_EMAIL.test(v.trim()) ? "" : UNIVERSITY_EMAIL_MSG);
// Faculty of Science academic email: 14-digit National ID @sci.asu.edu.eg  (loosen here if needed)
const ACADEMIC_EMAIL = /^\d{14}@sci\.asu\.edu\.eg$/i;

export const passwordChecks = (pw = "") => [
  { label: "8+ characters", ok: pw.length >= 8 },
  { label: "1 uppercase", ok: /[A-Z]/.test(pw) },
  { label: "1 numeric", ok: /\d/.test(pw) },
  { label: "1 special char", ok: /[^A-Za-z0-9]/.test(pw) },
];

/** Register: must be .edu first, then the faculty's 14-digit ID format. */
export const liveRegisterEmail = (v = "") =>
  !v.trim() ? "" : liveUniversityEmail(v) || (ACADEMIC_EMAIL.test(v.trim()) ? "" : "Use your 14-digit National ID @sci.asu.edu.eg.");

export function validateForgot({ email }) {
  const e = {};
  if (!email.trim()) e.email = "Enter your university email.";
  else if (!UNIVERSITY_EMAIL.test(email.trim())) e.email = UNIVERSITY_EMAIL_MSG;
  return e;
}

export function validateReset({ password, confirm }) {
  const e = {};
  if (!password) e.password = "Create a new password.";
  else if (!passwordChecks(password).every((c) => c.ok)) e.password = "Password doesn't meet all requirements.";
  if (!confirm) e.confirm = "Re-enter your password.";
  else if (confirm !== password) e.confirm = "Passwords do not match.";
  return e;
}

export function validateLogin({ email, password }) {
  const e = {};
  if (!email.trim()) e.email = "Enter your university email.";
  else if (!UNIVERSITY_EMAIL.test(email.trim())) e.email = UNIVERSITY_EMAIL_MSG;
  if (!password) e.password = "Enter your password.";
  return e;
}

export function validateRegister({ name, email, password, confirm, terms }) {
  const e = {};
  if (!name.trim()) e.name = "Enter your full name.";
  if (!email.trim()) e.email = "Enter your academic email.";
  else if (liveRegisterEmail(email)) e.email = liveRegisterEmail(email);
  if (!password) e.password = "Create a password.";
  else if (!passwordChecks(password).every((c) => c.ok)) e.password = "Password doesn't meet all requirements.";
  if (!confirm) e.confirm = "Re-enter your password.";
  else if (confirm !== password) e.confirm = "Passwords do not match.";
  if (!terms) e.terms = "Please accept the Terms of Service and Privacy Policy.";
  return e;
}
