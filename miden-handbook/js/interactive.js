/* ════════════════════════════════════════════
   MIDEN HANDBOOK — interactive.js
   Privacy game · progress tracker · quiz
   AI Chatbot — powered by Claude API
   with streaming, conversation memory,
   and deep Miden knowledge
═══════════════════════════════════════════ */

/* ════════════════════════════════════════════
   PRIVACY GAME
═══════════════════════════════════════════ */

const pgScenarios = [
  {
    icon: '🏦', title: 'Institutional Trading Desk', category: 'Finance',
    desc: 'A bank wants to execute large OTC trades on-chain without revealing their strategy or positions to competitors. What\'s the right Miden approach?',
    choices: ['Use a public Ethereum contract — full transparency','Use a private Miden account with encrypted notes','Use a mixer to obscure transactions after the fact','Post trade data publicly only after execution'],
    correct: 1,
    explanation: 'Private Miden accounts keep state off-chain. Trade logic executes locally with ZK proofs — competitors never see positions or strategy. Only nullifiers go on-chain.'
  },
  {
    icon: '✅', title: 'KYC Compliance Check', category: 'Compliance',
    desc: 'A DeFi protocol needs to verify users are KYC-compliant before letting them trade, without storing personal data on-chain.',
    choices: ['Store passport scans in smart contract storage','Require users to share identity publicly on-chain','Selective disclosure — prove KYC with a ZK proof, reveal nothing else','Skip compliance entirely'],
    correct: 2,
    explanation: 'Selective disclosure generates a ZK proof saying "this user passed KYC" — no personal data exposed. The protocol gets cryptographic certainty, users keep full privacy.'
  },
  {
    icon: '💸', title: 'Private Payroll', category: 'Payments',
    desc: 'A company wants to pay 50 employees in stablecoins without salaries being visible to co-workers or the public.',
    choices: ['Use public notes — transparency builds trust','Private encrypted notes from a company account to each employee wallet','Use a public account but encrypt salary in calldata','Impossible — all on-chain transactions are public'],
    correct: 1,
    explanation: 'Private notes are encrypted end-to-end. Only the recipient can read the note. The company generates proofs locally — nobody outside sees amounts, and there\'s an audit trail via selective disclosure.'
  },
  {
    icon: '🔄', title: 'Private Wallet, Public DEX', category: 'DeFi',
    desc: 'Alice has a private Miden wallet and wants to swap tokens on ZoroSwap, a public DEX. What happens to her privacy during the swap?',
    choices: ['She loses all privacy — public DEX means public transactions','She can\'t interact with public contracts from a private account','Her wallet balance stays private; only the specific swap touches the public DEX','She must convert to a public account first'],
    correct: 2,
    explanation: 'Private ↔ public composability is a core Miden feature. Alice\'s wallet balance stays private. The note she sends to the DEX reveals only what the swap requires — her full holdings remain hidden.'
  },
  {
    icon: '🔍', title: 'Regulatory Audit Trail', category: 'Compliance',
    desc: 'A licensed fintech must prove to a regulator that all transactions were compliant, without making customer data public.',
    choices: ['Make all transactions fully public','Selective disclosure — ZK proofs of compliance without revealing private data','Stop using blockchain — regulators and privacy are incompatible','Use a private sidechain with no public record'],
    correct: 1,
    explanation: 'Selective disclosure lets the fintech generate ZK proofs that all transactions met required rules. The regulator gets cryptographic certainty — customers get privacy.'
  }
];

let pgCurrent = 0, pgScore = 0, pgCombo = 0, pgAnswered = false;

function pgInit() {
  pgCurrent = 0; pgScore = 0; pgCombo = 0; pgAnswered = false;
  document.getElementById('pg-score').textContent = '0';
  document.getElementById('pg-round').textContent = '1 / 5';
  document.getElementById('pg-prog').style.width  = '0%';
  const _nb = document.getElementById('pg-next-btn'); if (_nb) _nb.style.display = 'none';
  const r = document.getElementById('pg-result');
  if (r) r.style.display = 'none';
  pgRender();
}

