import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS, FONTS } from "../theme";
import { useCurrentFrame } from "remotion";

export const SoccerBall: React.FC<{
  size?: number;
  color?: string;
  strokeColor?: string;
  style?: React.CSSProperties;
}> = ({ size = 120, color = "#e3e7c6", strokeColor = "#183e2b", style }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={style}
    >
      <circle cx="50" cy="50" r="46" fill={color} />
      <g stroke={strokeColor} strokeWidth="1.4">
        <path d="m50 28 20 15-8 24H38l-8-24z" fill={strokeColor} />
        <path d="m50 28 1-24M70 43l25-6M62 67l15 23M38 67 23 90M30 43 5 37" />
        <path
          d="m24 12 3 15L9 34M75 12l-3 15 19 7M96 58 81 65l-1 21M51 96l-10-9H27M4 58l15 7 1 21"
          fill={strokeColor}
        />
      </g>
      <ellipse
        cx="36"
        cy="23"
        rx="20"
        ry="10"
        fill="white"
        opacity=".22"
        transform="rotate(-30 36 23)"
      />
    </svg>
  );
};

export const BrandLogo: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14 * scale,
        fontFamily: FONTS.sans,
        fontSize: 38 * scale,
        fontWeight: 800,
        letterSpacing: -1.8 * scale,
        color: COLORS.text,
      }}
    >
      <span
        style={{
          height: 50 * scale,
          width: 50 * scale,
          background: COLORS.gold,
          borderRadius: 14 * scale,
          transform: "rotate(-8deg)",
          display: "grid",
          placeItems: "center",
          boxShadow: `0 ${10 * scale}px ${28 * scale}px rgba(233, 191, 102, 0.28)`,
        }}
      >
        <SoccerBall
          size={39 * scale}
          color="#ecddb2"
          strokeColor="#183e2b"
          style={{ transform: "rotate(8deg)" }}
        />
      </span>
      <span>
        gol<span style={{ fontWeight: 450 }}>bilgi</span>
        <span style={{ color: COLORS.gold }}>.</span>
      </span>
    </div>
  );
};

