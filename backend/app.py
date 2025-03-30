from flask import Flask, request, jsonify, render_template
import requests
import logging
from config import DEBUG, TRANSLATION_API_EMAIL, TRANSLATION_API_URL, logger
import os

# Get the absolute path to the frontend directory
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
frontend_path = os.path.join(project_root, 'frontend')

app = Flask(__name__,
    static_folder=frontend_path,
    static_url_path='/static',
    template_folder=os.path.join(frontend_path, 'templates')
)
def translate_text(text, source_lang, target_lang):
    """Translate the given text from source_lang into target_lang using MyMemory API."""
    try:
        logger.info("Translating text...")
        response = requests.get(
            TRANSLATION_API_URL,
            params={
                'q': text,
                'langpair': f'{source_lang}|{target_lang}',
                'de': TRANSLATION_API_EMAIL 
            }
        )
        response.raise_for_status()
        data = response.json()
        translation = data['responseData']['translatedText']
        logger.info("Translation successful")
        return translation
    except Exception as e:
        logger.error(f"Translation error: {str(e)}", exc_info=True)
        return None

@app.route('/')
def home():
    try:
        logger.info("Rendering home page")
        return render_template('index.html')
    except Exception as e:
        logger.error(f"Error rendering home page: {str(e)}", exc_info=True)
        return "Error loading page", 500

@app.route('/translate', methods=['POST'])
def handle_translation():
    try:
        data = request.json
        text = data.get('text', '')
        source_lang = data.get('source_lang', 'en')
        target_lang = data.get('target_lang', 'es')
        logger.info(f"Received translation request from {source_lang} to {target_lang}")

        translation = translate_text(text, source_lang, target_lang)
        if translation:
            return jsonify({
                'original': text,
                'translation': translation,
                'error': None
            })
        else:
            logger.error("Translation failed")
            return jsonify({
                'error': 'Translation failed',
                'translation': None
            }), 500
    except Exception as e:
        logger.error(f"Error in /translate endpoint: {str(e)}", exc_info=True)
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=DEBUG)