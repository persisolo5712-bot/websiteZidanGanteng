/* ===== Roket oranye meluncur ke atas sesekali ===== */
(() => {
  const { layer, still, rand, size, sprite, puff, every } = BG;
  if (!layer || still || RINGAN) return;
  function launch() {
    const w = size(.05, 36, 64);
    const r = sprite('img/roket.webp', w, 'rocket');
    r.style.left = rand(innerWidth * .05, innerWidth * .9) + 'px';
    const dist = innerHeight + 320;
    const anim = r.animate([
      { transform: 'translateY(0) rotate(-4deg)' },
      { transform: `translateY(${-dist * .5}px) rotate(4deg)`, offset: .5 },
      { transform: `translateY(${-dist}px) rotate(-3deg)` }
    ], { duration: 6500, easing: 'cubic-bezier(.5,0,.8,.6)' });
    const trail = setInterval(() => { const b = r.getBoundingClientRect(); puff(b.left + b.width / 2, b.bottom + 20); }, 350);
    anim.onfinish = () => { clearInterval(trail); r.remove(); };
  }
  every(launch, 14000, 24000, 4000);
})();
