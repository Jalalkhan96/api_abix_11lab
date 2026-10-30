# api_abix_11lab — Text-to-Speech Generator (Demo Web API by Abix 11Lab)

A simple static web page that converts text to speech with the ElevenLabs API and lets you download the result as an MP3.

## What it is

A demo front-end for the ElevenLabs text-to-speech API. Pick a voice, type a short message, and the page sends it to the ElevenLabs API directly from the browser, then offers the returned audio as a downloadable MP3. It was built as a demo of using a hosted TTS API from plain HTML/CSS/JavaScript — there is no backend and no build step.

## Features

- 🎙 Voice selection dropdown with preset ElevenLabs voices
- 💬 Text input limited to **50 words** (enforced in `script.js`)
- 🎧 One click generates the speech and turns the download link into the MP3
- 📱 Footer with the developer's social links (TikTok, Telegram)

## Contents

```
index.html   Page markup — voice <select>, text area, generate button, download link
script.js    Word-count check + fetch call to the ElevenLabs TTS endpoint
             (POST https://api.elevenlabs.io/v1/text-to-speech/<voiceId>,
              model_id "eleven_monolingual_v1",
              voice_settings: stability 0.75, similarity_boost 0.75)
style.css    Page styling (Poppins font, Font Awesome icons via CDN)
```

## Run it

Just open the page in a browser — no server or install needed:

```bash
open index.html
```

Notes:

- The page calls the ElevenLabs API from the browser, so it needs internet access and an ElevenLabs API key configured in `script.js` to work.
- Text longer than 50 words is rejected with an alert before anything is sent.

## Tech

- HTML, CSS, vanilla JavaScript (`fetch`, Blob/object URLs for the MP3 download)
- ElevenLabs Text-to-Speech API (`eleven_monolingual_v1` model)
- Google Fonts (Poppins) + Font Awesome via CDN

## License

MIT — see [LICENSE](LICENSE).
