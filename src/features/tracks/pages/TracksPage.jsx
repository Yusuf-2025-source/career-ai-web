import { useAsync } from "../../../core/hooks/useAsync.js";
import { useLang } from "../../../core/i18n/LanguageProvider.jsx";
import StateMessage from "../../../components/StateMessage.jsx";
import Icon from "../../auth/components/Icon.jsx";
import TrackCard from "../components/TrackCard.jsx";
import { getTracks } from "../api/tracksApi.js";
import TrackChoicePage from "./TrackChoicePage.jsx";

export default function TracksPage() {
  const { t } = useLang();
  const { data, loading, error, reload } = useAsync(getTracks, []);

  let body;
  if (loading) {
    body = (
      <ul className="track-grid" aria-busy="true" aria-label={t("common.loading")}>
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i}><div className="track-card"><div className="skel" style={{ height: 46, width: "60%" }} /><div className="skel" style={{ height: 56 }} /><div className="skel" style={{ height: 80 }} /><div className="skel" style={{ height: 44 }} /></div></li>
        ))}
      </ul>
    );
  } else if (error) {
    body = <StateMessage tone="error" icon="alert" title={t("tracks.errorTitle")} desc={t("common.genericError")}
      action={<button className="btn inline" onClick={reload}><Icon name="refresh" size={17} />{t("common.retry")}</button>} />;
  } else if (!data?.length) {
    body = <StateMessage icon="grid" title={t("tracks.emptyTitle")} desc={t("tracks.emptyDesc")} />;
  } else {
    body = <ul className="track-grid">{data.map((tr, i) => <li key={tr.id}><TrackCard track={tr} index={i} /></li>)}</ul>;
  }

  return (
    <>
      <div className="page-head"><h1>{t("tracks.title")}</h1><p>{t("tracks.intro")}</p></div>
      <div id="track-list">{body}</div>
      <TrackChoicePage onKnownTrack={() => document.getElementById("track-list")?.scrollIntoView({ behavior: "smooth" })} />
    </>
  );
}
