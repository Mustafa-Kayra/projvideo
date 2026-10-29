import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BrandLogo,
  BrowserFrame,
  SoccerBall,
  StadiumBackdrop,
} from "../components/DeviceMockups";
import { COLORS, FONTS } from "../theme";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const line1In = spring({
    frame: frame - 8,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  const line2In = spring({
    frame: frame - 22,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  const line3In = spring({
    frame: frame - 36,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const browserIn = spring({
    frame: frame - 46,
    fps,
    config: { damping: 16, stiffness: 105 },
  });

  const ballSpin = interpolate(frame, [0, 180], [-18, 28]);
  const ballFloat = Math.sin(frame * 0.06) * 10;

  const kenScale = interpolate(frame, [45, 180], [1.0, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kenX = interpolate(frame, [45, 180], [0, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kenY = interpolate(frame, [45, 180], [0, -6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.34} />

      <div
        style={{
          position: "absolute",
          left: 440,
          top: 520,
          width: 720,
          height: 720,
          borderRadius: "50%",
          border: "1px solid rgba(233, 191, 102, 0.12)",
          transform: `translate(-50%, -50%) scale(${0.92 + 0.08 * logoIn})`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 440,
          top: 520,
          width: 960,
          height: 960,
          borderRadius: "50%",
          border: "1px dashed rgba(138, 199, 165, 0.1)",
          transform: `translate(-50%, -50%) rotate(${frame * 0.15}deg)`,
          pointerEvents: "none",
        }}
      />

      {/* Top Header Bar */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 84,
          right: 84,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: logoIn,
          transform: `translateY(${(1 - logoIn) * -24}px)`,
        }}
      >
        <BrandLogo scale={0.95} />
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            borderRadius: 999,
            background: "rgba(16, 34, 26, 0.85)",
            border: "1px solid rgba(233, 191, 102, 0.3)",
            fontFamily: FONTS.sans,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
            color: COLORS.gold,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#8cbe80",
              boxShadow: "0 0 10px #8cbe80",
            }}
          />
          TRİBÜNLER HAZIR · BAŞLAMA VURUŞU
        </div>
      </div>

      {/* Main Content Split */}
      <div
        style={{
          position: "absolute",
          top: 156,
          bottom: 68,
          left: 84,
          right: 84,
          display: "grid",
          gridTemplateColumns: "0.96fr 1.04fr",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Left column: Giant Kinetic Typography */}
        <div style={{ position: "relative", zIndex: 5 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              opacity: line1In,
              transform: `translateX(${(1 - line1In) * -30}px)`,
            }}
          >
            <span
              style={{
                width: 32,
                height: 2,
                background: COLORS.gold,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: 3,
                color: "#c8d6c3",
              }}
            >
              FUTBOL BİLGİNİN SAHASI
            </span>
          </div>

          <div
            style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: 98,
              lineHeight: 0.95,
              letterSpacing: -1.5,
              textTransform: "uppercase",
              color: COLORS.text,
            }}
          >
            <div
              style={{
                opacity: line1In,
                transform: `translateY(${(1 - line1In) * 45}px) scale(${0.92 + 0.08 * line1In})`,
                transformOrigin: "left bottom",
              }}
            >
              FUTBOLU
            </div>
            <div
              style={{
                opacity: line1In,
                transform: `translateY(${(1 - line1In) * 45}px)`,
                marginBottom: 12,
              }}
            >
              SEVİYORSUN<span style={{ color: COLORS.gold }}>.</span>
            </div>
            <div
              style={{
                opacity: line2In,
                transform: `translateY(${(1 - line2In) * 45}px)`,
                color: "#d7e2d3",
                fontSize: 86,
              }}
            >
              PEKİ NE KADAR
            </div>
            <div
              style={{
                opacity: line3In,
                transform: `translateY(${(1 - line3In) * 50}px) scale(${0.9 + 0.1 * line3In})`,
                transformOrigin: "left center",
                color: COLORS.gold,
                textShadow: "0 12px 40px rgba(233, 191, 102, 0.32)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span>BİLİYORSUN?</span>
            </div>
          </div>

          {/* Subtitle & Floating Ball Motif Card */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: "18px 24px",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(24, 53, 34, 0.88), rgba(16, 34, 26, 0.88))",
              border: "1px solid rgba(233, 191, 102, 0.3)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
              maxWidth: 650,
              opacity: line3In,
              transform: `translateY(${(1 - line3In) * 30}px)`,
            }}
          >
            <div
              style={{
                transform: `translateY(${ballFloat}px) rotate(${ballSpin}deg)`,
                filter: "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.55))",
                flexShrink: 0,
              }}
            >
              <SoccerBall size={76} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.text,
                  marginBottom: 6,
                }}
              >
                Efsane isimler, unutulmaz finaller, büyük zaferler.
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 15,
                  color: COLORS.textMuted,
                  display: "flex",
                  gap: 16,
                }}
              >
                <span style={{ color: COLORS.gold, fontWeight: 600 }}>
                  ✓ 160 Özgün Soru
                </span>
                <span>•</span>
                <span>✓ 15 Saniye Karar</span>
                <span>•</span>
                <span>✓ Üyeliksiz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Real Home Screenshot in Browser Mockup (912x612 = exact 16:10 + 42px bar) */}
        <div
          style={{
            position: "relative",
            opacity: browserIn,
            transform: `translateX(${(1 - browserIn) * 80}px) scale(${0.92 + 0.08 * browserIn})`,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <BrowserFrame
            src="home.png"
            width={912}
            height={612}
            imgScale={kenScale}
            imgTranslateX={kenX}
            imgTranslateY={kenY}
          />

          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: 28,
              background: "#13281d",
              border: "1px solid rgba(233, 191, 102, 0.5)",
              borderRadius: 10,
              padding: "10px 18px",
              fontFamily: FONTS.sans,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1.5,
              color: COLORS.gold,
              boxShadow: "0 14px 32px rgba(0, 0, 0, 0.55)",
            }}
          >
            41° 00′ N / FUTBOLUN KALBİ
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
