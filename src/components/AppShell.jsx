import Logo from "../features/auth/components/Logo.jsx";
import ThemeToggle from "../features/auth/components/ThemeToggle.jsx";
import Icon from "../features/auth/components/Icon.jsx";
import Link from "../core/router/Link.jsx";
import { useLang } from "../core/i18n/LanguageProvider.jsx";

/** Header + page container for the signed-in pages. Applies dir/lang here, so Login/Register are not affected. */
export default function AppShell({ path, children }) {
  const { t, lang, dir, toggle } = useLang();
  const items = [
    { to: "/tracks", label: t("nav.tracks"), icon: "grid" },
    // "Find your track" / "Your skills" are hidden from the navbar on purpose: those two pages are reached from the
    // Recommendation buttons under the tracks. Routes still work — to bring a tab back, add it here again.
  ];
  return (
    <div className="shell" dir={dir} lang={lang}>
      <header className="appbar">
        <div className="appbar-in">
          <a href="#/tracks" className="brand-link"><span dir="ltr"><Logo size={38} /></span></a>
          <nav className="appnav" aria-label={t("nav.menu")}>
            {items.map((i) => (
              <Link key={i.to} to={i.to} aria-current={path === i.to || path.startsWith(i.to + "/") ? "page" : undefined}>
                <Icon name={i.icon} size={17} />{i.label}
              </Link>
            ))}
          </nav>
          <div className="appbar-tools">
            <Link to="/login" className="appnav" style={{ textDecoration: "none", margin: 0 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--primary)", padding: "7px 12px", borderRadius: 8, background: "color-mix(in srgb,var(--primary) 10%,transparent)" }}>
                {lang === "ar" ? "تسجيل الدخول / الحساب" : "Login / Account"}
              </span>
            </Link>
            <button type="button" className="lang-btn" onClick={toggle} aria-label={t("nav.switchLang")}>
              <Icon name="globe" size={17} />{t("nav.langName")}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="page">{children}</main>
    </div>
  );
}
