# Chatbot (Frontend) ⚡

Proyecto simple de interfaz de chatbot (front-end) para demostración y pruebas locales.

Descripción
-----------
Este repositorio contiene una pequeña aplicación web estática que sirve como interfaz de ejemplo para un chatbot. El proyecto no requiere servidor; basta con abrir `index.html` en un navegador moderno.

Estructura del proyecto
----------------------
- `index.html` — página principal.
- `css/styles.css` — estilos CSS.
- `js/function.js` — lógica JavaScript para la interfaz del chatbot.

Requisitos
---------
- Navegador moderno (Chrome, Firefox, Edge, Safari).
- (Opcional) servidor HTTP local para evitar restricciones de CORS al testar recursos; por ejemplo `python -m http.server`.

Cómo ejecutar (rápido)
---------------------
1. Abrir `index.html` directamente en el navegador.

O, para servirlo desde un servidor local (recomendado para pruebas):

```bash
# desde la raíz del repositorio
python3 -m http.server 8000
# luego abrir http://localhost:8000 en el navegador
```

Notas y siguientes pasos
----------------------
- Si piensas conectar este front-end a un backend de chatbot (por ejemplo una API de IA), añade instrucciones de configuración (URL de la API, claves en variables de entorno o un archivo `.env`) y ejemplo de petición.
- Puedes mejorar el README agregando screenshots, ejemplos de interacción y pruebas.

Licencia
--------
Este repositorio está bajo una licencia permisiva. Añade un archivo `LICENSE` con la licencia que prefieras.