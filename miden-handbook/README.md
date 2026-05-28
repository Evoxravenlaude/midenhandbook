# Miden Handbook

A community-built guide to Miden — the programmable privacy network for the next generation of compliant finance.

## Structure

```
index.html          ← Main page (open this in a browser)
vercel.json         ← Vercel deployment config
css/
│   ├── main.css        ← Base styles, layout, nav, hero, team, ecosystem, footer
│   ├── glossary.css    ← Collapsible glossary with animation
│   ├── chapters.css    ← Chapter modal styles and diagrams
│   └── interactive.css ← Privacy game, progress widget, quiz, AI chat
└── js/
    ├── main.js         ← Scroll reveal, scroll-nav buttons
    ├── glossary.js     ← Collapsible glossary, search, filter, card rendering
    ├── chapters.js     ← Chapter modal system + all chapter content
    └── interactive.js  ← Privacy game, progress tracker, quiz, AI chatbot
```

## Deploy

### Vercel
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import the repository — Vercel auto-detects it as a static site
4. Click Deploy — done.

### Render / Onrender
1. Push to GitHub
2. On Render: New → Static Site
3. Build command: _(leave blank)_
4. Publish directory: `.` (the root)
5. Deploy.

### Local
Just open `index.html` in any browser — no build step needed.

## Features
- **Chapter modals** — 8 chapters with rich diagrams, code examples, step-by-step guides
- **Collapsible glossary** — 230 terms, searchable, filterable, toggles open/closed
- **Privacy game** — 5 real-world scenarios with interactive choices and instant feedback
- **Progress widget** — tracks daily streak, terms viewed, quiz best score, badges
- **AI chat** — instant answers about Miden, ZK proofs, and glossary terms
- **Scroll nav** — up/down floating buttons
- **iOS Safari compatible** — tested on iOS 15+

---
Community resource — not official Miden documentation.
