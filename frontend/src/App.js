// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Model1 from "./components/models/Model1";
import Model2 from "./components/models/Model2";
import Model3 from "./components/models/Model3";
import Model4 from "./components/models/Model4";
import Model5 from "./components/models/Model5";
import About from "./components/About";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
                <li><span className={activeLink === "models" ? "active" : ""} onClick={() => { setActiveLink("models"); toggleDropdown();}} style={{ cursor: "pointer" }}>Models</span>
                  {isDropdownOpen && (
                    <div className="dropdown-content">
                      <Link to="/models1" className={activeLink === "model_1" ? "active" : ""} onClick={() => handleNavClick("model_1")}>Modelo 1</Link>
                      <Link to="/models2" className={activeLink === "model_2" ? "active" : ""} onClick={() => handleNavClick("model_2")}>Modelo 2</Link>
                      <Link to="/models3" className={activeLink === "model_3" ? "active" : ""} onClick={() => handleNavClick("model_3")}>Modelo 3</Link>
                      <Link to="/models4" className={activeLink === "model_4" ? "active" : ""} onClick={() => handleNavClick("model_4")}>Modelo 4</Link>
                      <Link to="/models5" className={activeLink === "model_5" ? "active" : ""} onClick={() => handleNavClick("model_5")}>Modelo 5</Link>
                    </div>
                  )}
                </li>
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
              <Route path="/models1" element={<Model1 />} />
              <Route path="/models2" element={<Model2 />} />
              <Route path="/models3" element={<Model3 />} />
              <Route path="/models4" element={<Model4 />} />
              <Route path="/models5" element={<Model5 />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </body>
        <Footer />
      </div>
    </Router>
  );
}

export default App;