# Kengaytirilgan va kritik taqqoslash hisoboti

**Loyiha:** NavDU Tillar fakulteti (`tillar-main`)
**Namunaviy sayt:** https://gov.uz/oz/edu (O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi)
**Sana:** 2026-07-29
**Metod:** gov.uz/oz/edu sayti brauzerda ochilib, `getComputedStyle` orqali real ranglar, shriftlar, radius va effektlar DOM darajasida o'lchandi; natijalar `tillar-main` loyihasining `index.html`, tailwind konfiguratsiyasi va `src/components/**` fayllari bilan solishtirildi.

---

## 1. Xulosa (qisqacha)

Loyiha gov.uz **strukturasini** (accessibility bar, marquee, header, sitemap drawer) to'g'ri o'zlashtirgan, lekin **vizual tili** (rang, shrift, burchak radiusi, gradient, katta harflar, soya/hover animatsiyasi) namunaviy saytdan sezilarli darajada farq qiladi va "davlat portali" emas, "zamonaviy marketing sayti" uslubiga yaqinroq.

---

## 2. Taqqoslash jadvali

| Parametr | gov.uz/oz/edu (o'lchangan) | tillar-main (joriy) | Og'ish |
|---|---|---|---|
| Shrift oilasi | **Montserrat** (yagona, 400-700) | `Plus Jakarta Sans` (asosiy) + Inter + Montserrat aralash, ko'p joyda `font-['Plus_Jakarta_Sans']` hardcode | ❌ Katta |
| Asosiy brend rang | `#013D8C` (rgb(1,61,140)) | `#002E69` | ⚠️ O'rtacha |
| H2 sarlavha rangi | `#043B87` (rgb(4,59,135)) | `#131523` (qora-navy) | ❌ Katta |
| Asosiy matn rangi | Qora `#000000` | Navy `#002E69` / `#131523` | ❌ Katta |
| Ikkinchi darajali matn | `#707070` | `#64748B` (slate) | ⚠️ Kichik |
| Nav-bar foni | `#F0F0F0` | `#F8FAFC` | ⚠️ Kichik |
| Karta/chegara rangi | `#E1E1E1` / `rgb(229,231,235)` | `#E2E8F0` | ⚠️ Kichik |
| **Burchak radiusi** | **0px — deyarli hamma joyda keskin burchak** (tugma, karta, input, dropdown) | `rounded-full`, `rounded-xl`, `rounded-2xl`, `rounded-lg` — deyarli barcha elementda | ❌ **Eng katta og'ish** |
| Gradientlar | Yo'q — flat/bir xil rang | Hero to'liq ekran gradient (`247deg`, navy→deep-navy), tugmalarda gradient | ❌ Katta |
| Katta harf (uppercase) — tugma/menyu | Yo'q (`text-transform: none`) | Deyarli barcha tugma, menyu, drawer elementi uppercase + `letter-spacing` | ❌ Katta |
| Katta harf — H2 sarlavha | **Bor** (`text-transform: uppercase`) | Bor (`gov-section-title`) | ✅ To'g'ri keladi |
| Soya (box-shadow) | Deyarli yo'q | `shadow-gov`, `shadow-xl`, `shadow-2xl`, `shadow-inner` — keng qo'llanilgan | ❌ Katta |
| Hover-lift animatsiya (`translateY`, `scale`) | Aniqlanmadi | `hover:-translate-y-2`, `hover:scale-105` — kartalar, tugmalar, strelkalarda | ❌ Katta |
| Yashil aksent rang (`#059669`/`#047857`) | **Umuman yo'q** — palitrada faqat navy/qora/kulrang/oq | `gov-btn-green`, `stat-box--green`, va 10 ta faylda ishlatilgan | ❌ Manbasiz — o'ylab topilgan rang |
| Menyu matn og'irligi | 600 og'irlik, 14px | O'zgaruvchan, ba'zan 700-800 | ⚠️ Kichik |
| Struktura: accessibility bar, marquee, header/sitemap drawer | Bor | Bor (`GovAccessibilityBar`, `GovMarquee`, `GovHeader`) | ✅ To'g'ri konsept |

---

## 3. Dalillar

### 3.1 gov.uz/oz/edu — real o'lchangan tokenlar (brauzer konsoli, `getComputedStyle`)

```json
{
  "font": "montserrat (870 ta elementda, yagona)",
  "primaryColor": "rgb(1, 61, 140)  = #013D8C",
  "h2Color": "rgb(4, 59, 135) = #043B87",
  "bodyText": "rgb(0, 0, 0)",
  "mutedText": "rgb(112, 112, 112) = #707070",
  "navBg": "rgb(240, 240, 240) = #F0F0F0",
  "cardBorder": "1px solid rgb(225, 225, 225) = #E1E1E1",
  "buttonRadius": "0px",
  "cardRadius": "0px",
  "buttonTextTransform": "none",
  "h2TextTransform": "uppercase",
  "menuLinkFontWeight": 600,
  "menuLinkFontSize": "14px"
}
```

### 3.2 tillar-main — joriy `index.html` tokenlari

```css
--color-primary: #002E69;
--color-primary-dark: #0B1B3D;
--font-family: 'Plus Jakarta Sans', 'Inter', 'Montserrat', sans-serif;
--radius: 8px;
.gov-btn-primary { border-radius: 6px; background: linear-gradient(247deg, #002E69 0%, #0B1B3D 100%); }
.gov-card:hover { transform: translateY(-2px); box-shadow: ...; }
.gov-btn { text-transform: uppercase; letter-spacing: 0.04em; }
```

### 3.3 Skrinshot bilan tasdiqlangan muammolar (localhost:3001)

- **Hero bo'limi**: to'liq ekran, gradient qoplamali to'q-navy fon; katta uppercase sarlavha; `rounded-full` pill-badge ("MEROS VA MADANIYAT"); ikkita tugma — biri to'liq oq `rounded-lg`, ikkinchisi outline; qidiruv paneli `rounded-xl` oq quti ichida `rounded-full` tugma bilan. — **gov.uz'da bunday to'liq-ekran gradient hero yo'q**, bo'limlar shaffof/oq fonda joylashadi.
- **Footer + hamkorlar bo'limi**: to'q-navy fon (`#0B1B3D`), yumaloq burchakli kartalar, doira ichida hamkor logotiplari (`rounded-full`). — gov.uz kartalarida radius 0, chegara 1px.
- **Header**: logotip atrofida `rounded-full` halqa, "Sayt xaritasi" tugmasi `rounded-lg`, qidiruv tugmasi `rounded-full`. — gov.uz'da bunday yumaloqlik yo'q.

---

## 4. Muammoning ko'lami (kod bazasida)

`rounded-*`, `shadow-*`, `uppercase`, `translateY`/`scale` hover, yoki `gov.primary/deep/navy/green` kabi token so'zlaridan kamida bittasi ishlatilgan fayllar: **44 ta** (`src/components/**` va `src/pages/**` ichida deyarli barcha komponent va sahifa). Ko'p joyda ranglar markaziy o'zgaruvchi (`var(--color-primary)` yoki `bg-gov-primary`) orqali emas, to'g'ridan-to'g'ri hex-kod (`#002E69`, `#0B1B3D`, `#0066CC`) sifatida yozilgan — bu keyingi rebranding/tuzatishni qiyinlashtiradi.

---

## 5. Tuzatish rejasi

Foydalanuvchi bilan kelishilgan qamrov: **to'liq — barcha 44 faylni gov.uz uslubiga moslashtirish.**

**Qoidalar (barcha fayllarga bir xilda qo'llaniladi):**

1. Shrift: `Montserrat` — yagona asosiy shrift (Plus Jakarta Sans olib tashlanadi).
2. Asosiy rang: `#002E69` → `#013D8C`; sarlavha rangi → `#043B87`; asosiy matn → `#000000`/qora-yaqin.
3. Radius: tugma/karta/input/dropdown/badge/drawer — **0 yoki minimal (2-4px)**; faqat kichik dumaloq nuqta-belgilar va odam profil rasm (avatar)larida `rounded-full` qoladi.
4. Barcha gradientlar flat rangga almashtiriladi.
5. Tugma/menyu/drawer'dagi `uppercase` olib tashlanadi (H2 section-title'dagi uppercase **saqlanadi** — bu gov.uz'ga mos).
6. `shadow-xl/2xl/gov-lg` kabi kuchli soyalar olib tashlanadi yoki 1px chegaraga almashtiriladi; `hover:-translate-y`/`scale` lift-animatsiyalar olib tashlanadi.
7. Manbasiz yashil aksent (`#059669`) navy/kulrang tizimga almashtiriladi.

**Bajarilish tartibi:** markaziy tokenlar (`index.html`) → header/hero/stats/news/services/footer (bosh sahifa) → qolgan sahifa va komponentlar (student, ilm-fan, jamoa, kontakt va h.k.).

---

*Ushbu hisobot brauzer orqali jonli o'lchangan gov.uz/oz/edu ma'lumotlariga asoslangan. Tuzatishlar davom etmoqda, natija shu faylga yoki alohida xulosa xabarida yangilanadi.*
