(function () {
  'use strict';
  const SL = window.SL = window.SL || {};
  const $ = function (id) { return document.getElementById(id); };
  const audio = SL.audio = SL.audio || {};
  ['init', 'setTheme', 'sfx', 'melody', 'toggleMute'].forEach(function (name) { if (typeof audio[name] !== 'function') audio[name] = function () {}; });
  if (typeof audio.isMuted !== 'function') audio.isMuted = function () { return true; };
  const stage = $('stage'), screen = $('screen'), output = screen.getContext('2d', { alpha: false });
  const scene = document.createElement('canvas'), darkness = document.createElement('canvas');
  scene.width = darkness.width = 320; scene.height = darkness.height = 180;
  const c = scene.getContext('2d'), dark = darkness.getContext('2d'), hud = $('hud'), h = hud.getContext('2d');
  c.imageSmoothingEnabled = output.imageSmoothingEnabled = false;
  const maps = SL.buildMaps(), images = {}, mapLights = {};
  Object.values(maps).forEach(function (map) {
    images[map.id] = SL.art.paintMap(map);
    const lights = mapLights[map.id] = [];
    map.rows.forEach(function (row, y) {
      Array.from(row).forEach(function (t, x) {
        if (t === 'L') lights.push({ x: x * 16 + 8, y: y * 16 + 4, r: 52, a: 0.84, col: '#e8c88b', flick: true });
        if (t === 'W') lights.push({ x: x * 16 + 8, y: y * 16 + 7, r: 29, a: 0.58, col: '#f1cb89' });
        if (t === 'K') lights.push({ x: x * 16 + 8, y: y * 16 + 7, r: 25, a: 0.66, col: '#d7c99b' });
        if (t === 'O') lights.push({ x: x * 16 + 8, y: y * 16 + 5, r: 110, a: 0.98, col: '#a7e8ed' });
      });
    });
  });
  function stored(key) { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function store(key, value) { try { localStorage.setItem(key, value); } catch (_) {} }
  function remove(key) { try { localStorage.removeItem(key); } catch (_) {} }
  function savedGame() {
    try {
      const s = JSON.parse(stored('sonisik_save'));
      if (!s || !maps[s.map] || !s.player || !Number.isFinite(s.player.x) || !Number.isFinite(s.player.y) || !s.flags || !Array.isArray(s.notes)) return null;
      return s;
    } catch (_) { return null; }
  }
  let keys = new Set(), directionTouch = new Set(), camera = { x: 0, y: 0 }, elapsed = 0, lastFrame = 0, saveClock = 0;
  let hudW = 0, hudH = 0, uiData = null, transitionToken = 0, exitCooldown = 0, hintTime = 0;
  let activeEntity = null, flashAlpha = 0, flashColor = '210,230,235', lightningAt = 14, shadow = null, shadowGrace = 0;
  const seeded = SL.art.rng(317), rain = Array.from({ length: 100 }, function () { return { x: seeded() * 360, y: seeded() * 220, speed: 65 + seeded() * 40, length: 3 + seeded() * 4, alpha: 0.08 + seeded() * 0.22 }; });
  const panels = ['dialog', 'note-overlay', 'journal-overlay', 'choice-overlay', 'ask-overlay', 'chapter-card', 'pause-overlay'];
  const vectors = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const G = SL.game = {
    maps: maps, map: maps.town, player: { x: 104, y: 392, dir: 'down', walking: false }, flags: {}, notes: [], mode: 'title', ui: null,
    loop: Math.max(0, parseInt(stored('sonisik_loop'), 10) || 0), checkpoint: { x: 328, y: 600 },
    has: function (flag) { return !!G.flags[flag]; },
    set: function (flag, value) { G.flags[flag] = value === undefined ? true : value; G.save(); },
    save: function () {
      if (G.mode !== 'play') return;
      store('sonisik_save', JSON.stringify({ version: 1, map: G.map.id, player: { x: G.player.x, y: G.player.y, dir: G.player.dir }, flags: G.flags, notes: G.notes, checkpoint: G.checkpoint }));
    },
    sfx: function (name) { audio.sfx(name); }, melody: function () { audio.melody(); },
    flash: function (rgb, alpha) { flashColor = rgb; flashAlpha = alpha; },
    snapCam: function () { const p = targetCamera(); camera.x = p.x; camera.y = p.y; },
    say: say, choose: choose, ask: ask, note: showNote, card: card, goto: gotoMap, ending: ending,
    newGame: function () { startGame(false); }, continueGame: function () { startGame(true); },
    interact: interact, advance: advance, closeOverlay: closeOverlay,
    get entities() { return entities[G.map.id]; },
    get shadow() { return shadow; }
  };
  const entities = SL.story.entities(G);
  function resize() {
    const bounds = stage.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    hudW = bounds.width; hudH = bounds.height;
    hud.width = Math.round(hudW * dpr); hud.height = Math.round(hudH * dpr); h.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  new ResizeObserver(resize).observe(stage); window.addEventListener('resize', resize);
  function openUI(kind, id) {
    panels.forEach(function (p) { $(p).hidden = true; });
    G.ui = kind; uiData = null; $(id).hidden = false; stage.classList.add('busy'); keys.clear(); directionTouch.clear(); $('prompt').hidden = true;
  }
  function clearUI() {
    panels.forEach(function (p) { $(p).hidden = true; });
    G.ui = null; uiData = null; stage.classList.remove('busy'); keys.clear(); stage.focus({ preventScroll: true });
  }
  function say(lines, done) {
    if (!Array.isArray(lines)) lines = [lines];
    if (!lines.length) { if (done) done(); return; }
    openUI('dialog', 'dialog'); uiData = { lines: lines, index: 0, chars: 0, done: done, text: '' }; dialogLine();
  }
  function dialogLine() {
    const data = uiData, raw = data.lines[data.index], match = raw.match(/^(Aras|Mira|\?\?\?|Radyo|Terminal):\s*/);
    data.text = match ? raw.slice(match[0].length) : raw; data.chars = 0;
    $('dialog').classList.toggle('narration', !match); $('speaker').textContent = match ? match[1] : '';
    $('speaker').style.color = match && (match[1] === 'Mira' || match[1] === '???') ? '#9acbd0' : match && match[1] === 'Terminal' ? '#99cca5' : '';
    $('dialog-text').textContent = ''; $('dialog-next').querySelector('span').textContent = 'DEVAM'; if (match) drawPortrait(match[1]);
  }
  function drawPortrait(speaker) {
    const canvas = $('portrait').querySelector('canvas'), pc = canvas.getContext('2d'); pc.clearRect(0, 0, 24, 28);
    if (speaker === 'Aras') SL.art.player(pc, 12, 25, 'down', false, 0);
    else if (speaker === 'Mira' || speaker === '???') SL.art.sprite(pc, 'mira', 12, 25, 0);
    else {
      pc.fillStyle = '#52796d'; pc.fillRect(4, 8, 16, 12); pc.fillStyle = '#193b39'; pc.fillRect(5, 9, 14, 8); pc.fillStyle = '#98be94';
      for (let i = 0; i < 4; i++) pc.fillRect(7, 11 + i * 2, 4 + i * 2, 1); pc.fillStyle = '#889d82'; pc.fillRect(3, 21, 18, 2);
    }
  }
  function advance() {
    if (G.ui === 'dialog') {
      if (uiData.chars < uiData.text.length) { uiData.chars = uiData.text.length; $('dialog-text').textContent = uiData.text; return; }
      uiData.index++;
      if (uiData.index < uiData.lines.length) dialogLine();
      else { const done = uiData.done; clearUI(); G.save(); if (done) done(); }
    } else if (G.ui === 'note') closeNote();
    else if (G.ui === 'card') finishCard();
    else if (G.mode === 'ending') revealEnding();
    else if (G.mode === 'play' && !G.ui) interact();
  }
  function showNote(id, done, journal) {
    const n = SL.story.notes.find(function (n) { return n.id === id; }); if (!n) return;
    const isNew = !G.notes.includes(id); if (isNew) { G.notes.push(id); G.sfx('pickup'); G.save(); }
    openUI('note', 'note-overlay'); uiData = { done: done, journal: !!journal };
    $('note-number').textContent = 'ARŞİV / ' + id.slice(1).padStart(2, '0') + ' — 12'; $('note-title').textContent = n.title; $('note-date').textContent = n.date;
    $('note-body').textContent = n.text + (id === 'n1' && G.loop > 0 ? '\n\n(Kâğıdın köşesinde silik bir rakam: ' + G.loop + ')' : '');
    $('note-stamp').textContent = isNew ? 'GÜNLÜĞE EKLENDİ' : 'ARAS’IN GÜNLÜĞÜNDEN';
    const paper = $('note-overlay').querySelector('.paper'); paper.scrollTop = 0; paper.focus({ preventScroll: true });
  }
  function closeNote() {
    if (G.ui !== 'note') return; const data = uiData; clearUI(); if (data.journal) showJournal(); else if (data.done) data.done();
  }
  function showJournal() {
    if (G.mode !== 'play') return; openUI('journal', 'journal-overlay');
    $('journal-count').textContent = G.notes.length + ' / 12 NOT BULUNDU'; $('journal-list').replaceChildren();
    SL.story.notes.forEach(function (n, i) {
      const found = G.notes.includes(n.id), button = document.createElement('button'); button.className = 'journal-entry'; button.disabled = !found;
      const number = document.createElement('span'); number.className = 'entry-number'; number.textContent = String(i + 1).padStart(2, '0'); button.append(number);
      const text = document.createElement('span'); text.textContent = found ? n.title : '? ? ?'; button.append(text);
      if (found) { const arrow = document.createElement('span'); arrow.className = 'entry-arrow'; arrow.textContent = '↗'; button.append(arrow); button.onclick = function () { showNote(n.id, null, true); }; }
      $('journal-list').append(button);
    });
    $('journal-close').focus({ preventScroll: true });
  }
  function choose(text, choices) {
    openUI('choice', 'choice-overlay'); $('choice-title').textContent = text; $('choice-list').replaceChildren();
    choices.forEach(function (choice, i) {
      const button = document.createElement('button'), index = document.createElement('span'); index.className = 'choice-index'; index.textContent = '0' + (i + 1);
      const label = document.createElement('span'); label.textContent = choice.label; const arrow = document.createElement('span'); arrow.className = 'choice-arrow'; arrow.textContent = '→'; button.append(index, label, arrow);
      button.onclick = function () { clearUI(); choice.fn(); }; $('choice-list').append(button);
    });
    $('choice-list').firstElementChild.focus({ preventScroll: true });
  }
  function ask(label, callback) {
    openUI('ask', 'ask-overlay'); uiData = { callback: callback }; $('terminal-label').textContent = label; $('code-input').value = ''; $('code-input').focus({ preventScroll: true });
  }
  function submitCode(value) { if (G.ui !== 'ask') return; const callback = uiData.callback; clearUI(); callback(value); }
  function card(kicker, title, done) {
    openUI('card', 'chapter-card'); $('chapter-kicker').textContent = kicker; $('chapter-title').textContent = title; uiData = { until: elapsed + 3, done: done };
  }
  function finishCard() { if (G.ui !== 'card') return; const done = uiData.done; clearUI(); if (done) done(); }
  function closeOverlay() {
    if (G.ui === 'note') closeNote(); else if (G.ui === 'ask') submitCode(null);
    else if (G.ui === 'journal' || G.ui === 'pause') clearUI(); else if (G.ui === 'dialog' || G.ui === 'card') advance();
  }
  function startGame(resume) {
    audio.init(); const s = resume ? savedGame() : null;
    clearUI(); $('title').hidden = true; $('ending').hidden = true;
    G.mode = 'play'; G.flags = s ? Object.assign({}, s.flags) : {}; G.notes = s ? s.notes.filter(function (id) { return SL.story.notes.some(function (n) { return n.id === id; }); }) : [];
    G.map = s ? maps[s.map] : maps.town;
    G.player = s ? { x: s.player.x, y: s.player.y, dir: vectors[s.player.dir] ? s.player.dir : 'down', walking: false } : { x: 104, y: 392, dir: 'down', walking: false };
    if (!canStand(G.player.x, G.player.y)) { G.player.x = G.map.start.x * 16 + 8; G.player.y = G.map.start.y * 16 + 8; }
    G.checkpoint = s && s.checkpoint && Number.isFinite(s.checkpoint.x) && Number.isFinite(s.checkpoint.y) ? s.checkpoint : { x: 328, y: 600 };
    stage.classList.add('playing'); shadow = null; shadowGrace = 3; exitCooldown = 1; hintTime = 20; G.snapCam(); audio.setTheme(G.map.id); SL.story.enter(G); G.save();
  }
  function gotoMap(id, tx, ty, dir) {
    if (!maps[id]) return Promise.resolve();
    const token = ++transitionToken; clearUI(); G.ui = 'transition'; stage.classList.add('busy'); $('transition').classList.add('active');
    return new Promise(function (resolve) {
      window.setTimeout(function () {
        if (token !== transitionToken) { resolve(); return; }
        G.map = maps[id]; G.player.x = tx * 16 + 8; G.player.y = ty * 16 + 8; G.player.dir = dir || 'up'; G.player.walking = false;
        shadow = null; shadowGrace = 4; exitCooldown = 1; if (id === 'forest') G.checkpoint = { x: G.player.x, y: G.player.y };
        G.snapCam(); audio.setTheme(id); G.save();
        window.setTimeout(function () {
          if (token !== transitionToken) { resolve(); return; }
          $('transition').classList.remove('active'); clearUI(); SL.story.enter(G); resolve();
        }, 170);
      }, 350);
    });
  }
  function mainMenu() {
    transitionToken++; $('transition').classList.remove('active'); clearUI(); G.mode = 'title'; G.map = maps.town;
    stage.classList.remove('playing'); $('ending').hidden = true; $('title').hidden = false; shadow = null; $('continue-button').hidden = !savedGame();
    G.loop = Math.max(0, parseInt(stored('sonisik_loop'), 10) || 0); $('loop-label').hidden = !G.loop; $('loop-label').textContent = 'Döngü #' + G.loop; audio.setTheme('title');
    $('continue-button').hidden ? $('new-button').focus({ preventScroll: true }) : $('continue-button').focus({ preventScroll: true });
  }
  let endingData = null;
  function ending(key) {
    const data = SL.story.endings[key]; if (!data) return;
    clearUI(); G.mode = 'ending'; stage.classList.remove('playing'); stage.classList.add('busy'); $('ending').hidden = false; $('prompt').hidden = true; remove('sonisik_save');
    if (key === 'loop') { G.loop++; store('sonisik_loop', String(G.loop)); }
    const lines = data.lines.map(function (line) { return line.replace('#N', '#' + G.loop); });
    if (G.notes.length === 12) lines.push('Bütün notları buldun. Son notun arkasında, Mira\'nın el yazısıyla: "Hangi seçimi yaparsan yap abi, ben seni hep bulacağım."');
    endingData = { lines: lines, index: 0, next: elapsed + 1.6, bonus: G.notes.length === 12 };
    $('ending-title').textContent = data.title; $('ending-lines').replaceChildren(); $('ending-footer').hidden = true; $('ending-skip').hidden = false;
    $('ending-notes').textContent = 'Bulunan notlar: ' + G.notes.length + '/12'; audio.setTheme('lighthouse');
  }
  function revealEnding() {
    if (!endingData) return; const data = endingData;
    if (data.index < data.lines.length) {
      const p = document.createElement('p'); p.textContent = data.lines[data.index]; if (data.bonus && data.index === data.lines.length - 1) p.className = 'bonus';
      $('ending-lines').append(p); data.index++; data.next = elapsed + 4.5;
    } else { $('ending-footer').hidden = false; $('ending-skip').hidden = true; endingData = null; $('menu-button').focus({ preventScroll: true }); }
  }
  function pause() { G.save(); openUI('pause', 'pause-overlay'); $('resume-button').focus({ preventScroll: true }); }
  function targetCamera() {
    const maxX = G.map.w * 16 - 320, maxY = G.map.h * 16 - 180;
    return { x: maxX < 0 ? maxX / 2 : Math.max(0, Math.min(maxX, G.player.x - 160)), y: Math.max(0, Math.min(maxY, G.player.y - 90)) };
  }
  function canStand(x, y) {
    return [[-4, -2], [3, -2], [-4, 1], [3, 1]].every(function (p) { const row = G.map.rows[Math.floor((y + p[1]) / 16)]; return row && !SL.isSolid(row[Math.floor((x + p[0]) / 16)]); });
  }
  function move(dx, dy) {
    const p = G.player;
    if (dx && canStand(p.x + dx, p.y)) p.x += dx;
    else if (dx && !dy) for (const side of [-1, 1]) { if (canStand(p.x + dx, p.y + side * 3) && canStand(p.x, p.y + side * 3)) { p.y += side * Math.min(Math.abs(dx), 1.2); break; } }
    if (dy && canStand(p.x, p.y + dy)) p.y += dy;
    else if (dy && !dx) for (const side of [-1, 1]) { if (canStand(p.x + side * 4, p.y + dy) && canStand(p.x + side * 4, p.y)) { p.x += side * Math.min(Math.abs(dy), 1.2); break; } }
  }
  function visible(e) { return !e.show || e.show(); }
  function nearestEntity() {
    const v = vectors[G.player.dir], x = G.player.x + v[0] * 10, y = G.player.y + v[1] * 10;
    let nearest = null, dist = 13;
    entities[G.map.id].forEach(function (e) {
      if (!e.use || !visible(e)) return;
      const d = Math.hypot(x - (e.x * 16 + 8), y - (e.y * 16 + 8)); if (d < dist) { dist = d; nearest = e; }
    });
    return nearest;
  }
  function interact() { if (G.ui || G.mode !== 'play') return; const e = nearestEntity(); if (e) { G.player.walking = false; e.use(); } }
  function update(dt) {
    elapsed += dt; flashAlpha = Math.max(0, flashAlpha - dt * 0.7); exitCooldown = Math.max(0, exitCooldown - dt);
    if (G.ui === 'dialog' && uiData) {
      const before = Math.floor(uiData.chars); uiData.chars = Math.min(uiData.text.length, uiData.chars + dt * 37);
      if (before !== Math.floor(uiData.chars)) $('dialog-text').textContent = uiData.text.slice(0, Math.floor(uiData.chars));
    }
    if (G.ui === 'card' && uiData && elapsed >= uiData.until) finishCard();
    if (G.mode === 'ending' && endingData && elapsed >= endingData.next) revealEnding();
    if (G.mode === 'title') { camera.x = 370 + Math.sin(elapsed * 0.05) * 26; camera.y = 42 + Math.cos(elapsed * 0.04) * 16; return; }
    if (G.mode !== 'play') return;
    const target = targetCamera(), lerp = Math.min(1, dt * 8); camera.x += (target.x - camera.x) * lerp; camera.y += (target.y - camera.y) * lerp;
    if (G.ui) { G.player.walking = false; return; }
    hintTime = Math.max(0, hintTime - dt); saveClock += dt; if (saveClock > 2) { G.save(); saveClock = 0; }
    const held = function (names, dir) { return directionTouch.has(dir) || names.some(function (k) { return keys.has(k); }); };
    let dx = (held(['d', 'arrowright'], 'right') ? 1 : 0) - (held(['a', 'arrowleft'], 'left') ? 1 : 0);
    let dy = (held(['s', 'arrowdown'], 'down') ? 1 : 0) - (held(['w', 'arrowup'], 'up') ? 1 : 0); G.player.walking = !!(dx || dy);
    if (dx || dy) {
      if (dx) G.player.dir = dx > 0 ? 'right' : 'left'; if (dy) G.player.dir = dy > 0 ? 'down' : 'up';
      const norm = Math.hypot(dx, dy); dx = dx / norm * 64 * dt; dy = dy / norm * 64 * dt;
      const prev = { x: G.player.x, y: G.player.y }; move(dx, dy);
      if (exitCooldown === 0) {
        const e = entities[G.map.id].find(function (e) { return e.exit && visible(e) && G.player.x >= e.x * 16 && G.player.x < (e.x + (e.w || 1)) * 16 && G.player.y >= e.y * 16 && G.player.y < (e.y + (e.h || 1)) * 16; });
        if (e) {
          if (!e.req || e.req()) { gotoMap(e.exit.to, e.exit.x, e.exit.y, e.exit.dir); return; }
          G.player.x = prev.x; G.player.y = prev.y; move(-dx * 5, -dy * 5); exitCooldown = 1; G.sfx('error'); G.say(e.locked || []); return;
        }
      }
    }
    updateShadow(dt);
    if (G.map.id === 'town' && elapsed > lightningAt) { G.flash('197,225,241', 0.27); G.sfx('thunder'); lightningAt = elapsed + 18 + seeded() * 20; }
  }
  function updateShadow(dt) {
    if (G.map.id !== 'forest' || SL.story.itemCount(G) === 0 || SL.story.itemCount(G) === 3) { shadow = null; return; }
    if (!shadow) {
      const spawns = [[4, 8], [33, 25], [20, 3], [4, 33]];
      spawns.sort(function (a, b) { return Math.hypot(b[0] * 16 - G.player.x, b[1] * 16 - G.player.y) - Math.hypot(a[0] * 16 - G.player.x, a[1] * 16 - G.player.y); });
      shadow = { x: spawns[0][0] * 16 + 8, y: spawns[0][1] * 16 + 8 };
    }
    shadowGrace = Math.max(0, shadowGrace - dt); if (shadowGrace > 0) return;
    const dx = G.player.x - shadow.x, dy = G.player.y - shadow.y, dist = Math.hypot(dx, dy), speed = dist < 125 ? 38 : 18;
    if (dist > 1) { shadow.x += dx / dist * speed * dt; shadow.y += dy / dist * speed * dt; }
    if (dist < 10) {
      G.sfx('catch'); G.flash('0,0,0', 1); G.say(['Omzuna buz gibi bir şey dokundu. Her şey karardı...'], function () {
        G.player.x = G.checkpoint.x; G.player.y = G.checkpoint.y; G.snapCam(); shadow = null; shadowGrace = 5; G.save();
      });
    }
  }
  function radial(ctx, x, y, radius, alpha, color, erase) {
    const gradient = ctx.createRadialGradient(x, y, 1, x, y, radius);
    if (erase) { gradient.addColorStop(0, 'rgba(0,0,0,' + alpha + ')'); gradient.addColorStop(0.35, 'rgba(0,0,0,' + alpha * 0.8 + ')'); gradient.addColorStop(1, 'rgba(0,0,0,0)'); }
    else { gradient.addColorStop(0, color); gradient.addColorStop(1, 'transparent'); }
    ctx.fillStyle = gradient; ctx.globalAlpha = erase ? 1 : alpha; ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2); ctx.globalAlpha = 1;
  }
  function drawLights(cx, cy) {
    dark.globalCompositeOperation = 'source-over'; dark.clearRect(0, 0, 320, 180); dark.fillStyle = 'rgba(3,13,25,' + (G.mode === 'title' ? 0.37 : G.map.darkness) + ')'; dark.fillRect(0, 0, 320, 180); dark.globalCompositeOperation = 'destination-out';
    const lights = mapLights[G.map.id].slice();
    entities[G.map.id].forEach(function (e) { if (e.light && visible(e) && (!e.light.powered || SL.story.genCount(G) === 3)) lights.push(Object.assign({ x: e.x * 16 + 8, y: e.y * 16 + 5 }, e.light)); });
    if (G.map.id === 'lab') {
      [[8, 6], [18, 6], [29, 6]].forEach(function (p, i) { const on = G.has('gen' + (i + 1)); lights.push({ x: p[0] * 16 + 8, y: p[1] * 16 + 4, r: on ? 104 : 36, a: on ? 0.88 : 0.32, col: on ? '#b6c7a3' : '#d15448', flick: !on }); });
      lights.push({ x: 87, y: 298, r: 66, a: 0.45, col: '#d05c4b', flick: true });
    }
    lights.forEach(function (l) {
      const x = l.x - cx, y = l.y - cy; if (x + l.r < 0 || x - l.r > 320 || y + l.r < 0 || y - l.r > 180) return;
      const a = l.a * (l.flick ? 0.91 + Math.sin(elapsed * 13 + l.x) * 0.04 + Math.sin(elapsed * 29) * 0.03 : 1); radial(dark, x, y, l.r, a, '#000', true);
    });
    if (G.mode !== 'title') {
      const px = G.player.x - cx, py = G.player.y - cy - 6; radial(dark, px, py, G.map.id === 'forest' ? 35 : 48, 0.8, '#000', true);
      if (G.map.id === 'forest' || G.map.id === 'lab') {
        const v = vectors[G.player.dir], angle = Math.atan2(v[1], v[0]); dark.save(); dark.beginPath(); dark.moveTo(px, py); dark.arc(px, py, 108, angle - 0.48, angle + 0.48); dark.closePath(); dark.clip(); radial(dark, px, py, 108, 0.93, '#000', true); dark.restore();
        c.save(); c.globalCompositeOperation = 'screen'; c.globalAlpha = 0.055; c.fillStyle = '#bdd9bb'; c.beginPath(); c.moveTo(px, py); c.arc(px, py, 100, angle - 0.45, angle + 0.45); c.closePath(); c.fill(); c.restore();
      }
    }
    dark.globalCompositeOperation = 'source-over'; c.drawImage(darkness, 0, 0); c.save(); c.globalCompositeOperation = 'screen';
    lights.forEach(function (l) { radial(c, l.x - cx, l.y - cy, l.r * 0.46, 0.12, l.col, false); }); c.restore();
  }
  function drawBeam(cx, cy) {
    if (G.map.id !== 'town' && G.map.id !== 'lighthouse') return;
    const x = (G.map.id === 'town' ? 712 : 136) - cx, y = (G.map.id === 'town' ? 40 : 69) - cy, angle = elapsed * 0.19 + 2.7, radius = G.map.id === 'town' ? 730 : 260;
    c.save(); c.globalCompositeOperation = 'screen'; const gradient = c.createRadialGradient(x, y, 3, x, y, radius); gradient.addColorStop(0, '#b3e3dc60'); gradient.addColorStop(1, '#8cc7d000'); c.fillStyle = gradient;
    c.beginPath(); c.moveTo(x, y); c.arc(x, y, radius, angle - 0.105, angle + 0.105); c.closePath(); c.fill();
    c.globalAlpha = 0.3; c.beginPath(); c.moveTo(x, y); c.arc(x, y, radius, angle + Math.PI - 0.06, angle + Math.PI + 0.06); c.closePath(); c.fill(); c.restore();
  }
  function drawWeather(cx, cy) {
    if (G.map.id === 'town') {
      c.save(); c.strokeStyle = '#b1d1d9'; c.lineWidth = 0.5;
      rain.forEach(function (p) { const x = ((p.x - elapsed * 25 - cx * 0.12) % 360 + 360) % 360 - 20, y = (p.y + elapsed * p.speed - cy * 0.1) % 220 - 20; c.globalAlpha = p.alpha; c.beginPath(); c.moveTo(x, y); c.lineTo(x - p.length * 0.4, y + p.length); c.stroke(); });
      c.globalAlpha = 0.13; c.fillStyle = '#c7dbe0';
      for (let i = 0; i < 16; i++) { const x = (i * 43 + elapsed * 7) % 320, y = (i * 29) % 180, tileX = Math.floor((x + cx) / 16), tileY = Math.floor((y + cy) / 16); if (G.map.rows[tileY] && G.map.rows[tileY][tileX] === '=') c.fillRect(x, y, 3, 1); }
      c.restore();
    }
    if (G.map.id === 'forest' || G.map.id === 'lighthouse') {
      c.save(); for (let i = 0; i < 5; i++) { const x = ((i * 89 + elapsed * (i % 2 ? 3 : -2) - cx * 0.3) % 460 + 460) % 460 - 70, y = ((i * 49 - cy * 0.25) % 240 + 240) % 240 - 30; c.save(); c.translate(x, y); c.scale(3.5, 0.65); radial(c, 0, 0, 42, G.map.id === 'forest' ? 0.095 : 0.04, '#b6cfc4', false); c.restore(); } c.restore();
    }
  }
  function drawWorld() {
    const cx = Math.round(camera.x), cy = Math.round(camera.y); c.fillStyle = '#0c1c26'; c.fillRect(0, 0, 320, 180); c.drawImage(images[G.map.id], -cx, -cy);
    if (G.map.id === 'town') {
      c.fillStyle = '#63959d'; c.globalAlpha = 0.32;
      for (let i = 0; i < 45; i++) { const wx = 645 + ((i * 43 + elapsed * 3) % 122), wy = (i * 47) % 510, row = G.map.rows[Math.floor(wy / 16)]; if (row && row[Math.floor(wx / 16)] === 'w') c.fillRect(Math.round(wx - cx), Math.round(wy - cy), 3 + i % 4, 1); } c.globalAlpha = 1;
    }
    if (G.map.id === 'lab') [[8, 6], [18, 6], [29, 6]].forEach(function (p, i) { c.fillStyle = G.has('gen' + (i + 1)) ? '#a7deb0' : (Math.sin(elapsed * 4) > 0 ? '#ee8267' : '#793e3b'); c.fillRect(p[0] * 16 + 3 - cx, p[1] * 16 + 3 - cy, 2, 2); });
    const actors = entities[G.map.id].filter(function (e) { return e.sprite && visible(e); }).map(function (e) { return { y: e.y * 16 + 8, entity: e }; });
    if (G.mode !== 'title') actors.push({ y: G.player.y, player: true }); if (shadow) actors.push({ y: shadow.y, shadow: true }); actors.sort(function (a, b) { return a.y - b.y; });
    actors.forEach(function (actor) {
      if (actor.player) { SL.art.player(c, G.player.x - cx, G.player.y - cy, G.player.dir, G.player.walking, elapsed); return; }
      if (actor.shadow) { SL.art.sprite(c, 'shadow', shadow.x - cx, shadow.y - cy, elapsed); return; }
      const e = actor.entity, x = e.x * 16 + 8 - cx, y = e.y * 16 + 8 - cy;
      if (e.sprite === 'gate') { if (G.has('gateKey')) return; c.fillStyle = '#172d33'; c.fillRect(x - 5, y - 8, 7, e.h * 16); c.fillStyle = '#7d9388'; for (let i = 0; i < e.h * 16; i += 5) c.fillRect(x - 6, y - 8 + i, 9, 1); c.fillRect(x - 3, y - 8, 1, e.h * 16); return; }
      SL.art.sprite(c, e.sprite, x, y, elapsed, G.notes.includes(e.id));
    });
    drawBeam(cx, cy); drawLights(cx, cy); drawWeather(cx, cy); if (flashAlpha > 0) { c.fillStyle = 'rgba(' + flashColor + ',' + flashAlpha + ')'; c.fillRect(0, 0, 320, 180); } output.drawImage(scene, 0, 0);
  }
  function drawHUD() {
    h.clearRect(0, 0, hudW, hudH); if (G.mode !== 'play' || G.ui === 'card' || G.ui === 'transition') { $('prompt').hidden = true; return; }
    const scale = hudW / 1280, pad = Math.max(13, 30 * scale), font = Math.max(12, 25 * scale), top = pad + 3;
    h.textBaseline = 'top'; h.font = font * 0.63 + 'px "VT323",monospace'; h.fillStyle = '#06151bbd'; h.fillRect(0, 0, hudW, pad * 2 + font * 1.5);
    h.fillStyle = '#9fbab0'; h.fillText('BÖLÜM ' + SL.story.chapters[G.map.id].number + ' / ' + G.map.title.toLocaleUpperCase('tr-TR'), pad, top);
    h.font = font + 'px "VT323",monospace'; h.fillStyle = '#dedfc5'; h.fillText(SL.story.objective(G), pad, top + font * 0.82);
    h.textAlign = 'right'; h.font = font * 1.2 + 'px "VT323",monospace'; h.fillStyle = '#d68673'; h.fillText('03:17', hudW - pad, top - 3);
    h.font = font * 0.78 + 'px "VT323",monospace'; h.fillStyle = '#a0b5aa'; h.fillText('Notlar ' + G.notes.length + '/12 · [J] Günlük', hudW - pad, top + font * 1.2); h.textAlign = 'left';
    if (hintTime > 0 && !G.ui) {
      h.globalAlpha = Math.min(1, hintTime); h.textAlign = 'center'; h.font = font * 0.75 + 'px "VT323",monospace';
      const text = window.matchMedia('(pointer: coarse)').matches ? 'Yön tuşlarıyla yürü · E ile etkileşim · J ile günlük' : 'WASD / OKLAR  Yürü     E / BOŞLUK  Etkileşim     J  Günlük     ESC  Duraklat';
      const width = h.measureText(text).width + 28; h.fillStyle = '#07191ed9'; h.fillRect((hudW - width) / 2, hudH - font * 1.8 - 10, width, font * 1.25); h.fillStyle = '#acbfb0'; h.fillText(text, hudW / 2, hudH - font * 1.7 - 10); h.globalAlpha = 1; h.textAlign = 'left';
    }
    activeEntity = G.ui ? null : nearestEntity(); $('prompt').hidden = !activeEntity;
    if (activeEntity) {
      $('prompt').querySelector('span').textContent = activeEntity.label || 'İncele';
      const x = (activeEntity.x * 16 + 8 - Math.round(camera.x)) / 320 * 100, y = (activeEntity.y * 16 - 11 - Math.round(camera.y)) / 180 * 100;
      $('prompt').style.left = Math.max(8, Math.min(92, x)) + '%'; $('prompt').style.top = Math.max(16, Math.min(91, y)) + '%';
    }
  }
  function frame(time) { const dt = lastFrame ? Math.min(0.05, (time - lastFrame) / 1000) : 0.016; lastFrame = time; update(dt); drawWorld(); drawHUD(); requestAnimationFrame(frame); }
  function soundButton() { $('sound-button').innerHTML = (audio.isMuted() ? 'SES KAPALI' : 'SES AÇIK') + ' <span>[M]</span>'; $('sound-button').setAttribute('aria-pressed', String(!audio.isMuted())); }
  function toggleSound() { audio.init(); audio.toggleMute(); soundButton(); }
  window.addEventListener('keydown', function (event) {
    audio.init(); const key = event.key.toLowerCase();
    if (event.target === $('code-input')) { if (key === 'escape') { event.preventDefault(); submitCode(null); } return; }
    if (key === 'm' && !event.repeat) { event.preventDefault(); toggleSound(); return; }
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
      if (G.mode === 'play' && !G.ui) { event.preventDefault(); keys.add(key); }
      else if ((G.ui === 'choice' || G.ui === 'journal') && key.startsWith('arrow')) {
        event.preventDefault(); const buttons = Array.from((G.ui === 'choice' ? $('choice-list') : $('journal-list')).querySelectorAll('button:not(:disabled)'));
        if (buttons.length) { let i = buttons.indexOf(document.activeElement); i = (i + (key === 'arrowup' || key === 'arrowleft' ? -1 : 1) + buttons.length) % buttons.length; buttons[i].focus({ preventScroll: true }); }
      }
      return;
    }
    if (event.repeat) return;
    if (key === 'escape') { event.preventDefault(); if (G.ui) closeOverlay(); else if (G.mode === 'play') pause(); return; }
    if (key === 'j' && G.mode === 'play') { event.preventDefault(); if (G.ui === 'journal') clearUI(); else if (!G.ui) showJournal(); return; }
    if (G.ui === 'choice' && /^[123]$/.test(key)) { const button = $('choice-list').children[Number(key) - 1]; if (button) button.click(); return; }
    if (key === 'e' || key === ' ' || key === 'enter') {
      if ((key === 'enter' || key === ' ') && event.target instanceof HTMLButtonElement) return;
      if (G.mode === 'title' && !G.ui) { event.preventDefault(); savedGame() ? startGame(true) : startGame(false); }
      else if (G.ui !== 'choice' && G.ui !== 'ask' && G.ui !== 'journal' && G.ui !== 'pause') { event.preventDefault(); advance(); }
    }
  });
  window.addEventListener('keyup', function (event) { keys.delete(event.key.toLowerCase()); });
  window.addEventListener('blur', function () { keys.clear(); directionTouch.clear(); G.save(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) { keys.clear(); directionTouch.clear(); G.save(); } });
  window.addEventListener('beforeunload', G.save); document.addEventListener('pointerdown', function () { audio.init(); }, { once: true });
  $('new-button').onclick = function () {
    if (!savedGame()) { startGame(false); return; }
    choose('Yeni bir geceye başla? Mevcut kayıt silinecek.', [{ label: 'Yeni Oyun', fn: function () { startGame(false); } }, { label: 'Vazgeç', fn: function () { mainMenu(); } }]);
  };
  $('continue-button').onclick = G.continueGame; $('dialog-next').onclick = advance; $('note-close').onclick = closeNote; $('note-done').onclick = closeNote;
  $('journal-close').onclick = clearUI; $('terminal-cancel').onclick = function () { submitCode(null); };
  $('terminal-form').onsubmit = function (event) { event.preventDefault(); submitCode($('code-input').value); };
  $('chapter-skip').onclick = finishCard; $('ending-skip').onclick = revealEnding; $('menu-button').onclick = mainMenu; $('resume-button').onclick = clearUI;
  $('pause-menu').onclick = function () { G.save(); mainMenu(); }; $('sound-button').onclick = toggleSound;
  $('fullscreen-button').onclick = function () {
    if (document.fullscreenElement) { if (document.exitFullscreen) document.exitFullscreen().catch(function () {}); }
    else if (stage.requestFullscreen) stage.requestFullscreen().catch(function () {});
  };
  document.querySelectorAll('[data-direction]').forEach(function (button) {
    button.addEventListener('pointerdown', function (event) { event.preventDefault(); button.setPointerCapture(event.pointerId); directionTouch.add(button.dataset.direction); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (name) { button.addEventListener(name, function () { directionTouch.delete(button.dataset.direction); }); });
  });
  $('touch-use').onclick = advance; $('touch-journal').onclick = function () { if (G.ui === 'journal') clearUI(); else if (!G.ui) showJournal(); };
  resize(); soundButton(); mainMenu(); requestAnimationFrame(frame);
}());
