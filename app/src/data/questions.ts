export type CategoryId = "clubs" | "players" | "winners" | "turkish";
export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  question: string;
  options: [string, string, string, string];
  answerIndex: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: "clubs-01",
    category: "clubs",
    difficulty: "easy",
    question: "Real Madrid hangi İspanyol kentinde kuruldu?",
    options: ["Madrid", "Barselona", "Sevilla", "Valensiya"],
    answerIndex: 0,
    explanation:
      "1902 yılında Madrid Football Club adıyla kurulan kulüp, Real unvanını 1920 yılında aldı.",
  },
  {
    id: "clubs-02",
    category: "clubs",
    difficulty: "easy",
    question: "FC Barcelona hangi kentte kuruldu?",
    options: ["Madrid", "Barselona", "Bilbao", "Zaragoza"],
    answerIndex: 1,
    explanation:
      "Joan Gamper öncülüğündeki grup, kulübü 1899 yılında Barselona’da kurdu.",
  },
  {
    id: "clubs-03",
    category: "clubs",
    difficulty: "easy",
    question:
      "Liverpool, 1892 yılındaki kuruluşundan itibaren hangi tarihî stadı evi olarak kullandı?",
    options: ["Old Trafford", "Goodison Park", "Anfield", "Stamford Bridge"],
    answerIndex: 2,
    explanation:
      "Anfield, Liverpool kurulmadan önce Everton’ın da iç saha maçlarına ev sahipliği yaptı.",
  },
  {
    id: "clubs-04",
    category: "clubs",
    difficulty: "easy",
    question: "Juventus hangi İtalyan kentinde kuruldu?",
    options: ["Roma", "Milano", "Napoli", "Torino"],
    answerIndex: 3,
    explanation:
      "Juventus, 1897 yılında Torino’da bir grup öğrenci tarafından kuruldu.",
  },
  {
    id: "clubs-05",
    category: "clubs",
    difficulty: "easy",
    question: "AC Milan hangi İtalyan kentinin kulübüdür?",
    options: ["Milano", "Floransa", "Cenova", "Bologna"],
    answerIndex: 0,
    explanation: "Kulübün adındaki Milan, Milano kentinin İngilizce adıdır.",
  },
  {
    id: "clubs-06",
    category: "clubs",
    difficulty: "easy",
    question: "AS Roma hangi kentte kuruldu?",
    options: ["Torino", "Roma", "Napoli", "Parma"],
    answerIndex: 1,
    explanation:
      "AS Roma, 1927 yılında başkentteki kulüplerin birleşmesiyle doğdu.",
  },
  {
    id: "clubs-07",
    category: "clubs",
    difficulty: "easy",
    question: "Paris Saint-Germain hangi ülkenin başkentini temsil eder?",
    options: ["Belçika", "İsviçre", "Fransa", "İspanya"],
    answerIndex: 2,
    explanation:
      "Paris Saint-Germain, 1970 yılında Paris FC ile Stade Saint-Germain’in birleşmesiyle kuruldu.",
  },
  {
    id: "clubs-08",
    category: "clubs",
    difficulty: "easy",
    question: "Bayern Münih hangi ülkede kuruldu?",
    options: ["Avusturya", "İsviçre", "Hollanda", "Almanya"],
    answerIndex: 3,
    explanation: "Bayern, 1900 yılında Almanya’nın Münih kentinde kuruldu.",
  },
  {
    id: "clubs-09",
    category: "clubs",
    difficulty: "easy",
    question: "Ajax hangi Hollanda kentinde kuruldu?",
    options: ["Amsterdam", "Rotterdam", "Eindhoven", "Utrecht"],
    answerIndex: 0,
    explanation: "Ajax, 18 Mart 1900 tarihinde Amsterdam’da kuruldu.",
  },
  {
    id: "clubs-10",
    category: "clubs",
    difficulty: "easy",
    question: "Benfica hangi Portekiz kentinin kulübüdür?",
    options: ["Porto", "Lizbon", "Braga", "Coimbra"],
    answerIndex: 1,
    explanation:
      "Benfica ile Sporting, Lizbon futbolunun iki tarihî rakibidir.",
  },
  {
    id: "clubs-11",
    category: "clubs",
    difficulty: "easy",
    question:
      "FC Porto’nun 2003 yılında açılan Estádio do Dragão stadı hangi kenttedir?",
    options: ["Lizbon", "Faro", "Porto", "Braga"],
    answerIndex: 2,
    explanation:
      "Dragão adı Portekizcede ejderha anlamına gelir ve kulübün simgesine gönderme yapar.",
  },
  {
    id: "clubs-12",
    category: "clubs",
    difficulty: "easy",
    question:
      "Celtic ve Rangers arasındaki tarihî rekabet hangi İskoç kentindedir?",
    options: ["Edinburgh", "Aberdeen", "Dundee", "Glasgow"],
    answerIndex: 3,
    explanation:
      "Glasgow’un bu iki kulübü arasındaki derbi, Old Firm adıyla tanınır.",
  },
  {
    id: "clubs-13",
    category: "clubs",
    difficulty: "easy",
    question: "1974 yılında açılan Westfalenstadion hangi Alman kentindedir?",
    options: ["Dortmund", "Hamburg", "Berlin", "Köln"],
    answerIndex: 0,
    explanation:
      "Borussia Dortmund’un stadı, 1974 Dünya Kupası için inşa edildi.",
  },
  {
    id: "clubs-14",
    category: "clubs",
    difficulty: "easy",
    question:
      "Sevilla FC ile Real Betis arasındaki derbi hangi kentte oynanır?",
    options: ["Madrid", "Sevilla", "Valensiya", "Vigo"],
    answerIndex: 1,
    explanation:
      "Sevilla’nın bu iki kulübü arasındaki karşılaşma El Gran Derbi olarak bilinir.",
  },
  {
    id: "clubs-15",
    category: "clubs",
    difficulty: "medium",
    question:
      "Arsenal, 2003-04 Premier League şampiyonluğunda kaç lig maçını yenilgisiz tamamladı?",
    options: ["34", "36", "38", "40"],
    answerIndex: 2,
    explanation:
      "Arsène Wenger’in Arsenal’ı, sezonu 26 galibiyet ve 12 beraberlikle tamamladı.",
  },
  {
    id: "clubs-16",
    category: "clubs",
    difficulty: "medium",
    question:
      "Bill Shankly yönetimindeki Liverpool, Kasım 1964’te beyaz şort yerine hangi renk şort kullanmaya başladı?",
    options: ["Mavi", "Siyah", "Beyaz", "Kırmızı"],
    answerIndex: 3,
    explanation:
      "Liverpool, 25 Kasım 1964’teki Anderlecht maçında kırmızı forma ve şortla oynayıp 3-0 kazandı.",
  },
  {
    id: "clubs-17",
    category: "clubs",
    difficulty: "medium",
    question:
      "1998-99 sezonunda üçleme yapan Manchester United’ın tarihî lakabı hangisidir?",
    options: ["Kırmızı Şeytanlar", "Topçular", "Yurttaşlar", "Maviler"],
    answerIndex: 0,
    explanation:
      "İngilizce Red Devils adıyla bilinen lakap, Matt Busby döneminde 1960’larda benimsendi.",
  },
  {
    id: "clubs-18",
    category: "clubs",
    difficulty: "medium",
    question: "Bayern Münih hangi yılda kuruldu?",
    options: ["1890", "1900", "1910", "1920"],
    answerIndex: 1,
    explanation:
      "27 Şubat 1900’de kurulan Bayern’in ilk başkanı Franz John’du.",
  },
  {
    id: "clubs-19",
    category: "clubs",
    difficulty: "medium",
    question: "Juventus’un kuruluş yılı hangisidir?",
    options: ["1887", "1907", "1897", "1917"],
    answerIndex: 2,
    explanation: "Juventus, 1 Kasım 1897 tarihinde Torino’da kuruldu.",
  },
  {
    id: "clubs-20",
    category: "clubs",
    difficulty: "medium",
    question: "Chelsea hangi yılda kuruldu?",
    options: ["1895", "1900", "1910", "1905"],
    answerIndex: 3,
    explanation:
      "Chelsea, 1905 yılında kuruldu ve ilk sezonundan itibaren Stamford Bridge’de oynadı.",
  },
  {
    id: "clubs-21",
    category: "clubs",
    difficulty: "medium",
    question: "Ajax’ın kuruluş yılı hangisidir?",
    options: ["1900", "1890", "1910", "1920"],
    answerIndex: 0,
    explanation:
      "Amsterdam kulübü adını Yunan mitolojisindeki kahraman Aias’tan aldı.",
  },
  {
    id: "clubs-22",
    category: "clubs",
    difficulty: "medium",
    question: "Inter hangi yılda kuruldu?",
    options: ["1898", "1908", "1918", "1928"],
    answerIndex: 1,
    explanation:
      "Inter, 9 Mart 1908’de Milan’dan ayrılan bir grubun girişimiyle kuruldu.",
  },
  {
    id: "clubs-23",
    category: "clubs",
    difficulty: "medium",
    question: "Celtic’in kuruluş toplantısı hangi yılda yapıldı?",
    options: ["1877", "1897", "1887", "1907"],
    answerIndex: 2,
    explanation:
      "Celtic, 6 Kasım 1887’de kuruldu; ilk maçını ise 1888 yılında oynadı.",
  },
  {
    id: "clubs-24",
    category: "clubs",
    difficulty: "medium",
    question: "Borussia Dortmund hangi yılda kuruldu?",
    options: ["1889", "1899", "1919", "1909"],
    answerIndex: 3,
    explanation: "Kulübün armasındaki 09, 1909 yılındaki kuruluşunu simgeler.",
  },
  {
    id: "clubs-25",
    category: "clubs",
    difficulty: "medium",
    question: "Paris Saint-Germain hangi yılda kuruldu?",
    options: ["1970", "1950", "1960", "1980"],
    answerIndex: 0,
    explanation:
      "PSG’nin kuruluşu, Paris FC ile Stade Saint-Germain’in 1970 yılındaki birleşmesine dayanır.",
  },
  {
    id: "clubs-26",
    category: "clubs",
    difficulty: "medium",
    question: "Napoli, Associazione Calcio Napoli adıyla hangi yılda kuruldu?",
    options: ["1916", "1926", "1936", "1946"],
    answerIndex: 1,
    explanation:
      "Kulübün 1926’da başlayan tarihinde ilk Serie A şampiyonluğu 1986-87 sezonunda geldi.",
  },
  {
    id: "clubs-27",
    category: "clubs",
    difficulty: "medium",
    question: "AS Roma hangi yılda kuruldu?",
    options: ["1907", "1917", "1927", "1937"],
    answerIndex: 2,
    explanation:
      "Alba-Audace, Fortitudo-Pro Roma ve Roman FC, 1927’de AS Roma çatısı altında birleşti.",
  },
  {
    id: "clubs-28",
    category: "clubs",
    difficulty: "hard",
    question:
      "Arsenal’ın 1913’ten 2006’ya kadar kullandığı stadın yaygın adı neydi?",
    options: ["The Dell", "Maine Road", "Upton Park", "Highbury"],
    answerIndex: 3,
    explanation:
      "Arsenal, Highbury’deki son maçında 2006 yılında Wigan’ı 4-2 yendi.",
  },
  {
    id: "clubs-29",
    category: "clubs",
    difficulty: "hard",
    question:
      "Tottenham’ın 1899’dan 2017’ye kadar kullandığı tarihî stadı hangisiydi?",
    options: [
      "White Hart Lane",
      "Craven Cottage",
      "The Valley",
      "Selhurst Park",
    ],
    answerIndex: 0,
    explanation:
      "Tottenham, White Hart Lane’e 2017 yılında Manchester United’ı 2-1 yenerek veda etti.",
  },
  {
    id: "clubs-30",
    category: "clubs",
    difficulty: "hard",
    question:
      "Atlético Madrid’in 1966 ile 2017 arasında kullandığı stadın son adı neydi?",
    options: ["La Romareda", "Vicente Calderón", "Mestalla", "Riazor"],
    answerIndex: 1,
    explanation:
      "1966’da Manzanares adıyla açılan stat, 1971’de Vicente Calderón adını aldı.",
  },
  {
    id: "clubs-31",
    category: "clubs",
    difficulty: "hard",
    question:
      "Athletic Bilbao’nun 1913’te açılan ve 2013’te veda ettiği stadı hangisiydi?",
    options: ["Anoeta", "El Sardinero", "Eski San Mamés", "Balaídos"],
    answerIndex: 2,
    explanation:
      "Athletic, 2013 yılında eski San Mamés’ten aynı adı taşıyan yeni stadına geçti.",
  },
  {
    id: "clubs-32",
    category: "clubs",
    difficulty: "hard",
    question:
      "Benfica’nın 1954’te açılan ve 2003’te yerini yeni stadına bırakan eski evinin adı neydi?",
    options: [
      "Estádio das Antas",
      "Estádio do Restelo",
      "Estádio José Alvalade",
      "Estádio da Luz",
    ],
    answerIndex: 3,
    explanation:
      "Benfica’nın hem 1954’te açılan eski stadı hem de 2003’te açılan yeni stadı Luz adıyla tanındı.",
  },
  {
    id: "clubs-33",
    category: "clubs",
    difficulty: "hard",
    question:
      "Bayern Münih, 1972’den 2005’e kadar iç saha maçlarını ağırlıklı olarak hangi statta oynadı?",
    options: [
      "Olympiastadion",
      "Volksparkstadion",
      "Weserstadion",
      "Fritz-Walter-Stadion",
    ],
    answerIndex: 0,
    explanation:
      "Münih Olimpiyat Stadı’ndan ayrılan Bayern, 2005 yılında Allianz Arena’ya taşındı.",
  },
  {
    id: "clubs-34",
    category: "clubs",
    difficulty: "hard",
    question:
      "Borussia Dortmund’un 1974’te açılan stadının açılıştaki adı neydi?",
    options: ["Rote Erde", "Westfalenstadion", "Olympiastadion", "Parkstadion"],
    answerIndex: 1,
    explanation:
      "Westfalenstadion’un 1974 yılındaki açılış maçında Dortmund ile Schalke karşılaştı.",
  },
  {
    id: "clubs-35",
    category: "clubs",
    difficulty: "hard",
    question:
      "FC Porto’nun 1952’de açılan ve Dragão’dan önce kullandığı stadı hangisiydi?",
    options: [
      "Estádio da Luz",
      "Estádio do Bessa",
      "Estádio das Antas",
      "Estádio do Bonfim",
    ],
    answerIndex: 2,
    explanation:
      "1952’de açılan Antas, Porto’nun 1987 Avrupa Şampiyon Kulüpler Kupası zaferi dönemindeki eviydi.",
  },
  {
    id: "clubs-36",
    category: "clubs",
    difficulty: "hard",
    question:
      "Sporting’in 1956’da açılan ve 2003’te kapatılan eski stadı hangi adı taşıyordu?",
    options: [
      "Estádio Nacional",
      "Estádio das Antas",
      "Estádio do Restelo",
      "Estádio José Alvalade",
    ],
    answerIndex: 3,
    explanation:
      "Sporting, 2003 yılında yine José Alvalade adını taşıyan yeni stadına geçti.",
  },
  {
    id: "clubs-37",
    category: "clubs",
    difficulty: "hard",
    question:
      "1899 yılında AC Milan’ın kuruluşuna öncülük eden İngiliz futbol adamı kimdi?",
    options: [
      "Herbert Kilpin",
      "Bill Shankly",
      "Matt Busby",
      "Herbert Chapman",
    ],
    answerIndex: 0,
    explanation:
      "Nottingham doğumlu Kilpin, Milan’ın kurucularından biri ve ilk dönem oyuncularındandı.",
  },
  {
    id: "clubs-38",
    category: "clubs",
    difficulty: "hard",
    question:
      "Manchester United, 1902’de bu adı almadan önce hangi adla biliniyordu?",
    options: ["Ardwick", "Newton Heath", "Small Heath", "Thames Ironworks"],
    answerIndex: 1,
    explanation:
      "1878’de Newton Heath L&YR adıyla kurulan kulüp, 1902’de Manchester United adını aldı.",
  },
  {
    id: "clubs-39",
    category: "clubs",
    difficulty: "hard",
    question: "Arsenal, 1886’daki kuruluşunda ilk olarak hangi adı kullandı?",
    options: [
      "Royal Engineers",
      "Woolwich Town",
      "Dial Square",
      "London Athletic",
    ],
    answerIndex: 2,
    explanation:
      "Dial Square adı, kulübü kuran işçilerin çalıştığı silah fabrikasının bir bölümünden geliyordu.",
  },
  {
    id: "clubs-40",
    category: "clubs",
    difficulty: "hard",
    question:
      "Everton, 1892’de Goodison Park’a taşınmadan hemen önce hangi statta oynuyordu?",
    options: ["Maine Road", "Ewood Park", "Bramall Lane", "Anfield"],
    answerIndex: 3,
    explanation:
      "Everton, 1890-91 lig şampiyonluğunu Anfield’ı iç saha olarak kullanırken kazandı.",
  },
  {
    id: "players-01",
    category: "players",
    difficulty: "easy",
    question:
      "1958 Dünya Kupası’nı Brezilya ile 17 yaşında kazanan futbolcu kimdi?",
    options: ["Pelé", "Romário", "Zico", "Rivaldo"],
    answerIndex: 0,
    explanation:
      "Pelé, 1958 finalinde İsveç’e karşı iki gol attı; Brezilya maçı 5-2 kazandı.",
  },
  {
    id: "players-02",
    category: "players",
    difficulty: "easy",
    question: "1986 Dünya Kupası’nı kazanan Arjantin’in kaptanı kimdi?",
    options: [
      "Gabriel Batistuta",
      "Diego Maradona",
      "Juan Román Riquelme",
      "Hernán Crespo",
    ],
    answerIndex: 1,
    explanation:
      "Maradona, 1986 turnuvasında beş gol attı ve Altın Top ödülünü kazandı.",
  },
  {
    id: "players-03",
    category: "players",
    difficulty: "easy",
    question: "2022 Dünya Kupası’nı kazanan Arjantin’in kaptanı kimdi?",
    options: [
      "Ángel Di María",
      "Julián Álvarez",
      "Lionel Messi",
      "Lautaro Martínez",
    ],
    answerIndex: 2,
    explanation: "Messi, Fransa’ya karşı oynanan 2022 finalinde iki gol attı.",
  },
  {
    id: "players-04",
    category: "players",
    difficulty: "easy",
    question: "EURO 2016 şampiyonu Portekiz’in kaptanı kimdi?",
    options: ["Luís Figo", "Eusébio", "Deco", "Cristiano Ronaldo"],
    answerIndex: 3,
    explanation:
      "Ronaldo finalde sakatlanarak oyundan çıktı; Portekiz kupayı Éder’in uzatma golüyle kazandı.",
  },
  {
    id: "players-05",
    category: "players",
    difficulty: "easy",
    question:
      "1998 Dünya Kupası finalinde Fransa adına iki kafa golü atan futbolcu kimdi?",
    options: [
      "Zinédine Zidane",
      "Thierry Henry",
      "David Trezeguet",
      "Patrick Vieira",
    ],
    answerIndex: 0,
    explanation:
      "Zidane’ın iki golüne Emmanuel Petit’nin golü eklendi ve Fransa Brezilya’yı 3-0 yendi.",
  },
  {
    id: "players-06",
    category: "players",
    difficulty: "easy",
    question:
      "2018 Dünya Kupası finalinde Fransa adına gol atan 19 yaşındaki futbolcu kimdi?",
    options: [
      "Ousmane Dembélé",
      "Kylian Mbappé",
      "Kingsley Coman",
      "Anthony Martial",
    ],
    answerIndex: 1,
    explanation:
      "Mbappé, Hırvatistan’a karşı 4-2 kazanılan finalde Fransa’nın dördüncü golünü attı.",
  },
  {
    id: "players-07",
    category: "players",
    difficulty: "easy",
    question:
      "2010 Dünya Kupası finalinde İspanya’ya şampiyonluğu getiren golü kim attı?",
    options: ["Xavi", "David Villa", "Andrés Iniesta", "Fernando Torres"],
    answerIndex: 2,
    explanation:
      "Iniesta, Hollanda karşısında uzatmaların 116. dakikasında gol attı.",
  },
  {
    id: "players-08",
    category: "players",
    difficulty: "easy",
    question:
      "2014 Dünya Kupası finalinde Almanya’nın galibiyet golünü kim attı?",
    options: ["Thomas Müller", "Miroslav Klose", "Mesut Özil", "Mario Götze"],
    answerIndex: 3,
    explanation:
      "Götze’nin 113. dakikadaki golü, Almanya’ya Arjantin karşısında 1-0’lık zafer getirdi.",
  },
  {
    id: "players-09",
    category: "players",
    difficulty: "easy",
    question:
      "1966 Dünya Kupası finalinde İngiltere adına hat-trick yapan oyuncu kimdi?",
    options: ["Geoff Hurst", "Bobby Charlton", "Bobby Moore", "Gordon Banks"],
    answerIndex: 0,
    explanation:
      "Hurst, İngiltere’nin Batı Almanya’yı uzatmalarda 4-2 yendiği finalde üç gol attı.",
  },
  {
    id: "players-10",
    category: "players",
    difficulty: "easy",
    question: "1974 Dünya Kupası finaline çıkan Hollanda’nın kaptanı kimdi?",
    options: [
      "Marco van Basten",
      "Johan Cruyff",
      "Ruud Gullit",
      "Dennis Bergkamp",
    ],
    answerIndex: 1,
    explanation:
      "Cruyff’un kaptanlığındaki Hollanda, 1974 finalinde Batı Almanya’ya 2-1 yenildi.",
  },
  {
    id: "players-11",
    category: "players",
    difficulty: "easy",
    question:
      "1994 Dünya Kupası finalindeki seri penaltılarda İtalya’nın son vuruşunu auta atan oyuncu kimdi?",
    options: [
      "Paolo Maldini",
      "Alessandro Del Piero",
      "Roberto Baggio",
      "Francesco Totti",
    ],
    answerIndex: 2,
    explanation:
      "Golsüz biten finalin penaltı atışlarını Brezilya 3-2 kazandı.",
  },
  {
    id: "players-12",
    category: "players",
    difficulty: "easy",
    question:
      "David Beckham, 2003 yılında Manchester United’dan hangi kulübe transfer oldu?",
    options: ["Barcelona", "Milan", "Inter", "Real Madrid"],
    answerIndex: 3,
    explanation:
      "Beckham, Real Madrid’e 2003 yazında katıldı ve 23 numaralı formayı giydi.",
  },
  {
    id: "players-13",
    category: "players",
    difficulty: "easy",
    question:
      "Ronaldinho, 2003 yılında Paris Saint-Germain’den hangi kulübe transfer oldu?",
    options: ["Barcelona", "Real Madrid", "Juventus", "Chelsea"],
    answerIndex: 0,
    explanation:
      "Ronaldinho, Barcelona formasıyla 2005 Ballon d’Or ödülünü kazandı.",
  },
  {
    id: "players-14",
    category: "players",
    difficulty: "easy",
    question:
      "2002 Dünya Kupası’nı sekiz golle gol kralı olarak tamamlayan Brezilyalı kimdi?",
    options: ["Rivaldo", "Ronaldo Nazário", "Ronaldinho", "Kaká"],
    answerIndex: 1,
    explanation:
      "Ronaldo Nazário, Almanya’ya karşı 2-0 kazanılan finalin iki golünü de attı.",
  },
  {
    id: "players-15",
    category: "players",
    difficulty: "medium",
    question:
      "Luís Figo, 2000 yılında Barcelona’dan hangi kulübe transfer oldu?",
    options: ["Inter", "Milan", "Real Madrid", "Manchester United"],
    answerIndex: 2,
    explanation:
      "Figo, Real Madrid’e transfer olduğu 2000 yılında Ballon d’Or ödülünü de kazandı.",
  },
  {
    id: "players-16",
    category: "players",
    difficulty: "medium",
    question:
      "2006 Dünya Kupası şampiyonu İtalya’nın kaptanı Fabio Cannavaro’nun temel mevkisi neydi?",
    options: ["Kaleci", "Santrfor", "Kanat oyuncusu", "Stoper"],
    answerIndex: 3,
    explanation:
      "Savunmanın merkezinde oynayan Cannavaro, aynı yıl Ballon d’Or ödülünü de kazandı.",
  },
  {
    id: "players-17",
    category: "players",
    difficulty: "medium",
    question:
      "1995 Ballon d’Or ödülünü kazanan George Weah hangi ülkenin millî takımında oynadı?",
    options: ["Liberya", "Fildişi Sahili", "Kamerun", "Nijerya"],
    answerIndex: 0,
    explanation:
      "Liberyalı Weah, 1995’te Ballon d’Or kazanan ilk Afrikalı futbolcu oldu.",
  },
  {
    id: "players-18",
    category: "players",
    difficulty: "medium",
    question:
      "Thierry Henry, 1999 yılında Juventus’tan hangi İngiliz kulübüne transfer oldu?",
    options: ["Liverpool", "Arsenal", "Chelsea", "Manchester United"],
    answerIndex: 1,
    explanation:
      "Henry, Arsenal’da Arsène Wenger yönetiminde 2003-04 sezonunu ligde yenilgisiz tamamladı.",
  },
  {
    id: "players-19",
    category: "players",
    difficulty: "medium",
    question:
      "Cristiano Ronaldo, 2009 yılında Manchester United’dan hangi kulübe transfer oldu?",
    options: ["Barcelona", "Juventus", "Real Madrid", "Paris Saint-Germain"],
    answerIndex: 2,
    explanation:
      "Ronaldo, Real Madrid’deki ilk sezonu olan 2009-10’da 9 numaralı formayı giydi.",
  },
  {
    id: "players-20",
    category: "players",
    difficulty: "medium",
    question: "Neymar, 2017 yılında Barcelona’dan hangi kulübe transfer oldu?",
    options: [
      "Chelsea",
      "Manchester City",
      "Real Madrid",
      "Paris Saint-Germain",
    ],
    answerIndex: 3,
    explanation:
      "Neymar’ın PSG’ye 2017 yılındaki geçişinde serbest kalma bedeli 222 milyon avroydu.",
  },
  {
    id: "players-21",
    category: "players",
    difficulty: "medium",
    question:
      "Luis Suárez, 2014 yılında Liverpool’dan hangi kulübe transfer oldu?",
    options: ["Barcelona", "Atlético Madrid", "Inter", "Juventus"],
    answerIndex: 0,
    explanation:
      "Suárez, Barcelona’daki ilk sezonunda La Liga, Kral Kupası ve Şampiyonlar Ligi’ni kazandı.",
  },
  {
    id: "players-22",
    category: "players",
    difficulty: "medium",
    question:
      "Mohamed Salah, 2017 yılında Roma’dan hangi İngiliz kulübüne transfer oldu?",
    options: ["Tottenham", "Liverpool", "Arsenal", "Manchester City"],
    answerIndex: 1,
    explanation:
      "Salah, Liverpool’daki ilk sezonu olan 2017-18’de Premier League’de 32 gol attı.",
  },
  {
    id: "players-23",
    category: "players",
    difficulty: "medium",
    question:
      "Kevin De Bruyne, 2015 yılında Manchester City’ye hangi kulüpten transfer oldu?",
    options: ["Genk", "Werder Bremen", "Wolfsburg", "Chelsea"],
    answerIndex: 2,
    explanation:
      "Belçikalı orta saha, Wolfsburg’dan Manchester City’ye Ağustos 2015’te katıldı.",
  },
  {
    id: "players-24",
    category: "players",
    difficulty: "medium",
    question:
      "Erling Haaland, 2022 yılında Manchester City’ye hangi kulüpten transfer oldu?",
    options: [
      "Molde",
      "Red Bull Salzburg",
      "Bayern Münih",
      "Borussia Dortmund",
    ],
    answerIndex: 3,
    explanation:
      "Haaland, Dortmund’dan ayrılarak 1 Temmuz 2022 itibarıyla Manchester City kadrosuna katıldı.",
  },
  {
    id: "players-25",
    category: "players",
    difficulty: "medium",
    question:
      "Robert Lewandowski, 2014 yılında Borussia Dortmund’dan hangi kulübe geçti?",
    options: ["Bayern Münih", "Barcelona", "Real Madrid", "Milan"],
    answerIndex: 0,
    explanation:
      "Lewandowski, Dortmund’daki sözleşmesinin bitmesiyle 2014 yazında Bayern’e katıldı.",
  },
  {
    id: "players-26",
    category: "players",
    difficulty: "medium",
    question:
      "Gianluigi Buffon, 2001 yılında Parma’dan hangi kulübe transfer oldu?",
    options: ["Inter", "Juventus", "Roma", "Lazio"],
    answerIndex: 1,
    explanation:
      "Buffon, Juventus’a transfer olmadan önce Parma ile 1998-99 UEFA Kupası’nı kazandı.",
  },
  {
    id: "players-27",
    category: "players",
    difficulty: "medium",
    question:
      "Virgil van Dijk, Ocak 2018’de Liverpool’a hangi kulüpten transfer oldu?",
    options: ["Celtic", "Groningen", "Southampton", "Ajax"],
    answerIndex: 2,
    explanation:
      "Van Dijk, Liverpool’daki ilk maçında FA Cup’ta Everton’a karşı gol attı.",
  },
  {
    id: "players-28",
    category: "players",
    difficulty: "hard",
    question:
      "1982 Dünya Kupası’nı altı golle gol kralı olarak tamamlayan İtalyan kimdi?",
    options: [
      "Roberto Bettega",
      "Bruno Conti",
      "Alessandro Altobelli",
      "Paolo Rossi",
    ],
    answerIndex: 3,
    explanation:
      "Rossi, 1982’de hem turnuvanın gol kralı oldu hem de Altın Top ödülünü kazandı.",
  },
  {
    id: "players-29",
    category: "players",
    difficulty: "hard",
    question: "1958 Dünya Kupası’nda 13 gol atan Fransız futbolcu kimdi?",
    options: [
      "Just Fontaine",
      "Raymond Kopa",
      "Michel Platini",
      "Jean-Pierre Papin",
    ],
    answerIndex: 0,
    explanation:
      "Fontaine, 1958 turnuvasında oynadığı altı maçta 13 gol kaydetti.",
  },
  {
    id: "players-30",
    category: "players",
    difficulty: "hard",
    question: "1966 Dünya Kupası’nın dokuz gollü gol kralı kimdi?",
    options: ["Geoff Hurst", "Eusébio", "Pelé", "Ferenc Bene"],
    answerIndex: 1,
    explanation:
      "Eusébio’nun Portekiz’i, 1966 Dünya Kupası’nı üçüncü sırada tamamladı.",
  },
  {
    id: "players-31",
    category: "players",
    difficulty: "hard",
    question: "1978 Dünya Kupası’nın altı gollü gol kralı kimdi?",
    options: [
      "Daniel Passarella",
      "Leopoldo Luque",
      "Mario Kempes",
      "Daniel Bertoni",
    ],
    answerIndex: 2,
    explanation:
      "Kempes, Hollanda’ya karşı 3-1 kazanılan 1978 finalinde iki gol attı.",
  },
  {
    id: "players-32",
    category: "players",
    difficulty: "hard",
    question: "1990 Dünya Kupası’nın altı gollü gol kralı kimdi?",
    options: [
      "Gary Lineker",
      "Jürgen Klinsmann",
      "Roger Milla",
      "Salvatore Schillaci",
    ],
    answerIndex: 3,
    explanation:
      "Schillaci, ev sahibi İtalya’nın üçüncü olduğu turnuvada Altın Top ödülünü de aldı.",
  },
  {
    id: "players-33",
    category: "players",
    difficulty: "hard",
    question:
      "1998 Dünya Kupası’nın altı gollü gol kralı hangi Hırvat oyuncuydu?",
    options: [
      "Davor Šuker",
      "Zvonimir Boban",
      "Robert Prosinečki",
      "Alen Bokšić",
    ],
    answerIndex: 0,
    explanation:
      "Šuker, Hırvatistan’ın 1998’de Dünya Kupası üçüncüsü olan kadrosundaydı.",
  },
  {
    id: "players-34",
    category: "players",
    difficulty: "hard",
    question:
      "2006 Dünya Kupası’nı beş golle gol kralı tamamlayan Alman kimdi?",
    options: [
      "Lukas Podolski",
      "Miroslav Klose",
      "Michael Ballack",
      "Bastian Schweinsteiger",
    ],
    answerIndex: 1,
    explanation:
      "Klose, 2006’da grup aşamasında dört, Arjantin’e karşı çeyrek finalde bir gol attı.",
  },
  {
    id: "players-35",
    category: "players",
    difficulty: "hard",
    question:
      "2010 Dünya Kupası’nın en iyi oyuncusuna verilen Altın Top ödülünü kim kazandı?",
    options: ["Wesley Sneijder", "David Villa", "Diego Forlán", "Xavi"],
    answerIndex: 2,
    explanation:
      "Forlán, Uruguay’ın dördüncü olduğu 2010 turnuvasında beş gol attı.",
  },
  {
    id: "players-36",
    category: "players",
    difficulty: "hard",
    question:
      "2018 Dünya Kupası’nın Altın Top ödülünü hangi Hırvat futbolcu kazandı?",
    options: ["Ivan Rakitić", "Mario Mandžukić", "Ivan Perišić", "Luka Modrić"],
    answerIndex: 3,
    explanation:
      "Modrić, Hırvatistan’ın final oynadığı 2018 turnuvasında iki gol kaydetti.",
  },
  {
    id: "players-37",
    category: "players",
    difficulty: "hard",
    question: "2006 Ballon d’Or ödülünü hangi İtalyan futbolcu kazandı?",
    options: [
      "Fabio Cannavaro",
      "Andrea Pirlo",
      "Francesco Totti",
      "Alessandro Nesta",
    ],
    answerIndex: 0,
    explanation:
      "Cannavaro, aynı yıl İtalya’nın Dünya Kupası’nı kazanan kaptanıydı.",
  },
  {
    id: "players-38",
    category: "players",
    difficulty: "hard",
    question: "2004 Ballon d’Or ödülünü hangi Ukraynalı futbolcu kazandı?",
    options: [
      "Serhiy Rebrov",
      "Andriy Shevchenko",
      "Anatoliy Tymoshchuk",
      "Andriy Voronin",
    ],
    answerIndex: 1,
    explanation:
      "Shevchenko, ödülü Milan forması giydiği 2004 yılında kazandı.",
  },
  {
    id: "players-39",
    category: "players",
    difficulty: "hard",
    question: "2003 Ballon d’Or ödülünü kazanan Çek futbolcu kimdi?",
    options: ["Petr Čech", "Tomáš Rosický", "Pavel Nedvěd", "Jan Koller"],
    answerIndex: 2,
    explanation:
      "Nedvěd, Juventus formasıyla 2002-03 sezonunda Serie A şampiyonluğu da yaşadı.",
  },
  {
    id: "players-40",
    category: "players",
    difficulty: "hard",
    question: "1999 Ballon d’Or ödülünü hangi Brezilyalı kazandı?",
    options: ["Romário", "Ronaldinho", "Kaká", "Rivaldo"],
    answerIndex: 3,
    explanation:
      "Rivaldo, 1999 yılında Barcelona ile La Liga’yı, Brezilya ile Copa América’yı kazandı.",
  },
  {
    id: "winners-01",
    category: "winners",
    difficulty: "easy",
    question:
      "İlk erkekler FIFA Dünya Kupası olan 1930 turnuvasını hangi ülke kazandı?",
    options: ["Uruguay", "Arjantin", "Brezilya", "İtalya"],
    answerIndex: 0,
    explanation:
      "Ev sahibi Uruguay, Montevideo’daki finalde Arjantin’i 4-2 yendi.",
  },
  {
    id: "winners-02",
    category: "winners",
    difficulty: "easy",
    question: "1958 erkekler Dünya Kupası’nı hangi ülke kazandı?",
    options: ["İsveç", "Brezilya", "Fransa", "Batı Almanya"],
    answerIndex: 1,
    explanation:
      "Brezilya, finalde ev sahibi İsveç’i 5-2 yenerek ilk Dünya Kupası’nı kazandı.",
  },
  {
    id: "winners-03",
    category: "winners",
    difficulty: "easy",
    question: "1966 erkekler Dünya Kupası’nın şampiyonu hangi ülkeydi?",
    options: ["Brezilya", "Portekiz", "İngiltere", "Batı Almanya"],
    answerIndex: 2,
    explanation:
      "İngiltere, Wembley’deki finalde Batı Almanya’yı uzatmalarda 4-2 yendi.",
  },
  {
    id: "winners-04",
    category: "winners",
    difficulty: "easy",
    question: "1978 erkekler Dünya Kupası’nı hangi ülke kazandı?",
    options: ["Hollanda", "Brezilya", "İtalya", "Arjantin"],
    answerIndex: 3,
    explanation:
      "Ev sahibi Arjantin, Hollanda’yı uzatmalar sonunda 3-1 yenerek şampiyon oldu.",
  },
  {
    id: "winners-05",
    category: "winners",
    difficulty: "easy",
    question: "1982 erkekler Dünya Kupası’nın şampiyonu hangi ülkeydi?",
    options: ["İtalya", "Brezilya", "Fransa", "Batı Almanya"],
    answerIndex: 0,
    explanation: "İtalya, Madrid’deki finalde Batı Almanya’yı 3-1 mağlup etti.",
  },
  {
    id: "winners-06",
    category: "winners",
    difficulty: "easy",
    question: "1986 erkekler Dünya Kupası’nı hangi ülke kazandı?",
    options: ["Batı Almanya", "Arjantin", "Fransa", "İngiltere"],
    answerIndex: 1,
    explanation:
      "Arjantin, Mexico City’deki finalde Batı Almanya’yı 3-2 yendi.",
  },
  {
    id: "winners-07",
    category: "winners",
    difficulty: "easy",
    question: "1994 erkekler Dünya Kupası’nı hangi ülke kazandı?",
    options: ["İtalya", "İsveç", "Brezilya", "Bulgaristan"],
    answerIndex: 2,
    explanation:
      "Brezilya, golsüz biten finalin ardından İtalya’yı seri penaltılarda geçti.",
  },
  {
    id: "winners-08",
    category: "winners",
    difficulty: "easy",
    question: "1998 erkekler Dünya Kupası’nın şampiyonu hangi ülkeydi?",
    options: ["Brezilya", "Hollanda", "Hırvatistan", "Fransa"],
    answerIndex: 3,
    explanation:
      "Ev sahibi Fransa, finalde Brezilya’yı 3-0 yenerek ilk Dünya Kupası’nı kazandı.",
  },
  {
    id: "winners-09",
    category: "winners",
    difficulty: "easy",
    question: "2002 erkekler Dünya Kupası’nı hangi ülke kazandı?",
    options: ["Brezilya", "Almanya", "Türkiye", "Güney Kore"],
    answerIndex: 0,
    explanation: "Brezilya, Yokohama’daki finalde Almanya’yı 2-0 mağlup etti.",
  },
  {
    id: "winners-10",
    category: "winners",
    difficulty: "easy",
    question: "2006 erkekler Dünya Kupası’nın şampiyonu hangi ülkeydi?",
    options: ["Fransa", "İtalya", "Almanya", "Portekiz"],
    answerIndex: 1,
    explanation:
      "İtalya, 1-1 biten Berlin finalinde Fransa’yı seri penaltılarla geçti.",
  },
  {
    id: "winners-11",
    category: "winners",
    difficulty: "easy",
    question: "2010 erkekler Dünya Kupası’nı hangi ülke kazandı?",
    options: ["Hollanda", "Almanya", "İspanya", "Uruguay"],
    answerIndex: 2,
    explanation:
      "İspanya, Hollanda’yı uzatmalarda 1-0 yenerek ilk Dünya Kupası zaferini elde etti.",
  },
  {
    id: "winners-12",
    category: "winners",
    difficulty: "easy",
    question: "2014 erkekler Dünya Kupası’nın şampiyonu hangi ülkeydi?",
    options: ["Arjantin", "Brezilya", "Hollanda", "Almanya"],
    answerIndex: 3,
    explanation:
      "Almanya, Rio de Janeiro’daki finalde Arjantin’i uzatmalarda 1-0 yendi.",
  },
  {
    id: "winners-13",
    category: "winners",
    difficulty: "easy",
    question: "2018 erkekler Dünya Kupası’nı hangi ülke kazandı?",
    options: ["Fransa", "Hırvatistan", "Belçika", "İngiltere"],
    answerIndex: 0,
    explanation: "Fransa, Moskova’daki finalde Hırvatistan’ı 4-2 mağlup etti.",
  },
  {
    id: "winners-14",
    category: "winners",
    difficulty: "easy",
    question: "2022 erkekler Dünya Kupası’nın şampiyonu hangi ülkeydi?",
    options: ["Fransa", "Arjantin", "Hırvatistan", "Fas"],
    answerIndex: 1,
    explanation:
      "Arjantin, 3-3 biten finalin seri penaltılarında Fransa’yı 4-2 yendi.",
  },
  {
    id: "winners-15",
    category: "winners",
    difficulty: "medium",
    question:
      "1956 yılında verilen ilk Ballon d’Or ödülünü hangi futbolcu kazandı?",
    options: [
      "Alfredo Di Stéfano",
      "Ferenc Puskás",
      "Stanley Matthews",
      "Raymond Kopa",
    ],
    answerIndex: 2,
    explanation:
      "Matthews, ilk Ballon d’Or ödülünü Blackpool forması giyerken kazandı.",
  },
  {
    id: "winners-16",
    category: "winners",
    difficulty: "medium",
    question: "2007 Copa América’yı hangi ülke kazandı?",
    options: ["Arjantin", "Uruguay", "Meksika", "Brezilya"],
    answerIndex: 3,
    explanation:
      "Brezilya, Venezuela’daki turnuvanın finalinde Arjantin’i 3-0 mağlup etti.",
  },
  {
    id: "winners-17",
    category: "winners",
    difficulty: "medium",
    question: "1968 erkekler Avrupa Şampiyonası’nın şampiyonu kimdi?",
    options: ["İtalya", "Yugoslavya", "İngiltere", "Sovyetler Birliği"],
    answerIndex: 0,
    explanation:
      "İlk final 1-1 bitince tekrar maçı oynandı; İtalya, Yugoslavya’yı bu maçta 2-0 yendi.",
  },
  {
    id: "winners-18",
    category: "winners",
    difficulty: "medium",
    question: "1976 erkekler Avrupa Şampiyonası’nı hangi takım kazandı?",
    options: ["Batı Almanya", "Çekoslovakya", "Hollanda", "Yugoslavya"],
    answerIndex: 1,
    explanation:
      "Panenka’nın ünlü penaltısıyla biten finalde Çekoslovakya, Batı Almanya’yı geçti.",
  },
  {
    id: "winners-19",
    category: "winners",
    difficulty: "medium",
    question: "EURO 1984’ün şampiyonu hangi ülkeydi?",
    options: ["İspanya", "Portekiz", "Fransa", "Danimarka"],
    answerIndex: 2,
    explanation:
      "Ev sahibi Fransa, finalde İspanya’yı 2-0 yendi; Platini turnuvada dokuz gol attı.",
  },
  {
    id: "winners-20",
    category: "winners",
    difficulty: "medium",
    question: "EURO 1988’i hangi ülke kazandı?",
    options: ["Sovyetler Birliği", "Batı Almanya", "İtalya", "Hollanda"],
    answerIndex: 3,
    explanation:
      "Hollanda, Gullit ve Van Basten’in golleriyle finalde Sovyetler Birliği’ni 2-0 yendi.",
  },
  {
    id: "winners-21",
    category: "winners",
    difficulty: "medium",
    question: "EURO 1992’nin şampiyonu hangi ülkeydi?",
    options: ["Danimarka", "Almanya", "İsveç", "Hollanda"],
    answerIndex: 0,
    explanation:
      "Turnuvaya Yugoslavya’nın yerine alınan Danimarka, finalde Almanya’yı 2-0 yendi.",
  },
  {
    id: "winners-22",
    category: "winners",
    difficulty: "medium",
    question: "EURO 1996’yı hangi ülke kazandı?",
    options: ["Çek Cumhuriyeti", "Almanya", "İngiltere", "Fransa"],
    answerIndex: 1,
    explanation:
      "Almanya, Bierhoff’un altın golüyle finalde Çek Cumhuriyeti’ni 2-1 yendi.",
  },
  {
    id: "winners-23",
    category: "winners",
    difficulty: "medium",
    question: "EURO 2000’in şampiyonu hangi ülkeydi?",
    options: ["İtalya", "Hollanda", "Fransa", "Portekiz"],
    answerIndex: 2,
    explanation:
      "Trezeguet’nin altın golü, Fransa’ya İtalya karşısında 2-1’lik final zaferi getirdi.",
  },
  {
    id: "winners-24",
    category: "winners",
    difficulty: "medium",
    question: "EURO 2004’ü hangi ülke kazandı?",
    options: ["Portekiz", "Çek Cumhuriyeti", "Hollanda", "Yunanistan"],
    answerIndex: 3,
    explanation:
      "Yunanistan, ev sahibi Portekiz’i finalde Charisteas’ın golüyle 1-0 yendi.",
  },
  {
    id: "winners-25",
    category: "winners",
    difficulty: "medium",
    question: "EURO 2008’in şampiyonu hangi ülkeydi?",
    options: ["İspanya", "Almanya", "Türkiye", "Rusya"],
    answerIndex: 0,
    explanation:
      "İspanya, Fernando Torres’in golüyle finalde Almanya’yı 1-0 yendi.",
  },
  {
    id: "winners-26",
    category: "winners",
    difficulty: "medium",
    question: "EURO 2016’yı hangi ülke kazandı?",
    options: ["Fransa", "Portekiz", "Almanya", "Galler"],
    answerIndex: 1,
    explanation:
      "Portekiz, ev sahibi Fransa’yı uzatmalarda Éder’in golüyle 1-0 yendi.",
  },
  {
    id: "winners-27",
    category: "winners",
    difficulty: "medium",
    question: "2021’de oynanan EURO 2020’nin şampiyonu hangi ülkeydi?",
    options: ["İngiltere", "İspanya", "İtalya", "Danimarka"],
    answerIndex: 2,
    explanation:
      "Salgın nedeniyle 2021’e ertelenen turnuvanın finalinde İtalya, İngiltere’yi penaltılarla geçti.",
  },
  {
    id: "winners-28",
    category: "winners",
    difficulty: "hard",
    question:
      "1955-56 sezonundaki ilk Avrupa Şampiyon Kulüpler Kupası’nı hangi kulüp kazandı?",
    options: ["Milan", "Benfica", "Stade de Reims", "Real Madrid"],
    answerIndex: 3,
    explanation:
      "Real Madrid, Paris’teki ilk finalde Stade de Reims’i 4-3 yendi.",
  },
  {
    id: "winners-29",
    category: "winners",
    difficulty: "hard",
    question:
      "1966-67 Avrupa Şampiyon Kulüpler Kupası’nın şampiyonu hangi kulüptü?",
    options: ["Celtic", "Inter", "Real Madrid", "Benfica"],
    answerIndex: 0,
    explanation:
      "Celtic, Lizbon’daki finalde Inter’i 2-1 yenerek kupayı kazanan ilk Britanya kulübü oldu.",
  },
  {
    id: "winners-30",
    category: "winners",
    difficulty: "hard",
    question: "1967-68 Avrupa Şampiyon Kulüpler Kupası’nı hangi kulüp kazandı?",
    options: ["Benfica", "Manchester United", "Real Madrid", "Juventus"],
    answerIndex: 1,
    explanation:
      "Manchester United, Wembley’de Benfica’yı uzatmalarda 4-1 yendi.",
  },
  {
    id: "winners-31",
    category: "winners",
    difficulty: "hard",
    question: "1985-86 Avrupa Şampiyon Kulüpler Kupası’nı hangi kulüp kazandı?",
    options: ["Barcelona", "Anderlecht", "Steaua Bükreş", "IFK Göteborg"],
    answerIndex: 2,
    explanation:
      "Steaua, golsüz biten finalde Barcelona’yı penaltı atışlarıyla geçti.",
  },
  {
    id: "winners-32",
    category: "winners",
    difficulty: "hard",
    question:
      "1990-91 Avrupa Şampiyon Kulüpler Kupası’nın şampiyonu hangi kulüptü?",
    options: ["Marsilya", "Bayern Münih", "Milan", "Kızılyıldız"],
    answerIndex: 3,
    explanation:
      "Kızılyıldız, Bari’deki finalde Marsilya’yı seri penaltılarla mağlup etti.",
  },
  {
    id: "winners-33",
    category: "winners",
    difficulty: "hard",
    question:
      "Şampiyonlar Ligi adıyla oynanan ilk sezon olan 1992-93’te kupayı kim kazandı?",
    options: ["Marsilya", "Milan", "Barcelona", "Porto"],
    answerIndex: 0,
    explanation:
      "Marsilya, Münih’teki finalde Milan’ı Basile Boli’nin golüyle 1-0 yendi.",
  },
  {
    id: "winners-34",
    category: "winners",
    difficulty: "hard",
    question: "1996-97 UEFA Şampiyonlar Ligi’ni hangi kulüp kazandı?",
    options: ["Juventus", "Borussia Dortmund", "Manchester United", "Ajax"],
    answerIndex: 1,
    explanation:
      "Dortmund, Münih’te Juventus’u 3-1 yendi; Lars Ricken oyuna girdikten hemen sonra gol attı.",
  },
  {
    id: "winners-35",
    category: "winners",
    difficulty: "hard",
    question: "2003-04 UEFA Şampiyonlar Ligi’nin şampiyonu hangi kulüptü?",
    options: ["Monaco", "Chelsea", "Porto", "Deportivo La Coruña"],
    answerIndex: 2,
    explanation:
      "José Mourinho yönetimindeki Porto, finalde Monaco’yu 3-0 yendi.",
  },
  {
    id: "winners-36",
    category: "winners",
    difficulty: "hard",
    question: "2011-12 UEFA Şampiyonlar Ligi’ni hangi kulüp kazandı?",
    options: ["Bayern Münih", "Barcelona", "Real Madrid", "Chelsea"],
    answerIndex: 3,
    explanation:
      "Chelsea, Bayern’in kendi stadında oynanan finalde rakibini seri penaltılarla geçti.",
  },
  {
    id: "winners-37",
    category: "winners",
    difficulty: "hard",
    question: "1992 Copa Libertadores’i hangi Brezilya kulübü kazandı?",
    options: ["São Paulo", "Flamengo", "Santos", "Palmeiras"],
    answerIndex: 0,
    explanation:
      "Telê Santana’nın São Paulo’su, finalde Newell’s Old Boys’u penaltılarla geçti.",
  },
  {
    id: "winners-38",
    category: "winners",
    difficulty: "hard",
    question: "2011 Copa América’yı hangi ülke kazandı?",
    options: ["Paraguay", "Uruguay", "Arjantin", "Brezilya"],
    answerIndex: 1,
    explanation:
      "Uruguay, Buenos Aires’teki finalde Paraguay’ı 3-0 mağlup etti.",
  },
  {
    id: "winners-39",
    category: "winners",
    difficulty: "hard",
    question: "2015 Copa América’nın şampiyonu hangi ülkeydi?",
    options: ["Arjantin", "Peru", "Şili", "Kolombiya"],
    answerIndex: 2,
    explanation:
      "Ev sahibi Şili, finalde Arjantin’i seri penaltılarla geçerek ilk Copa América zaferini kazandı.",
  },
  {
    id: "winners-40",
    category: "winners",
    difficulty: "hard",
    question: "2019 Afrika Uluslar Kupası’nı hangi ülke kazandı?",
    options: ["Senegal", "Nijerya", "Tunus", "Cezayir"],
    answerIndex: 3,
    explanation:
      "Cezayir, Kahire’deki finalde Senegal’i Baghdad Bounedjah’ın golüyle 1-0 yendi.",
  },
  {
    id: "turkish-01",
    category: "turkish",
    difficulty: "easy",
    question: "1999-2000 UEFA Kupası’nı hangi Türk kulübü kazandı?",
    options: ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor"],
    answerIndex: 0,
    explanation:
      "Galatasaray, Kopenhag’daki finalde Arsenal’ı seri penaltılarda 4-1 yendi.",
  },
  {
    id: "turkish-02",
    category: "turkish",
    difficulty: "easy",
    question: "2000 UEFA Süper Kupası’nı hangi Türk kulübü kazandı?",
    options: ["Beşiktaş", "Galatasaray", "Fenerbahçe", "Bursaspor"],
    answerIndex: 1,
    explanation:
      "Galatasaray, Monaco’da Real Madrid’i uzatmalar sonunda 2-1 mağlup etti.",
  },
  {
    id: "turkish-03",
    category: "turkish",
    difficulty: "easy",
    question:
      "Türkiye, 2002 erkekler Dünya Kupası’nı kaçıncı sırada tamamladı?",
    options: ["Birinci", "İkinci", "Üçüncü", "Dördüncü"],
    answerIndex: 2,
    explanation:
      "Millî takım, üçüncülük maçında ev sahiplerinden Güney Kore’yi 3-2 yendi.",
  },
  {
    id: "turkish-04",
    category: "turkish",
    difficulty: "easy",
    question: "Türkiye, EURO 2008’de hangi aşamaya kadar yükseldi?",
    options: ["Grup aşaması", "Son 16 turu", "Çeyrek final", "Yarı final"],
    answerIndex: 3,
    explanation:
      "Türkiye, 2008 yarı finalinde Almanya’ya 3-2 yenilerek turnuvaya veda etti.",
  },
  {
    id: "turkish-05",
    category: "turkish",
    difficulty: "easy",
    question: "Galatasaray Spor Kulübü hangi yılda kuruldu?",
    options: ["1905", "1903", "1907", "1910"],
    answerIndex: 0,
    explanation:
      "Kulüp, Ali Sami Yen ve arkadaşları tarafından Galatasaray Lisesi’nde kuruldu.",
  },
  {
    id: "turkish-06",
    category: "turkish",
    difficulty: "easy",
    question: "Fenerbahçe Spor Kulübü hangi yılda kuruldu?",
    options: ["1905", "1907", "1903", "1912"],
    answerIndex: 1,
    explanation:
      "Fenerbahçe, 1907 yılında İstanbul’un Kadıköy semtinde kuruldu.",
  },
  {
    id: "turkish-07",
    category: "turkish",
    difficulty: "easy",
    question: "Beşiktaş Jimnastik Kulübü hangi yılda kuruldu?",
    options: ["1907", "1905", "1903", "1911"],
    answerIndex: 2,
    explanation:
      "Beşiktaş, 1903’te jimnastik kulübü olarak kuruldu; futbol şubesi daha sonra oluştu.",
  },
  {
    id: "turkish-08",
    category: "turkish",
    difficulty: "easy",
    question: "Trabzonspor hangi yılda kuruldu?",
    options: ["1957", "1963", "1973", "1967"],
    answerIndex: 3,
    explanation: "Trabzonspor’un kuruluş tarihi 2 Ağustos 1967’dir.",
  },
  {
    id: "turkish-09",
    category: "turkish",
    difficulty: "easy",
    question: "2009-10 Süper Lig sezonunun şampiyonu hangi kulüptü?",
    options: ["Bursaspor", "Fenerbahçe", "Galatasaray", "Beşiktaş"],
    answerIndex: 0,
    explanation:
      "Ertuğrul Sağlam yönetimindeki Bursaspor, sezonu 75 puanla zirvede tamamladı.",
  },
  {
    id: "turkish-10",
    category: "turkish",
    difficulty: "easy",
    question: "2019-20 Süper Lig sezonunun şampiyonu hangi kulüptü?",
    options: ["Trabzonspor", "İstanbul Başakşehir", "Beşiktaş", "Sivasspor"],
    answerIndex: 1,
    explanation:
      "Başakşehir, Okan Buruk yönetiminde 2019-20 sezonunda ilk lig şampiyonluğunu kazandı.",
  },
  {
    id: "turkish-11",
    category: "turkish",
    difficulty: "easy",
    question: "1959’da düzenlenen ilk Millî Lig’in şampiyonu hangi kulüptü?",
    options: ["Galatasaray", "Beşiktaş", "Fenerbahçe", "Karşıyaka"],
    answerIndex: 2,
    explanation:
      "Fenerbahçe, iki maçlı finalde Galatasaray’a karşı 0-1 ve 4-0’lık sonuçlarla şampiyon oldu.",
  },
  {
    id: "turkish-12",
    category: "turkish",
    difficulty: "easy",
    question:
      "Türkiye, 2002 Dünya Kupası’nın üçüncülük maçında hangi ülkeyi yendi?",
    options: ["Japonya", "Senegal", "Brezilya", "Güney Kore"],
    answerIndex: 3,
    explanation: "Türkiye, Daegu’da oynanan karşılaşmayı 3-2 kazandı.",
  },
  {
    id: "turkish-13",
    category: "turkish",
    difficulty: "easy",
    question:
      "Galatasaray’ın 2000 UEFA Kupası finalindeki rakibi hangi kulüptü?",
    options: ["Arsenal", "Leeds United", "Real Madrid", "Borussia Dortmund"],
    answerIndex: 0,
    explanation:
      "Arsenal ile oynanan finalin normal süresi ve uzatmaları golsüz tamamlandı.",
  },
  {
    id: "turkish-14",
    category: "turkish",
    difficulty: "easy",
    question:
      "Türkiye, EURO 2008 çeyrek finalinde hangi ülkeyi penaltılarla eledi?",
    options: ["Çek Cumhuriyeti", "Hırvatistan", "İsviçre", "Portekiz"],
    answerIndex: 1,
    explanation:
      "Semih Şentürk’ün uzatmalardaki beraberlik golünün ardından Türkiye penaltıları 3-1 kazandı.",
  },
  {
    id: "turkish-15",
    category: "turkish",
    difficulty: "medium",
    question:
      "Türkiye’nin ilk kez katıldığı EURO 1996’da teknik direktörü kimdi?",
    options: ["Şenol Güneş", "Mustafa Denizli", "Fatih Terim", "Sepp Piontek"],
    answerIndex: 2,
    explanation:
      "Fatih Terim yönetimindeki Türkiye, 1996’da İngiltere’de ilk Avrupa Şampiyonası finallerini oynadı.",
  },
  {
    id: "turkish-16",
    category: "turkish",
    difficulty: "medium",
    question:
      "Türkiye’yi 2002 Dünya Kupası üçüncülüğüne taşıyan teknik direktör kimdi?",
    options: ["Fatih Terim", "Mustafa Denizli", "Ersun Yanal", "Şenol Güneş"],
    answerIndex: 3,
    explanation:
      "Şenol Güneş’in takımı, 2002’de çeyrek finalde Senegal’i altın golle eledi.",
  },
  {
    id: "turkish-17",
    category: "turkish",
    difficulty: "medium",
    question: "EURO 2008’de Türkiye’nin teknik direktörü kimdi?",
    options: ["Fatih Terim", "Şenol Güneş", "Abdullah Avcı", "Mustafa Denizli"],
    answerIndex: 0,
    explanation:
      "Terim yönetimindeki Türkiye, İsviçre, Çek Cumhuriyeti ve Hırvatistan maçlarında geri döndü.",
  },
  {
    id: "turkish-18",
    category: "turkish",
    difficulty: "medium",
    question:
      "2002 Dünya Kupası üçüncülük maçında Güney Kore’ye ilk dakikada gol atan Türk oyuncu kimdi?",
    options: ["İlhan Mansız", "Hakan Şükür", "Hasan Şaş", "Ümit Davala"],
    answerIndex: 1,
    explanation:
      "Hakan Şükür’ün golünün ardından Türkiye’nin diğer iki golünü İlhan Mansız attı.",
  },
  {
    id: "turkish-19",
    category: "turkish",
    difficulty: "medium",
    question:
      "1987-88 sezonundaki 39 lig golüyle Avrupa Altın Ayakkabı ödülünü kazanan Türk oyuncu kimdi?",
    options: ["Metin Oktay", "Hakan Şükür", "Tanju Çolak", "Aykut Kocaman"],
    answerIndex: 2,
    explanation:
      "Galatasaraylı Tanju Çolak, bu performansıyla Altın Ayakkabı ödülünün sahibi oldu.",
  },
  {
    id: "turkish-20",
    category: "turkish",
    difficulty: "medium",
    question:
      "Galatasaray, 1988-89 Avrupa Şampiyon Kulüpler Kupası çeyrek finalinde kimi eledi?",
    options: ["Celtic", "Rapid Wien", "Neuchâtel Xamax", "Monaco"],
    answerIndex: 3,
    explanation:
      "Galatasaray, Monaco’yu ilk maçtaki 1-0 ve Köln’deki rövanşta alınan 1-1’lik sonuçlarla geçti.",
  },
  {
    id: "turkish-21",
    category: "turkish",
    difficulty: "medium",
    question:
      "2010-11 Süper Lig sezonunu gol kralı olarak tamamlayan futbolcu kimdi?",
    options: ["Alex de Souza", "Burak Yılmaz", "Mamadou Niang", "Milan Baroš"],
    answerIndex: 0,
    explanation:
      "Fenerbahçeli Alex de Souza, 2010-11 lig sezonunda 28 gol kaydetti.",
  },
  {
    id: "turkish-22",
    category: "turkish",
    difficulty: "medium",
    question: "Türkiye, 2002 Dünya Kupası son 16 turunda hangi ülkeyi eledi?",
    options: ["Güney Kore", "Japonya", "Çin", "Kosta Rika"],
    answerIndex: 1,
    explanation:
      "Ümit Davala’nın kafa golü, Türkiye’ye Japonya karşısında 1-0’lık galibiyet getirdi.",
  },
  {
    id: "turkish-23",
    category: "turkish",
    difficulty: "medium",
    question: "Türkiye, 2002 Dünya Kupası çeyrek finalinde hangi ülkeyi eledi?",
    options: ["Kamerun", "Nijerya", "Senegal", "Gana"],
    answerIndex: 2,
    explanation:
      "İlhan Mansız’ın altın golüyle Türkiye, Senegal’i 1-0 yenerek yarı finale yükseldi.",
  },
  {
    id: "turkish-24",
    category: "turkish",
    difficulty: "medium",
    question:
      "Türkiye’nin 2002 Dünya Kupası yarı finalindeki rakibi hangi ülkeydi?",
    options: ["Almanya", "İspanya", "Arjantin", "Brezilya"],
    answerIndex: 3,
    explanation: "Brezilya, Ronaldo’nun golüyle yarı finali 1-0 kazandı.",
  },
  {
    id: "turkish-25",
    category: "turkish",
    difficulty: "medium",
    question:
      "Türkiye, EURO 2008’de 2-0 geriden gelip 3-2 kazandığı son grup maçını kime karşı oynadı?",
    options: ["Çek Cumhuriyeti", "İsviçre", "Hırvatistan", "Portekiz"],
    answerIndex: 0,
    explanation:
      "Arda Turan’ın golünü Nihat Kahveci’nin iki golü izledi ve Türkiye çeyrek finale çıktı.",
  },
  {
    id: "turkish-26",
    category: "turkish",
    difficulty: "medium",
    question: "Türkiye’nin EURO 2008 yarı finalindeki rakibi hangi ülkeydi?",
    options: ["İspanya", "Almanya", "Rusya", "İtalya"],
    answerIndex: 1,
    explanation:
      "Türkiye’nin Uğur Boral ve Semih Şentürk ile gol bulduğu karşılaşmayı Almanya 3-2 kazandı.",
  },
  {
    id: "turkish-27",
    category: "turkish",
    difficulty: "medium",
    question:
      "Türkiye, 2003 FIFA Konfederasyonlar Kupası’nı kaçıncı sırada tamamladı?",
    options: ["Birinci", "İkinci", "Üçüncü", "Dördüncü"],
    answerIndex: 2,
    explanation: "Türkiye, üçüncülük maçında Kolombiya’yı 2-1 mağlup etti.",
  },
  {
    id: "turkish-28",
    category: "turkish",
    difficulty: "hard",
    question:
      "Türkiye erkek A Millî Takımı, 26 Ekim 1923’teki ilk maçını hangi ülkeye karşı oynadı?",
    options: ["Bulgaristan", "Yugoslavya", "Macaristan", "Romanya"],
    answerIndex: 3,
    explanation:
      "İstanbul’daki Taksim Stadı’nda oynanan ilk millî maç 2-2 sona erdi.",
  },
  {
    id: "turkish-29",
    category: "turkish",
    difficulty: "hard",
    question: "Türkiye erkek A Millî Takımı’nın 1923’teki ilk golünü kim attı?",
    options: [
      "Zeki Rıza Sporel",
      "Lefter Küçükandonyadis",
      "Nihat Bekdik",
      "Burhan Sargın",
    ],
    answerIndex: 0,
    explanation:
      "Zeki Rıza Sporel, Romanya ile 2-2 biten ilk maçta Türkiye’nin iki golünü de attı.",
  },
  {
    id: "turkish-30",
    category: "turkish",
    difficulty: "hard",
    question:
      "1954 Dünya Kupası finallerinde Türkiye’nin teknik direktörü kimdi?",
    options: ["Ignác Molnár", "Sandro Puppo", "Gündüz Kılıç", "Cihat Arman"],
    answerIndex: 1,
    explanation:
      "İtalyan teknik direktör Sandro Puppo, Türkiye’nin 1954 Dünya Kupası kadrosunu yönetti.",
  },
  {
    id: "turkish-31",
    category: "turkish",
    difficulty: "hard",
    question:
      "Türkiye, 1954 Dünya Kupası’na katılabilmek için Roma’daki karar maçının ardından hangi ülkeyi kurayla geçti?",
    options: ["Portekiz", "İtalya", "İspanya", "Yunanistan"],
    answerIndex: 2,
    explanation:
      "17 Mart 1954’teki karar maçı uzatmalarla 2-2 bitince katılım hakkı kurayla belirlendi.",
  },
  {
    id: "turkish-32",
    category: "turkish",
    difficulty: "hard",
    question:
      "1975-76 sezonunda, 1959’da başlayan ulusal ligde İstanbul dışından ilk şampiyon olan kulüp hangisiydi?",
    options: ["Bursaspor", "Eskişehirspor", "Göztepe", "Trabzonspor"],
    answerIndex: 3,
    explanation:
      "Trabzonspor, 1975-76 sezonunu 43 puanla tamamlayarak lig şampiyonu oldu.",
  },
  {
    id: "turkish-33",
    category: "turkish",
    difficulty: "hard",
    question:
      "1966-67 Türkiye 1. Futbol Ligi sezonunun şampiyonu hangi kulüptü?",
    options: ["Beşiktaş", "Galatasaray", "Fenerbahçe", "Altay"],
    answerIndex: 0,
    explanation:
      "Beşiktaş, 1965-66’nın ardından 1966-67 sezonunda da lig şampiyonluğunu kazandı.",
  },
  {
    id: "turkish-34",
    category: "turkish",
    difficulty: "hard",
    question:
      "1991-92 Türkiye 1. Futbol Ligi’ni yenilgisiz şampiyon tamamlayan takım hangisiydi?",
    options: ["Fenerbahçe", "Beşiktaş", "Galatasaray", "Trabzonspor"],
    answerIndex: 1,
    explanation:
      "Beşiktaş, o sezon 30 lig maçında 23 galibiyet ve yedi beraberlik aldı.",
  },
  {
    id: "turkish-35",
    category: "turkish",
    difficulty: "hard",
    question:
      "Beşiktaş, 15 Ekim 1989’daki lig maçında hangi takımı 10-0 yendi?",
    options: ["Adanaspor", "Samsunspor", "Adana Demirspor", "Boluspor"],
    answerIndex: 2,
    explanation:
      "Maçta Ali Gültiken dört, Metin Tekin ve Feyyaz Uçar üçer gol attı.",
  },
  {
    id: "turkish-36",
    category: "turkish",
    difficulty: "hard",
    question:
      "Fenerbahçe’yi 2007-08 Şampiyonlar Ligi çeyrek finalinde hangi kulüp eledi?",
    options: ["Sevilla", "Inter", "Manchester United", "Chelsea"],
    answerIndex: 3,
    explanation:
      "Fenerbahçe İstanbul’da 2-1 kazandı; Chelsea Londra’daki rövanşı 2-0 kazandı.",
  },
  {
    id: "turkish-37",
    category: "turkish",
    difficulty: "hard",
    question:
      "Fenerbahçe’yi 2012-13 UEFA Avrupa Ligi yarı finalinde hangi kulüp eledi?",
    options: ["Benfica", "Chelsea", "Lazio", "Viktoria Plzeň"],
    answerIndex: 0,
    explanation:
      "Fenerbahçe ilk maçı 1-0 kazandı; Benfica rövanşı 3-1 kazanarak finale çıktı.",
  },
  {
    id: "turkish-38",
    category: "turkish",
    difficulty: "hard",
    question:
      "Beşiktaş’ı 2016-17 UEFA Avrupa Ligi çeyrek finalinde penaltılarla hangi kulüp eledi?",
    options: ["Olympiakos", "Lyon", "Ajax", "Manchester United"],
    answerIndex: 1,
    explanation:
      "İki maç da ev sahibi lehine 2-1 bitti; Lyon, İstanbul’daki penaltı atışlarını 7-6 kazandı.",
  },
  {
    id: "turkish-39",
    category: "turkish",
    difficulty: "hard",
    question:
      "Galatasaray, 1999-2000 UEFA Kupası yarı finalinde hangi İngiliz kulübünü eledi?",
    options: ["Arsenal", "Chelsea", "Leeds United", "Liverpool"],
    answerIndex: 2,
    explanation:
      "Galatasaray, İstanbul’da 2-0 kazandıktan sonra İngiltere’de 2-2 berabere kalarak finale çıktı.",
  },
  {
    id: "turkish-40",
    category: "turkish",
    difficulty: "hard",
    question:
      "İlk kez 1962-63 sezonunda düzenlenen Türkiye Kupası’nı hangi kulüp kazandı?",
    options: ["Fenerbahçe", "Beşiktaş", "Altay", "Galatasaray"],
    answerIndex: 3,
    explanation:
      "Galatasaray, ilk Türkiye Kupası finalinde Fenerbahçe’yi iki maçta da 2-1 yendi.",
  },
];
