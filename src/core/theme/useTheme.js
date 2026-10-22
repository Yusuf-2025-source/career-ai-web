import { useEffect, useState } from "react";

const KEY = "theme";

export function initTheme() {
  let t;
  try { t = localStorage.getItem(KEY); } catch { /* storage unavailable */ }
  if (t !== "light" && t !== "dark")
    t = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = t;
}

/** Light / dark mode, persisted in localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}
