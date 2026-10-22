import Icon from "./Icon.jsx";
import { useReveal } from "../hooks/useReveal.js";

const STEPS = [
  ["Career Discovery", "AI-guided career track & direction", "compass"],
  ["Learning Roadmap", "Adaptive skill modules & paths", "book"],
  ["CV Analysis", "ATS score & skill gap diagnostics", "doc"],
  ["Skill Assessment", "Interactive quizzes & technical challenges", "chart"],
  ["AI Interview", "Multimodal speech & tone simulation", "voice"],
  ["Salary & Offer", "Market compensation & negotiation scripts", "gem"],
];

// Register showcase — steps appear one after another.
export default function JourneySteps() {
  const shown = useReveal(STEPS.length, { start: 500, step: 800 });
  return (
    <div className="journey">
      <span className="chip"><i />YOUR JOURNEY</span>
      <h2>Six steps toward career readiness</h2>
      <p className="lead-text">Your personalized academic-to-industry path designed for Faculty of Science graduates.</p>
      <ol className="timeline">
        {STEPS.map(([title, desc, icon], i) => (
          <li key={title} className={i < shown ? "in" : ""}
            style={{ "--c": `var(--step-${i + 1})`, "--n": `var(--step-${Math.min(i + 2, 6)})` }}>
            <span className="node">{String(i + 1).padStart(2, "0")}</span>
            <div className="step-card">
              <span className="ico"><Icon name={icon} size={18} /></span>
              <div><b>{title}</b><small>{desc}</small></div>
            </div>
          </li>
        ))}
      </ol>
      <div className="journey-foot"><span><i />Faculty of Science Pathway</span><span>Continuous AI Feedback</span></div>
    </div>
  );
}
