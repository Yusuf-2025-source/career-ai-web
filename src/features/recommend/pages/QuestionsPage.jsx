import { useState } from "react";
import { useAsync } from "../../../core/hooks/useAsync.js";
import { useLang } from "../../../core/i18n/LanguageProvider.jsx";
import { pickText } from "../../../core/i18n/pickText.js";
import Link from "../../../core/router/Link.jsx";
import StateMessage from "../../../components/StateMessage.jsx";
import Icon from "../../auth/components/Icon.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import { getQuestions, submitAnswers } from "../api/questionsApi.js";

export default function QuestionsPage() {
  const { t, lang } = useLang();
  const { data, loading, error, reload } = useAsync(getQuestions, []);
  const [step, setStep] = useState(0);            // 0..n-1 = questions, n = review
  const [answers, setAnswers] = useState({});     // { [questionId]: [optionId] }  (kept while navigating)
  const [invalid, setInvalid] = useState(false);
  const [status, setStatus] = useState("idle");   // idle | loading | success | error

  const questions = data?.questions ?? [];
  const total = questions.length;
  const q = questions[step];
  const inReview = total > 0 && step === total;

  const choose = (question, optionId) => {
    setInvalid(false);
    setAnswers((a) => {
      const cur = a[question.id] ?? [];
      if (question.type === "single") return { ...a, [question.id]: [optionId] };
      if (cur.includes(optionId)) return { ...a, [question.id]: cur.filter((x) => x !== optionId) };
      if (question.maxSelect && cur.length >= question.maxSelect) return a;
      return { ...a, [question.id]: [...cur, optionId] };
    });
  };
  const next = () => {
    if (q.required && !answers[q.id]?.length) return setInvalid(true);
    setInvalid(false); setStep((s) => s + 1);
  };
  const submit = async () => {
    setStatus("loading");
    try { await submitAnswers(answers); setStatus("success"); } catch { setStatus("error"); }
  };
  const restart = () => { setAnswers({}); setStep(0); setStatus("idle"); setInvalid(false); };

  const head = (
    <div className="page-head"><h1>{t("questions.title")}</h1><p>{t("questions.intro")}</p>
      {data?.meta?.mock && <p className="notice" style={{ marginTop: 14 }}><Icon name="info" size={16} />{t("questions.sample")}</p>}
    </div>
  );

  let body;
  if (loading) body = <div className="panel" aria-busy="true"><div className="skel" style={{ height: 28, width: "70%" }} />{[0, 1, 2].map((i) => <div key={i} className="skel" style={{ height: 52, marginTop: 14 }} />)}<span className="sr">{t("questions.loading")}</span></div>;
  else if (error) body = <StateMessage tone="error" icon="alert" title={t("questions.errorTitle")} desc={t("common.genericError")} action={<button className="btn inline" onClick={reload}><Icon name="refresh" size={17} />{t("common.retry")}</button>} />;
  else if (!total) body = <StateMessage icon="compass" title={t("questions.emptyTitle")} desc={t("questions.emptyDesc")} />;
  else if (status === "success") body = (
    <StateMessage icon="check" title={t("questions.successTitle")} desc={t("questions.successDesc")}
      action={<div className="row-actions"><Link className="btn inline" to="/recommend/skills">{t("questions.nextStep")} <span className="flip"><Icon name="arrow" size={17} /></span></Link><button className="btn inline ghost" onClick={restart}>{t("questions.restart")}</button></div>} />
  );
  else body = (
    <>
      <ProgressBar value={inReview ? total : step + 1} max={total}
        label={inReview ? t("questions.reviewStep") : t("questions.progress", { n: step + 1, total })} />
      {!inReview ? (
        <>
          <QuestionCard q={q} selected={answers[q.id] ?? []} onChoose={choose} invalid={invalid} />
          <div className="q-nav">
            <button className="btn inline ghost" onClick={() => { setInvalid(false); setStep(step - 1); }} disabled={step === 0}>
              <span className="ar"><Icon name="arrow" size={17} /></span>{t("questions.prev")}
            </button>
            <button className="btn inline" onClick={next}>
              {step === total - 1 ? t("questions.toReview") : t("questions.next")} <span className="flip"><Icon name="arrow" size={17} /></span>
            </button>
          </div>
        </>
      ) : (
        <section className="panel">
          <h2 className="rv-title">{t("questions.reviewTitle")}</h2><p className="muted-p">{t("questions.reviewIntro")}</p>
          <ul className="review">
            {questions.map((qq, i) => {
              const picked = (answers[qq.id] ?? []).map((id) => pickText(qq.options.find((o) => o.id === id)?.label, lang));
              return (
                <li key={qq.id} className="rv-item">
                  <div><div className="rv-q">{pickText(qq.text, lang)}</div><div className="rv-a">{picked.length ? picked.join("، ").replace(/، /g, lang === "ar" ? "، " : ", ") : t("questions.skipped")}</div></div>
                  <button className="link" onClick={() => setStep(i)}>{t("questions.edit")}</button>
                </li>
              );
            })}
          </ul>
          {status === "error" && <div className="alert" role="alert" style={{ marginTop: 16 }}>{t("questions.submitError")}</div>}
          <div className="q-nav">
            <button className="btn inline ghost" onClick={() => setStep(total - 1)} disabled={status === "loading"}><span className="ar"><Icon name="arrow" size={17} /></span>{t("questions.prev")}</button>
            <button className="btn inline" onClick={submit} disabled={status === "loading"}>
              {status === "loading" ? t("questions.submitting") : t("questions.submit")}
            </button>
          </div>
        </section>
      )}
    </>
  );

  return <div className="narrow">{head}<div aria-live="polite">{body}</div></div>;
}
