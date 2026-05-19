/* ================================================================
   S-NX × EDU — assets/js/main.js
   Single source of truth for ALL page behaviour.

   ANTI-FLICKER NOTE: Each HTML <head> contains a minimal 2-line
   inline script that reads localStorage and sets data-theme before
   first paint. This is necessary and intentional for a static site
   with no server-side rendering. Every other logic lives here.
   ================================================================ */

/* ── 1. THEME ENGINE ──────────────────────────────────────── */
const Theme = (() => {
  const KEY = 'snx-theme';

  function apply(t) {
    t === 'light'
      ? document.documentElement.setAttribute('data-theme', 'light')
      : document.documentElement.removeAttribute('data-theme');

    const icon = document.getElementById('themeIcon');
    const text = document.getElementById('themeText');
    if (icon) icon.textContent = t === 'light' ? 'light_mode' : 'dark_mode';
    if (text) text.textContent = t === 'light' ? 'LIGHT' : 'DARK';
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') === 'light'
      ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem(KEY, next);
    apply(next);
  }

  function init() {
    /* Re-apply to sync icon state (head script already applied the class) */
    apply(localStorage.getItem(KEY) || 'dark');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggle);
  }

  return { init, apply };
})();


/* ── 2. MOBILE NAV — Hamburger → X ─────────────────────────── */
const MobileNav = (() => {
  let _toggle, _list, _overlay;

  function open() {
    _toggle?.classList.add('is-open');
    _list?.classList.add('is-open');
    _overlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    _toggle?.classList.remove('is-open');
    _list?.classList.remove('is-open');
    _overlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function init() {
    _toggle  = document.getElementById('menuToggle');
    _list    = document.getElementById('navList');
    _overlay = document.getElementById('navOverlay');
    if (!_toggle || !_list) return;

    _toggle.addEventListener('click', e => {
      e.stopPropagation();
      _list.classList.contains('is-open') ? close() : open();
    });

    _overlay?.addEventListener('click', close);

    _list.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  return { init, close };
})();


/* ── 3. CARD RADIAL GLOW ────────────────────────────────────── */
const CardGlow = {
  init(scope) {
    const root = scope || document;
    root.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      });
    });
  }
};

/* Expose globally so any inline caller (materi.html legacy) can use it */
window.CardGlow = CardGlow;


/* ── 4. JADWAL PAGE ─────────────────────────────────────────── */
const JadwalPage = {
  data: [
    { id: 1, title: 'Outing Class (Ikhwan)',      date: '2026-05-22' },
    { id: 2, title: 'Outing Class (Akhwat)',       date: '2026-05-23' },
    { id: 3, title: 'Ujian Akhir Semester 2',      date: '2026-06-08' },
    { id: 4, title: 'Penerimaan Rapor Semester 2', date: '2026-06-22' },
    { id: 5, title: 'Libur Akhir Tahun Ajaran',    date: '2026-06-25' }
  ],

  MONTHS: ['Januari','Februari','Maret','April','Mei','Juni',
           'Juli','Agustus','September','Oktober','November','Desember'],

  buildCalendar() {
    const grid = document.getElementById('calGrid');
    if (!grid) return;

    const now   = new Date();
    const year  = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    const days  = new Date(year, month + 1, 0).getDate();
    const first = new Date(year, month, 1).getDay();

    const label = document.getElementById('monthLabel');
    if (label) label.textContent = `${this.MONTHS[month]} ${year}`;

    const map = {};
    this.data.forEach(e => { map[e.date] = e.title; });

    for (let i = 0; i < first; i++) {
      grid.appendChild(document.createElement('div'));
    }

    for (let d = 1; d <= days; d++) {
      const mm  = String(month + 1).padStart(2, '0');
      const dd  = String(d).padStart(2, '0');
      const key = `${year}-${mm}-${dd}`;

      const cell = document.createElement('div');
      cell.className = 'day-cell';
      if (d === today) cell.classList.add('today');
      if (d < today)   cell.classList.add('past');
      if (map[key])    cell.classList.add('has-event');

      const num = document.createElement('span');
      num.className   = 'day-num';
      num.textContent = d;
      cell.appendChild(num);

      if (map[key]) {
        const chip = document.createElement('p');
        chip.className   = 'event-chip';
        chip.textContent = map[key];
        cell.appendChild(chip);
      }

      grid.appendChild(cell);
    }
  },

  buildEvents() {
    const list = document.getElementById('eventsList');
    if (!list) return;
    const now = new Date();

    list.innerHTML = this.data.map(e => {
      const d    = new Date(e.date + 'T00:00:00');
      const past = d < now;
      const fmt  = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      return `
        <div class="event-item${past ? ' past' : ''}">
          <span class="event-name">${e.title}</span>
          <span class="event-date">${fmt}</span>
        </div>`;
    }).join('');
  },

  init() {
    if (!document.getElementById('calGrid')) return;
    this.buildCalendar();
    this.buildEvents();
  }
};


