// 指令表和召喚產生器共用：圖示選擇器、複製按鈕
// 需要先載入 assets/mc-data.js

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
        current.dispatchEvent(new CustomEvent('pick', { detail: entry }));
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
