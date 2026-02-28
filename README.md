# OtoBeats — Ensiklopedia Musik Jepang & Komunitas Fans

OtoBeats adalah website modern bertema dark mode neon yang menjadi pusat informasi artis, album, konser, dan berita musik Jepang. Dibangun dengan React + TypeScript serta modular sehingga mudah dikembangkan.

## Fitur Utama

- **Database Artis** : Profil detail lengkap dengan label, genre, rating, dan anggota band.
- **Koleksi Album**: Daftar album, tracklist, tombol simpan, serta tautan dengar Spotify/YouTube.
- **Konser**: Jadwal konser mendatang maupun sebelumnya, lengkap dengan tombol “Add to My Schedule”.
- **Berita**: Grid berita terbaru berisi thumbnail, kategori, tanggal, dan tombol “Read More”.
- **Profil Pengguna**: Favoritkan artis, simpan album, kelola wishlist konser, unggah/hapus avatar.
- **Mode Gelap/Terang**: Toggle tema global dengan aksen merah neon khas Jepang.
- **Responsif** Desain mengikuti Figma dan nyaman di desktop, tablet, serta mobile (hamburger menu).
- **Interaksi Modern** Animasi hover glow, carousel, serta ikon sosial memakai `react-social-icons`.

## Teknologi

- **React 18**, **TypeScript**, **Vite**
- **React Router DOM** untuk routing multipage
- **CSS Modules** + variabel global untuk styling
- **Mock data** (artists, albums, concerts, news, reviews) siap diganti API
- **AuthContext** sederhana (localStorage) untuk demo login/signup

## Persiapan & Instalasi

Pastikan Node.js 18+ dan npm sudah terpasang.

```bash
npm install
npm run dev
```

## Detail Desain

- **Palet**: Hitam, abu gelap, putih, aksen merah neon `#ff2b2b`.
- **Font**: Inter + Noto Sans JP (Google Fonts).
- **Elemen Figma**: hero carousel, grid artis/album, kartu berita, tab detail artis, dsb.
- **Responsive**: Navbar berubah menjadi hamburger setelah login, menu full-screen, tombol besar.
- **Aksesibilitas**: tombol mempunyai label ARIA, dan warna kontras tinggi.

## Data Artis yang Disertakan

Sumika, Ado, YOASOBI, LiSA, Eir Aoi, UNISON SQUARE GARDEN, Kenshi Yonezu, dan RADWIMPS (dapat diperluas lagi di file `src/data`).

## Catatan

- Autentikasi bersifat mock; ganti `AuthContext`
- Favorit/simpan menggunakan localStorage sehingga persist saat refresh.
- React Social Icons ditambahkan untuk ikon YouTube/Instagram/X modern.
