import React, { useRef, useState, useEffect } from "react";
import './Model.css';

function Model_2() {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const imgRef = useRef(null);
    const canvasRef = useRef(null);

    // Función para manejar la carga de la imagen
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                imgRef.current = img;
                drawImageToCanvas(img);
            };
        }
    };

    // Función para dibujar la imagen en el canvas
    const drawImageToCanvas = (img) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
        );
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Función para cargar el modelo y hacer las predicciones
    const loadModelAndDetectObjects = async () => {
        if (!imgRef.current) {
            alert("Por favor, sube una imagen primero.");
            return;
        }
        
        setLoading(true);
        // Cargar los backends de TensorFlow.js
        await import('@tensorflow/tfjs-backend-cpu');
        await import('@tensorflow/tfjs-backend-webgl');

        const cocoSsd = require('@tensorflow-models/coco-ssd');

        // Cargar el modelo de coco-ssd
        const model = await cocoSsd.load();

        // Detectar objetos en la imagen
        const predictions = await model.detect(imgRef.current);

        // Actualizar el estado con las predicciones
        setPredictions(predictions);
        setLoading(false);
    };

    // Llamar a la función para detectar objetos solo cuando la imagen esté cargada
    useEffect(() => {
        if (imgRef.current) {
            loadModelAndDetectObjects();
        }
    }, [imgRef.current]);

    return (
        <div className="model-container">
            <div className="model-box">
                <h1 className="model-title">Detección de Objetos Multiples</h1>
                <div className="model-func-box">
                    <p className="model-description">Sube una imagen para clasificar:</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="button"
                        style={{ display: 'block', margin: '10px auto' }}
                    />
                    <canvas ref={canvasRef} width={400} height={400} />
                    <button
                        onClick={loadModelAndDetectObjects}
                        className="button"
                        disabled={loading}
                        style={{ display: 'block', margin: '10px auto' }}
                    >
                        {loading ? 'Cargando...' : 'Predecir'}
                    </button>
                </div>
                <div className="model-func-box">
                    <p className="model-description">Resultado:</p>
                    <ul>
                        {predictions.map((prediction, index) => (
                            <li key={index}>
                                <strong>{prediction.class}</strong> - Confianza: {prediction.score.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="model-box2">
                <div className="model-box2-sup">
                    <h2>Descripción del Modelo:</h2>
                    <p><span class="highlight">Coco-SSD</span> es un modelo de detección de objetos preentrenado basado en la arquitectura <span class="highlight">Single Shot Multibox Detector (SSD)</span>. Este modelo permite identificar y localizar múltiples objetos en una imagen en tiempo real.</p>
                </div>
                <div className="model-box2-inf">
                    <h2>Características del Modelo:</h2>
                    <ul>
                        <li><span class="highlight">Preentrenado en el conjunto de datos COCO</span> (Common Objects in Context), que contiene <span class="highlight">80 clases</span> de objetos.</li>
                        <li>Usa una arquitectura <span class="highlight">SSD (Single Shot Detector)</span> que combina la predicción de clases y las cajas delimitadoras en una sola etapa.</li>
                        <li>Ideal para aplicaciones de detección de objetos en tiempo real debido a su alta velocidad y precisión.</li>
                    </ul>
                    <ul>
                        <h4>1. Clases Detectadas:</h4>
                        <p>El modelo puede detectar objetos de las siguientes categorías (entre otras):</p>
                        <ul>
                            <li>Personas</li>
                            <li>Automóviles</li>
                            <li>Animales (gatos, perros, caballos, etc.)</li>
                            <li>Objetos cotidianos (tazas, sillas, mesas, etc.)</li>
                            <li>Señales de tráfico</li>
                        </ul>
                        
                        <h4>2. Entrenamiento:</h4>
                        <p>El modelo fue preentrenado usando el conjunto de datos <span class="highlight">COCO</span>, que incluye imágenes etiquetadas con cajas delimitadoras y categorías de objetos. Esto permite al modelo aprender:</p>
                        <ul>
                            <li>La ubicación de los objetos en una imagen.</li>
                            <li>Cómo clasificar objetos en las clases definidas en el conjunto de datos COCO.</li>
                        </ul>
                        
                        <h4>3. Ventajas:</h4>
                        <ul>
                            <li>Rendimiento rápido, adecuado para aplicaciones en dispositivos con recursos limitados.</li>
                            <li>No requiere entrenamiento adicional, ya que está preentrenado.</li>
                            <li>Compatible con múltiples plataformas (web, móvil, escritorio).</li>
                        </ul>
                        
                        <h4>4. Aplicaciones Comunes:</h4>
                        <ul>
                            <li>Detección de objetos en sistemas de vigilancia.</li>
                            <li>Reconocimiento de imágenes en aplicaciones móviles.</li>
                            <li>Sistemas de control de tráfico.</li>
                            <li>Juegos y realidad aumentada.</li>
                        </ul>
                    </ul>
                    
                </div>
            </div>
        </div>
    );
}

export default Model_2;
