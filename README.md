# GolBilgi — Futbol bilginin sahası

Türkçe, mobil uyumlu futbol bilgi yarışması. Koyu stadyum teması, altın vurgular ve Framer Motion geçişleriyle tarayıcıda çalışır. Üyelik, sunucu veya API anahtarı gerekmez.

## Çalıştırma

Node.js **22 LTS (22.12+)**, **24 LTS** veya **26+** ve npm gerekir.

```bash
cd app
npm ci
npm run dev
```

Terminalde gösterilen yerel adresi açın; varsayılan adres `http://localhost:5173`.

```bash
cd app
npm ci && npm test && npm run build
npm run preview
```

Üretim çıktısı `app/dist/` içine yazılır; herhangi bir statik dosya sunucusunda yayımlanabilir. Google Fonts erişilemezse sistem yazı tipleri kullanılır; oyun verisi ve mantığı harici bir hizmete bağlı değildir.

## Oyun

- **Ana sayfa → kategori → maç hazırlığı → oyun → sonuç.** Rekorlar ayrı ekrandadır.
- **Klasik:** Rastgele seçilen, tekrarsız 10 soru.
- **Zamana karşı:** 60 saniyede mümkün olduğunca çok doğru. Açıklama ekranının süresi de toplam süreye dahildir; 1,7 saniye sonra sonraki soru otomatik açılır. İstenirse butonla daha erken geçilebilir. Seçili havuz biterse tekrar karıştırılır; arka arkaya aynı soru gelmez.
- **Kolay / Orta / Zor:** Her kategori ve zorluk kombinasyonunda en az 10 soru bulunur.
- **Her soru 15 saniye, dört şık.** Soru sırası ve şıklar her yeni oyunda ayrı karıştırılır. Doğru şık, kısa açıklama ve kazanılan puan anında gösterilir.
- **Klavye:** `1`–`4` ile yanıt, `Tab` ile gezinme, `Enter`/`Space` ile butonları kullanma, `Escape` ile yardım penceresini kapatma. Diyaloglarda odak pencere içinde tutulur; azaltılmış hareket tercihi desteklenir.
- **Sonuç:** Puan, doğruluk, en uzun seri ve yanlış/yanıtsız soruların açılabilir incelemesi. Paylaş butonu skoru panoya kopyalar; pano izni yoksa kopyalanabilir metin gösterir.

### Puanlama

Doğru cevabın puanı:

```text
100 × zorluk çarpanı + hız bonusu + seri bonusu
```

Zorluk çarpanı kolayda **1**, ortada **2**, zorda **3**. Kalan her **tam saniye +5** puandır (en fazla 75). Seri bonusu üçüncü doğruyla başlar: 3. doğru +25, 4. doğru +50; artış en fazla +125 puana ulaşır. Yanlış veya süresi dolan soru puan götürmez, seriyi sıfırlar.

Rekorlar **kategori + mod + zorluk** bazında `localStorage` içinde saklanır (`golbilgi.records.v1`). Ana sayfada tüm sonuçların en yüksek puanı gösterilir. Kayıtlar başka cihazlara aktarılmaz; tarayıcı verileri silinirse kaybolur. Depolama engelliyse oyun çalışmaya devam eder ve saklama uyarısı gösterir.

## Soru bankası

`app/src/data/questions.ts` içindeki tipli dizide **160 özgün soru** vardır:

| Kategori | Kolay | Orta | Zor | Toplam |
| --- | ---: | ---: | ---: | ---: |
| Kulüpler (`clubs`) | 14 | 13 | 13 | 40 |
| Futbolcular (`players`) | 14 | 13 | 13 | 40 |
| Kupa Kazananlar (`winners`) | 14 | 13 | 13 | 40 |
| Türk Futbolu (`turkish`) | 14 | 13 | 13 | 40 |
| **Toplam** | **56** | **52** | **52** | **160** |

**Karışık**, beşinci bağımsız soru kategorisi değil, dört kategorinin birleşimidir: 160 soruya erişir; seçilen zorluğa göre 56 veya 52 soruluk havuz kullanır. Böylece soru kopyalarıyla toplam sayı şişirilmez.

