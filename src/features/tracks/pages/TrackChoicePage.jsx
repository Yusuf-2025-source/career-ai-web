import { useLang } from "../../../core/i18n/LanguageProvider.jsx";
import Link from "../../../core/router/Link.jsx";
import Icon from "../../auth/components/Icon.jsx";

const choices = [
  { key: "known", icon: "target", to: "/tracks" },
  { key: "questions", icon: "compass", to: "/recommend/questions" },
  { key: "skills", icon: "star", to: "/recommend/skills" },
];

export default function TrackChoicePage({ onKnownTrack }) {
  const { t } = useLang();

  return (
    <div className="track-choice">
      <div className="track-choice-head">
        <h1>{t("trackChoice.title")}</h1>
        <p>{t("trackChoice.intro")}</p>
      </div>
      <div className="track-choice-grid">
        {choices.map((choice) => (
          <article className="track-choice-card" key={choice.key}>
            <span className="track-choice-icon"><Icon name={choice.icon} size={34} /></span>
            <h2>{t(`trackChoice.${choice.key}Title`)}</h2>
            <p>{t(`trackChoice.${choice.key}Desc`)}</p>
            {choice.key === "known" && onKnownTrack ? (
              <button className="btn inline" type="button" onClick={onKnownTrack}>
                {t(`trackChoice.${choice.key}Action`)} <span className="flip"><Icon name="arrow" size={17} /></span>
              </button>
            ) : (
              <Link className="btn inline" to={choice.to}>
                {t(`trackChoice.${choice.key}Action`)} <span className="flip"><Icon name="arrow" size={17} /></span>
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
