# Ledger — Trading Journal Prototype

Interactive, mobile-friendly trading-journal demo with fictional data. Vanilla JavaScript/CSS; no runtime packages or API keys required. This is a workflow prototype, not the production 500-student system.

## Run locally

Node.js 20+: `npm install`, then `npm run dev`. Open http://localhost:3000.

`npm test` runs domain tests. `npm run build` writes static assets to `dist/`.

## Vercel deployment

1. Extract this ZIP. Put the contents of `trade-journal` in your GitHub repository.
2. Import the repo into Vercel. If the project is a subfolder, choose that folder as Root Directory.
3. Framework Preset: **Other**. Build Command: **npm run build**. Output Directory: **dist**.
4. Deploy. No environment variables needed.

The included `vercel.json` explicitly configures static hosting. Remove conflicting framework/output overrides from an existing Vercel project. The development server under scripts is not deployed as a function. Preview deployments can serve as demo staging sites.

## Features

Dashboard and cumulative P&L; searchable trade journal; notes, setups, checklists, screenshots; daily pre/post-market journal; monthly calendar with weekly totals and trade drill-down; stats grouped by setup, entry hour, weekday, custom fields; configurable definitions and stat cards; coach outlook and signal simulation; membership event simulation; JSON backup export.

Sample data starts in September 2026. Use the month selector for other imported periods. All times are UTC. Changes persist only in this browser. Screenshot limit: 500 KB. Import limit: 2 MB.

## CSV contract

Download the sample from Import trades. Required columns: `date,time,symbol,side,quantity,entry,exit,fees`. Optional: `trade_id,account`.

Each row is one CLOSED EQUITY trade. Dates YYYY-MM-DD, times HH:mm, side long/short, numeric values without currency formatting. Net P&L = (exit-entry) × shares × direction − fees. Preview reports invalid rows and duplicates before import.

Duplicate key: student + account + broker trade ID, or student + account + date/time/symbol/side/quantity/entry/exit when ID is absent. Without IDs, identical legitimate trades cannot be distinguished. Changed values for the same ID are skipped, not reconciled. IDs must identify completed trades rather than individual execution fills.

Raw thinkorswim statements are NOT supported. Production needs actual sample exports, section detection, execution IDs, partial-fill/exit reconstruction, instrument multipliers, time-zone handling, and reconciliation fixtures. Open trades, options and futures are unsupported by the demo parser.

## Coach comparison

Bullish/long and bearish/short are aligned. Neutral or missing outlook has no directional comparison. This is a rule-based check, not an AI interpretation of free text.

Signals match the closest same-day symbol/direction event. Within ±5 minutes is on time; otherwise early or late. Ties select the first inserted. Signals are local simulated events, not actual webhooks.

## Source map

- src/model.js: CSV parser, validation, duplicate keys, statistics, timing rules, sample data.
- src/app.js: views, interactions, persistence, import preview, admin simulation.
- style.css: responsive theme; Google Fonts optional with system fallback.
- tests/model.test.mjs: import, duplicate, P&L, date, timing tests.
- scripts/build.mjs: static build. scripts/dev.mjs: local server.

## Production boundary

No authentication, server, database, multi-user isolation, durable file storage, real payments, Stripe/Whop integration, or actual inbound webhooks. All visitors can access coach controls. Membership screens are a visual simulation, not security. Do not enter real student/brokerage data. JSON backup export is included; restore is not.

For production, add server-side authentication and roles, PostgreSQL with student-scoped authorization, private screenshot storage with signed URLs, reliable brokerage import adapters with database uniqueness constraints, and signature-verified idempotent membership/signal webhooks. Store setups, checklist items, fields and responses as relational definitions; keep import jobs, executions, trades, journal entries, outlook versions, signals, and membership events separate. Add staging/production separation, audit logging, backups, monitoring, access-control tests and broker reconciliation before launch. No subscriptions or deployment are created by this archive.
