/* ═══════════════════════════════════════════════
   BAPI TRIBUTE — script.js
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── MUSIC PLAYER ──────────────────────────── */
  const audio     = document.getElementById('bg-audio');
  const playBtn   = document.getElementById('play-btn');
  const iconPlay  = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  let   playing   = false;

  function setPlayState(isPlaying) {
    playing = isPlaying;
    iconPlay.style.display  = isPlaying ? 'none'  : 'block';
    iconPause.style.display = isPlaying ? 'block' : 'none';
    document.body.classList.toggle('playing', isPlaying);
    playBtn.setAttribute('aria-label', isPlaying ? 'Pause music' : 'Play music');
  }

  playBtn.addEventListener('click', function () {
    if (playing) {
      audio.pause();
      setPlayState(false);
    } else {
      audio.play()
        .then(() => setPlayState(true))
        .catch(err => console.warn('Audio play blocked:', err));
    }
  });

  audio.addEventListener('ended', () => setPlayState(false));

  /* Auto-start on first user gesture (browsers require it) */
  let autoStarted = false;
  function tryAutoStart() {
    if (autoStarted) return;
    autoStarted = true;
    audio.play()
      .then(() => setPlayState(true))
      .catch(() => { /* silently fail — user can press play */ });
  }

  document.addEventListener('click',      tryAutoStart, { once: true });
  document.addEventListener('touchstart', tryAutoStart, { once: true });
  document.addEventListener('keydown',    tryAutoStart, { once: true });


  /* ─── SCROLL REVEAL ─────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => io.observe(el));
  } else {
    /* Fallback for old browsers */
    reveals.forEach(el => el.classList.add('in'));
  }


  /* ─── SCROLL INDICATOR FADE ─────────────────── */
  const scrollHint = document.querySelector('.scroll-indicator');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      scrollHint.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });
  }

})();
