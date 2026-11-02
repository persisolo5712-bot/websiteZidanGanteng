/* ===== Kereta uap lewat pelan di bawah + konvoi kereta mini di atas ===== */
(() => {
  const { layer, still, rand, size, sprite, puff, every } = BG;
  if (!layer || still) return;

  function chug() {
    const w = size(.26, 170, 360);
    const t = sprite('img/kereta.webp', w, 'ground');
    t.querySelector('img').animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(-3px)' }],
      { duration: 380, iterations: Infinity, direction: 'alternate' });
    const steam = setInterval(() => { const b = t.getBoundingClientRect(); puff(b.left + b.width * .25, b.top + 4, ['☁'], '#fff'); }, 700);
    t.animate([{ transform: `translateX(${innerWidth + w}px)` }, { transform: `translateX(${-w * 1.1}px)` }],
      { duration: rand(26000, 34000), easing: 'linear' }).onfinish = () => { clearInterval(steam); t.remove(); };
  }

  function konvoi() {
    const w = size(.16, 100, 200);
    const k = sprite('img/kereta-mini.webp', w);
    const y0 = rand(.08, .5) * innerHeight, steps = 8, kf = [];
    for (let i = 0; i <= steps; i++) {
      const px = innerWidth + w - (i / steps) * (innerWidth + w * 2);
      kf.push({ transform: `translate(${px}px,${y0 + Math.sin(i * 1.1) * 40}px) rotate(${Math.cos(i * 1.1) * 4}deg)` });
    }
    k.animate(kf, { duration: 22000, easing: 'linear' }).onfinish = () => k.remove();
  }

  every(chug, 45000, 60000, 18000);
  if (!RINGAN) every(konvoi, 30000, 45000, 10000);
})();
