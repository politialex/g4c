// Confronto primo/secondo giocatore per Equilibrio turni.
// Non entra nella pagina pubblicata: si lancia con node, fuori da index.html.
// Regole predefinite: Same + Plus + Combo, effetti attivi, mazzi casuali.
// La cella bloccata non è una carta: non si piazza e non si cattura.
// Uso: node tools/sim-equilibrio.js [off|vuota|bloccata|check] [greedy|ply2] [n] [seed]
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const start = html.indexOf('// ===== ENGINE v9');
const end = html.indexOf('// ---------- campagna');
if (start < 0 || end < start) throw new Error('Motore non trovato in index.html');
const ctx = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} }, console, Math };
vm.createContext(ctx);
vm.runInContext(html.slice(start, end) + '\nthis.E={POOL,resolve,cloneBoard,newBoard,shuffle,sidePower,endTriggers,startTriggers,emptyCells,isOver,score,capFor,boardFull};', ctx);
const E = ctx.E;
const { POOL, resolve, cloneBoard, newBoard, shuffle, endTriggers, startTriggers } = E;
const ACTIVE = POOL.filter(c => c.active);
const RULES = { same: true, plus: true, combo: true, comboBase: false, maxDepth: 99, elemental: false, effects: true };
const W = { common: 50, rare: 30, epic: 15, legendary: 5 };

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function installSeed(seed) { Math.random = mulberry32(seed); }

function pickW(pool) {
  const rs = ['common', 'rare', 'epic', 'legendary'].filter(r => W[r] > 0 && pool.some(c => c.rarity === r));
  let x = Math.random() * rs.reduce((a, r) => a + W[r], 0), r = rs[rs.length - 1];
  for (const k of rs) { if (x < W[k]) { r = k; break; } x -= W[k]; }
  const cs = pool.filter(c => c.rarity === r);
  return cs[Math.floor(Math.random() * cs.length)];
}
function randDeck() {
  const d = [];
  while (d.length < 10) {
    const cnt = r => d.filter(c => c.rarity === r).length;
    const pool = ACTIVE.filter(c => !d.includes(c) && !(c.rarity === 'legendary' && cnt('legendary') >= 1) && !(c.rarity === 'epic' && cnt('epic') >= 2));
    d.push(pickW(pool));
  }
  return d;
}
const other = w => w === 'p' ? 'c' : 'p';
function empties(board) {
  const out = [];
  for (let i = 0; i < 16; i++) if (!board.cells[i] && board.blocked !== i) out.push(i);
  return out;
}
function scoreOf(b, w) { return b.cells.filter(c => c && c.owner === w).length; }
function caps(ev) { return ev.filter(e => e.from !== e.to).length; }
function cloneB(b0) {
  const b = cloneBoard(b0);
  b.blocked = b0.blocked == null ? null : b0.blocked;
  return b;
}
function chooseGreedy(G, w) {
  let best = null;
  G.hands[w].forEach((card, hi) => empties(G.board).forEach(cell => {
    const b = cloneB(G.board);
    const ev = resolve(b, cell, card, w, G.rules);
    const s = caps(ev) + (card.fx.some(f => f.t === 'draw') ? 0.5 : 0) + Math.random() * 0.01;
    if (!best || s > best.s) best = { s, hi, cell };
  }));
  return best;
}
function choose2ply(G, w) {
  const o = other(w);
  let best = null;
  const oh = G.hands[o].slice();
  G.hands[w].forEach((card, hi) => empties(G.board).forEach(cell => {
    const b = cloneB(G.board);
    resolve(b, cell, card, w, G.rules);
    endTriggers(b, w, G.rules, 0);
    let worst = scoreOf(b, w) - scoreOf(b, o);
    const em = empties(b);
    if (em.length && oh.length) {
      worst = Infinity;
      oh.forEach(oc => em.forEach(c2 => {
        const b2 = cloneB(b);
        resolve(b2, c2, oc, o, G.rules);
        const v = scoreOf(b2, w) - scoreOf(b2, o);
        if (v < worst) worst = v;
      }));
    }
    const s = worst + Math.random() * 0.01;
    if (!best || s > best.s) best = { s, hi, cell };
  }));
  return best;
}
const AI = { greedy: chooseGreedy, ply2: choose2ply };

