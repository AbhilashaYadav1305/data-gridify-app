import "./App.css";
import { ThemeProvider } from "./components/common/ThemeContext";
import ThemeContext from "./components/common/ThemeContext";
import TableDataComponent from "./components/grid/TableDataComponent";

const App = () => {
  const AppContent = ({ theme }) => {
    const themeClass = theme === "dark" ? "dark-theme" : "light-theme";
    // Use the theme value to apply the appropriate CSS classes or styles
    return (
      <div className={`App ${themeClass}`}>
        {/* <div className={`${themeClass}`}> */}
        <TableDataComponent />
        {/* </div> */}
      </div>
    );
  };

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {(themeContext) => <AppContent theme={themeContext.theme} />}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

export default App;
