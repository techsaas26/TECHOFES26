import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Splash from "./components/Splash/Splash";
import Home from "./components/Home";
import Sponser from "./components/Sponser/Sponser";
import Legacy from "./components/Legacy/Legacy";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<Sponser/>} />
        <Route path="/legacy" element={<Legacy/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;