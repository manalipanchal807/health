# Health Care App – Client

React + Vite frontend for the Health Care App. It consumes the Express + MongoDB API that lives under `../server`.

## Prerequisites
- Node.js 18+
- Backend running (see `../server/README.md` or `index.js`)

## Environment variables
Copy `env.example` to `.env` and adjust as needed:

```
# The /api suffix is optional; the app appends it automatically if omitted.
VITE_API_BASE_URL=http://localhost:3001/api
```

## Running locally
```bash
npm install
npm run dev
```

The app starts on `http://localhost:5173`. Make sure the backend is reachable at the `VITE_API_BASE_URL` you configured.