function pgRender() {
  const s = pgScenarios[pgCurrent];
  const board = document.getElementById('pg-game-board');
  if (!board) return;
  board.style.display = 'block';

  // No inline onclick — use data-idx + addEventListener for reliable mobile touch
  board.innerHTML = `
    <div class="pg-scene-header">
      <div class="pg-scene-icon-wrap">${s.icon}</div>
      <div>
        <div class="pg-scene-title">${s.title}</div>
        <div class="pg-scene-category">${s.category} · Scenario ${pgCurrent + 1} of ${pgScenarios.length}</div>
      </div>
    </div>
    <div class="pg-scene-desc">${s.desc}</div>
    <div class="pg-choices" id="pg-choices">
      ${s.choices.map((c,i) => `<button class="pg-choice" data-idx="${i}" type="button"><span class="choice-letter">${'ABCD'[i]}</span><span class="choice-text">${c}</span></button>`).join('')}
    </div>
    <div class="pg-feedback-bar" id="pg-feedback-bar">
      <div class="pg-feedback-text" id="pg-feedback-text"></div>
      <button class="pg-next-btn" id="pg-next-btn" type="button">${pgCurrent + 1 < pgScenarios.length ? 'Next scenario →' : 'See results →'}</button>
    </div>`;

  document.getElementById('pg-round').textContent = `${pgCurrent + 1} / ${pgScenarios.length}`;
  document.getElementById('pg-prog').style.width  = `${(pgCurrent / pgScenarios.length) * 100}%`;
  pgAnswered = false;

  // Attach touch-safe event listeners after innerHTML is set
  document.querySelectorAll('#pg-choices .pg-choice').forEach(btn => {
    const handle = () => pgAnswer(parseInt(btn.getAttribute('data-idx'), 10));
    btn.addEventListener('click', handle);
    btn.addEventListener('touchend', e => { e.preventDefault(); handle(); }, { passive: false });
  });

  const nextBtn = document.getElementById('pg-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', pgNext);
    nextBtn.addEventListener('touchend', e => { e.preventDefault(); pgNext(); }, { passive: false });
  }
}

function pgAnswer(idx) {
  if (pgAnswered) return;
  pgAnswered = true;
  const s = pgScenarios[pgCurrent];
  const btns = document.querySelectorAll('.pg-choice');
  btns.forEach(b => { b.style.pointerEvents = 'none'; b.onclick = null; });
  const fbText = document.getElementById('pg-feedback-text');
  const nextBtn = document.getElementById('pg-next-btn');
  if (idx === s.correct) {
    btns[idx].classList.add('correct');
    pgScore++; pgCombo++;
    document.getElementById('pg-score').textContent = pgScore;
    fbText.innerHTML = `<span class="fb-result correct">✓ Correct!</span> ${s.explanation}`;
    if (pgCombo >= 2) {
      const el = document.createElement('div');
      el.className = 'pg-combo';
      el.textContent = `${pgCombo}× streak 🔥`;
      const h = document.querySelector('.pg-scene-header');
      if (h) { h.style.position = 'relative'; h.appendChild(el); }
    }
  } else {
    btns[idx].classList.add('wrong');
    btns[s.correct].classList.add('reveal');
    pgCombo = 0;
    fbText.innerHTML = `<span class="fb-result wrong">✗ Not quite.</span> ${s.explanation}`;
  }
  if (nextBtn) nextBtn.style.display = 'inline-block';
}

function pgNext() {
  pgCurrent++;
  if (pgCurrent >= pgScenarios.length) { pgFinish(); return; }
  pgRender();
}

