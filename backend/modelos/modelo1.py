import os
import sys
import json
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import load_img, img_to_array
import tensorflow as tf

# Desactivar GPU si no está disponible
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

# Configurar TensorFlow para que no imprima logs
tf.get_logger().setLevel('ERROR')

# Etiquetas de las clases
labels = {0: "Predicción: Gato", 1: "Predicción: Perro"}

# Cargar el modelo
model = load_model('./modelos/animal_classification_model.h5')

# Verificar argumentos
if len(sys.argv) < 2:
    print(json.dumps({"error": "No se proporcionó una ruta para la imagen."}))
    sys.exit(1)

img_path = sys.argv[1]

try:
    # Procesar la imagen
    img = load_img(img_path, target_size=(150, 150))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Realizar predicción
    prediction = model.predict(img_array, verbose=0)[0][0]  # Salida de una sola neurona
    predicted_class = 1 if prediction > 0.5 else 0  # Umbral de 0.5
    predicted_label = labels[predicted_class]

    # Imprimir el resultado como JSON
    result = {"prediction": predicted_label}
    print(json.dumps(result))
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
