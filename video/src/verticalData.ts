export interface WordTiming {
  text: string;
  offset_sec: number;
  duration_sec: number;
}

export interface VerticalSceneVoiceover {
  id: string;
  text: string;
  audioDurationSec: number;
  durationInFrames: number;
  startFrame: number;
  words: WordTiming[];
}

// Generated with edge-tts (voice: tr-TR-AhmetNeural, rate: +5%)
export const VERTICAL_VOICEOVER_DATA: Record<string, VerticalSceneVoiceover> = {
  scene1: {
    id: "vo-scene1",
    text: "Futbolu seviyorsun. Peki ne kadar biliyorsun? Futbol hafızanı şimdi sahaya çıkar.",
    audioDurationSec: 8.328,
    durationInFrames: 255, // 8.5s
    startFrame: 0,
    words: [
      { text: "Futbolu", offset_sec: 0.098, duration_sec: 0.631 },
      { text: "seviyorsun.", offset_sec: 0.729, duration_sec: 0.69 },
      { text: "Peki", offset_sec: 2.452, duration_sec: 0.286 },
      { text: "ne", offset_sec: 2.762, duration_sec: 0.131 },
      { text: "kadar", offset_sec: 2.893, duration_sec: 0.357 },
      { text: "biliyorsun?", offset_sec: 3.25, duration_sec: 0.643 },
      { text: "Futbol", offset_sec: 4.952, duration_sec: 0.607 },
      { text: "hafızanı", offset_sec: 5.56, duration_sec: 0.536 },
      { text: "şimdi", offset_sec: 6.095, duration_sec: 0.333 },
      { text: "sahaya", offset_sec: 6.429, duration_sec: 0.393 },
      { text: "çıkar.", offset_sec: 6.821, duration_sec: 0.405 },
    ],
  },
  scene2: {
    id: "vo-scene2",
    text: "GolBilgi'de beş kategori, yüz altmış özgün soru seni bekliyor. Kulüpler, futbolcular, kupalar ve Türk futbolu.",
    audioDurationSec: 9.144,
    durationInFrames: 276, // 9.2s
    startFrame: 245,
    words: [
      { text: "GolBilgi'de", offset_sec: 0.098, duration_sec: 0.94 },
      { text: "beş", offset_sec: 1.038, duration_sec: 0.25 },
      { text: "kategori,", offset_sec: 1.288, duration_sec: 0.548 },
      { text: "yüz", offset_sec: 2.002, duration_sec: 0.238 },
      { text: "altmış", offset_sec: 2.24, duration_sec: 0.333 },
      { text: "özgün", offset_sec: 2.574, duration_sec: 0.321 },
      { text: "soru", offset_sec: 2.895, duration_sec: 0.274 },
      { text: "seni", offset_sec: 3.169, duration_sec: 0.262 },
      { text: "bekliyor.", offset_sec: 3.431, duration_sec: 0.488 },
      { text: "Kulüpler,", offset_sec: 5.06, duration_sec: 0.619 },
      { text: "futbolcular,", offset_sec: 5.821, duration_sec: 0.738 },
      { text: "kupalar", offset_sec: 6.738, duration_sec: 0.452 },
      { text: "ve", offset_sec: 7.19, duration_sec: 0.107 },
      { text: "Türk", offset_sec: 7.31, duration_sec: 0.262 },
      { text: "futbolu.", offset_sec: 7.571, duration_sec: 0.476 },
    ],
  },
  scene3: {
    id: "vo-scene3",
    text: "Her soruya on beş saniye. Hızlı ol, doğru şıkkı seç ve biliyor muydun köşesini keşfet.",
    audioDurationSec: 7.56,
    durationInFrames: 234, // 7.8s
    startFrame: 511,
    words: [
      { text: "Her", offset_sec: 0.098, duration_sec: 0.369 },
      { text: "soruya", offset_sec: 0.49, duration_sec: 0.369 },
      { text: "on", offset_sec: 0.871, duration_sec: 0.25 },
      { text: "beş", offset_sec: 1.121, duration_sec: 0.167 },
      { text: "saniye.", offset_sec: 1.288, duration_sec: 0.488 },
      { text: "Hızlı", offset_sec: 2.845, duration_sec: 0.476 },
      { text: "ol,", offset_sec: 3.333, duration_sec: 0.262 },
      { text: "doğru", offset_sec: 3.762, duration_sec: 0.309 },
      { text: "şıkkı", offset_sec: 4.071, duration_sec: 0.31 },
      { text: "seç", offset_sec: 4.381, duration_sec: 0.286 },
      { text: "ve", offset_sec: 4.679, duration_sec: 0.119 },
      { text: "biliyor", offset_sec: 4.798, duration_sec: 0.405 },
      { text: "muydun", offset_sec: 5.202, duration_sec: 0.298 },
      { text: "köşesini", offset_sec: 5.5, duration_sec: 0.5 },
      { text: "keşfet.", offset_sec: 6.0, duration_sec: 0.464 },
    ],
  },
  scene4: {
    id: "vo-scene4",
    text: "Klasik on soru ya da altmış saniye zamana karşı. Kolay, orta ve zor seviyeler.",
    audioDurationSec: 6.96,
    durationInFrames: 216, // 7.2s
    startFrame: 735,
    words: [
      { text: "Klasik", offset_sec: 0.098, duration_sec: 0.536 },
      { text: "on", offset_sec: 0.633, duration_sec: 0.202 },
      { text: "soru", offset_sec: 0.836, duration_sec: 0.274 },
      { text: "ya", offset_sec: 1.11, duration_sec: 0.095 },
      { text: "da", offset_sec: 1.205, duration_sec: 0.119 },
      { text: "altmış", offset_sec: 1.336, duration_sec: 0.381 },
      { text: "saniye", offset_sec: 1.717, duration_sec: 0.417 },
      { text: "zamana", offset_sec: 2.133, duration_sec: 0.333 },
      { text: "karşı.", offset_sec: 2.467, duration_sec: 0.488 },
      { text: "Kolay,", offset_sec: 4.048, duration_sec: 0.476 },
      { text: "orta", offset_sec: 4.643, duration_sec: 0.298 },
      { text: "ve", offset_sec: 4.952, duration_sec: 0.119 },
      { text: "zor", offset_sec: 5.071, duration_sec: 0.25 },
      { text: "seviyeler.", offset_sec: 5.321, duration_sec: 0.548 },
    ],
  },
  scene5: {
    id: "vo-scene5",
    text: "Doğru cevap, hız bonusu, seri bonusu. Rekorunu kır, zirveye adını yazdır.",
    audioDurationSec: 7.128,
    durationInFrames: 222, // 7.4s
    startFrame: 941,
    words: [
      { text: "Doğru", offset_sec: 0.098, duration_sec: 0.464 },
      { text: "cevap,", offset_sec: 0.562, duration_sec: 0.405 },
      { text: "hız", offset_sec: 1.121, duration_sec: 0.226 },
      { text: "bonusu,", offset_sec: 1.348, duration_sec: 0.464 },
      { text: "seri", offset_sec: 1.967, duration_sec: 0.31 },
      { text: "bonusu.", offset_sec: 2.276, duration_sec: 0.44 },
      { text: "Rekorunu", offset_sec: 3.821, duration_sec: 0.667 },
      { text: "kır,", offset_sec: 4.488, duration_sec: 0.238 },
      { text: "zirveye", offset_sec: 4.881, duration_sec: 0.429 },
      { text: "adını", offset_sec: 5.31, duration_sec: 0.286 },
      { text: "yazdır.", offset_sec: 5.595, duration_sec: 0.417 },
    ],
  },
  scene6: {
    id: "vo-scene6",
    text: "Telefonunda, istediğin yerde. Üyeliksiz ve ücretsiz mobil deneyim.",
    audioDurationSec: 6.312,
    durationInFrames: 198, // 6.6s
    startFrame: 1153,
    words: [
      { text: "Telefonunda,", offset_sec: 0.098, duration_sec: 0.774 },
      { text: "istediğin", offset_sec: 1.05, duration_sec: 0.5 },
      { text: "yerde.", offset_sec: 1.55, duration_sec: 0.405 },
      { text: "Üyeliksiz", offset_sec: 3.036, duration_sec: 0.798 },
      { text: "ve", offset_sec: 3.833, duration_sec: 0.119 },
      { text: "ücretsiz", offset_sec: 3.964, duration_sec: 0.559 },
      { text: "mobil", offset_sec: 4.524, duration_sec: 0.321 },
      { text: "deneyim.", offset_sec: 4.845, duration_sec: 0.393 },
    ],
  },
  scene7: {
    id: "vo-scene7",
    text: "GolBilgi. Bilginle sahaya çık.",
    audioDurationSec: 4.296,
    durationInFrames: 159, // 5.3s
    startFrame: 1341,
    words: [
      { text: "GolBilgi.", offset_sec: 0.098, duration_sec: 0.714 },
      { text: "Bilginle", offset_sec: 1.81, duration_sec: 0.679 },
      { text: "sahaya", offset_sec: 2.488, duration_sec: 0.429 },
      { text: "çık.", offset_sec: 2.917, duration_sec: 0.274 },
    ],
  },
};
