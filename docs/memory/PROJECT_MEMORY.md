# Tillar fakulteti — loyiha xotirasi (Memory)

**Oxirgi yangilanish:** 2026-07-24  
**Loyiha yo‘li:** `C:\Users\root\Desktop\navdu-tillar-fakulteti`  
**Ishchi nom:** Navoiy davlat universiteti — Tillar fakulteti veb-sayti  
**Stack:** Vite + React 19 + TypeScript + Tailwind CDN + framer-motion + react-router-dom  

---

## 1. Loyihani ishga tushirish

```bash
cd C:\Users\root\Desktop\navdu-tillar-fakulteti
npm install
npm run dev -- --host --port 3001
```

Build tekshiruv:
```bash
npx tsc --noEmit
npm run build
```

---

## 2. Nima qilingan (yuqori daraja)

| Bo‘lim | Holat | Izoh |
|--------|--------|------|
| Hero slider | ✅ | To‘liq kenglik, brand ranglar, yulduz fon YO‘Q |
| Statistika | ✅ | Soft fon; 2025–2026 raqamlar |
| Prezident bo‘limi | ✅ | O‘zbek tili / Oliy ta’lim / Chet tillari — ketma-ket slayder |
| Yangiliklar | ✅ | About fon `#fdfaf3`, sahifalash 8 ta |
| Rektor murojaati | ✅ | Kalonov, yig‘iladigan matn (yarim + expand) |
| Landing qo‘shimchalar | ✅ | Fakultet haqida, Rahbariyat, talabalar, ilm, media, tadbir, CTA |
| Dasturlar (3D kartalar) | ✅ | Brand palitra (gold/royal/slate) |
| Hamkorlar | ✅ | Navoiy merosi + modern; 9 xorijiy OTM |
| Footer | ✅ | About uslubi fon, Yandex xarita, dasturchi: Oybek Abduraimov |
| Rahbariyat | ✅ | Universitet + fakultet, sortOrder |
| Kafedralar / tarix / ilm | ✅ | Hisobot ma’lumotlari bilan boyitilgan |
| i18n | ✅ | uz / ru / en |

---

## 3. Universitet rahbariyati (to‘g‘ri tartib)

`src/data/people.ts` — `leadershipLevel: 'university'`, `sortOrder`:

| # | F.I.Sh. | Lavozim | slug |
|---|---------|---------|------|
| 1 | Muxiddin Baxriddinovich Kalonov | Rektor, DSc, professor | `kalonov-muxiddin` |
| 2 | Baxtiyor Bobonazarov | Birinchi prorektor | `bobonazarov-baxtiyor` |
| 3 | Otabek Raximov | O‘quv ishlari bo‘yicha prorektor | `raximov-otabek` |
| 4 | Olimov Musaxan Baxtiyorovich | Infratuzilma va iqtisod ishlari bo‘yicha prorektor | `olimov-musaxan` |
| 5 | Dilnoza Xoshimjonovna | Xalqaro hamkorlik ishlari bo‘yicha prorektor | `dilnoza-xoshimjonovna` |
| 6 | Sodiq Xujjiyev | Ilmiy ishlar va innovatsiyalar bo‘yicha prorektor | `xujjiyev-sodiq` |

**Eslatma:** Dilnoza’ning familiyasi to‘liq emas. Rektor rasmi: `public/images/leadership/rector.jpg`.

### Fakultet rahbariyati
- Dekan: Erkin Xalilovich Musayev (`p-dekan`)
- Rus tili kafedrasi mudiri: Feruza Ruziyevna Jumayeva
- O‘zbek / Ingliz kafedra mudirlari: Tursunova, To‘xtayeva (ma’lumotlar qisman placeholder)

---

## 4. 2025–2026 hisobot raqamlari (asosiy)

Manba: foydalanuvchi bergan «UMUMIY MA’LUMOTLAR» hisoboti.  
Kod: `src/data/site.ts` → `stats`, `facultyFacts`, `facultyOverview`, `partners`, `heroSlides`.

