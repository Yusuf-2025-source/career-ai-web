import { useState } from "react";
import { useAsync } from "../../../core/hooks/useAsync.js";
import { useLang } from "../../../core/i18n/LanguageProvider.jsx";
import { pickText } from "../../../core/i18n/pickText.js";
import StateMessage from "../../../components/StateMessage.jsx";
import Icon from "../../auth/components/Icon.jsx";
import RecommendationResults from "../components/RecommendationResults.jsx";
import { getSkills, submitSkills } from "../api/skillsApi.js";
import { getTracks } from "../../tracks/api/tracksApi.js";

export default function SkillsPage() {
  const { t, lang } = useLang();
  const { data: skills, loading, error, reload } = useAsync(getSkills, []);
  const { data: tracks } = useAsync(getTracks, []);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);   // [{ id, label, custom? }] — ids are unique (no duplicates)
  const [invalid, setInvalid] = useState(false);
  const [status, setStatus] = useState("idle");   // idle | loading | error | done
  const [results, setResults] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState("");

  const name = (s) => pickText(s.label, lang);
  const q = query.trim().toLowerCase();
  const list = skills ?? [];
  const shown = list.filter((s) => !q || name(s).toLowerCase().includes(q));
  const isSel = (id) => selected.some((s) => s.id === id);
  const exists = q && (list.some((s) => name(s).toLowerCase() === q) || selected.some((s) => name(s).toLowerCase() === q));

  const toggle = (skill) => {
    setInvalid(false);
    setSelected((cur) => (cur.some((s) => s.id === skill.id) ? cur.filter((s) => s.id !== skill.id) : [...cur, skill]));
  };
  const addCustom = () => {
    const label = query.trim();
    setSelected((cur) => (cur.some((s) => s.id === `custom:${label.toLowerCase()}`) ? cur : [...cur, { id: `custom:${label.toLowerCase()}`, label, custom: true }]));
    setQuery(""); setInvalid(false);
  };
  const chooseTrack = (trackId) => {
    setSelectedTrack(trackId);
    const track = tracks?.find((item) => item.id === trackId);
    if (!track) return;
    setSelected(track.skills.en.map((label, index) => ({ id: `${track.id}:${index}`, label })));
    setInvalid(false);
  };
  const submit = async () => {
    if (!selected.length) return setInvalid(true);
    setStatus("loading");
    try { setResults(await submitSkills(selected.map((s) => ({ id: s.id, custom: !!s.custom })))); setStatus("done"); }
    catch { setStatus("error"); }
  };

  let available;
  if (loading) available = <div aria-busy="true" className="pills">{Array.from({ length: 10 }, (_, i) => <span key={i} className="skel" style={{ height: 38, width: 70 + (i % 4) * 22, borderRadius: 999 }} />)}</div>;
  else if (error) available = <StateMessage tone="error" icon="alert" title={t("skills.errorTitle")} desc={t("common.genericError")} action={<button className="btn inline" onClick={reload}><Icon name="refresh" size={17} />{t("common.retry")}</button>} />;
  else if (!list.length) available = <StateMessage icon="star" title={t("skills.emptyTitle")} desc={t("skills.emptyDesc")} />;
  else available = (
    <>
      <div className="pills">
        {shown.map((s) => (
          <button key={s.id} type="button" className="skill" aria-pressed={isSel(s.id)} onClick={() => toggle(s)}>
            <Icon name={isSel(s.id) ? "check" : "plus"} size={15} />{name(s)}
          </button>
        ))}
      </div>
      {!shown.length && !q ? null : !shown.length && <p className="muted-p">{t("skills.noMatch")}</p>}
      {q && !exists && <button type="button" className="skill add" onClick={addCustom}><Icon name="plus" size={15} />{t("skills.addCustom", { q: query.trim() })}</button>}
    </>
  );

  return (
    <>
      <div className="page-head"><h1>{t("skills.title")}</h1><p>{t("skills.intro")}</p></div>
      <div className="skills-layout">
        <section className="panel">
          <label htmlFor="skill-search" className="sr">{t("skills.searchLabel")}</label>
          <div className="control"><span className="lead"><Icon name="search" /></span>
            <input id="skill-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("skills.searchPlaceholder")} autoComplete="off" />
          </div>
          <h2 className="sec-title">{t("skills.available")}</h2>
          {available}
          <h2 className="sec-title">{t("skills.trackSkills")}</h2>
          <label className="track-select-label" htmlFor="track-skill-select">{t("skills.chooseTrack")}</label>
          <select id="track-skill-select" className="track-select" value={selectedTrack} onChange={(event) => chooseTrack(event.target.value)}>
            <option value="">{t("skills.chooseTrackPlaceholder")}</option>
            {(tracks ?? []).map((track) => <option value={track.id} key={track.id}>{pickText(track.name, lang)}</option>)}
          </select>
          {selectedTrack && <div className="track-selected-skills">{selected.map((skill) => <span className="tag" key={skill.id}>{name(skill)}</span>)}</div>}
        </section>

        <aside className="panel sel-panel">
          <div className="sel-head"><h2>{t("skills.selected", { n: selected.length })}</h2>
            {selected.length > 0 && <button type="button" className="link small" onClick={() => setSelected([])}>{t("skills.clear")}</button>}
          </div>
          {selected.length === 0 ? <p className="muted-p">{t("skills.none")}</p> : (
            <ul className="pills" aria-label={t("skills.selected", { n: selected.length })}>
              {selected.map((s) => (
                <li key={s.id} className="chip-sel">{name(s)}
                  <button type="button" onClick={() => toggle(s)} aria-label={t("skills.remove", { name: name(s) })}><Icon name="x" size={14} /></button>
                </li>
              ))}
            </ul>
          )}
          {invalid && <p className="msg" role="alert">{t("skills.invalid")}</p>}
          {status === "error" && <div className="alert" role="alert" style={{ marginTop: 14 }}>{t("skills.submitError")}</div>}
          <button className="btn" onClick={submit} disabled={status === "loading"}>
            {status === "loading" ? t("skills.submitting") : t("skills.submit")} <span className="flip"><Icon name="arrow" size={17} /></span>
          </button>
          {status === "done" && <p className="ok-line" role="status"><Icon name="check" size={15} />{t("skills.sent")}</p>}
        </aside>
      </div>
      {status === "done" && results && <RecommendationResults data={results} />}
    </>
  );
}
