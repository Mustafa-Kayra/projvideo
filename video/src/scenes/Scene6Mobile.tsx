import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PhoneFrame, StadiumBackdrop } from "../components/DeviceMockups";
import { COLORS, FONTS } from "../theme";

export const Scene6Mobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const phoneLeftIn = spring({
    frame: frame - 14,
    fps,
    config: { damping: 14, stiffness: 115 },
  });

  const phoneCenterIn = spring({
    frame: frame - 28,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  const phoneRightIn = spring({
    frame: frame - 42,
    fps,
    config: { damping: 14, stiffness: 115 },
  });

  // Center phone transitions from mobile-question.png to mobile-feedback.png at frame 110
  const centerPhoneImg =
    frame < 110 ? "mobile-question.png" : "mobile-feedback.png";

  return (
    <AbsoluteFill>
      <StadiumBackdrop showPitch pitchOpacity={0.28} />

      <div
        style={{
          position: "absolute",
          top: 56,
          bottom: 56,
          left: 84,
          right: 84,
          display: "grid",
          gridTemplateColumns: "0.78fr 1.22fr",
          gap: 36,
          alignItems: "center",
        }}
      >
        {/* Left Column: Kinetic Typography */}
        <div
          style={{
            opacity: textIn,
            transform: `translateX(${(1 - textIn) * -35}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 24,
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
              HER EKRANDA KUSURSUZ DENEYİM
            </div>

            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 88,
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: -1.2,
                color: COLORS.text,
                textTransform: "uppercase",
              }}
            >
              CEBİNDEKİ
              <br />
              <span style={{ color: COLORS.gold }}>STADYUM.</span>
            </div>

            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 20,
                lineHeight: 1.55,
                color: COLORS.textSoft,
                marginTop: 18,
              }}
            >
              Mobil uyumlu arayüzüyle otobüste, tribünde ya da devre arasında
              tek dokunuşla maça başla.
            </p>
          </div>

          {/* Mobile feature badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                title: "%100 Duyarlı Mobil Tasarım",
                desc: "Telefon ve tablet ekranlarına özel akıcı düzen",
              },
              {
                title: "Üyeliksiz & Kurulumsuz",
                desc: "Tarayıcıdan anında açılır, rekorların cihazında saklanır",
              },
              {
                title: "Tek Elle Hızlı Seçim",
                desc: "Geniş dokunmatik şıklar ve anlık geri bildirim",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: "rgba(16, 34, 26, 0.9)",
                  border: "1px solid rgba(233, 191, 102, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "rgba(233, 191, 102, 0.16)",
                    color: COLORS.gold,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: FONTS.sans,
                    fontWeight: 800,
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 17,
                      fontWeight: 700,
                      color: COLORS.text,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 14,
                      color: COLORS.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3 Smartphone Mockups with Real Mobile Screenshots */}
        <div
          style={{
            position: "relative",
            height: 780,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Left Phone: Mobile Home */}
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 60,
              opacity: phoneLeftIn,
              transform: `translateY(${(1 - phoneLeftIn) * 80}px) rotate(-6deg) scale(0.92)`,
              zIndex: 2,
            }}
          >
            <PhoneFrame
              src="mobile-home.png"
              width={316}
              height={680}
              imgScale={1}
              imgTranslateY={0}
              badgeText="ANA SAYFA"
            />
          </div>

          {/* Right Phone: Mobile Setup */}
          <div
            style={{
              position: "absolute",
              right: 20,
              top: 60,
              opacity: phoneRightIn,
              transform: `translateY(${(1 - phoneRightIn) * 80}px) rotate(6deg) scale(0.92)`,
              zIndex: 2,
            }}
          >
            <PhoneFrame
              src="mobile-setup.png"
              width={316}
              height={680}
              imgScale={1}
              imgTranslateY={0}
              badgeText="MAÇ HAZIRLIĞI"
            />
          </div>

          {/* Center Hero Phone: Mobile Gameplay -> Feedback */}
          <div
            style={{
              position: "relative",
              opacity: phoneCenterIn,
              transform: `translateY(${(1 - phoneCenterIn) * 90}px) scale(${0.92 + 0.08 * phoneCenterIn})`,
              zIndex: 5,
            }}
          >
            <PhoneFrame
              src={centerPhoneImg}
              width={344}
              height={738}
              imgScale={1}
              imgTranslateY={0}
              badgeText={
                frame < 110 ? "MOBİL OYUN EKRANI" : "DOĞRU CEVAP · +270 PUAN"
              }
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
