(function () {
  const carouselEl = document.getElementById('carouselExampleDark');

  // 1) Click en botón bocina: alterna el mute del video del mismo slide
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.mute-toggle');
    if (!btn) return;

    const item = btn.closest('.carousel-item');
    const video = item ? item.querySelector('video') : null;
    if (!video) return;

    const willUnmute = video.muted === true;

    // Si se va a activar el sonido, silencia los demás videos primero
    if (willUnmute) {
      carouselEl.querySelectorAll('video').forEach(v => { v.muted = true; });
      carouselEl.querySelectorAll('.mute-toggle').forEach(b => {
        b.classList.remove('is-unmuted');
        b.setAttribute('aria-pressed', 'false');
      });
    }

    video.muted = !video.muted;

    // Intentar reproducir (algunos navegadores lo exigen tras cambios)
    video.play().catch(() => {});

    // UI del botón
    if (!video.muted) {
      btn.classList.add('is-unmuted');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('is-unmuted');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // 2) Al cambiar de slide: pausa/reinicia y silencia para evitar audio fantasma
  carouselEl.addEventListener('slide.bs.carousel', () => {
    carouselEl.querySelectorAll('video').forEach(v => {
      v.pause();
      v.currentTime = 0;
      v.muted = true;
    });
    carouselEl.querySelectorAll('.mute-toggle').forEach(b => {
      b.classList.remove('is-unmuted');
      b.setAttribute('aria-pressed', 'false');
    });
  });

  // 3) Cuando ya quedó el slide activo: reproduce el video (mute)
  carouselEl.addEventListener('slid.bs.carousel', () => {
    const activeItem = carouselEl.querySelector('.carousel-item.active');
    const video = activeItem ? activeItem.querySelector('video') : null;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  });
})();