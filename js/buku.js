const COVER_TITLE = CONFIG.judulCover, END_TEXT = CONFIG.teksAkhir;

const LEAVES = 4;             // 4 lembar = 8 sisi: cover, 6 halaman kolase, 1 sisi akhir
const PAGES = LEAVES*2 - 2;   // halaman kolase
const layouts = [
  [{l:5,t:4,r:-5},{l:52,t:30,r:4},{l:9,t:57,r:-3}],
  [{l:52,t:4,r:5},{l:6,t:30,r:-4},{l:50,t:57,r:3}]
];
const stickers = ['🎀','✨','🌸','💗','🧸','⭐'];
const book = document.getElementById('book');
let leaves = [], p = 0, picked = null, pi = 0;

/* Foto dibaca otomatis dari folder: foto/1.jpg, foto/2.jpg, ... (lihat CONFIG di js/config.js) */
let probing = 0, ditemukan = 0;
function selesai(){
  if(--probing > 0) return;
  // kalau ada foto yang ketemu, kotak kosong dibuang; kalau belum ada sama sekali, placeholder dibiarkan
  if(ditemukan > 0) document.querySelectorAll('.pol[data-kosong]').forEach(e => e.remove());
}
function cariFoto(nomor, ph, el){
  const ext = CONFIG.ekstensi; let k = 0; probing++;
  (function coba(){
    if(k >= ext.length){ el.dataset.kosong = '1'; return selesai(); }
    const img = new Image();
    img.onload = () => { ph.replaceChildren(img); ditemukan++; selesai(); };
    img.onerror = () => { k++; coba(); };
    img.src = `${CONFIG.folderFoto}/${nomor}.${ext[k]}`;
  })();
}
function pol(i,pos){
  const el = document.createElement('div');
  el.className = 'pol';
  el.style.cssText = `left:${pos.l}%;top:${pos.t}%;transform:rotate(${pos.r}deg)`;
  el.innerHTML = `<div class="ph">📷</div><div class="cap">${CONFIG.caption[i] || ''}</div>`;
  cariFoto(i+1, el.querySelector('.ph'), el);
  return el;
}

function collage(n){
  const f = document.createElement('div');
  f.style.cssText = 'position:absolute;inset:0';
  layouts[n%2].forEach((pos,k) => f.appendChild(pol(n*3+k,pos)));
  const s = document.createElement('span');
  s.className = 'stk'; s.textContent = stickers[n%stickers.length];
  s.style.cssText = n%2 ? 'left:8%;bottom:6%' : 'right:8%;bottom:6%';
  f.appendChild(s);
  const no = document.createElement('span');
  no.className = 'pno'; no.textContent = String(n+1).padStart(2,'0');
  no.style.cssText = n%2 ? 'right:9%' : 'left:9%';
  f.appendChild(no);
  return f;
}

// lembar 0: cover + halaman kolase 0 di baliknya; lembar berikutnya: kolase depan & belakang
let page = 0;
for(let i=0;i<LEAVES;i++){
  const leaf = document.createElement('div');
  leaf.className = 'leaf';
  const front = document.createElement('div'); front.className = 'face front';
  const back = document.createElement('div'); back.className = 'face back';
  if(i===0){
    front.className = 'face cover';
    front.innerHTML = `<div class="tape-c"></div><small>a little memory book</small><div class="cake">🎂</div><h1>${COVER_TITLE}</h1><small>made with lots of love ♡</small><span class="hint">klik buat buka 🎁</span>`;
    front.style.borderRadius = '3px 16px 16px 3px';
  } else front.appendChild(collage(page++));
  if(i === LEAVES-1){
    back.innerHTML = `<div style="position:absolute;inset:0;display:grid;place-items:center;font:700 1.2rem 'Playfair Display',serif;color:var(--rose)">♡</div>`;
  } else back.appendChild(collage(page++));
  leaf.append(front,back);
  leaf.addEventListener('click', () => go(leaf.classList.contains('flipped') ? -1 : 1));
  book.appendChild(leaf); leaves.push(leaf);
}
const end = document.createElement('div');
end.className = 'endpage';
end.innerHTML = `<div><div style="font-size:2rem">🎀</div><h2 style="font:700 1.3rem 'Playfair Display',serif;color:var(--rose);margin:.4rem 0">${END_TEXT}</h2><p style="font-size:.75rem">masih banyak cerita yang belum ditulis.</p></div>`;
book.appendChild(end);

function render(){
  leaves.forEach((l,i) => l.classList.toggle('flipped', i<p));
  book.classList.toggle('open', p>0 && p<LEAVES);
  book.classList.toggle('end', p===LEAVES);
  document.getElementById('prev').disabled = p===0;
  document.getElementById('next').disabled = p===LEAVES;
  document.getElementById('count').textContent = String(p).padStart(2,'0') + ' / ' + String(LEAVES).padStart(2,'0');
}
function zs(from,to){
  // lembar yang lagi bergerak naik dulu biar nggak ketutup, lalu balik ke urutan normal
  const moving = from<to ? from : to;
  leaves[moving].style.zIndex = 50;
  setTimeout(() => leaves.forEach((l,i) => l.style.zIndex = i<p ? i : LEAVES-i), 650);
}
function go(d){
  const n = p+d; if(n<0||n>LEAVES) return;
  const old = p; p = n; zs(old,n); render();
}
leaves.forEach((l,i) => l.style.zIndex = LEAVES-i);
document.getElementById('next').onclick = () => go(1);
document.getElementById('prev').onclick = () => go(-1);
addEventListener('keydown', e => { if(e.key==='ArrowRight') go(1); if(e.key==='ArrowLeft') go(-1); });
render();