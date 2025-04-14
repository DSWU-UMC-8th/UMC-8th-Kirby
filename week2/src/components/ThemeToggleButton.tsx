import { useTheme } from "../context/ThemeContext";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`absolute top-4 left-4 px-3 py-1 rounded ${
        isDarkMode ? "bg-yellow-300" : "bg-gray-700"
      } text-white`}
    >
      {isDarkMode ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggleButton;
