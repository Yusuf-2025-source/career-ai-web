import Icon from "./Icon.jsx";
import CareerIllustration from "./CareerIllustration.jsx";
import { useReveal } from "../hooks/useReveal.js";

const TIPS = [
  ["Stay consistent", "Small, regular efforts lead to big results.", "target"],
  ["Keep learning", "New skills open new opportunities.", "book"],
  ["Believe in yourself", "You have what it takes to make it happen.", "star"],
  ["Track your progress", "Celebrate your wins, no matter how small.", "trend"],
];

// Login showcase — tips appear one after another.
export default function TipsPanel() {
  const shown = useReveal(TIPS.length, { start: 500, step: 750 });
  return (
    <div className="hero">
      <div className="hero-main">
        <p className="kicker"><span />Every step counts</p>
        <h2>You’re closer to your <em>dream career</em> 🚀</h2>
        <p className="lead-text">Keep going! Your future is built by the small steps you take today.</p>
        <CareerIllustration />
      </div>
      <div className="tips">
        <h3>Quick Tips for Success</h3>
        {TIPS.map(([title, desc, icon], i) => (
          <div key={title} className={`tip ${i < shown ? "in" : ""}`} style={{ "--c": `var(--tip-${i + 1})` }}>
            <span className="ico"><Icon name={icon} size={19} /></span>
            <div><b>{title}</b><small>{desc}</small></div>
          </div>
        ))}
      </div>
    </div>
  );
}
