/* Muat animasi background SETELAH halaman utama tampil, biar perpindahan halaman nggak nge-blank */
(() => {
  const daftar = ['utils', 'kucing-pesawat', 'roket', 'tuktuk', 'kereta', 'burung', 'hiasan'];
  const jalan = () => daftar.forEach(n => {
    const s = document.createElement('script');
    s.src = `js/bg/${n}.js`; s.async = false;   // async=false: tetap berurutan
    document.body.appendChild(s);
  });
  const siap = () => setTimeout(jalan, 250);
  document.readyState === 'complete' ? siap() : addEventListener('load', siap);
})();
