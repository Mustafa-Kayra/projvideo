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
  SoccerBall,
  StadiumBackdrop,
} from "../components/DeviceMockups";
import { COLORS, FONTS } from "../theme";

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const titleSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 13, stiffness: 125 },
  });

  const pillsSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 115 },
  });

  const ctaSpring = spring({
    frame: frame - 46,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const pulse = 1 + Math.sin(frame * 0.12) * 0.025;
  const ballRotate = interpolate(frame, [0, 195], [0, 55]);

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.42} />

      {/* Center Radial Gold Spotlight */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          width: 1100,
          height: 700,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, rgba(233, 191, 102, 0.18) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      {/* Orbital Stadium Rings */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 820,
          height: 820,
          borderRadius: "50%",
          border: "1px solid rgba(233, 191, 102, 0.16)",
          transform: `translate(-50%, -50%) scale(${0.9 + 0.1 * logoSpring})`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1080,
          height: 1080,
          borderRadius: "50%",
          border: "1px dashed rgba(138, 199, 165, 0.14)",
          transform: `translate(-50%, -50%) rotate(${frame * 0.12}deg)`,
          pointerEvents: "none",
        }}
      />

      {/* Floating Decorative Soccer Balls */}
      <div
        style={{
          position: "absolute",
          left: 135,
          top: 170,
          opacity: 0.22 * logoSpring,
          transform: `rotate(${-ballRotate}deg)`,
        }}
      >
        <SoccerBall size={130} />
      </div>
      <div
        style={{
          position: "absolute",
          right: 135,
          top: 190,
          opacity: 0.22 * logoSpring,
          transform: `rotate(${ballRotate}deg)`,
        }}
      >
        <SoccerBall size={150} />
      </div>

      {/* Main Centered CTA Stack */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 100px",
          textAlign: "center",
        }}
      >
        {/* Brand Logo */}
        <div
          style={{
            opacity: logoSpring,
            transform: `translateY(${(1 - logoSpring) * 35}px) scale(${0.85 + 0.15 * logoSpring})`,
            marginBottom: 28,
          }}
        >
          <BrandLogo scale={1.65} />
        </div>

        {/* Kicker */}
        <div
          style={{
            opacity: titleSpring,
            transform: `translateY(${(1 - titleSpring) * 25}px)`,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 20px",
            borderRadius: 999,
            background: "rgba(24, 53, 34, 0.85)",
            border: "1px solid rgba(233, 191, 102, 0.35)",
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 3,
            color: COLORS.gold,
            marginBottom: 22,
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
          FUTBOL BİLGİNİN SAHASI
        </div>

        {/* Main CTA Headline: "GolBilgi — Bilginle sahaya çık." */}
        <div
          style={{
            opacity: titleSpring,
            transform: `translateY(${(1 - titleSpring) * 40}px) scale(${0.94 + 0.06 * titleSpring})`,
            fontFamily: FONTS.display,
            fontSize: 106,
            fontWeight: 800,
            lineHeight: 0.98,
            letterSpacing: -1.5,
            color: COLORS.text,
            textTransform: "uppercase",
            maxWidth: 1500,
          }}
        >
          GOLBİLGİ —{" "}
          <span
            style={{
              color: COLORS.gold,
              textShadow: "0 14px 45px rgba(233, 191, 102, 0.35)",
            }}
          >
            BİLGİNLE SAHAYA ÇIK.
          </span>
        </div>

        {/* Feature Summary Pills */}
        <div
          style={{
            marginTop: 34,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: pillsSpring,
            transform: `translateY(${(1 - pillsSpring) * 28}px)`,
          }}
        >
          {[
            "5 Kategori · 160 Özgün Soru",
            "Klasik 10 Soru & 60 sn Zamana Karşı",
            "Kolay · Orta · Zor Çarpanlar",
            "Ücretsiz · Üyeliksiz · Mobil Uyumlu",
          ].map((pill) => (
            <div
              key={pill}
              style={{
                padding: "12px 22px",
                borderRadius: 12,
                background: "rgba(16, 34, 26, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                fontFamily: FONTS.sans,
                fontSize: 16,
                fontWeight: 600,
                color: COLORS.textSoft,
              }}
            >
              <span style={{ color: COLORS.gold, marginRight: 8 }}>★</span>
              {pill}
            </div>
          ))}
        </div>

        {/* Gold CTA Action Button */}
        <div
          style={{
            marginTop: 42,
            opacity: ctaSpring,
            transform: `translateY(${(1 - ctaSpring) * 30}px) scale(${pulse})`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 20,
              padding: "22px 48px",
              borderRadius: 14,
              background: COLORS.gold,
              color: "#142419",
              fontFamily: FONTS.sans,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: -0.3,
              boxShadow:
                "0 20px 55px rgba(233, 191, 102, 0.38), 0 4px 0 rgba(0, 0, 0, 0.25)",
            }}
          >
            <span>Şimdi Sahaya Çık · Hemen Oyna</span>
            <span style={{ fontSize: 28, lineHeight: 1 }}>→</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
