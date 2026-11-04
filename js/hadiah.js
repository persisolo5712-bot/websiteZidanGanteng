/* ===== Page 6: kupon kerok (isi kupon diatur di js/config.js) ===== */
(() => {
  const data = CONFIG.hadiah || [], wrap = byId('kupon'), info = byId('info'), lanjut = byId('lanjut');
  let terbuka = 0;
  if (!data.length) { info.textContent = ''; lanjut.disabled = false; lanjut.textContent = 'Lanjut ➜'; return; }
  info.textContent = `0 / ${data.length} kebuka`;

  data.forEach(d => {
    const k = document.createElement('div'); k.className = 'kupon';
    k.innerHTML = '<div class="isi"><small></small><b></b></div><canvas></canvas>';
    k.querySelector('small').textContent = d.judul; k.querySelector('b').textContent = d.isi;
    wrap.appendChild(k); siapkan(k);
  });

  function siapkan(k) {
    const cv = k.querySelector('canvas'), dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.round(k.clientWidth * dpr); cv.height = Math.round(k.clientHeight * dpr);
    const ctx = cv.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, cv.width, cv.height);
    g.addColorStop(0, '#d9cbe8'); g.addColorStop(.5, '#f5c9d9'); g.addColorStop(1, '#cfe3f0');
    ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = 'rgba(255,255,255,.4)';
    for (let n = 0; n < 45; n++) { ctx.beginPath(); ctx.arc(Math.random() * cv.width, Math.random() * cv.height, (1 + Math.random() * 2.5) * dpr, 0, 7); ctx.fill(); }
    ctx.fillStyle = 'rgba(110,55,85,.7)'; ctx.font = `700 ${14 * dpr}px "DM Sans", sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('✦ kerok di sini ✦', cv.width / 2, cv.height / 2);

    let gambar = false, last = null, buka = false, gerak = 0;
    const pos = e => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * cv.width / r.width, y: (e.clientY - r.top) * cv.height / r.height }; };
    function kerok(a, b) {
      ctx.globalCompositeOperation = 'destination-out'; ctx.lineCap = ctx.lineJoin = 'round'; ctx.lineWidth = 36 * dpr;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    function cek() {
      if (buka) return;
      const d = ctx.getImageData(0, 0, cv.width, cv.height).data; let n = 0, t = 0;
      for (let i = 3; i < d.length; i += 64) { t++; if (d[i] < 128) n++; }
      if (n / t > .5) buka_();
    }
    function buka_() {
      buka = true; cv.classList.add('hilang'); k.classList.add('buka'); terbuka++;
      info.textContent = `${terbuka} / ${data.length} kebuka`;
      const r = k.getBoundingClientRect(); Konfeti.burst(r.left + r.width / 2, r.top + r.height / 2, 45, .7);
      if (terbuka === data.length) {
        info.textContent = 'Semua kebuka! 🎉'; lanjut.disabled = false; lanjut.textContent = '🎈 Lanjut ke harapan'; lanjut.classList.add('ready');
        Konfeti.burst(innerWidth / 2, innerHeight * .45, 120, 1.1);
      }
    }
    cv.addEventListener('pointerdown', e => { if (buka) return; gambar = true; cv.setPointerCapture(e.pointerId); last = pos(e); kerok(last, last); });
    cv.addEventListener('pointermove', e => { if (!gambar) return; const p = pos(e); kerok(last, p); last = p; if (++gerak % 12 === 0) cek(); });
    const selesai = () => { if (!gambar) return; gambar = false; cek(); };
    cv.addEventListener('pointerup', selesai); cv.addEventListener('pointercancel', selesai);
  }
})();
