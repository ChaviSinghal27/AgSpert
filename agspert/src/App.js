import "./App.css";

import { useTheme } from "./Context/themeContext";
import Approutes from "./Routes/routes";

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App ${theme}`}>
      <Approutes />
    </div>
  );
}

export default App;
