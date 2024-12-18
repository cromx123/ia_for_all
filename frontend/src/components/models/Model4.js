import React, { useRef, useState } from "react";
import './Model.css';

function Model_4() {
    const [image, setImage] = useState(null); // Estado para almacenar la imagen cargada
    const [result, setResult] = useState(''); // Estado para mostrar el resultado
    const [loading, setLoading] = useState(false); // Estado para indicar si está cargando
    const canvasRef = useRef(null); // Referencia al canvas

    const API_URL = 'http://localhost:5000/api/predict_modelo_four'; // URL del endpoint backend

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        setResult('');
        setImage(null);
        setLoading(false);

        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);

            const img = new Image();
            img.src = e.target.result;

            img.onload = () => {
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
        };
        reader.readAsDataURL(file);
    };

    const prediccion = async () => {
        if (!image) {
            alert("Por favor, sube una imagen primero.");
            return;
        }
    
        setResult('loading'); // Configura result como "loading"
    
        try {
            const canvas = canvasRef.current;
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('image', blob, 'canvas-image.jpg');
    
                const response = await fetch(API_URL, {
                    method: 'POST',
                    body: formData,
                });
    
                if (!response.ok) {
                    throw new Error('Error en la predicción.');
                }
    
                const data = await response.json();
                setResult(data.prediction); // Configura el resultado
            });
        } catch (error) {
            console.error('Error al enviar la imagen:', error);
            setResult('Error al procesar la imagen.'); // En caso de error
        }
    };
    

    return (
        <div className="model-container">
            <div className="model-box">
                <h1 className="model-title">Modelo de clasificación de Aves</h1>
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
                        onClick={prediccion}
                        className="button"
                        disabled={loading}
                        style={{ display: 'block', margin: '10px auto' }}
                    >
                        Predecir
                    </button>
                    
                </div>
                <div className="model-func-box">
                    <p className="model-description">Resultado:</p>
                    {result ? (
                    result === 'loading' ? (
                        <div className="loader"></div> // Muestra el círculo de carga si result === 'loading'
                    ) : (
                        <p><strong>{result}</strong></p> // Muestra el resultado
                    )
                ) : (
                    <p><em>No hay predicción disponible aún.</em></p>
                )}


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

export default Model_4;
