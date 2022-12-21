import "./App.css";
import Home from "./Screens/home/Home"
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Scan from "./Screens/scan/Scan"
import Forms from "./Screens/Form/Forms";
import { useState } from "react";
import Login from "./Screens/login/Login";
import Tables from "./Screens/Tables/Tables";


function App() {

  const [mainData , setMainData] = useState("")
       
  const handleData = (e) => {
    setMainData(e)
    console.log(e);
  }

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan handleData={handleData}/>}/>
          <Route path="/forms" element={<Forms mainData={mainData}/>}/>
          <Route path="/tables" element={<Tables />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