/* ── 5. TUGAS PAGE ──────────────────────────────────────────── */
const TugasPage = {
  data: [
    { id:1, category:'Matematika',            type:'eksak',  title:'Persamaan Kuadrat',        desc:'Selesaikan 10 soal latihan mengenai metode pemfaktoran yang ada di buku cetak halaman 45.',             deadline:'2026-05-20' },
    { id:2, category:'Bahasa - Inggris',      type:'bahasa', title:'Composition Essay',         desc:'Tuliskan 100 kosakata yang kamu ketahui serta buatlah esai mengenai aktivitas kamu sehari-hari.',       deadline:'2026-05-22' },
    { id:3, category:'Pendidikan Agama Islam',type:'agama',  title:'Perbedaan Ghibah & Kritik', desc:'Selesaikan 3 soal latihan mengenai perbedaan ghibah dan kritik berdasarkan tugas yang diberikan.',      deadline:'2026-05-23' },
    { id:4, category:'Ilmu Pengetahuan Alam', type:'eksak',  title:'Mengenali Ekosistem',       desc:'Kerjakan asesmen akhir bab 7 pada halaman 183 di buku cetak.',                                          deadline:'2026-05-25' },
    { id:5, category:'Bahasa Arab',           type:'agama',  title:'Mufrodat Bab 3',            desc:'Hafal dan tuliskan 30 kosakata Bahasa Arab beserta artinya dari buku LKS halaman 22-23.',               deadline:'2026-05-27' },
    { id:6, category:'Informatika',           type:'eksak',  title:'Flowchart Algoritma',       desc:'Buat flowchart untuk menyelesaikan masalah menghitung nilai rata-rata dari 5 angka yang diinput.',      deadline:'2026-05-28' }
  ],

  urgency(dateStr) {
    const diff = (new Date(dateStr + 'T00:00:00') - Date.now()) / 86400000;
    if (diff < 2) return 'urgent';
    if (diff < 5) return 'soon';
    return '';
  },

  fmtDate(dateStr) {
    return new Date(dateStr + 'T00:00:00')
      .toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  },

  render() {
    const grid = document.getElementById('taskGrid');
    if (!grid) return;

    grid.innerHTML = this.data.map((t, i) => `
      <div class="card anim d${Math.min(i + 2, 10)}" data-cat="${t.type}">
        <div>
          <p class="tag">${t.category}</p>
          <h3 style="font-size:var(--t-lg);margin-top:6px;font-weight:700">${t.title}</h3>
          <p style="color:var(--muted);font-size:var(--t-xs);margin-top:10px;line-height:1.65">${t.desc}</p>
          <p class="deadline ${this.urgency(t.deadline)}">
            <span class="material-symbols-rounded" style="font-size:15px">calendar_today</span>
            Deadline: ${this.fmtDate(t.deadline)}
          </p>
        </div>
        <a href="#" class="btn-main">Lihat Selengkapnya</a>
      </div>`
    ).join('');

    CardGlow.init(grid);
  },

  init() {
    if (!document.getElementById('taskGrid')) return;
    this.render();
  }
};


/* ── 6. MATERI CATALOG PAGE ─────────────────────────────────── */
const MateriPage = {
  subjects: [
    { id:'informatika', name:'Informatika',            chapCount:7,  desc:'Dasar berpikir komputasional, algoritma, dan pengenalan logika untuk Kelas 8.' },
    { id:'pai',         name:'Pendidikan Agama Islam', chapCount:10, desc:'Kajian akhlak, fiqih, dan aqidah berdasarkan Al-Qur\'an dan Hadits Shahih.' },
    { id:'arab',        name:'Bahasa Arab',            chapCount:5,  desc:'Penguatan kosakata, nahwu-sharaf, dan praktik percakapan sehari-hari.' },
    { id:'matematika',  name:'Matematika',             chapCount:9,  desc:'Aljabar lanjutan, persamaan kuadrat, dan geometri bidang untuk Kelas 8.' }
  ],

  render() {
    const grid = document.getElementById('materiGrid');
    if (!grid) return;

    grid.innerHTML = this.subjects.map((s, i) => `
      <div class="card anim d${Math.min(i + 2, 10)}">
        <div>
          <p style="font-size:var(--t-xl);font-weight:700;line-height:1.15">
            ${s.name}
            <span class="badge badge-accent">${s.chapCount} BAB</span>
          </p>
          <p style="color:var(--muted);font-size:var(--t-xs);margin-top:10px;line-height:1.65">${s.desc}</p>
        </div>
        <a href="materi-lengkap.html?subject=${s.id}" class="btn-main">Materi Lengkap</a>
      </div>`
    ).join('');

    CardGlow.init(grid);
  },

  init() {
    if (!document.getElementById('materiGrid')) return;
    this.render();
  }
};


