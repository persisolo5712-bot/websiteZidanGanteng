/* ===== Kucing naik pesawat: mondar-mandir ===== */
(() => {
  const { layer, still, rand, puff } = BG;
  if (!layer) return;
  const cat = document.createElement('div');
  cat.className = 'cat-fly';
  cat.innerHTML = '<span class="bubble">meow ♡</span><img src="img/kucing.webp" alt="">';
  layer.appendChild(cat);
  const bubble = cat.querySelector('.bubble');

  let x = 0, y = 0, dir = 1, speed = 55, phase = 0, lane = 0, targetLane = 0, t0 = performance.now();
  const newLane = () => rand(innerHeight * .06, innerHeight * .6);

  function turn(d) {
    dir = d; targetLane = newLane(); speed = rand(45, 85);
    x = d === 1 ? -cat.offsetWidth * 1.2 : innerWidth + cat.offsetWidth * .2;
  }
  function frame(now) {
    const dt = Math.min((now - t0) / 1000, .05); t0 = now;
    phase += dt; x += dir * speed * dt;
    lane += (targetLane - lane) * dt * .6;
    y = lane + Math.sin(phase * 2.2) * 12;
    const tilt = Math.sin(phase * 2.2 + 1) * 3 + dir * 2;
    if (dir === 1 && x > innerWidth + cat.offsetWidth * .2) turn(-1);
    else if (dir === -1 && x < -cat.offsetWidth * 1.2) turn(1);
    cat.style.transform = `translate(${x}px,${y}px) scaleX(${dir}) rotate(${tilt * dir}deg)`;
    requestAnimationFrame(frame);
  }
  cat.addEventListener('click', () => {
    bubble.style.scale = dir;
    bubble.classList.add('show');
    setTimeout(() => bubble.classList.remove('show'), 1400);
    for (let i = 0; i < 6; i++) puff(x + cat.offsetWidth / 2, y);
  });

  if (still) cat.style.transform = `translate(${innerWidth * .05}px,${innerHeight * .75}px)`;
  else { lane = targetLane = newLane(); turn(1); requestAnimationFrame(t => { t0 = t; frame(t); }); }
})();
