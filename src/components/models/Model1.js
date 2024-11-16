/* /components/Model.js*/
import React, { useRef, useState } from "react";
import './Model.css';

function Model_1() {
    const [image, setImage] = useState(null); // Estado para almacenar la imagen cargada
    const canvasRef = useRef(null); // Referencia al canvas

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
  return (
    <div className="model-container">
            <div className="model-box">
                <h1 className="model-title">Modelo de clasificación de Aves</h1>
                <div className="model-func-box">
                    <p className="model-description">Ingresar imagen</p>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {image && <p>Imagen cargada correctamente.</p>}
                    <canvas ref={canvasRef} width={400} height={400} />
                    <button>Clasificar</button>
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