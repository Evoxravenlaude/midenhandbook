/* ════════════════════════════════════════════
   MIDEN HANDBOOK — chapters.js
   Chapter modal system + all chapter content
═══════════════════════════════════════════ */

const chapterData = [

/* ── 01 WHAT IS MIDEN ──────────────────────── */
{num:"01 · Start Here", title:"What is Miden?", body:`
<h3><span class="sec-num">1</span>The Big Picture</h3>
<p>Miden is a <strong>ZK rollup</strong> — a next-generation blockchain built on Ethereum that does something traditional chains cannot: <strong>programmable privacy at scale</strong>. Where most chains force you to choose between transparency and compliance, Miden gives developers both — at the same time.</p>
<p>Unlike every blockchain before it, Miden users execute their own transactions <em>locally</em> on their own device, generate a cryptographic proof, and submit just that proof to the network. The network verifies. It never re-executes. No data leakage. No bottleneck.</p>
<h3><span class="sec-num">2</span>The Three Pillars</h3>
<div class="ch-diagram"><div class="arch-layers">
  <div class="arch-layer" style="background:rgba(196,82,10,.05);border-color:rgba(196,82,10,.2)"><div class="arch-layer-dot" style="background:#c4520a"></div><div><div class="arch-layer-name">Customizable Privacy</div><div class="arch-layer-desc">public · private · selective disclosure — you choose what's visible</div></div></div>
  <div class="arch-layer" style="background:rgba(139,94,60,.05);border-color:rgba(139,94,60,.2)"><div class="arch-layer-dot" style="background:#8b5e3c"></div><div><div class="arch-layer-name">Quantum Secure</div><div class="arch-layer-desc">STARK proofs · post-quantum cryptography · no trusted setup</div></div></div>
  <div class="arch-layer" style="background:rgba(196,82,10,.04);border-color:rgba(196,82,10,.15)"><div class="arch-layer-dot" style="background:#e06820"></div><div><div class="arch-layer-name">Regulation Ready</div><div class="arch-layer-desc">compliance proofs · selective disclosure · auditable privacy flows</div></div></div>
</div></div>
<h3><span class="sec-num">3</span>What Makes It Different</h3>
<ul>
<li><strong>Edge Blockchain:</strong> Computation happens on your device, not shared infrastructure. You own your execution environment.</li>
<li><strong>Client-side proving:</strong> Your private data never leaves your machine. The proof is the only thing the network ever sees.</li>
<li><strong>Programmable:</strong> Unlike simple privacy coins, Miden supports full smart contract logic — including fully private smart contracts.</li>
<li><strong>Compliant by design:</strong> Selective disclosure lets you prove facts about your data without ever revealing the underlying data itself.</li>
</ul>
<h3><span class="sec-num">4</span>Who Is It For?</h3>
<p>Miden is built for <strong>financial applications</strong> that need both performance and confidentiality — private DEXs, confidential B2B payment rails, compliant institutional DeFi, and any application where "everyone can see your balance" is a dealbreaker.</p>
`},

/* ── 02 WHY MIDEN EXISTS ───────────────────── */
{num:"02 · Context", title:"Why Miden Exists", body:`
<h3><span class="sec-num">1</span>The Problem With Every Blockchain Built Before Miden</h3>
<p>Every public blockchain ever built shares one structural flaw: <strong>everything is visible to everyone.</strong> Your balance. Your counterparties. Your entire strategy. When you transact on Ethereum, every single node can see exactly what you're doing — and they must, because they all re-execute your transaction to verify it.</p>
<div class="ch-diagram"><div style="padding:22px 24px">
  <div style="display:flex;flex-direction:column;gap:0">
    <div class="prob-row" style="--delay:0.05s"><div class="prob-icon">🔍</div><div><div class="prob-title">Forced Transparency</div><div class="prob-desc">Every node stores every balance, every address, every transaction. There is no "private" on a public chain — only obfuscation that can be undone.</div></div></div>
    <div class="prob-row" style="--delay:0.15s"><div class="prob-icon">🐢</div><div><div class="prob-title">The Scale Wall</div><div class="prob-desc">Every node re-executes every transaction. Throughput is capped by the slowest machine. More users = more congestion = higher fees.</div></div></div>
    <div class="prob-row" style="--delay:0.25s"><div class="prob-icon">⚖️</div><div><div class="prob-title">Compliance Impossibility</div><div class="prob-desc">Regulators need auditability. Users need privacy. Traditional blockchains offer neither — you're either fully public or using a mixer. There was no middle ground.</div></div></div>
  </div>
</div></div>
<h3><span class="sec-num">2</span>Why Every Prior Solution Failed</h3>
<div class="ch-diagram"><div style="padding:16px 20px;display:grid;grid-template-columns:1fr 1fr;gap:10px">
  <div class="compare-card bad"><div class="compare-name">Bitcoin &amp; Ethereum</div><div class="compare-desc">Fully transparent. Every balance, every transaction, visible forever. No path to compliant financial apps.</div></div>
  <div class="compare-card bad"><div class="compare-name">Privacy Coins</div><div class="compare-desc">Private but not programmable. Can't build apps. High regulatory risk. Not suitable for institutional use.</div></div>
  <div class="compare-card bad"><div class="compare-name">Mixers &amp; Tumblers</div><div class="compare-desc">Bolt-on anonymity with no compliance path. OFAC-sanctioned. Not a real solution for legitimate finance.</div></div>
  <div class="compare-card good"><div class="compare-name">Miden ✓</div><div class="compare-desc">Programmable privacy with selective disclosure. Private by default, auditable by design.</div></div>
</div></div>
<h3><span class="sec-num">3</span>The ZK Breakthrough</h3>
<p>Zero-knowledge proofs changed everything. For the first time, it became possible to <strong>prove that something is true without revealing why it's true.</strong> A transaction can be proven valid without showing the amounts. An account can be proven solvent without revealing the balance.</p>
<div class="ch-diagram"><div class="flow-diagram">
  <div class="flow-node"><div class="flow-box">Private Transaction</div><div class="flow-sub">amounts, addresses</div></div>
  <div class="flow-arr">→</div>
  <div class="flow-node"><div class="flow-box accent">ZK Proof</div><div class="flow-sub">mathematical proof</div></div>
  <div class="flow-arr">→</div>
  <div class="flow-node"><div class="flow-box soft">Network Verifies</div><div class="flow-sub">sees only ✓ valid</div></div>
</div></div>
<h3><span class="sec-num">4</span>The Vision</h3>
<p>A world where financial applications run on-chain — with the privacy you'd expect from a bank, the auditability a regulator requires, and the permissionless access that makes blockchains worth building. That's why Miden exists.</p>
`},

/* ── 03 CORE CONCEPTS ──────────────────────── */
{num:"03 · Core", title:"Core Concepts", body:`
<h3><span class="sec-num">1</span>Zero-Knowledge Proofs</h3>
<p>A zero-knowledge proof lets you convince someone that a statement is true <strong>without revealing any information about why it's true.</strong> Prove you know a password without typing it. Prove you're over 18 without sharing your birthdate. Prove a transaction is valid without revealing the amounts or counterparties.</p>
<p>Miden uses <strong>STARKs</strong> (Scalable Transparent ARguments of Knowledge) — quantum-resistant, require no trusted setup, and scale logarithmically for complex programs.</p>
<h3><span class="sec-num">2</span>Client-Side Proving</h3>
<div class="ch-diagram"><div class="flow-diagram">
  <div class="flow-node"><div class="flow-box">Your Device</div><div class="flow-sub">executes tx locally</div></div>
  <div class="flow-arr">→</div>
  <div class="flow-node"><div class="flow-box accent">ZK Proof</div><div class="flow-sub">generated on-device</div></div>
  <div class="flow-arr">→</div>
  <div class="flow-node"><div class="flow-box">Miden Network</div><div class="flow-sub">verifies only</div></div>
  <div class="flow-arr">→</div>
  <div class="flow-node"><div class="flow-box soft">State Updated</div><div class="flow-sub">no raw data on-chain</div></div>
</div></div>
<p>Your private data never leaves your device. The network receives only the proof — a compact cryptographic receipt that says "this transaction is valid" without revealing anything else.</p>
<h3><span class="sec-num">3</span>Accounts</h3>
<p>In Miden, an <strong>account</strong> is a smart contract. It has code, state, and an identity. Every user wallet is an account. Every DeFi protocol is an account. Accounts are isolated state machines that hold their own data privately.</p>
<h3><span class="sec-num">4</span>Notes</h3>
<p>A <strong>note</strong> is how value and messages move between accounts. Notes carry assets and a script that defines how they can be consumed. Notes can be <em>public</em> (on-chain, visible to all) or <em>private</em> (encrypted — only the recipient can read them).</p>
<h3><span class="sec-num">5</span>The Miden VM</h3>
<p>The <strong>Miden VM</strong> is a Turing-complete zero-knowledge virtual machine. It executes programs written in Miden Assembly and produces STARK proofs of that execution. Run your contract locally — the VM proves you ran it correctly, without revealing the inputs.</p>
`},

/* ── 04 HOW MIDEN WORKS ────────────────────── */
{num:"04 · Technical", title:"How Miden Works", body:`
<h3><span class="sec-num">1</span>The Architecture Stack</h3>
<div class="ch-diagram"><div class="arch-layers">
  <div class="arch-layer" style="background:rgba(196,82,10,.06);border-color:rgba(196,82,10,.2)"><div class="arch-layer-dot" style="background:#c4520a"></div><div><div class="arch-layer-name">Applications</div><div class="arch-layer-desc">wallets · DeFi protocols · private smart contracts</div></div></div>
  <div class="arch-layer" style="background:rgba(184,148,106,.06);border-color:rgba(184,148,106,.2)"><div class="arch-layer-dot" style="background:#b8946a"></div><div><div class="arch-layer-name">Accounts &amp; Notes</div><div class="arch-layer-desc">state model · asset transfers · scripts · nullifiers</div></div></div>
  <div class="arch-layer" style="background:rgba(139,94,60,.06);border-color:rgba(139,94,60,.2)"><div class="arch-layer-dot" style="background:#8b5e3c"></div><div><div class="arch-layer-name">Transaction Kernel</div><div class="arch-layer-desc">note consumption · proof generation · batch aggregation</div></div></div>
  <div class="arch-layer" style="background:rgba(196,82,10,.04);border-color:rgba(196,82,10,.15)"><div class="arch-layer-dot" style="background:#e06820"></div><div><div class="arch-layer-name">Miden VM + STARKs</div><div class="arch-layer-desc">Winterfell prover · execution trace · STARK verification</div></div></div>
  <div class="arch-layer" style="background:rgba(24,18,10,.03);border-color:var(--border)"><div class="arch-layer-dot" style="background:var(--t4)"></div><div><div class="arch-layer-name">Ethereum L1</div><div class="arch-layer-desc">settlement · security · final state root</div></div></div>
</div></div>
<h3><span class="sec-num">2</span>How a Transaction Works — Step by Step</h3>
<div class="ch-step"><div class="ch-step-n">1</div><div><div class="ch-step-t">Initiation</div><div class="ch-step-d">User's local client reads their current account state and identifies which notes to consume in this transaction.</div></div></div>
<div class="ch-step"><div class="ch-step-n">2</div><div><div class="ch-step-t">Local Execution</div><div class="ch-step-d">The transaction runs inside the Miden VM on the user's device. Account state changes. New output notes are created. All private data stays local.</div></div></div>
<div class="ch-step"><div class="ch-step-n">3</div><div><div class="ch-step-t">Proof Generation</div><div class="ch-step-d">Winterfell prover generates a STARK proof of the full execution trace. Private data stays on your device — only the proof leaves.</div></div></div>
<div class="ch-step"><div class="ch-step-n">4</div><div><div class="ch-step-t">Submission</div><div class="ch-step-d">Proof + output note commitments sent to the Miden node. No amounts, no addresses — just the proof and the commitments.</div></div></div>
<div class="ch-step"><div class="ch-step-n">5</div><div><div class="ch-step-t">Batch Verification</div><div class="ch-step-d">Node aggregates many proofs into a batch proof, verified on Ethereum L1. State root is updated. Transaction is final.</div></div></div>
<h3><span class="sec-num">3</span>Nullifiers &amp; Double-Spend Prevention</h3>
<p>When a private note is consumed, a <strong>nullifier</strong> is published on-chain. It proves the note was spent without revealing <em>which</em> note. The network checks nullifiers against a global set — no double-spends, full privacy.</p>
<h3><span class="sec-num">4</span>State Model: No Bloat</h3>
<p>Global state uses a <strong>tiered sparse Merkle tree</strong>. On-chain, only commitments (hashes of state) live. Private account data sits entirely off-chain — Miden avoids the state bloat that makes Ethereum increasingly expensive to run.</p>
`},

/* ── 05 PUBLIC VS PRIVATE ──────────────────── */
{num:"05 · Privacy", title:"Public vs Private", body:`
<h3><span class="sec-num">1</span>The Privacy Spectrum</h3>
<p>Miden offers a <strong>full spectrum of privacy</strong>. You choose what's visible and to whom — at the account level, the note level, and the transaction level.</p>
<div class="ch-diagram"><div class="priv-spectrum">
  <div class="spectrum-bar"></div>
  <div class="spectrum-labels"><span>Fully Private</span><span>Hybrid</span><span>Fully Public</span></div>
  <div class="spectrum-items">
    <div class="spectrum-item si-priv"><div class="si-label">Private Account</div><div class="si-desc">State stored locally. Only a commitment on-chain. Like a sealed vault.</div></div>
    <div class="spectrum-item si-mix"><div class="si-label">Hybrid</div><div class="si-desc">Private wallet interacts with a public DEX. Private inputs, public execution.</div></div>
    <div class="spectrum-item si-pub"><div class="si-label">Public Account</div><div class="si-desc">State visible on-chain. Works like an Ethereum smart contract.</div></div>
  </div>
</div></div>
<h3><span class="sec-num">2</span>Account Privacy</h3>
<ul>
<li><strong>Public accounts</strong> store code and state on-chain. Anyone can inspect them. Use for DeFi protocols, AMMs, transparent contracts.</li>
<li><strong>Private accounts</strong> store state locally. On-chain, only a hash exists. Use for user wallets, institutional accounts, confidential business logic.</li>
</ul>
<h3><span class="sec-num">3</span>Note Privacy</h3>
<ul>
<li><strong>Public notes</strong> are stored on-chain and visible to all. Used for transparent DeFi, public airdrops.</li>
<li><strong>Private notes</strong> are encrypted end-to-end. Only the recipient can read them. On-chain, only the note commitment and nullifier are ever visible.</li>
</ul>
<h3><span class="sec-num">4</span>Selective Disclosure</h3>
<p>Users can <strong>prove facts about private data without revealing the data itself:</strong></p>
<ul>
<li>Prove your balance exceeds a threshold — without revealing the exact balance.</li>
<li>Prove a transaction occurred at a specific time — without revealing the counterparty.</li>
<li>Prove KYC compliance to a regulator — without posting identity documents on-chain.</li>
<li>Prove solvency to an auditor — without exposing your full portfolio.</li>
</ul>
<p><strong>On Miden, compliance and privacy aren't opposites. They coexist by design.</strong></p>
<h3><span class="sec-num">5</span>Private ↔ Public Composability</h3>
<p>A private account can call a public smart contract. A private wallet sends a note to a public DEX. The DEX executes publicly, but the user's balance and overall strategy remain completely hidden.</p>
`},

/* ── 06 USING THE TESTNET ──────────────────── */
{num:"06 · Testnet", title:"Using the Testnet", body:`
<h3><span class="sec-num">1</span>What You'll Need</h3>
<div class="ch-pill-row"><span class="ch-pill hot">Rust (stable)</span><span class="ch-pill hot">Cargo</span><span class="ch-pill">macOS · Linux · Windows WSL2</span><span class="ch-pill">~10 min</span></div>
<h3><span class="sec-num">2</span>Step-by-Step Guide</h3>
<div class="ch-step"><div class="ch-step-n">1</div><div><div class="ch-step-t">Install Rust</div><div class="ch-step-d">Install via rustup if you don't have it.</div><div class="code-block"><span class="cm"># Install rustup</span>
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env</div></div></div>
<div class="ch-step"><div class="ch-step-n">2</div><div><div class="ch-step-t">Install the Miden Client</div><div class="ch-step-d">Install via Cargo with concurrent proof generation enabled.</div><div class="code-block"><span class="ck">cargo</span> install miden-client --features <span class="cs">concurrent,testing</span></div></div></div>
<div class="ch-step"><div class="ch-step-n">3</div><div><div class="ch-step-t">Configure the Client</div><div class="ch-step-d">Create a config file pointing to the testnet RPC endpoint.</div><div class="code-block"><span class="cm"># miden-client.toml</span>
[rpc]
endpoint = <span class="cs">"https://rpc.testnet.miden.io:443"</span>

[store]
database_filepath = <span class="cs">"store.sqlite3"</span></div></div></div>
<div class="ch-step"><div class="ch-step-n">4</div><div><div class="ch-step-t">Sync with the Network</div><div class="ch-step-d">Pull the latest state from the testnet.</div><div class="code-block"><span class="ck">miden-client</span> sync</div></div></div>
<div class="ch-step"><div class="ch-step-n">5</div><div><div class="ch-step-t">Create Your Wallet</div><div class="ch-step-d">Generate your first private account.</div><div class="code-block"><span class="ck">miden-client</span> account new <span class="cs">--storage-mode private</span>
<span class="cm"># Note your Account ID — you'll need it below</span></div></div></div>
<div class="ch-step"><div class="ch-step-n">6</div><div><div class="ch-step-t">Mint Tokens from the Faucet</div><div class="ch-step-d">Get testnet tokens to your new wallet.</div><div class="code-block"><span class="ck">miden-client</span> tx new mint \
  --target <span class="cs">YOUR_ACCOUNT_ID</span> \
  --faucet  <span class="cs">FAUCET_ID</span> \
  --amount  <span class="cs">1000</span></div></div></div>
<div class="ch-step"><div class="ch-step-n">7</div><div><div class="ch-step-t">Send a Private Transaction</div><div class="ch-step-d">Send tokens — amounts stay private, proven locally with a STARK proof.</div><div class="code-block"><span class="ck">miden-client</span> tx new send \
  --sender <span class="cs">SENDER_ID</span> \
  --target <span class="cs">TARGET_ID</span> \
  --faucet  <span class="cs">FAUCET_ID</span> \
  --amount  <span class="cs">100</span></div></div></div>
<div class="ch-step"><div class="ch-step-n">8</div><div><div class="ch-step-t">Consume Incoming Notes</div><div class="ch-step-d">When you receive tokens, consume the note to update your local state.</div><div class="code-block"><span class="ck">miden-client</span> tx new consume-notes \
  --account <span class="cs">YOUR_ACCOUNT_ID</span></div></div></div>
<h3><span class="sec-num">3</span>Useful Commands</h3>
<ul>
<li><code>miden-client account list</code> — view all accounts and balances</li>
<li><code>miden-client notes list</code> — view pending and consumed notes</li>
<li><code>miden-client tx list</code> — view transaction history</li>
<li><code>miden-client sync</code> — pull latest chain state</li>
</ul>
<div class="ch-pill-row"><span class="ch-pill hot">miden.xyz/testnet</span><span class="ch-pill hot">docs.miden.xyz</span><span class="ch-pill">t.me/BuildOnMiden</span></div>
`},

/* ── 07 BUILDING ON MIDEN ──────────────────── */
{num:"07 · Build", title:"Building on Miden", body:`
<h3><span class="sec-num">1</span>The Developer Mental Model</h3>
<p>Building on Miden means thinking in <strong>accounts and notes</strong>. Application logic lives in accounts — every account is a smart contract. Value and messages flow via notes. State isn't shared globally — each account owns its own, enabling parallel execution, privacy, and dramatically better performance.</p>
<h3><span class="sec-num">2</span>Account Architecture</h3>
<div class="ch-diagram"><div style="padding:20px 24px"><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
  <div style="padding:14px 12px;border:1px solid var(--border);border-radius:9px;text-align:center"><div style="font-size:22px;margin-bottom:7px">🔐</div><div style="font-size:12px;font-weight:600;color:var(--ink)">Auth Component</div><div style="font-size:11px;color:var(--t3);margin-top:5px;line-height:1.5">Who can use this account — keys, multisig, biometrics</div></div>
  <div style="padding:14px 12px;border:1px solid rgba(196,82,10,.2);border-radius:9px;text-align:center;background:var(--op)"><div style="font-size:22px;margin-bottom:7px">⚙️</div><div style="font-size:12px;font-weight:600;color:var(--orange)">Core Interface</div><div style="font-size:11px;color:var(--t3);margin-top:5px;line-height:1.5">Your application logic — procedures, send, swap, stake</div></div>
  <div style="padding:14px 12px;border:1px solid var(--border);border-radius:9px;text-align:center"><div style="font-size:22px;margin-bottom:7px">💾</div><div style="font-size:12px;font-weight:600;color:var(--ink)">Storage</div><div style="font-size:11px;color:var(--t3);margin-top:5px;line-height:1.5">Account state, maps, values — private or public</div></div>
</div></div></div>
<h3><span class="sec-num">3</span>Miden Assembly</h3>
<p>Miden smart contracts are written in <strong>Miden Assembly</strong> — a stack-based language that compiles to Miden VM bytecode.</p>
<div class="code-block"><span class="cm"># A basic account procedure — send an asset as a private note</span>
<span class="ck">export</span>.send_tokens
  push.<span class="cs">ASSET_ID</span>
  call.wallet::send_asset
  call.note::create
end</div>
<h3><span class="sec-num">4</span>TypeScript / JavaScript SDK</h3>
<p>For web and Node.js apps, use the <strong>Miden Web Client SDK</strong>.</p>
<div class="code-block"><span class="cm">// Install</span>
<span class="ck">npm</span> install @demox-labs/miden-sdk

<span class="cm">// Connect &amp; create wallet</span>
<span class="cs">const</span> client = <span class="ck">await</span> MidenWebClient.createClient(
  <span class="cs">"https://rpc.testnet.miden.io:443"</span>
);
<span class="cs">const</span> wallet = <span class="ck">await</span> client.newWallet(AccountStorageMode.Private);</div>
<h3><span class="sec-num">5</span>Note Scripts</h3>
<p>Notes carry assets <em>and</em> a script. Encode vesting schedules, payment conditions, time locks, multisig — all baked into the note, enforced by the ZK proof.</p>
<h3><span class="sec-num">6</span>Built-in Account Abstraction</h3>
<ul>
<li>Custom authentication — biometrics, hardware keys, multisig, social recovery</li>
<li>Gasless transactions via fee-sponsoring accounts</li>
<li>Batched transactions combined into a single proof</li>
<li>Programmable spending limits enforced at the wallet level</li>
</ul>
<div class="ch-pill-row"><span class="ch-pill hot">docs.miden.xyz</span><span class="ch-pill hot">github.com/0xMiden</span><span class="ch-pill">playground.miden.xyz</span></div>
`},

/* ── 08 ECOSYSTEM ──────────────────────────── */
{num:"08 · Ecosystem", title:"The Miden Ecosystem", body:`
<h3><span class="sec-num">1</span>Pioneer Program</h3>
<p>The <strong>Miden Pioneer Program</strong> supports early-stage teams with technical mentorship, co-marketing, grants, and direct access to the core engineering team. Apply at miden.xyz/ecosystem/program/pioneers.</p>
<h3><span class="sec-num">2</span>Pioneer Projects</h3>
<ul>
<li><strong>Qash</strong> — B2B neobank for private payroll and treasury management</li>
<li><strong>ZoroSwap</strong> — Public/private oracle-informed AMM</li>
<li><strong>Dome</strong> — Cross-chain platform for private financial flows</li>
<li><strong>Miden Wallet</strong> — In-browser wallet for easy private payments</li>
<li><strong>Inicio Labs</strong> — Multisig solution built natively on Miden</li>
<li><strong>Miden Name</strong> — Name service for the Miden network</li>
<li><strong>Walnut</strong> — Miden playground and interactive learning environment</li>
<li><strong>Lumina Engine</strong> — Private cross-chain trading infrastructure</li>
</ul>
<h3><span class="sec-num">3</span>Community</h3>
<div class="ch-pill-row"><span class="ch-pill hot">x.com/0xMiden</span><span class="ch-pill hot">t.me/BuildOnMiden</span><span class="ch-pill">github.com/0xMiden</span></div>
<p>The Miden Telegram is the best place for developer support and testnet updates. The GitHub has full open-source code for the VM, client, node, and all core components.</p>
`}

]; // end chapterData

/* ── MODAL FUNCTIONS ─────────────────────── */
function openChapter(idx) {
  const ch = chapterData[idx];
  if (!ch) return;
  document.getElementById('cm-num').textContent   = ch.num;
  document.getElementById('cm-title').textContent = ch.title;
  document.getElementById('cm-body').innerHTML    = ch.body;
  document.getElementById('ch-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeChapter() {
  document.getElementById('ch-modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeChapter(); });

// Expose globally so inline onclick= attributes work
window.openChapter  = openChapter;
window.closeChapter = closeChapter;