function pgFinish() {
  const board = document.getElementById('pg-game-board');
  if (board) board.style.display = 'none';
  document.getElementById('pg-prog').style.width  = '100%';
  document.getElementById('pg-round').textContent = 'Done';
  const _nb = document.getElementById('pg-next-btn'); if (_nb) _nb.style.display = 'none';
  const emojis = ['😅','🙂','😊','🎯','🏆'];
  const msgs = ['Keep exploring — you\'ll get there!','Good effort — revisit the glossary to sharpen up.','Solid! You understand the core ideas.','Impressive — you really know Miden privacy.','Perfect score! You\'re ready to build. 🛡'];
  const stars = '★'.repeat(pgScore) + '☆'.repeat(5 - pgScore);
  const result = document.getElementById('pg-result');
  result.style.display = 'block';
  result.innerHTML = `<div class="pg-result-emoji">${emojis[pgScore - 1] || '🤔'}</div><h3>${pgScore} / 5</h3><div class="pg-result-stars">${stars}</div><p>${msgs[pgScore - 1] || 'Give it another try!'}</p><button class="pg-next-btn pg-replay" type="button" style="display:inline-block">Play again →</button>`;
  result.querySelector('.pg-replay').addEventListener('click', pgInit);
  result.querySelector('.pg-replay').addEventListener('touchend', e => { e.preventDefault(); pgInit(); }, { passive: false });
  const raw = _loadProgress();
  if (raw.quizBest === undefined || pgScore > (raw.quizBest || 0)) {
    raw.quizBest = pgScore; _saveProgress(raw); _updateWidget();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('pg-game-board')) pgInit();
});


/* ════════════════════════════════════════════
   PROGRESS WIDGET & BADGE TRACKER
═══════════════════════════════════════════ */

const _STORAGE_KEY = 'miden_progress';
function _loadProgress() { try { return JSON.parse(localStorage.getItem(_STORAGE_KEY)) || {}; } catch { return {}; } }
function _saveProgress(d) { try { localStorage.setItem(_STORAGE_KEY, JSON.stringify(d)); } catch {} }

function _getProgress() {
  const p = _loadProgress();
  const today = new Date().toDateString();
  const yest  = new Date(Date.now() - 86400000).toDateString();
  if (p.lastVisit !== today) {
    p.streak    = (p.lastVisit === yest) ? (p.streak || 0) + 1 : 1;
    p.lastVisit = today;
    _saveProgress(p);
  }
  return { streak: p.streak || 1, termsViewed: p.termsViewed || 0, quizBest: p.quizBest ?? null, termsArr: p.termsArr || [] };
}

function _updateWidget() {
  const prog = _getProgress();
  const el = id => document.getElementById(id);
  if (!el('pw-streak')) return;
  el('pw-streak').textContent     = prog.streak + (prog.streak === 1 ? ' day' : ' days');
  el('pw-terms').textContent      = prog.termsViewed;
  el('pw-quiz-score').textContent = prog.quizBest !== null ? prog.quizBest + '/5' : '—';
  const conds = [prog.termsViewed >= 1, prog.termsViewed >= 10, prog.termsViewed >= 50, prog.quizBest !== null && prog.quizBest >= 4, prog.streak >= 7];
  document.querySelectorAll('.pw-badge').forEach((b, i) => b.classList.toggle('unlocked', !!conds[i]));
}

window._trackTermView = function(word) {
  const raw = _loadProgress();
  const arr = raw.termsArr || [];
  if (!arr.includes(word)) { arr.push(word); raw.termsArr = arr; raw.termsViewed = arr.length; _saveProgress(raw); _updateWidget(); }
};

document.addEventListener('DOMContentLoaded', () => {
  _updateWidget();
  document.getElementById('pw-minimize')?.addEventListener('click', e => { e.stopPropagation(); document.getElementById('progress-widget').classList.add('minimized'); });
  document.getElementById('progress-widget')?.addEventListener('click', function() { if (this.classList.contains('minimized')) this.classList.remove('minimized'); });
});

window.addEventListener('load', _updateWidget);


/* ════════════════════════════════════════════
   KNOWLEDGE QUIZ (progress widget)
═══════════════════════════════════════════ */

const quizQuestions = [
  { q: 'What makes zero-knowledge proofs unique?', options: ['They require sharing all data publicly','They prove knowledge without revealing it','They need a trusted third party to work','They only function in offline environments'], correct: 1 },
  { q: 'What does STARK stand for?', options: ['Scalable Transparent ARgument of Knowledge','Secure Transaction and Relay Kit','Standard Token and Record Keeper','Staked Transaction Archival Record'], correct: 0 },
  { q: "What is Miden's primary innovation?", options: ['Faster transactions through sharding','Decentralized exchange infrastructure','Programmable privacy with verifiable computation','NFT marketplace and digital art tools'], correct: 2 },
  { q: 'Which best describes a nullifier in Miden?', options: ['A token burn mechanism for deflation','A proof a note was consumed without revealing which one','A validator penalty for bad behaviour','An access control list for accounts'], correct: 1 },
  { q: 'What is client-side proving in Miden?', options: ["Proofs generated by Miden's central servers","Proofs generated on the user's device, keeping data local",'A proof-of-work mining algorithm','Smart contract auditing by a third party'], correct: 1 }
];

