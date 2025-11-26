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
- [Struktur Project](#struktur-project)

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
