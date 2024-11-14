// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Model from "./components/Model";
import About from "./components/About";


function App() {
  const [activeLink, setActiveLink] = useState("home");

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="navbar-izq">
              <div className="circle-logo"></div>
              <ul className="navbar-links">
                <li><Link to="/" className={activeLink === "home" ? "active" : ""} onClick={() => handleNavClick("home")}>HOME</Link></li>
                <li><Link to="/models" className={activeLink === "models" ? "active" : ""} onClick={() => handleNavClick("models")}>MODELS</Link></li>
                <li><Link to="/about" className={activeLink === "about" ? "active" : ""} onClick={() => handleNavClick("about")}>ABOUT</Link></li>
              </ul>
            </div>
            <div className="navbar-der">
              <button>SIGN IN</button>
              <button>SIGN UP</button>
            </div>
          </nav>
        </header>
        <body>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/models" element={<Model />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </body>
      </div>
    </Router>
  );
}

export default App;