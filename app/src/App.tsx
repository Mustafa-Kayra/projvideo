import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Copy,
  Flag,
  Flame,
  Home,
  Medal,
  RotateCcw,
  Shield,
  Shuffle,
  Sparkles,
  Target,
  Timer,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { questions, type Difficulty } from "./data/questions";
import {
  advanceGame,
  answerGame,
  createGame,
  difficultyLabels,
  getStats,
  modeLabels,
  multipliers,
  tickGame,
  type CategorySelection,
  type Game,
  type Mode,
  type Settings,
} from "./game";
import {
  persistRecords,
  readRecords,
  STORAGE_KEY,
  updateRecords,
  type ScoreRecord,
} from "./records";

const categories = [
  {
    id: "clubs",
    name: "Kulüpler",
    description: "Armanın ardındaki hikâyeler.",
    icon: Shield,
    color: "mint",
    detail: "Kuruluşlar, stadyumlar, şehirler ve efsaneleşen kulüpler.",
  },
  {
    id: "players",
    name: "Futbolcular",
    description: "Sahanın unutulmaz isimleri.",
    icon: Users,
    color: "blue",
    detail: "Efsaneler, unutulmaz kariyerler ve futbol tarihine geçen anlar.",
  },
  {
    id: "winners",
    name: "Kupa Kazananlar",
    description: "Zaferleri hatırlıyor musun?",
    icon: Trophy,
    color: "gold",
    detail: "Dünya Kupası, Şampiyonlar Ligi ve tarihe yazılan zaferler.",
  },
  {
    id: "turkish",
    name: "Türk Futbolu",
    description: "Bizim futbolumuz, bizim tarihimiz.",
    icon: Flag,
    color: "coral",
    detail: "Milli takım, Süper Lig ve hep birlikte yaşadığımız başarılar.",
  },
  {
    id: "mixed",
    name: "Karışık",
    description: "Her köşeden bir sürpriz.",
    icon: Shuffle,
    color: "purple",
    detail: "Dört kategorinin tamamından seçilen sorularla tam saha sınavı.",
  },
] as const;

function categoryInfo(id: CategorySelection) {
  return categories.find((category) => category.id === id)!;
}
function number(value: number) {
  return value.toLocaleString("tr-TR");
}
function loadRecords() {
  try {
    return readRecords(window.localStorage);
  } catch {
    return [];
  }
}

function Ball({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" fill="currentColor" />
      <g stroke="#183e2b" strokeWidth="1.2">
        <path d="m50 28 20 15-8 24H38l-8-24z" fill="#183e2b" />
        <path d="m50 28 1-24M70 43l25-6M62 67l15 23M38 67 23 90M30 43 5 37" />
        <path
          d="m24 12 3 15L9 34M75 12l-3 15 19 7M96 58 81 65l-1 21M51 96l-10-9H27M4 58l15 7 1 21"
          fill="#183e2b"
        />
      </g>
      <ellipse
        cx="36"
        cy="23"
        rx="20"
        ry="10"
        fill="white"
        opacity=".2"
        transform="rotate(-30 36 23)"
      />
    </svg>
  );
}

function PitchArt() {
  return (
    <div className="pitch-art" aria-hidden="true">
      <div className="stadium-glow" />
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <div className="pitch-plane">
        <div className="pitch-boundary">
          <div className="halfway" />
          <div className="center-circle" />
          <div className="penalty penalty-left" />
          <div className="penalty penalty-right" />
        </div>
      </div>
      <div className="ball-shadow" />
      <Ball className="hero-ball" />
      <span className="art-tag tag-top">
        <Sparkles size={13} /> Efsaneleri hatırla.
      </span>
      <span className="art-tag tag-bottom">
        <span className="live-dot" /> Şimdi sahne senin.
      </span>
      <span className="art-cross cross-one">+</span>
      <span className="art-cross cross-two">+</span>
      <span className="pitch-coordinate">41° 00′ N / FUTBOLUN KALBİ</span>
    </div>
  );
}

