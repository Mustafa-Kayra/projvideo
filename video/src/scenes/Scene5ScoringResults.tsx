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

export const Scene5ScoringResults: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Animated score counter from 0 to 4445 over frames 20..115
  const countProgress = interpolate(frame, [20, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const easedCount = 1 - Math.pow(1 - countProgress, 3);
  const animatedScore = Math.round(easedCount * 4445);

  const bonus1In = spring({
    frame: frame - 18,
    fps,
    config: { damping: 13, stiffness: 130 },
  });
  const bonus2In = spring({
    frame: frame - 34,
    fps,
    config: { damping: 13, stiffness: 130 },
  });
  const bonus3In = spring({
    frame: frame - 50,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // At frame 165, slide in the Records ("Rekor defterin") browser view alongside Results
  const showRecords = frame >= 165;
  const recordsIn = spring({
    frame: frame - 165,
    fps,
    config: { damping: 14, stiffness: 115 },
  });

  const kenScale = interpolate(frame, [0, 300], [1.0, 1.04], {
    extrapolateRight: "clamp",
  });
  const kenX = interpolate(frame, [0, 300], [0, -8], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.22} />

      <div
        style={{
          position: "absolute",
          top: 52,
          bottom: 52,
          left: 84,
          right: 84,
          display: "grid",
          gridTemplateColumns: "0.88fr 1.12fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* Left Column: Formula + Animated Score Counter + Bonus Pills */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            opacity: headerIn,
            transform: `translateX(${(1 - headerIn) * -35}px)`,
          }}
        >
          <div>
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
              SON DÜDÜK ÇALDI · SKOR & REKORLAR
            </div>

            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 0.96,
                letterSpacing: -1,
                color: COLORS.text,
                textTransform: "uppercase",
              }}
            >
              PUAN + SERİ +{" "}
              <span style={{ color: COLORS.gold }}>HIZ BONUSU.</span>
            </div>
          </div>

          {/* Animated Score Counter Showcase Card */}
          <div
            style={{
              padding: "24px 28px",
              borderRadius: 20,
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(233, 191, 102, 0.22), transparent 70%), #102219",
              border: `2px solid ${COLORS.gold}`,
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  padding: "5px 11px",
                  borderRadius: 6,
                  background: "rgba(233, 191, 102, 0.16)",
                  color: COLORS.gold,
                  fontFamily: FONTS.sans,
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  marginBottom: 10,
                }}
              >
                ★ YENİ KİŞİSEL REKOR
              </div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 104,
                  fontWeight: 800,
                  lineHeight: 0.9,
                  color: COLORS.gold,
                  letterSpacing: -2,
                  fontVariantNumeric: "tabular-nums",
                  textShadow: "0 10px 35px rgba(233, 191, 102, 0.35)",
                }}
              >
                {animatedScore.toLocaleString("tr-TR")}
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 4,
                  color: "#b8ae88",
                  marginTop: 8,
                }}
              >
                TOPLAM PUANIN
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                borderLeft: "1px solid rgba(255,255,255,0.12)",
                paddingLeft: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 36,
                    fontWeight: 800,
                    color: COLORS.mint,
                    lineHeight: 1,
                  }}
                >
                  %100
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 13,
                    color: COLORS.textMuted,
                  }}
                >
                  10 / 10 Doğruluk
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 36,
                    fontWeight: 800,
                    color: COLORS.gold,
                    lineHeight: 1,
                  }}
                >
                  10 SERİ 🔥
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 13,
                    color: COLORS.textMuted,
                  }}
                >
                  Hatasız Performans
                </div>
              </div>
            </div>
          </div>

          {/* 3 Scoring Formula Breakdown Rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                inVal: bonus1In,
                tag: "TEMEL PUAN",
                title: "100 × Zorluk Çarpanı",
                desc: "Kolay 100 · Orta 200 · Zor 300 puan",
                color: COLORS.mint,
              },
              {
                inVal: bonus2In,
                tag: "HIZ BONUSU",
                title: "Her Kalan Saniye +5 Puan",
                desc: "Soru başına +75 puana kadar ekstra hız ödülü",
                color: COLORS.gold,
              },
              {
                inVal: bonus3In,
                tag: "SERİ BONUSU",
                title: "3. Doğruyla Başlayan Seri (+25 → +125)",
                desc: "Seriyi koru, her soruda bonusu katla",
                color: COLORS.coral,
              },
            ].map((item) => (
              <div
                key={item.tag}
                style={{
                  opacity: item.inVal,
                  transform: `translateX(${(1 - item.inVal) * -30}px)`,
                  padding: "14px 20px",
                  borderRadius: 14,
                  background: "rgba(16, 34, 26, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.text,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 13,
                      color: COLORS.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 1,
                    padding: "6px 12px",
                    borderRadius: 8,
                    color: item.color,
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${item.color}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Real Results Screen & Real Records Screen (960x642 = 16:10) */}
        <div
          style={{
            position: "relative",
            height: 670,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              transform: showRecords
                ? `translate(${-36 * recordsIn}px, ${-28 * recordsIn}px) scale(${1 - 0.08 * recordsIn})`
                : "none",
              opacity: showRecords ? 1 - 0.25 * recordsIn : 1,
            }}
          >
            <BrowserFrame
              src="results.png"
              width={960}
              height={642}
              urlText="golbilgi.app — Maç sonucu (4.445 Puan · Yeni Rekor)"
              imgScale={kenScale}
              imgTranslateX={kenX}
            />
          </div>

          {showRecords && (
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                opacity: recordsIn,
                transform: `translateY(${(1 - recordsIn) * 60}px) scale(${0.92 + 0.08 * recordsIn})`,
              }}
            >
              <BrowserFrame
                src="records.png"
                width={912}
                height={612}
                urlText="golbilgi.app — Rekorlarım (Tüm Kategoriler)"
                imgScale={1.0}
              />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
