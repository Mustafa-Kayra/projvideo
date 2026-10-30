(function () {
  'use strict';
  const SL = window.SL = window.SL || {};
  const notes = [
    { id: 'n1', title: 'Buruşuk bir not', date: '17 Mart 1998', text: 'Aras,\n\nUyandığında herkes gitmiş olacak. Korkma.\nSaatler 03:17\'de duracak. Telefonlar çalışmayacak.\n\nFenere git. Bu sefer geç kalma.\n\n— A.', reaction: ['Aras: Bu... benim el yazım. Ama ben bunu yazmadım.', 'Aras: Yazmadım, değil mi?'] },
    { id: 'n2', title: 'Çocuk resmi', date: 'Okul panosu', text: 'Mum boyalarla çizilmiş bir resim: bir deniz feneri, önünde el ele iki çocuk. Büyük olanın üstünde sarı bir yağmurluk var.\n\nAltında, eğri büğrü harflerle:\n"BEN VE ABİM. ABİM BENİ HER ZAMAN BULUR."\n\n— Mira, 2-B', reaction: ['Aras: Mira... Bu ismi neden bu kadar tanıdık buluyorum?'] },
    { id: 'n3', title: 'Polis tutanağı', date: '17 Mart 1998, 03:40', text: 'OLAY: Fener Projesi yeraltı tesisinde enerji dalgalanması.\nSAAT: 03:17\nDURUM: Kasaba sakinlerine ulaşılamıyor. Bütün saatler aynı anda durmuş.\n\nNOT: Kuzey orman yolu kapısının anahtarı masada bırakılmıştır. Fenere ulaşmanın tek yolu artık orası.\n\n— Komiser R. Demir' },
    { id: 'n4', title: 'Günlük sayfası', date: '15 Mart 1998', text: 'Babam yine gece tesisten dönmedi.\nMira pencereden fenerin ışığını sayıyor; "her dönüşte bir dilek" diyor.\n\nOna söz verdim: Bir gün fenerin tepesine birlikte çıkacağız.\n\nGaliba bu sözü daha önce de vermiştim.', reaction: ['Aras: Benim günlüğüm. Ama bu sayfayı hiç hatırlamıyorum.'] },
    { id: 'n5', title: 'Yırtık defter sayfası', date: '2 Mart 1998', text: 'Orman sınırında zaman alanı bükülüyor. Ölçümler tutarsız.\n\nGece ağaçların arasında bir şey görüyoruz. Işığa yaklaşınca kayboluyor. Ekip onlara "gölge" diyor.\n\nBence onlar kaybolan anlar. Kimseye ait olmayan dakikalar.\n\n— Dr. Kemal Yalın', reaction: ['Aras: Babamın imzası. Kemal Yalın.'] },
    { id: 'n6', title: 'Veli bilgilendirme mektubu', date: '10 Mart 1998', text: 'Sayın veliler,\n17 Mart Salı günü 2-B sınıfı ile deniz fenerine gezi düzenlenecektir.\n\nMira Yalın\'ın izin kâğıdı imzalanmamıştır. Kendisi, "Abim beni götürecek" demektedir.\n\n— Selma Öğretmen' },
    { id: 'n7', title: 'Gönderilmemiş mektup', date: '16 Mart 1998', text: 'Hanım,\nBu gece denize açılmayacağım. Fener yanıyor ama ortada gemi yok. Tuhaf. Yıllardır kapalıydı o fener.\n\nSabah erkenden dönerim, çayı demle.\n\n— Hasan\n\n(Mektup hiç gönderilmemiş.)' },
    { id: 'n8', title: 'PROJE FENER — Özet', date: 'Gizli', text: 'AMAÇ: Deniz fenerini anten olarak kullanarak geçmişe zamansal sinyal göndermek.\n\nRİSK: Reaktör aşırı yüklenirse kasaba ölçeğinde zaman kırılması.\n\nDURUM: ONAYLANDI.\nTEST TARİHİ: 17 Mart 1998, 03:15.' },
    { id: 'n9', title: 'Ses kaydı dökümü', date: '16 Mart 1998, 22:40', text: 'Bu gece testi durdurmak istediler. Dinlemedim.\n\nBir sonuç görmek istiyordum. Mira\'ya bir gün anlatabileceğim bir şey.\n\nAras telefonda "Baba, eve gel" dedi.\nYarın, dedim. Hep yarın.\n\n— K.Y.' },
    { id: 'n10', title: 'Son kayıt', date: '17 Mart 1998, 03:16', text: 'Reaktör kontrolden çıktı. Durduramıyoruz.\n\nFener hâlâ yayında. Bir bilinci sinyale bağlayabilirsem döngünün içinde biri kalır. Biri geri dönüp hatırlayabilir.\n\nAras\'ı seçiyorum. Çünkü o fenerin yolunu bilir.\n\nAffet beni, oğlum.', reaction: ['Aras: ...Baba.'] },
    { id: 'n11', title: 'Fener bekçisinin defteri', date: '16 Mart 1998', text: 'Fener yıllardır kapalıydı. Bu gece kendi kendine yandı.\n\nMerdivende küçük ayak izleri var. Islak.\n\nKim yakıyor bu ışığı?' },
    { id: 'n12', title: 'Mira\'nın mektubu', date: 'Tarih yok', text: 'Abi,\n\nSen gelene kadar ışığı yakacağım. Kaç kere gerekirse.\n\nHer seferinde biraz daha az hatırlıyorsun ama hep geliyorsun.\n\nYukarıda bekliyorum.\n\n— Mira', reaction: ['Aras: Mira...', 'Yukarıdan, müzik kutusunun melodisi geliyor.'] }
  ];
  const chapters = {
    town: { number: 'I', title: 'Terk Edilmiş Kasaba', lines: ['16 Mart 1998. Gece.', 'Aras: ...Yine o rüya.', 'Aras: Saat 03:17\'de durmuş. Elektrikler mi kesildi?', 'Aras: Anne? Baba? ...Kimse yok.', 'Dışarıda yağmur yağıyor. Uzakta, yıllardır kapalı olan deniz feneri yanıyor.'] },
    forest: { number: 'II', title: 'Unutulmuş Orman', lines: ['Ağaçların arasında sis var. Fenerin ışığı bile buraya ulaşmıyor.', 'Aras: Ormanda kaybolanlar oldu derlerdi. Belki izleri hâlâ buradadır.'] },
    lab: { number: 'III', title: 'Yeraltındaki Gerçek', lines: ['Her yer karanlık. Duvardaki levha: PROJE FENER — YETKİSİZ GİRİŞ YASAKTIR.', 'Aras: Babamın tesisi kasabanın altındaymış...', 'Aras: Önce elektriği geri getirmeliyim.'] },
    lighthouse: { number: 'IV', title: 'Son Işık', lines: ['Asansör sarsılarak durdu. Fenerin altındasın.', 'Aras: Yukarıdan bir melodi geliyor... Müzik kutusunun melodisi.'] }
  };
  const endings = {
    change: { title: 'Geçmişi Değiştir', lines: ['Aras fenerin ışığına dokunduğunda zaman geriye sarıldı. 16 Mart 1998, 23:58. Tesisin kontrol odasında babasının gözlerinin içine baktı ve tek bir kelime söyledi: "Durdur."', 'Sabah oldu. Fırının kokusu, okulun zili, iskelede Hasan Usta\'nın sesi... Kasaba uyandı.', 'Mira, kimsenin hatırlamadığı boş bir odanın kapısında durdu. Pencerenin önünde, fenere bakan sarı bir yağmurluk asılıydı.', 'Herkes kurtuldu. Aras hiç var olmadı.'] },
    accept: { title: 'Gerçeği Kabul Et', lines: ['Aras, Mira\'nın elini tuttu. Fenerin ışığı yavaşça söndü. Yağmur dindi.', 'Kasabanın bütün saatleri, yıllardır ilk kez, aynı anda ilerledi: 03:18.', 'Güneş doğarken iki gölge iskelenin ucunda denize bakıyordu. Sonra ikisi de ışığa karıştı.', 'Döngü bitti. Bazı şeyler kurtarılamaz; ama vedalaşılabilir.'] },
    loop: { title: 'Döngüyü Sürdür', lines: ['"Bir kez daha," dedi Aras. "Bu sefer başaracağım."', 'Mira gülümsedi. Üzgün, alışkın bir gülümsemeydi.', '16 Mart 1998. Gece. Aras odasında uyandı. Elinde bir kalem vardı. Bir kâğıda yazmaya başladı: "Aras, uyandığında herkes gitmiş olacak. Korkma..."', 'Döngü #N başlıyor.'] }
  };
  const gateLocked = ['Orman yoluna açılan demir kapı kilitli.', 'Aras: Bir anahtar lazım. Kasabada bir yerde olmalı...'];
  const miraForest = ['Mira: Onları buldun. Hasan Usta\'nın şapkası, Selma Öğretmen\'in gözlüğü... ve benim müzik kutum.', 'Aras: Senin mi? Sen kimsin?', 'Mira: Hatırlayacaksın abi. Her seferinde hatırlıyorsun, sonunda.', 'Aras: Abi mi...?', 'Mira: Aşağıda babamın sırları var. Kapının şifresini zaten biliyorsun.', 'Mira: Bu kasabada saat hiç değişmiyor.', 'Kız gülümsedi ve sisin içinde kayboldu. Kapağın kilidi kendiliğinden açıldı.'];
  function count(G, keys) { return keys.filter(function (f) { return G.has(f); }).length; }
  function itemCount(G) { return count(G, ['hat', 'glasses', 'music']); }
  function genCount(G) { return count(G, ['gen1', 'gen2', 'gen3']); }
  function entities(G) {
    function say(id, x, y, lines) { return { id: id, x: x, y: y, label: 'İncele', use: function () { G.say(lines); } }; }
    function paper(id, x, y) {
      return { id: id, x: x, y: y, sprite: 'note', label: 'Oku', use: function () {
        const first = !G.notes.includes(id), n = notes.find(function (n) { return n.id === id; });
        G.note(id, function () { if (first && n.reaction) G.say(n.reaction); });
      } };
    }
    function forestMira(done) {
      if (G.has('miraForest')) { if (done) done(); return; }
      G.say(miraForest, function () { G.set('miraForest'); G.sfx('vanish'); if (done) done(); });
    }
    const town = [
      paper('n1', 8, 25), paper('n4', 3, 29),
      say('home', 6, 23, ['Evin kapısı aralık. İçeride saatlerin tık sesi bile yok.', 'Aras: Anne? Baba? ...Kimse cevap vermiyor.']),
      say('yilmaz', 6, 11, ['Yılmazların evi. Kapı ardına kadar açık.', 'Masada yarım kalmış bir akşam yemeği. Çatallar tabağın kenarında, sanki herkes aynı anda kalkıp gitmiş.']),
      { id: 'school', x: 14, y: 11, label: 'İncele', use: function () {
        if (G.notes.includes('n2')) { G.note('n2'); return; }
        G.say(['Okulun kapısı açık. Koridordaki panoda çocuk resimleri asılı.', 'Biri diğerlerinden ayrı, kapının hemen yanına iğnelenmiş.'], function () { G.note('n2', function () { G.say(notes[1].reaction); }); });
      } },
      say('clock', 25, 11, ['Saat kulesinin kapısı kilitli.', 'Yukarıdaki kadran 03:17\'yi gösteriyor. Akrep de yelkovan da kıpırdamıyor.']),
      say('bakery', 31, 11, ['Fırının camında bir takvim asılı: 16 Mart 1998, Pazartesi.', 'Aras: Bugün. En azından... bugün olması gereken gün.']),
      say('radio', 13, 22, ['Kapı kilitli. İçeriden radyo cızırtısı geliyor:', 'Radyo: ...tekrar ediyorum, saat üçü on yedi geçe... fenerden uzak durun... tekrar ediyorum...']),
      say('boot', 34, 23, ['Kapının önünde ıslak, küçük bir çocuk botu. Tek bir tane.', 'Aras: Kırmızı bot... Bunu daha önce görmüştüm.']),
      Object.assign(say('phone', 23, 12, ['Telefon kulübesi. Ahizeyi kaldırdın.', 'Hat yok. Sadece hışırtı... ve bir an, uzaktan bir kızın ninni mırıldandığını duyar gibisin.']), { light: { r: 27, a: 0.7, col: '#9bd8c4', flick: true } }),
      say('bridge', 40, 5, ['Köprü çökmüş. Tahtaların yarısı dalgalara karışmış.', 'Aras: Fenere buradan geçilmez.', 'Aras: Ormanın içinden eski bir yol vardı. Babam oraya gitmemi hiç istemezdi.']),
      { id: 'police', x: 28, y: 23, label: 'İncele', use: function () {
        if (G.has('gateKey')) { G.say(['Karakol boş. Telsizden sadece cızırtı geliyor.']); return; }
        G.say(['Karakolun kapısı ardına kadar açık. Masada ıslak bir tutanak duruyor.'], function () {
          G.note('n3', function () { G.set('gateKey'); G.sfx('key'); G.say(['Aras: Tutanakta yarının tarihi var...', 'Masada paslı bir anahtar duruyor. Etiketi: KUZEY ORMAN YOLU.', '(Orman kapısının anahtarını aldın.)']); });
        });
      } },
      { id: 'dockMira', x: 44, y: 24, sprite: 'mira', label: 'Konuş', show: function () { return !G.has('miraDock'); }, light: { r: 26, a: 0.75, col: '#acdbea' }, use: function () {
        G.say(['???: Yine mi geldin?', 'Aras: Kimsin sen? Herkes nerede?', '???: Herkes burada. Sadece sen onları göremiyorsun.', '???: Fener yanarken acele et. Bu sefer geç kalma.', 'Kız bir an titreşti, sonra yağmurun içinde kayboldu.', 'Aras: ...Bu sefer mi?'], function () { G.set('miraDock'); G.sfx('vanish'); });
      } },
      { id: 'forestGate', x: 0, y: 13, w: 1, h: 4, sprite: 'gate', exit: { to: 'forest', x: 20, y: 37, dir: 'up' }, req: function () { return G.has('gateKey'); }, locked: gateLocked }
    ];
    const forest = [paper('n5', 9, 21), paper('n6', 6, 10), paper('n7', 33, 35)];
    [
      ['hat', 4, 34, ['Islak bir balıkçı şapkası. İçine işlenmiş isim: HASAN.', 'Aras: Hasan Usta... Her sabah iskelede olurdu.']],
      ['glasses', 4, 7, ['Kırık bir gözlük. Sapında küçük bir etiket: Selma Öğretmen, 2-B.']],
      ['music', 34, 26, ['Küçük bir müzik kutusu. Kapağını açınca bir melodi çalmaya başladı.', 'Aras: Bu ninniyi biliyorum. Biri bana bunu mırıldanırdı...', 'Aras: Yoksa ben mi ona mırıldanırdım?']]
    ].forEach(function (d) {
      forest.push({ id: d[0], x: d[1], y: d[2], sprite: d[0], label: 'Al', light: { r: 19, a: 0.35, col: '#c8ca9d' }, show: function () { return !G.has(d[0]); }, use: function () {
        G.set(d[0]); G.checkpoint = { x: d[1] * 16 + 8, y: d[2] * 16 + 8 }; G.save(); G.sfx('pickup'); if (d[0] === 'music') G.melody();
        const n = itemCount(G), lines = d[3].concat(['(' + n + '/3 eşya bulundu)']);
        if (n === 1) lines.push('Arkanda bir dal çıtırdadı.', 'Aras: ...Biri mi var orada?');
        if (n === 3) { G.sfx('vanish'); lines.push('Gölge bir an durdu. Sonra sisin içinde dağılıp gitti.', 'Aras: Kuzeyde... ağaçların arasında bir şey parlıyor.'); }
        G.say(lines);
      } });
    });
    forest.push(
      { id: 'townExit', x: 19, y: 39, w: 3, h: 1, exit: { to: 'town', x: 2, y: 14, dir: 'right' } },
      { id: 'forestMira', x: 22, y: 4, sprite: 'mira', label: 'Konuş', show: function () { return itemCount(G) === 3 && !G.has('miraForest'); }, light: { r: 38, a: 0.8, col: '#b9e9e8' }, use: function () { forestMira(); } },
      { id: 'hatch', x: 20, y: 2, label: 'İncele', use: function () {
        if (itemCount(G) < 3) { G.say(['Toprağa gömülü paslı bir kapak. Üç kilitle kapatılmış.', 'Kilitlerin üzerinde semboller var: bir şapka, bir gözlük, bir nota.', 'Aras: Ormanda kaybolanların eşyaları...']); return; }
        forestMira(function () { G.say(['Kapağı kaldırdın. Aşağıya uzanan demir bir merdiven var.', 'Aras: Babamın tesisi...'], function () { G.goto('lab', 5, 18, 'up'); }); });
      } }
    );
    const lab = [paper('n8', 6, 4), paper('n9', 16, 5), paper('n10', 31, 9),
      say('ladder', 5, 16, ['Merdiven yukarıya, ormana çıkıyor.', 'Aras: Geri dönmenin anlamı yok. Cevaplar burada.']),
      say('desk1', 15, 4, ['Dağınık kâğıtlar, soğumuş bir kahve fincanı.', 'Ekrandaki son satır: TEST BAŞLATILDI — 03:15']),
      say('desk2', 20, 4, ['Masada çatlak camlı bir fotoğraf çerçevesi: bir adam, sarı yağmurluklu bir oğlan ve küçük bir kız.', 'Aras: Bu... biziz.']),
      { id: 'terminal', x: 32, y: 13, label: 'İncele', light: { r: 31, a: 0.6, col: '#60d8a0', powered: true }, use: function () {
        if (genCount(G) < 3) { G.say(['Terminalin ekranı kapkara. Güç yok.']); return; }
        if (G.has('terminal')) { G.say(['Terminal: ASANSÖR HAZIR. HEDEF: DENİZ FENERİ.']); return; }
        G.say(['Terminal: PROJE FENER — ASANSÖR KONTROL SİSTEMİ', 'Terminal: Dört haneli erişim kodunu girin.'], function () {
          G.ask('ERİŞİM KODU', function (value) {
            if (value === null) return;
            if (/^(0317|317)$/.test(value.replace(/[:\s]/g, ''))) { G.set('terminal'); G.sfx('unlock'); G.say(['Terminal: KOD ONAYLANDI.', 'Terminal: Asansör fener hattına bağlanıyor...', 'Aras: 03:17. Her şey o saatte durdu. Babam şifreyi bile ona ayarlamış.']); }
            else { G.sfx('error'); G.say(['Terminal: HATALI KOD.', 'Aras: Dört hane... Bu kasabada hiç değişmeyen bir şey olmalı.']); }
          });
        });
      } },
      { id: 'elevator', x: 34, y: 17, exit: { to: 'lighthouse', x: 8, y: 29, dir: 'up' }, req: function () { return G.has('terminal'); }, locked: ['Asansörün kapısı kapalı. Paneldeki kırmızı ışık yanıp sönüyor: KİLİTLİ.'] }
    ];
    [[8, 6], [18, 6], [29, 6]].forEach(function (p, i) {
      lab.push({ id: 'gen' + (i + 1), x: p[0], y: p[1], label: 'İncele', use: function () {
        const flag = 'gen' + (i + 1); if (G.has(flag)) { G.say(['Jeneratör düzenli bir uğultuyla çalışıyor.']); return; }
        G.set(flag); G.sfx('gen'); G.flash('150,210,190', 0.2);
        const n = genCount(G), lines = ['Kolu indirdin. Jeneratör homurdanarak çalıştı; odanın ışıkları titreyerek yandı. (' + n + '/3)'];
        if (n === 3) lines.push('Uzakta bir bilgisayarın açılış sesi duyuluyor. Doğudaki odadan yeşil bir ışık sızıyor.'); G.say(lines);
      } });
    });
    const lighthouse = [paper('n11', 4, 28), paper('n12', 4, 12),
      say('elevatorBack', 8, 31, ['Asansörün kapısı arkandan kapandı. Panel karardı.']),
      say('lamp', 8, 4, ['Fenerin lambası. Işığı sıcak değil; soğuk ve mavi.', 'Camın üzerinde küçük parmak izleri var.']),
      { id: 'finalMira', x: 8, y: 7, sprite: 'mira', label: 'Konuş', light: { r: 42, a: 0.85, col: '#b9e9ec' }, use: function () {
        G.say(['Mira: Geldin.', 'Aras: Mira. Sen... benim kardeşimsin. Bunu nasıl unutabildim?', 'Mira: Her seferinde unutuyorsun abi. Ve her seferinde yine buraya geliyorsun.', 'Mira: 17 Mart, saat 03:17. Tesis patladı. Kasabadaki herkes... ben de.', 'Aras: Peki ya ben?', 'Mira: Sen de. Ama babam son anda senin bilincini fenerin sinyaline bağladı. Zamanın içinde yanıp sönen bir ışık gibi.', 'Mira: Notları kimin yazdığını hiç merak ettin mi?', 'Aras: ...El yazısı benimki.', 'Mira: Her döngüde, bir sonraki sana yazıyorsun. Kaybolmaman için.', 'Mira: Fener birazdan sönecek. Karar vermelisin.'], function () {
          G.choose('Fener sönmek üzere. Ne yapacaksın?', [
            { label: 'Geçmişi değiştir', fn: function () { G.say(['Aras: Geçmişi değiştireceğim. Herkes yaşayacak.', 'Mira: Sen olmadan ama.', 'Aras: Biliyorum.'], function () { G.ending('change'); }); } },
            { label: 'Gerçeği kabul et', fn: function () { G.say(['Aras: Artık bırakmamız gerek, değil mi?', 'Mira: Evet abi. Birlikte.'], function () { G.ending('accept'); }); } },
            { label: 'Döngüyü sürdür', fn: function () { G.say(['Aras: Bir kez daha deneyeceğim.', 'Mira: ...Ben burada olacağım. Hep olduğu gibi.'], function () { G.ending('loop'); }); } }
          ]);
        });
      } }
    ];
    return { town: town, forest: forest, lab: lab, lighthouse: lighthouse };
  }
  SL.story = {
    notes: notes, chapters: chapters, endings: endings, entities: entities, itemCount: itemCount, genCount: genCount,
    objective: function (G) {
      if (G.map.id === 'town') return G.has('gateKey') ? 'Batıdaki orman kapısına git.' : 'Kasabayı keşfet. Herkes nereye gitti?';
      if (G.map.id === 'forest') return itemCount(G) < 3 ? 'Kayıpların eşyalarını bul (' + itemCount(G) + '/3)' : 'Kuzeydeki kapağı aç.';
      if (G.map.id === 'lab') return genCount(G) < 3 ? 'Jeneratörleri çalıştır (' + genCount(G) + '/3)' : G.has('terminal') ? 'Doğudaki asansöre bin.' : 'Terminale erişim kodunu gir.';
      return 'Fenerin tepesine çık.';
    },
    enter: function (G) {
      const id = G.map.id, chapter = chapters[id]; if (G.has('intro_' + id)) return;
      G.set('intro_' + id); const lines = chapter.lines.slice();
      if (id === 'town' && G.loop > 0) lines.push('Aras: Bu geceyi... daha önce yaşamış gibiyim.');
      G.card('BÖLÜM ' + chapter.number, chapter.title, function () { G.say(lines); });
    }
  };
}());
