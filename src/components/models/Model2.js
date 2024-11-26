/* /components/Model.js*/
import React, { useRef, useState } from "react";
import './Model.css';
import * as tf from '@tensorflow/tfjs';

function Model_2() {
    const [image, setImage] = useState(null); // Estado para almacenar la imagen cargada
    const canvasRef = useRef(null); // Referencia al canvas
    
    const [modelo, setModelo] = useState(null); // Guardar el modelo cargado

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Obtener el archivo seleccionado
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImage(e.target.result);

                const img = new Image();
                img.src = e.target.result; // Convertir el archivo a una URL base64

                img.onload = () => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');

                    // Redimensionar y dibujar la imagen en el canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
                    const scale = Math.min(
                        canvas.width / img.width,
                        canvas.height / img.height
                    );
                    const x = (canvas.width / 2) - (img.width / 2) * scale;
                    const y = (canvas.height / 2) - (img.height / 2) * scale;

                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                };
            };
            reader.readAsDataURL(file); // Leer el archivo como una URL base64
        }
    };
    const prediccion = async () => {
        if (!image) {
            alert("Por favor, sube una imagen primero.");
            return;
        }

        if (!modelo) {
            alert("El modelo no está cargado todavía.");
            return;
        }

        try {
            const canvas = canvasRef.current;
            const tensor = tf.browser
                .fromPixels(canvas) // Convertir la imagen del canvas a un tensor
                .resizeNearestNeighbor([224, 224]) // Ajustar al tamaño esperado por el modelo
                .toFloat()
                .div(255.0) // Normalizar los valores entre 0 y 1
                .expandDims(); // Añadir una dimensión para el batch

            const resultado = modelo.predict(tensor); // Realizar la predicción
            const prediccion = resultado.argMax(-1).dataSync()[0]; // Obtener la clase con mayor probabilidad

            alert(`Predicción: Clase ${prediccion}`);
        } catch (error) {
            console.error('Error al realizar la predicción:', error);
            alert('Ocurrió un error al realizar la predicción.');
        }
    };

    return (
        <div className="model-container">
            <div className="model-box">
                <h1 className="model-title">Modelo de clasificación de Aves</h1>
                <div className="model-func-box">
                    <p className="model-description">Ingresar imagen</p>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    <canvas ref={canvasRef} width={400} height={400} />
                    <button onClick={prediccion} style={{ marginTop: '10px' }}> Predecir</button>
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

export default Model_2;