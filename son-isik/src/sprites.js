(function () {
  'use strict';
  const SL = window.SL = window.SL || {};
  function rng(seed) {
    let n = seed >>> 0;
    return function () { n += 0x6D2B79F5; let t = n; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function rect(c, color, x, y, w, h) { c.fillStyle = color; c.fillRect(x, y, w, h); }
  function tile(c, t, x, y, map) {
    const px = x * 16, py = y * 16, r = rng(x * 1597 + y * 5179 + map.w * 67), id = map.id;
    c.save(); c.translate(px, py);
    let base = id === 'forest' ? '#273b32' : id === 'lab' ? '#3a4949' : id === 'lighthouse' ? '#685c4b' : '#2d463c';
    if (t === ',' || t === 's') base = t === 's' ? '#7b7b68' : id === 'forest' ? '#5d5c48' : '#566567';
    if (t === '=') base = '#33424a'; if (t === 'w') base = '#183b4b'; if (t === '_') base = '#7a6955';
    rect(c, base, 0, 0, 16, 16);
    for (let n = 0; n < 10; n++) rect(c, n % 2 ? 'rgba(8,17,24,.13)' : 'rgba(180,199,164,.10)', Math.floor(r() * 16), Math.floor(r() * 16), r() > 0.7 ? 2 : 1, 1);
    if (t === '.' && id === 'town') {
      for (let n = 0; n < 3; n++) { const a = Math.floor(r() * 13) + 1, b = Math.floor(r() * 12) + 2; rect(c, '#3c5848', a, b, 1, 3); rect(c, '#42614b', a + 1, b + 1, 1, 1); }
    }
    if (t === '.' && id === 'lab') {
      rect(c, '#293b3f', 0, 0, 16, 1); rect(c, '#293b3f', 0, 0, 1, 16); rect(c, '#55625b', 1, 1, 14, 1);
      if (r() > 0.8) { rect(c, '#29383a', 3, 5, 5, 1); rect(c, '#29383a', 7, 6, 1, 4); }
    }
    if (t === '.' && id === 'lighthouse') { for (let n = 0; n < 4; n++) rect(c, '#3c4140', 0, n * 4 + 3, 16, 1); rect(c, '#8b7961', 0, 0, 1, 15); }
    if (t === ',' && id === 'town') { rect(c, '#3a4c50', 0, 7, 16, 1); rect(c, '#3a4c50', 7, 0, 1, 8); rect(c, '#3a4c50', 0, 8, 1, 8); rect(c, '#78807a', 1, 1, 14, 1); }
    if (t === '=') {
      if (y === 14 && x % 4 < 2 && (x < 19 || x > 22)) rect(c, '#b9b18a', 1, 14, 13, 1);
      if (x === 20 && y % 4 < 2 && (y < 13 || y > 16)) rect(c, '#b9b18a', 14, 1, 1, 13);
      if (r() > 0.6) { rect(c, '#415560', 2, 5, 9, 2); rect(c, '#5c7074', 4, 5, 5, 1); }
    }
    if (t === 'w') for (let i = 0; i < 4; i++) rect(c, ['#224a5a', '#2e5661', '#1d4556', '#355d68'][i], Math.floor(r() * 12), i * 4 + Math.floor(r() * 2), 3 + Math.floor(r() * 5), 1);
    if (t === '_') for (let i = 0; i < 4; i++) { rect(c, '#303d3b', i * 4, 0, 1, 16); rect(c, '#9a8668', i * 4 + 1, 0, 1, 16); rect(c, '#313d3c', i * 4 + 2, 2, 1, 1); rect(c, '#313d3c', i * 4 + 2, 13, 1, 1); }
    if ('RQUV'.includes(t)) {
      const palettes = { R: ['#794e4a', '#9b6960', '#513c3b'], Q: ['#3e6066', '#60818a', '#2b464e'], U: ['#5c5870', '#7a748d', '#3c3f52'], V: ['#7d6e51', '#9b8864', '#514e40'] }, p = palettes[t];
      rect(c, p[0], 0, 0, 16, 16);
      for (let j = 0; j < 4; j++) { rect(c, p[2], 0, j * 4 + 3, 16, 1); for (let i = 0; i < 3; i++) { const a = i * 8 + (j % 2 ? -4 : 0); rect(c, p[1], a, j * 4, 7, 1); rect(c, p[2], a + 7, j * 4, 1, 3); } }
      if (map.rows[y - 1] && map.rows[y - 1][x] !== t) { rect(c, p[2], 0, 0, 16, 3); rect(c, p[1], 0, 1, 16, 1); }
      if (map.rows[y + 1] && map.rows[y + 1][x] !== t) { rect(c, '#192c31', 0, 13, 16, 3); rect(c, p[1], 0, 12, 16, 1); }
      if (map.rows[y][x - 1] !== t) rect(c, p[2], 0, 0, 2, 16);
      if (map.rows[y][x + 1] !== t) rect(c, p[2], 14, 0, 2, 16);
    }
    if (t === '#' || t === 'N' || t === 'W' || t === '+') {
      const face = id === 'town' || (map.rows[y + 1] && !SL.isSolid(map.rows[y + 1][x]));
      rect(c, face ? id === 'town' ? '#64716c' : '#526061' : '#202f37', 0, 0, 16, 16);
      if (face) { for (let j = 0; j < 4; j++) { rect(c, '#374b4d', 0, j * 4 + 3, 16, 1); rect(c, '#374b4d', j % 2 ? 3 : 11, j * 4, 1, 3); } rect(c, '#83918a', 0, 0, 16, 1); rect(c, '#23383e', 0, 14, 16, 2); }
      else { rect(c, '#2a3b43', 1, 1, 14, 1); rect(c, '#172831', 0, 15, 16, 1); }
      if (t === 'W' || t === 'N') {
        rect(c, '#152a34', 2, 2, 12, 11); rect(c, '#8a8c77', 3, 3, 10, 8); rect(c, t === 'W' ? '#d7b77d' : '#233e4c', 4, 3, 8, 7);
        rect(c, t === 'W' ? '#f3d9a4' : '#41606c', 4, 3, 2, 6); rect(c, '#4c5753', 7, 2, 1, 9); rect(c, '#4c5753', 3, 6, 10, 1); rect(c, '#a09d85', 1, 12, 14, 2);
      }
      if (t === '+') { rect(c, '#1b3034', 3, 2, 10, 14); rect(c, '#405052', 4, 3, 8, 12); rect(c, '#213a40', 5, 4, 6, 7); rect(c, '#d3b87b', 10, 11, 1, 2); rect(c, '#8b8d78', 2, 15, 12, 1); }
    }
    if (t === 'T') {
      rect(c, '#182f2b', 1, 12, 14, 4); rect(c, '#594d3c', 7, 9, 3, 7); rect(c, '#7d6245', 7, 11, 1, 5);
      rect(c, r() > 0.5 ? '#1d4137' : '#214638', 1, 8, 14, 5); rect(c, '#2a5141', 3, 4, 10, 7); rect(c, '#345f48', 5, 1, 6, 6); rect(c, '#437254', 7, 0, 2, 5);
      rect(c, '#17382f', 2, 12, 12, 2); rect(c, '#4b7153', 3, 8, 3, 1); rect(c, '#3d694c', 5, 5, 2, 1); rect(c, '#18362f', 11, 8, 2, 3); rect(c, '#203d33', 9, 3, 2, 3);
    }
    if (t === 'b') { rect(c, '#1a3430', 1, 6, 14, 8); rect(c, '#45634a', 3, 4, 10, 7); rect(c, '#60805b', 4, 4, 4, 2); rect(c, '#314b3b', 10, 8, 4, 5); }
    if (t === 'L') { rect(c, '#182e34', 6, 7, 5, 9); rect(c, '#79827a', 7, 3, 2, 12); rect(c, '#c0ad81', 4, 2, 8, 4); rect(c, '#f5d89b', 5, 3, 6, 2); rect(c, '#2b3a3d', 3, 1, 10, 1); rect(c, '#aab0a0', 6, 15, 5, 1); }
    if (t === 'C' || t === 'c') { rect(c, '#172b33', 0, 3, 16, 12); rect(c, '#74665d', 0, 3, 16, 10); rect(c, '#9d8b74', 0, 4, 16, 1); rect(c, '#334b58', t === 'C' ? 8 : 0, 5, 8, 5); rect(c, '#678391', t === 'C' ? 9 : 0, 5, 6, 1); rect(c, '#17272f', t === 'C' ? 3 : 9, 12, 4, 3); rect(c, '#cfb880', t === 'C' ? 0 : 15, 6, 1, 3); }
    if (t === 'P') { rect(c, '#172d35', 1, 1, 14, 15); rect(c, '#7d524b', 2, 1, 12, 15); rect(c, '#af7e67', 2, 1, 12, 2); rect(c, '#659286', 4, 4, 8, 8); rect(c, '#223e40', 7, 4, 1, 8); rect(c, '#c5c3a0', 5, 6, 2, 4); rect(c, '#afb99e', 3, 14, 10, 1); }
    if (t === 'K') { rect(c, '#253841', 0, 0, 16, 16); rect(c, '#a4a38b', 2, 1, 12, 13); rect(c, '#d8cc9f', 3, 2, 10, 11); rect(c, '#514f48', 7, 2, 1, 2); rect(c, '#514f48', 7, 10, 1, 2); rect(c, '#343d40', 7, 6, 5, 1); rect(c, '#343d40', 7, 6, 1, 5); }
    if (t === 'G') {
      rect(c, '#b0b0a2', 0, 0, 16, 16); for (let j = 0; j < 4; j++) rect(c, '#818f87', 0, j * 4 + 3, 16, 1);
      if (y === 2) { rect(c, '#304b58', 0, 1, 16, 9); rect(c, '#c5e9e4', 1, 4, 14, 4); rect(c, '#5b807e', 0, 0, 16, 2); }
      if (x === 43) rect(c, '#657b77', 0, 0, 4, 16); if (x === 45) rect(c, '#d2cdb2', 12, 0, 4, 16); if (y === 4) rect(c, '#6d7f79', 0, 13, 16, 3);
    }
    if (t === 'H') { rect(c, '#1a2c2c', 0, 0, 16, 16); rect(c, '#687269', 1, 2, 14, 12); rect(c, '#8f9780', 2, 2, 12, 1); rect(c, '#384944', 3, 5, 10, 7); rect(c, '#b3a97a', 6, 7, 4, 2); rect(c, '#263834', 2, 13, 12, 1); }
    if (t === 'X') { rect(c, '#1b2c33', 0, 2, 16, 14); rect(c, '#63726b', 1, 1, 14, 13); rect(c, '#879084', 2, 1, 12, 2); rect(c, '#2b3c3d', 3, 6, 10, 6); for (let i = 0; i < 4; i++) rect(c, '#899381', 4 + i * 2, 6, 1, 5); rect(c, '#db7c62', 3, 3, 2, 2); rect(c, '#d3c192', 10, 3, 2, 2); }
    if (t === 'k') { rect(c, '#27373b', 1, 10, 14, 6); rect(c, '#7a7865', 0, 6, 16, 7); rect(c, '#a09977', 0, 6, 16, 1); rect(c, '#1d3238', 4, 0, 9, 7); rect(c, '#54796a', 5, 1, 7, 4); rect(c, '#97c4a0', 6, 2, 4, 1); rect(c, '#344841', 3, 9, 9, 2); rect(c, '#d6c9a0', 0, 8, 2, 3); }
    if (t === 'E') { rect(c, '#243941', 0, 0, 16, 16); rect(c, '#8a9388', 1, 0, 14, 2); rect(c, '#5d6b67', 2, 2, 12, 14); rect(c, '#324b50', 7, 2, 2, 14); rect(c, '#a8ab92', 2, 14, 12, 1); rect(c, '#b07b60', 14, 5, 1, 2); }
    if (t === 'S') { for (let i = 0; i < 4; i++) { rect(c, '#3b4747', 0, i * 4 + 3, 16, 1); rect(c, '#9d9981', 0, i * 4, 16, 1); } rect(c, '#5e6a62', 1, 0, 1, 16); rect(c, '#5e6a62', 14, 0, 1, 16); }
    if (t === 'O') { rect(c, '#2e454c', 3, 10, 10, 6); rect(c, '#98aeb0', 5, 6, 6, 7); rect(c, '#e1f5e6', 4, 1, 8, 8); rect(c, '#b1dcd9', 2, 3, 12, 4); rect(c, '#f0ffff', 6, 2, 4, 6); rect(c, '#6b8f94', 2, 0, 12, 1); }
    if (t === 'Y') { rect(c, '#283b42', 2, 0, 12, 16); rect(c, '#6f9890', 3, 2, 10, 11); rect(c, '#3f7975', 5, 3, 7, 9); rect(c, '#9cb9a0', 4, 3, 1, 8); rect(c, '#294c4e', 7, 5, 3, 6); rect(c, '#a5a68b', 2, 0, 12, 2); rect(c, '#758c7e', 2, 13, 12, 3); }
    c.restore();
  }
  function paintMap(map) {
    const canvas = document.createElement('canvas'); canvas.width = map.w * 16; canvas.height = map.h * 16;
    const c = canvas.getContext('2d'); for (let y = 0; y < map.h; y++) for (let x = 0; x < map.w; x++) tile(c, map.rows[y][x], x, y, map);
    if (map.id === 'town') {
      [[6, 19], [14, 5], [32, 7]].forEach(function (p) { const x = p[0] * 16, y = p[1] * 16; rect(c, '#273942', x + 2, y + 2, 8, 12); rect(c, '#9b8672', x, y, 7, 11); rect(c, '#4d4946', x - 1, y, 9, 3); rect(c, '#c6ad85', x, y, 8, 1); });
    }
    return canvas;
  }
  function player(c, x, y, dir, walking, time) {
    const step = walking ? Math.sin(time * 15) : 0, bob = walking && step > 0 ? 1 : 0;
    c.save(); c.translate(Math.round(x), Math.round(y)); rect(c, 'rgba(5,15,24,.4)', -6, -1, 12, 4);
    rect(c, '#233845', -4, -1, 3, 3 + (step > 0 ? 1 : 0)); rect(c, '#233845', 1, -1, 3, 3 + (step < 0 ? 1 : 0)); c.translate(0, -bob);
    rect(c, '#b18136', -5, -9, 10, 10); rect(c, '#e5bc55', -4, -10, 8, 9); rect(c, '#f6d478', -3, -9, 2, 7);
    rect(c, '#a97a32', -6, -7 + Math.round(step), 2, 6); rect(c, '#d9a94b', 4, -7 - Math.round(step), 2, 6);
    rect(c, '#dbb158', -5, -15, 10, 8); rect(c, '#f5d77e', -3, -17, 6, 3); rect(c, '#eac363', -4, -16, 8, 3);
    if (dir !== 'up') {
      const side = dir === 'left' ? -2 : dir === 'right' ? 2 : 0;
      rect(c, '#6c5138', -3 + side, -14, 6, 2); rect(c, '#e2b78b', -3 + side, -12, 6, 4); rect(c, '#26333b', side + (dir === 'left' ? -3 : 1), -11, 1, 1);
      if (dir === 'down') rect(c, '#26333b', -2, -11, 1, 1); rect(c, '#cfa24b', -4, -7, 8, 1); rect(c, '#8b7138', 0, -6, 1, 5);
    } else { rect(c, '#c79940', -2, -14, 4, 3); rect(c, '#ffe196', -3, -15, 2, 1); rect(c, '#bc8b35', -3, -7, 6, 1); }
    c.restore();
  }
  function sprite(c, name, x, y, time, read) {
    c.save(); c.translate(Math.round(x), Math.round(y)); const float = Math.round(Math.sin(time * 2.2 + x) * 1.2);
    if (name === 'mira') {
      c.globalAlpha = 0.65 + Math.sin(time * 4) * 0.12; c.translate(0, float);
      rect(c, '#a3d1cd', -5, -8, 10, 8); rect(c, '#e4ece0', -4, -9, 8, 7); rect(c, '#c7d9d3', -6, -3, 12, 3);
      rect(c, '#c3bfa6', -4, -16, 8, 7); rect(c, '#dce3cd', -3, -14, 6, 5); rect(c, '#48595b', -2, -12, 1, 1); rect(c, '#48595b', 2, -12, 1, 1);
      rect(c, '#d2d9cb', -5, -7, 1, 5); rect(c, '#d2d9cb', 5, -7, 1, 5); rect(c, '#9cbdbb', -3, 1, 2, 2); rect(c, '#9cbdbb', 2, 1, 2, 2);
    } else if (name === 'shadow') {
      c.translate(Math.sin(time * 4) * 2, 0); c.globalAlpha = 0.8;
      rect(c, '#0c1925', -6, -14, 12, 15); rect(c, '#0b1520', -4, -18, 8, 16); rect(c, '#1d3039', -7, -7, 2, 8); rect(c, '#1d3039', 5, -7, 2, 8);
      for (let i = -5; i <= 5; i += 2) rect(c, '#0b1520', i, 0, 2, 2 + Math.round((Math.sin(time * 6 + i) + 1) * 3));
      rect(c, '#d7e9d8', -3, -13, 2, 1); rect(c, '#d7e9d8', 2, -13, 2, 1);
    } else if (name === 'note') {
      rect(c, '#1d3134', -5, -2, 11, 5); rect(c, read ? '#899486' : '#d9c795', -4, -5, 8, 7); rect(c, read ? '#acb09b' : '#f3e2b4', -4, -5, 7, 1);
      rect(c, '#7d806a', -2, -3, 4, 1); rect(c, '#7d806a', -2, -1, 3, 1); rect(c, '#f5e8c4', 3, -4, 1, 2);
      if (!read) { c.globalAlpha = 0.4 + Math.sin(time * 3) * 0.3; rect(c, '#ffe7a4', 0, -11 - float, 1, 3); rect(c, '#ffe7a4', -1, -10 - float, 3, 1); }
    } else if (name === 'hat') { rect(c, '#273a37', -7, -1, 14, 3); rect(c, '#a6a087', -7, -3, 14, 3); rect(c, '#a7aa8a', -4, -7, 8, 5); rect(c, '#5d7065', -4, -3, 8, 1); rect(c, '#c2bc96', -3, -7, 5, 1); }
    else if (name === 'glasses') { rect(c, '#c2b991', -6, -3, 5, 1); rect(c, '#c2b991', 1, -3, 5, 1); rect(c, '#c2b991', -6, 0, 5, 1); rect(c, '#c2b991', 1, 0, 5, 1); rect(c, '#c2b991', -6, -2, 1, 2); rect(c, '#c2b991', 5, -2, 1, 2); rect(c, '#b7b58d', -2, -2, 4, 1); }
    else if (name === 'music') { rect(c, '#6b4f48', -5, -4, 10, 6); rect(c, '#c2a67c', -5, -5, 10, 2); rect(c, '#9b7c67', -4, -9, 8, 4); rect(c, '#e2ce9a', -3, -8, 6, 2); rect(c, '#c6ae85', -1, -1, 2, 2); }
    c.restore();
  }
  SL.art = { rng: rng, paintMap: paintMap, player: player, sprite: sprite };
}());
