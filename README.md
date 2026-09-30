# Reseller Tracker
Next.js 14 · TypeScript · Tailwind · PostgreSQL · Recharts · Zod. Custom auth: bcrypt passwords + signed HttpOnly JWT session cookie. Every DB query is scoped by `user_id`.

## Local setup
```bash
cp .env.example .env    # set DATABASE_URL, SESSION_SECRET, DATABASE_SSL=false
npm install && npm run migrate && npm run seed && npm run dev
```
Demo login after seeding: `demo@example.com` / `demo1234!`. Tests: `npm test` (DB tests run when `DATABASE_URL` is set and migrated).

## Deploy to Railway
1. Push to GitHub → Railway **New Project → Deploy from GitHub repo**.
2. **+ New → Database → PostgreSQL**.
3. In the app service → Variables: `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`, `SESSION_SECRET` = output of `openssl rand -base64 32`.
4. Deploy. `railway.json` runs `npm run build`, then on start `npm run migrate && npm start`, and health-checks `/api/health`.
5. Optional demo data: `railway run npm run seed`.

## Environment variables
`DATABASE_URL` (required) · `SESSION_SECRET` (required, 16+ chars) · `DATABASE_SSL` (`false` for local non-SSL) · `PORT` (set by Railway).
