import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Hehehe from "./pages/Hehehe";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="h-screen bg-zinc-800 text-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/hehehe" element={<Hehehe />} />
      </Routes>
    </div>
  );
};

export default App;
