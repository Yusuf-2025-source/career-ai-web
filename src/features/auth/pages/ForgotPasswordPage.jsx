import { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import TipsPanel from "../components/TipsPanel.jsx";
import IconField from "../components/IconField.jsx";
import Icon from "../components/Icon.jsx";
import { useAuthForm } from "../hooks/useAuthForm.js";
import { validateForgot, liveUniversityEmail } from "../validation/rules.js";
import { forgotPassword } from "../api/authApi.js";

/** US-04 step 1 — ask for the university email, then tell the user to check their inbox. */
export default function ForgotPasswordPage({ onNavigate }) {
  const [sentTo, setSentTo] = useState(null);
  const [resent, setResent] = useState(false);
  const form = useAuthForm({
    initial: { email: "" },
    validate: validateForgot,
    submit: ({ email }) => forgotPassword({ email: email.trim() }),
    liveRules: { email: liveUniversityEmail },
    onSuccess: (_, v) => setSentTo(v.email.trim()),
  });
  const { values, errors, set } = form;
  const back = <button className="link" onClick={() => onNavigate("login")}>Back to log in</button>;

  if (sentTo) {
    return (
      <AuthLayout showcase={<TipsPanel />} title="Check Your Inbox"
        subtitle={`If an account exists for ${sentTo}, we sent a link to reset your password. It may take a minute to arrive.`}
        footer={back}>
        <button className="btn" onClick={async () => { await forgotPassword({ email: sentTo }); setResent(true); }}>
          Resend email <Icon name="arrow" size={17} />
        </button>
        {resent && <p className="ok-line" role="status"><Icon name="check" size={16} />Email sent again.</p>}
        {/* Demo helper — only in `npm run dev`, so you can see the next screen without a backend. Never ships in the build. */}
        {import.meta.env.DEV && (
          <p className="muted-p" style={{ marginTop: 18 }}>
            Dev only: <a className="link" href="#/reset-password?token=demo-token">open the reset page</a>
          </p>
        )}
      </AuthLayout>
    );
  }

  return (
    <AuthLayout showcase={<TipsPanel />} title="Forgot Your Password?"
      subtitle="Enter your university email and we'll send you a link to reset it." footer={back}>
      <form onSubmit={form.handleSubmit} noValidate>
        {form.serverError && <div className="alert" role="alert">{form.serverError}</div>}
        <IconField label="University Email" icon="mail" type="email" autoComplete="email"
          placeholder="30599061781594@sci.asu.edu.eg" value={values.email} onChange={set("email")} error={errors.email} />
        <button className="btn grad" disabled={form.loading}>{form.loading ? "Sending…" : "Send Reset Link"} <Icon name="arrow" size={17} /></button>
      </form>
    </AuthLayout>
  );
}
