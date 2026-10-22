import { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import JourneySteps from "../components/JourneySteps.jsx";
import IconField from "../components/IconField.jsx";
import PasswordRules from "../components/PasswordRules.jsx";
import Icon from "../components/Icon.jsx";
import { useAuthForm } from "../hooks/useAuthForm.js";
import { validateReset } from "../validation/rules.js";
import { resetPassword } from "../api/authApi.js";

/** US-04 step 2 — opened from the emailed link:  #/reset-password?token=...  */
export default function ResetPasswordPage({ token, onNavigate }) {
  const [done, setDone] = useState(false);
  const form = useAuthForm({
    initial: { password: "", confirm: "" },
    validate: validateReset,
    submit: ({ password }) => resetPassword({ token, password }),
    onSuccess: () => setDone(true),
  });
  const { values, errors, set } = form;
  const toLogin = <button className="link" onClick={() => onNavigate("login")}>Back to log in</button>;

  if (!token) {
    return (
      <AuthLayout showcase={<JourneySteps />} title="Link Not Valid"
        subtitle="This reset link is missing or has expired. Request a new one and try again." footer={toLogin}>
        <button className="btn" onClick={() => onNavigate("forgot-password")}>Request a new link <Icon name="arrow" size={17} /></button>
      </AuthLayout>
    );
  }
  if (done) {
    return (
      <AuthLayout showcase={<JourneySteps />} title="Password Updated"
        subtitle="Your password was changed. You can log in with the new one now." footer={null}>
        <button className="btn grad" onClick={() => onNavigate("login")}>Go to log in <Icon name="arrow" size={17} /></button>
      </AuthLayout>
    );
  }
  return (
    <AuthLayout showcase={<JourneySteps />} title="Set a New Password"
      subtitle="Choose a strong password you haven't used before." footer={toLogin}>
      <form onSubmit={form.handleSubmit} noValidate>
        {form.serverError && <div className="alert" role="alert">{form.serverError}</div>}
        <IconField label="New Password" icon="lock" password autoComplete="new-password" placeholder="Enter new password"
          value={values.password} onChange={set("password")} error={errors.password} />
        <IconField label="Confirm Password" icon="restore" password autoComplete="new-password" placeholder="Re-enter password"
          value={values.confirm} onChange={set("confirm")} error={errors.confirm} />
        <PasswordRules value={values.password} />
        <button className="btn grad" disabled={form.loading}>{form.loading ? "Saving…" : "Reset Password"} <Icon name="arrow" size={17} /></button>
      </form>
    </AuthLayout>
  );
}
