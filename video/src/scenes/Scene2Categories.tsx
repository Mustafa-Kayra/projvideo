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

const CATEGORIES = [
  {
    id: "clubs",
    name: "Kulüpler",
    count: "40 SORU",
    color: COLORS.mint,
    file: "cat-clubs.png",
  },
  {
    id: "players",
    name: "Futbolcular",
    count: "40 SORU",
    color: COLORS.blue,
    file: "cat-players.png",
  },
  {
    id: "winners",
    name: "Kupa Kazananlar",
    count: "40 SORU",
    color: COLORS.gold,
    file: "cat-winners.png",
  },
  {
    id: "turkish",
    name: "Türk Futbolu",
    count: "40 SORU",
    color: COLORS.coral,
    file: "cat-turkish.png",
  },
  {
    id: "mixed",
    name: "Karışık",
    count: "160 SORU",
    color: COLORS.purple,
    file: "cat-mixed.png",
  },
];

export const Scene2Categories: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const counterProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const questionCount = Math.round(
    interpolate(counterProgress, [0, 1], [0, 160]),
  );

  // Gentle Ken Burns on the browser showing home.png
  const browserScale = interpolate(frame, [0, 255], [1.0, 1.04], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch={false} />

      {/* Top Section: Kinetic Header + 160 Soru Counter + Real Browser Preview */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 84,
          right: 84,
          display: "grid",
          gridTemplateColumns: "1.08fr 0.92fr",
          gap: 36,
          alignItems: "center",
        }}
      >
        {/* Left: Kinetic Typography & 160 Soru Hero Pill */}
        <div
          style={{
            opacity: headerIn,
            transform: `translateY(${(1 - headerIn) * 32}px)`,
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
              letterSpacing: 2.5,
              color: COLORS.gold,
              marginBottom: 12,
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
            HER MAÇ YENİ BİR HİKÂYE · SAHANI SEÇ
          </div>

          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: -1,
              color: COLORS.text,
              textTransform: "uppercase",
            }}
          >
            5 FARKLI KATEGORİ<span style={{ color: COLORS.gold }}>.</span>
          </div>

          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 20,
              lineHeight: 1.5,
              color: COLORS.textSoft,
              marginTop: 14,
              maxWidth: 680,
            }}
          >
            Kulüplerden efsane futbolculara, unutulmaz kupalardan Türk futbol
            tarihine kadar doğrulanmış soru havuzu.
          </p>

          {/* Giant 160 Soru Badge */}
          <div
            style={{
              marginTop: 22,
              display: "inline-flex",
              alignItems: "center",
              gap: 24,
              padding: "16px 28px",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(233, 191, 102, 0.16), rgba(24, 53, 34, 0.9))",
              border: "2px solid rgba(233, 191, 102, 0.55)",
              boxShadow: "0 18px 45px rgba(0, 0, 0, 0.45)",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 74,
                fontWeight: 800,
                lineHeight: 0.9,
                color: COLORS.gold,
                minWidth: 115,
              }}
            >
              {questionCount}
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 34,
                  fontWeight: 700,
                  color: COLORS.text,
                  letterSpacing: 0.5,
                  lineHeight: 1,
                }}
              >
                SORU BANKASI
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 14,
                  color: COLORS.textMuted,
                  marginTop: 5,
                }}
              >
                Her kategoride 40 özgün soru · Karışık modda tam 160 soru
              </div>
            </div>
          </div>
        </div>

        {/* Right: Real Browser Frame with full 16:10 aspect ratio */}
        <div
          style={{
            opacity: headerIn,
            transform: `translateX(${(1 - headerIn) * 40}px)`,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <BrowserFrame
            src="home.png"
            width={688}
            height={472}
            urlText="golbilgi.app — Sahanı seç"
            imgScale={browserScale}
          />
        </div>
      </div>

      {/* Bottom Section: 5 Real Category Card Screenshots entering one by one (exact native aspect ratio 432x382, zero cropping!) */}
      <div
        style={{
          position: "absolute",
          left: 84,
          right: 84,
          bottom: 52,
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 22,
        }}
      >
        {CATEGORIES.map((cat, index) => {
          const delay = 28 + index * 22;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 13, stiffness: 120 },
          });

          const highlight = interpolate(
            frame - delay,
            [0, 18, 45],
            [0, 1, 0.25],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          return (
            <div
              key={cat.id}
              style={{
                opacity: cardSpring,
                transform: `translateY(${(1 - cardSpring) * 90}px) scale(${0.86 + 0.14 * cardSpring})`,
                display: "flex",
                flexDirection: "column",
                borderRadius: 18,
                background: "#10221a",
                border: `2px solid ${cat.color}`,
                boxShadow: `0 24px 50px rgba(0, 0, 0, 0.6), 0 0 ${32 * highlight}px ${cat.color}`,
                overflow: "hidden",
              }}
            >
              {/* Top pill showing order & question count */}
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(10, 22, 17, 0.94)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: FONTS.sans,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: cat.color,
                    letterSpacing: 1,
                  }}
                >
                  0{index + 1} · {cat.name.toLocaleUpperCase("tr-TR")}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.07)",
                    color: COLORS.text,
                  }}
                >
                  {cat.count}
                </span>
              </div>

              {/* Real Playwright Screenshot of the Category Card with zero cropping */}
              <div
                style={{
                  padding: 8,
                  background: "#102018",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img
                  src={staticFile(cat.file)}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: 10,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
