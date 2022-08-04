import "./App.css";
import Display from "./Display";
import Home from "./TaskManager";
import { Route, Routes, Navigate } from "react-router-dom";
import AddTicker from "./AddTicker";
import View from "./View";
import Nav from "./Nav";
import TickerManager from "./TickerManager";

function App() {
  return (
    <div className="app">
      <header>
        <Nav />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addticker" element={<TickerManager />} />
        <Route path="/view" element={<View />} />
        {/* <Route path="*" element={<NotFound />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