let qzCurrent = 0, qzScore = 0, qzAnswered = false;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('pw-quiz-btn')?.addEventListener('click', openQuiz);
  document.getElementById('quiz-close')?.addEventListener('click', closeQuiz);
  document.getElementById('quiz-next')?.addEventListener('click', () => { qzCurrent++; qzCurrent < quizQuestions.length ? _showQzQuestion() : _finishQuiz(); });
  document.getElementById('quiz-modal')?.addEventListener('click', e => { if (e.target === document.getElementById('quiz-modal')) closeQuiz(); });
});

function openQuiz() { qzCurrent = 0; qzScore = 0; qzAnswered = false; document.getElementById('quiz-score-screen').style.display = 'none'; document.getElementById('quiz-main').style.display = 'block'; document.getElementById('quiz-modal').classList.add('open'); _showQzQuestion(); }
function closeQuiz() { document.getElementById('quiz-modal').classList.remove('open'); }
window.closeQuiz = closeQuiz;

function _showQzQuestion() {
  const q = quizQuestions[qzCurrent];
  document.getElementById('quiz-progress-fill').style.width = `${(qzCurrent / quizQuestions.length) * 100}%`;
  document.getElementById('quiz-q').textContent = `Q${qzCurrent + 1}. ${q.q}`;
  const opts = document.getElementById('quiz-opts');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => { const btn = document.createElement('button'); btn.className = 'quiz-opt'; btn.textContent = opt; btn.onclick = () => _answerQz(i, btn); opts.appendChild(btn); });
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-next').style.display   = 'none';
  qzAnswered = false;
}

function _answerQz(idx, btn) {
  if (qzAnswered) return; qzAnswered = true;
  const q = quizQuestions[qzCurrent];
  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(b => b.style.pointerEvents = 'none');
  const fb = document.getElementById('quiz-feedback');
  if (idx === q.correct) { btn.classList.add('correct'); qzScore++; fb.textContent = '✓ Correct!'; fb.style.color = '#2da44e'; }
  else { btn.classList.add('wrong'); opts[q.correct].classList.add('correct'); fb.textContent = '✗ Not quite — the correct answer is highlighted.'; fb.style.color = '#cf222e'; }
  document.getElementById('quiz-next').style.display = 'inline-block';
}

function _finishQuiz() {
  document.getElementById('quiz-progress-fill').style.width = '100%';
  document.getElementById('quiz-main').style.display = 'none';
  document.getElementById('quiz-score-screen').style.display = 'block';
  document.getElementById('quiz-final-score').textContent = qzScore + '/5';
  const msgs = ['Keep exploring!','Good effort — revisit the glossary.','Not bad! Try for a perfect score.','Almost perfect! Great knowledge.','Perfect! You really know Miden. 🎉'];
  document.getElementById('quiz-final-msg').textContent = msgs[qzScore] || msgs[0];
  const raw = _loadProgress();
  if (raw.quizBest === undefined || qzScore > (raw.quizBest || 0)) { raw.quizBest = qzScore; _saveProgress(raw); _updateWidget(); }
}


/* ════════════════════════════════════════════
   AI CHATBOT — Claude API with streaming
   Real intelligence · conversation memory
   Deep Miden knowledge via system prompt
   Graceful offline fallback
═══════════════════════════════════════════ */

// Conversation history — full session context
const _chatHistory = [];
let _chatOpen = false;
let _chatStreaming = false;

