'use strict';

/* NAV */
const navbar   = document.getElementById('navbar');
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* HERO PARALLAX */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.1}px)`;
  }, { passive: true });
}

/* SCROLL REVEAL */
const revEls = document.querySelectorAll('.disc-card,.cinfo-item,.about-body,.about-lead,.astat');
revEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 4 === 1) el.classList.add('reveal-d1');
  else if (i % 4 === 2) el.classList.add('reveal-d2');
  else if (i % 4 === 3) el.classList.add('reveal-d3');
});
new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 }).observe || (() => {})();

const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.1 });
revEls.forEach(el => ro.observe(el));

/* SCHEDULE */
const schedData = {
  mo: [
    { time: '10:00–12:00', name: 'Selbstverteidigung & MMA',                  level: 'all' },
    { time: '17:00–18:15', name: 'MMA Kids',                                   level: 'kids' },
    { time: '18:15–19:30', name: 'Thaiboxen',                                  level: 'all' },
    { time: '19:30–21:30', name: 'MMA',                                        level: 'all' },
  ],
  di: [
    { time: '10:00–12:00', name: 'Wushu',                                      level: 'all' },
    { time: '17:00–18:15', name: 'MMA Kids',                                   level: 'kids' },
    { time: '18:15–19:30', name: 'Grappling / Brazilian Jiu-Jitsu',            level: 'all' },
    { time: '19:30–20:30', name: 'MMA',                                        level: 'all' },
  ],
  mi: [
    { time: '10:00–12:00', name: 'Selbstverteidigung & Fitness-Kickboxen (Frauen)', level: 'women' },
    { time: '17:00–18:15', name: 'Wushu Kids',                                level: 'kids' },
    { time: '18:15–19:30', name: 'Selbstverteidigung & Fitness-Kickboxen (Frauen)', level: 'women' },
    { time: '19:30–21:30', name: 'MMA',                                        level: 'all' },
  ],
  do: [
    { time: '10:00–12:00', name: 'MMA',                                        level: 'all' },
    { time: '18:00–19:15', name: 'Thaiboxen',                                  level: 'all' },
    { time: '19:15–20:30', name: 'Grappling / Brazilian Jiu-Jitsu',            level: 'all' },
    { time: '20:30–21:30', name: 'MMA',                                        level: 'all' },
  ],
  fr: [
    { time: '10:00–12:00', name: 'Thaiboxen',                                  level: 'all' },
    { time: '17:00–18:15', name: 'MMA Kids',                                   level: 'kids' },
    { time: '18:15–20:15', name: 'MMA Sparring',                               level: 'advanced' },
  ],
  sa: [
    { time: '12:00–14:00', name: 'MMA – Freies Training',                     level: 'advanced' },
  ],
  so: [
    { time: '10:00–12:00', name: 'Selbstverteidigung & Fitness-Kickboxen (Frauen)', level: 'women' },
  ],
};
const lvlLabel = { all:'Alle Level', advanced:'Fortgeschritten', kids:'Kids & Jugend', women:'Frauen' };

function renderSched(day) {
  const board = document.getElementById('schedBoard');
  board.innerHTML = '';
  const rows = schedData[day] || [];
  if (!rows.length) {
    board.innerHTML = '<p style="color:var(--g400);padding:32px 28px;font-family:var(--fui);letter-spacing:.1em;">Kein Training an diesem Tag.</p>';
    return;
  }
  rows.forEach((r, i) => {
    const d = document.createElement('div');
    d.className = 'srow reveal';
    d.innerHTML = `<div class="srow-time">${r.time}</div><div class="srow-name">${r.name}</div><div class="srow-gym">The Combat Gym</div><div class="srow-badge ${r.level}">${lvlLabel[r.level]}</div>`;
    board.appendChild(d);
    requestAnimationFrame(() => setTimeout(() => d.classList.add('visible'), i * 55));
  });
}

document.querySelectorAll('.stab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    renderSched(t.dataset.day);
  });
});
renderSched('mo');

/* FORM */
const form = document.getElementById('contactForm');
const fok  = document.getElementById('formSuccess');
form.addEventListener('submit', e => {
  e.preventDefault();
  const fn = form.fname.value.trim(), em = form.femail.value.trim(), msg = form.message.value.trim();
  if (!fn || !em || !msg) {
    [form.fname, form.femail, form.message].forEach(f => {
      if (!f.value.trim()) { f.style.borderColor='#777'; f.addEventListener('input',()=>f.style.borderColor='',{once:true}); }
    });
    return;
  }
  const sub = encodeURIComponent(form.subject.value||'Probetraining Anfrage');
  const bod = encodeURIComponent(`Name: ${fn} ${form.lname.value.trim()}\nE-Mail: ${em}\n\n${msg}`);
  window.location.href = `mailto:info@thecombatgym.de?subject=${sub}&body=${bod}`;
  form.reset(); fok.style.display='block';
  setTimeout(()=>fok.style.display='none', 5000);
});

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) {
      e.preventDefault();
      const nh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - nh, behavior:'smooth' });
    }
  });
});
