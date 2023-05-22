import React, { memo } from "react";
import PropTypes from "prop-types";
import "./ToggleButton.css";

/**
 * ToggleButton component for switching between light and dark themes.
 *
 * @param {string} theme - The current theme ("light" or "dark").
 * @param {function} toggleTheme - The function to toggle the theme.
 * @returns {JSX.Element} - The ToggleButton component.
 */
const ToggleButton = ({ theme, toggleTheme }) => {
  return (
    <div className="diaplayFlex pd-10">
      <p className="slider-button-text">
        Switch to {theme === "dark" ? "Light" : "Dark"} Theme
      </p>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round" onClick={toggleTheme}></span>
      </label>
    </div>
  );
};

ToggleButton.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default memo(ToggleButton);
