// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Model from "./components/Model";
import About from "./components/About";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 750) {
        setIsMenuOpen(false); // Si la ventana es grande, ocultamos el menú
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="navbar-izq">
              <div className="circle-logo"></div>
              <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  &#9776; {/* Icono de hamburguesa */}
              </button>
              <ul className={`navbar-links ${isMenuOpen || windowWidth > 750 ? "open" : ""}`}>
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