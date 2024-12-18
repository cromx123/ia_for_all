import React, { useRef, useState } from "react";
import './Model.css';

function Model_3() {
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);
    const imgRef = useRef(null);
    const canvasRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                imgRef.current = img;
                drawImageToCanvas(img);
            };
        }
    };

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

    const loadModelAndSegment = async () => {
        if (!imgRef.current) {
            alert("Por favor, sube una imagen primero.");
            return;
        }
    
        setLoading(true);
        try {
            // Cargar los backends de TensorFlow.js
            await import('@tensorflow/tfjs-backend-cpu');
            await import('@tensorflow/tfjs-backend-webgl');
    
            const bodyPix = require('@tensorflow-models/body-pix');
    
            // Cargar el modelo BodyPix
            const model = await bodyPix.load();
    
            // Realizar la segmentación
            const segmentation = await model.segmentPersonParts(imgRef.current);
    
            // Mostrar la segmentación en el canvas usando ctx
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            bodyPix.drawMask(
                canvas, imgRef.current, segmentation, 0.7, 0, false
            );
    
            setLoading(false);
        } catch (error) {
            console.error("Error al cargar el modelo o procesar la imagen", error);
            alert("Ocurrió un error al procesar la imagen.");
            setLoading(false);
        }
    };

    return (
        <div className="model-container">
            <div className="model-box">
                <h1 className="model-title">Segmentación de Personas con BodyPix</h1>
                <div className="model-func-box">
                    <p className="model-description">Sube una imagen para segmentar:</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="button"
                        style={{ display: 'block', margin: '10px auto' }}
                    />
                    <canvas ref={canvasRef} />
                    <button
                        onClick={loadModelAndSegment}
                        className="button"
                        disabled={loading}
                        style={{ display: 'block', margin: '10px auto' }}
                    >
                        {loading ? 'Cargando...' : 'Segmentar'}
                    </button>
                </div>

                <div className="model-func-box">
                    <p className="model-description">Resultado:</p>
                    {loading ? (
                        <div className="loader">Cargando...</div> // Muestra el círculo de carga
                    ) : predictions ? (
                        <pre>{JSON.stringify(predictions, null, 2)}</pre> // Muestra las predicciones como JSON
                    ) : (
                        <p><em>No hay predicción disponible aún.</em></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Model_3;
