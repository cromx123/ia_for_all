import React, { useState } from "react";
import './Model.css';
import * as tf from '@tensorflow/tfjs';

function Model_1() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState('');

    const loadModelAndPredict = async (file) => {
        // Cargar el modelo
        const model = await tf.loadLayersModel('/modelo1/model.json');

        // Procesar la imagen
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.onload = async () => {
            const tensor = tf.browser.fromPixels(img)
                .resizeNearestNeighbor([224, 224])
                .toFloat()
                .expandDims();
            const predictions = model.predict(tensor);
            const classIdx = predictions.argMax(-1).dataSync()[0];

            // Mostrar el resultado
            setResult(`Predicción: Clase ${classIdx}`);
        };
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
        loadModelAndPredict(file);
    };
    return (
        <div className="model-container">
            <div className="model-box">
                <h1 className="model-title">Modelo de clasificación de Aves</h1>
                <div className="model-func-box">
                    <p className="model-description">Ingresar imagen</p>
                    <input type="file" onChange={handleFileChange} />
                    {image && <img src={image} alt="Input" width="300" />}
                    {result && <p>{result}</p>}
                </div>
                <div className="model-func-box">
                    <p className="model-description">
                        Resultado
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

export default Model_1;