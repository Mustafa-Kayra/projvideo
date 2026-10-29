import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Categories } from "./scenes/Scene2Categories";
import { Scene3Gameplay } from "./scenes/Scene3Gameplay";
import { Scene4Modes } from "./scenes/Scene4Modes";
import { Scene5ScoringResults } from "./scenes/Scene5ScoringResults";
import { Scene6Mobile } from "./scenes/Scene6Mobile";
import { Scene7CTA } from "./scenes/Scene7CTA";
import { COLORS } from "./theme";

export const GolBilgiPromo: React.FC = () => {
  const transitionDuration = 15; // 0.5s at 30fps

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDeep }}>
      <Audio src={staticFile("soundtrack.wav")} volume={0.85} />

      <TransitionSeries>
        {/* 1. Hook (180 frames = 6.0s) */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <Scene1Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 2. Kategoriler & 160 Soru (255 frames = 8.5s) */}
        <TransitionSeries.Sequence durationInFrames={255}>
          <Scene2Categories />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 3. Oyun Anı & Biliyor muydun? (300 frames = 10.0s) */}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene3Gameplay />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 4. Modlar & Zorluk Seviyeleri (255 frames = 8.5s) */}
        <TransitionSeries.Sequence durationInFrames={255}>
          <Scene4Modes />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 5. Puan, Seri, Hız Bonusu, Sonuç & Rekorlar (300 frames = 10.0s) */}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene5ScoringResults />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 6. Mobil Görünüm (225 frames = 7.5s) */}
        <TransitionSeries.Sequence durationInFrames={225}>
          <Scene6Mobile />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* 7. CTA — GolBilgi: Bilginle sahaya çık. (195 frames = 6.5s) */}
        <TransitionSeries.Sequence durationInFrames={195}>
          <Scene7CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
