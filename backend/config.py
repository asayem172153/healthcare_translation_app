import logging

# Basic configuration variables
DEBUG = True
TRANSLATION_API_EMAIL = 'abusayem379@gmail.com'
TRANSLATION_API_URL = 'https://api.mymemory.translated.net/get'

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    handlers=[
        logging.FileHandler("error.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)