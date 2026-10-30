# SON IŞIK

**Gizem · Macera · Psikolojik · 16-bit Pixel Art**

16 Mart 1998 gecesi. Saatler **03:17**'de durmuş, kasabadaki herkes ardında yarım kalmış sofralar ve açık kapılar bırakarak ortadan kaybolmuştur. Yağmurun altında uyanan **Aras**, yıllardır kapalı olmasına rağmen bu gece kendi kendine yanmaya başlayan deniz fenerinin ışığını takip etmek zorundadır.

*Son Işık*, tepeden görünümlü (top-down), tamamen tarayıcı üzerinde çalışan, harici görsel veya ses dosyası kullanmadan kodla üretilmiş piksel sanatına ve prosedürel WebAudio ses atmosferine sahip kısa (~15–25 dakikalık) bir hikâye oyunudur.

---

## Nasıl Oynanır?

Herhangi bir derleme (build) adımına veya paket kurulumuna gerek yoktur:

1. **Doğrudan açarak:** `son-isik/index.html` dosyasına çift tıklayıp tarayıcınızda (`file://` üzerinden) doğrudan açabilirsiniz.
2. **Yerel sunucu ile:** Klasörü bir statik sunucu üzerinden servis edebilirsiniz:
   ```bash
   npx serve son-isik
   ```
   veya:
   ```bash
   python3 -m http.server 8080 --directory son-isik
   ```

Oyun ilerlemeniz tarayıcınızın `localStorage` alanında (`sonisik_save`) otomatik olarak saklanır; ana menüdeki **Devam Et** seçeneğiyle kaldığınız yerden devam edebilirsiniz.

---

## Kontroller

| Tuş / Giriş | İşlev |
| :--- | :--- |
| **W, A, S, D** veya **Ok Tuşları** | Hareket et |
| **E**, **Boşluk (Space)** veya **Enter** | Etkileşime geç / Diyaloğu ilerlet |
| **J** | Günlüğü aç / kapat (bulunan notları incele) |
| **M** | Sesi aç / kapat |
| **Esc** | Açık not, günlük veya şifre ekranını kapat |
| **Dokunmatik Ekran** | Mobil cihazlarda ekran üstü D-Pad, **E** ve **J** butonları |

---

## Bölümler

- **Bölüm I — Terk Edilmiş Kasaba:** Yağmur altındaki ıssız sokakları keşfet, durmuş saatlerin ve geride bırakılan ipuçlarının izini sürerek orman yolunun anahtarını bul.
- **Bölüm II — Unutulmuş Orman:** Sisin içindeki patikalarda yönünü bul, karanlıkta süzülen varlıklardan kaçınarak ormanda kaybolanların üç hatırasını topla.
- **Bölüm III — Yeraltındaki Gerçek:** Kasabanın altındaki karanlık tesise in, yedek jeneratörleri devreye sok ve fener hattına bağlanan asansörün erişim kodunu çöz.
- **Bölüm IV — Son Işık:** Deniz fenerinin basamaklarını tırman, kasabaya dağılmış 12 notun ardındaki gerçeği birleştir ve fener sönmeden önce son kararını ver.

---

## Dosya Yapısı

```text
son-isik/
├── index.html       # Oyun sayfası ve DOM arayüz katmanları
├── style.css        # Piksel ölçekleme, diyalog, günlük ve menü stilleri
├── PLAN.md          # Oyun tasarım ve teknik mimari belgesi
├── README.md        # Oyun kılavuzu ve proje bilgileri
└── src/
    ├── maps.js      # 4 bölümün harita üreticileri ve çarpışma kuralları
    ├── sprites.js   # Prosedürel piksel sanat tile ve karakter çizimleri
    ├── story.js     # Diyaloglar, 12 not, etkileşimler ve sonlar
    ├── audio.js     # WebAudio tabanlı prosedürel ambiyans, yağmur ve ses efektleri
    └── main.js      # Oyun motoru, kamera, ışıklandırma, girdi ve kayıt sistemi
```

---

## Emeği Geçenler

Plan: Claude Opus 5.5 · Kod: GPT-6.1 Sol · Ses ve QA: Gemini 4 Argon
