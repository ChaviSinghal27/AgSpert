import logo from "./logo.svg";
import "./App.css";

import Home from "./Home/home";

import { useTheme } from "./Context/themeContext";
import Approutes from "./Routes/routes";
import Login from "./Login/login";

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App ${theme}`}>
      <Approutes />
    </div>
  );
}

export default App;
