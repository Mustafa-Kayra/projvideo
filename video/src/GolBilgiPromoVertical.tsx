import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import {
  BrandLogo,
  PhoneFrame,
  SoccerBall,
  StadiumBackdrop,
} from "./components/DeviceMockups";
import { COLORS, FONTS } from "./theme";
import { VERTICAL_VOICEOVER_DATA, type WordTiming } from "./verticalData";

const LEAD_IN_SEC = 0.1;

const SyncedVoiceoverSubtitle: React.FC<{
  words: WordTiming[];
}> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps - LEAD_IN_SEC;

  return (
    <div
      style={{
        padding: "20px 26px",
        borderRadius: 20,
        background: "rgba(10, 22, 17, 0.92)",
        border: "2px solid rgba(233, 191, 102, 0.42)",
        boxShadow: "0 18px 45px rgba(0, 0, 0, 0.55)",
        display: "flex",
        flexWrap: "wrap",
        gap: "8px 12px",
        alignItems: "center",
      }}
    >
      {words.map((w, idx) => {
        const start = w.offset_sec;
        const end = w.offset_sec + w.duration_sec + 0.08;
        const isActive = currentSec >= start && currentSec <= end;
        const isPassed = currentSec > end;

        return (
          <span
            key={`${w.text}-${idx}`}
            style={{
              fontFamily: FONTS.sans,
              fontSize: 45,
              fontWeight: 750,
              lineHeight: 1.22,
              padding: "2px 10px",
              borderRadius: 10,
              color: isActive
                ? "#132419"
                : isPassed
                  ? COLORS.text
                  : "rgba(242, 241, 232, 0.46)",
              background: isActive ? COLORS.gold : "transparent",
              transform: isActive ? "scale(1.06)" : "scale(1)",
              boxShadow: isActive
                ? "0 6px 20px rgba(233, 191, 102, 0.45)"
                : "none",
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

// Safe zone container: top 224px (>=220px), bottom 384px (>=380px)
const VerticalSafeZone: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 224,
        bottom: 384,
        left: 52,
        right: 52,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
};

// SCENE 1: Hook (255 frames = 8.5s)
const VScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const topIn = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const phoneIn = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const ballSpin = interpolate(frame, [0, 255], [-20, 45]);

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.35} />
      <VerticalSafeZone>
        {/* Top Text & Subtitle */}
        <div
          style={{
            opacity: topIn,
            transform: `translateY(${(1 - topIn) * 30}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <BrandLogo scale={0.95} />
            <span
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(24, 53, 34, 0.9)",
                border: "1.5px solid rgba(233, 191, 102, 0.45)",
                fontFamily: FONTS.sans,
                fontSize: 22,
                fontWeight: 700,
                color: COLORS.gold,
                letterSpacing: 1.5,
              }}
            >
              TRİBÜNLER HAZIR
            </span>
          </div>

          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 0.94,
              letterSpacing: -1,
              color: COLORS.text,
              textTransform: "uppercase",
            }}
          >
            FUTBOLU SEVİYORSUN.{" "}
            <span style={{ color: COLORS.gold }}>
              PEKİ NE KADAR BİLİYORSUN?
            </span>
          </div>

          <SyncedVoiceoverSubtitle words={VERTICAL_VOICEOVER_DATA.scene1.words} />
        </div>

        {/* Bottom Phone Mockup & Floating Motifs */}
        <div
          style={{
            position: "relative",
            height: 750,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: phoneIn,
            transform: `translateY(${(1 - phoneIn) * 60}px)`,
          }}
        >
          {/* Left Floating Ball */}
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 110,
              padding: "22px 20px",
              borderRadius: 22,
              background: "rgba(16, 34, 26, 0.94)",
              border: `2px solid ${COLORS.gold}`,
              boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              zIndex: 6,
            }}
          >
            <SoccerBall
              size={92}
              style={{ transform: `rotate(${ballSpin}deg)` }}
            />
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: 44,
                fontWeight: 800,
                color: COLORS.gold,
                lineHeight: 1,
              }}
            >
              160 SORU
            </span>
          </div>

          {/* Right Floating Badge */}
          <div
            style={{
              position: "absolute",
              right: 8,
              bottom: 110,
              padding: "20px 22px",
              borderRadius: 20,
              background: "rgba(16, 34, 26, 0.94)",
              border: `2px solid ${COLORS.mint}`,
              boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
              textAlign: "center",
              zIndex: 6,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 52,
                fontWeight: 800,
                color: COLORS.mint,
                lineHeight: 1,
              }}
            >
              15 SN
            </div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 24,
                fontWeight: 700,
                color: COLORS.text,
                marginTop: 4,
              }}
            >
              Karar Süresi
            </div>
          </div>

          <PhoneFrame
            src="mobile-home.png"
            width={360}
            height={745}
            imgScale={1}
          />
        </div>
      </VerticalSafeZone>
    </AbsoluteFill>
  );
};

// SCENE 2: Categories & 160 Questions (276 frames = 9.2s)
const VScene2Categories: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const topIn = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });

  const cats = [
    { name: "Kulüpler", count: "40 SORU", color: COLORS.mint, file: "cat-clubs.png" },
    { name: "Futbolcular", count: "40 SORU", color: COLORS.blue, file: "cat-players.png" },
    { name: "Kupa Kazananlar", count: "40 SORU", color: COLORS.gold, file: "cat-winners.png" },
    { name: "Türk Futbolu", count: "40 SORU", color: COLORS.coral, file: "cat-turkish.png" },
    { name: "Karışık Mod", count: "160 SORU", color: COLORS.purple, file: "cat-mixed.png" },
  ];

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch={false} />
      <VerticalSafeZone>
        <div
          style={{
            opacity: topIn,
            transform: `translateY(${(1 - topIn) * 30}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 86,
              fontWeight: 800,
              lineHeight: 0.94,
              color: COLORS.text,
              textTransform: "uppercase",
            }}
          >
            5 KATEGORİ ·{" "}
            <span style={{ color: COLORS.gold }}>160 ÖZGÜN SORU</span>
          </div>

          <SyncedVoiceoverSubtitle words={VERTICAL_VOICEOVER_DATA.scene2.words} />
        </div>

        {/* Bottom Split: Left 5 Category Cards entering one by one, Right Mobile Categories Phone */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.12fr 0.88fr",
            gap: 22,
            alignItems: "center",
            height: 760,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cats.map((c, i) => {
              const cIn = spring({
                frame: frame - (16 + i * 18),
                fps,
                config: { damping: 13, stiffness: 125 },
              });
              return (
                <div
                  key={c.name}
                  style={{
                    opacity: cIn,
                    transform: `translateX(${(1 - cIn) * -50}px)`,
                    padding: "14px 18px",
                    borderRadius: 16,
                    background: "#10221a",
                    border: `2px solid ${c.color}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    boxShadow: "0 12px 28px rgba(0,0,0,0.45)",
                  }}
                >
                  <div
                    style={{
                      width: 112,
                      height: 98,
                      borderRadius: 10,
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "#0d1c15",
                    }}
                  >
                    <Img
                      src={staticFile(c.file)}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: FONTS.display,
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.text,
                        lineHeight: 1,
                      }}
                    >
                      {c.name}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.sans,
                        fontSize: 22,
                        fontWeight: 700,
                        color: c.color,
                        marginTop: 6,
                      }}
                    >
                      {c.count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <PhoneFrame
              src="mobile-categories.png"
              width={355}
              height={740}
              imgScale={1}
            />
          </div>
        </div>
      </VerticalSafeZone>
    </AbsoluteFill>
  );
};

// SCENE 3: Gameplay & Biliyor muydun? (234 frames = 7.8s)
const VScene3Gameplay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const topIn = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });

  const isFeedback = frame >= 105;
  const timerVal = frame < 45 ? 15 : frame < 105 ? 14 : 14;

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.22} />
      <VerticalSafeZone>
        <div
          style={{
            opacity: topIn,
            transform: `translateY(${(1 - topIn) * 30}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 86,
              fontWeight: 800,
              lineHeight: 0.94,
              color: COLORS.text,
              textTransform: "uppercase",
            }}
          >
            HER SORUYA{" "}
            <span style={{ color: COLORS.gold }}>15 SANİYE</span>
          </div>

          <SyncedVoiceoverSubtitle words={VERTICAL_VOICEOVER_DATA.scene3.words} />
        </div>

        {/* Bottom Split: Left Live Timer + Biliyor muydun Card, Right Mobile Question -> Feedback Phone */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.06fr 0.94fr",
            gap: 22,
            alignItems: "center",
            height: 760,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* 15s Timer Card */}
            <div
              style={{
                padding: "22px 24px",
                borderRadius: 20,
                background: "rgba(16, 34, 26, 0.95)",
                border: `2px solid ${COLORS.gold}`,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 86,
                  fontWeight: 800,
                  color: COLORS.gold,
                  lineHeight: 0.9,
                }}
              >
                {isFeedback ? "✓" : `${timerVal}s`}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 46,
                    fontWeight: 800,
                    color: COLORS.text,
                    lineHeight: 1,
                  }}
                >
                  {isFeedback ? "DOĞRU CEVAP!" : "GERİ SAYIM"}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 24,
                    fontWeight: 600,
                    color: COLORS.mint,
                    marginTop: 6,
                  }}
                >
                  {isFeedback ? "+270 Puan Kazanıldı" : "Hızlı Ol, Seriyi Koru"}
                </div>
              </div>
            </div>

            {/* Real "Biliyor muydun?" Card */}
            <div
              style={{
                padding: "22px 24px",
                borderRadius: 20,
                background: "#0d1e16",
                border: `2px solid ${isFeedback ? COLORS.mint : COLORS.gold}`,
                boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 46,
                  fontWeight: 800,
                  color: COLORS.gold,
                  lineHeight: 1.05,
                  marginBottom: 12,
                }}
              >
                ✦ BİLİYOR MUYDUN?
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 28,
                  fontWeight: 600,
                  lineHeight: 1.38,
                  color: COLORS.text,
                  marginBottom: 14,
                }}
              >
                Borussia Dortmund’un armasındaki 09, kulübün 1909 yılındaki
                kuruluşunu simgeler.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <PhoneFrame
              src={isFeedback ? "mobile-feedback.png" : "mobile-question.png"}
              width={360}
              height={745}
              imgScale={1}
            />
          </div>
        </div>
      </VerticalSafeZone>
    </AbsoluteFill>
  );
};

// SCENE 4: Modes & Difficulties (216 frames = 7.2s)
const VScene4Modes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const topIn = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const isTimed = frame >= 100;

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.22} />
      <VerticalSafeZone>
        <div
          style={{
            opacity: topIn,
            transform: `translateY(${(1 - topIn) * 30}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 0.94,
              color: COLORS.text,
              textTransform: "uppercase",
            }}
          >
            KLASİK MOD YA DA{" "}
            <span style={{ color: COLORS.gold }}>ZAMANA KARŞI</span>
          </div>

          <SyncedVoiceoverSubtitle words={VERTICAL_VOICEOVER_DATA.scene4.words} />
        </div>

        {/* Bottom Split: Left Large Mode & Difficulty Cards (min 44px titles), Right Mobile Setup Phone */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.06fr 0.94fr",
            gap: 22,
            alignItems: "center",
            height: 760,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                padding: "22px 24px",
                borderRadius: 20,
                background: !isTimed
                  ? "rgba(233, 191, 102, 0.18)"
                  : "rgba(16, 34, 26, 0.92)",
                border: `2px solid ${!isTimed ? COLORS.gold : "rgba(255,255,255,0.16)"}`,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 52,
                  fontWeight: 800,
                  color: COLORS.gold,
                  lineHeight: 1,
                }}
              >
                KLASİK · 10 SORU
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 26,
                  fontWeight: 600,
                  color: COLORS.text,
                  marginTop: 8,
                }}
              >
                Tekrarsız 10 seçkin soru
              </div>
            </div>

            <div
              style={{
                padding: "22px 24px",
                borderRadius: 20,
                background: isTimed
                  ? "rgba(138, 199, 165, 0.18)"
                  : "rgba(16, 34, 26, 0.92)",
                border: `2px solid ${isTimed ? COLORS.mint : "rgba(255,255,255,0.16)"}`,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 52,
                  fontWeight: 800,
                  color: COLORS.mint,
                  lineHeight: 1,
                }}
              >
                ZAMANA KARŞI · 60 SN
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 26,
                  fontWeight: 600,
                  color: COLORS.text,
                  marginTop: 8,
                }}
              >
                60 saniyede maksimum doğru
              </div>
            </div>

            {/* Difficulty levels */}
            <div
              style={{
                padding: "20px 22px",
                borderRadius: 20,
                background: "rgba(16, 34, 26, 0.95)",
                border: `2px solid ${COLORS.gold}`,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 46,
                  fontWeight: 800,
                  color: COLORS.text,
                  lineHeight: 1,
                }}
              >
                3 ZORLUK SEVİYESİ
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                }}
              >
                {[
                  { name: "KOLAY", mult: "×1", color: COLORS.mint },
                  { name: "ORTA", mult: "×2", color: COLORS.blue },
                  { name: "ZOR", mult: "×3", color: COLORS.gold },
                ].map((d) => (
                  <div
                    key={d.name}
                    style={{
                      padding: "12px 8px",
                      borderRadius: 12,
                      background: "#0b1813",
                      border: `2px solid ${d.color}`,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONTS.display,
                        fontSize: 40,
                        fontWeight: 800,
                        color: d.color,
                        lineHeight: 1,
                      }}
                    >
                      {d.name}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.sans,
                        fontSize: 24,
                        fontWeight: 800,
                        color: COLORS.text,
                        marginTop: 4,
                      }}
                    >
                      {d.mult}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <PhoneFrame
              src={isTimed ? "mobile-setup-timed.png" : "mobile-setup.png"}
              width={360}
              height={745}
              imgScale={1}
            />
          </div>
        </div>
      </VerticalSafeZone>
    </AbsoluteFill>
  );
};

// SCENE 5: Scoring, Animated Counter, Results & Records (222 frames = 7.4s)
const VScene5Scoring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const topIn = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });

  const countProg = interpolate(frame, [10, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const score = Math.round((1 - Math.pow(1 - countProg, 3)) * 4450);
  const showRecords = frame >= 115;

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.22} />
      <VerticalSafeZone>
        <div
          style={{
            opacity: topIn,
            transform: `translateY(${(1 - topIn) * 30}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 0.94,
              color: COLORS.text,
              textTransform: "uppercase",
            }}
          >
            HIZ VE SERİ BONUSU ·{" "}
            <span style={{ color: COLORS.gold }}>REKORUNU KIR</span>
          </div>

          <SyncedVoiceoverSubtitle words={VERTICAL_VOICEOVER_DATA.scene5.words} />
        </div>

        {/* Bottom Split: Left Animated Score Counter + Formula Cards, Right Mobile Results -> Mobile Records */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.06fr 0.94fr",
            gap: 22,
            alignItems: "center",
            height: 760,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Animated Score Counter Card */}
            <div
              style={{
                padding: "24px 26px",
                borderRadius: 22,
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(233,191,102,0.25), transparent 70%), #102219",
                border: `2px solid ${COLORS.gold}`,
                boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 22,
                  fontWeight: 800,
                  color: COLORS.gold,
                  letterSpacing: 1.5,
                }}
              >
                ★ YENİ KİŞİSEL REKOR
              </div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 108,
                  fontWeight: 800,
                  color: COLORS.gold,
                  lineHeight: 0.92,
                  marginTop: 6,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {score.toLocaleString("tr-TR")}
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 26,
                  fontWeight: 700,
                  color: COLORS.mint,
                  marginTop: 8,
                }}
              >
                %100 Doğruluk · 10 Seri 🔥
              </div>
            </div>

            {[
              { title: "TEMEL PUAN", sub: "100 / 200 / 300 Puan", color: COLORS.mint },
              { title: "HIZ BONUSU", sub: "Her Saniye +5 Puan", color: COLORS.gold },
              { title: "SERİ BONUSU", sub: "+25'ten +125'e Kadar", color: COLORS.coral },
            ].map((b) => (
              <div
                key={b.title}
                style={{
                  padding: "16px 22px",
                  borderRadius: 16,
                  background: "rgba(16, 34, 26, 0.92)",
                  border: `2px solid ${b.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 44,
                    fontWeight: 800,
                    color: b.color,
                    lineHeight: 1,
                  }}
                >
                  {b.title}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.text,
                  }}
                >
                  {b.sub}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <PhoneFrame
              src={showRecords ? "mobile-records.png" : "mobile-results.png"}
              width={360}
              height={745}
              imgScale={1}
            />
          </div>
        </div>
      </VerticalSafeZone>
    </AbsoluteFill>
  );
};

// SCENE 6: Mobile Showcase (198 frames = 6.6s)
const VScene6Mobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const topIn = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const p1 = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 115 } });
  const p2 = spring({ frame: frame - 22, fps, config: { damping: 13, stiffness: 120 } });
  const p3 = spring({ frame: frame - 34, fps, config: { damping: 14, stiffness: 115 } });

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.3} />
      <VerticalSafeZone>
        <div
          style={{
            opacity: topIn,
            transform: `translateY(${(1 - topIn) * 30}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 0.94,
              color: COLORS.text,
              textTransform: "uppercase",
            }}
          >
            TELEFONUNDA,{" "}
            <span style={{ color: COLORS.gold }}>İSTEDİĞİN YERDE</span>
          </div>

          <SyncedVoiceoverSubtitle words={VERTICAL_VOICEOVER_DATA.scene6.words} />
        </div>

        {/* Bottom: 3 Phone Mockups Fan Showcase */}
        <div
          style={{
            position: "relative",
            height: 760,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 45,
              opacity: p1,
              transform: `translateY(${(1 - p1) * 70}px) rotate(-7deg) scale(0.9)`,
              zIndex: 2,
            }}
          >
            <PhoneFrame src="mobile-home.png" width={330} height={690} />
          </div>

          <div
            style={{
              position: "absolute",
              right: 10,
              top: 45,
              opacity: p3,
              transform: `translateY(${(1 - p3) * 70}px) rotate(7deg) scale(0.9)`,
              zIndex: 2,
            }}
          >
            <PhoneFrame src="mobile-results.png" width={330} height={690} />
          </div>

          <div
            style={{
              position: "relative",
              opacity: p2,
              transform: `translateY(${(1 - p2) * 80}px) scale(${0.92 + 0.08 * p2})`,
              zIndex: 5,
            }}
          >
            <PhoneFrame src="mobile-feedback.png" width={358} height={742} />
          </div>
        </div>
      </VerticalSafeZone>
    </AbsoluteFill>
  );
};

// SCENE 7: CTA (159 frames = 5.3s)
const VScene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s1 = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const s2 = spring({ frame: frame - 12, fps, config: { damping: 13, stiffness: 125 } });
  const s3 = spring({ frame: frame - 24, fps, config: { damping: 13, stiffness: 120 } });
  const pulse = 1 + Math.sin(frame * 0.14) * 0.025;
  const ballSpin = interpolate(frame, [0, 159], [0, 50]);

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.42} />
      <VerticalSafeZone>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              opacity: s1,
              transform: `scale(${0.85 + 0.15 * s1})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <SoccerBall
              size={135}
              style={{
                transform: `rotate(${ballSpin}deg)`,
                filter: "drop-shadow(0 16px 30px rgba(0,0,0,0.6))",
              }}
            />
            <BrandLogo scale={1.7} />
          </div>

          <div
            style={{
              opacity: s2,
              transform: `translateY(${(1 - s2) * 35}px)`,
              fontFamily: FONTS.display,
              fontSize: 104,
              fontWeight: 800,
              lineHeight: 0.94,
              letterSpacing: -1.5,
              color: COLORS.text,
              textTransform: "uppercase",
            }}
          >
            GOLBİLGİ.
            <br />
            <span
              style={{
                color: COLORS.gold,
                textShadow: "0 12px 40px rgba(233, 191, 102, 0.35)",
              }}
            >
              BİLGİNLE SAHAYA ÇIK.
            </span>
          </div>

          <div style={{ width: "100%", opacity: s2 }}>
            <SyncedVoiceoverSubtitle words={VERTICAL_VOICEOVER_DATA.scene7.words} />
          </div>

          {/* Large readable feature rows (44px+ display text) */}
          <div
            style={{
              opacity: s3,
              transform: `translateY(${(1 - s3) * 30}px)`,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              width: "100%",
            }}
          >
            {[
              "5 KATEGORİ · 160 SORU",
              "KLASİK & 60 SN MODU",
              "HIZ VE SERİ BONUSU",
              "ÜCRETSİZ & ÜYELİKSİZ",
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: "18px 20px",
                  borderRadius: 16,
                  background: "rgba(16, 34, 26, 0.92)",
                  border: "1.5px solid rgba(233, 191, 102, 0.38)",
                  fontFamily: FONTS.display,
                  fontSize: 44,
                  fontWeight: 800,
                  color: COLORS.text,
                  lineHeight: 1,
                }}
              >
                <span style={{ color: COLORS.gold }}>★</span> {item}
              </div>
            ))}
          </div>

          {/* Gold CTA Button */}
          <div
            style={{
              opacity: s3,
              transform: `scale(${pulse})`,
              marginTop: 8,
            }}
          >
            <div
              style={{
                padding: "24px 56px",
                borderRadius: 18,
                background: COLORS.gold,
                color: "#132419",
                fontFamily: FONTS.display,
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: 0.5,
                boxShadow: "0 20px 55px rgba(233, 191, 102, 0.42)",
              }}
            >
              ŞİMDİ OYNA →
            </div>
          </div>
        </div>
      </VerticalSafeZone>
    </AbsoluteFill>
  );
};

export const GolBilgiPromoVertical: React.FC = () => {
  const transitionDuration = 10; // 0.33s at 30fps

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDeep }}>
      {/* Pre-mixed & loudnorm-verified master audio (-13.9 LUFS, -2.1 dBTP, -14dB ducked music + tr-TR-AhmetNeural voiceover) */}
      <Audio src={staticFile("vertical-master.wav")} volume={1} />

      <TransitionSeries>
        {/* 1. Hook: 255f (8.5s) */}
        <TransitionSeries.Sequence durationInFrames={255}>
          <VScene1Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 2. Categories: 276f (9.2s) */}
        <TransitionSeries.Sequence durationInFrames={276}>
          <VScene2Categories />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 3. Gameplay: 234f (7.8s) */}
        <TransitionSeries.Sequence durationInFrames={234}>
          <VScene3Gameplay />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 4. Modes: 216f (7.2s) */}
        <TransitionSeries.Sequence durationInFrames={216}>
          <VScene4Modes />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 5. Scoring & Results: 222f (7.4s) */}
        <TransitionSeries.Sequence durationInFrames={222}>
          <VScene5Scoring />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 6. Mobile Showcase: 198f (6.6s) */}
        <TransitionSeries.Sequence durationInFrames={198}>
          <VScene6Mobile />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 7. CTA: 159f (5.3s) */}
        <TransitionSeries.Sequence durationInFrames={159}>
          <VScene7CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
