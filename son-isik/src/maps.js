(function () {
  'use strict';
  const SL = window.SL = window.SL || {};
  const solid = new Set('#RQUVWNwTbLCcF+KGPHXkOY');
  SL.isSolid = function (tile) { return tile == null || solid.has(tile); };
  function grid(w, h, tile) {
    const rows = Array.from({ length: h }, function () { return Array(w).fill(tile); });
    const b = {
      rows: rows,
      set: function (x, y, t) { if (rows[y] && x >= 0 && x < w) rows[y][x] = t; return b; },
      fill: function (x, y, width, height, t) {
        for (let j = y; j < y + height; j++) for (let i = x; i < x + width; i++) b.set(i, j, t);
        return b;
      },
      disc: function (cx, cy, r, t) {
        for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) {
          if ((x - cx) * (x - cx) + (y - cy) * (y - cy) <= r * r) b.set(x, y, t);
        }
        return b;
      },
      path: function (points, r, t) {
        for (let p = 1; p < points.length; p++) {
          const a = points[p - 1], z = points[p], n = Math.max(Math.abs(z[0] - a[0]), Math.abs(z[1] - a[1])) * 2;
          for (let i = 0; i <= n; i++) b.disc(Math.round(a[0] + (z[0] - a[0]) * i / n), Math.round(a[1] + (z[1] - a[1]) * i / n), r, t);
        }
        return b;
      },
      building: function (x, y, width, height, doorDx, windows, roof) {
        b.fill(x, y, width, height - 1, roof).fill(x, y + height - 1, width, 1, '#');
        windows.forEach(function (p) { b.set(x + p[0], y + height - 1, p[1]); });
        b.set(x + doorDx, y + height - 1, '+'); return b;
      },
      done: function (id, title, start, darkness) {
        return { id: id, title: title, w: w, h: h, rows: rows.map(function (r) { return r.join(''); }), start: start, darkness: darkness };
      }
    };
    return b;
  }
  SL.buildMaps = function () {
    const t = grid(48, 32, '.');
    t.fill(38, 0, 2, 32, 's').fill(40, 0, 8, 32, 'w');
    t.fill(42, 1, 5, 6, 's').fill(43, 2, 3, 3, 'G').set(40, 5, '_').fill(40, 24, 5, 1, '_');
    t.fill(0, 13, 38, 4, ',').fill(0, 14, 38, 2, '=');
    t.fill(19, 0, 4, 32, ',').fill(20, 0, 2, 32, '=').fill(19, 14, 4, 2, '=');
    t.fill(0, 0, 2, 32, 'T').fill(0, 0, 38, 1, 'T').fill(0, 31, 38, 1, 'T').fill(0, 13, 2, 4, ',');
    t.building(3, 6, 7, 6, 3, [[1, 'N'], [5, 'W']], 'R');
    t.building(11, 4, 7, 8, 3, [[1, 'W'], [5, 'N']], 'Q');
    t.building(24, 2, 3, 10, 1, [[0, 'N']], 'U').set(25, 4, 'K');
    t.building(29, 6, 7, 6, 2, [[0, 'W'], [4, 'W'], [6, 'N']], 'V');
    t.building(3, 18, 7, 6, 3, [[1, 'W'], [5, 'N']], 'R');
    t.building(11, 18, 6, 5, 2, [[0, 'N'], [4, 'W']], 'U');
    t.building(24, 18, 8, 6, 4, [[1, 'N'], [6, 'W']], 'Q');
    t.building(33, 19, 4, 5, 1, [[3, 'N']], 'V');
    [[3, 13], [10, 16], [18, 13], [22, 7], [22, 25], [32, 16], [37, 24], [19, 20]].forEach(function (p) { t.set(p[0], p[1], 'L'); });
    [[8, 14], [28, 15], [20, 25]].forEach(function (p) { t.set(p[0], p[1], 'C').set(p[0] + 1, p[1], 'c'); });
    t.set(23, 12, 'P').fill(2, 26, 11, 1, 'T').set(10, 26, '.').fill(13, 26, 1, 5, 'T');
    [[3, 2], [5, 3], [8, 2], [30, 2], [34, 3], [36, 5], [16, 27], [17, 29], [26, 28], [30, 30], [35, 27], [36, 29]].forEach(function (p) { t.set(p[0], p[1], 'T'); });
    [[4, 16], [16, 12], [32, 25], [9, 4], [28, 4], [37, 10]].forEach(function (p) { t.set(p[0], p[1], 'b'); });
    const f = grid(40, 40, 'T');
    f.path([[20, 39], [20, 31], [9, 26], [9, 17], [20, 11], [20, 3]], 1, ',');
    f.path([[9, 26], [4, 33]], 1, ',').disc(4, 33, 3, '.');
    f.path([[9, 17], [5, 8]], 1, ',').disc(5, 8, 3, '.');
    f.path([[20, 11], [31, 13], [33, 24]], 1, ',').disc(33, 25, 3, '.');
    f.path([[20, 31], [31, 35]], 1, ',').disc(32, 35, 2, '.');
    f.disc(20, 3, 3, '.').set(20, 2, 'H');
    const l = grid(36, 24, '#');
    [[2, 16, 8, 6], [10, 18, 24, 2], [4, 3, 8, 8], [7, 11, 2, 5], [14, 3, 8, 8], [17, 11, 2, 7], [25, 3, 8, 8], [28, 11, 2, 7], [29, 13, 6, 9]].forEach(function (r) { l.fill(r[0], r[1], r[2], r[3], '.'); });
    l.set(8, 6, 'X').set(18, 6, 'X').set(29, 6, 'X').set(15, 4, 'k').set(20, 4, 'k').set(32, 13, 'k').set(34, 17, 'E').set(5, 16, 'S');
    [[10, 4], [10, 5], [15, 8], [20, 8], [26, 4], [32, 4], [32, 5]].forEach(function (p) { l.set(p[0], p[1], 'Y'); });
    const h = grid(16, 34, '#');
    h.fill(3, 27, 10, 5, '.').set(8, 31, 'E').fill(11, 18, 2, 9, 'S').fill(3, 16, 10, 2, '.').fill(3, 8, 2, 8, 'S').fill(3, 8, 6, 2, '.').disc(8, 5, 4, '.').set(8, 4, 'O');
    [[4, 3], [12, 3], [2, 16], [13, 28], [2, 29]].forEach(function (p) { h.set(p[0], p[1], 'N'); });
    return {
      town: t.done('town', 'Terk Edilmiş Kasaba', { x: 6, y: 24, dir: 'down' }, 0.64),
      forest: f.done('forest', 'Unutulmuş Orman', { x: 20, y: 37, dir: 'up' }, 0.82),
      lab: l.done('lab', 'Yeraltındaki Gerçek', { x: 5, y: 18, dir: 'up' }, 0.82),
      lighthouse: h.done('lighthouse', 'Son Işık', { x: 8, y: 29, dir: 'up' }, 0.68)
    };
  };
}());
