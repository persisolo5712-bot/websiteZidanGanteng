/* ===== Page 8: surat dalam amplop (isi surat diatur di js/config.js) ===== */
(() => {
  const am = byId('amplop'), wrap = byId('amplopWrap'), surat = byId('surat'), isi = byId('isi'), ttd = byId('ttd'), lanjut = byId('lanjut');
  const teks = (CONFIG.surat || []).map(t => Array.from(t));      // Array.from biar emoji nggak kepotong
  byId('untuk').textContent = `Untuk ${CONFIG.nama},`;
  ttd.textContent = `— ${CONFIG.pengirim}`;
  const ps = teks.map(() => isi.appendChild(document.createElement('p')));
  let dibuka = false, selesai = false, lewat = false, timer = 0, pi = 0, ci = 0;

  am.addEventListener('click', () => {
    if (dibuka) return; dibuka = true; am.classList.add('buka');
    setTimeout(() => wrap.classList.add('pergi'), 1500);
    setTimeout(() => {
      wrap.style.display = 'none'; surat.hidden = false;
      Konfeti.burst(innerWidth / 2, innerHeight * .5, 60, .8);
      teks.length ? ketik() : tamat();
    }, 2050);
  });
  function ketik() {
    if (lewat) return;
    if (ci < teks[pi].length) { ps[pi].textContent = teks[pi].slice(0, ++ci).join(''); surat.scrollTop = surat.scrollHeight; timer = setTimeout(ketik, 26); }
    else { pi++; ci = 0; pi < teks.length ? (timer = setTimeout(ketik, 350)) : tamat(); }
  }
  function tamat() {
    if (selesai) return; selesai = true;
    ttd.classList.add('muncul'); lanjut.hidden = false; lanjut.classList.add('ready');
    surat.scrollTop = surat.scrollHeight;
    Konfeti.burst(innerWidth / 2, innerHeight * .4, 80, .9);
  }
  // ketuk surat = langsung tampilkan semua teks
  surat.addEventListener('click', e => {
    if (selesai || e.target.closest('button')) return;
    lewat = true; clearTimeout(timer); ps.forEach((p, i) => p.textContent = teks[i].join('')); tamat();
  });
})();
