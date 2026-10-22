import Icon from "../../auth/components/Icon.jsx";
import { useLang } from "../../../core/i18n/LanguageProvider.jsx";
import { pickText } from "../../../core/i18n/pickText.js";

export default function QuestionCard({ q, selected, onChoose, invalid }) {
  const { lang, t } = useLang();
  const multi = q.type === "multiple";
  const full = multi && q.maxSelect && selected.length >= q.maxSelect;
  const hint = !multi ? t("questions.hintSingle") : q.maxSelect ? t("questions.hintMax", { max: q.maxSelect }) : t("questions.hintMultiple");
  return (
    <section className="panel qcard">
      <h2 id={`q-${q.id}`}>{pickText(q.text, lang)}</h2>
      <p className="q-hint">{hint}{!q.required && <> · {t("questions.optional")}</>}</p>
      <div className="opts" role={multi ? "group" : "radiogroup"} aria-labelledby={`q-${q.id}`}>
        {q.options.map((o) => {
          const sel = selected.includes(o.id);
          const dis = !sel && full;
          return (
            <label key={o.id} className={`opt ${multi ? "" : "radio"} ${sel ? "sel" : ""} ${dis ? "dis" : ""}`}>
              <input type={multi ? "checkbox" : "radio"} name={q.id} checked={sel} disabled={dis} onChange={() => onChoose(q, o.id)} />
              <span className="mark"><Icon name="check" size={13} /></span>
              <span>{pickText(o.label, lang)}</span>
            </label>
          );
        })}
      </div>
      {invalid && <p className="msg" role="alert">{t("questions.required")}</p>}
    </section>
  );
}
