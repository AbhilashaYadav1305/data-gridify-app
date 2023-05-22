import React, { createContext, useState } from "react";

const ThemeContext = createContext(); // Create a new context object for managing theme

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Define a state variable for theme and its setter function

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light"); // Toggle the theme between "light" and "dark"
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children} {/* Render the child components within the ThemeProvider */}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; // Export the ThemeContext object as the default export of the module
