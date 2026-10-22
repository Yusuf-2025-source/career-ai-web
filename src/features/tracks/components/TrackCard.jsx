import Icon from "../../auth/components/Icon.jsx";
import Link from "../../../core/router/Link.jsx";
import { useLang } from "../../../core/i18n/LanguageProvider.jsx";
import { pickText, pickList } from "../../../core/i18n/pickText.js";

export default function TrackCard({ track, index }) {
  const { lang, t } = useLang();
  const name = pickText(track.name, lang);
  return (
    <article className="track-card" style={{ "--c": `var(--step-${(index % 6) + 1})` }} aria-labelledby={`track-${track.id}`}>
      <div className="track-top">
        <span className="ico lg"><Icon name={track.icon} size={22} /></span>
        <h2 id={`track-${track.id}`}>{name}</h2>
      </div>
      <p className="sum">{pickText(track.summary, lang)}</p>
      <div className="block">
        <h3>{t("tracks.solves")}</h3>
        <ul className="bullets">{pickList(track.problems, lang).slice(0, 2).map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
      <div className="block">
        <h3>{t("tracks.roles")}</h3>
        <div className="tags">{pickList(track.roles, lang).map((x) => <span className="tag" key={x}>{x}</span>)}</div>
      </div>
      <div className="block">
        <h3>{t("tracks.prerequisites")}</h3>
        <div className="tags">{pickList(track.prerequisites, lang).map((x) => <span className="tag plain" key={x}>{x}</span>)}</div>
      </div>
      <div className="card-foot">
        <Link className="btn ghost" to={`/tracks/${track.id}`} aria-label={`${t("tracks.explore")}: ${name}`}>
          {t("tracks.explore")} <span className="flip"><Icon name="arrow" size={17} /></span>
        </Link>
      </div>
    </article>
  );
}
