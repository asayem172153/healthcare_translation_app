# Code Documentation

## Overview
This project, **Healthcare Translation App**, is designed to capture spoken input in one language, translate it into another language using the MyMemory API, and then provide an audio playback of the translation. It consists of a Flask backend and a JavaScript-powered frontend.

## Project Structure
  healthcare_translation_app/  
  ├── backend/                 # HIPAA-compliant logging  
  │   ├── app.py               # Rate-limited API endpoints  
  │   ├── config.py            # Encrypted credential storage  
  └── frontend/                # WCAG 2.1 AA compliant UI  
      ├── templates/   

### Backend
- **app.py**: Sets up the Flask server. It serves static files from the `frontend` folder, renders the homepage, and exposes a `/translate` endpoint.
- **config.py**: Contains configuration variables (e.g., API email, API URL) and logging configuration.
- **requirements.txt**: Lists the Python dependencies required for the backend.

### Frontend
- **index.html**: Provides the structure for the user interface, including language selectors, buttons for speech control, and areas to display the original and translated texts.
- **app.js**: Handles client-side logic including speech recognition, translation fetch calls, and text-to-speech.
- **style.css**: Styles the application using a mobile-first approach with responsive design for desktop.

## AI Tools and External Services
- **Speech Recognition & Text-to-Speech (Web APIs)**: The frontend uses the browser’s built-in `webkitSpeechRecognition` for converting spoken language to text and `speechSynthesis` for reading the translated text aloud.
- **Translation API**: The backend communicates with the [MyMemory API](https://api.mymemory.translated.net/get) to perform language translation.

## Security Considerations
- **Input Validation**: The frontend validates that both source and target languages are selected before starting speech recognition.
- **Error Handling**: Both frontend and backend have error handling mechanisms to log errors and provide feedback (e.g., alerting the user if a translation fails).
- **Logging**: Detailed logging is implemented (configured in `config.py`) to capture errors and track application flow. Logs are stored in `error.log` and streamed to the console.
- **API Request Safety**: The backend uses try-except blocks to handle issues when calling the external translation API, ensuring that exceptions are logged and do not expose sensitive information to the user.


