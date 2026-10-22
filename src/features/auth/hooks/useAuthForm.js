import { useState } from "react";

/** Shared form state: values, field errors, server error, loading. */
/** liveRules: { fieldName: (value) => errorMessage | "" } — checked on every keystroke, before submit. */
export function useAuthForm({ initial, validate, submit, onSuccess, liveRules = {} }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((er) => ({ ...er, [key]: liveRules[key]?.(value) || undefined }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setLoading(true);
    try {
      const res = await submit(values);
      onSuccess?.(res, values);
    } catch (err) {
      setServerError(err?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { values, errors, serverError, loading, set, handleSubmit };
}
