const apiKey = 'sk_de4fab318945ece1a4f61601e4db1640941af63624a34b69';

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const MAX_WORDS = 50;

// Live character/word counter + 50-word limit warning. Updates on every
// keystroke so the limit is visible before submit, and disables the
// Generate button while the text is over the limit.
function updateWordCounter() {
  const textInput = document.getElementById('textInput');
  const counter = document.getElementById('wordCounter');
  const warning = document.getElementById('wordWarning');
  const generateBtn = document.getElementById('generateBtn');
  if (!textInput || !counter) return;

  const text = textInput.value;
  const wordCount = countWords(text);
  const charCount = text.length;
  const overLimit = wordCount > MAX_WORDS;

  counter.textContent = wordCount + ' / ' + MAX_WORDS + ' words · ' + charCount + ' characters';
  if (overLimit) {
    counter.classList.add('over-limit');
  } else {
    counter.classList.remove('over-limit');
  }
  if (warning) {
    warning.hidden = !overLimit;
  }
  if (generateBtn) {
    generateBtn.disabled = overLimit;
  }
  return { wordCount: wordCount, charCount: charCount, overLimit: overLimit };
}

async function submitText() {
  const text = document.getElementById('textInput').value.trim();
  const wordCount = countWords(text);
  const voiceId = document.getElementById('voiceSelect').value;
  const downloadLink = document.getElementById('downloadLink');

  if (wordCount > 50) {
    alert("⚠️ Please limit your input to 50 words.");
    return;
  }

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75
        }
      })
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.style.display = 'inline-block';
  } catch (error) {
    alert("❌ Something went wrong: " + error.message);
  }
}

// Wire the live counter to the textarea and show the initial count.
const textInput = document.getElementById('textInput');
if (textInput) {
  textInput.addEventListener('input', updateWordCounter);
  updateWordCounter();
}

// Make selected voice name appear red after choosing
const voiceSelect = document.getElementById("voiceSelect");
voiceSelect.addEventListener("change", () => {
  voiceSelect.style.color = "red";
});
