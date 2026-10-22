import Icon from "../features/auth/components/Icon.jsx";

/** Empty / error / not-found block. */
export default function StateMessage({ tone = "neutral", icon = "info", title, desc, action }) {
  return (
    <div className="state" role={tone === "error" ? "alert" : "status"}
      style={{ "--c": tone === "error" ? "var(--danger)" : "var(--primary)" }}>
      <span className="ico lg"><Icon name={icon} size={24} /></span>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
      {action}
    </div>
  );
}
