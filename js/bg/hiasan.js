/* ===== Hiasan kecil: confetti & bintang jatuh, jejak kaki, roket mini, vespa ===== */
(() => {
  const { layer, still, rand, pick, size, sprite, every } = BG;
  if (!layer || still) return;
  const jumlah = { bintang: 5, confetti: 5, jejak: 3, roket: 3 };
  const jenis = ['bintang', 'bintang', 'confetti', 'confetti', 'confetti', 'jejak', 'roket'];

  function jatuh() {
    if (layer.querySelectorAll('.hiasan').length > 14) return;
    const k = pick(jenis), n = 1 + Math.floor(rand(0, jumlah[k]));
    const w = k === 'roket' ? size(.035, 30, 50) : k === 'jejak' ? rand(24, 38) : rand(14, 28);
    const el = sprite(`img/hiasan/${k}${n}.png`, w, 'hiasan');
    const x = rand(0, innerWidth - w);
    let kf, opt;
    if (k === 'roket') {
      kf = [{ transform: `translate(${x}px,${innerHeight + 40}px)` }, { transform: `translate(${x + rand(-120, 120)}px,-90px)` }];
      opt = { duration: rand(7000, 10000), easing: 'ease-in' };
    } else if (k === 'jejak') {
      const y = rand(.1, .8) * innerHeight, r = rand(-30, 30);
      kf = [{ transform: `translate(${x}px,${y}px) rotate(${r}deg)`, opacity: 0 },
            { transform: `translate(${x}px,${y - 30}px) rotate(${r}deg)`, opacity: .8, offset: .3 },
            { transform: `translate(${x}px,${y - 70}px) rotate(${r}deg)`, opacity: 0 }];
      opt = { duration: 5000 };
    } else {
      const sway = rand(-80, 80), spin = rand(-360, 360);
      kf = [{ transform: `translate(${x}px,-40px) rotate(0deg)` },
            { transform: `translate(${x + sway}px,${innerHeight * .5}px) rotate(${spin / 2}deg)`, offset: .5 },
            { transform: `translate(${x}px,${innerHeight + 40}px) rotate(${spin}deg)` }];
      opt = { duration: rand(9000, 16000), easing: 'linear' };
    }
    el.animate(kf, opt).onfinish = () => el.remove();
  }

  function vespa() {                      // vespa hijau jalan ke kanan di dasar layar
    const w = rand(60, 80);
    const v = sprite('img/hiasan/vespa1.png', w, 'ground');
    v.style.bottom = '4px';
    v.querySelector('img').animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-3px)' }],
      { duration: 200, iterations: Infinity, direction: 'alternate' });
    v.animate([{ transform: `translateX(${-w}px)` }, { transform: `translateX(${innerWidth + w}px)` }],
      { duration: rand(9000, 13000), easing: 'linear' }).onfinish = () => v.remove();
  }

  every(jatuh, 700, 1400, 500);
  every(vespa, 20000, 35000, 12000);
})();
