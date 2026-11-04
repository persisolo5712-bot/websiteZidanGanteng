/* ===== Page 9: penutup — kredit, hitung mundur ulang tahun berikutnya ===== */
(() => {
  byId('penutup').textContent = CONFIG.penutup;

  /* kredit: tokoh-tokoh background jadi "pemeran" */
  const orang = [
    ['Pemeran utama', [
      { img: 'kucing', nama: 'Kucing Pesawat', ket: 'sebagai dirinya sendiri' },
      { img: 'tuktuk', nama: 'Empat Anak Kucing', ket: 'penumpang tuk-tuk' },
      { img: 'burung', nama: 'Burung Kaget', ket: 'selalu kaget' },
      { img: 'kereta', nama: 'Kereta Uap', ket: 'jadwalnya suka telat' },
      { img: 'roket', nama: 'Roket Oranye', ket: 'tujuan: bulan' }]],
    ['Dibintangi oleh', [{ em: '🎂', nama: CONFIG.nama, ket: 'yang berulang tahun' }]],
    ['Sutradara & penulis', [{ em: '🎬', nama: CONFIG.sutradara || 'Aku ♡', ket: 'yang bikin web ini' }]],
    ['Dibuat dengan', [{ em: '💗', nama: 'banyak cinta', ket: 'dan sedikit begadang' }]]
  ];
  const ke = byId('kredit');
  orang.forEach(([judul, daftar]) => {
    const h = document.createElement('div'); h.className = 'judul-kredit'; h.textContent = judul; ke.appendChild(h);
    daftar.forEach(d => {
      const r = document.createElement('div'); r.className = 'peran';
      const ikon = d.img ? Object.assign(document.createElement('img'), { src: `img/${d.img}.webp`, alt: '' }) : Object.assign(document.createElement('span'), { className: 'em', textContent: d.em });
      const t = document.createElement('span'); const b = document.createElement('b'); b.textContent = d.nama;
      t.append(b, d.ket); r.append(ikon, t); ke.appendChild(r);
    });
  });

  /* hitung mundur ke ulang tahun berikutnya */
  const wrap = byId('hitung'), ket = byId('hitungKet'), { tgl, bln } = CONFIG.lahir;
  let mode = '', els = [];
  function sasaran(now) {
    const hariIni = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let t = new Date(now.getFullYear(), bln - 1, tgl);
    if (t < hariIni) t = new Date(now.getFullYear() + 1, bln - 1, tgl);
    return t;
  }
  function tick() {
    const now = new Date(), t = sasaran(now);
    if (t.getMonth() === now.getMonth() && t.getDate() === now.getDate() && t.getFullYear() === now.getFullYear()) {
      if (mode !== 'hari') { wrap.innerHTML = '<div class="hari-ini">🎂 Hari ini ulang tahunmu! 🎉</div>'; ket.textContent = 'nikmati harinya sepuasnya ✨'; mode = 'hari'; }
      return;
    }
    if (mode !== 'hitung') {
      wrap.innerHTML = ['hari', 'jam', 'menit', 'detik'].map(l => `<div><b>00</b><small>${l}</small></div>`).join('');
      els = [...wrap.querySelectorAll('b')]; ket.textContent = 'menuju ulang tahunmu berikutnya 🎈'; mode = 'hitung';
    }
    let s = Math.max(0, Math.floor((t - now) / 1000));
    const d = Math.floor(s / 86400); s %= 86400; const j = Math.floor(s / 3600); s %= 3600; const m = Math.floor(s / 60); s %= 60;
    [d, j, m, s].forEach((v, i) => els[i].textContent = String(v).padStart(2, '0'));
  }
  tick(); setInterval(tick, 1000);
  setTimeout(() => Konfeti.burst(innerWidth / 2, innerHeight * .3, 120, 1.1), 500);
})();
