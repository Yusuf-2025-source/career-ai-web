import { useState } from "react";
import Icon from "../../auth/components/Icon.jsx";
import Link from "../../../core/router/Link.jsx";
import { useLang } from "../../../core/i18n/LanguageProvider.jsx";
import { pickText, pickList } from "../../../core/i18n/pickText.js";

export default function TrackCard({ track, index }) {
  const { lang, t } = useLang();
  const [flipped, setFlipped] = useState(false);
  const [showDemand, setShowDemand] = useState(false);

  const name = pickText(track.name, lang);
  const nonFormalDesc = pickText(track.nonFormalDescription, lang);
  const formalDesc = pickText(track.formalDescription, lang);
  const whatItDoes = pickText(track.whatItDoes, lang);
  const bestSkills = pickList(track.bestSkills, lang);

  return (
    <div
      className={`track-card-scene ${flipped ? "is-flipped" : ""}`}
      style={{ "--c": `var(--step-${(index % 6) + 1})` }}
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
            setFlipped((v) => !v);
          }
        }
      }}
      tabIndex={0}
      role="region"
      aria-label={`${name} card - hover or press to flip`}
    >
      <div className="track-card-3d">
        {/* FRONT: Compact Card (Logo, Name, Non-Formal Description) */}
        <article className="track-card-face track-card-front" aria-labelledby={`track-front-${track.id}`}>
          <div className="track-front-glow" />
          <div className="track-front-icon">
            <span className="track-icon-badge">
              <Icon name={track.icon} size={26} />
            </span>
          </div>

          <h2 id={`track-front-${track.id}`} className="track-front-name">
            {name}
          </h2>

          <p className="track-front-desc">
            {nonFormalDesc}
          </p>

          <div className="track-front-footer">
            <span className="track-flip-hint">
              <Icon name="restore" size={14} />
              {t("tracks.hoverHint")}
            </span>
          </div>
        </article>

        {/* BACK: Expanded Rich Card (Name, Formal Desc, What It Does, Best Skills) */}
        <article className="track-card-face track-card-back" aria-labelledby={`track-back-${track.id}`}>
          <div className="track-back-glow" />

          <div className="track-back-header">
            <div className="track-back-title-wrap">
              <span className="track-icon-mini">
                <Icon name={track.icon} size={20} />
              </span>
              <h2 id={`track-back-${track.id}`} className="track-back-name">
                {name}
              </h2>
            </div>
            <span className="track-back-badge">{index + 1}</span>
          </div>

          <div className="track-back-body">
            {/* Description Formal */}
            <section className="track-back-block">
              <h3 className="track-section-label">
                <Icon name="doc" size={14} />
                {t("tracks.formalDesc")}
              </h3>
              <p className="track-desc-formal">{formalDesc}</p>
            </section>

            {/* What it does */}
            <section className="track-back-block">
              <h3 className="track-section-label">
                <Icon name="target" size={14} />
                {t("tracks.whatItDoes")}
              </h3>
              <p className="track-what-it-does">{whatItDoes}</p>
            </section>

            {/* Best Skills */}
            <section className="track-back-block">
              <h3 className="track-section-label">
                <Icon name="star" size={14} />
                {t("tracks.bestSkills")}
              </h3>
              <div className="tags track-skills-tags">
                {bestSkills.map((skill) => (
                  <span className="tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="track-back-foot">
            <div className="track-card-actions">
              <Link className="btn inline track-explore-btn" to={`/tracks/${track.id}`} onClick={(e) => e.stopPropagation()}>
                {t("tracks.roadmap")} <Icon name="arrow" size={16} />
              </Link>
              <button className="btn inline track-demand-btn" type="button" onClick={(e) => { e.stopPropagation(); setShowDemand((value) => !value); }}>
                {t("tracks.marketDemand")}
              </button>
            </div>
            {showDemand && <div className="track-demand-popover" role="status">{t("tracks.marketDemandLabel")}: <strong>{track.marketDemand ?? 80}%</strong></div>}
          </div>
        </article>
      </div>
    </div>
  );
}
