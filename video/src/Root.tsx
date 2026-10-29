import React from "react";
import { Composition } from "remotion";
import { GolBilgiPromo } from "./GolBilgiPromo";
import { GolBilgiPromoVertical } from "./GolBilgiPromoVertical";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 16:9 Horizontal Composition (54.0s @ 30fps) */}
      <Composition
        id="GolBilgiPromo"
        component={GolBilgiPromo}
        durationInFrames={1620}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* 9:16 Vertical Composition with Turkish Voiceover (50.0s @ 30fps) */}
      <Composition
        id="GolBilgiPromoVertical"
        component={GolBilgiPromoVertical}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
