/* ===== Page 2: pilih tanggal lahir yang bener -> ucapan.html ===== */
(() => {
  const L = CONFIG.lahir, fmt = (t, b, y) => `${t} ${BULAN[b - 1]} ${y}`;
  const benar = fmt(L.tgl, L.bln, L.thn);

  /* pilihan salah: dari config, atau dibuat otomatis (tanggal/bulan/tahun digeser) */
  const salah = CONFIG.pilihanSalah.filter(x => x !== benar).slice(0, 3);
  while (salah.length < 3) {
    const t = 1 + (L.tgl + Math.floor(acak(2, 15)) - 1) % 28;
    const b = (L.bln - 1 + Math.floor(acak(0, 6))) % 12 + 1;
    const y = L.thn + pilih([-1, 0, 0, 1]);
    const s = fmt(t, b, y);
    if (s !== benar && !salah.includes(s)) salah.push(s);
  }
  const opsi = [benar, ...salah].sort(() => Math.random() - .5);

  byId('tanya').textContent = CONFIG.tanyaSandi;
  const wadah = byId('pilihan'), gembok = byId('gembok'), komen = byId('komentar');
  const ejek = ['Hmm, bukan itu deh 🤨', 'Yakin?? coba inget-inget lagi 😝', 'Waduh, jangan-jangan lupa ultah sendiri 😭',
                'Dikit lagi… (enggak deng) 🤭', 'Itu ultah siapa hayoo 🙈', 'Hampir! Eh, enggak ding 😆'];
  let keliru = 0;

  opsi.forEach((teks, i) => {
    const b = document.createElement('button');
    b.className = 'opsi'; b.textContent = teks; b.style.setProperty('--i', i);
    b.onclick = () => {
      if (teks === benar) return lolos(b);
      b.classList.add('salah'); b.disabled = true; keliru++;
      gembok.classList.remove('goyang'); void gembok.offsetWidth; gembok.classList.add('goyang');
      komen.textContent = ejek[(keliru - 1) % ejek.length];
      if (keliru >= 3) byId('hint').textContent = CONFIG.hint || `hint: lahirnya bulan ${BULAN[L.bln - 1]} lho 😉`;
    };
    wadah.appendChild(b);
  });

  function lolos(b) {
    wadah.querySelectorAll('.opsi').forEach(o => o.disabled = true);
    b.classList.add('benar');
    gembok.className = 'gembok buka'; gembok.textContent = '🔓';
    komen.textContent = 'Betuuul! Pinter banget 🥳';
    byId('hint').textContent = '';
    const r = gembok.getBoundingClientRect();
    Konfeti.burst(r.left + r.width / 2, r.top, 130, 1.1);
    setTimeout(() => pindah('ucapan.html'), 1800);
  }
})();
