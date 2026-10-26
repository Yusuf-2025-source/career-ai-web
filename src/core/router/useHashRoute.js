import { useEffect, useState } from "react";

// Tiny hash router supporting both hash and path fallback.
// Routes: /tracks | /tracks/:id | /register | /login | /verify-email | /recommend/questions | /recommend/skills
const read = () => {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash && hash !== "/") return hash;
  const pathname = window.location.pathname;
  if (pathname && pathname !== "/" && pathname !== "/index.html") {
    return pathname;
  }
  return "/login"; // Default to Login page
};

export const navigate = (path) => {
  const clean = path.startsWith("#") ? path.slice(1) : path;
  window.location.hash = clean.startsWith("/") ? clean : `/${clean}`;
};

export function useHashRoute() {
  const [path, setPath] = useState(read);

  useEffect(() => {
    // Synchronize hash in the URL bar if empty
    if (!window.location.hash || window.location.hash === "#" || window.location.hash === "#/") {
      const initial = read();
      window.location.hash = initial;
    }

    const onChange = () => {
      setPath(read());
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return path;
}
