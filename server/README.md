## Health Care App – Server

Express/Mongo backend that powers the Health Care App.

### Prerequisites
- Node.js 18+
- MongoDB instance (local or cloud)

### Setup
1. `cp env.example .env` and fill in the values.
2. Install deps: `npm install`

### Development
```bash
npm run dev
```

The API listens on `PORT` (default `3001`). Ensure the client points its `VITE_API_BASE_URL` at `http://localhost:3001/api`.

