# Changelog — Tillar fakulteti sayti

## 2026-07-25 — Django backend + API + seed

### Qo‘shildi
- `backend/` — Django 5 + DRF + CORS + Admin
- Modellar: Person, Department, Program, News, History, Project, Publication, Partner, Groups, Hero, Stats, Contact, Presidential, Rector, Navoi
- `seed_from_fixture` — frontend real ma’lumotlar `fixtures/seed.json` orqali DB ga
- Frontend: `src/lib/api.ts`, `src/lib/hydrate.ts` — ishga tushganda API dan yuklash, fallback static
- Superuser: `admin` / `admin123` (dev)

### Tekshiruv / to‘ldirish
- Pagination o‘chirildi (to‘liq ro‘yxat)
- `GET /api/bootstrap/` — barcha kontent bir so‘rovda
- President name/title/photo fallback DB ga
- Navoiy bandlar hydrate
- `verify_seed` — seed vs DB ALL MATCH (36 people, 16 news, …)

## 2026-07-25 — Bugfix (to‘liq ma’lumotlar tashqari)

### Tuzatildi
- `news.ts`: noto‘g‘ri dekan ismi (Dilnoza Karimova → E.X. Musayev), uydirma ismlar, relatedPersonIds
- Kafedra/dastur bog‘lanishlari: dekan o‘zbek kafedralarida emas; qozoq/fakultetlararo mudirlar to‘g‘ri rollarda
- Barnoyev: `leader` roli olib tashlandi (u o‘qituvchi)
- Dasturlar: 8 kunduzgi + 2 kechki + 1 sirtqi + 3 magistr = 14; `studyForm`; o‘lik `curriculumUrl: '#'` olib tashlandi
- Aloqa formasi: soxta “yuborildi” o‘rniga `mailto:`
- SEO meta (description, OG); i18n hardcode (students_subtitle); README port 3001
- Build: `tsc` + `vite build` OK

## 2026-07-24 — Hisobot + Memory

### Qo‘shildi / yangilandi
- `docs/memory/` — loyiha xotirasi (davomiy ish uchun)
- `site.ts`: talabalar 3394, 148 xodim, 14 dastur, 9 hamkor, `facultyFacts` to‘liq hisobot
- `departments.ts`: 7 kafedra batafsil (shtat, yuklama, % salohiyat)
- `people.ts`: prorektor lavozimlari tuzatildi (Bobonazarov birinchi, Raximov o‘quv, Olimov infra, Dilnoza xalqaro, Sodiq ilmiy)
- `history.ts`: ACQUIN, 2025–2026 natijalar
- `science.ts`: dual ta’lim, ACQUIN, anjuman, qozoq nashrlari
- `LandingMoreSections`: About kartalarida haqiqiy raqamlar
- Partners: UCSI, Muhammadiyah, NSU va b.

### Oldingi (shu sessiya oralig‘ida)
- Hero full-width, news pagination 8, program 3D brand cards
- PresidentialVision sequential slider
- RectorAddress collapsible
- Footer Yandex map + Oybek Abduraimov
- Leadership sortOrder university → faculty

## Keyingi reja
- Rasmlar va to‘liq F.I.Sh. (prorektorlar)
- Hisobot alohida sahifa (ixtiyoriy)
- Deploy
