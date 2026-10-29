import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrowserFrame, StadiumBackdrop } from "../components/DeviceMockups";
import { COLORS, FONTS } from "../theme";

export const Scene4Modes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const mode1In = spring({
    frame: frame - 16,
    fps,
    config: { damping: 13, stiffness: 125 },
  });

  const mode2In = spring({
    frame: frame - 34,
    fps,
    config: { damping: 13, stiffness: 125 },
  });

  const diffIn = spring({
    frame: frame - 52,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Switch browser screenshot from setup-classic.png to setup-timed.png at frame 125
  const isTimedActive = frame >= 125;
  const activeScreenshot = isTimedActive
    ? "setup-timed.png"
    : "setup-classic.png";

  const kenScale = interpolate(frame, [0, 255], [1.0, 1.04], {
    extrapolateRight: "clamp",
  });
  const kenX = interpolate(frame, [0, 255], [0, -10], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.22} />

      <div
        style={{
          position: "absolute",
          top: 56,
          bottom: 56,
          left: 84,
          right: 84,
          display: "grid",
          gridTemplateColumns: "0.88fr 1.12fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* Left Column: Kinetic Modes & Difficulty Breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              opacity: headerIn,
              transform: `translateY(${(1 - headerIn) * 30}px)`,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: FONTS.sans,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2.4,
                color: COLORS.gold,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 2,
                  background: COLORS.gold,
                  display: "inline-block",
                }}
              />
              SOYUNMA ODASI · MAÇ HAZIRLIĞI
            </div>

            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 78,
                fontWeight: 800,
                lineHeight: 0.96,
                letterSpacing: -1,
                color: COLORS.text,
                textTransform: "uppercase",
              }}
            >
              İKİ OYUN MODU<span style={{ color: COLORS.gold }}>,</span>
              <br />
              ÜÇ ZORLUK SEVİYESİ<span style={{ color: COLORS.gold }}>.</span>
            </div>
          </div>

          {/* 2 Mode Cards: Klasik 10 Soru vs Zamana Karşı 60 sn */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 18,
            }}
          >
            <div
              style={{
                opacity: mode1In,
                transform: `translateY(${(1 - mode1In) * 35}px)`,
                padding: "22px 22px",
                borderRadius: 16,
                background: !isTimedActive
                  ? "linear-gradient(145deg, rgba(233, 191, 102, 0.2), rgba(17, 34, 25, 0.95))"
                  : "rgba(17, 34, 25, 0.88)",
                border: !isTimedActive
                  ? `2px solid ${COLORS.gold}`
                  : "1px solid rgba(255, 255, 255, 0.14)",
                boxShadow: !isTimedActive
                  ? "0 18px 40px rgba(0, 0, 0, 0.45)"
                  : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 36,
                    fontWeight: 800,
                    color: COLORS.text,
                    letterSpacing: 0.3,
                  }}
                >
                  KLASİK MOD
                </span>
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 12,
                    fontWeight: 800,
                    padding: "5px 10px",
                    borderRadius: 6,
                    background: "rgba(233, 191, 102, 0.18)",
                    color: COLORS.gold,
                    letterSpacing: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  10 SORU
                </span>
              </div>
              <p
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: COLORS.textSoft,
                }}
              >
                Rastgele seçilen tekrarsız 10 soru. Tek hedef: en yüksek
                skoruna ulaşmak.
              </p>
            </div>

            <div
              style={{
                opacity: mode2In,
                transform: `translateY(${(1 - mode2In) * 35}px)`,
                padding: "22px 22px",
                borderRadius: 16,
                background: isTimedActive
                  ? "linear-gradient(145deg, rgba(233, 191, 102, 0.2), rgba(17, 34, 25, 0.95))"
                  : "rgba(17, 34, 25, 0.88)",
                border: isTimedActive
                  ? `2px solid ${COLORS.gold}`
                  : "1px solid rgba(255, 255, 255, 0.14)",
                boxShadow: isTimedActive
                  ? "0 18px 40px rgba(0, 0, 0, 0.45)"
                  : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 36,
                    fontWeight: 800,
                    color: COLORS.text,
                    letterSpacing: 0.3,
                  }}
                >
                  ZAMANA KARŞI
                </span>
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 12,
                    fontWeight: 800,
                    padding: "5px 10px",
                    borderRadius: 6,
                    background: "rgba(138, 199, 165, 0.2)",
                    color: COLORS.mint,
                    letterSpacing: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  60 SANİYE
                </span>
              </div>
              <p
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: COLORS.textSoft,
                }}
              >
                60 saniyede mümkün olduğunca çok doğru! Otomatik geçişle yüksek
                tempo.
              </p>
            </div>
          </div>

          {/* 3 Difficulty Levels */}
          <div
            style={{
              opacity: diffIn,
              transform: `translateY(${(1 - diffIn) * 30}px)`,
              padding: "20px 24px",
              borderRadius: 16,
              background: "rgba(16, 34, 26, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 2,
                color: COLORS.textMuted,
                marginBottom: 14,
              }}
            >
              ZORLUK SEVİYELERİ & PUAN ÇARPANLARI
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              {[
                {
                  label: "KOLAY",
                  mult: "×1 Puan",
                  base: "100 Baz Puan",
                  color: COLORS.mint,
                },
                {
                  label: "ORTA",
                  mult: "×2 Puan",
                  base: "200 Baz Puan",
                  color: COLORS.blue,
                },
                {
                  label: "ZOR",
                  mult: "×3 Puan",
                  base: "300 Baz Puan",
                  color: COLORS.gold,
                },
              ].map((d) => (
                <div
                  key={d.label}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: "#0c1a13",
                    border: `1.5px solid ${d.color}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 32,
                      fontWeight: 800,
                      color: d.color,
                      lineHeight: 1,
                    }}
                  >
                    {d.label}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 15,
                      fontWeight: 700,
                      color: COLORS.text,
                      marginTop: 6,
                    }}
                  >
                    {d.mult}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 12,
                      color: COLORS.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {d.base}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Full Unobstructed Real Setup Screen (960x642 = 16:10) */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <BrowserFrame
            src={activeScreenshot}
            width={960}
            height={642}
            urlText={`golbilgi.app — Maç hazırlığı (${isTimedActive ? "Zamana karşı · 60 sn" : "Klasik · 10 soru"})`}
            imgScale={kenScale}
            imgTranslateX={kenX}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
