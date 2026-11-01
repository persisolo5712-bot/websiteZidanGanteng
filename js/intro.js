/* ===== Page 1: garland, balon, tiup lilin -> lanjut ke sandi.html ===== */
(() => {
  const warna = Konfeti.warna;

  /* judul: huruf jatuh satu-satu */
  const huruf = (el, teks, off = 0) => { el.innerHTML = [...teks].map((c, i) =>
    `<span class="ch" style="--i:${i + off}">${c === ' ' ? '&nbsp;' : c}</span>`).join(''); };
  huruf(document.querySelector('.l1'), 'Happy Birthday,');
  huruf(byId('nama'), CONFIG.nama + '!', 15);

  /* garland mengikuti lengkungan tali */
  function garland() {
    const g = byId('garland'), W = g.clientWidth, slot = 'HAPPY BIRTHDAY'.split('');
    const fw = W / (slot.length + 1), f = x => 16 * Math.sin(Math.PI * x / W);
    let d = ''; for (let x = 0; x <= W; x += 10) d += (x ? 'L' : 'M') + x + ' ' + f(x).toFixed(1);
    g.innerHTML = `<svg width="${W}" height="70"><path d="${d}" fill="none" stroke="#d9628f" stroke-width="1.5"/></svg>`;
    g.style.setProperty('--fw', fw + 'px');
    slot.forEach((ch, i) => {
      if (ch === ' ') return;
      const x = (i + 1) * fw, sudut = Math.atan((f(x + 4) - f(x - 4)) / 8) * 180 / Math.PI;
      const el = document.createElement('div');
      el.className = 'flag'; el.style.cssText = `left:${x - fw / 2}px;top:${f(x)}px;transform:rotate(${sudut}deg);--i:${i}`;
      el.innerHTML = `<b style="background:${warna[i % warna.length]}">${ch}</b>`;
      g.appendChild(el);
    });
  }
  garland(); addEventListener('resize', garland);

  /* balon naik, klik buat pecahin */
  function balon() {
    const wrap = byId('balloons'); if (wrap.children.length > 9) return;
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.cssText = `left:${acak(3, 92)}%;--c:${pilih(warna)};--d:${acak(11, 18)}s;--dx:${acak(-60, 60)}px`;
    b.onclick = () => { const r = b.getBoundingClientRect(); Konfeti.burst(r.left + r.width / 2, r.top + r.height / 2, 28, .6); b.remove(); };
    b.onanimationend = () => b.remove();
    wrap.appendChild(b);
  }
  for (let i = 0; i < 4; i++) setTimeout(balon, i * 700);
  setInterval(balon, 2200);

  /* tiup lilin -> tombol berubah jadi "Buka kejutan" */
  const cake = byId('cake'), cta = byId('cta'); let padam = false;
  function tiup() {
    if (padam) return; padam = true;
    cake.classList.add('out');
    const r = cake.getBoundingClientRect();
    Konfeti.burst(r.left + r.width / 2, r.top + r.height * .3, 140, 1.15);
    document.querySelectorAll('.flame').forEach((f, i) => setTimeout(() => {
      const b = f.getBoundingClientRect(); BG.puff(b.left + b.width / 2, b.top, ['☁'], '#fff'); }, i * 120));
    dispatchEvent(new Event('pesta'));                  // tuk-tuk & burung langsung nongol
    byId('ctaText').textContent = '🎁 Buka kejutan  ↗'; cta.classList.add('ready');
    byId('msg').textContent = 'Yeay! Semoga semua permintaanmu terkabul. Sekarang ada yang spesial buat kamu… 💗';
  }
  cake.addEventListener('click', tiup);
  cta.addEventListener('click', () => padam ? pindah('sandi.html') : tiup());
  addEventListener('keydown', e => { if (e.key === 'Enter') cta.click(); });
})();
