import AuthLayout from "../components/AuthLayout.jsx";
import JourneySteps from "../components/JourneySteps.jsx";
import IconField from "../components/IconField.jsx";
import PasswordRules from "../components/PasswordRules.jsx";
import Icon from "../components/Icon.jsx";
import { navigate } from "../../../core/router/useHashRoute.js";
import { useAuthForm } from "../hooks/useAuthForm.js";
import { validateRegister, liveRegisterEmail, liveRegisterName } from "../validation/rules.js";
import { register } from "../api/authApi.js";

export default function RegisterPage({ onNavigate }) {
  const form = useAuthForm({
    initial: { name: "", email: "", password: "", confirm: "", terms: false },
    validate: validateRegister,
    submit: ({ name, email, password }) => register({ name, email, password }),
    liveRules: { email: liveRegisterEmail, name: liveRegisterName },
    onSuccess: (_, v) => navigate(`/verify-email?email=${encodeURIComponent(v.email.trim())}`),
  });
  const { values, errors, set } = form;

  return (
    <AuthLayout showcase={<JourneySteps />}
      title="Create Your Account"
      subtitle="Start building your career readiness with intelligent AI guidance."
      footer={<>Already have an account? <button className="link" onClick={() => onNavigate("login")}>Log in</button></>}
    >
      <form onSubmit={form.handleSubmit} noValidate>
        {form.serverError && <div className="alert" role="alert">{form.serverError}</div>}
        <IconField label="Full Name" icon="user" autoComplete="name" placeholder="Ahmed Ali"
          value={values.name} onChange={set("name")} error={errors.name} />
        <IconField label="Faculty of Science Academic Email" icon="cap" type="email" autoComplete="email"
          placeholder="ahmed@sci.asu.edu.eg"
          hint={
            <span style={{ display: "inline-block", lineHeight: 1.35 }}>
              use your faculty of science email<br />(@sci.asu.edu.eg)
            </span>
          }
          value={values.email} onChange={set("email")} error={errors.email} />
        <IconField label="Create Password" icon="lock" password autoComplete="new-password" placeholder="Enter secure password"
          value={values.password} onChange={set("password")} error={errors.password} />
        <IconField label="Confirm Password" icon="restore" password autoComplete="new-password" placeholder="Re-enter password"
          value={values.confirm} onChange={set("confirm")} error={errors.confirm} />
        <PasswordRules value={values.password} />
        <label className="check terms">
          <input type="checkbox" checked={values.terms} onChange={set("terms")} />
          <span>I agree to the <a href="#" /* TODO: Terms link */>Terms of Service</a> and <a href="#" /* TODO: Privacy link */>Privacy Policy</a>.</span>
        </label>
        {errors.terms && <p className="msg" role="alert">{errors.terms}</p>}
        <button className="btn" disabled={form.loading}>{form.loading ? "Creating account…" : "Create Account"} <Icon name="arrow" size={17} /></button>
      </form>
    </AuthLayout>
  );
}
