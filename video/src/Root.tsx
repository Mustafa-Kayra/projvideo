import React from "react";
import { Composition } from "remotion";
import { GolBilgiPromo } from "./GolBilgiPromo";

export const RemotionRoot: React.FC = () => {
  // 180 + 255 + 300 + 255 + 300 + 225 + 195 - (6 * 15) = 1620 frames = 54.0 seconds @ 30fps
  return (
    <Composition
      id="GolBilgiPromo"
      component={GolBilgiPromo}
      durationInFrames={1620}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
