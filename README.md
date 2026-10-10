# ScamShield

ScamShield is a Vite dashboard with an AI-assisted message scanner. Scan requests go from the browser to the local Node API, which calls Gemini using a server-side key.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` to your Google AI Studio API key. Do not put the key in `src/` or a `VITE_*` variable.
3. Run `npm run dev` and open `http://localhost:5173/`.

Restart the dev server after changing `.env`. `GEMINI_MODEL` can optionally select another model available to your API key.

## Privacy and limitations

When you scan, the submitted text is sent to Google Gemini through the local API server. Do not submit OTPs, PINs, passwords, full payment-card numbers, or other secrets. The AI assessment is advisory, can be wrong, and does not verify live sender or domain reputation. A “likely safe” result is not a guarantee.
