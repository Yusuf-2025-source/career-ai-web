import AuthLayout from "../components/AuthLayout.jsx";
import TipsPanel from "../components/TipsPanel.jsx";
import IconField from "../components/IconField.jsx";
import Icon from "../components/Icon.jsx";
import { useAuthForm } from "../hooks/useAuthForm.js";
import { validateLogin, liveUniversityEmail } from "../validation/rules.js";
import { saveSession, postLoginRoute } from "../../../core/auth/session.js";
import { navigate } from "../../../core/router/useHashRoute.js";
import { login } from "../api/authApi.js";

export default function LoginPage({ onNavigate }) {
  const form = useAuthForm({
    initial: { email: "", password: "", remember: false },
    validate: validateLogin,
    submit: login,
    liveRules: { email: liveUniversityEmail }, // error shows while typing, before pressing Log In
    onSuccess: (res, v) => {
      saveSession(res, v.remember);
      // Known track -> straight to it. First time / unknown track -> tracks selection view.
      navigate(postLoginRoute(res.user));
    },
  });
  const { values, errors, set } = form;

  return (
    <AuthLayout showcase={<TipsPanel />}
      title="Welcome Back"
      subtitle="Continue your journey toward career success."
      footer={<>Don't have an account? <button className="link" onClick={() => onNavigate("register")}>Create one</button></>}
    >
      <form onSubmit={form.handleSubmit} noValidate>
        {form.serverError && <div className="alert" role="alert">{form.serverError}</div>}
        <IconField label="University Email" icon="mail" type="email" autoComplete="email"
          placeholder="30599061781594@sci.asu.edu.eg" value={values.email} onChange={set("email")} error={errors.email} />
        <IconField label="Password" icon="lock" password autoComplete="current-password"
          placeholder="Enter your security credential" value={values.password} onChange={set("password")} error={errors.password} />
        <div className="row-between">
          <label className="check"><input type="checkbox" checked={values.remember} onChange={set("remember")} />Remember me</label>
          <button type="button" className="link" onClick={() => onNavigate("forgot-password")}>Forgot password?</button>
        </div>
        <button className="btn grad" disabled={form.loading}>{form.loading ? "Logging in…" : "Log In"} <Icon name="arrow" size={17} /></button>
      </form>
    </AuthLayout>
  );
}
