import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrowserFrame, StadiumBackdrop } from "../components/DeviceMockups";
import { COLORS, FONTS } from "../theme";

export const Scene3Gameplay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const browserIn = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 110 },
  });

  // 3 Phases inside the 300-frame scene:
  // 0..95: Question state (15s timer)
  // 95..145: Option D hovered/selected (14s timer)
  // 145..300: Correct Answer Feedback + "Biliyor muydun?"
  const currentScreenshot =
    frame < 95
      ? "question.png"
      : frame < 145
        ? "question-selected.png"
        : "feedback-correct.png";

  const isFeedback = frame >= 145;
  const isSelecting = frame >= 95 && frame < 145;

  const feedbackPopupIn = spring({
    frame: frame - 150,
    fps,
    config: { damping: 13, stiffness: 125 },
  });

  const timerSeconds =
    frame < 45 ? 15 : frame < 95 ? 14 : frame < 145 ? 13 : 13;

  // Subtle Ken Burns keeping full UI visible
  const kenScale = interpolate(
    frame,
    [0, 95, 145, 300],
    [1.0, 1.02, 1.03, 1.05],
    { extrapolateRight: "clamp" },
  );
  const kenX = interpolate(frame, [0, 300], [0, -12], {
    extrapolateRight: "clamp",
  });
  const kenY = interpolate(frame, [0, 300], [0, -10], {
    extrapolateRight: "clamp",
  });

  const clickRipple = interpolate(frame, [130, 152], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.2} />

      <div
        style={{
          position: "absolute",
          top: 56,
          bottom: 56,
          left: 84,
          right: 84,
          display: "grid",
          gridTemplateColumns: "0.86fr 1.14fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* Left Column: Kinetic Story + Timer + Biliyor muydun Callout */}
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
              OYUN ANI · HIZLI DÜŞÜN, DOĞRU SEÇ
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
              HER SORUYA{" "}
              <span style={{ color: COLORS.gold }}>15 SANİYE.</span>
            </div>
          </div>

          {/* Live Step Indicators */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {/* 15s Timer Card */}
            <div
              style={{
                padding: "16px 18px",
                borderRadius: 16,
                background: !isFeedback
                  ? "linear-gradient(135deg, rgba(233, 191, 102, 0.2), rgba(16, 34, 26, 0.95))"
                  : "rgba(16, 34, 26, 0.85)",
                border: !isFeedback
                  ? `2px solid ${COLORS.gold}`
                  : "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 54,
                  fontWeight: 800,
                  color: COLORS.gold,
                  lineHeight: 1,
                  minWidth: 58,
                  textAlign: "center",
                }}
              >
                {isFeedback ? "✓" : `${timerSeconds}`}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    color: COLORS.gold,
                  }}
                >
                  GERİ SAYIM SAYACI
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 15,
                    fontWeight: 600,
                    color: COLORS.text,
                    marginTop: 4,
                  }}
                >
                  {isFeedback
                    ? "+65 Hız Bonusu!"
                    : isSelecting
                      ? "D Şıkkı Seçiliyor..."
                      : "15 sn karar süresi"}
                </div>
              </div>
            </div>

            {/* Instant Score & Streak Card */}
            <div
              style={{
                padding: "16px 18px",
                borderRadius: 16,
                background: isFeedback
                  ? "linear-gradient(135deg, rgba(138, 199, 165, 0.22), rgba(16, 34, 26, 0.95))"
                  : "rgba(16, 34, 26, 0.85)",
                border: isFeedback
                  ? `2px solid ${COLORS.mint}`
                  : "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 46,
                  fontWeight: 800,
                  color: isFeedback ? COLORS.mint : COLORS.text,
                  lineHeight: 1,
                }}
              >
                {isFeedback ? "+415" : "3🔥"}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    color: isFeedback ? COLORS.mint : COLORS.textMuted,
                  }}
                >
                  {isFeedback ? "GOL! DOĞRU CEVAP" : "AKTİF SERİ"}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 15,
                    fontWeight: 600,
                    color: COLORS.text,
                    marginTop: 4,
                  }}
                >
                  {isFeedback ? "4 Doğru Seri · 1.550 Puan" : "1.135 Puan"}
                </div>
              </div>
            </div>
          </div>

          {/* Real Question / Feedback Card Zoom Callout (Full uncropped width!) */}
          <div
            style={{
              borderRadius: 18,
              background: "#0d1e16",
              border: isFeedback
                ? `2px solid ${COLORS.mint}`
                : "1px solid rgba(255, 255, 255, 0.14)",
              padding: 18,
              boxShadow: isFeedback
                ? "0 24px 60px rgba(0, 0, 0, 0.65), 0 0 35px rgba(138, 199, 165, 0.22)"
                : "0 16px 40px rgba(0, 0, 0, 0.4)",
              transform: `scale(${isFeedback ? 0.96 + 0.04 * feedbackPopupIn : 0.96})`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
                fontFamily: FONTS.sans,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1.4,
                  color: isFeedback ? COLORS.mint : COLORS.gold,
                }}
              >
                {isFeedback
                  ? "✦ DOĞRU CEVAP & BİLİYOR MUYDUN?"
                  : "✦ DÖRT ŞIK · KLAVYE (1-4) VEYA TIKLAMA"}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.gold,
                  background: "rgba(233, 191, 102, 0.12)",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                {isFeedback ? "Miroslav Klose ✓ (+415 Puan)" : "Soru 04 / 10"}
              </span>
            </div>

            {!isFeedback && (
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "#112219",
                padding: 0,
              }}
            >
              <Img
                src={staticFile(
                  "question-card.png",
                )}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 230,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
            )}
            {isFeedback && (
              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: 10,
                  background: "rgba(138, 199, 165, 0.1)",
                  border: "1px solid rgba(138, 199, 165, 0.25)",
                  fontFamily: FONTS.sans,
                  fontSize: 22,
                  color: COLORS.textSoft,
                  lineHeight: 1.45,
                }}
              >
                <strong style={{ color: COLORS.gold }}>Biliyor muydun?</strong>{" "}
                Klose, 2006’da grup aşamasında dört, Arjantin’e karşı çeyrek
                finalde bir gol attı.{" "}
                <span style={{ color: COLORS.mint, fontWeight: 700 }}>
                  (Temel 300 + hız 65 + seri 50)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Large Browser Frame showing real gameplay sequence (960x642 = exact 16:10) */}
        <div
          style={{
            position: "relative",
            opacity: browserIn,
            transform: `translateX(${(1 - browserIn) * 60}px)`,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <BrowserFrame
            src={currentScreenshot}
            width={960}
            height={642}
            urlText="golbilgi.app — Oyun zamanı (Klasik · Zor)"
            imgScale={kenScale}
            imgTranslateX={kenX}
            imgTranslateY={kenY}
          >
            {frame >= 115 && frame <= 155 && (
              <div
                style={{
                  position: "absolute",
                  right: 220,
                  bottom: 185,
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  border: `3px solid ${COLORS.gold}`,
                  background: "rgba(233, 191, 102, 0.22)",
                  transform: `translate(50%, 50%) scale(${0.5 + clickRipple * 1.3})`,
                  opacity: 1 - clickRipple * 0.85,
                  pointerEvents: "none",
                }}
              />
            )}
          </BrowserFrame>
        </div>
      </div>
    </AbsoluteFill>
  );
};
