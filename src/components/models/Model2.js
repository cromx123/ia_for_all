/* /components/Model.js*/
import React from "react";
import './Model.css';

function Model_2() {
  return (
    <div className="model-container">
            <div className="model-box">
                <h1 className="model-title">Modelo 2</h1>
                <div className="model-func-box">
                    <p className="model-description">
                        Explora una colección de modelos de inteligencia artificial diseñados para diversas aplicaciones en visión por computadora.
                        Desde reconocimiento hasta clasificación y detección de imágenes, encontrarás herramientas avanzadas que pueden
                        identificar objetos, categorizar contenidos y analizar visuales con precisión.
                    </p>
                </div>
            </div>
            
            <div className="model-box2">
                <div className="model-box2-sup">
                    <h2>Descripción del Modelo:</h2>
                    <p>Este modelo utiliza técnicas de aprendizaje profundo para identificar objetos</p>
                </div>
                <div className="model-box2-inf">
                    <h2>Funcionamiento del Modelo:</h2>
                    <p>Este modelo utiliza una red neuronal convolucional (CNN) para analizar</p>
                </div>
            </div>
        </div>
  );
}

export default Model_2;