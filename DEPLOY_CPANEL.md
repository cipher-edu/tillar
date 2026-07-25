# cPanel ga deploy — Tillar fakulteti

> **Muhim:** Parolni hech kimga (shu jumladan AI chatga) bermang.  
> Deploy **sizning cPanel hisobingizdan** qilinadi. Bu hujjat + `deploy_package` sizga yordam beradi.

---

## 0. Talablar

cPanel da bo‘lishi kerak:

- **Setup Python App** (Passenger)
- Python **3.10+** (3.11/3.12 yaxshi)
- **File Manager** yoki FTP
- (Ixtiyoriy) MySQL
- SSL (Let’s Encrypt)

Agar faqat PHP bo‘lsa — Django ishlamaydi. Hostingni tekshiring.

---

## 1. Lokalda paket tayyorlash (kompyuteringizda)

PowerShell (loyiha ildizidan):

```powershell
# API manzilingizni yozing (subdomain yoki asosiy domen)
powershell -ExecutionPolicy Bypass -File scripts\prepare_cpanel.ps1 -ApiUrl "https://api.SIZNING-DOMEN.uz/api"
```

Yoki qo‘lda:

```powershell
$env:VITE_API_URL="https://api.SIZNING-DOMEN.uz/api"
npm run build
```

Natija: `deploy_package/`

```
deploy_package/
  frontend_public_html/   ← public_html ga
  backend_app/            ← Python App ga
  DEPLOY_CPANEL.md
```

---

## 2. Tavsiya etilgan domen tuzilmasi

| URL | Nima |
|-----|------|
| `https://SIZNING-DOMEN.uz` | React sayt (`public_html`) |
| `https://api.SIZNING-DOMEN.uz` | Django API + Admin |

cPanel → **Subdomains** → `api` yarating → document root masalan:  
`/home/USER/api.SIZNING-DOMEN.uz` yoki Python App ko‘rsatgan papka.

---

## 3. Backend (Django) — cPanel

### 3.1 Python App

1. cPanel → **Setup Python App** → **Create Application**
2. Python version: 3.11 (yoki 3.10+)
3. Application root: masalan `tillar-api`  
   (to‘liq yo‘l: `/home/USER/tillar-api`)
4. Application URL: subdomain `api.SIZNING-DOMEN.uz` (yoki `/api` — hostga qarab)
5. Application startup file: **`passenger_wsgi.py`**
6. Application Entry point: **`application`**
7. **Create**

### 3.2 Fayllarni yuklash

File Manager yoki FTP:

- `deploy_package/backend_app/` ichidagi **hamma narsa** ni  
  Application root ga yuklang (`tillar-api/`).

Kerakli fayllar:

- `manage.py`
- `passenger_wsgi.py`
- `config/`
- `catalog/`
- `requirements.txt`
- `fixtures/` (seed uchun)
- `static/`, `media/` (bo‘sh bo‘lishi mumkin)

### 3.3 Virtualenv va paketlar

Python App sahifasida **Enter to the virtual environment** buyrug‘ini nusxalang va Terminal da:

```bash
cd ~/tillar-api
# cPanel bergan source virtualenv/...
pip install -r requirements.txt
# MySQL ishlatsangiz:
# pip install mysqlclient
# yoki: pip install PyMySQL
```

### 3.4 .env

`tillar-api/.env` yarating (`.env.example` dan):

```env
DJANGO_DEBUG=0
DJANGO_SECRET_KEY=bu-yerga-50-belgidan-uzun-tasodifiy-kalit

DJANGO_ALLOWED_HOSTS=api.SIZNING-DOMEN.uz,SIZNING-DOMEN.uz
DJANGO_CORS_ORIGINS=https://SIZNING-DOMEN.uz,https://www.SIZNING-DOMEN.uz
DJANGO_CSRF_TRUSTED=https://api.SIZNING-DOMEN.uz,https://SIZNING-DOMEN.uz,https://www.SIZNING-DOMEN.uz

DJANGO_COOKIE_SECURE=1
DJANGO_SSL_REDIRECT=0

DJANGO_DB_ENGINE=sqlite
```

### 3.5 Migrate, static, superuser, seed

```bash
cd ~/tillar-api
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
# Ixtiyoriy — boshlang‘ich ma’lumot:
python manage.py seed_from_fixture
python manage.py verify_seed
```

### 3.6 Restart

Python App → **Restart**.

Tekshirish:

- `https://api.SIZNING-DOMEN.uz/api/stats/`
- `https://api.SIZNING-DOMEN.uz/admin/`

---

## 4. Frontend — public_html

1. File Manager → `public_html` (yoki asosiy domen ildizi)
2. Eski fayllarni zaxira qiling
3. `deploy_package/frontend_public_html/` ichidagilarni yuklang  
   (`index.html`, `assets/`, `.htaccess`)

Tekshirish: `https://SIZNING-DOMEN.uz`

Brauzer konsolda API xatosi bo‘lsa — `VITE_API_URL` noto‘g‘ri build qilingan. Qayta build qiling.

---

## 5. SSL

cPanel → **SSL/TLS Status** → domen va `api` subdomain uchun **Run AutoSSL**.

---

## 6. Media (rasmlar)

Django `MEDIA_ROOT` = `backend/media/`.

Agar media 404 bersa:

- Python App da media yo‘lini tekshiring
- yoki subdomain da `media` papkasini ko‘rsating
- ruxsat: yozish mumkin bo‘lsin (`uploads/ckeditor`)

---

## 7. Tez tekshiruv ro‘yxati

| URL | Kutilgan |
|-----|----------|
| `/` | Sayt ochiladi |
| `/api/bootstrap/` | JSON (katta) |
| `/admin/` | Jazzmin login |
| Yangilik tahrir | CKEditor ishlaydi |

---

## 8. Men (AI) nima qila olmayman / qila olaman

| | |
|--|--|
| ❌ | Sizning cPanel login/parolingiz bilan kirish |
| ❌ | Brauzerdan sizning hostingga avtomatik deploy |
| ✅ | `deploy_package` va sozlamalarni tayyorlash |
| ✅ | Xato chiqsa — log/xabar matniga qarab tuzatish |

---

## 9. Muammo bo‘lsa

Python App → **stderr log** ni oching.

Tez-tez:

- `ModuleNotFoundError` → `pip install -r requirements.txt`
- `DisallowedHost` → `DJANGO_ALLOWED_HOSTS`
- CORS xato → `DJANGO_CORS_ORIGINS` (https bilan)
- 500 → `DJANGO_DEBUG=1` vaqtincha, xatoni ko‘ring, keyin yana `0`
- Static 404 → `collectstatic` + WhiteNoise

---

**Keyingi qadam sizda:**  
1) Domen/API URL ni tanlang  
2) `prepare_cpanel.ps1` ni ishga tushiring  
3) cPanel ga yuklang  

Tayyor bo‘lgach, xato matnini yuboring — parolsiz tuzatib beraman.
