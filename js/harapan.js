/* ===== Page 7: tulis harapan -> balon terbang (nggak disimpan di mana pun) ===== */
(() => {
  const inp = byId('wish'), info = byId('info'), lanjut = byId('lanjut'), langit = byId('langit'), MAKS = 8;

  function balon(teks) {
    const b = document.createElement('div');
    b.className = 'balon'; b.textContent = teks; b.style.setProperty('--c', pilih(Konfeti.warna));
    b.style.left = acak(8, Math.max(20, innerWidth - 120)) + 'px';
    langit.appendChild(b);
    const tinggi = innerHeight + 440, goyang = acak(18, 44), kf = [];
    for (let n = 0; n <= 8; n++) kf.push({ transform: `translate(${Math.sin(n * 1.4) * goyang}px,${-(n / 8) * tinggi}px) rotate(${Math.sin(n * 1.4 + 1) * 5}deg)` });
    b.animate(kf, { duration: acak(9000, 12000), easing: 'ease-in' }).onfinish = () => b.remove();
  }
  function kirim() {
    const v = inp.value.trim();
    if (!v) { inp.classList.remove('goyang'); void inp.offsetWidth; inp.classList.add('goyang'); info.textContent = 'Isi dulu harapannya ya 😝'; inp.focus(); return; }
    if (langit.children.length >= MAKS) { info.textContent = 'Tunggu balon sebelumnya terbang dulu ya 🎈'; return; }
    balon(v); inp.value = ''; inp.blur();
    info.textContent = 'Harapanmu terbang ke langit ✨ (boleh nulis lagi)';
    lanjut.hidden = false; lanjut.classList.add('ready');
    Konfeti.burst(innerWidth / 2, innerHeight * .7, 50, .8);
  }
  byId('kirim').onclick = kirim;
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') kirim(); });
})();
