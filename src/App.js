import './App.css';
import Country from './Components/Country';
import React,{useState} from "react";
import { Switch,Route ,useLocation} from 'react-router-dom';
import Countrydetails from './Components/Countrydetails';
import "antd/dist/antd.css";
import ThemeContext from "./context/themeContext";

function App() {

  const [theme, setState] = useState("light");
   const handleThemeToggle = (val) => {
    let root = document.getElementsByTagName("body");
    if (val === "light") {
      root[0].setAttribute("style", "background:hsl(0, 0%, 98%);");
    } else {
      root[0].setAttribute("style", "background:hsl(207, 26%, 17%)");
    }

    setState(val);
  };
  
  const location = useLocation();
  return (
    <ThemeContext.Provider
    value={{
      theme: theme,
      onThemeChange: handleThemeToggle,
    }}
  >
      <Switch>
      <Route path="/Countrydetails">
        <Countrydetails {...location.state}/>
      </Route>
      <Route path="/">
        <Country/>
      </Route>
      </Switch>
      </ThemeContext.Provider>
  );
}

export default App;