/* ── 7. MATERI LENGKAP — Reader + Sidebar ───────────────────── */
const MateriLengkap = {
  db: null,

  /* ── Accordion ─── */
  accordion(btn) {
    const content = btn.nextElementSibling;
    const isOpen  = content.style.maxHeight;

    /* Close all sections */
    document.querySelectorAll('.cat-content').forEach(c => {
      c.style.maxHeight = null;
      const icon = c.previousElementSibling?.querySelector('.acc-icon');
      if (icon) icon.textContent = 'expand_more';
    });

    /* Open clicked section if it was closed */
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px';
      const icon = btn.querySelector('.acc-icon');
      if (icon) icon.textContent = 'expand_less';
    }
  },

  /* ── FAB sidebar toggle ─── */
  fabToggle() {
    const isOpen = document.body.classList.toggle('sidebar-open');
    const icon   = document.getElementById('fab-icon');
    if (icon) icon.textContent = isOpen ? 'close' : 'menu_book';
  },

  /* ── Show welcome screen ─── */
  showWelcome() {
    const welcome = document.getElementById('welcomeScreen');
    const reader  = document.getElementById('readerArea');
    const error   = document.getElementById('errorState');
    if (welcome) welcome.style.display = 'flex';
    if (reader)  reader.style.display  = 'none';
    if (error)   error.style.display   = 'none';
  },

  /* ── Load chapter by bab ID ─── */
  loadBab(babId) {
    if (!this.db) return;

    let found    = null;
    let subjName = '';

    for (const subj of this.db.subjects) {
      const bab = subj.babs.find(b => b.id === babId);
      if (bab) { found = bab; subjName = subj.name; break; }
    }

    const welcome = document.getElementById('welcomeScreen');
    const reader  = document.getElementById('readerArea');
    const error   = document.getElementById('errorState');

    if (!found) {
      this.showWelcome();
      return;
    }

    /* Show reader, hide others */
    if (welcome) welcome.style.display = 'none';
    if (reader)  reader.style.display  = 'block';
    if (error)   error.style.display   = 'none';

    /* ── Fill required IDs ── */

    /* #materi-kategori — subject name (eyebrow label) */
    const katEl = document.getElementById('materi-kategori');
    if (katEl) katEl.textContent = subjName;

    /* #materi-judul — chapter title (from JSON field "title") */
    const judulEl = document.getElementById('materi-judul');
    if (judulEl) judulEl.textContent = found.title || '';

    /* Description */
    const deskEl = document.getElementById('materi-deskripsi');
    if (deskEl) deskEl.textContent = found.deskripsi || '';

    /* #materi-isi — chapter HTML content (from JSON field "isi") */
    const isiEl = document.getElementById('materi-isi');
    if (isiEl) isiEl.innerHTML = found.isi || '';

    /* Quote block */
    const quoteBox = document.getElementById('quoteBox');
    if (quoteBox) {
      if (found.kutipan && found.kutipan.indo) {
        quoteBox.style.display = 'block';
        const qArab   = document.getElementById('quoteArabic');
        const qIndo   = document.getElementById('quoteIndo');
        const qAuthor = document.getElementById('quoteAuthor');
        if (qArab)   qArab.textContent   = found.kutipan.arab   || '';
        if (qIndo)   qIndo.textContent   = found.kutipan.indo   || '';
        if (qAuthor) qAuthor.textContent = found.kutipan.sumber || '';
      } else {
        quoteBox.style.display = 'none';
      }
    }

    /* ── Sidebar active state ── */
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeItem = document.querySelector(`.nav-item[data-id="${babId}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
      /* Auto-expand parent cat-content */
      const catContent = activeItem.closest('.cat-content');
      if (catContent && !catContent.style.maxHeight) {
        catContent.style.maxHeight = catContent.scrollHeight + 'px';
        const catIcon = catContent.previousElementSibling?.querySelector('.acc-icon');
        if (catIcon) catIcon.textContent = 'expand_less';
      }
    }

    /* Close sidebar on mobile after selection */
    if (window.innerWidth <= 900) {
      document.body.classList.remove('sidebar-open');
      const icon = document.getElementById('fab-icon');
      if (icon) icon.textContent = 'menu_book';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /* ── Build sidebar from JSON data ─── */
  buildSidebar(db) {
    const scroll = document.getElementById('sidebarScroll');
    if (!scroll) return;
    scroll.innerHTML = '';

    /* Intro / welcome button */
    const introBtn = document.createElement('button');
    introBtn.className   = 'sidebar-intro-btn active';
    introBtn.textContent = 'Pembukaan';
    introBtn.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-intro-btn, .nav-item').forEach(el => el.classList.remove('active'));
      introBtn.classList.add('active');
      this.showWelcome();
      if (window.innerWidth <= 900) {
        document.body.classList.remove('sidebar-open');
        const icon = document.getElementById('fab-icon');
        if (icon) icon.textContent = 'menu_book';
      }
    });
    scroll.appendChild(introBtn);

    /* Subject categories */
    db.subjects.forEach(subj => {
      const catWrap = document.createElement('div');

      const catBtn = document.createElement('button');
      catBtn.className = 'cat-btn';
      catBtn.innerHTML = `
        ${subj.name}
        <span class="material-symbols-rounded acc-icon" style="font-size:18px;transition:transform 0.3s">expand_more</span>
      `;
      catBtn.addEventListener('click', () => this.accordion(catBtn));

      const catContent = document.createElement('div');
      catContent.className = 'cat-content';

      /* Chapter items — JSON field is "title", not "judul" */
      subj.babs.forEach(bab => {
        const item = document.createElement('div');
        item.className     = 'nav-item';
        item.dataset.id    = bab.id;
        item.innerHTML     = `
          <span>${bab.title}</span>
          <span class="material-symbols-rounded check">check_circle</span>
        `;
        item.addEventListener('click', () => {
          document.querySelectorAll('.sidebar-intro-btn').forEach(b => b.classList.remove('active'));
          this.loadBab(bab.id);
        });
        catContent.appendChild(item);
      });

      catWrap.appendChild(catBtn);
      catWrap.appendChild(catContent);
      scroll.appendChild(catWrap);
    });
  },

  /* ── Handle URL parameters ─── */
  handleURLParam() {
    const params  = new URLSearchParams(window.location.search);
    const subject = params.get('subject');
    const bab     = params.get('bab');

    if (bab) { this.loadBab(bab); return; }

    if (subject) {
      const subj = this.db.subjects.find(s => s.id === subject);
      if (subj && subj.babs.length > 0) {
        this.loadBab(subj.babs[0].id);
        return;
      }
    }

    this.showWelcome();
  },

  /* ── Main init ─── */
  async init() {
    if (!document.getElementById('sidebarScroll')) return;

    /* ── FAB: fixed z-index + stop ALL event propagation ── */
    const fabBtn = document.getElementById('fab-toggle');
    if (fabBtn) {
      fabBtn.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();  /* Prevent any default & bubbling */
        this.fabToggle();
      });
    }

    /* Close sidebar when tapping outside (mobile) */
    document.addEventListener('click', e => {
      if (window.innerWidth > 900) return;
      const sidebar = document.getElementById('mainSidebar');
      if (!sidebar || !fabBtn) return;
      if (
        document.body.classList.contains('sidebar-open') &&
        !sidebar.contains(e.target) &&
        !fabBtn.contains(e.target)
      ) {
        document.body.classList.remove('sidebar-open');
        const icon = document.getElementById('fab-icon');
        if (icon) icon.textContent = 'menu_book';
      }
    });

    /* Fetch JSON */
    const error = document.getElementById('errorState');
    try {
      const res = await fetch('../data/materi-db.json');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      this.db = await res.json();
      this.buildSidebar(this.db);
      this.handleURLParam();
    } catch (err) {
      console.error('[S-NX] Gagal memuat materi-db.json:', err);
      const welcome = document.getElementById('welcomeScreen');
      const reader  = document.getElementById('readerArea');
      if (welcome) welcome.style.display = 'none';
      if (reader)  reader.style.display  = 'none';
      if (error)   error.style.display   = 'flex';
    }
  }
};

/* Expose globally for any legacy inline callers */
window.MateriLengkap = MateriLengkap;


/* ── 8. BOOTSTRAP ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  MobileNav.init();
  CardGlow.init();

  /* Page-specific modules guard themselves with an element check */
  JadwalPage.init();
  TugasPage.init();
  MateriPage.init();
  MateriLengkap.init();
});
