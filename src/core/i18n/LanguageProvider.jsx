import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./messages/en.js";
import ar from "./messages/ar.js";

const MESSAGES = { en, ar };
const KEY = "lang";
const Ctx = createContext(null);

const lookup = (obj, path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

function translate(lang, key, vars = {}) {
  const raw = lookup(MESSAGES[lang], key) ?? lookup(MESSAGES.en, key) ?? key;
  return String(raw).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

/** Language state only. Direction (dir/lang) is applied by AppShell, so Login/Register are untouched. */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { const v = localStorage.getItem(KEY); if (v === "ar" || v === "en") return v; } catch { /* ignore */ }
    return "en";
  });
  useEffect(() => { try { localStorage.setItem(KEY, lang); } catch { /* ignore */ } }, [lang]);

  const value = useMemo(() => ({
    lang, setLang,
    dir: lang === "ar" ? "rtl" : "ltr",
    toggle: () => setLang((l) => (l === "ar" ? "en" : "ar")),
    t: (key, vars) => translate(lang, key, vars),
  }), [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
