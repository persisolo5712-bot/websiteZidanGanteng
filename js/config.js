/* =====================================================
   SEMUA YANG PERLU KAMU EDIT ADA DI SINI ✏️
   ===================================================== */
const CONFIG = {
  nama: 'Zidan Beton',
  hormatiKurangiAnimasi: false,   // true = kalau HP-nya set "kurangi animasi", kucing/tuk-tuk di background diam
  pengirim: 'dari aku ♡',

  /* Tanggal lahir (dipakai buat sandi page 2 & hitung umur page 3) */
  lahir: { tgl: 29, bln: 10, thn: 2006 },          // <-- GANTI SESUAI TANGGAL LAHIR ASLI

  /* Page 2: sandi */
  tanyaSandi: 'Ehh, sebelum lanjut… kamu lahir kapan sih? 🤔',
  pilihanSalah: [],      // isi 3 tanggal salah sendiri, misal ['12 Maret 2006','3 Mei 2005','29 Oktober 2005'] — kosong = dibuat otomatis
  hint: '',              // kosong = hint otomatis (nama bulan lahir), muncul setelah 3x salah

  /* Page 3: catatan ucapan (4 kertas). Edit/ganti kalimatnya sesukamu */
  ucapan: [
    'Panjang umur, sehat selalu, dan makin sukses di semua yang kamu kerjain! 🎉',
    'Makasih ya udah jadi bagian dari cerita-ceritaku. Semoga tahun ini isinya hal baik semua.',
    'Jangan lupa makan kue, jangan lupa ketawa, dan jangan lupa kalau kamu itu keren. ✨',
    'Semoga semua doa yang kamu tiup di lilin tadi beneran kejadian 🕯️💗'
  ],

  /* Page 4: buku kenangan
     Taruh foto di folder "foto" dengan nama berurutan: 1.jpg, 2.jpg, 3.jpg, ... (maks 15).
     Nggak perlu daftar nama file lagi, otomatis kebaca. Kotak yang nggak ada fotonya hilang sendiri. */
  judulCover: 'Our Memories',
  teksAkhir: 'to be continued ♡',
  folderFoto: 'foto',
  ekstensi: ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'PNG'],   // format yang dicoba
  caption: [            // tulisan kecil di bawah foto, urut sesuai nomor foto (boleh dikosongin / dikurangi)
    // 'pertama ketemu',
    // 'hari itu',
    // 'hari itu',
  ]
};
