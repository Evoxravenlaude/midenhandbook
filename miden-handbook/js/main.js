/* ════════════════════════════════════════════
   MIDEN HANDBOOK — main.js
   Scroll reveal, nav buttons, misc init
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── INTERSECTION OBSERVER — reveal on scroll ── */
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.rv, .team-card, .eco-card').forEach(el => io.observe(el));

  /* ── SCROLL NAV BUTTONS ─────────────────────── */
  const scrollNav = document.getElementById('scroll-nav');
  const btnUp   = document.getElementById('scroll-up-btn');
  const btnDown = document.getElementById('scroll-down-btn');

  function updateScrollBtns() {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    btnUp.classList.toggle('visible', scrolled > 200);
    btnDown.classList.toggle('visible', scrolled < maxScroll - 100);
  }

  window.addEventListener('scroll', updateScrollBtns, { passive: true });
  updateScrollBtns();

  btnUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  btnDown.addEventListener('click', () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }));

  /* ── ACTIVE NAV LINK HIGHLIGHT ──────────────── */
  const sections = document.querySelectorAll('section[id], div[id].wrap, div[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if (navLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => sectionObserver.observe(s));
  }

});
