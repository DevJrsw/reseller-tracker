# Resellr

A self-contained local Reseller Tracker dashboard. It runs without an install step or cloud account.

## Run locally

From this directory, start the included local server:

```powershell
node server.js
```

Then open `http://localhost:4173`.

## Deploy on Railway

The project includes a Railway-ready start command, health check, and port handling. It has no runtime dependencies.

1. Put this `reseller-tracker` folder in a GitHub repository.
2. In Railway, create a new project and select **Deploy from GitHub Repo**.
3. Select the repository and deploy. Railway runs `npm start` and assigns `PORT` automatically.
4. In the service's **Settings → Networking**, generate a public domain.
5. Leave the health check at `/health` (already declared in `railway.toml`).

You can also deploy from an authenticated Railway CLI by running `railway init` then `railway up` from this folder. Railway's docs cover these flows: https://docs.railway.com/cli/deploying

## Demo account

- Email: `demo@resellr.app`
- Password: `demo1234`

Registration, inventory entries, and theme choice are stored only in the browser's local storage. This makes the hosted version immediately usable for one person in one browser, but it is not secure multi-user authentication and does not sync across devices.

## Supabase

Supabase is deliberately not wired in because this workspace has no Supabase URL/key or tested database schema. To make accounts and data cloud-backed, create a Supabase project, enable email/password authentication, create inventory/sales/expenses tables with row-level policies, then replace the local-storage functions in `app.js` with Supabase client calls using a configured project URL and anonymous key. Do not put a service-role key in browser code.