export const StadiumBackdrop: React.FC<{
  showPitch?: boolean;
  pitchOpacity?: number;
}> = ({ showPitch = true, pitchOpacity = 0.25 }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.02) * 12;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: COLORS.bgDeep,
        backgroundImage: `
          radial-gradient(ellipse 75% 60% at 72% 28%, rgba(48, 82, 53, 0.42), transparent 65%),
          radial-gradient(ellipse 55% 50% at 20% 80%, rgba(233, 191, 102, 0.09), transparent 60%),
          linear-gradient(135deg, #0b1813 0%, #0e2119 55%, #09140f 100%)
        `,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          opacity: 0.65,
        }}
      />

      {showPitch && (
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -140,
            width: 1050,
            height: 680,
            opacity: pitchOpacity,
            transform: `perspective(900px) rotateX(56deg) rotateZ(-24deg) translateY(${drift}px)`,
            background: `repeating-linear-gradient(
              90deg,
              rgba(88, 115, 77, 0.22) 0px,
              rgba(88, 115, 77, 0.22) 70px,
              rgba(37, 70, 44, 0.26) 70px,
              rgba(37, 70, 44, 0.26) 140px
            )`,
            border: "2px solid rgba(187, 199, 153, 0.35)",
            borderRadius: 10,
            boxShadow: "0 50px 90px rgba(3, 25, 12, 0.65)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 28,
              border: "2px solid rgba(187, 199, 153, 0.42)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                borderLeft: "2px solid rgba(187, 199, 153, 0.42)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 170,
                height: 170,
                border: "2px solid rgba(187, 199, 153, 0.42)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -2,
                top: "50%",
                width: 130,
                height: 280,
                transform: "translateY(-50%)",
                border: "2px solid rgba(187, 199, 153, 0.42)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -2,
                top: "50%",
                width: 130,
                height: 280,
                transform: "translateY(-50%)",
                border: "2px solid rgba(187, 191, 153, 0.42)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const BrowserFrame: React.FC<{
  src: string;
  width?: number;
  height?: number;
  urlText?: string;
  imgScale?: number;
  imgTranslateX?: number;
  imgTranslateY?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({
  src,
  width = 960,
  height = 642,
  urlText = "golbilgi.app — Futbol bilginin sahası",
  imgScale = 1,
  imgTranslateX = 0,
  imgTranslateY = 0,
  style,
  children,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 18,
        background: "#09140f",
        border: "1px solid rgba(233, 191, 102, 0.28)",
        boxShadow:
          "0 36px 90px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {/* Top browser chrome bar (42px -> leaves 960x600 = 16:10 exact match for 2880x1800 screenshots) */}
      <div
        style={{
          height: 42,
          background: "linear-gradient(180deg, #13271d 0%, #0d1c15 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: 14,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#d88e83",
              opacity: 0.85,
            }}
          />
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#e9bf66",
              opacity: 0.85,
            }}
          />
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#8ac7a5",
              opacity: 0.85,
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 460,
            margin: "0 auto",
            height: 26,
            borderRadius: 6,
            background: "rgba(10, 22, 17, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: FONTS.sans,
            fontSize: 12,
            color: "#9fb0a3",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#8cbe80",
              boxShadow: "0 0 6px #8cbe80",
            }}
          />
          {urlText}
        </div>
        <div style={{ width: 48 }} />
      </div>

      {/* Viewport content */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          background: COLORS.bgDeep,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "top left",
            transform: `scale(${imgScale}) translate(${imgTranslateX}px, ${imgTranslateY}px)`,
            transformOrigin: "left top",
          }}
        />
        {children}
      </div>
    </div>
  );
};

export const PhoneFrame: React.FC<{
  src: string;
  width?: number;
  height?: number;
  imgScale?: number;
  imgTranslateY?: number;
  style?: React.CSSProperties;
  badgeText?: string;
}> = ({
  src,
  width = 324,
  height = 688,
  imgScale = 1,
  imgTranslateY = 0,
  style,
  badgeText,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 46,
        padding: 11,
        background:
          "linear-gradient(145deg, #2b4435 0%, #13241b 50%, #243a2d 100%)",
        border: "2px solid rgba(233, 191, 102, 0.38)",
        boxShadow:
          "0 35px 80px rgba(0, 0, 0, 0.72), inset 0 1px 2px rgba(255, 255, 255, 0.22)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* Inner screen */}
      <div
        style={{
          flex: 1,
          borderRadius: 36,
          overflow: "hidden",
          position: "relative",
          background: COLORS.bgDeep,
          border: "1px solid rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* Dynamic island notch */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 84,
            height: 20,
            borderRadius: 12,
            background: "#050c09",
            border: "1px solid rgba(255,255,255,0.08)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 10,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#173626",
            }}
          />
        </div>

        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "top center",
            transform: `scale(${imgScale}) translateY(${imgTranslateY}px)`,
            transformOrigin: "top center",
          }}
        />

        {/* Home indicator bar */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 105,
            height: 4,
            borderRadius: 4,
            background: "rgba(242, 241, 232, 0.45)",
            zIndex: 10,
          }}
        />
      </div>

      {badgeText && (
        <div
          style={{
            position: "absolute",
            bottom: -18,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#13281d",
            border: "1px solid rgba(233, 191, 102, 0.55)",
            borderRadius: 999,
            padding: "7px 18px",
            fontFamily: FONTS.sans,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.8,
            color: COLORS.gold,
            whiteSpace: "nowrap",
            boxShadow: "0 10px 24px rgba(0,0,0,0.5)",
          }}
        >
          {badgeText}
        </div>
      )}
    </div>
  );
};