function play(dp, dc, aiName, eq) {
  const first = 'p';
  const board = newBoard(RULES, Math.random);
  board.blocked = null;
  if (eq === 'bloccata') board.blocked = Math.floor(Math.random() * 16);
  const cap = { p: 8, c: 8 };
  if (eq === 'vuota') cap.c = 7;
  const G = {
    rules: RULES, board,
    decks: { p: shuffle(dp, Math.random), c: shuffle(dc, Math.random) },
    hands: { p: [], c: [] }, used: { p: 0, c: 0 }, current: first, placed: { p: 0, c: 0 },
  };
  for (const w of ['p', 'c']) for (let i = 0; i < 3; i++) G.hands[w].push(G.decks[w].shift());
  const ai = AI[aiName];
  const full = () => empties(G.board).length === 0;
  let guard = 0;
  while (!(G.used.p >= cap.p && G.used.c >= cap.c) && !full() && guard++ < 40) {
    const w = G.current;
    if (G.used[w] >= cap[w]) { G.current = other(w); continue; }
    if ((!G.hands[w].length && !G.decks[w].length) || !empties(G.board).length) {
      G.used[w]++; G.current = other(w); continue;
    }
    startTriggers(G.board, w);
    const drawn = G.decks[w].shift();
    if (drawn) G.hands[w].push(drawn);
    const mv = ai(G, w);
    if (!mv) { endTriggers(G.board, w, G.rules, 0); G.used[w]++; G.current = other(w); continue; }
    const card = G.hands[w].splice(mv.hi, 1)[0];
    resolve(G.board, mv.cell, card, w, G.rules, G);
    endTriggers(G.board, w, G.rules, 1);
    G.used[w]++; G.placed[w]++; G.current = other(w);
  }
  const p = scoreOf(G.board, 'p'), c = scoreOf(G.board, 'c');
  return { p, c, placed: G.placed, filled: G.board.cells.filter(Boolean).length, blocked: G.board.blocked };
}

function summarize(arr) {
  const n = arr.length;
  const f = arr.filter(g => g.p > g.c).length;
  const s = arr.filter(g => g.c > g.p).length;
  const t = n - f - s;
  const ci = p => 1.96 * Math.sqrt(p * (1 - p) / n);
  const pf = f / n, ps = s / n, pt = t / n;
  const placedP = arr.reduce((a, g) => a + g.placed.p, 0) / n;
  const placedC = arr.reduce((a, g) => a + g.placed.c, 0) / n;
  const filled = arr.reduce((a, g) => a + g.filled, 0) / n;
  return {
    n,
    first_win: +pf.toFixed(4),
    second_win: +ps.toFixed(4),
    tie: +pt.toFixed(4),
    ci95_first: +ci(pf).toFixed(4),
    avg_placed_first: +placedP.toFixed(2),
    avg_placed_second: +placedC.toFixed(2),
    avg_filled: +filled.toFixed(2),
  };
}

const eq = process.argv[2] || 'off';
const ai = process.argv[3] || 'greedy';
const N = +process.argv[4] || 1000;
const seed = +process.argv[5] || 20261112;
if (eq === 'check') {
  const rules = RULES;
  const b = newBoard(rules, Math.random);
  b.blocked = 3;
  const G = { board: b, turnsUsed: { p: 0, c: 0 }, maxTurns: 8 };
  const em = E.emptyCells(G);
  if (em.includes(3) || em.length !== 15) throw new Error('cella bloccata ancora giocabile');
  if (E.isOver(G)) throw new Error('partita finita troppo presto');
  G.turnCap = { p: 8, c: 7 };
  G.turnsUsed = { p: 8, c: 6 };
  if (E.isOver(G)) throw new Error('manca ancora un turno al secondo');
  G.turnsUsed = { p: 8, c: 7 };
  if (!E.isOver(G)) throw new Error('cella vuota non chiude a 8 e 7');
  for (let i = 0; i < 16; i++) if (i !== 3) b.cells[i] = { owner: 'p' };
  G.turnsUsed = { p: 1, c: 0 };
  G.turnCap = null;
  if (!E.boardFull(G) || !E.isOver(G)) throw new Error('tabellone pieno non chiude');
  if (E.score(G, 'p') !== 15) throw new Error('la cella bloccata conta nel punteggio');
  const blocked = newBoard(rules, Math.random);
  blocked.blocked = 5;
  const ev = resolve(blocked, 5, POOL.find(c => c.active), 'p', rules);
  if (blocked.cells[5] || ev.length) throw new Error('resolve piazza sulla cella bloccata');
  console.log('check ok');
  process.exit(0);
}
installSeed(seed);
const gs = [];
for (let i = 0; i < N; i++) gs.push(play(randDeck(), randDeck(), ai, eq));
console.log(JSON.stringify(Object.assign({ eq, ai, seed }, summarize(gs))));
