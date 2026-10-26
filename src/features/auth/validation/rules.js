// Faculty of Science email: a person's name or a 14-digit National ID @sci.asu.edu.eg.
const PERSON_EMAIL = /^[a-z]+(?:[._-][a-z]+)*@sci\.asu\.edu\.eg$/i;
const ACADEMIC_EMAIL = /^\d{14}@sci\.asu\.edu\.eg$/;
const UNIVERSITY_EMAIL = new RegExp(`(?:${PERSON_EMAIL.source}|${ACADEMIC_EMAIL.source})`, "i");
export const UNIVERSITY_EMAIL_MSG = "Use your faculty of science email (@sci.asu.edu.eg).";
/** Live check while typing: returns an error message, or "" when OK. Empty input is left alone. */
export const liveUniversityEmail = (v = "") => (!v.trim() || UNIVERSITY_EMAIL.test(v.trim()) ? "" : UNIVERSITY_EMAIL_MSG);

// Full name validation: letters (English & Arabic) and spaces only, NO numbers allowed.
const NAME_HAS_NUMBERS = /\d/;
const NAME_LETTERS_ONLY = /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\s'\-]+$/;

export const liveRegisterName = (v = "") => {
  if (!v) return "";
  if (NAME_HAS_NUMBERS.test(v)) return "Full name cannot contain numbers.";
  if (!NAME_LETTERS_ONLY.test(v.trim())) return "Full name can only contain letters and spaces.";
  return "";
};

export const passwordChecks = (pw = "") => [
  { label: "8+ characters", ok: pw.length >= 8 },
  { label: "1 uppercase", ok: /[A-Z]/.test(pw) },
  { label: "1 numeric", ok: /\d/.test(pw) },
  { label: "1 special char", ok: /[^A-Za-z0-9]/.test(pw) },
];

export const liveRegisterEmail = liveUniversityEmail;

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
  if (!name.trim()) {
    e.name = "Enter your full name.";
  } else if (NAME_HAS_NUMBERS.test(name)) {
    e.name = "Full name cannot contain numbers.";
  } else if (!NAME_LETTERS_ONLY.test(name.trim())) {
    e.name = "Full name can only contain letters and spaces.";
  } else if (name.trim().length < 3) {
    e.name = "Please enter your full name (at least 3 letters).";
  }

  if (!email.trim()) e.email = "Enter your academic email.";
  else if (liveRegisterEmail(email)) e.email = liveRegisterEmail(email);
  if (!password) e.password = "Create a password.";
  else if (!passwordChecks(password).every((c) => c.ok)) e.password = "Password doesn't meet all requirements.";
  if (!confirm) e.confirm = "Re-enter your password.";
  else if (confirm !== password) e.confirm = "Passwords do not match.";
  if (!terms) e.terms = "Please accept the Terms of Service and Privacy Policy.";
  return e;
}