| Ko‘rsatkich | Qiymat |
|-------------|--------|
| Talabalar jami | **3394** |
| Bakalavriat | 3217 (1:596, 2:691, 3:736, 4:1020, 5:174) |
| Magistratura | 177 |
| Jins | 73 yigit (2%), 3321 qiz (98%) |
| Professor-o‘qituvchilar | **148** |
| Fan doktori / professor | 8 (5,4%) |
| Fan nomzodi / dotsent | 61 (41,2%) |
| Katta o‘qituvchi | 23 (15%) |
| O‘qituvchi | 56 (38%) |
| Ilmiy salohiyat | **40%** |
| Kafedralar | **7** |
| Bakalavriat yo‘nalishlari | 8 kunduzgi + 2 kechki + 1 sirtqi |
| Magistratura | 3 mutaxassislik |
| Izlanuvchilar | 105 (6 DSc, 77 PhD, 19 mustaqil, 3 stajyor) |
| Nashrlar 2025 | 15 darslik, 20 qo‘llanma, 14 monografiya |
| Maqolalar | 12 xorijiy, 74 OAK |
| Xorijiy malaka / professor | 18 / 13 |
| Ma’naviy tadbirlar | 120 (1500+ talaba) |
| To‘garaklar | 10 (470), volontyor 110 |
| Bitiruvchilar | 1017; ishga joylashgan 549; monitoring 468 |
| Imtiyozli diplom | 16 |

### Kafedralar ilmiy salohiyat (%)
O‘zbek tilshunosligi 100 · O‘zbek tili va adabiyoti 63,1 · Rus 33 · Ingliz tilshunosligi 24 · Qozoq 20 · Ingliz amaliy 18 · Fakultetlararo 16

### 7 kafedra (nomlar)
1. Ingliz tilshunosligi  
2. Ingliz tili amaliy fanlar  
3. Fakultetlararo chet tili  
4. Rus tili va adabiyoti  
5. Qozoq tili va adabiyoti  
6. O‘zbek tili va adabiyoti  
7. O‘zbek tilshunosligi  

---

## 5. Muhim fayllar xaritasi

```
src/
  data/
    site.ts          ← stats, facultyFacts, partners, hero, contact
    people.ts        ← rahbariyat, professorlar, talabalar
    departments.ts   ← 7 kafedra (hisobot bilan boyitilgan)
    programs.ts      ← bakalavriat/magistratura
    history.ts       ← timeline (ACQUIN, 2025–2026)
    science.ts       ← loyihalar, nashrlar
    news.ts, groups.ts, presidential.ts, rector.ts
  components/
    home/
      HeroSlider.tsx
      RectorAddress.tsx
      PresidentialVision.tsx
      LandingMoreSections.tsx   ← About, Leadership, Students, Science...
      PartnersSection.tsx
    layout/ Header.tsx Footer.tsx Layout.tsx
    people/ PersonCard.tsx PersonProfile.tsx
  pages/
    HomePage.tsx
    faculty/ LeadershipPage.tsx HistoryPage.tsx StructurePage.tsx HonoraryPage.tsx
    ...
  i18n/translations.ts
  types/index.ts
public/images/leadership/rector.jpg
docs/
  memory/            ← SHU PAPKA (davomiy xotira)
  kafedra-extract/   ← Word/hujjat extractlari
  pptx-extract.txt
  landing-structure.html
```

---

## 6. Dizayn tizimi (brand)

| Token | Qiymat / ma’no |
|-------|----------------|
| Heritage fon | `#fdfaf3` |
| Parchment | `#fcf8ee` |
| Gold | amber / `gold-gradient` |
| Royal | deep blue / teal (`#001524`, `#003366`, `#004d61`) |
| Program kartalar | 3D, brand only — rainbow YO‘Q |
| Footer xarita | Yandex widget: `CTfeeSZh` |
| Dasturchi | Oybek Abduraimov |

---

## 7. Xalqaro hamkorlar (9)

1. Kazan Federal University (KFU)  
2. M. Auezov South Kazakhstan University  
3. NILE (UK)  
4. Baku State University  
5. St. Petersburg State University of Economics (UNECON)  
6. Novosibirsk State University  
7. UCSI University (Malaysia)  
8. Muhammadiyah University of Jakarta  
9. Muhammadiyah University of Yogyakarta (UMY)  

