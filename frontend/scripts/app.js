const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const speakBtn = document.getElementById('speakBtn');
const originalText = document.getElementById('originalText');
const translatedText = document.getElementById('translatedText');
const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');

let recognition;
let finalTranscript = '';
let availableVoices = [];

// Ensure voices are loaded before using text-to-speech
window.speechSynthesis.onvoiceschanged = () => {
    availableVoices = window.speechSynthesis.getVoices();
    console.log("Voices updated:", availableVoices);
};

// Validate if language selections are made
function validateSelection() {
    if (!sourceLang.value || !targetLang.value) {
        alert("Please select both source and target languages.");
        return false;
    }
    return true;
}

// Function to start speech recognition
startBtn.addEventListener('click', () => {
    if (!validateSelection()) return;

    // Stop previous recognition instance and create a new one
    if (recognition) {
        recognition.stop();
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = sourceLang.value;

    recognition.onresult = (event) => {
        let interimTranscript = '';
        finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        originalText.innerHTML = finalTranscript + interimTranscript;
        translateText(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };

    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

// Function to stop speech recognition
stopBtn.addEventListener('click', () => {
    if (recognition) {
        recognition.stop();
    }
    startBtn.disabled = false;
    stopBtn.disabled = true;
    speakBtn.disabled = false;
});

// Function to handle text-to-speech
speakBtn.addEventListener('click', () => {
    if (!translatedText.innerText.trim()) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(translatedText.innerText);

    // Ensure voices are available before speaking
    if (availableVoices.length === 0) {
        availableVoices = synth.getVoices();
    }

    let selectedVoice = availableVoices.find(voice => voice.lang.startsWith(targetLang.value));

    synth.cancel(); // Stop any previous speech before starting new
    synth.speak(utterance);
});

// Function to translate text
async function translateText(text) {
    if (!text) return;

    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                source_lang: sourceLang.value,
                target_lang: targetLang.value
            })
        });

        const data = await response.json();
        if (data.translation) {
            translatedText.innerHTML = data.translation;
            speakBtn.disabled = false;
        } else {
            translatedText.innerHTML = "Translation unavailable";
            speakBtn.disabled = true;
        }
    } catch (error) {
        translatedText.innerHTML = "Translation error";
        speakBtn.disabled = true;
        console.error('Translation error:', error);
    }
}