// ── SYSTEM PROMPT ────────────────────────────────
// Everything Claude needs to be a world-class Miden guide
const _MIDEN_SYSTEM = `You are Miden AI — an expert assistant embedded in the Miden Community Handbook. You help anyone understand Miden: from people who've never heard of ZK proofs, to developers ready to deploy on testnet.

## What is Miden
Miden is a ZK-rollup on Ethereum that introduces the "edge blockchain" paradigm — users execute transactions locally on-device, generate a STARK proof, and submit only the proof to the network. The network verifies but never re-executes. Sensitive data never leaves the user's device. The result: programmable privacy at scale, designed for compliant financial applications.

## Core Architecture
- Ethereum L1: settlement, security, final state root
- Miden VM + STARKs: Winterfell prover, execution trace, STARK verification
- Transaction Kernel: note consumption, proof generation, batch aggregation
- Accounts & Notes: state model, asset transfers, scripts, nullifiers
- Applications: wallets, DeFi, private smart contracts

## Key Technical Concepts

STARK proofs: Scalable Transparent ARguments of Knowledge. Quantum-resistant. No trusted setup required. Verification grows logarithmically. Miden uses STARKs via the Winterfell prover (created by Bobbin Threadbare — one of the fastest STARK implementations ever written).

Zero-knowledge proofs: Prove a statement is true without revealing why. Prove a transaction is valid without revealing amounts. Prove KYC compliance without exposing identity. The foundational primitive for Miden's privacy.

Accounts: Every Miden account is a smart contract — code, state, identity. Private accounts: state stored locally, only a cryptographic commitment on-chain. Public accounts: state visible on-chain, like Ethereum contracts. Both types can interact.

Notes: The unit of value transfer between accounts. Notes carry assets + a script defining consumption conditions. Public notes: on-chain, visible to all. Private notes: encrypted end-to-end, only the recipient can read them. Consumed notes generate a nullifier.

Nullifiers: Published on-chain when a private note is consumed. Proves the note was spent without revealing which note. The global nullifier set prevents double-spending while preserving complete privacy.

Client-side proving: Transactions execute locally on-device. The device generates a STARK proof. The network receives: proof + output note commitments — never raw amounts, addresses, or private state.

Selective disclosure: Prove facts about private data without revealing the data itself. Prove balance exceeds a threshold. Prove KYC compliance to a regulator. Prove transaction history met rules. Compliance and privacy coexist.

Tiered Sparse Merkle Tree: Miden's state data structure. On-chain: only cryptographic commitments (hashes). Private account data: stored entirely off-chain. This eliminates the state bloat problem that plagues Ethereum.

Transaction flow:
1. Local client reads account state, identifies notes to consume
2. Transaction runs in Miden VM on-device — state changes, new output notes created
3. Winterfell generates STARK proof of execution trace — private data stays local
4. Proof + note commitments submitted to Miden node (no raw data)
5. Node batches many proofs, verifies on Ethereum L1 — state root updated, transaction final

## Privacy Spectrum
Private accounts: state off-chain, commitment on-chain — like a sealed vault
Hybrid: private wallet calls a public DEX — balance stays private, swap executes publicly
Public accounts: state visible on-chain — like Ethereum

Private ↔ public composability is architecturally unique to Miden. A private wallet can trade on a public AMM without exposing its holdings.

## Building on Miden
Language: Miden Assembly (stack-based, compiles to Miden VM bytecode)
Rust SDK: cargo install miden-client --features concurrent,testing
TypeScript SDK: npm install @demox-labs/miden-sdk
Testnet RPC: rpc.testnet.miden.io:443
Account abstraction: built-in (not bolt-on) — custom auth, gasless txs, multisig, biometrics, session keys
Note scripts: encode vesting, time locks, payment conditions — enforced by ZK proof

## The Team
Bobbin Threadbare (Co-Founder & CTO): former Meta Novi ZK researcher, created Winterfell STARK prover and the Miden VM, pioneer of the edge blockchain concept
Dominik Schmid (Co-Founder & Head of Product): former ConsenSys, Raiden Network, designed the account-and-note model
Azeem Khan (Co-Founder): former Gitcoin, ex-ConsenSys, co-founder of MorphL2, WEF contributor
François Garillot (Engineering Lead), Serge Radinovich (Staff Protocol Engineer), plus 10+ engineers

## Ecosystem
Pioneer Program: funding + mentorship + core team access. Apply at miden.xyz/ecosystem/program/pioneers
Pioneer projects: Qash (private B2B payroll/treasury), ZoroSwap (private/public oracle AMM), Dome (cross-chain private flows), Miden Wallet (browser wallet), Inicio Labs (multisig), Miden Name (name service), Walnut (Miden playground), Lumina Engine (private cross-chain trading)

## Links
miden.xyz · docs.miden.xyz · github.com/0xMiden · x.com/0xMiden · t.me/BuildOnMiden

## Comparison to other approaches
Bitcoin/Ethereum: fully transparent, every transaction visible to everyone, no compliance path
Privacy coins (Monero, Zcash): private but not programmable, high regulatory risk
Mixers: bolt-on anonymity, no compliance path, OFAC sanctioned
Miden: programmable privacy with selective disclosure — private by default, auditable by design

## How to respond
- Match depth to the question: simple question = short answer, deep question = go deep
- Use concrete analogies and examples — ZK is genuinely complex
- When someone seems confused, step back to first principles
- Be conversational, not robotic — this is a chat panel
- Don't over-format: no excessive headers or bullet lists in short answers
- If unsure about something specific, point to docs.miden.xyz
- Never be condescending — privacy cryptography is hard and that's fine
- Remember what was said earlier in this conversation and build on it
- You can be thoughtful, nuanced, and intellectually honest`;

