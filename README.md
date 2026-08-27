# Apex Coach — Trainer Portal (Demo)

Standalone trainer-facing portal for the Apex Fitness gym-management product.
Static single-page app, no backend — every trainer's data is seeded to match
the [gym-demo](../gym-demo/) mock so the two apps feel like they share a
customer base.

- **Live:** https://apex-coach.pos.goxx.app
- **Companion:** the front-desk gym demo at https://apex.pos.goxx.app

## Try it

Pick any trainer from the dropdown on the login screen. The PIN is the
**last 4 digits of their phone**:

| Trainer         | Code       | PIN  |
|-----------------|------------|------|
| Bilal Ahmed     | TRN-0001   | 1101 |
| Hassan Iqbal    | TRN-0002   | 1102 |
| Ayesha Malik    | TRN-0003   | 1103 |
| Junaid Anwar    | TRN-0004   | 1104 |
| Sarah Khalid    | TRN-0005   | 1105 |

## What's inside

- **Dashboard** — active members, sessions this week, month-to-date earnings,
  next upcoming session, members needing attention (overdue / long absence).
- **My Members** — read-only list of members assigned to the trainer.
- **This Week** — a schedule grid with seeded sessions.
- **Earnings** — 6-month trend, PTF commission calc, recent payout history.
- **Profile** — the trainer's own record.

State is in-memory + session-cookied to localStorage. There's nothing to
break — refreshing keeps you signed in until you click Sign out.

## Deploy

```bash
cd apex-coach
vercel --prod --yes --scope=darkened-zs-projects
```

Custom domain `apex-coach.pos.goxx.app` is attached at the Vercel project
level — no DNS change needed since `*.pos.goxx.app` already points at Vercel
(`76.76.21.21`).
