import { useId, useState } from "react";
import Icon from "./Icon.jsx";

/** Labeled input with a leading icon, optional password eye, hint and error. */
export default function IconField({ label, icon, error, hint, password, labelRight, ...input }) {
  const id = useId();
  const [show, setShow] = useState(false);
  return (
    <div className="field">
      <div className="label-row"><label htmlFor={id}>{label}</label>{labelRight}</div>
      <div className={`control ${error ? "err" : ""}`}>
        <span className="lead"><Icon name={icon} /></span>
        <input id={id} aria-invalid={!!error} {...input} type={password ? (show ? "text" : "password") : input.type} />
        {password && (
          <button type="button" className="eye" onClick={() => setShow(!show)} aria-pressed={show} aria-label={show ? "Hide password" : "Show password"}>
            {/* masked (default) = crossed-out eye; revealed = open eye. The icon shows the CURRENT state. */}
            <Icon name={show ? "eye" : "eyeOff"} />
          </button>
        )}
      </div>
      {hint && !error && <p className="hint"><Icon name="info" size={14} />{hint}</p>}
      {error && <p className="msg" role="alert">{error}</p>}
    </div>
  );
}
