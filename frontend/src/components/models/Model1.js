import React, { useState } from "react";
import './Model.css';

function Model_1() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = 'http://localhost:5000/api/predict'; // URL del endpoint backend

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
    
        // Limpiar el estado de la imagen y el resultado previo
        setImage(URL.createObjectURL(file)); // Actualiza la vista previa
        setResult(''); // Limpia el resultado anterior
        setLoading(true); // Indica que está cargando
    
        // Crear un objeto FormData para enviar al backend
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            // Enviar la imagen al backend
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Error en la predicción.');
            }
    
            const data = await response.json();
            setResult(data.prediction); // Actualiza con el nuevo resultado
        } catch (error) {
            console.error('Error al enviar la imagen:', error);
            setResult('Error al procesar la imagen.'); // Maneja errores
        } finally {
            setLoading(false); // Detiene la indicación de carga
        }
    };

    return (
        <div className="model-container">
            <div className="model-box">
                <h1 className="model-title">Modelo de clasificación de Aves</h1>
                <div className="model-func-box">
                    <p className="model-description">Sube una imagen para clasificar:</p>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {image && <img src={image} alt="Input" width="300" />}
                    {loading && <p>Cargando modelo o procesando imagen...</p>}
                    {result && <p><strong>{result}</strong></p>}
                </div>
            </div>
        </div>
    );
}

export default Model_1;
