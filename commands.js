// ===== 下拉選單清單 =====
// 格式：[中文名稱, Minecraft ID]
// 方塊和物品的完整清單在 assets/mc-data.js（用圖示選擇器）
const LISTS = {
  target: [
    ['自己', '@s'],
    ['最近的玩家', '@p'],
    ['所有玩家', '@a'],
    ['隨機一位玩家', '@r'],
  ],
  gamemode: [
    ['創造模式', 'creative'],
    ['生存模式', 'survival'],
    ['冒險模式', 'adventure'],
    ['旁觀者模式', 'spectator'],
  ],
  difficulty: [
    ['和平', 'peaceful'],
    ['簡單', 'easy'],
    ['普通', 'normal'],
    ['困難', 'hard'],
  ],
  time: [
    ['白天', 'day'],
    ['中午', 'noon'],
    ['晚上', 'night'],
    ['半夜', 'midnight'],
  ],
  weather: [
    ['晴天', 'clear'],
    ['下雨', 'rain'],
    ['打雷', 'thunder'],
  ],
  onoff: [
    ['開啟', 'true'],
    ['關閉', 'false'],
  ],
  fillMode: [
    ['實心', ''],
    ['空心（裡面清空）', 'hollow'],
    ['只有外框', 'outline'],
  ],
  mobs: [
    ['豬', 'pig'],
    ['牛', 'cow'],
    ['羊', 'sheep'],
    ['雞', 'chicken'],
    ['馬', 'horse'],
    ['驢子', 'donkey'],
    ['駱駝', 'camel'],
    ['羊駝', 'llama'],
    ['狼', 'wolf'],
    ['貓', 'cat'],
    ['狐狸', 'fox'],
    ['貓熊', 'panda'],
    ['鸚鵡', 'parrot'],
    ['兔子', 'rabbit'],
    ['六角恐龍', 'axolotl'],
    ['青蛙', 'frog'],
    ['蜜蜂', 'bee'],
    ['海龜', 'turtle'],
    ['海豚', 'dolphin'],
    ['悅靈', 'allay'],
    ['嗅探獸', 'sniffer'],
    ['犰狳', 'armadillo'],
    ['村民', 'villager'],
    ['鐵魔像', 'iron_golem'],
    ['雪人', 'snow_golem'],
    ['殭屍', 'zombie'],
    ['骷髏', 'skeleton'],
    ['苦力怕', 'creeper'],
    ['蜘蛛', 'spider'],
    ['終界使者', 'enderman'],
    ['史萊姆', 'slime'],
    ['女巫', 'witch'],
    ['烈焰使者', 'blaze'],
    ['地獄幽靈', 'ghast'],
    ['伏守者', 'warden'],
    ['凋零怪', 'wither'],
    ['終界龍', 'ender_dragon'],
    ['閃電', 'lightning_bolt'],
  ],
  rideable: [
    ['馬', 'horse'],
    ['豬', 'pig'],
    ['驢子', 'donkey'],
    ['駱駝', 'camel'],
    ['羊駝', 'llama'],
    ['熾足獸', 'strider'],
    ['牛', 'cow'],
    ['羊', 'sheep'],
    ['雞', 'chicken'],
    ['終界龍', 'ender_dragon'],
  ],
  effects: [
    ['加速', 'speed'],
    ['緩慢', 'slowness'],
    ['挖掘加速', 'haste'],
    ['力量', 'strength'],
    ['跳躍提升', 'jump_boost'],
    ['回復', 'regeneration'],
    ['抗性', 'resistance'],
    ['抗火', 'fire_resistance'],
    ['水下呼吸', 'water_breathing'],
    ['隱形', 'invisibility'],
    ['夜視', 'night_vision'],
    ['飽食', 'saturation'],
    ['發光', 'glowing'],
    ['漂浮', 'levitation'],
    ['緩降', 'slow_falling'],
    ['海豚的恩惠', 'dolphins_grace'],
    ['吸收', 'absorption'],
    ['生命值提升', 'health_boost'],
    ['幸運', 'luck'],
  ],
  enchantments: [
    ['鋒利（最高 5）', 'sharpness'],
    ['不死剋星（最高 5）', 'smite'],
    ['擊退（最高 2）', 'knockback'],
    ['燃燒（最高 2）', 'fire_aspect'],
    ['掠奪（最高 3）', 'looting'],
    ['橫掃之刃（最高 3）', 'sweeping_edge'],
    ['效率（最高 5）', 'efficiency'],
    ['幸運（最高 3）', 'fortune'],
    ['絲綢之觸（最高 1）', 'silk_touch'],
    ['耐久（最高 3）', 'unbreaking'],
    ['修補（最高 1）', 'mending'],
    ['保護（最高 4）', 'protection'],
    ['輕盈（最高 4）', 'feather_falling'],
    ['水中呼吸（最高 3）', 'respiration'],
    ['深海漫遊（最高 3）', 'depth_strider'],
    ['冰霜行者（最高 2）', 'frost_walker'],
    ['力量（弓，最高 5）', 'power'],
    ['火焰（弓，最高 1）', 'flame'],
    ['無限（弓，最高 1）', 'infinity'],
    ['忠誠（三叉戟，最高 3）', 'loyalty'],
    ['激流（三叉戟，最高 3）', 'riptide'],
    ['喚雷（三叉戟，最高 1）', 'channeling'],
    ['分裂箭矢（弩，最高 1）', 'multishot'],
    ['快速上弦（弩，最高 3）', 'quick_charge'],
  ],
  structures: MC_STRUCTURES, // assets/mc-worldgen.js
  biomes: MC_BIOMES, // assets/mc-worldgen.js
};

