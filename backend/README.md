# NavDU Tillar Fakulteti — Django Backend

React frontend uchun REST API + Django Admin.

## Tezkor start

```bash
cd backend
py -3 -m pip install -r requirements.txt
py -3 manage.py migrate
py -3 manage.py seed_from_fixture
py -3 manage.py createsuperuser   # admin paneli uchun
py -3 manage.py runserver 8000
```

- **API:** http://127.0.0.1:8000/api/  
- **Admin (Jazzmin):** http://127.0.0.1:8000/admin/  
- **Bootstrap:** http://127.0.0.1:8000/api/bootstrap/  

Admin: `admin` / `admin123` (dev). Yon menyuda model iconlari (Font Awesome).

### Muharrirlar uchun (JSON yo‘q)

Admin formalarda matnlar **3 til maydoni** (🇺🇿 🇷🇺 🇬🇧) sifatida ochiladi — JSON yozish shart emas.

Rasmlar:
- **Rasm yuklash (media)** — fayl tanlang → `/media/...`
- **Rasm URL** — internet (Unsplash va h.k.) zaxira sifatida qoladi  
API avvalo media faylni, yo‘q bo‘lsa URL ni qaytaradi.

Media papka: `backend/media/`

### Yangiliklar — CKEditor

Admin → Yangiliklar → tahrirlash:
- **Asosiy matn** 3 tilda (UZ/RU/EN) **CKEditor** orqali
- Rasm yuklash, jadval, ro‘yxat, sarlavha, havola
- Upload: `/ckeditor/` → `media/uploads/ckeditor/`
- Frontend HTML ni xavfsiz ko‘rsatadi (`news-rich-body`)

## Seed (frontend → DB)

Frontenddagi real ma’lumotlarni yangilab yuklash:

```bash
# loyiha ildizidan
npx tsx scripts/export-seed.ts
cd backend
py -3 manage.py seed_from_fixture --clear
py -3 manage.py verify_seed
```

`verify_seed` — seed.json va DB sonlarini solishtiradi.

### Bootstrap (frontend hydrate)

```
GET /api/bootstrap/
```

Bitta so‘rovda: people, news, programs, departments, history, science, partners, hero, stats, contact, rector, presidential, navoiQuotes, navoiBands.

## Asosiy endpointlar

| Method | Path | Tavsif |
|--------|------|--------|
| GET | `/api/people/` | Shaxslar (`?role=leader\|professor\|student…`) |
| GET | `/api/people/:slug/` | Profil |
| GET | `/api/departments/` | Kafedralar |
| GET | `/api/programs/` | Yo‘nalishlar |
| GET | `/api/news/` | Yangiliklar |
| GET | `/api/history/` | Tarix |
| GET | `/api/projects/` | Ilmiy loyihalar |
| GET | `/api/publications/` | Nashrlar |
| GET | `/api/partners/` | Hamkorlar |
| GET | `/api/stats/` | Statistika + facultyFacts |
| GET | `/api/contact/` | Aloqa |
| GET | `/api/rector/` | Rektor murojaati |
| GET | `/api/presidential/` | Prezident iqtiboslari |
| GET | `/api/navoi-quotes/` | Landing Navoiy iqtiboslari |
| GET | `/api/navoi-band/?page=home` | Sahifa oxiri |
| GET | `/api/landing/` | Landing birlashgan |

## Frontend

```bash
# ildizda
npm run dev -- --host --port 3001
```

`.env.development` ichida: `VITE_API_URL=http://127.0.0.1:8000/api`

API ishlamasa frontend **static** `src/data/*` ga qaytadi.
