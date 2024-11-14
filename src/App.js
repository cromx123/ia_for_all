// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Model from "./components/Model";
import About from "./components/About";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from './components/Footer';

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
                <li><Link to="/" className={activeLink === "home" ? "active" : ""} onClick={() => handleNavClick("home")}>Home</Link></li>
                <li><Link to="/models" className={activeLink === "models" ? "active" : ""} onClick={() => handleNavClick("models")}>Models</Link></li>
                <li><Link to="/about" className={activeLink === "about" ? "active" : ""} onClick={() => handleNavClick("about")}>About</Link></li>
              </ul>
            </div>
            <div className="navbar-der">
              <ul className="navbar-links-sign">
                <li><Link to="/signin" className={activeLink === "signin" ? "active" : ""} onClick={() => handleNavClick("signin")}>Sign in</Link></li>
                <li className="signup"><Link to="/signup" className={activeLink === "signup" ? "active" : ""} onClick={() => handleNavClick("signup")}>Sign up</Link></li>
              </ul>
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;