// ===== 指令表 =====
// 字串 = 固定文字
// {list: '清單名'}       = 一般下拉選單
// {pick: 'blocks'|'items'} = 圖示選擇器
// {num: [預設, 最小, 最大]} = 數字
// {coord: 'X'}           = 座標（空白讓學生自己填，可以打 ~）
const T = { list: 'target' };
const XYZ = (n = '') => [{ coord: `X${n}` }, ' ', { coord: `Y${n}` }, ' ', { coord: `Z${n}` }];

const SECTIONS = [
  {
    title: '🎮 遊戲設定',
    rows: [
      ['切換遊戲模式', ['/gamemode ', { list: 'gamemode' }, ' ', T]],
      ['改變難度', ['/difficulty ', { list: 'difficulty' }]],
      ['死掉的時候不會掉東西', ['/gamerule keep_inventory ', { list: 'onoff' }]],
      ['摔落傷害', ['/gamerule fall_damage ', { list: 'onoff' }]],
      ['火焰傷害', ['/gamerule fire_damage ', { list: 'onoff' }]],
      ['溺水傷害', ['/gamerule drowning_damage ', { list: 'onoff' }]],
      ['查看世界種子碼', ['/seed']],
      ['查看所有指令', ['/help']],
    ],
  },
  {
    title: '☀️ 時間與天氣',
    rows: [
      ['改變時間', ['/time set ', { list: 'time' }]],
      ['時間會不會前進（關閉 = 時間停住）', ['/gamerule advance_time ', { list: 'onoff' }]],
      ['改變天氣', ['/weather ', { list: 'weather' }]],
    ],
  },
  {
    title: '🧭 傳送與找地方',
    rows: [
      ['傳送到座標', ['/tp ', T, ' ', ...XYZ()]],
      ['找最近的結構（會告訴你座標）', ['/locate structure ', { list: 'structures' }]],
      ['找最近的生態域', ['/locate biome ', { list: 'biomes' }]],
    ],
  },
  {
    title: '🎁 物品',
    rows: [
      ['給物品', ['/give ', T, ' ', { pick: 'items' }, ' ', { num: [1, 1, 64] }]],
      ['幫手上的東西附魔', ['/enchant ', T, ' ', { list: 'enchantments' }, ' ', { num: [1, 1, 5] }]],
      ['清空背包', ['/clear ', T]],
    ],
  },
  {
    title: '🐷 生物',
    rows: [
      ['召喚生物', ['/summon ', { list: 'mobs' }]],
      ['騎上旁邊最近的生物', ['/ride ', T, ' mount @e[type=', { list: 'rideable' }, ',limit=1,sort=nearest]']],
      ['讓所有生物停住不動', ['/tick freeze']],
      ['讓生物恢復移動', ['/tick unfreeze']],
      ['清除某一種生物', ['/kill @e[type=', { list: 'mobs' }, ']']],
    ],
  },
  {
    title: '💪 狀態效果與傷害',
    rows: [
      ['給效果（秒數、等級）', ['/effect give ', T, ' ', { list: 'effects' }, ' ', { num: [30, 1, 1000000] }, ' ', { num: [0, 0, 255] }]],
      ['清除身上所有效果', ['/effect clear ', T]],
      ['造成傷害（1 = 半顆心）', ['/damage ', T, ' ', { num: [2, 1, 1000] }]],
      ['讓玩家死掉（重生用）', ['/kill ', T]],
    ],
  },
  {
    title: '🧱 建築',
    note: '💡 按 <kbd>F3</kbd> 可以看到自己的座標。座標也可以打 <code>~</code>，代表「我現在的位置」，例如 <code>~ ~-1 ~</code> 是腳下那一格。',
    rows: [
      ['放一個方塊', ['/setblock ', ...XYZ(), ' ', { pick: 'blocks' }]],
      ['把兩個角之間填滿方塊', ['/fill ', ...XYZ(1), ' ', ...XYZ(2), ' ', { pick: 'blocks' }, ' ', { list: 'fillMode' }]],
      ['把兩個角之間清空（變成空氣）', ['/fill ', ...XYZ(1), ' ', ...XYZ(2), ' air']],
    ],
  },
];