// ── CHAT UI FUNCTIONS ────────────────────────────
function toggleChat() {
  _chatOpen = !_chatOpen;
  document.getElementById('chat-panel').classList.toggle('open', _chatOpen);
  document.getElementById('chat-btn').classList.toggle('open', _chatOpen);
  if (_chatOpen) setTimeout(() => document.getElementById('chat-input')?.focus(), 320);
}
window.toggleChat = toggleChat;

function sendSuggestion(el) {
  const msg = el.textContent;
  el.closest('.chat-suggestions')?.remove();
  _handleUserMsg(msg);
}
window.sendSuggestion = sendSuggestion;

function sendChat() {
  const input = document.getElementById('chat-input');
  const msg   = input.value.trim();
  if (!msg || _chatStreaming) return;
  input.value = '';
  _handleUserMsg(msg);
}
window.sendChat = sendChat;

// ── CORE MESSAGE HANDLER ─────────────────────────
async function _handleUserMsg(msg) {
  if (_chatStreaming) return;

  _addBubble(msg, 'user');
  _chatHistory.push({ role: 'user', content: msg });
  _showTyping();
  _chatStreaming = true;
  _lockInput(true);

  try {
    await _streamResponse();
  } catch (err) {
    // Network error / API unavailable — use smart local fallback
    _removeTyping();
    const fallback = _localFallback(msg);
    _addBubble(fallback, 'bot');
    _chatHistory.push({ role: 'assistant', content: fallback });
  } finally {
    _chatStreaming = false;
    _lockInput(false);
  }
}

// ── CLAUDE API STREAMING ─────────────────────────
async function _streamResponse() {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model:      'claude-haiku-4-5-20251001',
      max_tokens: 700,
      system:     _MIDEN_SYSTEM,
      stream:     true,
      messages:   _chatHistory
    })
  });

  if (!response.ok) throw new Error(`API ${response.status}`);

  _removeTyping();

  // Create streaming bubble
  const wrap = document.getElementById('chat-messages');
  const div  = document.createElement('div');
  div.className = 'chat-msg bot';
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;

  const reader  = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText  = '';
  let buffer    = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') continue;
      try {
        const evt = JSON.parse(data);
        if (evt.type === 'content_block_delta' && evt.delta?.text) {
          fullText += evt.delta.text;
          div.textContent = fullText;
          wrap.scrollTop  = wrap.scrollHeight;
        }
      } catch {}
    }
  }

  // Save to history, trim to last 20 turns to manage context size
  if (fullText) {
    _chatHistory.push({ role: 'assistant', content: fullText });
    if (_chatHistory.length > 20) _chatHistory.splice(0, 2);
  }
}

function _lockInput(locked) {
  const input = document.getElementById('chat-input');
  const btn   = document.getElementById('chat-send');
  if (input) { input.disabled = locked; input.placeholder = locked ? 'Thinking…' : 'Ask about Miden…'; }
  if (btn)   { btn.disabled = locked; btn.style.opacity = locked ? '.4' : '1'; }
}

