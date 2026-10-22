import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function AuthLayout({ title, subtitle, children, footer, showcase }) {
  return (
    <div className="auth">
      <ThemeToggle />
      <section className="left">
        <Logo />
        <div className="form-wrap">
          <h1>{title}</h1>
          <p className="sub">{subtitle}</p>
          {children}
          <p className="switch">{footer}</p>
        </div>
      </section>
      <aside className="right">{showcase}</aside>
    </div>
  );
}
