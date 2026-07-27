# Navoiy davlat universiteti — Tillar fakulteti

## Umumiy loyiha hisoboti (to‘liq qayta tahlil)

| Maydon | Qiymat |
|--------|--------|
| **Loyiha** | NavDU Tillar Fakulteti — raqamli ekotizim |
| **Versiya** | 0.2.0 (V2 — Gov.uz rasmiy davlat portali standarti + V1 zaxira) |
| **Hisobot sanasi** | 2026-07-27 |
| **Repozitoriy** | [github.com/cipher-edu/tillar](https://github.com/cipher-edu/tillar) (`main`) |
| **Zaxira (V1)** | `src_v1/` papkasi ichida to‘liq saqlandi |
| **Dasturchi (footer)** | Oybek Abduraimov |
| **Maqsad** | Fakultetning ochiq, ko‘p tilli, boshqariladigan, mobil mos rasmiy veb-platformasi |

---

## Mundarija

1. [Loyiha haqida](#1-loyiha-haqida)
2. [Arxitektura va texnologiyalar](#2-arxitektura-va-texnologiyalar)
3. [Bajarilgan ishlar xronologiyasi](#3-bajarilgan-ishlar-xronologiyasi)
4. [Frontend — nima qilindi](#4-frontend--nima-qilindi)
5. [Backend / CMS — nima qilindi](#5-backend--cms--nima-qilindi)
6. [Dizayn tizimi](#6-dizayn-tizimi)
7. [Kontent va ma’lumotlar](#7-kontent-va-malumotlar)
8. [Git va deploy](#8-git-va-deploy)
9. [Kuchli jihatlar](#9-kuchli-jihatlar)
10. [Kamchiliklar va keyingi qadamlar](#10-kamchiliklar-va-keyingi-qadamlar)
11. [Ishga tushirish](#11-ishga-tushirish)
12. [Xulosa va baho](#12-xulosa-va-baho)

---

## 1. Loyiha haqida

**Tillar fakulteti** sayti — Navoiy davlat universiteti tillar yo‘nalishidagi ta’lim, ilm-fan, jamoa va jamoatchilik aloqasini bir platformada birlashtiruvchi **raqamli ekotizim**.

### Evolyutsiya

1. **MVP (V1)** — React SPA + mock TypeScript ma’lumotlar + Navoiy brend dizayni (`src_v1` papkasida zaxiralangan)  
2. **CMS bosqichi** — Django + DRF + Jazzmin + bootstrap API + seed  
3. **UX/UI polish** — landing qayta dizayn, hover, scroll, menyu  
4. **Mobil** — responsive layout, dark mobile menu, swipe, safe-area  
5. **Gov.uz V2 Tizimi (Yangi)** — `https://gov.uz/ru/edu` standarti va ranglarida to‘liq qayta qurilgan rasmiy davlat portali dizayni (Maxsus imkoniyatlar / Ekran suhandoni / Yuqori kontrast / Interaktiv xizmatlar / Marquee).


### Foydalanuvchi guruhlari

| Guruh | Nima topadi |
|-------|-------------|
| Abituriyent / ota-ona | Yo‘nalishlar, raqamlar, rahbariyat, aloqa |
| Talaba | Yangiliklar, tyutorlar, tadbirlar, e’lonlar |
| O‘qituvchi | Profil, kafedra, nashrlar |
| Mehmon / hamkor | Xalqaro hamkorlar, virtual tur |
| Administrator | Django admin orqali kontent |

---

## 2. Arxitektura va texnologiyalar

```
Brauzer (React SPA, mobil + desktop)
        │  hydrate /api/bootstrap/
        ▼
Django 5 + DRF + Jazzmin + CKEditor + WhiteNoise
        │
   SQLite (dev) / MySQL (prod ixtiyoriy)
   fixtures/seed.json · media/
```

### Frontend

| Texnologiya | Vazifa |
|-------------|--------|
| React 19 + TypeScript | UI |
| Vite 6 | Dev/build |
| React Router 7 | SPA marshrutlar |
| Framer Motion 11 | Scroll/hover animatsiya (`once: false`) |
| Lucide React | Ikonlar |
| Tailwind CDN | Utility stillar |

### Backend

| Texnologiya | Vazifa |
|-------------|--------|
| Django 5 | Framework, admin |
| DRF | REST API |
| django-cors-headers | CORS |
| django-jazzmin | Admin UI |
| django-ckeditor | Yangiliklar matni |
| WhiteNoise + Pillow | Static/media |
| SQLite / MySQL | Ma’lumotlar bazasi |

### API (asosiy)

- `GET /api/bootstrap/` — barcha kontent bir so‘rovda  
- `GET /api/stats/`, `/people/`, `/programs/`, `/news/`, …  
- `GET /api/rector/`, `/presidential/`, `/navoi-quotes/`, `/navoi-band/`  
- `/admin/` — Jazzmin  

---

## 3. Bajarilgan ishlar xronologiyasi

### 2026-07-24 — MVP frontend + hisobot kontenti

- Vite + React + TS skelet, barcha asosiy sahifalar  
- Hero, statistika, prezident bo‘limi, rektor murojaati  
- Landing qo‘shimchalar, 3D dastur kartalari, 9 hamkor  
- Footer: Yandex xarita, dasturchi imzosi  
- **2025–2026 hisobot** raqamlari (`site.ts`, kafedralar, ilm-fan)  
- Universitet rahbariyati tartibi  
- `docs/memory/` loyiha xotirasi  
- i18n: uz / ru / en  

### 2026-07-25 — Bugfix + Django backend

- Yangilik/kafedra/dastur bog‘lanishlari to‘g‘rilandi  
- 14 dastur + `studyForm`; aloqa `mailto:`  
- SEO meta, build barqarorligi  
- **Django 5 + DRF + Jazzmin + CKEditor**  
- To‘liq katalog modellari, seed, `verify_seed`  
- Frontend `api.ts` + `hydrate.ts` + fallback  
- Media ImageField, locale widgetlar, oq admin kontent  
- cPanel: `passenger_wsgi.py`, `DEPLOY_CPANEL.md`, pack skript  
- GitHub `cipher-edu/tillar` ga birinchi to‘liq push  

### 2026-07-25–26 — UI/UX va landing

| Commit | Mazmun |
|--------|--------|
| `29462d9` | ScrollToTop, rahbariyat qidiruv, card hover |
| `26ed06b` | Landing redesign, menyu kontrast, scroll replay |
| `928c46d` | Mobile-first, dark mobile menu |

**Batafsil:**

- Hoverda to‘q invert olib tashlandi (yorug‘ gold hover)  
- Rahbariyat: heritage naqshlar + ixcham kartalar  
- Landing: talabalar (editorial), ilm-fan (royal/gold), media (YouTube embed), kalendar+e’lon, dual CTA  
- Virtual tur: `https://youtu.be/vNiVQlPxBbk` embed  
- Ta’lim yo‘nalishlari ↔ Navoiy «Meros · Modern world» fon almashinuvi  
- Header: heritage yuqori bar, `glass-card-dark` dropdown  
- Scroll: `viewport once: false` — pastga/yuqoriga qayta animatsiya  
- Mobil: safe-area, swipe hero, responsive tipografiya, **to‘q royal mobil menyu**  

---

## 4. Frontend — nima qilindi

### Sahifalar va marshrutlar

| Yo‘l | Sahifa |
|------|--------|
| `/` | Landing (to‘liq bo‘limlar zanjiri) |
| `/fakultet/*` | Tarix, rahbariyat, tuzilma, faxriy |
| `/talim/*` | Yo‘nalishlar, o‘quv rejalar |
| `/jamoa/*` | Professorlar, tyutorlar |
| `/talabalar`, `/ilm-fan`, `/yangiliklar`, `/aloqa` | Kataloglar |

### Landing tartibi (asosiy)

1. Hero slayder (+ swipe, progress)  
2. Statistika (count-up qayta ishlaydi)  
3. Navoiy iqtibos (ilm)  
4. Prezident bo‘limi  
5. Yangiliklar bento  
6. Rektor murojaati  
7. Fakultet haqida  
8. **Rahbariyat** (heritage naqsh)  
9. Faol talabalar (editorial)  
10. Ilm-fan (loyihalar + Scopus/WoS)  
11. Virtual tur (YouTube)  
12. Kalendar + e’lonlar + metric strip  
13. Dual CTA  
14. Ta’lim yo‘nalishlari (royal fon)  
15. Navoiy til/meros (heritage-strong fon)  
16. Xalqaro hamkorlar  
17. Navoiy merosi band (layout footer oldi) + Footer  

### Mobil

- Header: ochiq menyuda **royal to‘q fon**, scroll lock, guruhlangan linklar  
- Hero: kichik tipografiya, CTA stack, swipe  
- PageShell: `pt-28` mobil, kichikroq sarlavha  
- Landing: kamroq padding, filtrlar gorizontal scroll  
- Global: `overflow-x: hidden`, `viewport-fit=cover`, safe-area  

---

## 5. Backend / CMS — nima qilindi

| Imkoniyat | Holat |
|-----------|--------|
| Person, Department, Program, News, … | ✅ |
| Bootstrap API | ✅ |
| Seed + verify | ✅ (~36 people, ~16 news) |
| Jazzmin admin | ✅ |
| CKEditor (yangiliklar) | ✅ (4.x — yangilash tavsiya) |
| Media yuklash | ✅ (qisman gitda: hero/people) |
| Env-driven settings (prod) | ✅ |
| Passenger WSGI / cPanel docs | ✅ |
| Live production hosting | ⏳ foydalanuvchi tomonida |

**Dev admin:** `admin` / `admin123` (faqat local)  

---

## 6. Dizayn tizimi

| Token | Qiymat |
|-------|--------|
| Heritage | `#fdfaf3` |
| Parchment | `#fcf8ee` |
| Gold | `#d4af37` / `gold-gradient` |
| Royal | `#001524`, `#003366` |
| Shrift | Cinzel Decorative + Cormorant Garamond + Inter |

### Dizayn tamoyillari (joriy)

1. Yorug‘ kartalarda **to‘q invert hover yo‘q** — gold soya va lift  
2. Bo‘limlar **bir xil shablon takrorlamaydi** (landing diversity)  
3. Navoiy merosi: girih, shamsa, islimiy, Behzod naqshlari  
4. Menyu/dropdown: **to‘q royal** — oq fonda ham o‘qiladi  
5. Mobil: ixcham, touch 44px, gorizontal overflow yo‘q  

---

## 7. Kontent va ma’lumotlar

### Asosiy raqamlar (2025–2026)

| Ko‘rsatkich | Qiymat |
|-------------|--------|
| Talabalar | **3394** |
| Professor-o‘qituvchilar | **148** |
| Ilmiy salohiyat | **40%** |
| Kafedralar | **7** |
| Dasturlar | **14** |
| Hamkor OTM | **9** |

### Universitet rahbariyati (tartib)

1. M.B. Kalonov — Rektor  
2. B. Bobonazarov — Birinchi prorektor  
3. O. Raximov — O‘quv  
4. M. Olimov — Infratuzilma  
5. Dilnoza X. — Xalqaro *(familiya to‘liq emas)*  
6. S. Xujjiyev — Ilmiy  

**Dekan:** E.X. Musayev  

---

## 8. Git va deploy

### Commit tarixi (asosiy)

| Hash | Tavsif |
|------|--------|
| `81e7efa` / merge `c16def6` | To‘liq loyiha + remote skeleton |
| `29462d9` | UI polish: scroll-top, leadership search |
| `26ed06b` | Landing redesign, menu, scroll replay |
| `928c46d` | Mobile-first + dark mobile menu |

### Deploy holati

| Bosqich | Holat |
|---------|--------|
| GitHub | ✅ |
| Local FE/API | ✅ ishga tushirilgan |
| cPanel paket/hujjat | ✅ tayyor |
| Live domen | ⏳ |

Batafsil: `DEPLOY_CPANEL.md`, `scripts/prepare_cpanel.ps1`  

### Git ignore (to‘g‘ri)

- `.env`, `db.sqlite3`, `node_modules`, `dist`, `staticfiles`  
- `backend/media/uploads/` (yangi admin yuklamalari)  
- Seed media (hero/people) va `public/images` **repoda bor**  

---

## 9. Kuchli jihatlar

1. **Brendli UI** — Navoiy merosi + zamonaviy layout  
2. **API + static fallback** — backend o‘chsa ham sayt ochiladi  
3. **3 til** (uz/ru/en) matn va ma’lumotlarda  
4. **Bog‘langan katalog** — shaxs ↔ kafedra ↔ dastur ↔ yangilik  
5. **Admin CMS** — kod yozmasdan kontent  
6. **Seed/verify** — takrorlanuvchi ma’lumot sifati  
7. **Scroll replay** — pastga/yuqoriga animatsiya  
8. **Mobil menyu va layout** — royal drawer, swipe, safe-area  
9. **Deploy hujjatlari** — cPanel yo‘riqnoma  

---

## 10. Kamchiliklar va keyingi qadamlar

| # | Masala | Ustuvorlik | Yechim |
|---|--------|------------|--------|
| 1 | Live production yo‘q | 🔴 | cPanel deploy + SSL |
| 2 | Ba’zi F.I.Sh./foto placeholder | 🔴 | Rasmiy ro‘yxat + media |
| 3 | Kontaktlar placeholder | 🔴 | Rasmiy telefon/email |
| 4 | Tailwind CDN | 🟠 | PostCSS build |
| 5 | CKEditor 4 ogohlantirish | 🟠 | CKEditor 5 |
| 6 | Aloqa faqat mailto | 🟠 | Backend forma API |
| 7 | Test/CI kam | 🟠 | Vitest + pytest + Actions |
| 8 | README qisman eski | 🟡 | Dual-stack yangilash |
| 9 | SSR/SEO SPA | 🟡 | Prerender ixtiyoriy |

### Roadmap (qisqa)

**P0:** Production deploy, rasmiy kadr/kontakt/rasm  
**P1:** Tailwind build, CKEditor 5, testlar, aloqa API  
**P2:** Hisobot dashboard, global qidiruv, open data  

---

## 11. Ishga tushirish

### Frontend

```bash
cd navdu-tillar-fakulteti
npm install
npm run dev -- --host --port 3001
```

→ http://localhost:3001  

### Backend

```bash
cd backend
py -3 -m pip install -r requirements.txt
py -3 manage.py migrate
py -3 manage.py seed_from_fixture --clear
py -3 manage.py runserver 8000
```

→ http://127.0.0.1:8000/admin/ · `/api/bootstrap/`  

### Foydali skriptlar

| Skript | Vazifa |
|--------|--------|
| `npm run build` | Production frontend |
| `npm run backend:seed` | Seed |
| `npm run cpanel:pack` | cPanel paket |

---

## 12. Xulosa va baho

Loyiha qisqa muddatda:

1. **Zamonaviy, brendli SPA** (React 19 + motion + 3 til),  
2. **Hisobot asosidagi kontent** (3394 talaba, 7 kafedra, 14 dastur, 9 hamkor),  
3. **Django CMS + REST**,  
4. **Landing/UI polish + to‘liq mobil**,  
5. **GitHub + cPanel tayyorgarlik**  

bilan **ishlaydigan MVP+** holatiga yetkazildi.

### Ball (1–5)

| Mezon | Ball | Izoh |
|-------|------|------|
| Dizayn / brend | **4.5** | Kuchli; Tailwind CDN qolgan |
| Funksionallik | **4.0** | Asosiy bo‘limlar to‘liq |
| Kontent | **3.5** | Hisobot yaxshi; foto/F.I.Sh. to‘ldirish kerak |
| Backend/CMS | **4.0** | Admin qulay |
| Mobil | **4.2** | Menu, hero, spacing ishlangan |
| Xavfsizlik | **3.0** | Prod hardening zarur |
| Deploy tayyorligi | **4.0** | Hujjat bor; live kutilmoqda |
| Hujjatlashtirish | **4.5** | Memory + ushbu hisobot |

### Yakuniy xulosa

Sayt **fakultetning raqamli yuzi** bo‘lishga tayyor: dizayn esda qoladi, ma’lumotlar hisobotga asoslangan, admin orqali yangilanadi, kod GitHubda, mobil rejim ishlaydi.  

**Keyingi eng muhim qadam:** production (cPanel) + rasmiy kadr/kontakt/rasm to‘ldirish.

---

## Ilova — muhim fayllar

| Fayl | Vazifa |
|------|--------|
| `src/App.tsx` | Marshrutlar |
| `src/lib/hydrate.ts` | API → data |
| `src/components/layout/Header.tsx` | Meny u (desktop + mobil) |
| `src/components/home/LandingMoreSections.tsx` | Landing bo‘limlari |
| `src/components/home/HeroSlider.tsx` | Hero |
| `backend/catalog/models.py` | DB |
| `backend/fixtures/seed.json` | Seed |
| `DEPLOY_CPANEL.md` | Hosting |
| `docs/memory/PROJECT_MEMORY.md` | Operatsion xotira |
| `docs/HISOBOT.md` | **Ushbu hisobot** |

---

*Hisobot: kod bazasi, git tarixi, memory va 2026-07-24…26 sessiya ishlari asosida yangilandi (2026-07-26).*
