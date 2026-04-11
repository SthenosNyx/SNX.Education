# 🚀 Panduan Pengelolaan & Deployment S-Edu Portal

Dokumen ini berisi instruksi teknis untuk memperbarui konten materi, jadwal, serta langkah-langkah mempublikasikan website ke internet menggunakan Vercel.

---

## 📝 1. Cara Mengupdate Konten Utama

Semua konten utama berada di dalam file HTML masing-masing. Kamu hanya perlu mencari bagian spesifik untuk mengubah teksnya.

### A. Menambah/Mengubah Tugas (`tugas.html`)
Cari baris yang berisi `class="task-card"`. Untuk menambah tugas baru, salin satu blok `div` tersebut.
* **Kategori:** Ubah `data-category="umum"` menjadi `agama`, `eksak`, atau `bahasa`.
* **Judul:** Ganti teks di dalam tag `<h3>`.
* **Deskripsi:** Ganti teks di dalam tag `<p>`.
* **Deadline:** Ganti teks di dalam tag `<span>` yang ada di bagian bawah kartu.

### B. Mengupdate Materi Lengkap (`materi-lengkap.html`)
Halaman ini menggunakan sistem **Accordion**.
1. **Judul Bab:** Cari elemen dengan class `category-btn`.
2. **Isi Materi:** Cari `div` dengan class `category-content`. Kamu bisa memasukkan tag HTML seperti:
   - `<p>...</p>` untuk paragraf.
   - `<ul><li>...</li></ul>` untuk daftar poin.
   - `<a href="LINK_FILE">Unduh Materi</a>` untuk lampiran file.

### C. Mengatur Jadwal Kalender (`jadwal.html`)
Scroll ke bagian paling bawah file hingga menemukan tag `<script>`. Cari variabel `const myEvents` dan tambahkan jadwal dengan format berikut:
```javascript
const myEvents = {
    '2026-04-15': 'Ujian Akhir Semester',
    '2026-04-20': 'Libur Idul Fitri',
    // Tambahkan data baru di sini
};