Her soru `id`, `category`, `difficulty`, `question`, tam dört elemanlı `options`, `answerIndex` ve `explanation` alanlarını içerir. İçerik 2025 sonuna kadar gerçekleşmiş, sonucu değişmeyen tarihî olaylarla sınırlıdır. Belirli yılın kazananları, geçmiş transferler, kuruluşlar ve tarihî stadyumlar kullanılır; “şu an hangi kulüpte?” gibi güncelliğini kaybeden sorular yoktur. Soruların ve açıklamalarının doğruluk/tek anlamlılık incelemesi yapılmıştır.

İçerik incelemesinde kullanılan resmî kaynaklardan bazıları:

- [Premier League: Arsenal’ın 2003-04 sezonu](https://www.premierleague.com/en/news/59016).
- [Liverpool: 1964’te tamamen kırmızı formaya geçiş](https://www.liverpoolfc.com/news/60-years-liverpool-wear-all-red-strip-first-time).
- [UEFA: kulüplerin lakapları](https://www.uefa.com/uefachampionsleague/news/0242-0e9850ac3f8e-2f125c175931-1000--uefa-champions-league-teams-and-their-nicknames/).
- [FIFA: Cannavaro ve 2006 Dünya Kupası](https://www.fifa.com/en/tournaments/mens/worldcup/articles/fabio-cannavaro-italy-interview).
- [Ballon d’Or: 1956 sonuçları](https://ballondor.com/all-rankings?year=1956) ve [1995 sonuçları](https://ballondor.com/all-rankings?year=1995).
- [CONMEBOL: 2007 Copa América finali](https://copaamerica.com/en/news/brazil-3-0-argentina-the-heart-stopping-final-of-the-2007-conmebol-copa-america).
- [TFF: 2010-11 sezonu gol krallığı](https://www.tff.org/default.aspx?pageID=1059).

## Dosya yapısı

```text
README.md
app/
├── public/favicon.svg
├── src/
│   ├── data/
│   │   ├── questions.ts        # Tipler ve 160 soruluk banka
│   │   └── questions.test.ts   # Veri bütünlüğü ve kategori dağılımı
│   ├── App.tsx                # Ana sayfa, ayarlar, oyun, sonuç, rekorlar
│   ├── game.ts                # Saf oyun, süre, karıştırma ve puanlama mantığı
│   ├── game.test.ts
│   ├── records.ts             # Güvenli yerel kayıt okuma ve rekor karşılaştırması
│   ├── records.test.ts
│   ├── main.tsx
│   └── styles.css             # Tailwind CSS ve duyarlı stadyum tasarımı
├── index.html
├── package.json
├── package-lock.json
├── tsconfig*.json
└── vite.config.ts
video/
├── public/                 # Playwright ile alınan gerçek uygulama ekran görüntüleri ve sentetik ses
├── src/                    # Remotion (TypeScript) sahneleri ve cihaz çerçeveleri
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

Teknolojiler: Vite, React, TypeScript, Tailwind CSS, Framer Motion, Lucide ve Vitest. Testler; puanlama, hız/seri sınırları, karıştırma ve doğru şıkkın korunması, süre aşımı, çift cevap engeli, klasik/timed bitişleri, havuzun yeniden karıştırılması, yerel rekorlar ve veri bütünlüğünü kapsar.

## Video

`video/` klasöründe uygulamanın gerçek ekran görüntülerini, kinetik tipografiyi, cihaz çerçevelerini ve sahne geçişlerini kullanan **Remotion** tanıtım videosu projesi (16:9 yatay `GolBilgiPromo` ve Türkçe seslendirmeli 9:16 dikey `GolBilgiPromoVertical`) yer alır:

```bash
cd video
npm install
# 16:9 yatay tanıtım videosu (1920x1080, 30 fps, 54 sn)
npx remotion render src/index.ts GolBilgiPromo out/golbilgi-tanitim.mp4 --codec=h264 --pixel-format=yuv420p
# 9:16 dikey ve Türkçe seslendirmeli tanıtım videosu (1080x1920, 30 fps, 50 sn)
npx remotion render src/index.ts GolBilgiPromoVertical out/golbilgi-tanitim-dikey.mp4 --codec=h264 --pixel-format=yuv420p
```
