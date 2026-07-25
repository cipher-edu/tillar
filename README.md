# NavDU Tillar Fakulteti — MVP

Navoiy davlat universiteti **Tillar fakulteti** raqamli ekotizimining prototipi.  
Dizayn tizimi **Alisher Navoiy Simpozium** saytidan olingan (parchment, gold, royal, glass, girih pattern, Cinzel + Cormorant).

## Ishga tushirish

```bash
cd Desktop/navdu-tillar-fakulteti
npm install
npm run dev -- --host --port 3001
```

Brauzer: [http://localhost:3001](http://localhost:3001)

## MVP tarkibi

- Bosh sahifa (hero slayder, statistika, yangiliklar, yo‘nalishlar, hamkorlar)
- Fakultet: tarix (timeline), rahbariyat, tuzilma, faxriy ustozlar
- Ta’lim: yo‘nalishlar, o‘quv rejalar
- Jamoa: professorlar, tyutorlar + guruhlar
- Talabalar: filtrli faol talabalar katalogi
- Ilm-fan: loyihalar, nashrlar (Scopus/WoS badge)
- Yangiliklar: kategoriya + bog‘liq shaxslar
- Aloqa: kontaktlar + forma
- 3 til: o‘zbek / rus / ingliz
- Bog‘langan ekotizim: talaba ↔ rahbar ↔ guruh ↔ yangilik

## Stack

- React 19 + TypeScript + Vite
- React Router 7
- Framer Motion + Lucide
- Tailwind CDN (Simpozium uslubi)
- Mock data (`src/data/*`)

## Loyiha xotirasi (davomiy ish)

Amalga oshirilgan ishlar va keyingi qadamlar:

- **`docs/memory/PROJECT_MEMORY.md`** — to‘liq holat, rahbariyat, raqamlar, fayllar
- **`docs/memory/CONTINUE.md`** — qanday davom etish
- **`docs/memory/DATA_SNAPSHOT.json`** — 2025–2026 ma’lumotlar snapshot
- **`docs/memory/CHANGELOG.md`** — o‘zgarishlar jurnali

Yangi sessiyada: avval `PROJECT_MEMORY.md` ni o‘qing.

## Keyingi bosqich

Prorektor rasmlari, haqiqiy kontaktlar, hisobot sahifasi, deploy.  
Batafsil: `docs/memory/PROJECT_MEMORY.md` §9.
