import Icon from "./Icon.jsx";
import { passwordChecks } from "../validation/rules.js";

export default function PasswordRules({ value }) {
  return (
    <ul className="rules" aria-live="polite">
      {passwordChecks(value).map((c) => (
        <li key={c.label} className={c.ok ? "ok" : ""}>
          <span className="dot">{c.ok && <Icon name="check" size={11} />}</span>{c.label}
        </li>
      ))}
    </ul>
  );
}
