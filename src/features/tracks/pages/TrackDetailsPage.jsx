import { useAsync } from "../../../core/hooks/useAsync.js";
import { useLang } from "../../../core/i18n/LanguageProvider.jsx";
import { pickText, pickList } from "../../../core/i18n/pickText.js";
import Link from "../../../core/router/Link.jsx";
import StateMessage from "../../../components/StateMessage.jsx";
import Icon from "../../auth/components/Icon.jsx";
import { useState } from "react";
import { getSession, updateSessionUser } from "../../../core/auth/session.js";
import { setMyTrack } from "../../auth/api/authApi.js";
import { getTrackById } from "../api/tracksApi.js";

export default function TrackDetailsPage({ id }) {
  const { t, lang } = useLang();
  const { data: track, loading, error, reload } = useAsync(() => getTrackById(id), [id]);

  const [mine, setMine] = useState(() => getSession()?.user?.track === id);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(false);
  const choose = async () => {
    const email = getSession()?.user?.email;
    if (!email) return;
    setSaving(true); setSaveErr(false);
    try { await setMyTrack({ email, trackId: id }); updateSessionUser({ track: id }); setMine(true); }
    catch { setSaveErr(true); } finally { setSaving(false); }
  };

  const back = <Link to="/tracks" className="back"><span className="ar"><Icon name="arrow" size={17} /></span>{t("tracks.backToAll")}</Link>;

  if (loading) return <>{back}<div className="panel" aria-busy="true"><div className="skel" style={{ height: 48, width: "50%" }} /><div className="skel" style={{ height: 120, marginTop: 20 }} /></div></>;
  if (error) {
    const missing = error.status === 404;
    return <>{back}<StateMessage tone="error" icon="alert" title={missing ? t("tracks.notFoundTitle") : t("tracks.errorTitle")}
      desc={missing ? t("tracks.notFoundDesc") : t("common.genericError")}
      action={!missing && <button className="btn inline" onClick={reload}><Icon name="refresh" size={17} />{t("common.retry")}</button>} /></>;
  }

  const list = (v) => pickList(v, lang);
  return (
    <div style={{ "--c": "var(--primary)" }}>
      {back}
      <div className="page-head" style={{ marginTop: 18 }}>
        <div className="hero-row"><span className="ico lg"><Icon name={track.icon} size={24} /></span><h1>{pickText(track.name, lang)}</h1></div>
        <p>{pickText(track.summary, lang)}</p>
        {getSession() && (
          <div style={{ marginTop: 16 }}>
            {mine
              ? <p className="ok-line" role="status"><Icon name="check" size={16} />{t("tracks.isMine")}</p>
              : <button className="btn inline" onClick={choose} disabled={saving}>{t("tracks.setMine")}</button>}
            {saveErr && <p className="msg" role="alert">{t("tracks.saveError")}</p>}
          </div>
        )}
      </div>
      <div className="details">
        <div className="stack">
          <section className="panel"><h2>{t("tracks.solves")}</h2><ul className="bullets">{list(track.problems).map((x) => <li key={x}>{x}</li>)}</ul></section>
          <section className="panel"><h2>{t("tracks.roles")}</h2><div className="tags">{list(track.roles).map((x) => <span className="tag" key={x}>{x}</span>)}</div></section>
          <section className="panel"><h2>{t("tracks.skillsNeeded")}</h2><div className="tags">{list(track.skills).map((x) => <span className="tag" key={x}>{x}</span>)}</div></section>
        </div>
        <aside className="stack">
          <section className="panel"><h2>{t("tracks.prerequisites")}</h2><ul className="bullets">{list(track.prerequisites).map((x) => <li key={x}>{x}</li>)}</ul></section>
          <section className="panel">
            <h2>{t("tracks.nextTitle")}</h2><p className="muted-p">{t("tracks.nextDesc")}</p>
            <div className="cta-col">
              <Link className="btn" to="/recommend/questions">{t("tracks.ctaQuestions")} <span className="flip"><Icon name="arrow" size={17} /></span></Link>
              <Link className="btn ghost" to="/recommend/skills">{t("tracks.ctaSkills")}</Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
