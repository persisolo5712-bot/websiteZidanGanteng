/* ===== Alat bantu bareng buat semua animasi background ===== */
window.BG = (() => {
  const layer = document.getElementById('bgLayer');
  // default: animasi tetap jalan walau HP lagi 'kurangi animasi' (sering nyala sendiri pas hemat baterai)
  const still = CONFIG.hormatiKurangiAnimasi && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  // lebar sprite = sekian persen lebar layar, dibatasi min & max (px)
  const size = (frac, min, max) => Math.max(min, Math.min(max, innerWidth * frac));

  function sprite(src, width, cls = '') {
    const d = document.createElement('div');
    d.className = 'fly ' + cls;
    d.style.width = width + 'px';
    d.innerHTML = `<img src="${src}" alt="">`;
    layer.appendChild(d);
    return d;
  }
  // semburan kecil (hati, asap, dll) di posisi layar tertentu
  function puff(px, py, chars = ['♡', '✦', '♥', '✨'], color = '#e98ab0') {
    const p = document.createElement('span');
    p.className = 'puff'; p.textContent = pick(chars);
    p.style.cssText = `left:${px}px;top:${py}px;--dx:${rand(-60, 60)}px;color:${color}`;
    layer.appendChild(p); setTimeout(() => p.remove(), 1000);
  }
  // jalankan fn berulang dengan jeda acak (ms)
  function every(fn, min, max, first) {
    setTimeout(function loop() { fn(); setTimeout(loop, rand(min, max)); }, first);
  }
  return { layer, still, rand, pick, size, sprite, puff, every };
})();
