/* ===== Dipakai semua halaman: background, confetti, pindah halaman, umur ===== */
const BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const TOTAL_HAL = 4;
/* HP / perangkat kentang -> efek dikurangi biar tetap mulus */
const RINGAN = matchMedia('(max-width:700px)').matches || (navigator.hardwareConcurrency || 8) <= 4;
if (RINGAN) document.documentElement.classList.add('ringan');

const byId = id => document.getElementById(id);
const acak = (a, b) => a + Math.random() * (b - a);
const pilih = arr => arr[Math.floor(Math.random() * arr.length)];

function umur() {
  const { tgl, bln, thn } = CONFIG.lahir, now = new Date();
  let u = now.getFullYear() - thn;
  if (now.getMonth() + 1 < bln || (now.getMonth() + 1 === bln && now.getDate() < tgl)) u--;
  return u;
}
// pindah halaman dengan animasi keluar
function pindah(url) { document.body.classList.add('keluar'); setTimeout(() => location.href = url, 550); }

/* elemen yang sama di semua halaman dibuat di sini biar HTML-nya ringkas */
document.body.insertAdjacentHTML('afterbegin', `
  <div class="bg-layer" id="bgLayer" aria-hidden="true"></div>
  <canvas id="confetti" aria-hidden="true"></canvas>
  <span class="deco" style="top:14%;left:9%;font-size:1.8rem;color:#f5c26b">✦</span>
  <span class="deco" style="top:12%;right:12%;font-size:1.2rem">♥</span>
  <span class="deco" style="bottom:22%;left:8%;font-size:1.6rem;animation-delay:1s">♡</span>
  <span class="deco" style="bottom:18%;right:9%;font-size:1.6rem;color:#b49be0;animation-delay:2s">✷</span>
  <div class="pager">0${document.body.dataset.page} / 0${TOTAL_HAL}</div>`);
document.querySelectorAll('[data-ke]').forEach(el => el.addEventListener('click', () => pindah(el.dataset.ke)));

/* confetti */
const Konfeti = (() => {
  const cv = byId('confetti'), cx = cv.getContext('2d');
  const warna = ['#f7a8c4', '#c9b6f2', '#fde7a8', '#a9dcf0', '#f27fa5', '#ffc2d6'];
  let parts = [], jalan = false;
  const fit = () => { cv.width = innerWidth; cv.height = innerHeight; }; fit(); addEventListener('resize', fit);
  function burst(x, y, n = 110, power = 1) {
    if (RINGAN) n = Math.round(n * .55);
    for (let i = 0; i < n; i++) parts.push({ x, y, vx: acak(-7, 7) * power, vy: acak(-14, -3) * power, r: acak(4, 8),
      c: pilih(warna), rot: acak(0, 6), vr: acak(-.3, .3), bulat: Math.random() < .3, life: acak(90, 160) });
    if (!jalan) { jalan = true; requestAnimationFrame(tick); }
  }
  function tick() {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(p => p.life > 0 && p.y < cv.height + 20);
    for (const p of parts) {
      p.vy += .3; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.globalAlpha = Math.min(1, p.life / 30); cx.fillStyle = p.c;
      p.bulat ? (cx.beginPath(), cx.arc(0, 0, p.r / 2, 0, 7), cx.fill()) : cx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
      cx.restore();
    }
    parts.length ? requestAnimationFrame(tick) : (jalan = false, cx.clearRect(0, 0, cv.width, cv.height));
  }
  return { burst, warna };
})();