function App() {
  const [view, setView] = useState<"home" | "setup" | "game" | "records">(
    "home",
  );
  const [settings, setSettings] = useState<Settings>({
    category: "mixed",
    difficulty: "medium",
    mode: "classic",
  });
  const [game, setGame] = useState<Game | null>(null);
  const [now, setNow] = useState(Date.now());
  const [records, setRecords] = useState<ScoreRecord[]>(loadRecords);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [modal, setModal] = useState<"help" | "exit" | null>(null);
  const closeModal = useCallback(() => setModal(null), []);
  const modalTrigger = useRef<HTMLElement | null>(null);
  const openModal = useCallback((kind: "help" | "exit") => {
    modalTrigger.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setModal(kind);
  }, []);
  const [pendingView, setPendingView] = useState<"home" | "records">("home");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const savedGameId = useRef<string | null>(null);
  const finished = game?.phase === "finished";
  const playing = view === "game" && game !== null && !finished;

  useEffect(() => {
    try {
      window.localStorage.getItem(STORAGE_KEY);
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  }, []);

  useEffect(() => {
    function synchronize(event: StorageEvent) {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      try {
        const storage = window.localStorage;
        if (event.storageArea !== null && event.storageArea !== storage) return;
        setRecords(
          event.newValue === null
            ? readRecords(storage)
            : persistRecords(storage, records),
        );
        setStorageAvailable(true);
      } catch {
        setStorageAvailable(false);
      }
    }
    window.addEventListener("storage", synchronize);
    return () => window.removeEventListener("storage", synchronize);
  }, [records]);

  useEffect(() => {
    if (game?.phase !== "finished" || savedGameId.current === game.id) return;
    savedGameId.current = game.id;
    setModal(null);
    const next = updateRecords(records, game, new Date().toISOString()).records;
    try {
      setRecords(persistRecords(window.localStorage, next));
      setStorageAvailable(true);
    } catch {
      setRecords(next);
      setStorageAvailable(false);
    }
  }, [game, records]);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      const time = Date.now();
      setNow(time);
      setGame((previous) => (previous ? tickGame(previous, time) : previous));
    }, 100);
    return () => window.clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    if (
      !playing ||
      game?.settings.mode !== "timed" ||
      game.phase !== "feedback"
    )
      return;
    const timeout = window.setTimeout(
      () =>
        setGame((previous) =>
          previous ? advanceGame(previous, Date.now()) : previous,
        ),
      1700,
    );
    return () => window.clearTimeout(timeout);
  }, [
    playing,
    game?.phase,
    game?.cursor,
    game?.answers.length,
    game?.settings.mode,
  ]);

  useEffect(() => {
    if (!playing || game?.phase !== "question" || modal) return;
    const onKey = (event: KeyboardEvent) => {
      if (
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        !["1", "2", "3", "4"].includes(event.key)
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)
      )
        return;
      event.preventDefault();
      setGame((previous) =>
        previous
          ? answerGame(previous, Number(event.key) - 1, Date.now())
          : previous,
      );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, game?.phase, modal]);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view, finished]);

  function navigate(next: "home" | "records") {
    if (playing) {
      setPendingView(next);
      openModal("exit");
      return;
    }
    setView(next);
  }
  function chooseCategory(category: CategorySelection) {
    setSettings((previous) => ({ ...previous, category }));
    setView("setup");
  }
  function startGame() {
    const time = Date.now();
    setGame(createGame(settings, time));
    setNow(time);
    setView("game");
  }

  const maxScore = Math.max(0, ...records.map((record) => record.score));
  return (
    <MotionConfig reducedMotion="user">
      <div className={`app-shell${playing ? " is-playing" : ""}`}>
        <a className="skip-link" href="#main" inert={modal !== null}>
          İçeriğe geç
        </a>
        <aside className="sidebar" inert={modal !== null}>
          <button
            className="brand"
            onClick={() => navigate("home")}
            aria-label="GolBilgi ana sayfa"
          >
            <span className="brand-mark">
              <Ball />
            </span>
            <span>
              gol<span className="brand-light">bilgi</span>
              <span className="brand-period">.</span>
            </span>
          </button>
          <div className="sidebar-kicker">FUTBOL BİLGİNİN SAHASI</div>
          <nav className="main-nav" aria-label="Ana menü">
            <span className="nav-label">OYUN ALANI</span>
            <button
              className={view !== "records" ? "nav-item active" : "nav-item"}
              aria-current={view === "home" ? "page" : undefined}
              onClick={() => navigate("home")}
            >
              <Home size={19} />
              <span>Ana sayfa</span>
              <ChevronRight size={15} />
            </button>
            <button
              className={view === "records" ? "nav-item active" : "nav-item"}
              aria-current={view === "records" ? "page" : undefined}
              onClick={() => navigate("records")}
            >
              <Trophy size={19} />
              <span>Rekorlarım</span>
              {records.length > 0 && (
                <span className="nav-count">{records.length}</span>
              )}
            </button>
          </nav>
          <div className="sidebar-bottom">
            <div className="sidebar-note">
              <div className="tiny-pitch">
                <span />
              </div>
              <p>
                90 dakika tutku.
                <br />
                <strong>15 saniye karar.</strong>
              </p>
              <span>Bilgin, en iyi transferin.</span>
            </div>
            <button className="help-link" onClick={() => openModal("help")}>
              <CircleHelp size={17} /> Nasıl oynanır?
              <ArrowRight size={15} />
            </button>
            <div className="local-status">
              <span className="live-dot" /> Ücretsiz. Üyeliksiz. Tamamen futbol.
            </div>
          </div>
        </aside>
        <div className="main-wrap" inert={modal !== null}>
          <header className="topbar">
            <div className="breadcrumb">
              <span>GolBilgi</span>
              <ChevronRight size={13} />
              <strong>
                {view === "home"
                  ? "Başlama vuruşu"
                  : view === "setup"
                    ? "Maç hazırlığı"
                    : view === "records"
                      ? "Rekorlarım"
                      : finished
                        ? "Maç sonucu"
                        : "Oyun zamanı"}
              </strong>
            </div>
            <div className="topbar-status">
              <span className="live-dot" />
              <span>FUTBOL HİÇ BİTMEZ</span>
            </div>
          </header>
          <main id="main" tabIndex={-1}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view + (finished ? "-result" : "")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                onAnimationComplete={() =>
                  headingRef.current?.focus({ preventScroll: true })
                }
              >
                {view === "home" && (
                  <>
                    <div className="page-heading">
                      <div>
                        <div className="eyebrow">
                          <span className="small-line" /> BİLGİNLE SAHAYA ÇIK
                        </div>
                        <h1 ref={headingRef} tabIndex={-1}>
                          Hoş geldin, futbolsever
                          <span className="gold-text">.</span>
                        </h1>
                      </div>
                      <span className="season-badge">
                        <Flag size={13} /> FUTBOL TARİHİ / 2025’E KADAR
                      </span>
                    </div>
                    <section className="hero-card" aria-labelledby="hero-title">
                      <div className="hero-copy">
                        <span className="hero-kicker">
                          <span /> TRİBÜNLER HAZIR
                        </span>
                        <h2 id="hero-title">
                          Futbolu seviyorsun.
                          <br />
                          Peki, ne kadar
                          <br />
                          <em>biliyorsun?</em>
                        </h2>
                        <p>
                          Efsane isimler, unutulmaz finaller, büyük zaferler.
                          <br className="desktop-break" /> Futbol hafızanı
                          sahaya çıkar.
                        </p>
                        <button
                          className="button gold-button"
                          onClick={() => chooseCategory("mixed")}
                        >
                          Hemen oyna <ArrowRight size={19} />
                        </button>
                        <div className="hero-meta">
                          <span>
                            <Check size={14} /> Üyelik gerekmez
                          </span>
                          <span>
                            <Clock3 size={14} /> Birkaç dakika yeter
                          </span>
                        </div>
                      </div>
                      <PitchArt />
                    </section>
                    <section
                      className="categories-section"
                      aria-labelledby="categories-title"
                    >
                      <div className="section-heading">
                        <div>
                          <div className="eyebrow">HER MAÇ YENİ BİR HİKÂYE</div>
                          <h2 id="categories-title">
                            Sahanı seç<span className="gold-text">.</span>
                          </h2>
                        </div>
                        <span className="section-note">
                          Hangi konuda iddialısın? <ArrowDown size={15} />
                        </span>
                      </div>
                      <div className="category-grid">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            className={`category-card ${category.color}`}
                            onClick={() => chooseCategory(category.id)}
                          >
                            <span className="category-icon">
                              <category.icon size={25} strokeWidth={1.5} />
                            </span>
                            <span className="category-count">
                              {category.id === "mixed"
                                ? questions.length
                                : questions.filter(
                                    (question) =>
                                      question.category === category.id,
                                  ).length}{" "}
                              SORU
                            </span>
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                            <span className="category-arrow">
                              <ArrowRight size={19} />
                            </span>
                          </button>
                        ))}
                      </div>
                    </section>
                    <section className="home-bottom">
                      <div className="record-teaser">
                        <span className="record-icon">
                          <Medal size={25} />
                        </span>
                        <div>
                          <span className="eyebrow">KİŞİSEL REKORUN</span>
                          <strong>
                            {records.length
                              ? `${number(maxScore)} puan`
                              : "İlk rekorunu yaz."}
                          </strong>
                          <p>
                            {records.length
                              ? "Bir sonraki maçta daha iyisi neden olmasın?"
                              : "Her efsanenin bir başlangıç düdüğü var."}
                          </p>
                        </div>
                        <button
                          className="icon-button"
                          onClick={() => navigate("records")}
                          aria-label="Rekorlarımı gör"
                        >
                          <ArrowUpRightIcon />
                        </button>
                      </div>
                      <div className="how-teaser">
                        <span className="outline-icon">
                          <Zap size={21} />
                        </span>
                        <div>
                          <strong>Bilgi + hız + seri = daha çok puan.</strong>
                          <p>Doğruyu bul, hızlı davran, seriyi bozma.</p>
                        </div>
                        <button
                          onClick={() => openModal("help")}
                          aria-label="Puanlama kurallarını gör"
                        >
                          <CircleHelp size={19} />
                        </button>
                      </div>
                    </section>
                  </>
                )}
                {view === "setup" && (
                  <Setup
                    settings={settings}
                    setSettings={setSettings}
                    onBack={() => setView("home")}
                    onStart={startGame}
                    headingRef={headingRef}
                  />
                )}
                {view === "game" &&
                  game &&
                  (finished ? (
                    <Results
                      game={game}
                      isBest={records.some((record) => record.id === game.id)}
                      storageAvailable={storageAvailable}
                      onReplay={startGame}
                      onHome={() => setView("home")}
                      headingRef={headingRef}
                    />
                  ) : (
                    <GameScreen
                      game={game}
                      now={now}
                      onAnswer={(index) =>
                        setGame((previous) =>
                          previous
                            ? answerGame(previous, index, Date.now())
                            : previous,
                        )
                      }
                      onNext={() =>
                        setGame((previous) =>
                          previous
                            ? advanceGame(previous, Date.now())
                            : previous,
                        )
                      }
                      onExit={() => {
                        setPendingView("home");
                        openModal("exit");
                      }}
                      headingRef={headingRef}
                    />
                  ))}
                {view === "records" && (
                  <Records
                    records={records}
                    storageAvailable={storageAvailable}
                    onPlay={() => chooseCategory("mixed")}
                    headingRef={headingRef}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
          <footer className="page-footer">
            <span>Futbola aşkla, bilgiye merakla.</span>
            <span>
              GOLBİLGİ <span className="footer-dot">/</span> OYUN SENİN.
            </span>
          </footer>
        </div>
        {modal && (
          <Modal
            returnFocus={modalTrigger.current}
            title={
              modal === "help"
                ? "Başlama vuruşundan önce"
                : "Maçtan ayrılıyor musun?"
            }
            onClose={closeModal}
          >
            {modal === "help" ? (
              <>
                <p className="modal-intro">
                  Kategorini, modunu ve zorluğunu seç. Gerisi futbol hafızana
                  kalmış.
                </p>
                <div className="rule-row">
                  <Timer />
                  <div>
                    <strong>Her soruya 15 saniye.</strong>
                    <p>
                      Klasik modda 10 soru. Zamana karşı modda toplam 60 saniye;
                      geri bildirim süresi de buna dahil.
                    </p>
                  </div>
                </div>
                <div className="rule-row">
                  <Target />
                  <div>
                    <strong>Doğru cevap, büyük fark.</strong>
                    <p>
                      Kolay 100, orta 200, zor 300 puan. Kalan her tam saniye +5
                      puan. 3. doğruyla başlayan seri bonusu her adımda +25; en
                      fazla +125 puan.
                    </p>
                  </div>
                </div>
                <div className="rule-row">
                  <BookOpen />
                  <div>
                    <strong>Her soruda yeni bir hikâye.</strong>
                    <p>
                      Yanlışlar puan götürmez ama seriyi sıfırlar. Sonuçta
                      yanlışlarını tekrar görebilirsin. Klavyede 1–4 ile şık
                      seçebilirsin.
                    </p>
                  </div>
                </div>
                <p className="muted small">
                  Rekorlar yalnızca bu tarayıcıda saklanır. Zamana karşı modda
                  seçili soru havuzu biterse yeniden karıştırılır.
                </p>
                <button
                  className="button gold-button full-width"
                  onClick={closeModal}
                >
                  Anlaşıldı, hazırım <Check size={18} />
                </button>
              </>
            ) : (
              <>
                <p className="modal-intro">
                  Bu maçın ilerlemesi ve puanı kaydedilmeyecek. Zamanlayıcı
                  durmaz.
                </p>
                <div className="modal-actions">
                  <button
                    className="button secondary-button"
                    onClick={closeModal}
                  >
                    Oyuna dön
                  </button>
                  <button
                    className="button gold-button"
                    onClick={() => {
                      setModal(null);
                      setGame(null);
                      setView(pendingView);
                    }}
                  >
                    Evet, ayrıl <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}
          </Modal>
        )}
      </div>
    </MotionConfig>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={20} style={{ transform: "rotate(-45deg)" }} />;
}
type HeadingRef = React.RefObject<HTMLHeadingElement | null>;

function Setup({
  settings,
  setSettings,
  onBack,
  onStart,
  headingRef,
}: {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  onBack: () => void;
  onStart: () => void;
  headingRef: HeadingRef;
}) {
  const category = categoryInfo(settings.category);
  const pool = questions.filter(
    (question) =>
      question.difficulty === settings.difficulty &&
      (settings.category === "mixed" ||
        question.category === settings.category),
  ).length;
  return (
    <div className="setup-page narrow-page">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} /> Kategorilere dön
      </button>
      <div className="page-heading">
        <div>
          <div className="eyebrow">SOYUNMA ODASI</div>
          <h1 ref={headingRef} tabIndex={-1}>
            Maça hazır mısın<span className="gold-text">?</span>
          </h1>
          <p className="page-description">
            Kendi oyununu kur. Son düdüğe kadar bilgin konuşsun.
          </p>
        </div>
      </div>
      <div className="setup-layout">
        <section className="setup-options">
          <fieldset>
            <legend>
              <span className="step-number">01</span> Kategorin
            </legend>
            <div className="category-chips">
              {categories.map((item) => (
                <button
                  key={item.id}
                  className={`category-chip ${item.id === settings.category ? "selected" : ""}`}
                  aria-pressed={item.id === settings.category}
                  onClick={() =>
                    setSettings((previous) => ({
                      ...previous,
                      category: item.id,
                    }))
                  }
                >
                  <item.icon size={17} />
                  {item.name}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span className="step-number">02</span> Oyun modun
            </legend>
            <div className="mode-options">
              {(
                [
                  {
                    mode: "classic",
                    icon: Target,
                    title: "Klasik",
                    text: "10 soru. Tek hedef: en iyi skorun.",
                    badge: "10 SORU",
                  },
                  {
                    mode: "timed",
                    icon: Timer,
                    title: "Zamana karşı",
                    text: "60 saniyede kaç doğru yapabilirsin?",
                    badge: "60 SANİYE",
                  },
                ] as const
              ).map((item) => (
                <button
                  key={item.mode}
                  className={`mode-card ${settings.mode === item.mode ? "selected" : ""}`}
                  aria-pressed={settings.mode === item.mode}
                  onClick={() =>
                    setSettings((previous) => ({
                      ...previous,
                      mode: item.mode,
                    }))
                  }
                >
                  <span className="mode-card-top">
                    <item.icon size={23} />
                    <span className="radio-dot">
                      {settings.mode === item.mode && <span />}
                    </span>
                  </span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                  <span className="mode-badge">{item.badge}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span className="step-number">03</span> Zorluk seviyen
            </legend>
            <div className="difficulty-options">
              {(["easy", "medium", "hard"] as Difficulty[]).map(
                (difficulty, index) => (
                  <button
                    key={difficulty}
                    className={`difficulty-button ${settings.difficulty === difficulty ? "selected" : ""}`}
                    aria-pressed={settings.difficulty === difficulty}
                    onClick={() =>
                      setSettings((previous) => ({ ...previous, difficulty }))
                    }
                  >
                    <span className="difficulty-bars">
                      {[0, 1, 2].map((bar) => (
                        <i key={bar} className={bar <= index ? "filled" : ""} />
                      ))}
                    </span>
                    <strong>{difficultyLabels[difficulty]}</strong>
                    <span>×{multipliers[difficulty]} puan</span>
                  </button>
                ),
              )}
            </div>
          </fieldset>
        </section>
        <aside className="match-ticket">
          <div className="eyebrow">MAÇ BİLETİN</div>
          <div className={`ticket-icon ${category.color}`}>
            <category.icon size={36} strokeWidth={1.4} />
          </div>
          <h2>{category.name}</h2>
          <p>{category.detail}</p>
          <div className="ticket-divider" />
          <dl>
            <div>
              <dt>Oyun modu</dt>
              <dd>{modeLabels[settings.mode]}</dd>
            </div>
            <div>
              <dt>Zorluk</dt>
              <dd>
                {difficultyLabels[settings.difficulty]}{" "}
                <span className="gold-text">
                  ×{multipliers[settings.difficulty]}
                </span>
              </dd>
            </div>
            <div>
              <dt>
                {settings.mode === "classic" ? "Toplam soru" : "Toplam süre"}
              </dt>
              <dd>{settings.mode === "classic" ? "10 soru" : "60 saniye"}</dd>
            </div>
            <div>
              <dt>Soru başına</dt>
              <dd>15 saniye</dd>
            </div>
          </dl>
          <button className="button gold-button full-width" onClick={onStart}>
            Başlama vuruşu <ArrowRight size={19} />
          </button>
          <span className="ticket-footer">
            <Shield size={12} /> {pool} soruluk havuzdan rastgele seçim
          </span>
        </aside>
      </div>
    </div>
  );
}

function GameScreen({
  game,
  now,
  onAnswer,
  onNext,
  onExit,
  headingRef,
}: {
  game: Game;
  now: number;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onExit: () => void;
  headingRef: HeadingRef;
}) {
  const question = game.deck[game.cursor];
  const category = categoryInfo(game.settings.category);
  const feedback = game.phase === "feedback";
  const answer = game.answers.at(-1);
  const seconds = Math.max(
    0,
    Math.ceil(
      (Math.min(game.questionDeadline, game.globalDeadline ?? Infinity) - now) /
        1000,
    ),
  );
  const totalSeconds = game.globalDeadline
    ? Math.max(0, Math.ceil((game.globalDeadline - now) / 1000))
    : null;
  const currentRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    currentRef.current?.focus({ preventScroll: true });
    if (!feedback && game.answers.length > 0)
      currentRef.current?.scrollIntoView({ block: "nearest" });
  }, [game.cursor, game.answers.length, feedback]);
  return (
    <div className="game-page narrow-page">
      <div className="game-topline">
        <span className="game-category">
          <category.icon size={18} />
          {category.name}
          <span className="separator-dot">·</span>
          {difficultyLabels[game.settings.difficulty]}
        </span>
        <button className="quiet-button" onClick={onExit}>
          <X size={17} /> <span>Maçtan ayrıl</span>
        </button>
      </div>
      <div className="game-scoreboard">
        <div>
          <span className="eyebrow">
            {modeLabels[game.settings.mode].toLocaleUpperCase("tr-TR")}
          </span>
          <h1 ref={headingRef} tabIndex={-1}>
            Şimdi bilgi zamanı<span className="gold-text">.</span>
          </h1>
        </div>
        <div className="scoreboard-stats">
          <div>
            <span>PUAN</span>
            <strong>{number(game.score)}</strong>
          </div>
          <div
            className={game.streak >= 3 ? "streak-stat on-fire" : "streak-stat"}
          >
            <span>
              <Flame size={12} /> SERİ
            </span>
            <strong>
              {game.streak}
              <small> doğru</small>
            </strong>
          </div>
          {totalSeconds !== null && (
            <div className={totalSeconds <= 10 ? "danger-text" : ""}>
              <span>MAÇ SÜRESİ</span>
              <strong>
                {totalSeconds}
                <small> sn</small>
              </strong>
            </div>
          )}
        </div>
      </div>
      <div className="question-progress">
        <div className="progress-meta">
          <span>
            {game.settings.mode === "classic" ? (
              <>
                SORU{" "}
                <strong>
                  {Math.min(game.answers.length + (feedback ? 0 : 1), 10)
                    .toString()
                    .padStart(2, "0")}
                </strong>{" "}
                / 10
              </>
            ) : (
              <>
                SORU <strong>{game.answers.length + (feedback ? 0 : 1)}</strong>
              </>
            )}{" "}
          </span>
          <span>
            {game.settings.mode === "classic"
              ? "Her soru, yeni bir fırsat."
              : "Tempo sende. Zaman akıyor."}
          </span>
        </div>
        <div className="progress-track">
          <span
            style={{
              width: `${game.settings.mode === "classic" ? (game.answers.length + (feedback ? 0 : 1)) * 10 : ((60 - (totalSeconds ?? 0)) / 60) * 100}%`,
            }}
          />
        </div>
      </div>
      <section className="question-card" aria-labelledby="question-title">
        <div className="question-card-meta">
          <span className="question-type">
            <BookOpen size={14} /> {categoryInfo(question.category).name}
          </span>
          <div
            className={`question-timer ${seconds <= 5 && !feedback ? "urgent" : ""}`}
            role="timer"
            aria-label={`Soru için kalan süre: ${seconds} saniye`}
          >
            <Clock3 size={18} />
            <strong>
              {feedback ? "—" : seconds.toString().padStart(2, "0")}
            </strong>
            <span>sn</span>
          </div>
        </div>
        <h2 id="question-title" ref={currentRef} tabIndex={-1}>
          {question.question}
        </h2>
        <div className="answer-grid">
          {question.options.map((option, index) => {
            const isCorrect = feedback && index === question.answerIndex;
            const isWrong =
              feedback && answer?.selectedIndex === index && !answer.correct;
            return (
              <button
                key={`${question.id}-${index}-${game.answers.length}`}
                className={`answer-button ${isCorrect ? "correct" : ""} ${isWrong ? "incorrect" : ""}`}
                onClick={() => onAnswer(index)}
                disabled={feedback}
                aria-label={`${index + 1}. ${option}${isCorrect ? ", doğru cevap" : ""}${isWrong ? ", yanlış cevabın" : ""}`}
              >
                <span className="answer-key">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
                {isCorrect ? (
                  <Check className="answer-state" size={20} />
                ) : isWrong ? (
                  <X className="answer-state" size={20} />
                ) : (
                  <kbd>{index + 1}</kbd>
                )}
              </button>
            );
          })}
        </div>
        {feedback && answer && (
          <motion.div
            className={`answer-feedback ${answer.correct ? "feedback-correct" : "feedback-incorrect"}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
          >
            <div className="feedback-title">
              <strong>
                {answer.correct
                  ? "Gol! Harika cevap."
                  : answer.selectedIndex === null
                    ? "Süre doldu. Bir sonraki top senin."
                    : "Bu kez direkten döndü."}
              </strong>
              <span>
                {answer.correct ? `+${answer.points} PUAN` : "0 PUAN"}
              </span>
            </div>
            {!answer.correct && (
              <p className="correct-answer-text">
                Doğru cevap:{" "}
                <strong>{question.options[question.answerIndex]}</strong>
              </p>
            )}
            <p>
              <span className="did-you-know">
                <Sparkles size={13} /> Biliyor muydun?
              </span>
              {question.explanation}
            </p>
            {answer.correct && (
              <span className="bonus-line">
                Temel {100 * multipliers[question.difficulty]} + hız{" "}
                {answer.speedBonus} + seri {answer.streakBonus}
              </span>
            )}
          </motion.div>
        )}
      </section>
      <div className="game-bottomline">
        {feedback ? (
          <>
            <span className="muted small">
              {game.settings.mode === "timed"
                ? "Bir sonraki soru otomatik açılır."
                : "Biraz bilgi, biraz daha futbol."}
            </span>
            <button autoFocus className="button gold-button" onClick={onNext}>
              {game.settings.mode === "classic" && game.answers.length >= 10
                ? "Sonucu gör"
                : "Sıradaki soru"}
              <ArrowRight size={18} />
            </button>
          </>
        ) : (
          <>
            <span className="keyboard-hint">
              <kbd>1</kbd>
              <kbd>2</kbd>
              <kbd>3</kbd>
              <kbd>4</kbd> ile cevaplayabilirsin.
            </span>
            <span className="muted small">
              <Zap size={14} /> Hızlı cevap, ekstra puan.
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function Results({
  game,
  isBest,
  storageAvailable,
  onReplay,
  onHome,
  headingRef,
}: {
  game: Game;
  isBest: boolean;
  storageAvailable: boolean;
  onReplay: () => void;
  onHome: () => void;
  headingRef: HeadingRef;
}) {
  const stats = getStats(game);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "manual">(
    "idle",
  );
  const wrong = game.answers.filter((answer) => !answer.correct);
  const shareText = `GolBilgi’de ${categoryInfo(game.settings.category).name} / ${difficultyLabels[game.settings.difficulty]} / ${modeLabels[game.settings.mode]}: ${number(game.score)} puan! ${stats.correct}/${game.answers.length} doğru, %${stats.accuracy} doğruluk, ${stats.bestStreak} seri. Futbol bilginin sahası! ⚽`;
  async function share() {
    try {
      await navigator.clipboard.writeText(shareText);
      setShareStatus("copied");
    } catch {
      setShareStatus("manual");
    }
  }
  return (
    <div className="results-page narrow-page">
      <div className="result-heading">
        <span className="eyebrow">SON DÜDÜK ÇALDI</span>
        <h1 ref={headingRef} tabIndex={-1}>
          {stats.accuracy >= 80
            ? "Şampiyon gibi oynadın"
            : stats.accuracy >= 50
              ? "İyi maç çıkardın"
              : "Her maç bir tecrübe"}
          <span className="gold-text">.</span>
        </h1>
        <p>
          {categoryInfo(game.settings.category).name} <span>·</span>{" "}
          {modeLabels[game.settings.mode]} <span>·</span>{" "}
          {difficultyLabels[game.settings.difficulty]}
        </p>
      </div>
      <section className="result-card">
        <div className="result-award">
          <Trophy size={43} strokeWidth={1.3} />
        </div>
        {isBest && (
          <span className="new-record">
            <Sparkles size={13} /> YENİ KİŞİSEL REKOR
          </span>
        )}
        <span className="eyebrow">TOPLAM PUANIN</span>
        <div className="result-score">
          {number(game.score)}
          <span>PUAN</span>
        </div>
        <div className="result-stat-grid">
          <div>
            <Target size={20} />
            <strong>%{stats.accuracy}</strong>
            <span>Doğruluk</span>
          </div>
          <div>
            <Check size={20} />
            <strong>
              {stats.correct}
              <small> / {game.answers.length}</small>
            </strong>
            <span>Doğru cevap</span>
          </div>
          <div>
            <Flame size={20} />
            <strong>{stats.bestStreak}</strong>
            <span>En uzun seri</span>
          </div>
        </div>
        <p className="save-message">
          {storageAvailable ? (
            <>
              <Shield size={13} /> Rekorun bu tarayıcıda saklanır.
            </>
          ) : (
            "Tarayıcı depolaması kapalı. Skorun yalnızca bu oturumda kalacak."
          )}
        </p>
        <div className="result-actions">
          <button className="button gold-button" onClick={onReplay}>
            <RotateCcw size={17} /> Rövanşı oyna
          </button>
          <button className="button secondary-button" onClick={share}>
            {shareStatus === "copied" ? (
              <Check size={17} />
            ) : (
              <Copy size={17} />
            )}
            {shareStatus === "copied" ? "Skor kopyalandı" : "Skorunu paylaş"}
          </button>
        </div>
        <div role="status" className="sr-only">
          {shareStatus === "copied" ? "Skorun panoya kopyalandı." : ""}
        </div>
        {shareStatus === "manual" && (
          <label className="manual-share">
            Panoya erişilemedi. Aşağıdaki metni seçip kopyalayabilirsin.
            <textarea
              readOnly
              value={shareText}
              onFocus={(event) => event.target.select()}
            />
          </label>
        )}
      </section>
      <button className="back-link result-home" onClick={onHome}>
        <ArrowLeft size={16} /> Ana sayfaya dön
      </button>
      <section className="review-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">MAÇ ANALİZİ</div>
            <h2>
              {wrong.length
                ? "Bir dahaki sefere, tam isabet."
                : "Hatasız bir performans."}
            </h2>
          </div>
          <span className="count-badge">{wrong.length} yanlış</span>
        </div>
        {wrong.length ? (
          <div className="review-list">
            {wrong.map((answer, index) => (
              <details
                className="review-item"
                key={`${answer.question.id}-${index}`}
              >
                <summary>
                  <span className="review-x">
                    <X size={15} />
                  </span>
                  <span>{answer.question.question}</span>
                  <ChevronRight size={18} />
                </summary>
                <div className="review-content">
                  <p className="muted">
                    Senin cevabın:{" "}
                    <span className="wrong-text">
                      {answer.selectedIndex === null
                        ? "Süre doldu"
                        : answer.question.options[answer.selectedIndex]}
                    </span>
                  </p>
                  <p>
                    Doğru cevap:{" "}
                    <strong className="mint-text">
                      {answer.question.options[answer.question.answerIndex]}
                    </strong>
                  </p>
                  <div className="review-explanation">
                    <Sparkles size={16} />
                    <p>{answer.question.explanation}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        ) : (
          <div className="perfect-review">
            <Award size={28} />
            <p>Tüm cevapların doğru! Daha zor bir kategoriye ne dersin?</p>
          </div>
        )}
      </section>
    </div>
  );
}

function Records({
  records,
  storageAvailable,
  onPlay,
  headingRef,
}: {
  records: ScoreRecord[];
  storageAvailable: boolean;
  onPlay: () => void;
  headingRef: HeadingRef;
}) {
  const [mode, setMode] = useState<Mode>("classic");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const filtered = records.filter(
    (record) => record.mode === mode && record.difficulty === difficulty,
  );
  const best = Math.max(0, ...records.map((record) => record.score));
  return (
    <div className="records-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">KENDİNİN EN İYİ RAKİBİ OL</div>
          <h1 ref={headingRef} tabIndex={-1}>
            Rekor defterin<span className="gold-text">.</span>
          </h1>
          <p className="page-description">
            Her kategori, mod ve zorluk için kendi zirven.
          </p>
        </div>
        <span className="season-badge">
          <Shield size={13} /> YALNIZCA BU TARAYICIDA
        </span>
      </div>
      <section className="record-banner">
        <div className="record-banner-icon">
          <Trophy size={37} strokeWidth={1.4} />
        </div>
        <div>
          <span className="eyebrow">TÜM ZAMANLARIN EN İYİ SKORUN</span>
          <strong>
            {number(best)}
            <small> puan</small>
          </strong>
          <p>
            {records.length
              ? "Rekorlar kırılmak içindir. Sahada görüşürüz."
              : "İlk maçını oyna, bu deftere adını yaz."}
          </p>
        </div>
        <button className="button gold-button" onClick={onPlay}>
          Sahaya çık <ArrowRight size={18} />
        </button>
      </section>
      <div className="records-controls">
        <div className="segmented" aria-label="Rekor oyun modu">
          {(["classic", "timed"] as Mode[]).map((item) => (
            <button
              key={item}
              aria-pressed={item === mode}
              className={item === mode ? "selected" : ""}
              onClick={() => setMode(item)}
            >
              {modeLabels[item]}
            </button>
          ))}
        </div>
        <label className="select-label">
          Zorluk{" "}
          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value as Difficulty)
            }
          >
            {(["easy", "medium", "hard"] as Difficulty[]).map((item) => (
              <option value={item} key={item}>
                {difficultyLabels[item]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="records-grid">
        {categories.map((category) => {
          const record = filtered.find((item) => item.category === category.id);
          return (
            <article
              className={`record-category ${category.color}`}
              key={category.id}
            >
              <div className="record-category-top">
                <span className="category-icon">
                  <category.icon size={22} />
                </span>
                <h2>{category.name}</h2>
              </div>
              <strong
                className={record ? "record-value" : "record-value empty"}
              >
                {record ? number(record.score) : "—"}
                <small>{record ? "PUAN" : "HENÜZ REKOR YOK"}</small>
              </strong>
              {record ? (
                <>
                  <div className="record-details">
                    <span>
                      <Target size={14} /> %{record.accuracy}
                    </span>
                    <span>
                      <Flame size={14} /> {record.bestStreak} seri
                    </span>
                  </div>
                  <p className="record-date">
                    {new Date(record.date).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </>
              ) : (
                <p className="record-empty-text">
                  Bir başlama vuruşu kadar yakın.
                </p>
              )}
            </article>
          );
        })}
      </div>
      <p className="records-footnote">
        <CircleHelp size={15} />
        {storageAvailable
          ? "Rekorlar cihazlar arasında aktarılmaz. Tarayıcı verilerini temizlersen rekorlar da silinir."
          : "Tarayıcı depolaması kullanılamıyor. Rekorlar bu oturumdan sonra saklanamayacak."}
      </p>
    </div>
  );
}

function Modal({
  title,
  onClose,
  returnFocus,
  children,
}: {
  title: string;
  onClose: () => void;
  returnFocus: HTMLElement | null;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key !== "Tab") return;
      const focusable = ref.current?.querySelectorAll<HTMLElement>(
        'button, a, input, textarea, select, [tabindex="0"]',
      );
      if (!focusable?.length) return;
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (!ref.current?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    function containFocus(event: FocusEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        closeRef.current?.focus();
      }
    }
    document.addEventListener("keydown", key);
    document.addEventListener("focusin", containFocus);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("focusin", containFocus);
      document.body.style.overflow = previousOverflow;
      returnFocus?.focus();
    };
  }, [onClose, returnFocus]);
  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={ref}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="modal-heading">
          <h2 id="modal-title">{title}</h2>
          <button
            className="icon-button"
            ref={closeRef}
            onClick={onClose}
            aria-label="Pencereyi kapat"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

export default App;
