import React, { createContext, useState, useEffect } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

// Create ThemeProvider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Detect system theme
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(systemTheme);
  }, []);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
