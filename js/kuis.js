/* ===== Page 5: kuis kilat (soal diatur di js/config.js) ===== */
(() => {
  const soal = CONFIG.kuis || [], judul = byId('judul'), pil = byId('pil'), kom = byId('komentar'), prog = byId('progres'), lanjut = byId('lanjut');
  let i = 0, skor = 0, kunci = false;

  function tampil() {
    kunci = false; kom.innerHTML = '&nbsp;';
    prog.textContent = `✦ pertanyaan ${i + 1} dari ${soal.length} ✦`;
    const s = soal[i]; judul.textContent = s.tanya; pil.innerHTML = '';
    s.pilihan.map((t, k) => ({ t, k })).sort(() => Math.random() - .5).forEach(({ t, k }, n) => {
      const b = document.createElement('button');
      b.className = 'pil'; b.textContent = t; b.dataset.k = k; b.style.setProperty('--i', n);
      b.onclick = () => jawab(b, k === s.benar);
      pil.appendChild(b);
    });
  }
  function jawab(b, benar) {
    if (kunci) return; kunci = true;
    pil.querySelectorAll('.pil').forEach(x => x.classList.add('kunci'));
    b.classList.add(benar ? 'benar' : 'salah');
    if (benar) skor++; else pil.querySelector(`[data-k="${soal[i].benar}"]`)?.classList.add('tunjuk');
    kom.textContent = benar ? pilih(['Yes, bener! 🎉', 'Tuh kan tau 😎', 'Mantap! ✨']) : pilih(['Yah, salah 😝', 'Hampir… enggak deng 🤭', 'Waduh 🙈']);
    if (benar) { const r = b.getBoundingClientRect(); Konfeti.burst(r.left + r.width / 2, r.top, 40, .7); }
    setTimeout(() => { i++; i < soal.length ? tampil() : selesai(); }, 1400);
  }
  function selesai() {
    const h = CONFIG.kuisHasil, p = skor / soal.length;
    prog.textContent = '✦ hasil kuis ✦';
    judul.textContent = `Skor kamu ${skor} / ${soal.length}`;
    pil.innerHTML = `<div class="skor" style="grid-column:1/-1">${'⭐'.repeat(skor)}${'☆'.repeat(soal.length - skor)}</div>`;
    kom.textContent = p === 1 ? h.penuh : p >= .5 ? h.separuh : h.rendah;
    lanjut.hidden = false; lanjut.classList.add('ready');
    if (p >= .5) Konfeti.burst(innerWidth / 2, innerHeight * .4, p === 1 ? 160 : 90, 1.1);
  }

  if (!soal.length) { judul.textContent = CONFIG.kuisJudul; lanjut.hidden = false; return; }
  judul.textContent = CONFIG.kuisJudul;
  // layar pembuka kuis singkat
  prog.textContent = '✦ kuis kilat ✦';
  pil.innerHTML = '<button class="pil" style="grid-column:1/-1" id="mulai">Mulai kuis ➜</button>';
  byId('mulai').onclick = tampil;
})();
