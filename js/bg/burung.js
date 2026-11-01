/* ===== Burung kaget terbang meliuk ===== */
(() => {
  const { layer, still, rand, size, sprite, puff, every } = BG;
  if (!layer || still) return;
  function fly() {
    const w = size(.07, 50, 90), dir = Math.random() < .5 ? 1 : -1;   // gambar asli menghadap kiri
    const b = sprite('img/burung.png', w);
    const img = b.querySelector('img');
    img.style.scale = dir === 1 ? '-1 1' : '1 1';
    img.animate([{ transform: 'rotate(-7deg) scaleY(1)' }, { transform: 'rotate(7deg) scaleY(.86)' }],
      { duration: 230, iterations: Infinity, direction: 'alternate' });
    const y0 = rand(.05, .45) * innerHeight, steps = 10, kf = [];
    for (let i = 0; i <= steps; i++) {
      const f = dir === 1 ? i / steps : 1 - i / steps;
      kf.push({ transform: `translate(${-w + f * (innerWidth + w * 2)}px,${y0 + Math.sin(i * 1.3) * 55}px)` });
    }
    const trail = setInterval(() => { const r = b.getBoundingClientRect(); puff(r.left + r.width / 2, r.top + r.height / 2, ['✦', '♪', '✨'], '#f5c26b'); }, 600);
    b.animate(kf, { duration: rand(9000, 13000), easing: 'linear' }).onfinish = () => { clearInterval(trail); b.remove(); };
  }
  every(fly, 15000, 25000, 3000);
  addEventListener('pesta', fly);
})();
