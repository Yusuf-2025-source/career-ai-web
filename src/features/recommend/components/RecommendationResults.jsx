import Link from "../../../core/router/Link.jsx";
import StateMessage from "../../../components/StateMessage.jsx";
import { useLang } from "../../../core/i18n/LanguageProvider.jsx";
import { pickText } from "../../../core/i18n/pickText.js";
import Icon from "../../auth/components/Icon.jsx";

/** Renders whatever the API returns: name, description and (when present) an explanation. */
export default function RecommendationResults({ data }) {
  const { t, lang } = useLang();
  return (
    <section className="results-wrap" aria-labelledby="results-title">
      <h2 id="results-title">{t("skills.resultsTitle")}</h2>
      {data.results.length === 0 ? <StateMessage icon="compass" title={t("skills.noResults")} /> : (
        <ul className="results">
          {data.results.map((r, i) => (
            <li key={r.trackId ?? i}>
              <article className="track-card" style={{ "--c": `var(--step-${(i % 6) + 1})` }}>
                <div className="track-top"><span className="ico lg"><Icon name={r.icon} size={22} /></span><h3>{pickText(r.name, lang)}</h3></div>
                {r.description && <p className="sum">{pickText(r.description, lang)}</p>}
                {r.explanation && <div className="block"><h3>{t("skills.why")}</h3><p className="sum">{pickText(r.explanation, lang)}</p></div>}
                {r.trackId && <div className="card-foot"><Link className="btn ghost" to={`/tracks/${r.trackId}`}>{t("skills.view")} <span className="flip"><Icon name="arrow" size={17} /></span></Link></div>}
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
