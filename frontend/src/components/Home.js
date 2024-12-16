import React from "react";
import Typewriter from 'typewriter-effect';
import './Home.css';

const Home = () => {
    return (
      <div className="home-container">
        <div className="home-box">
          <h1 className="home-title">
            Bienvenido a{" "}
            <Typewriter
              options={{
                strings: ['Visionary IA', 'los mejores modelos de ia!'],
                autoStart: true,
                loop: true,
                deleteSpeed: 50, // Ajusta la velocidad de borrado
              }}
            />
          </h1>
          <div className="welcome-box">
            <p className="home-description">
              Explora una colección de modelos de inteligencia artificial diseñados para diversas aplicaciones en visión por computadora.
              Desde reconocimiento hasta clasificación y detección de imágenes, encontrarás herramientas avanzadas que pueden
              identificar objetos, categorizar contenidos y analizar visuales con precisión.
            </p>
          </div>
        </div>
        <div className="home-box2"></div>
      </div>
    );
  };
  
  export default Home;