import { useTheme } from "../Context/themeContext";
import { Switch } from "@chakra-ui/react";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  return (
    <div>
      <span>Theme </span>
      <Switch isChecked={theme === "dark"} onChange={toggleTheme} />
    </div>
  );
}
