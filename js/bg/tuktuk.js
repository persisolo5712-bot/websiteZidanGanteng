/* ===== Tuk-tuk 4 kucing lewat di bawah (selalu ke kiri, biar tulisan topi nggak kebalik) ===== */
(() => {
  const { layer, still, rand, size, sprite, puff, every } = BG;
  if (!layer || still) return;
  function drive() {
    const w = size(.22, 150, 300);
    const t = sprite('img/tuktuk.png', w, 'ground tuktuk');
    t.insertAdjacentHTML('afterbegin', '<span class="bubble">tin tin! 🛺</span>');
    const bubble = t.querySelector('.bubble');
    t.querySelector('img').animate(
      [{ transform: 'translateY(0) rotate(-.6deg)' }, { transform: 'translateY(-5px) rotate(.6deg)' }],
      { duration: 260, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
    const smoke = setInterval(() => { const b = t.getBoundingClientRect(); puff(b.right - 6, b.bottom - w * .12, ['☁'], '#fff'); }, 500);
    t.addEventListener('click', () => { bubble.classList.add('show'); setTimeout(() => bubble.classList.remove('show'), 1300); });
    t.animate([{ transform: `translateX(${innerWidth + w}px)` }, { transform: `translateX(${-w * 1.2}px)` }],
      { duration: rand(14000, 19000), easing: 'linear' }).onfinish = () => { clearInterval(smoke); t.remove(); };
  }
  every(drive, 28000, 42000, 6000);
  addEventListener('pesta', drive);
})();