// ===== 一般下拉選單、數字、座標 =====
function makeSelect(name) {
  const sel = document.createElement('select');
  let parent = sel;
  for (const [zh, id] of LISTS[name]) {
    if (id === null) {
      // 分類標題
      parent = document.createElement('optgroup');
      parent.label = zh;
      sel.appendChild(parent);
      continue;
    }
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = id ? `${zh} ${id}` : zh;
    parent.appendChild(opt);
  }
  return sel;
}

function makeNumber([value, min, max]) {
  const input = document.createElement('input');
  input.type = 'number';
  input.value = value;
  input.min = min;
  input.max = max;
  input.style.width = `${String(max).length > 4 ? 7 : 5}ch`;
  return input;
}

function makeCoord(label) {
  const input = document.createElement('input');
  input.type = 'text';
  input.inputMode = 'numeric';
  input.className = 'coord';
  input.placeholder = label;
  input.setAttribute('aria-label', `座標 ${label}`);
  input.addEventListener('input', () => input.classList.remove('need'));
  return input;
}

// ===== 圖示選擇器（方塊／物品） =====
const PICK_DATA = { blocks: MC_BLOCKS, items: MC_ITEMS };
const PICK_LABEL = { blocks: '方塊', items: '物品' };

function iconEl(pos) {
  const el = document.createElement('span');
  el.className = 'mc-icon';
  if (pos >= 0) {
    el.style.backgroundPosition = `-${(pos % ICON_COLS) * ICON_SIZE}px -${Math.floor(pos / ICON_COLS) * ICON_SIZE}px`;
  }
  return el;
}

function setPicked(btn, entry) {
  const [id, zh, , pos] = entry;
  btn.dataset.value = id;
  btn.title = `${zh}（${id}）`;
  btn.querySelector('.mc-icon').replaceWith(iconEl(pos));
  btn.querySelector('.pick-name').textContent = zh;
}

function makePicker(kind) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'mc-picker';
  btn.innerHTML = `<span class="pick-kind">${PICK_LABEL[kind]}</span><span class="mc-icon"></span><span class="pick-name"></span><span class="pick-arrow">▾</span>`;
  const first = PICK_DATA[kind].find((e) => e[0] === (kind === 'blocks' ? 'grass_block' : 'diamond_sword')) || PICK_DATA[kind][0];
  setPicked(btn, first);
  btn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    Popup.open(btn, kind);
  });
  return btn;
}