Qo‘shimcha (tarix/rus kafedra): Polotsk DU, Britaniya Konsulligi (AELLCA, PRESETT, …), ACQUIN akkreditatsiya.

---

## 8. Dual ta’lim / bandlik

- **Heritage** MCHJ — Ingliz tili amaliy fanlar kafedrasi qo‘shma filiali  
- **Zafar Farm – 2021** — amaliy shartnoma  
- Bitiruvchilar: 1017 jami, 549 ishga joylashgan  

Kod: `science.ts` → `pr-2` (dual-talim-heritage)

---

## 9. Keyingi qadamlar (tavsiya)

### Tez polish
- [ ] Dilnoza **to‘liq familiyasi** va barcha prorektorlar **rasmlari**
- [ ] Prorektorlar haqiqiy email/telefon (hozir placeholder `@navoiyuni.uz`)
- [ ] Hero/rasmlarni local `public/` ga to‘liq ko‘chirish (Unsplash bog‘liqligi kamaytirish)
- [ ] Kontakt telefon/emailni rasmiy raqamlar bilan almashtirish

### Kontent
- [ ] Barcha kafedra mudirlari haqiqiy F.I.Sh. + foto
- [ ] Yangiliklar haqiqiy 2025–2026 tadbirlardan (hisobotdagi sanalar)
- [ ] Hisobot bo‘limlari alohida sahifa: O‘quv / Ilmiy / Ma’naviy / Xalqaro / Bandlik
- [ ] Bakalavriat: kechki/sirtqi yo‘nalishlarni dasturlar ro‘yxatida ajratish

### Texnik
- [ ] Tailwindni CDN o‘rniga to‘liq build (prod)
- [ ] SEO meta, Open Graph
- [ ] Deploy (Vercel/Netlify yoki universitet hosting)
- [ ] README ni yangi raqamlar bilan yangilash

### Ma’lumot manbalari
- `docs/kafedra-extract/*.txt` — rus kafedra xodimlari  
- `docs/pptx-extract.txt` — planshet  
- Desktop: «Rus tili va adabiyoti kafedrasi sayt» hujjatlari, Plansheti PPTX  

---

## 10. Qoidalar (AI/davomiy ish uchun)

1. **Rahbariyat tartibi** — faqat foydalanuvchi tasdiqlagan lavozimlarga qarang (`PROJECT_MEMORY` §3).  
2. **Statistika** — yagona manba: `site.ts` (`stats` + `facultyFacts`). Boshqa joyga hardcode qilmang.  
3. **Brand** — rainbow, yorqin “sales” ranglardan saqlaning.  
4. **Til** — barcha foydalanuvchi matnlari uz/ru/en.  
5. **Python** Windowsda: `py -3` (markitdown o‘rniga docx/pptx extract).  
6. **Workspace** ba’zan `Simpozium-main`, haqiqiy kod: `Desktop\navdu-tillar-fakulteti`.  

---

## 11. Sessiya tarixi (qisqa)

1. Simpozium dizaynidan Tillar fakulteti sayti  
2. Hero, stats/news fon, dasturlar 3D, prezident/rektor bloklari  
3. Hamkorlar, footer, landing sections  
4. Planshet + rus kafedra hujjatlaridan ma’lumot  
5. Rahbariyat: Kalonov + prorektorlar (lavozimlar tuzatildi)  
6. To‘liq 2025–2026 hisobot integratsiyasi  
7. **Memory papkasi yaratildi** (shu hujjat)  

---

## 12. Tez havolalar (marshrutlar)

| URL path | Sahifa |
|----------|--------|
| `/` | Bosh sahifa |
| `/fakultet/rahbariyat` | Rahbariyat |
| `/fakultet/tarix` | Tarix |
| `/fakultet/tuzilma` | Tuzilma (kafedralar) |
| `/talim/yonalishlar` | Yo‘nalishlar |
| `/ilm-fan` | Ilm-fan |
| `/yangiliklar` | Yangiliklar |
| `/jamoa/professorlar` | Professorlar |
| `/talabalar` | Talabalar |
| `/aloqa` | Aloqa |

---

*Bu faylni yangilang har muhim o‘zgarishdan keyin. Qisqa changelog: `docs/memory/CHANGELOG.md`.*
