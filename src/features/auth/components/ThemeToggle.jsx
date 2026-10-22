import { useTheme } from "../../../core/theme/useTheme.js";
import Icon from "./Icon.jsx";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button type="button" className="theme-btn" onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
      <Icon name={theme === "dark" ? "sun" : "moon"} size={19} />
    </button>
  );
}