const Popup = (() => {
  const panel = document.createElement('div');
  panel.className = 'mc-popup';
  panel.hidden = true;
  panel.innerHTML = `
    <div class="mc-search"><input type="search" placeholder="搜尋（中文或英文都可以）" aria-label="搜尋"><span>🔍</span></div>
    <div class="mc-grid" role="listbox"></div>
    <p class="mc-empty" hidden>找不到，換個字試試看！</p>`;
  const search = panel.querySelector('input');
  const gridBox = panel.querySelector('.mc-grid');
  const empty = panel.querySelector('.mc-empty');
  const grids = {};
  let current = null;
  let currentKind = null;

  function buildGrid(kind) {
    const frag = document.createDocumentFragment();
    for (const entry of PICK_DATA[kind]) {
      const [id, zh, en, pos] = entry;
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'mc-cell';
      cell.title = `${zh}（${id}）`;
      cell.dataset.search = `${zh} ${en} ${id}`.toLowerCase();
      cell.appendChild(iconEl(pos));
      cell.addEventListener('click', () => {
        setPicked(current, entry);
        close();
        current.focus();
      });
      frag.appendChild(cell);
    }
    const grid = document.createElement('div');
    grid.className = 'mc-grid-inner';
    grid.appendChild(frag);
    return grid;
  }

  function filter() {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    for (const cell of grids[currentKind].children) {
      const ok = !q || cell.dataset.search.includes(q);
      cell.hidden = !ok;
      if (ok) shown++;
    }
    empty.hidden = shown > 0;
  }

  function place(btn) {
    const r = btn.getBoundingClientRect();
    const w = Math.min(460, window.innerWidth - 16);
    panel.style.width = `${w}px`;
    let left = r.left + window.scrollX;
    left = Math.max(8 + window.scrollX, Math.min(left, window.scrollX + window.innerWidth - w - 8));
    panel.style.left = `${left}px`;
    panel.style.top = `${r.bottom + window.scrollY + 6}px`;
  }

  function open(btn, kind) {
    if (current === btn && !panel.hidden) return close();
    current = btn;
    currentKind = kind;
    if (!grids[kind]) grids[kind] = buildGrid(kind);
    gridBox.replaceChildren(grids[kind]);
    for (const c of grids[kind].children) c.classList.toggle('selected', c.title.endsWith(`（${btn.dataset.value}）`));
    search.value = '';
    filter();
    panel.hidden = false;
    place(btn);
    const sel = grids[kind].querySelector('.selected');
    gridBox.scrollTop = sel ? sel.offsetTop - gridBox.clientHeight / 2 : 0;
    search.focus({ preventScroll: true });
  }

  function close() {
    panel.hidden = true;
  }

  search.addEventListener('input', filter);
  panel.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      close();
      current?.focus();
    }
  });
  window.addEventListener('resize', () => !panel.hidden && place(current));
  document.body.appendChild(panel);
  return { open, close };
})();

// ===== 複製 =====
function readCommand(codeEl) {
  let text = '';
  const missing = [];
  for (const node of codeEl.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) text += node.textContent;
    else if (node.classList?.contains('mc-picker')) text += node.dataset.value;
    else if (node.tagName === 'SELECT' || node.tagName === 'INPUT') {
      const v = node.value.trim();
      if (node.classList.contains('coord') && !v) missing.push(node);
      text += v;
    }
  }
  return { text: text.replace(/\s+/g, ' ').trim(), missing };
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

function flash(btn, label, cls) {
  btn.textContent = label;
  btn.classList.remove('copied', 'warn');
  if (cls) btn.classList.add(cls);
  clearTimeout(btn._t);
  btn._t = setTimeout(() => {
    btn.textContent = '📋 複製';
    btn.classList.remove('copied', 'warn');
  }, 1600);
}

// ===== 畫面 =====
function render() {
  const root = document.getElementById('command-list');
  for (const section of SECTIONS) {
    const card = document.createElement('section');
    card.className = 'card cmd-card';
    card.innerHTML = `<h2>${section.title}</h2>${section.note ? `<p class="tip">${section.note}</p>` : ''}`;

    const table = document.createElement('table');
    table.className = 'cmd-table';
    table.innerHTML = '<thead><tr><th scope="col">用途</th><th scope="col">指令</th></tr></thead>';
    const tbody = document.createElement('tbody');

    for (const [use, parts] of section.rows) {
      const tr = document.createElement('tr');
      const tdUse = document.createElement('td');
      tdUse.className = 'cmd-use';
      tdUse.textContent = use;

      const tdCmd = document.createElement('td');
      const wrap = document.createElement('div');
      wrap.className = 'cmd-right';
      const code = document.createElement('code');
      code.className = 'cmd-code';
      for (const part of parts) {
        if (typeof part === 'string') code.appendChild(document.createTextNode(part));
        else if (part.list) code.appendChild(makeSelect(part.list));
        else if (part.pick) code.appendChild(makePicker(part.pick));
        else if (part.num) code.appendChild(makeNumber(part.num));
        else if (part.coord) code.appendChild(makeCoord(part.coord));
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-copy';
      btn.textContent = '📋 複製';
      btn.addEventListener('click', async () => {
        const { text, missing } = readCommand(code);
        if (missing.length) {
          missing.forEach((m) => m.classList.add('need'));
          missing[0].focus();
          flash(btn, '⚠️ 先填座標', 'warn');
          return;
        }
        const ok = await copyText(text);
        flash(btn, ok ? '✅ 已複製！' : '❌ 複製失敗', ok ? 'copied' : 'warn');
      });

      wrap.append(code, btn);
      tdCmd.appendChild(wrap);
      tr.append(tdUse, tdCmd);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    card.appendChild(table);
    root.appendChild(card);
  }
}

render();
