# User Guide: Healthcare Translation App

## Introduction
The Healthcare Translation App helps users speak in one language, translate the spoken text into another language, and listen to the translation. This guide will walk you through the steps to use the app effectively.

## Getting Started
1. **Open the App**: Launch your web browser and navigate to the app's URL (the root endpoint served by the Flask backend).
2. **Interface Overview**: The home page is divided into sections for language selection, control buttons, and transcript display.

## Using the App

### Language Selection
- **Source Language**: Choose the language you will speak.
- **Target Language**: Choose the language you want your speech to be translated into.
- **Tip**: Both dropdowns must have a selected language; otherwise, the app will prompt you to make a selection.

### Speech Recognition
- **Start Speaking**: Click the **"🎤 Start Speaking"** button to begin capturing your speech.
  - The app will continuously capture speech and display both interim and final transcriptions in the "Original" section.
- **Stop Speaking**: Click the **"🛑 Stop Speaking"** button to end the speech recognition process.

### Translation
- **Automatic Translation**: As you speak, the text is sent to the server for translation. The translated text appears in the "Translation" section.
- **Error Handling**: If the translation service is unavailable or an error occurs, the app will notify you by displaying an appropriate message.

### Text-to-Speech
- **Listen to Translation**: After receiving the translation, click the **"🔊 Speak"** button to have the translated text read aloud using the browser’s speech synthesis.
- **Voice Selection**: The app automatically selects a voice based on the target language, though you might adjust this in the browser settings if needed.

## Additional Tips
- **Browser Compatibility**: For optimal performance, use a browser that supports the Web Speech API (e.g., Google Chrome).
- **Network Requirements**: Ensure you have a stable internet connection, as the translation relies on an external API.
- **Troubleshooting**: If you experience issues, check the browser’s console for errors and refer to the `error.log` file in the backend for detailed error logs.

Enjoy seamless translation and communication with the Healthcare Translation App!
