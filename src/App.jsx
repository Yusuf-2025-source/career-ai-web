import { LanguageProvider } from "./core/i18n/LanguageProvider.jsx";
import { useHashRoute, navigate } from "./core/router/useHashRoute.js";
import AppShell from "./components/AppShell.jsx";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage.jsx";
import RegisterPage from "./features/auth/pages/RegisterPage.jsx";
import TracksPage from "./features/tracks/pages/TracksPage.jsx";
import TrackDetailsPage from "./features/tracks/pages/TrackDetailsPage.jsx";
import QuestionsPage from "./features/recommend/pages/QuestionsPage.jsx";
import SkillsPage from "./features/recommend/pages/SkillsPage.jsx";

// Routes (hash based):  /login  /register  /tracks  /tracks/:id  /recommend/questions  /recommend/skills  /forgot-password  /reset-password?token=...
export default function App() {
  const [path, query = ""] = useHashRoute().split("?"); // "/reset-password?token=abc" -> path + query
  const goAuth = (view) => navigate(`/${view}`); // Login/Register keep their existing onNavigate("login" | "register") API

  const trackMatch = path.match(/^\/tracks\/([^/]+)$/);
  let page = null;
  if (path === "/tracks") page = <TracksPage />;
  else if (trackMatch) page = <TrackDetailsPage id={decodeURIComponent(trackMatch[1])} />;
  else if (path === "/recommend/questions") page = <QuestionsPage />;
  else if (path === "/recommend/skills") page = <SkillsPage />;

  return (
    <LanguageProvider>
      {page ? <AppShell path={path}>{page}</AppShell>
        : path === "/forgot-password" ? <ForgotPasswordPage onNavigate={goAuth} />
        : path === "/reset-password" ? <ResetPasswordPage token={new URLSearchParams(query).get("token")} onNavigate={goAuth} />
        : path.startsWith("/register") ? <RegisterPage onNavigate={goAuth} />
        : <LoginPage onNavigate={goAuth} />}
    </LanguageProvider>
  );
}