function _addBubble(text, role) {
  const wrap = document.getElementById('chat-messages');
  const div  = document.createElement('div');
  div.className   = 'chat-msg ' + role;
  div.textContent = text;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

let _typingEl = null;
function _showTyping() {
  const wrap = document.getElementById('chat-messages');
  _typingEl  = document.createElement('div');
  _typingEl.className = 'chat-typing';
  _typingEl.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  wrap.appendChild(_typingEl);
  wrap.scrollTop = wrap.scrollHeight;
}
function _removeTyping() { _typingEl?.remove(); _typingEl = null; }

// ── SMART LOCAL FALLBACK ─────────────────────────
// Used when the API is unreachable (offline / CORS issue in local dev)
// Significantly richer than before — handles nuance and context
function _localFallback(msg) {
  const m = msg.toLowerCase();

  if (/\b(hi|hello|hey|sup|yo|hiya)\b/.test(m))
    return "Hey! 👋 I'm your Miden guide — I can explain ZK proofs from scratch, walk through the architecture, help you understand the testnet setup, or answer anything about privacy. What are you curious about?";

  if (/what is miden|explain miden|tell me about miden|miden protocol|overview/.test(m))
    return "Miden is a ZK-rollup on Ethereum built around a single insight: users should execute their own transactions. You run your transaction locally, your device generates a STARK proof, and you submit only that proof. The network verifies — it never re-executes, never sees your data. The result is programmable privacy at scale — private smart contracts, selective disclosure for regulators, and a protocol that doesn't force you to choose between transparency and compliance.";

  if (/zero.knowledge|zkp|\bzk proof|\bzk\b/.test(m))
    return "Zero-knowledge proofs let you prove a statement is true without revealing any information about why it's true. Prove you know a password without typing it. Prove a transaction is valid without showing the amounts. Prove you're over 18 without sharing your birthdate. Miden uses STARKs — a specific variant that's quantum-resistant, needs no trusted setup, and scales logarithmically. The magic is: the verifier learns nothing except that the statement is true.";

  if (/stark|starks|winterfell|prover/.test(m))
    return "STARKs (Scalable Transparent ARguments of Knowledge) are Miden's proof system. 'Transparent' = no trusted setup — no ceremony that could be compromised by a bad actor. 'Scalable' = verification is logarithmic in complexity. Winterfell is the STARK prover library Miden uses — open-source, written by Bobbin Threadbare, and considered one of the fastest STARK implementations ever built. It's the engine that makes Miden's privacy possible.";

  if (/client.side proving|local prov/.test(m))
    return "Client-side proving is what separates Miden architecturally from every prior chain. Your device executes the transaction and generates the ZK proof. The network never sees your data — it receives the proof and note commitments, verifies them, and updates state. Your private balance, your counterparties, your strategy: none of it leaves your machine. This is also why Miden doesn't have the throughput ceiling that Ethereum has — proving is parallelized across users' devices.";

  if (/\bprivacy\b|\bprivate\b|\bconfidential\b/.test(m))
    return "Miden's privacy isn't a feature bolted on — it's the architecture. Client-side proving means sensitive data never reaches the network. Private accounts store state locally (only a cryptographic hash lives on-chain). Private notes are encrypted end-to-end. Selective disclosure lets you prove specific facts — prove solvency to an auditor, prove KYC compliance to a protocol — without exposing anything else. Compliance and privacy coexist here in a way they can't on any transparent-by-default chain.";

  if (/\bnullifier/.test(m))
    return "A nullifier is a unique cryptographic value published on-chain when a private note is consumed. It proves 'this note was spent' — without revealing which specific note it was. The network maintains a global nullifier set. If your nullifier is already there, the transaction fails — that's how double-spending is prevented with full privacy. It's elegant: you get the security properties of a public ledger without the surveillance properties.";

  if (/\baccount\b/.test(m))
    return "In Miden, every account is a smart contract — code, state, and identity. Private accounts store their state locally: only a cryptographic commitment lives on-chain. Public accounts work exactly like Ethereum contracts — fully transparent. The key insight: accounts don't share a global state, they communicate via notes. This enables parallel execution and makes true private smart contracts possible.";

  if (/\bnote\b|\bnotes\b/.test(m))
    return "Notes are Miden's unit of transfer — think of them like sealed envelopes between accounts. Each note carries assets and a script defining how it can be consumed. Public notes are on-chain and visible to everyone. Private notes are encrypted end-to-end — only the intended recipient can read them. Notes can carry complex conditions: vesting schedules, time locks, multisig requirements — all enforced by the ZK proof.";

  if (/selective disclosure|compliance|regulator|kyc|aml/.test(m))
    return "Selective disclosure is probably Miden's most underappreciated feature. You can generate a ZK proof that reveals specific facts about your data without revealing the data itself. A bank can prove to a regulator that all its transactions complied with AML rules — without showing transaction details. A user can prove KYC compliance to a protocol — without posting identity documents on-chain. The cryptographic proof carries the same weight as full disclosure, but reveals nothing extra.";

  if (/testnet|test net|rpc\.testnet/.test(m))
    return "Miden's testnet is live. Here's the quick path: 1) cargo install miden-client --features concurrent,testing 2) Point config at rpc.testnet.miden.io:443 3) miden-client account new --storage-mode private 4) Mint tokens from the faucet 5) Send your first private transaction. Chapter 06 in this handbook has the full 8-step guide with every command written out.";

  if (/build|developer|sdk|assembly|rust|typescript|npm/.test(m))
    return "Building on Miden means thinking in accounts and notes. Smart contracts are written in Miden Assembly — a stack-based language compiled to Miden VM bytecode. For web apps: npm install @demox-labs/miden-sdk. Account abstraction is built into the protocol (not bolt-on): custom auth schemes, gasless transactions, programmable spending limits, batched transactions in a single proof. Note scripts let you encode complex payment conditions enforced by the ZK proof itself.";

  if (/ecosystem|pioneer|qash|zoroswap|dome|lumina/.test(m))
    return "The Miden Pioneer Program supports early teams building on the network — technical mentorship, grants, and direct core team access. Current projects include: Qash (private B2B payroll and treasury), ZoroSwap (private/public oracle-informed AMM), Dome (cross-chain private financial flows), Miden Wallet (browser wallet), Inicio Labs (multisig), Miden Name (name service), Walnut (Miden playground), and Lumina Engine (private cross-chain trading). Apply at miden.xyz/ecosystem/program/pioneers.";

  if (/team|bobbin|dominik|azeem|founder|who built/.test(m))
    return "Miden was founded by three people who worked on blockchain research at Meta/Facebook's Novi team. Bobbin Threadbare (CTO) created the Winterfell STARK prover and the Miden VM — he's widely considered one of the top STARK experts alive. Dominik Schmid (Head of Product) designed the account-and-note model. Azeem Khan co-founded MorphL2 before Miden. The broader team is ~15 engineers, many with backgrounds in formal verification, cryptography, and systems programming.";

  if (/ethereum|compare|versus|\bvs\b|different from|other chain/.test(m))
    return "The fundamental difference: Ethereum forces every node to re-execute every transaction — transparency is the verification mechanism. Miden proves correctness with ZK proofs instead — nodes verify proofs, never re-execute. This severs the link between security and transparency that's constrained every prior chain. You get security without surveillance, and throughput that scales with users rather than being capped by the slowest validator.";

  if (/thanks|thank you|thx|cheers/.test(m))
    return "Happy to help! If something wasn't clear or you want to go deeper on any of it, just ask — I have no problem going into more detail on any aspect of Miden. 🛡";

  // Glossary term match
  try {
    const data  = JSON.parse(document.getElementById('glossary-data')?.textContent || '{}');
    const match = (data.terms || []).find(t => m.includes(t.word.toLowerCase()));
    if (match) return `${match.word}: ${match.def}\n\nWant me to go deeper on this concept?`;
  } catch {}

  return "I'm having a connection issue right now. For the best answer, try searching the glossary below (230+ terms), open the relevant chapter modal, or visit docs.miden.xyz directly. Once I'm back online I can give you a fuller answer.";
}
