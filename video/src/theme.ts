import { loadFont as loadBarlowCondensed } from "@remotion/google-fonts/BarlowCondensed";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";

const barlow = loadBarlowCondensed("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

const dmSans = loadDMSans("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

export const FONTS = {
  display: `${barlow.fontFamily}, "Barlow Condensed", Impact, sans-serif`,
  sans: `${dmSans.fontFamily}, "DM Sans", system-ui, sans-serif`,
};

export const COLORS = {
  bgDeep: "#0b1813",
  bgDarker: "#0a1611",
  panel: "#10221a",
  panelLight: "#162d21",
  heroGreenStart: "#183522",
  heroGreenEnd: "#12281d",
  gold: "#e9bf66",
  goldBright: "#f5cf7d",
  text: "#f2f1e8",
  textMuted: "#91a398",
  textSoft: "#c5d0c4",
  mint: "#8ac7a5",
  blue: "#93b9d8",
  coral: "#d88e83",
  purple: "#b2a0d4",
  line: "rgba(255, 255, 255, 0.09)",
  goldBorder: "rgba(233, 191, 102, 0.38)",
};
