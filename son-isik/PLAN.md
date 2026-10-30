# SON IŞIK — Oyun Planı

Kaynak fikir: ChatGPT paylaşımı "SON IŞIK" (Gizem · Macera · Psikolojik · Pixel Art).
Seçilen tarz: tepeden görünüm (top-down) 16-bit pixel art, gizem + duygusal ters köşe, kısa oyun (~15-25 dk), Türkçe.

## Teknik kararlar

- Tamamen statik tarayıcı oyunu, build adımı yok, harici asset yok. Klasör: \`son-isik/\`.
- \`index.html\` doğrudan dosyadan (file://) açılabilmeli → ES module DEĞİL, klasik \`<script>\` dosyaları; hepsi \`window.SL\` namespace'ine bağlanır.
- Dosyalar:
  - \`son-isik/index.html\`, \`son-isik/style.css\`
  - \`son-isik/src/maps.js\` — harita üreticileri (builder fonksiyonlarıyla, elle string değil), \`SL.isSolid\`, \`SL.buildMaps()\`
  - \`son-isik/src/sprites.js\` — tile ve karakter çizimleri (kod ile pixel art), seeded rng
  - \`son-isik/src/story.js\` — notlar, diyaloglar, sonlar, harita varlıkları (entity), hedef metinleri
  - \`son-isik/src/audio.js\` — WebAudio ile prosedürel müzik/ses (ARGON)
  - \`son-isik/src/main.js\` — motor: döngü, giriş, kamera, çarpışma, ışık, UI
  - \`son-isik/README.md\` (ARGON)
- İç çözünürlük 320×180 offscreen canvas, ekrana tamsayı olmayan ölçekle \`image-rendering: pixelated\` ile basılır. Tile 16px.
- Yazılar (diyalog, not, günlük, menü, son ekranı) DOM overlay; font VT323 (Google Fonts, fallback monospace). HUD metni ekran canvas'ına yüksek çözünürlükte çizilir.
- Kayıt: localStorage \`sonisik_save\` (harita, konum, yön, flags, bulunan notlar). Döngü sayacı ayrı: \`sonisik_loop\`.
- Kontroller: WASD/oklar yürü, E/Boşluk/Enter etkileşim & diyalog ilerlet, J günlük, M ses, Esc kapat. Dokunmatik cihazda ekran üstü d-pad + E + J.
- Hata ayıklama/test için \`window.SL.game\` (durum + API) dışarı açık kalsın.

## Motor API'si (story.js bunu kullanır)

\`G.flags, G.notes, G.player{x,y,dir}, G.map\`, \`G.has(f)\`, \`G.set(f)\`, \`G.say(lines, done)\`, \`G.choose(text, [{label, fn}])\`,
\`G.ask(label, cb(valueOrNull))\` (şifre girişi), \`G.note(id, done)\`, \`G.goto(mapId, tx, ty, dir)\` (fade geçiş), \`G.card(kicker, title, done)\` (bölüm kartı),
\`G.ending(key)\`, \`G.sfx(name)\`, \`G.melody()\`, \`G.flash(rgb, alpha)\`, \`G.snapCam()\`.

Diyalog satırı: \`"Aras: metin"\`, \`"Mira: ..."\`, \`"???: ..."\`, \`"Radyo: ..."\`, \`"Terminal: ..."\` konuşmacı etiketli; diğerleri italik anlatım. Daktilo efekti, E ile tamamla/ilerlet.

Entity: \`{x, y, sprite?, label?, use?(), show?(), light?{r,a,col,flick}, exit?{to,x,y,dir}, w?, h?, req?(), locked?[lines]}\`. Exit'ler üstüne basınca tetiklenir; kilitliyse oyuncu geri itilir ve \`locked\` söylenir. Etkileşim: oyuncunun baktığı yöne ~10px önündeki noktaya en yakın (<13px) kullanılabilir entity; üstünde "E  Oku/İncele/Konuş/Al" balonu.

Çarpışma: oyuncu hitbox'ı ayak noktası etrafında 8×4; köşelerde kayma (corner assist). Hız 64 px/s.

## Görsel/atmosfer

- Karanlık katmanı (ayrı canvas, \`destination-out\` radyal ışıklar): lambalar ('L', titreşen), yanan pencereler ('W'), fener lambası ('O'), telefon kulübesi, saat; oyuncunun etrafında ışık; orman ve laboratuvarda yönlü el feneri konisi.
- Kasabada: yağmur parçacıkları, ara sıra şimşek (beyaz flaş + gök gürültüsü), deniz fenerinden dönen ışık huzmesi, su parıltısı.
- Ormanda: sis bulutları. Laboratuvarda: kırmızı acil durum ışıkları; jeneratör açıldıkça oda ışıkları yanar.
- Karakterler: Aras (sarı yağmurluk, 4 yön, yürüme animasyonu), Mira (beyaz elbiseli, yarı saydam titreşen hayalet kız), Gölge (dalgalanan siyah figür, beyaz gözler).
- Başlık ekranı: arkada kasaba haritası yavaşça kayar, yağmur + fener huzmesi; "SON IŞIK", "Yeni Oyun", (kayıt varsa) "Devam Et", döngü > 0 ise "Döngü #N".

## Haritalar (tile karakterleri)

Katı: \`# R Q U V W N w T b L C c F + K G P H X k O Y\`. Yürünür: \`. , = s _ E S\`.
\`.\` zemin (temaya göre çim/orman toprağı/lab karo/ahşap), \`,\` kaldırım/patika, \`=\` yol, \`s\` kum, \`w\` su, \`_\` iskele tahtası, \`R Q U V\` farklı renkli çatılar, \`#\` duvar, \`W\` yanan pencere, \`N\` karanlık pencere, \`+\` kapı, \`T\` ağaç, \`b\` çalı, \`L\` sokak lambası, \`C/c\` araba sol/sağ yarı, \`P\` telefon kulübesi, \`K\` saat kadranı, \`G\` deniz feneri kulesi, \`H\` yer kapağı, \`X\` jeneratör, \`k\` masa/terminal, \`E\` asansör, \`S\` merdiven, \`O\` fener lambası, \`Y\` laboratuvar tüpü.

Helper'lar: \`grid, fill, set, disc(cx,cy,r), path(points, r)\` (3 kare genişlikte koridor), \`building(x,y,w,h,doorDx,[[dx,'W'|'N']],roofChar)\` (üst satırlar çatı, en alt satır duvar+pencere+kapı).

### Bölüm I — Kasaba (48×32), başlangıç (6,24) aşağı bakar
- x38-39 kum, x40-47 deniz. Ada: kum (42..46, 1..6), fener kulesi 'G' (43..45, 2..4). Yıkık köprü: tek tahta (40,5).
- İskele: (40..44, 24).
- Yatay yol: satır 14-15 '=', kaldırım 13 ve 16 (x0..37). Dikey yol: x20-21, kaldırım x19 ve x22. Kesişimde kaldırımı yola çevir.
- Sınır: x0-1 ağaç, satır 0 ve 31 ağaç; (0..1, 13..16) patika (orman kapısı burası).
- Binalar: (3,6,7,6 kapı dx3, çatı R) Yılmazlar; (11,4,7,8 kapı dx3, Q) okul; (24,2,3,10 kapı dx1, U) saat kulesi, 'K' (25,4); (29,6,7,6 kapı dx2, V) fırın; (3,18,7,6 kapı dx3, R) Aras'ın evi; (11,18,6,5 kapı dx2, U) radyolu ev; (24,18,8,6 kapı dx4, Q) karakol; (33,19,4,5 kapı dx1, V) bot olan ev.
- Lambalar kaldırımlarda, 3 araba yolda, telefon kulübesi (23,12). Sol altta gizli cep: (2..12, 26) ağaç sırası, (10,26)'da boşluk, (13,26..30) ağaç; içinde gizli not.
- Orman kapısı: exit (0,13) w1 h4 → forest (20,37) yukarı; anahtar yoksa kilitli + demir parmaklık sprite'ı.

### Bölüm II — Orman (40×40, her yer 'T'), giriş (20,37)
- Ana patika: (20,39)→(20,31)→(9,26)→(9,17)→(20,11)→(20,3). Dallar: (9,26)→(4,33) açıklık r3; (9,17)→(5,8) açıklık r3; (20,11)→(31,13)→(33,24) açıklık (33,25) r3; (20,31)→(31,35) gizli açıklık (32,35) r2; kuzey açıklık (20,3) r3, kapak 'H' (20,2).
- Çıkış (19..21, 39) → town (2,14).
- Eşyalar: şapka (4,34), gözlük (4,7), müzik kutusu (34,26 — alınınca ninni çalar).
- Gölge: ilk eşya alınınca oyuncudan en uzak spawn noktasında belirir, ağaçların içinden süzülür (yakınsa 38 px/s, uzaksa 18 px/s; oyuncu 64). Yakalarsa: karartma + mesaj, son checkpoint'e (alınan son eşyanın yeri / giriş) dönüş, eşyalar kaybolmaz. 3 eşya bitince Gölge dağılır.
- 3 eşya bitince kapak yanında (22,4) Mira belirir; kapak kullanılınca (henüz konuşulmadıysa önce Mira diyaloğu) → lab (5,18).

### Bölüm III — Laboratuvar (36×24, her yer '#'), giriş (5,18)
- Odalar ('.'): A (2,16,8,6); koridor (10,18,24,2); B (4,3,8,8) + bağlantı (7,11,2,5); C (14,3,8,8) + (17,11,2,7); D (25,3,8,8) + (28,11,2,7); E (29,13,6,9).
- Jeneratörler 'X': (8,6), (18,6), (29,6) — üzerlerinde kırmızı/yeşil gösterge; açılınca oda ışığı. Masalar 'k' (15,4), (20,4); terminal 'k' (32,13); asansör 'E' (34,17); tüpler 'Y'; merdiven 'S' (5,16).
- Lab duvarları: altı yürünürse ön yüz (panel), değilse koyu üst.
- Terminal: 3 jeneratör yoksa "güç yok"; varsa şifre sorar, 0317 (veya 317, "03:17") doğru. Asansör exit kilidi açılır → lighthouse (8,29).

### Bölüm IV — Fener (16×34, her yer '#'), giriş (8,29)
- Bodrum (3,27,10,5), asansör 'E' (8,31); merdiven 'S' (11,18,2,9); sahanlık (3,16,10,2); merdiven 'S' (3,8,2,8); geçit (3,8,6,2); tepe odası disc (8,5) r4, lamba 'O' (8,4) — lambadan dönen huzme. Karanlık pencereler 'N'.
- Mira (8,7) → final diyaloğu → 3 seçim → son ekranı.

## Hedef metni (sol üst)
- Kasaba: anahtar yoksa "Kasabayı keşfet. Herkes nereye gitti?", varsa "Batıdaki orman kapısına git."
- Orman: "Kayıpların eşyalarını bul (n/3)" → "Kuzeydeki kapağı aç."
- Lab: "Jeneratörleri çalıştır (n/3)" → "Terminale erişim kodunu gir." → "Doğudaki asansöre bin."
- Fener: "Fenerin tepesine çık."
Sağ üst: kırmızı "03:17" (hiç değişmez) ve "Notlar n/12 · [J] Günlük". İlk ~20 sn altta kontrol ipucu.

## Bölüm kartları ve girişler (haritaya ilk girişte: kart ~3 sn, sonra diyalog)
- I "Terk Edilmiş Kasaba": "16 Mart 1998. Gece." / "Aras: ...Yine o rüya." / "Aras: Saat 03:17'de durmuş. Elektrikler mi kesildi?" / "Aras: Anne? Baba? ...Kimse yok." / "Dışarıda yağmur yağıyor. Uzakta, yıllardır kapalı olan deniz feneri yanıyor." (+ döngü>0 ise "Aras: Bu geceyi... daha önce yaşamış gibiyim.")
- II "Unutulmuş Orman": "Ağaçların arasında sis var. Fenerin ışığı bile buraya ulaşmıyor." / "Aras: Ormanda kaybolanlar oldu derlerdi. Belki izleri hâlâ buradadır."
- III "Yeraltındaki Gerçek": "Her yer karanlık. Duvardaki levha: PROJE FENER — YETKİSİZ GİRİŞ YASAKTIR." / "Aras: Babamın tesisi kasabanın altındaymış..." / "Aras: Önce elektriği geri getirmeliyim."
- IV "Son Işık": "Asansör sarsılarak durdu. Fenerin altındasın." / "Aras: Yukarıdan bir melodi geliyor... Müzik kutusunun melodisi."

## Notlar (12) — başlık · tarih · metin · konum · okuduktan sonra tepki

1. n1 "Buruşuk bir not" · 17 Mart 1998 · "Aras,\n\nUyandığında herkes gitmiş olacak. Korkma.\nSaatler 03:17'de duracak. Telefonlar çalışmayacak.\n\nFenere git. Bu sefer geç kalma.\n\n— A." · yerde (8,25) · "Aras: Bu... benim el yazım. Ama ben bunu yazmadım." / "Aras: Yazmadım, değil mi?" · Döngü>0 ise sonuna "(Kâğıdın köşesinde silik bir rakam: N)".
2. n2 "Çocuk resmi" · Okul panosu · "Mum boyalarla çizilmiş bir resim: bir deniz feneri, önünde el ele iki çocuk. Büyük olanın üstünde sarı bir yağmurluk var.\n\nAltında, eğri büğrü harflerle:\n\"BEN VE ABİM. ABİM BENİ HER ZAMAN BULUR.\"\n\n— Mira, 2-B" · okul kapısı (14,11) önce "Okulun kapısı açık. Koridordaki panoda çocuk resimleri asılı." / "Biri diğerlerinden ayrı, kapının hemen yanına iğnelenmiş." · tepki "Aras: Mira... Bu ismi neden bu kadar tanıdık buluyorum?"
3. n3 "Polis tutanağı" · 17 Mart 1998, 03:40 · "OLAY: Fener Projesi yeraltı tesisinde enerji dalgalanması.\nSAAT: 03:17\nDURUM: Kasaba sakinlerine ulaşılamıyor. Bütün saatler aynı anda durmuş.\n\nNOT: Kuzey orman yolu kapısının anahtarı masada bırakılmıştır. Fenere ulaşmanın tek yolu artık orası.\n\n— Komiser R. Demir" · karakol kapısı (28,23) önce "Karakolun kapısı ardına kadar açık. Masada ıslak bir tutanak duruyor." · sonra anahtar verilir (flag gateKey, ses) + "Aras: Tutanakta yarının tarihi var..." / "Masada paslı bir anahtar duruyor. Etiketi: KUZEY ORMAN YOLU." / "(Orman kapısının anahtarını aldın.)". Tekrar: "Karakol boş. Telsizden sadece cızırtı geliyor."
4. n4 "Günlük sayfası" · 15 Mart 1998 · "Babam yine gece tesisten dönmedi.\nMira pencereden fenerin ışığını sayıyor; \"her dönüşte bir dilek\" diyor.\n\nOna söz verdim: Bir gün fenerin tepesine birlikte çıkacağız.\n\nGaliba bu sözü daha önce de vermiştim." · gizli cep (3,29) · "Aras: Benim günlüğüm. Ama bu sayfayı hiç hatırlamıyorum."
5. n5 "Yırtık defter sayfası" · 2 Mart 1998 · "Orman sınırında zaman alanı bükülüyor. Ölçümler tutarsız.\n\nGece ağaçların arasında bir şey görüyoruz. Işığa yaklaşınca kayboluyor. Ekip onlara \"gölge\" diyor.\n\nBence onlar kaybolan anlar. Kimseye ait olmayan dakikalar.\n\n— Dr. Kemal Yalın" · orman patikası (9,21) · "Aras: Babamın imzası. Kemal Yalın."
6. n6 "Veli bilgilendirme mektubu" · 10 Mart 1998 · "Sayın veliler,\n17 Mart Salı günü 2-B sınıfı ile deniz fenerine gezi düzenlenecektir.\n\nMira Yalın'ın izin kâğıdı imzalanmamıştır. Kendisi, \"Abim beni götürecek\" demektedir.\n\n— Selma Öğretmen" · (6,10)
7. n7 "Gönderilmemiş mektup" · 16 Mart 1998 · "Hanım,\nBu gece denize açılmayacağım. Fener yanıyor ama ortada gemi yok. Tuhaf. Yıllardır kapalıydı o fener.\n\nSabah erkenden dönerim, çayı demle.\n\n— Hasan\n\n(Mektup hiç gönderilmemiş.)" · gizli açıklık (33,35)
8. n8 "PROJE FENER — Özet" · Gizli · "AMAÇ: Deniz fenerini anten olarak kullanarak geçmişe zamansal sinyal göndermek.\n\nRİSK: Reaktör aşırı yüklenirse kasaba ölçeğinde zaman kırılması.\n\nDURUM: ONAYLANDI.\nTEST TARİHİ: 17 Mart 1998, 03:15." · lab (6,4)
9. n9 "Ses kaydı dökümü" · 16 Mart 1998, 22:40 · "Bu gece testi durdurmak istediler. Dinlemedim.\n\nBir sonuç görmek istiyordum. Mira'ya bir gün anlatabileceğim bir şey.\n\nAras telefonda \"Baba, eve gel\" dedi.\nYarın, dedim. Hep yarın.\n\n— K.Y." · lab (16,5)
10. n10 "Son kayıt" · 17 Mart 1998, 03:16 · "Reaktör kontrolden çıktı. Durduramıyoruz.\n\nFener hâlâ yayında. Bir bilinci sinyale bağlayabilirsem döngünün içinde biri kalır. Biri geri dönüp hatırlayabilir.\n\nAras'ı seçiyorum. Çünkü o fenerin yolunu bilir.\n\nAffet beni, oğlum." · lab (31,9) · "Aras: ...Baba."
11. n11 "Fener bekçisinin defteri" · 16 Mart 1998 · "Fener yıllardır kapalıydı. Bu gece kendi kendine yandı.\n\nMerdivende küçük ayak izleri var. Islak.\n\nKim yakıyor bu ışığı?" · fener (4,28)
12. n12 "Mira'nın mektubu" · Tarih yok · "Abi,\n\nSen gelene kadar ışığı yakacağım. Kaç kere gerekirse.\n\nHer seferinde biraz daha az hatırlıyorsun ama hep geliyorsun.\n\nYukarıda bekliyorum.\n\n— Mira" · fener (4,12) · "Aras: Mira..." / "Yukarıdan, müzik kutusunun melodisi geliyor."

Not ekranı: kâğıt dokulu kart (tarih, başlık, gövde). Günlük (J): 12 slot, bulunmayanlar "? ? ?", seç & tekrar oku.

## Diğer etkileşimler

Kasaba:
- Aras'ın kapısı (6,23): "Evin kapısı aralık. İçeride saatlerin tık sesi bile yok." / "Aras: Anne? Baba? ...Kimse cevap vermiyor."
- Yılmazlar (6,11): "Yılmazların evi. Kapı ardına kadar açık." / "Masada yarım kalmış bir akşam yemeği. Çatallar tabağın kenarında, sanki herkes aynı anda kalkıp gitmiş."
- Saat kulesi (25,11): "Saat kulesinin kapısı kilitli." / "Yukarıdaki kadran 03:17'yi gösteriyor. Akrep de yelkovan da kıpırdamıyor."
- Fırın (31,11): "Fırının camında bir takvim asılı: 16 Mart 1998, Pazartesi." / "Aras: Bugün. En azından... bugün olması gereken gün."
- Radyolu ev (13,22): "Kapı kilitli. İçeriden radyo cızırtısı geliyor:" / "Radyo: ...tekrar ediyorum, saat üçü on yedi geçe... fenerden uzak durun... tekrar ediyorum..."
- Bot olan ev (34,23): "Kapının önünde ıslak, küçük bir çocuk botu. Tek bir tane." / "Aras: Kırmızı bot... Bunu daha önce görmüştüm."
- Telefon (23,12): "Telefon kulübesi. Ahizeyi kaldırdın." / "Hat yok. Sadece hışırtı... ve bir an, uzaktan bir kızın ninni mırıldandığını duyar gibisin."
- Köprü (40,5): "Köprü çökmüş. Tahtaların yarısı dalgalara karışmış." / "Aras: Fenere buradan geçilmez." / "Aras: Ormanın içinden eski bir yol vardı. Babam oraya gitmemi hiç istemezdi."
- Kilitli orman kapısı: "Orman yoluna açılan demir kapı kilitli." / "Aras: Bir anahtar lazım. Kasabada bir yerde olmalı..."
- Mira iskelede (44,24), konuşunca kaybolur (vanish sesi): "???: Yine mi geldin?" / "Aras: Kimsin sen? Herkes nerede?" / "???: Herkes burada. Sadece sen onları göremiyorsun." / "???: Fener yanarken acele et. Bu sefer geç kalma." / "Kız bir an titreşti, sonra yağmurun içinde kayboldu." / "Aras: ...Bu sefer mi?"

Orman:
- Şapka: "Islak bir balıkçı şapkası. İçine işlenmiş isim: HASAN." / "Aras: Hasan Usta... Her sabah iskelede olurdu."
- Gözlük: "Kırık bir gözlük. Sapında küçük bir etiket: Selma Öğretmen, 2-B."
- Müzik kutusu: "Küçük bir müzik kutusu. Kapağını açınca bir melodi çalmaya başladı." / "Aras: Bu ninniyi biliyorum. Biri bana bunu mırıldanırdı..." / "Aras: Yoksa ben mi ona mırıldanırdım?"
- Her eşyadan sonra "(n/3 eşya bulundu)". İlk eşyadan sonra: "Arkanda bir dal çıtırdadı." / "Aras: ...Biri mi var orada?" (Gölge başlar). Üçüncüden sonra: "Gölge bir an durdu. Sonra sisin içinde dağılıp gitti." / "Aras: Kuzeyde... ağaçların arasında bir şey parlıyor."
- Gölge yakalayınca: "Omzuna buz gibi bir şey dokundu. Her şey karardı..."
- Kapak, eşyalar eksikken: "Toprağa gömülü paslı bir kapak. Üç kilitle kapatılmış." / "Kilitlerin üzerinde semboller var: bir şapka, bir gözlük, bir nota." / "Aras: Ormanda kaybolanların eşyaları..." · tamamken: "Kapağı kaldırdın. Aşağıya uzanan demir bir merdiven var." / "Aras: Babamın tesisi..."
- Mira (orman): "Mira: Onları buldun. Hasan Usta'nın şapkası, Selma Öğretmen'in gözlüğü... ve benim müzik kutum." / "Aras: Senin mi? Sen kimsin?" / "Mira: Hatırlayacaksın abi. Her seferinde hatırlıyorsun, sonunda." / "Aras: Abi mi...?" / "Mira: Aşağıda babamın sırları var. Kapının şifresini zaten biliyorsun." / "Mira: Bu kasabada saat hiç değişmiyor." / "Kız gülümsedi ve sisin içinde kayboldu. Kapağın kilidi kendiliğinden açıldı."

Lab:
- Merdiven (5,16): "Merdiven yukarıya, ormana çıkıyor." / "Aras: Geri dönmenin anlamı yok. Cevaplar burada."
- Jeneratör: "Kolu indirdin. Jeneratör homurdanarak çalıştı; odanın ışıkları titreyerek yandı. (n/3)" — 3'te ek: "Uzakta bir bilgisayarın açılış sesi duyuluyor. Doğudaki odadan yeşil bir ışık sızıyor." Tekrar: "Jeneratör düzenli bir uğultuyla çalışıyor."
- Masa (15,4): "Dağınık kâğıtlar, soğumuş bir kahve fincanı." / "Ekrandaki son satır: TEST BAŞLATILDI — 03:15"
- Masa (20,4): "Masada çatlak camlı bir fotoğraf çerçevesi: bir adam, sarı yağmurluklu bir oğlan ve küçük bir kız." / "Aras: Bu... biziz."
- Terminal: güç yoksa "Terminalin ekranı kapkara. Güç yok." · "Terminal: PROJE FENER — ASANSÖR KONTROL SİSTEMİ" / "Terminal: Dört haneli erişim kodunu girin." → giriş kutusu "ERİŞİM KODU" (yeşil terminal stili). Doğru: "Terminal: KOD ONAYLANDI." / "Terminal: Asansör fener hattına bağlanıyor..." / "Aras: 03:17. Her şey o saatte durdu. Babam şifreyi bile ona ayarlamış." Yanlış: "Terminal: HATALI KOD." / "Aras: Dört hane... Bu kasabada hiç değişmeyen bir şey olmalı." Açıldıktan sonra: "Terminal: ASANSÖR HAZIR. HEDEF: DENİZ FENERİ."
- Kilitli asansör: "Asansörün kapısı kapalı. Paneldeki kırmızı ışık yanıp sönüyor: KİLİTLİ."

Fener:
- Asansör (8,31): "Asansörün kapısı arkandan kapandı. Panel karardı."
- Lamba (8,4): "Fenerin lambası. Işığı sıcak değil; soğuk ve mavi." / "Camın üzerinde küçük parmak izleri var."
- Final (Mira 8,7): "Mira: Geldin." / "Aras: Mira. Sen... benim kardeşimsin. Bunu nasıl unutabildim?" / "Mira: Her seferinde unutuyorsun abi. Ve her seferinde yine buraya geliyorsun." / "Mira: 17 Mart, saat 03:17. Tesis patladı. Kasabadaki herkes... ben de." / "Aras: Peki ya ben?" / "Mira: Sen de. Ama babam son anda senin bilincini fenerin sinyaline bağladı. Zamanın içinde yanıp sönen bir ışık gibi." / "Mira: Notları kimin yazdığını hiç merak ettin mi?" / "Aras: ...El yazısı benimki." / "Mira: Her döngüde, bir sonraki sana yazıyorsun. Kaybolmaman için." / "Mira: Fener birazdan sönecek. Karar vermelisin."
- Seçim "Fener sönmek üzere. Ne yapacaksın?":
  - "Geçmişi değiştir" → "Aras: Geçmişi değiştireceğim. Herkes yaşayacak." / "Mira: Sen olmadan ama." / "Aras: Biliyorum." → son \`change\`
  - "Gerçeği kabul et" → "Aras: Artık bırakmamız gerek, değil mi?" / "Mira: Evet abi. Birlikte." → son \`accept\`
  - "Döngüyü sürdür" → "Aras: Bir kez daha deneyeceğim." / "Mira: ...Ben burada olacağım. Hep olduğu gibi." → son \`loop\`

## Sonlar (siyah ekran, paragraflar sırayla belirir, sonra "Bulunan notlar: n/12" ve "Ana Menü")
- change "Geçmişi Değiştir": "Aras fenerin ışığına dokunduğunda zaman geriye sarıldı. 16 Mart 1998, 23:58. Tesisin kontrol odasında babasının gözlerinin içine baktı ve tek bir kelime söyledi: \"Durdur.\"" / "Sabah oldu. Fırının kokusu, okulun zili, iskelede Hasan Usta'nın sesi... Kasaba uyandı." / "Mira, kimsenin hatırlamadığı boş bir odanın kapısında durdu. Pencerenin önünde, fenere bakan sarı bir yağmurluk asılıydı." / "Herkes kurtuldu. Aras hiç var olmadı."
- accept "Gerçeği Kabul Et": "Aras, Mira'nın elini tuttu. Fenerin ışığı yavaşça söndü. Yağmur dindi." / "Kasabanın bütün saatleri, yıllardır ilk kez, aynı anda ilerledi: 03:18." / "Güneş doğarken iki gölge iskelenin ucunda denize bakıyordu. Sonra ikisi de ışığa karıştı." / "Döngü bitti. Bazı şeyler kurtarılamaz; ama vedalaşılabilir."
- loop "Döngüyü Sürdür": "\"Bir kez daha,\" dedi Aras. \"Bu sefer başaracağım.\"" / "Mira gülümsedi. Üzgün, alışkın bir gülümsemeydi." / "16 Mart 1998. Gece. Aras odasında uyandı. Elinde bir kalem vardı. Bir kâğıda yazmaya başladı: \"Aras, uyandığında herkes gitmiş olacak. Korkma...\"" / "Döngü #N başlıyor." (döngü sayacı artar)
- 12/12 not bulunduysa ek (mavi): "Bütün notları buldun. Son notun arkasında, Mira'nın el yazısıyla: \"Hangi seçimi yaparsan yap abi, ben seni hep bulacağım.\""
- Son ekranında kayıt silinir.

## Ses (audio.js — \`SL.audio\`)
\`init()\` (ilk tuş/klikte), \`setTheme(title|town|forest|lab|lighthouse)\`, \`sfx(pickup|key|unlock|error|gen|catch|thunder|vanish)\`, \`melody()\` (müzik kutusu ninnisi, prosedürel müziği birkaç saniye susturur), \`toggleMute()\`, \`isMuted()\` (localStorage'da saklanır). İçerik: rastgele seyrek piyano notaları (tema başına minör/modal dizi, delay/yankı), filtrelenmiş beyaz gürültüyle yağmur, orman/lab için alçak drone. Dosya yüklenmeden de oyun çalışmalı (AudioContext yoksa sessiz no-op).

## Kabul kriterleri
- \`son-isik/index.html\` file:// ve http üzerinden konsol hatasız açılır.
- Baştan sona oynanabilir; 3 sonun hepsine ulaşılabilir; tüm entity'ler yürünebilir alandan erişilebilir (BFS doğrulaması).
- Devam Et kaydı çalışır. Dokunmatik kontroller mobilde görünür.
