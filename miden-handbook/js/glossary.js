/* ════════════════════════════════════════════
   MIDEN HANDBOOK — glossary.js
   Collapsible glossary, search, filter, cards
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOAD DATA ─────────────────────────────── */
  const raw = document.getElementById('glossary-data');
  if (!raw) return;
  const { terms } = JSON.parse(raw.textContent);

  /* ── ELEMENTS ──────────────────────────────── */
  const toggleBtn   = document.getElementById('glossary-toggle-btn');
  const body        = document.getElementById('glossary-body');
  const grid        = document.getElementById('glossary-grid');
  const searchInput = document.getElementById('glossary-search');
  const filterSel   = document.getElementById('glossary-filter');
  const noResults   = document.getElementById('no-results');
  const countEl     = document.getElementById('results-count');
  const previewWrap = document.getElementById('glossary-preview');

  let isOpen = false;

  /* ── BUILD PREVIEW CHIPS (top 24 random terms) ─ */
  const previewTerms = [...terms].sort(() => Math.random() - 0.5).slice(0, 24);
  previewTerms.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'glossary-preview-chip';
    btn.textContent = t.word;
    btn.addEventListener('click', () => {
      openGlossary();
      setTimeout(() => {
        searchInput.value = t.word;
        updateDisplay();
        searchInput.focus();
      }, 320);
    });
    previewWrap.appendChild(btn);
  });

  // More button
  const moreBtn = document.createElement('button');
  moreBtn.className = 'glossary-preview-more';
  moreBtn.textContent = `+${terms.length - 24} more terms →`;
  moreBtn.addEventListener('click', openGlossary);
  previewWrap.appendChild(moreBtn);

  /* ── TOGGLE ────────────────────────────────── */
  function openGlossary() {
    isOpen = true;
    body.classList.add('open');
    toggleBtn.classList.add('open');
    toggleBtn.querySelector('.glt-text').textContent = 'Collapse Glossary';
    renderTerms(terms);
  }

  function closeGlossary() {
    isOpen = false;
    body.classList.remove('open');
    toggleBtn.classList.remove('open');
    toggleBtn.querySelector('.glt-text').textContent = 'Browse All Terms';
    searchInput.value = '';
    filterSel.value = 'all';
  }

  toggleBtn.addEventListener('click', () => {
    if (isOpen) closeGlossary(); else openGlossary();
  });

  /* ── CATEGORY COLORS ───────────────────────── */
  const catColors = {
    miden:      'rgba(196,82,10,0.15)',
    zk:         'rgba(139,94,60,0.15)',
    blockchain: 'rgba(196,82,10,0.10)',
    crypto:     'rgba(139,94,60,0.12)',
    defi:       'rgba(196,82,10,0.08)'
  };

  /* ── CARD FACTORY ──────────────────────────── */
  function createCard(term) {
    const card = document.createElement('div');
    card.className = 'glossary-card';

    const headRow = document.createElement('div');
    headRow.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:0';

    const wordEl = document.createElement('div');
    wordEl.className = 'gc-word';
    wordEl.textContent = term.word;

    const tagEl = document.createElement('span');
    tagEl.className = 'gc-tag';
    tagEl.textContent = term.category;
    tagEl.style.background = catColors[term.category] || 'var(--op)';

    headRow.appendChild(wordEl);
    headRow.appendChild(tagEl);

    const defEl = document.createElement('div');
    defEl.className = 'gc-def';
    defEl.textContent = term.def;

    card.appendChild(headRow);
    card.appendChild(defEl);

    card.addEventListener('click', () => {
      if (window._trackTermView) window._trackTermView(term.word);
    });

    return card;
  }

  /* ── RENDER ────────────────────────────────── */
  function renderTerms(list) {
    grid.innerHTML = '';
    if (list.length === 0) {
      grid.style.display = 'none';
      noResults.style.display = 'block';
      countEl.textContent = '0 terms';
      return;
    }
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    countEl.textContent = `${list.length} term${list.length !== 1 ? 's' : ''}`;

    // Render in chunks to avoid blocking the UI
    const CHUNK = 40;
    let i = 0;
    function renderChunk() {
      const end = Math.min(i + CHUNK, list.length);
      const frag = document.createDocumentFragment();
      for (; i < end; i++) frag.appendChild(createCard(list[i]));
      grid.appendChild(frag);
      if (i < list.length) requestAnimationFrame(renderChunk);
    }
    renderChunk();
  }

  /* ── FILTER / SEARCH ───────────────────────── */
  function updateDisplay() {
    const q   = searchInput.value.toLowerCase().trim();
    const cat = filterSel.value;
    let filtered = terms;
    if (cat !== 'all') filtered = filtered.filter(t => t.category === cat);
    if (q) filtered = filtered.filter(t =>
      t.word.toLowerCase().includes(q) || t.def.toLowerCase().includes(q)
    );
    renderTerms(filtered);
  }

  searchInput.addEventListener('input', updateDisplay);
  filterSel.addEventListener('change', updateDisplay);
  searchInput.addEventListener('focus', function() { this.style.borderColor = 'var(--orange)'; });
  searchInput.addEventListener('blur',  function() { this.style.borderColor = 'var(--border)'; });

});
