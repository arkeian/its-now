# ITS Now

## Pendahuluan
<p align="justify">
&emsp;Website ITS Now serta laporan pendukung ini dibuat sebagai suatu pertanggung jawaban akademik dalam memenuhi tugas mata kuliah <b>Pemrograman Web (A)</b>. Pembuatan website ini bertujuan untuk menyelesaikan suatu masalah nyata yang terdapat di lingkungan kampus, melalui penyediaan solusi digital berbasis web. Harapannya laporan ini dapat berfungsi untuk memberikan gambaran terkait website yang telah dibuat, sehingga dapat menjadi acuan dalam evaluasi maupun penilaian penugasan.
</p>

<p align="justify">
Dibuat oleh:
</p>

| Nama							| NRP			|
|-------------------------------|---------------|
| Muhammad Rakha Hananditya R.	| 5027241015	|

## Daftar Isi

- [Pendahuluan](#pendahuluan)
- [Daftar Isi](#daftar-isi)
- [Deskripsi Singkat](#deskripsi-singkat)
- [Latar Belakang Masalah](#latar-belakang-masalah)
- [Solusi yang Ditawarkan](#solusi-yang-ditawarkan)
- [Fitur Utama](#fitur-utama)
- [Fitur Tambahan atau Quality of Life (QoL)](#fitur-tambahan-atau-quality-of-life-qol)
- [Struktur Project](#struktur-project)
- [Tech Stack](#tech-stack)
 - [Setup dan Instalasi](#setup-dan-instalasi)
 - [API Endpoints](#api-endpoints)
 - [Panduan Penggunaan Website](#panduan-penggunaan-website)
 - [Penutup](#penutup)

## Deskripsi Singkat

<p align="justify">
<b>ITS Now</b> dibuat untuk menjawab satu pertanyaan penting:<br><br>
<i>"What's happening in ITS right now?"</i><br><br>
&emsp;ITS Now merupakan suatu media sosial khusus untuk civitas mahasiswa ITS untuk saling berdiskusi, bertanya, mengumumkan sesuatu, atau sekedar berbincang. Melalui pendekatan <i>discussion thread</i>, harapannya ITS Now dapat menjadi <i>one-stop</i> untuk mahasiswa ITS mengetahui hal-hal yang terjadi di sekitar ITS.
</p>

## Latar Belakang Masalah

<p align="justify">
Di lingkungan ITS, persebaran informasi seputar ITS masih belum efisien dikarenakan hal-hal berikut:
<ol>
	<li>Masih belum ada suatu saluran terpusat untuk mengetahui segala informasi terkait hal yang sedang terjadi di ITS.</li>
	<li>Persebaran informasi umumnya dilakukan via grup WhatsApp setiap prodi atau melewati Instagram milik <i>broadcaster</i> atau yang bersangkutan. Sehingga informasi tersebut memiliki potensi tidak terbaca, terlewat, tertimbun, dan sebagainya.</li>
	<li>Penyiaran informasi secara fisik seperti melalui papan pengumuman hanya dapat menjangkau mahasiswa yang bertempat di sekitar papan pengumuman berada.</li>  
	<li><i>Broadcaster</i> tidak dapat mengetahui jika informasi yang disiarkan olehnya sudah tersebar sampai mana.</li>
</ol>
</p>

## Solusi yang Ditawarkan

<p align="justify">
	Website untuk <i>broadcasting</i> dan berdiskusi antar mahasiswa ITS, di mana sesama mahasiswa dapat:
	<ol>
		<li>Bertanya dan bertukar informasi terkait hal seputar lingkungan ITS, misal: "<i>Di Keputih mana ya Nasi Pecel yang paling enak?</i>" atau "<i>Rek, sekarang CCWS yang deket K1 Mart penuh atau tidak ya?</i>"</li>
		<li>Bertanya dan mengumumkan terkait barang yang hilang dan ditemukan.</li>
		<li>Bertanya dan berdiskusi terkait tugas kuliah.</li>
		<li>Mengumumkan penjualan barang dan jasa.</li>
		<li>Mengumumkan terbukanya posisi staff untuk suatu event (<i>open recruitment</i>).</li>
		<li>Mengumumkan adanya event yang terjadi di suatu tempat di ITS.</li>
		<li>Berkomentar dan berbincang terkait diskusi yang sudah dibuka sebelumnya.</li>
	</ol>
</p>

<p align="justify">
	&emsp;Terlebih dari itu, setiap kali mahasiswa ingin membuka suatu diskusi, maka mahasiswa tersebut dapat membuat postingan baru. Di situ, mahasiswa lain dapat secara anonim memilih untuk mendukung (<i>upvote</i>) atau tidak mendukung (<i>downvote</i>) postingan tersebut. Semakin banyak dukungan, semakin tinggi posisi postingan tersebut di halaman website.
	<br><br>
	&emsp;Tujuannya adalah agar postingan yang paling relevan, bermanfaat, dan disukai banyak mahasiswa dapat muncul di bagian teratas, serta memudahkan mahasiswa lain untuk menemukan informasi tersebut. Selain itu, fitur ini berguna untuk menghindari postingan yang sepatutnya tidak untuk dibagikan, karena semakin banyaknya <i>downvote</i> dari mahasiswa lain dapat menyebabkan postingan tersebut dihapus.
	<br><br>
	&emsp;Harapannya dengan pendekatan <i>discussion thread</i> ini diskusi terkait suatu topik bisa menjadi lebih <i>non-intrusive</i> atau tidak mengganggu mahasiswa lain yang mungkin kurang tertarik dengan topik yang dibahas tersebut ataupun lagi tidak ingin mendapatkan notifikasi tidak penting yang umumnya didapatkan saat adanya diskusi melalui <i>platform</i> sosial lainnya seperti Whatsapp.
</p>

## Fitur Utama

<p align="justify">
Berikut adalah fitur-fitur utama yang disediakan oleh <b>ITS Now</b>:
</p>

1. <b>Broadcast</b>  
	<p align="justify">
	Fitur untuk menyebarkan pengumuman atau informasi penting secara luas kepada seluruh mahasiswa ITS. Contohnya: informasi event kampus, lowongan panitia acara, barang hilang/temuan, promo penjualan barang/jasa, dan lain-lain. Setiap broadcast ditampilkan pada halaman khusus sehingga mudah ditemukan dan tidak tenggelam oleh percakapan lain.
	</p>

2. <b>Discussion Thread</b>  
	<p align="justify">
	Mahasiswa dapat membuat <i>discussion thread</i> untuk berdiskusi mengenai topik tertentu, seperti tugas kuliah, informasi kehidupan kampus, rekomendasi tempat makan, hingga tips akademik. Di dalam satu thread, pengguna lain dapat saling membalas komentar sehingga alur diskusi tetap terstruktur pada satu halaman dan tidak mengganggu pembahasan dengan topik lain.
	</p>

3. <b>Sistem Vote (Upvote/Downvote)</b>  
	<p align="justify">
	Setiap broadcast maupun thread dapat diberi <i>upvote</i> atau <i>downvote</i> secara anonim. Konten dengan banyak <i>upvote</i> akan muncul di bagian atas dan dianggap lebih relevan, sedangkan konten dengan banyak <i>downvote</i> berpotensi untuk disembunyikan atau dihapus sehingga kualitas informasi di platform tetap terjaga.
	</p>

4. <b>Komentar</b>  
	<p align="justify">
	Pengguna dapat memberikan komentar pada thread maupun broadcast untuk bertanya, menambahkan informasi, atau berdiskusi lebih lanjut. Hal ini membuat setiap topik memiliki ruang diskusi tersendiri tanpa mengganggu pengguna yang tidak tertarik dengan topik tersebut.
	</p>

5. <b>Tag dan Kategori</b>  
	<p align="justify">
	Setiap postingan dapat dikelompokkan berdasarkan tag atau kategori, misalnya: akademik, <i>event</i>, <i>lost & found</i>, jualan, dan sebagainya. Dengan adanya tag, mahasiswa dapat mencari broadcast dan thread yang relevan dan sesuai kebutuhan dengan lebih cepat.
	</p>

6. <b>Pencarian dan Sortir</b>  
	<p align="justify">
	Tersedia fitur pencarian thread/broadcast berdasarkan judul atau kata kunci tertentu, serta pengurutan (sort) berdasarkan waktu (<i>Recent</i>), jumlah voting (<i>Best</i> dan <i>Controversial</i>), maupun tingkat aktivitas pada komentar (<i>Hot</i>). Hal ini memudahkan pengguna menemukan informasi yang sedang ramai dibicarakan maupun informasi terbaru.
	</p>

7. <b>Profil Pengguna</b>  
	<p align="justify">
	Setiap mahasiswa memiliki profil yang menampilkan identitas dasar dan aktivitas terkait, seperti thread yang pernah dibuat ataupun komentar yang pernah dikirim. Profil ini membantu menjaga akuntabilitas diskusi, meskipun beberapa interaksi (seperti vote) tetap dapat dilakukan secara anonim.
	</p>

8. <b>Bookmark / Penyimpanan Postingan</b>  
	<p align="justify">
	Pengguna dapat menyimpan thread atau broadcast tertentu ke dalam daftar bookmark pribadi. Fitur ini berguna untuk menandai informasi penting (misalnya pengumuman lomba atau materi kuliah) agar mudah diakses kembali tanpa perlu mencarinya ulang.
	</p>

9. <b>Mode Gelap (Dark Mode)</b>  
	<p align="justify">
	Website menyediakan dukungan tema terang dan gelap untuk meningkatkan kenyamanan mata pengguna, khususnya saat mengakses platform dalam jangka waktu lama atau di kondisi cahaya redup.
	</p>

10. <b>Keamanan dan Moderasi Konten</b>  
	 <p align="justify">
	 Konten yang dikirimkan pengguna melalui form akan diproses dan disaring (misalnya melalui sanitasi HTML) untuk mencegah penyalahgunaan seperti <i>script injection</i> dan spam. Selain itu, kombinasi sistem vote dan pelaporan pengguna membantu menjaga agar konten yang tampil tetap sesuai dengan etika dan norma kampus.
	 </p>

## Fitur Tambahan atau Quality of Life (QoL)

<p align="justify">
Selain fitur inti, <b>ITS Now</b> juga dilengkapi dengan berbagai fitur tambahan yang bertujuan untuk meningkatkan kenyamanan dan efisiensi penggunaan sehari-hari:
</p>

1. <b>Auto Save Draft</b>  
	<p align="justify">
	Saat pengguna menulis thread atau broadcast, konten yang sedang diketik dapat tersimpan sementara (auto save) sehingga meminimalkan risiko tulisan hilang ketika halaman tertutup tidak sengaja, koneksi terputus, atau pengguna berpindah halaman.
	</p>

2. <b>Bookmark & Scroll Memory</b>  
	<p align="justify">
	Selain menyimpan postingan favorit melalui fitur bookmark, sistem juga menyimpan posisi scroll (scroll memory) pada beberapa halaman. Hal ini memudahkan pengguna untuk kembali ke posisi terakhir ketika membuka ulang daftar thread atau broadcast.
	</p>

3. <b>Hotkeys / Pintasan Keyboard</b>  
	<p align="justify">
	Beberapa aksi umum seperti mengirim form atau memicu tindakan tertentu dapat dilakukan menggunakan kombinasi tombol (hotkeys), misalnya <i>Ctrl + Enter</i> untuk submit. Fitur ini mempercepat interaksi, terutama bagi pengguna yang terbiasa bekerja dengan keyboard.
	</p>

4. <b>Validasi Input dan Pesan Error yang Jelas</b>  
	<p align="justify">
	Setiap form (misalnya login, register, dan pembuatan thread) dilengkapi dengan validasi input yang ketat, seperti pengecekan format email dan kekuatan password. Jika terjadi kesalahan, pengguna akan mendapatkan pesan error yang spesifik sehingga lebih mudah memperbaiki input.
	</p>

5. <b>Toast Notification</b>  
	<p align="justify">
	Informasi penting seperti hasil login, keberhasilan menyimpan data, atau error dari server ditampilkan melalui <i>toast notification</i> yang muncul sementara di layar. Dengan demikian, pengguna selalu mendapatkan umpan balik (feedback) tanpa harus berpindah halaman.
	</p>

6. <b>Loading Indicator dan Skeleton UI</b>  
	<p align="justify">
	Saat data sedang diambil dari server, aplikasi menampilkan indikator <i>loading</i> dan <i>skeleton UI</i> untuk mengisi ruang konten sementara. Pendekatan ini membuat tampilan terasa lebih halus dan mengurangi kesan “blank” ketika menunggu respons.
	</p>

7. <b>Go To Top Button</b>  
	<p align="justify">
	Pada halaman dengan konten yang panjang, tersedia tombol “Go To Top” yang membantu pengguna kembali ke bagian atas halaman hanya dengan satu klik, tanpa perlu melakukan scroll manual dari bawah ke atas.
	</p>

8. <b>Preview Link dan Konten</b>  
	<p align="justify">
	Sistem menyediakan <i>preview</i> untuk beberapa jenis konten, seperti tautan (link preview) atau cuplikan isi thread, sehingga pengguna dapat menangkap gambaran isi postingan sebelum membuka halaman detail sepenuhnya.
	</p>

9. <b>Dukungan Gambar dan Video</b>  
	<p align="justify">
	Pengguna dapat melampirkan media berupa gambar maupun video pada postingan tertentu melalui komponen upload yang terpisah. Hal ini memudahkan penyampaian informasi visual, misalnya dokumentasi kegiatan, poster acara, atau bukti foto untuk barang hilang/temuan.
	</p>

10. <b>Theme Management (Light/Dark Mode)</b>  
	<p align="justify">
	Pengaturan tema disimpan dan dikelola melalui konteks khusus sehingga pilihan mode terang/gelap pengguna dapat dipertahankan antar sesi. Hal ini membuat pengalaman menggunakan website menjadi lebih personal dan konsisten.
	</p>

11. <b>Aksesibilitas Dasar</b>  
	 <p align="justify">
	 Beberapa utilitas disiapkan untuk mendukung aksesibilitas, seperti pengaturan fokus, penggunaan komponen yang semantik, dan pengaturan warna yang lebih nyaman. Tujuannya agar <b>ITS Now</b> dapat diakses dengan lebih baik oleh berbagai tipe pengguna.
	 </p>

## Struktur Project

```bash
its-now/
├── README.md
├── package.json
├── package-lock.json
├── node_modules/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── .env
│   ├── node_modules/
│   └── src/
│       ├── server.ts
│       ├── configs/
│       │   ├── jwt.ts
│       │   └── mongo.ts
│       ├── controllers/
│       │   ├── authController.ts
│       │   ├── broadcastController.ts
│       │   ├── commentController.ts
│       │   ├── threadController.ts
│       │   └── userController.ts
│       ├── middlewares/
│       │   └── authMiddleware.ts
│       ├── models/
│       │   ├── Broadcast.ts
│       │   ├── Comment.ts
│       │   ├── Thread.ts
│       │   └── User.ts
│       ├── routes/
│       │   ├── authRoutes.ts
│       │   ├── broadcastRoutes.ts
│       │   ├── commentRoutes.ts
│       │   ├── threadRoutes.ts
│       │   ├── uploadRoutes.ts
│       │   └── userRoutes.ts
│       └── utils/
│           ├── htmlSanitation.ts
│           ├── inputValidators.ts
│           └── passwordHashing.ts
└── frontend/
	├── eslint.config.js
	├── index.html
	├── package.json
	├── package-lock.json
	├── tsconfig.json
	├── tsconfig.app.json
	├── tsconfig.node.json
	├── vite.config.ts
	├── node_modules/
	├── public/
	│   └── vite.svg
	└── src/
		├── App.css
		├── App.tsx
		├── index.css
		├── main.tsx
		├── router.tsx
		├── apis/
		│   ├── authApi.ts
		│   ├── broadcastsApi.ts
		│   ├── commentsApi.ts
		│   ├── threadsApi.ts
		│   └── usersApi.ts
		├── assets/
		├── components/
		│   ├── AutoSaveIndicator/
		│   │   └── AutoSaveIndicator.tsx
		│   ├── BackButton/
		│   │   └── BackButton.tsx
		│   ├── BookmarkButton/
		│   │   └── BookmarkButton.tsx
		│   ├── Comment/
		│   │   └── Comment.tsx
		│   ├── CreateThreadButton/
		│   │   └── CreateThreadButton.tsx
		│   ├── Form/
		│   │   ├── PasswordInput.tsx
		│   │   └── TextInput.tsx
		│   ├── GoToTopButton/
		│   │   └── GoToTopButton.tsx
		│   ├── Loader/
		│   │   └── Loader.tsx
		│   ├── Modal/
		│   │   └── Modal.tsx
		│   ├── Navbar/
		│   │   └── Navbar.tsx
		│   ├── Preview/
		│   │   └── LinkPreview.tsx
		│   ├── RichTextEditor/
		│   │   └── RichTextEditor.tsx
		│   ├── SearchBar/
		│   │   ├── SearchBar.tsx
		│   │   └── SearchSuggestions.tsx
		│   ├── Skeleton/
		│   │   ├── CommentSkeleton.tsx
		│   │   └── Skeleton.tsx
		│   ├── SortDropdown/
		│   │   └── SortDropdown.tsx
		│   ├── ThreadCard/
		│   │   └── ThreadCard.tsx
		│   ├── Toast/
		│   │   └── Toast.tsx
		│   ├── Upload/
		│   │   ├── ImageUpload.tsx
		│   │   └── VideoUpload.tsx
		│   ├── UserIcon/
		│   │   └── UserIcon.tsx
		│   └── VoteButtons/
		│   │   └── VoteButtons.tsx
		├── contexts/
		│   ├── AuthContext.tsx
		│   ├── BookmarkContext.tsx
		│   └── ThemeContext.tsx
		├── hooks/
		│   ├── useAuth.ts
		│   ├── useAutoSave.ts
		│   ├── useHotkeys.ts
		│   ├── useLocalStorage.ts
		│   ├── useRequireLogin.ts
		│   └── useScrollMemory.ts
		├── layouts/
		│   └── RootLayout.tsx
		├── pages/
		│   ├── Bookmark.tsx
		│   ├── BroadcastDetail.tsx
		│   ├── BroadcastSummary.tsx
		│   ├── CreateBroadcast.tsx
		│   ├── CreateThread.tsx
		│   ├── Dashboard.tsx
		│   ├── EditProfile.tsx
		│   ├── Login.tsx
		│   ├── NotFound.tsx
		│   ├── Register.tsx
		│   ├── ThreadDetail.tsx
		│   ├── ThreadSummary.tsx
		│   └── UserProfile.tsx
		├── styles/
		│   ├── global.css
		│   └── theme.css
		└── utils/
			├── accessibility.ts
			├── collapseArrow.tsx
			├── jwt.ts
			├── linkPreview.ts
			├── sanitize.ts
			├── threadPreview.ts
			├── threadSorter.ts
			└── validators.ts
```

## Tech Stack

- Root Project:
	- Node.js (runtime)
	- NPM scripts dengan `concurrently` untuk menjalankan backend dan frontend bersamaan

- Backend:
	- Node.js + Express.js
	- TypeScript (`typescript`, `ts-node`, `ts-node-dev`)
	- MongoDB dengan ODM `mongoose`
	- Autentikasi menggunakan `jsonwebtoken` (JWT)
	- Keamanan password dengan `bcrypt`
	- Konfigurasi lingkungan menggunakan `dotenv`
	- CORS middleware (`cors`)
	- Sanitasi konten HTML menggunakan `sanitize-html`
	- Type definitions: `@types/express`, `@types/node`, `@types/jsonwebtoken`, `@types/bcrypt`, `@types/cors`, `@types/sanitize-html`

- Frontend:
	- React (`react`, `react-dom`)
	- TypeScript
	- Vite
	- Routing menggunakan `react-router-dom`
	- JWT parsing di client dengan `jwt-decode`
	- Editor rich text menggunakan `@tiptap/react` dan `@tiptap/starter-kit`
	- Manajemen ID unik dengan `uuid`

- Styling & UI:
	- CSS
	- Bootstrap 5 (`bootstrap` dan `react-bootstrap`)
	- Icon menggunakan `react-icons`
	- Loader menggunakan `react-spinners`
	- Toast menggunakan `react-toastify`
	- Animasi menggunakan `framer-motion`

- Quality dan Tooling:
	- ESLint (`eslint`, `@eslint/js`, `typescript-eslint`)
	- Plugin React: `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`

## Setup dan Instalasi

- Prasyarat:
	- Node.js (versi LTS terbaru)
	- NPM (terpasang bersama Node.js)
	- MongoDB (local atau MongoDB Atlas)

1. Clone repository

```bash
git clone https://github.com/arkeian/its-now.git
cd its-now
```

2. Instalasi dependensi

- Root project (script helper):

```bash
npm install
```

- Backend:

```bash
cd backend
npm install
cd ..
```

- Frontend:

```bash
cd frontend
npm install
cd ..
```

3. Konfigurasi environment backend

Buat file `.env` di folder `backend`:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/its-now
JWT_SECRET=some_super_secret_key
```

4. Menjalankan development

- Jalankan backend:

```bash
cd backend
npm run dev
```

- Jalankan frontend (di terminal lain):

```bash
cd frontend
npm run dev
```

## API Endpoints

| Endpoint | Method | Proteksi | Deskripsi |
|---------|--------|----------|-----------|
| `/api/auth/login` | POST | - | Login pengguna dan mengembalikan JWT jika kredensial valid. |
| `/api/auth/register` | POST | - | Registrasi akun baru mahasiswa ITS. |
| `/api/users/me` | GET | JWT | Mengambil data profil pengguna yang sedang login. |
| `/api/users/:id` | GET | JWT | Mengambil profil publik pengguna lain berdasarkan ID. |
| `/api/users/edit` | PUT | JWT | Mengubah data profil pengguna (misalnya nama, bio, dsb.). |
| `/api/users/bookmark` | POST | JWT | Menambah atau menghapus bookmark pada thread/broadcast tertentu. |
| `/api/users/me` | DELETE | JWT | Menghapus akun pengguna sendiri beserta datanya. |
| `/api/threads` | GET | JWT | Mengambil daftar thread dengan opsi filter/sortir. |
| `/api/threads/:id` | GET | JWT | Mengambil detail satu thread tertentu (beserta info terkait). |
| `/api/threads` | POST | JWT | Membuat thread diskusi baru. |
| `/api/threads/:id/vote` | POST | JWT | Memberi upvote/downvote pada thread. |
| `/api/threads/:id` | PUT | JWT | Mengedit isi thread yang sudah dibuat pengguna. |
| `/api/threads/:id` | DELETE | JWT | Menghapus thread yang dimiliki pengguna. |
| `/api/comments/threads/:threadId` | GET | JWT | Mengambil komentar untuk suatu thread. |
| `/api/comments/threads/:threadId` | POST | JWT | Menambah komentar baru pada thread. |
| `/api/comments/broadcasts/:broadcastId` | GET | JWT | Mengambil komentar untuk suatu broadcast. |
| `/api/comments/broadcasts/:broadcastId` | POST | JWT | Menambah komentar baru pada broadcast. |
| `/api/comments/vote/:id` | POST | JWT | Memberi upvote/downvote pada komentar. |
| `/api/comments/:id` | PUT | JWT | Mengedit komentar yang dimiliki pengguna. |
| `/api/comments/:id` | DELETE | JWT | Menghapus komentar yang dimiliki pengguna. |
| `/api/broadcasts` | GET | JWT | Mengambil daftar broadcast (pengumuman) yang tersedia. |
| `/api/broadcasts` | POST | JWT | Membuat broadcast baru (misalnya event, pengumuman, dsb.). |
| `/api/broadcasts/:id` | GET | JWT | Mengambil detail satu broadcast tertentu. |
| `/api/broadcasts/:id/vote` | POST | JWT | Memberi upvote/downvote pada broadcast. |
| `/api/broadcasts/:id` | PUT | JWT | Mengedit broadcast yang sudah dibuat pengguna. |
| `/api/broadcasts/:id` | DELETE | JWT | Menghapus broadcast yang dimiliki pengguna. |
| `/api/upload` | POST | JWT (via middleware global) | Mengunggah gambar dalam bentuk data URI dan mengembalikan URL yang dapat digunakan frontend. |

## Panduan Penggunaan Website

1. <b>Akses dan Autentikasi</b>
	- Buka aplikasi frontend (default: <code>http://localhost:5173/</code> saat <code>npm run dev</code> di folder <code>frontend</code>).
	- Jika belum login, pengguna akan diarahkan ke halaman <b>Login</b>.
	- Untuk akun baru, buka halaman <b>Register</b> dan isi data yang diminta, lalu login dengan email dan password yang sudah didaftarkan.

2. <b>Beranda dan Thread Diskusi</b>
	- Setelah login, pengguna akan diarahkan ke halaman daftar thread diskusi.
	- Setiap kartu thread menampilkan judul, ringkasan konten, jumlah vote, jumlah komentar, dan tag/kategori.
	- Pengguna dapat mengubah urutan tampilan thread menggunakan opsi sortir (misalnya <i>Recent</i>, <i>Best</i>, <i>Hot</i>, <i>Controversial</i>).
	- Klik salah satu thread untuk membuka halaman detail dan melihat isi lengkap serta komentar terkait.

3. <b>Membuat Thread Baru</b>
	- Gunakan tombol <b>Create Thread</b> untuk membuka halaman pembuatan thread.
	- Isi judul, pilih tag/kategori yang sesuai, lalu tulis konten menggunakan editor rich text.
	- Selama menulis, konten secara berkala disimpan sebagai <i>draft</i> sehingga mengurangi risiko kehilangan data jika halaman tertutup.
	- Setelah selesai, klik tombol kirim untuk mempublikasikan thread.

4. <b>Broadcast (Pengumuman)</b>
	- Buka halaman <b>Broadcast</b> untuk melihat daftar pengumuman atau informasi penting yang disiarkan pengguna lain.
	- Klik salah satu broadcast untuk melihat detail lengkap dan komentar di bawahnya.
	- Untuk membuat broadcast baru, gunakan halaman <b>Create Broadcast</b>, isi judul dan konten (serta informasi pendukung jika ada), lalu kirim.

5. <b>Voting dan Komentar</b>
	- Pada halaman detail thread maupun broadcast, pengguna dapat memberi <i>upvote</i> atau <i>downvote</i> melalui tombol vote.
	- Tambahkan komentar di bagian bawah halaman untuk bertanya atau menanggapi diskusi.
	- Pengguna dapat mengedit atau menghapus komentar yang dimilikinya jika tombol tersebut disediakan pada antarmuka.

6. <b>Bookmark dan Navigasi Konten</b>
	- Gunakan ikon bookmark pada kartu thread atau broadcast untuk menyimpan postingan penting ke dalam daftar pribadi.
	- Halaman <b>Bookmark</b> menampilkan semua thread dan broadcast yang telah disimpan.
	- Tombol <b>Go To Top</b> akan muncul ketika halaman di-scroll jauh ke bawah untuk memudahkan kembali ke bagian atas.

7. <b>Pencarian</b>
	- Gunakan kolom pencarian (search bar) di bagian atas untuk mencari thread atau broadcast berdasarkan judul atau kata kunci tertentu.
	- Saran pencarian akan muncul secara otomatis untuk membantu menemukan konten yang relevan dengan lebih cepat.

8. <b>Upload Gambar dan Konten Rich</b>
	- Saat membuat thread atau broadcast, pengguna dapat mengunggah gambar melalui komponen upload.
	- Gambar akan diproses oleh server dan dikembalikan dalam bentuk URL yang langsung dapat ditampilkan di dalam konten.
	- Editor rich text mendukung pemformatan dasar seperti huruf tebal, miring, daftar, dan lain-lain untuk membuat tampilan konten lebih rapi.

9. <b>Profil Pengguna</b>
	- Pengguna dapat membuka halaman profilnya untuk melihat informasi dasar dan riwayat aktivitas, seperti thread atau broadcast yang pernah dibuat.
	- Profil pengguna lain dapat diakses dengan mengklik nama atau ikon pengguna pada thread maupun komentar.
	- Di halaman edit profil, pengguna dapat memperbarui data diri sesuai kebutuhan.

10. <b>Notifikasi dan Tema</b>
	- Setiap aksi penting (seperti login, pembuatan thread, atau kegagalan menyimpan data) akan menampilkan notifikasi singkat di layar.
	- Pengguna dapat beralih antara mode terang dan gelap, dan pilihan ini akan diingat untuk sesi berikutnya.

## Penutup

<p align="justify">
&emsp;ITS Now dikembangkan sebagai upaya untuk menjawab kebutuhan nyata persebaran informasi dan diskusi di lingkungan kampus ITS. Melalui pendekatan <i>discussion thread</i> yang terstruktur, fitur broadcast untuk pengumuman, serta berbagai peningkatan <i>quality of life</i>, diharapkan platform ini dapat menjadi sarana yang efektif, nyaman, dan terpusat bagi mahasiswa dalam bertukar informasi.
</p>

<p align="justify">
&emsp;Walaupun website masih belum sempurna dan masih terdapat banyak ruang untuk pengembangan lebih lanjut, implementasi saat ini sudah mencakup alur autentikasi, pembuatan dan pengelolaan konten, sistem voting, bookmark, serta dukungan media dan tampilan yang responsif. Harapannya ke depan, pengembangan dapat difokuskan pada peningkatan skalabilitas untuk menampung civitas mahasiswa ITS yang lebih banyak, moderasi konten yang lebih baik, serta integrasi dengan layanan lain yang digunakan di lingkungan ITS.
</p>
