/* =====================================================
   SEMUA YANG PERLU KAMU EDIT ADA DI SINI ✏️
   ===================================================== */
const CONFIG = {
  nama: 'Ahyun',
  hormatiKurangiAnimasi: false,   // true = kalau HP-nya set "kurangi animasi", kucing/tuk-tuk di background diam
  pengirim: 'dari zidan ♡',

  /* Tanggal lahir (dipakai buat sandi page 2 & hitung umur page 3) */
  lahir: { tgl: 5, bln: 11, thn: 2009 },          // <-- GANTI SESUAI TANGGAL LAHIR ASLI

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
    //'bersamamu',
    //'indah seperti bunga',
    //'Senyumu kala itu',
  ],
  /* ===== Page 5: kuis kilat — GANTI sesuai kenyataan! "benar" = nomor jawaban yang bener (mulai dari 0) ===== */
  kuisJudul: 'Seberapa kenal kamu sama aku? 😏',
  kuis: [
    { tanya: 'Makanan favorit aku apa?', pilihan: ['Nasi goreng', 'Bakso', 'Mie ayam', 'Seblak'], benar: 2 },
    { tanya: 'Warna favorit aku?', pilihan: ['Pink', 'Biru', 'Hitam', 'Hijau'], benar: 2 },
    { tanya: 'Kalau lagi bosen, aku biasanya…', pilihan: ['Tidur', 'Main game', 'Scroll HP', 'Makan'], benar: 2 },
    { tanya: 'Hewan kesukaan aku?', pilihan: ['Kucing', 'Anjing', 'Burung', 'Kelinci'], benar: 0 }
  ],
  kuisHasil: {
    penuh: 'Wah, kamu kenal aku banget! 🥹',
    separuh: 'Lumayan lah, tapi masih perlu belajar lagi 😆',
    rendah: 'Hmm… kayaknya kita perlu ngobrol lebih banyak 🙈'
  },

  hadiah: [
    { judul: 'Kupon #1', isi: 'Aku traktir makan ramen nih 🍜' },
    { judul: 'Kupon #2', isi: 'Kapan kapan belajar bareng di perpus yuk 🎁' },
    { judul: 'Kupon #3', isi: 'Satu permintaan bebas 🎁' }
  ],

  surat: [
    'HAPPY SWEET SEVENTEEN🤍!! ',
    'ga kerasa sekarang udah masuk umur 17 aja. semoga di umur yang baru ini banyak hal baik yang datang ke hidup kamu, banyak hal menyenangkan yang bisa kamu temuin, dan banyak alasan baru buat terus bahagia. semoga semua yang selama ini kamu harapkan, semua yang sering kamu ceritakan, bahkan hal-hal kecil yang cuma kamu simpan sendiri, bisa satu per satu terwujud di waktu yang paling tepat.',
    'terus, jangan lupa buat kasih apresiasi ke diri sendiri, ya. mungkin ada banyak hal yang belum sesuai sama ekspektasi kamu, ada beberapa keinginan yang belum tercapai, atau ada hari-hari yang rasanya berjalan ga sesuai rencana. but that`s okay. kamu ga harus punya semuanya sekarang, ga harus selalu tahu mau ke mana, dan ga harus selalu jadi versi terbaik setiap harinya. pelan-pelan aja, nikmatin prosesnya. you`re still growing, and there`s so much waiting for you out there.',
    'semoga di usia 17 ini kamu bisa ketemu banyak pengalaman baru, cerita-cerita seru, kesempatan yang ga pernah kamu duga, dan orang-orang baik yang bikin perjalanan kamu terasa lebih menyenangkan. semoga hal-hal yang pernah bikin kamu kecewa ga mengurangi semangat kamu buat mencoba hal baru. tetap jadi kamu yang sekarang, dengan segala keunikan dan hal-hal kecil yang bikin kamu berbeda.',
    'oh iya, semoga sehat selalu, panjang umur, dilancarkan segala urusannya, dimudahkan setiap langkahnya, dan ga pernah kekurangan alasan buat bersyukur. semoga doa-doa baik yang hari ini ditujukan buat kamu juga bisa kembali dalam bentuk kebahagiaan yang jauh lebih besar.',
    'once again, happy seventeen! enjoy your day, enjoy your age, and make as many good memories as you can. jangan buru-buru pengen sampai ke mana-mana, karena masa-masa sekarang juga punya banyak hal indah yang layak dinikmati.',
    'be happy, always. i wish nothing but good things for you. 🤍'
  ],

  sutradara: 'Dari Zidan ♡',
  penutup: 'Terima kasih udah mampir ke dunia kecil ini. Sampai ketemu di ulang tahun berikutnya! 💗'
};
