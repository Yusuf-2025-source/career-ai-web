import { useEffect, useState } from "react";

// Tiny hash router (no new dependency). Routes look like  /#/tracks  or  /#/tracks/software .
const read = () => window.location.hash.replace(/^#/, "") || "/login";
export const navigate = (path) => { window.location.hash = path; };

export function useHashRoute() {
  const [path, setPath] = useState(read);
  useEffect(() => {
    const onChange = () => { setPath(read()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return path;
}
