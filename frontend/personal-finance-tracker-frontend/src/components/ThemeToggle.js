import React, { useContext } from "react";
import { ThemeContext } from "../Services/ThemeContext"; // Adjust path as needed

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className={`btn btn-${theme === "dark" ? "light" : "dark"}`}>
      Switch to {theme === "dark" ? "Light" : "Dark"} Theme
    </button>
  );
};

export default ThemeToggle;
