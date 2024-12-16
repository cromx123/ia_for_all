const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Middleware para manejar archivos
const tf = require('@tensorflow/tfjs-node'); // TensorFlow.js para Node
const { spawn } = require('child_process'); // Para ejecutar scripts de Python


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurar multer para manejar archivos
const upload = multer({ dest: 'uploads/' }); // Guardar los archivos en 'uploads/'

// Endpoint para predecir
app.post('/api/predict', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No se envió una imagen.');
        }   
        const imagePath = req.file.path;

        const pythonProcess = spawn('python3', ['modelos/modelo1.py', imagePath]);
        console.log('Información del archivo subido:', req.file);

        console.log('Ruta de la imagen:', imagePath);

        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error en Python: ${data.toString()}`);
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Resultado de la predicción:', result); // Verificar el resultado
                res.json(JSON.parse(result)); // Enviar el resultado al frontend
            } else {
                res.status(500).send('Error al procesar la imagen en el script de Python.');
            }
        });
        
    } catch (error) {
        console.error('Error en el servidor:', error.message);
        res.status(500).send('Error en el servidor.');
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});
