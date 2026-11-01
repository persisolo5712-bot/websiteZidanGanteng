/* ===== Page 3: ucapan + umur (hitung otomatis dari CONFIG.lahir) ===== */
(() => {
  const jenis = ['kuning', 'garis', 'kraft', 'pink'], miring = [-3, 2.5, -2, 3];
  const catatan = CONFIG.ucapan.slice(0, 4).map((t, i) =>
    `<div class="kertas ${jenis[i]}" style="--r:${miring[i]}deg;--i:${i + 1}">${t}<small>— ${CONFIG.pengirim}</small></div>`);

  byId('meja').innerHTML = `
    <div class="kol">${catatan.slice(0, 2).join('')}</div>
    <div class="kertas utama" style="--r:-1deg;--i:0">
      <p class="kecil">✦ selamat ulang tahun ✦</p>
      <h2>Happy Birthday,<br><span>${CONFIG.nama}!</span></h2>
      <div class="umur"><b id="umur">0</b><span>tahun</span></div>
      <p class="s">usia baru, cerita baru ✨</p>
    </div>
    <div class="kol">${catatan.slice(2, 4).join('')}</div>`;

  /* angka umur menghitung naik dari 0 */
  const target = umur(), el = byId('umur'), mulai = performance.now() + 900;
  (function naik(now) {
    const t = Math.min(Math.max((now - mulai) / 1600, 0), 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(naik);
    else { const r = el.getBoundingClientRect(); Konfeti.burst(r.left + r.width / 2, r.top + r.height / 2, 120, 1.1); }
  })(performance.now());
})();
