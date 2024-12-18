import React, { useRef, useState } from "react";
import './Model.css';

function Model_1() {
    const [image, setImage] = useState(null); // Estado para almacenar la imagen cargada
    const [result, setResult] = useState(''); // Estado para mostrar el resultado
    const [loading, setLoading] = useState(false); // Estado para indicar si está cargando
    const canvasRef = useRef(null); // Referencia al canvas

    const API_URL = 'http://localhost:5000/api/predict_modelo_one'; // URL del endpoint backend

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
                <h1 className="model-title">Modelo Detección "Perro o Gato"</h1>
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
                        {loading ? 'Cargando...' : 'Predecir'}
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
                    <p>Este modelo utiliza TensorFlow y Keras para entrenar una red neuronal convolucional (CNN) que clasifica imágenes de gatos y perros.</p>
                </div>
                <div className="model-box2-inf">
                    <h2>Funcionamiento del Modelo:</h2>
                    <p>El modelo es una <span class="highlight">red neuronal convolucional (CNN)</span> con la siguiente estructura:</p>
                    <ul>
                        <h4>1. Capas Convolucionales:</h4>
                        <p>Extraen características de las imágenes.</p>
                        <ul>
                            <li>4 bloques de convolución (<span class="highlight">Conv2D</span>) seguidos de capas de agrupamiento máximo (<span class="highlight">MaxPooling2D</span>).</li>
                            <li>Filtros en cada bloque:</li>
                            <ul>
                                <li>Primer bloque: <span class="highlight">32 filtros</span> de tamaño <span class="highlight">(3x3)</span>.</li>
                                <li>Segundo bloque: <span class="highlight">64 filtros</span>.</li>
                                <li>Tercer y cuarto bloques: <span class="highlight">128 filtros</span> cada uno.</li>
                            </ul>
                        </ul>
                        
                        <h4>2. Regularización:</h4>
                        <ul>
                            <li><span class="highlight">Dropout</span> (<code>Dropout(0.5)</code>) para reducir el sobreajuste al desactivar aleatoriamente el 50% de las neuronas durante el entrenamiento.</li>
                        </ul>
                        
                        <h4>3. Capas Densas:</h4>
                        <ul>
                            <li><span class="highlight">Aplanado</span> (<code>Flatten</code>): Convierte las características extraídas en un vector.</li>
                            <li>Una capa densa intermedia con <span class="highlight">512 neuronas</span> y activación <span class="highlight">relu</span>.</li>
                            <li>Una capa de salida con <span class="highlight">2 neuronas</span> (para clasificar entre dos clases).</li>
                        </ul>
                        
                        <h4>4. Funciones de Activación:</h4>
                        <ul>
                            <li><span class="highlight">relu</span>: Utilizada en las capas convolucionales y densas para introducir no linealidad.</li>
                            <li>Sin activación en la capa de salida, ya que se usa <code>from_logits=True</code> durante la compilación.</li>
                        </ul>
                    </ul>
                    
                </div>
            </div>
        </div>
    );
}

export default Model_1;
