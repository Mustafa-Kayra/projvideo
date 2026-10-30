(function () {
  'use strict';

  var SL = (window.SL = window.SL || {});

  var STORAGE_KEY = 'sonisik_muted';
  var ctx = null;
  var master = null;
  var fxIn = null;
  var rainGain = null;
  var rainFilter = null;
  var droneGain = null;
  var droneOsc1 = null;
  var droneOsc2 = null;
  var droneFilter = null;
  var ambientTimer = null;
  var currentTheme = 'title';
  var pauseUntil = 0;
  var muted = false;

  try {
    muted = window.localStorage && window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch (e) {
    muted = false;
  }

  var THEMES = {
    title: {
      scale: [57, 60, 62, 64, 65, 69, 71, 72, 76],
      rain: 0.08,
      rainFreq: 1050,
      drone: 0.03,
      droneRoot: 55.0,
      interval: 2800
    },
    town: {
      scale: [57, 60, 62, 64, 67, 69, 71, 72, 76],
      rain: 0.13,
      rainFreq: 1150,
      drone: 0.015,
      droneRoot: 55.0,
      interval: 3100
    },
    forest: {
      scale: [52, 53, 55, 57, 59, 60, 64, 65, 67],
      rain: 0.045,
      rainFreq: 800,
      drone: 0.075,
      droneRoot: 41.2,
      interval: 3400
    },
    lab: {
      scale: [50, 53, 56, 57, 60, 62, 65, 68, 69],
      rain: 0.0,
      rainFreq: 600,
      drone: 0.095,
      droneRoot: 36.71,
      interval: 3800
    },
    lighthouse: {
      scale: [57, 60, 64, 66, 69, 71, 72, 76, 79, 81],
      rain: 0.04,
      rainFreq: 900,
      drone: 0.04,
      droneRoot: 55.0,
      interval: 2600
    }
  };

  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function createNoiseBuffer(audioCtx, seconds) {
    var length = Math.max(1, Math.floor(audioCtx.sampleRate * seconds));
    var buffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate);
    var data = buffer.getChannelData(0);
    var last = 0;
    for (var i = 0; i < length; i++) {
      var white = Math.random() * 2 - 1;
      last = (last + 0.04 * white) / 1.04;
      data[i] = last * 2.2;
    }
    return buffer;
  }

  function applyTheme() {
    if (!ctx) return;
    var cfg = THEMES[currentTheme] || THEMES.town;
    var now = ctx.currentTime;
    try {
      if (rainGain) {
        rainGain.gain.setTargetAtTime(cfg.rain, now, 0.6);
      }
      if (rainFilter) {
        rainFilter.frequency.setTargetAtTime(cfg.rainFreq, now, 0.6);
      }
      if (droneGain) {
        droneGain.gain.setTargetAtTime(cfg.drone, now, 0.8);
      }
      if (droneOsc1 && droneOsc2) {
        droneOsc1.frequency.setTargetAtTime(cfg.droneRoot, now, 0.8);
        droneOsc2.frequency.setTargetAtTime(cfg.droneRoot * 1.5, now, 0.8);
      }
    } catch (e) {}
  }

  function playPianoNote(midi, delaySec, duration, volume) {
    if (!ctx || !fxIn || muted) return;
    try {
      var now = ctx.currentTime + (delaySec || 0);
      var dur = duration || 3.2;
      var vol = volume || 0.08;
      var freq = mtof(midi);

      var osc1 = ctx.createOscillator();
      var osc2 = ctx.createOscillator();
      var filter = ctx.createBiquadFilter();
      var env = ctx.createGain();
      var subGain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);
      subGain.gain.setValueAtTime(0.22, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(Math.min(4800, freq * 4.5), now);
      filter.frequency.exponentialRampToValueAtTime(Math.max(260, freq * 1.15), now + dur);

      env.gain.setValueAtTime(0.0001, now);
      env.gain.linearRampToValueAtTime(vol, now + 0.025);
      env.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc1.connect(filter);
      osc2.connect(subGain);
      subGain.connect(filter);
      filter.connect(env);
      env.connect(fxIn);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + dur + 0.05);
      osc2.stop(now + dur + 0.05);
    } catch (e) {}
  }

  function stepAmbient() {
    if (!ctx || muted) return;
    if (ctx.state === 'suspended') return;
    if (ctx.currentTime < pauseUntil) return;
    if (Math.random() < 0.22) return;

    var cfg = THEMES[currentTheme] || THEMES.town;
    var scale = cfg.scale;
    var idx = Math.floor(Math.random() * scale.length);
    var note = scale[idx];
    playPianoNote(note, 0, 3.4, 0.075);

    if (Math.random() < 0.38) {
      var idx2 = Math.max(0, Math.min(scale.length - 1, idx + (Math.random() < 0.5 ? 2 : -1)));
      playPianoNote(scale[idx2], 0.45 + Math.random() * 0.35, 3.0, 0.05);
    }
  }

  function init() {
    if (ctx) {
      try {
        if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
          ctx.resume();
        }
      } catch (e) {}
      return;
    }

    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    try {
      ctx = new AudioCtx();
      if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
        ctx.resume();
      }

      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.8;
      master.connect(ctx.destination);

      fxIn = ctx.createGain();
      fxIn.gain.value = 1.0;
      fxIn.connect(master);

      var delay = ctx.createDelay(1.0);
      delay.delayTime.value = 0.38;
      var damp = ctx.createBiquadFilter();
      damp.type = 'lowpass';
      damp.frequency.value = 1700;
      var fb = ctx.createGain();
      fb.gain.value = 0.42;
      var wet = ctx.createGain();
      wet.gain.value = 0.36;

      fxIn.connect(delay);
      delay.connect(damp);
      damp.connect(fb);
      fb.connect(delay);
      damp.connect(wet);
      wet.connect(master);

      var noiseBuf = createNoiseBuffer(ctx, 2.5);
      var rainSrc = ctx.createBufferSource();
      rainSrc.buffer = noiseBuf;
      rainSrc.loop = true;

      rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.value = 1050;
      rainFilter.Q.value = 0.65;

      rainGain = ctx.createGain();
      rainGain.gain.value = 0.0001;

      rainSrc.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(master);
      rainSrc.start(0);

      droneOsc1 = ctx.createOscillator();
      droneOsc2 = ctx.createOscillator();
      droneFilter = ctx.createBiquadFilter();
      droneGain = ctx.createGain();

      droneOsc1.type = 'sawtooth';
      droneOsc2.type = 'triangle';
      droneOsc1.frequency.value = 55.0;
      droneOsc2.frequency.value = 82.5;

      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 155;
      droneFilter.Q.value = 1.2;

      droneGain.gain.value = 0.0001;

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(master);

      droneOsc1.start(0);
      droneOsc2.start(0);

      applyTheme();

      if (ambientTimer) clearInterval(ambientTimer);
      ambientTimer = setInterval(stepAmbient, 2700);
      if (ambientTimer && typeof ambientTimer.unref === 'function') {
        ambientTimer.unref();
      }
    } catch (e) {
      ctx = null;
    }
  }

  function setTheme(name) {
    if (name && THEMES[name]) {
      currentTheme = name;
    } else if (name) {
      currentTheme = 'town';
    }
    applyTheme();
  }

  function playTone(type, fStart, fEnd, dur, vol, delaySec, useFx) {
    if (!ctx || !master || muted) return;
    try {
      var now = ctx.currentTime + (delaySec || 0);
      var osc = ctx.createOscillator();
      var env = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(fStart, now);
      if (fEnd && fEnd !== fStart) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, fEnd), now + dur);
      }
      env.gain.setValueAtTime(0.0001, now);
      env.gain.linearRampToValueAtTime(vol || 0.1, now + 0.015);
      env.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(env);
      env.connect(useFx && fxIn ? fxIn : master);
      osc.start(now);
      osc.stop(now + dur + 0.03);
    } catch (e) {}
  }

  function playNoiseBurst(dur, filterType, fStart, fEnd, vol, delaySec) {
    if (!ctx || !master || muted) return;
    try {
      var now = ctx.currentTime + (delaySec || 0);
      var buf = createNoiseBuffer(ctx, Math.min(3.5, Math.max(0.2, dur)));
      var src = ctx.createBufferSource();
      src.buffer = buf;

      var flt = ctx.createBiquadFilter();
      flt.type = filterType || 'lowpass';
      flt.frequency.setValueAtTime(fStart || 400, now);
      if (fEnd && fEnd !== fStart) {
        flt.frequency.exponentialRampToValueAtTime(Math.max(40, fEnd), now + dur);
      }

      var env = ctx.createGain();
      env.gain.setValueAtTime(0.0001, now);
      env.gain.linearRampToValueAtTime(vol || 0.15, now + 0.03);
      env.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      src.connect(flt);
      flt.connect(env);
      env.connect(master);
      src.start(now);
      src.stop(now + dur + 0.05);
    } catch (e) {}
  }

  function sfx(name) {
    if (!ctx || !master || muted) return;
    try {
      if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
        ctx.resume();
      }
    } catch (e) {}

    switch (name) {
      case 'pickup':
        playTone('triangle', 523.25, 523.25, 0.22, 0.11, 0, true);
        playTone('triangle', 659.25, 659.25, 0.35, 0.12, 0.09, true);
        break;

      case 'key':
        playTone('sine', 1760, 1820, 0.12, 0.09, 0, true);
        playTone('sine', 2349, 2400, 0.14, 0.09, 0.06, true);
        playTone('sine', 2793, 2793, 0.24, 0.1, 0.12, true);
        break;

      case 'unlock':
        playTone('triangle', 140, 75, 0.18, 0.18, 0, false);
        playTone('square', 440, 587.33, 0.16, 0.08, 0.1, true);
        break;

      case 'error':
        playTone('sawtooth', 165, 130, 0.16, 0.09, 0, false);
        playTone('sawtooth', 130, 98, 0.22, 0.09, 0.14, false);
        break;

      case 'gen':
        playTone('sawtooth', 48, 125, 0.85, 0.12, 0, false);
        playTone('triangle', 96, 250, 0.85, 0.08, 0.02, false);
        playTone('sine', 880, 880, 0.28, 0.09, 0.78, true);
        break;

      case 'catch':
        playNoiseBurst(0.95, 'bandpass', 950, 180, 0.24, 0);
        playTone('sawtooth', 311.13, 77.78, 0.85, 0.16, 0, true);
        playTone('sawtooth', 293.66, 65.41, 0.85, 0.14, 0.02, true);
        break;

      case 'thunder':
        playNoiseBurst(2.4, 'lowpass', 340, 75, 0.28, 0);
        playTone('triangle', 68, 32, 1.6, 0.16, 0.04, false);
        break;

      case 'vanish':
        playNoiseBurst(0.9, 'bandpass', 1600, 420, 0.1, 0);
        playTone('sine', 987.77, 493.88, 0.75, 0.09, 0, true);
        playTone('triangle', 1318.5, 659.25, 0.85, 0.07, 0.08, true);
        break;

      default:
        break;
    }
  }

  function melody() {
    if (!ctx || !fxIn || muted) return;
    try {
      if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
        ctx.resume();
      }
      var notes = [
        [76, 0.0, 0.9],
        [72, 0.48, 0.9],
        [69, 0.96, 1.2],
        [71, 1.56, 0.8],
        [72, 2.04, 0.8],
        [74, 2.52, 0.9],
        [76, 3.04, 1.3],
        [79, 3.74, 0.9],
        [77, 4.26, 0.9],
        [76, 4.78, 1.1],
        [72, 5.4, 0.9],
        [69, 5.95, 2.0]
      ];
      pauseUntil = ctx.currentTime + 8.0;

      for (var i = 0; i < notes.length; i++) {
        var item = notes[i];
        var freq = mtof(item[0]);
        var t = ctx.currentTime + item[1];
        var dur = item[2];

        var osc = ctx.createOscillator();
        var chime = ctx.createOscillator();
        var env = ctx.createGain();
        var chimeGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        chime.type = 'triangle';
        chime.frequency.setValueAtTime(freq * 3, t);
        chimeGain.gain.setValueAtTime(0.12, t);

        env.gain.setValueAtTime(0.0001, t);
        env.gain.linearRampToValueAtTime(0.095, t + 0.01);
        env.gain.exponentialRampToValueAtTime(0.0001, t + dur);

        osc.connect(env);
        chime.connect(chimeGain);
        chimeGain.connect(env);
        env.connect(fxIn);

        osc.start(t);
        chime.start(t);
        osc.stop(t + dur + 0.04);
        chime.stop(t + Math.min(dur, 0.25) + 0.04);
      }
    } catch (e) {}
  }

  function setMutedState(nextMuted) {
    muted = !!nextMuted;
    try {
      if (window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
      }
    } catch (e) {}
    if (ctx && master) {
      try {
        master.gain.setTargetAtTime(muted ? 0 : 0.8, ctx.currentTime, 0.04);
      } catch (e) {
        master.gain.value = muted ? 0 : 0.8;
      }
    }
    return muted;
  }

  function toggleMute() {
    return setMutedState(!muted);
  }

  function isMuted() {
    return muted;
  }

  SL.audio = {
    init: init,
    setTheme: setTheme,
    sfx: sfx,
    melody: melody,
    toggleMute: toggleMute,
    isMuted: isMuted
  };
})();
