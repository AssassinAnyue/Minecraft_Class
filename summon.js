// 召喚產生器：組出 Minecraft Java 26.3 的 /summon 指令
// 資料：assets/mc-summon.js（生物、效果、屬性、附魔）、assets/mc-data.js（方塊、物品）

// ===== 專屬欄位 =====
// t: bool（打勾）／off（打勾代表「關掉」）／int／num／sel（下拉）／block／item／text
// f: 數字的後綴；g: 放在「群組標籤」分頁
const COLOR_OPTS = MC_COLORS.map((zh, i) => [String(i), zh]);
const CLIMATE = { temperate: '溫和地區', warm: '炎熱地區', cold: '寒冷地區' };
const VARIANT_ZH = {
  cat: { tabby: '虎斑貓', black: '賓士貓', red: '橘貓', siamese: '暹羅貓', british_shorthair: '英國短毛貓', calico: '三花貓', persian: '波斯貓', ragdoll: '布偶貓', white: '白貓', jellie: 'Jellie（灰白貓）', all_black: '黑貓' },
  wolf: { pale: '蒼白（一般）', spotted: '斑點', snowy: '雪白', black: '黑色', ashen: '灰色', rusty: '鏽紅', woods: '森林', chestnut: '栗色', striped: '條紋' },
};
const variantOpts = (id) => (MC_VARIANTS[`${id}_variant`] || []).map((v) => [v, (VARIANT_ZH[id] || CLIMATE)[v] || v]);
const GENES = [['normal', '普通'], ['lazy', '懶惰'], ['worried', '膽小'], ['playful', '愛玩'], ['brown', '棕色'], ['weak', '虛弱'], ['aggressive', '兇猛']];
const HORSE_COLORS = ['白色', '奶油色', '栗色', '棕色', '黑色', '灰色', '深棕色'];
const HORSE_MARKS = ['沒有花紋', '白腳', '白色大斑', '白色小點', '黑色小點'];
const TICKS = '20 刻 = 1 秒';

const FIELDS = {
  IsBaby: { zh: '是小寶寶', t: 'bool' },
  CanBreakDoors: { zh: '會破壞門', t: 'bool' },
  DrownedConversionTime: { zh: '多久變成沉屍', t: 'int', hint: `${TICKS}；-1 是不會變` },
  InWaterTime: { zh: '已經泡在水裡多久', t: 'int', hint: `${TICKS}；泡 600 刻就會開始變成沉屍` },
  ConversionTime: { zh: '多久被治好變村民', t: 'int', hint: TICKS },
  StrayConversionTime: { zh: '多久變成流髑', t: 'int', hint: TICKS },
  FreezingTime: { zh: '已經冰凍多久', t: 'int', hint: TICKS },
  powered: { zh: '閃電苦力怕', t: 'bool' },
  ignited: { zh: '一出現就點燃', t: 'bool' },
  Fuse: { zh: '爆炸倒數', t: 'int', hint: `${TICKS}；一般是 30` },
  ExplosionRadius: { zh: '爆炸範圍', t: 'int', min: 0, max: 127, hint: '一般是 3，數字太大電腦會當掉' },
  ExplosionPower: { zh: '爆炸威力', t: 'int', min: 0, max: 127, hint: '一般是 1，數字太大電腦會當掉' },
  explosion_power: { zh: '爆炸威力', t: 'num', f: 'f', min: 0, max: 128, hint: '一般是 4，數字太大電腦會當掉' },
  fuse: { zh: '爆炸倒數', t: 'int', hint: `${TICKS}；一般 TNT 是 80` },
  block_state: { zh: '外觀換成方塊', t: 'block' },
  BlockState: { zh: '掉落哪種方塊', t: 'block' },
  Time: { zh: '已經掉落多久', t: 'int', hint: `填 1 比較保險；${TICKS}` },
  HurtEntities: { zh: '砸到會受傷', t: 'bool' },
  FallHurtAmount: { zh: '每格砸傷多少', t: 'num', f: 'f' },
  FallHurtMax: { zh: '最多砸傷多少', t: 'int' },
  CancelDrop: { zh: '落地後消失', t: 'bool' },
  DropItem: { zh: '破掉時不掉物品', t: 'off' },
  carriedBlockState: { zh: '手上拿的方塊', t: 'block' },
  Item: { zh: '外觀物品', t: 'item' },
  'item.Item': { zh: '哪個物品', t: 'item' },
  PickupDelay: { zh: '多久之後才能撿', t: 'int', hint: `${TICKS}；32767 是永遠不能撿` },
  Value: { zh: '經驗值', t: 'int', min: 0, max: 32767 },
  Count: { zh: '可以撿幾次', t: 'int', min: 1 },
  ShowBottom: { zh: '隱藏底座', t: 'off' },
  Lifetime: { zh: '已經活多久', t: 'int', hint: `${TICKS}；2400 刻會消失` },
  life_ticks: { zh: '還能活多久', t: 'int', hint: TICKS },
  Invul: { zh: '出場無敵時間', t: 'int', hint: `${TICKS}；時間到會爆炸` },
  DragonPhase: { zh: '終界龍行為', t: 'sel', opts: [['0', '繞圈飛'], ['1', '射火球'], ['3', '準備降落'], ['5', '降落後噴火'], ['8', '衝向玩家'], ['10', '停在空中不動']] },
  Size: { zh: '大小', t: 'int', off: -1, min: 1, max: 127, hint: '1 小、2 中、4 大，還可以更大' },
  size: { zh: '大小', t: 'int', min: 0, max: 64 },
  type: { zh: '大小', t: 'sel', opts: [['small', '小'], ['medium', '中'], ['large', '大']] },
  Sheared: { zh: '毛已經剪掉', t: 'bool' },
  sheared: { zh: '蘑菇已經剪掉', t: 'bool' },
  Color: { zh: '顏色', t: 'sel', f: 'b', opts: COLOR_OPTS },
  CollarColor: { zh: '項圈顏色', t: 'sel', f: 'b', opts: COLOR_OPTS, hint: '有主人才看得到項圈' },
  Peek: { zh: '殼打開多少', t: 'int', min: 0, max: 100, f: 'b' },
  AttachFace: { zh: '黏在哪一面', t: 'sel', f: 'b', opts: [['0', '下面'], ['1', '上面'], ['2', '北邊'], ['3', '南邊'], ['4', '西邊'], ['5', '東邊']] },
  Pumpkin: { zh: '沒有南瓜頭', t: 'off' },
  PlayerCreated: { zh: '是玩家做的（不會打玩家）', t: 'bool' },
  weather_state: { zh: '生鏽程度', t: 'sel', opts: [['unaffected', '沒生鏽'], ['exposed', '有點生鏽'], ['weathered', '很鏽'], ['oxidized', '完全氧化']] },
  next_weather_age: { zh: '不會再生鏽', t: 'bool', on: '-2L' },
  Johnny: { zh: '強尼模式（看到誰都打）', t: 'bool' },
  SpellTicks: { zh: '施法時間', t: 'int', hint: TICKS },
  HasNectar: { zh: '身上有花粉', t: 'bool' },
  HasStung: { zh: '已經螫過人', t: 'bool' },
  CannotEnterHiveTicks: { zh: '多久不能回蜂巢', t: 'int', hint: TICKS },
  variant: { zh: '品種', t: 'variant' },
  'axolotl.Variant': { zh: '顏色', t: 'sel', opts: [['0', '粉紅'], ['1', '棕色'], ['2', '金色'], ['3', '青色'], ['4', '藍色（稀有）']] },
  'parrot.Variant': { zh: '顏色', t: 'sel', opts: [['0', '紅色'], ['1', '藍色'], ['2', '綠色'], ['3', '青色'], ['4', '灰色']] },
  'llama.Variant': { zh: '顏色', t: 'sel', opts: [['0', '奶油色'], ['1', '白色'], ['2', '棕色'], ['3', '灰色']] },
  'trader_llama.Variant': { zh: '顏色', t: 'sel', opts: [['0', '奶油色'], ['1', '白色'], ['2', '棕色'], ['3', '灰色']] },
  'horse.Variant': { zh: '毛色和花紋', t: 'sel', opts: HORSE_MARKS.flatMap((m, j) => HORSE_COLORS.map((c, i) => [String(i + j * 256), `${c}，${m}`])) },
  fishShape: { zh: '花紋', t: 'sel', opts: MC_FISH_TYPES },
  fishBase: { zh: '身體顏色', t: 'sel', opts: COLOR_OPTS },
  fishPattern: { zh: '花紋顏色', t: 'sel', opts: COLOR_OPTS },
  'fox.Type': { zh: '種類', t: 'sel', opts: [['red', '紅狐狸'], ['snow', '雪狐']] },
  'mooshroom.Type': { zh: '種類', t: 'sel', opts: [['red', '紅色'], ['brown', '棕色']] },
  RabbitType: { zh: '種類', t: 'sel', opts: [['0', '棕色'], ['1', '白色'], ['2', '黑色'], ['3', '黑白'], ['4', '金色'], ['5', '椒鹽色'], ['99', '殺手兔！']] },
  MainGene: { zh: '主要基因', t: 'sel', opts: GENES, hint: '棕色和虛弱要兩個基因一樣才會出現' },
  HiddenGene: { zh: '隱藏基因', t: 'sel', opts: GENES },
  HasLeftHorn: { zh: '沒有左角', t: 'off' },
  HasRightHorn: { zh: '沒有右角', t: 'off' },
  IsScreamingGoat: { zh: '尖叫山羊', t: 'bool' },
  'fox.Sitting': { zh: '坐下', t: 'bool' },
  Sleeping: { zh: '正在睡覺', t: 'bool' },
  Crouching: { zh: '蹲著', t: 'bool' },
  Trusting: { zh: '信任玩家', t: 'bool' },
  has_egg: { zh: '肚子裡有蛋', t: 'bool' },
  GotFish: { zh: '已經吃過魚', t: 'bool' },
  PuffState: { zh: '膨脹程度', t: 'sel', opts: [['0', '沒膨脹'], ['1', '有點膨脹'], ['2', '全膨脹']] },
  state: { zh: '狀態', t: 'sel', opts: [['idle', '走動'], ['rolling', '正在捲起來'], ['scared', '縮成一團']] },
  scute_time: { zh: '多久掉下鱗甲', t: 'int', hint: TICKS },
  EggLayTime: { zh: '多久下一顆蛋', t: 'int', hint: TICKS },
  IsChickenJockey: { zh: '是雞騎士的雞', t: 'bool' },
  SkeletonTrap: { zh: '骷髏馬陷阱', t: 'bool' },
  ChestedHorse: { zh: '背著儲物箱', t: 'bool' },
  Strength: { zh: '儲物箱大小', t: 'int', min: 1, max: 5, hint: '1 到 5，要背著儲物箱才有用' },
  Temper: { zh: '馴服容易度', t: 'int', min: 0, max: 100, hint: '0 到 100，越高越好馴服' },
  EatingHaystack: { zh: '正在吃草', t: 'bool' },
  DespawnDelay: { zh: '多久之後離開', t: 'int', hint: TICKS },
  IsImmuneToZombification: { zh: '不會變殭屍', t: 'bool' },
  CannotHunt: { zh: '不會打獵', t: 'bool' },
  CannotBeHunted: { zh: '不會被豬布林獵殺', t: 'bool' },
  TimeInOverworld: { zh: '已經在主世界多久', t: 'int', hint: `${TICKS}；300 刻會變殭屍` },
  profession: { zh: '職業', t: 'sel', opts: MC_PROFESSIONS },
  vtype: { zh: '服裝', t: 'sel', opts: [['plains', '平原'], ['desert', '沙漠'], ['jungle', '叢林'], ['savanna', '莽原'], ['snow', '雪原'], ['swamp', '沼澤'], ['taiga', '針葉林']] },
  vlevel: { zh: '等級', t: 'sel', opts: [['1', '新手'], ['2', '學徒'], ['3', '老手'], ['4', '專家'], ['5', '大師']] },
  Small: { zh: '縮小版', t: 'bool' },
  ShowArms: { zh: '有手臂', t: 'bool' },
  NoBasePlate: { zh: '沒有底座', t: 'bool' },
  Invisible: { zh: '隱形', t: 'bool' },
  pose: { zh: '姿勢', t: 'sel', opts: [['standing', '站著'], ['crouching', '蹲下'], ['swimming', '游泳'], ['fall_flying', '飛行'], ['sleeping', '睡覺']] },
  immovable: { zh: '不會被推動', t: 'bool' },
  // 群組標籤
  Age: { zh: '年齡', t: 'sel', g: '可以長大的生物', opts: [['-24000', '小寶寶'], ['0', '大人']] },
  AgeLocked: { zh: '永遠不會長大', t: 'bool', g: '可以長大的生物', hint: '年齡選「小寶寶」，就永遠是小寶寶' },
  InLove: { zh: '愛心模式', t: 'int', g: '可以繁殖的動物', hint: `${TICKS}；填 600 就是剛餵完食物` },
  Tame: { zh: '已經馴服', t: 'bool', g: '可以馴服的動物' },
  Sitting: { zh: '坐下', t: 'bool', g: '可以馴服的動物', hint: '有主人才有用' },
  Owner: { zh: '主人的名字', t: 'owner', g: '可以馴服的動物', hint: '打玩家名稱（英文和數字），或是貼上 UUID' },
  CanJoinRaid: { zh: '會加入突襲', t: 'bool', g: '突襲的怪物' },
  PatrolLeader: { zh: '是隊長（有旗幟）', t: 'bool', g: '突襲的怪物' },
  Patrolling: { zh: '正在巡邏', t: 'bool', g: '突襲的怪物' },
  FromBucket: { zh: '從桶子倒出來的（不會消失）', t: 'bool', g: '可以裝進桶子的生物' },
  from_bucket: { zh: '從桶子倒出來的（不會消失）', t: 'bool', g: '可以裝進桶子的生物' },
};
// 這些生物的同名欄位意思不同，或是本來就一定是這樣
const SKIP = { item: ['Age'], experience_orb: ['Age'], tadpole: ['Age'], wandering_trader: ['Age', 'AgeLocked'], camel: ['Tame'], camel_husk: ['Tame'] };
// 有些欄位要拆成好幾個選單
const SPLIT = { VillagerData: ['profession', 'vtype', 'vlevel'], 'tropical_fish.Variant': ['fishShape', 'fishBase', 'fishPattern'] };

const PROPS = [
  ['CanPickUpLoot', '會撿地上的東西', 2], ['NoAI', '沒有 AI（不會動）', 2],
  ['FallFlying', '滑翔飛行', 1], ['NoGravity', '沒有重力（飄在空中）', 0],
  ['Glowing', '發光', 0], ['OnGround', '在地面上', 0],
  ['HasVisualFire', '看起來著火', 0], ['PersistenceRequired', '不會自然消失', 2],
  ['Invulnerable', '無敵', 0], ['Silent', '不會發出聲音', 0],
  ['LeftHanded', '左撇子', 2],
];
const SLOTS = [['mainhand', '主手'], ['offhand', '副手'], ['head', '頭'], ['chest', '胸'], ['legs', '腿'], ['feet', '腳'], ['body', '身體'], ['saddle', '鞍']];
const NAME_COLORS = [['white', '白', '#ffffff'], ['yellow', '黃', '#ffff55'], ['gold', '金', '#ffaa00'], ['red', '紅', '#ff5555'], ['dark_red', '深紅', '#aa0000'], ['light_purple', '粉紫', '#ff55ff'], ['dark_purple', '深紫', '#aa00aa'], ['blue', '藍', '#5555ff'], ['dark_blue', '深藍', '#0000aa'], ['aqua', '水藍', '#55ffff'], ['dark_aqua', '藍綠', '#00aaaa'], ['green', '綠', '#55ff55'], ['dark_green', '深綠', '#00aa00'], ['gray', '灰', '#aaaaaa'], ['dark_gray', '深灰', '#555555'], ['black', '黑', '#000000']];
const NAME_STYLES = [['bold', 'B', '粗體'], ['italic', 'I', '斜體'], ['underlined', 'U', '底線'], ['strikethrough', 'S', '刪除線'], ['obfuscated', '?', '亂碼']];

const ENT = Object.fromEntries(MC_ENTITIES.map((e) => [e[0], { id: e[0], zh: e[1], group: e[2], kind: e[3], keys: e[4], attrs: e[5] }]));
const ATTR = Object.fromEntries(MC_ATTRS.map((a) => [a[0], { id: a[0], zh: a[1], def: a[2], min: a[3], max: a[4] }]));
const ITEM = Object.fromEntries(MC_ITEMS.map((e) => [e[0], e]));
const BLOCK = Object.fromEntries(MC_BLOCKS.map((e) => [e[0], e]));

// ===== 目前的選擇 =====
const newLayer = (entity = 'zombie') => ({ entity, tab: 'summon', f: {}, p: {}, name: [{ text: '' }], effects: [], items: {}, attrs: [] });
const newState = () => ({ pos: ['', '', ''], layers: [newLayer()] });
let state = newState();

const FIELD_ORDER = Object.values(FIELDS);
function fieldList(ent) {
  const keys = ent.keys.flatMap((k) => SPLIT[`${ent.id}.${k}`] || SPLIT[k] || [k]);
  return keys
    .filter((k) => !(SKIP[ent.id] || []).includes(k))
    .map((k) => [k, FIELDS[`${ent.id}.${k}`] || FIELDS[k]])
    .filter(([, d]) => d && (d.t !== 'variant' || variantOpts(ent.id).length))
    .sort((a, b) => FIELD_ORDER.indexOf(a[1]) - FIELD_ORDER.indexOf(b[1]));
}

// ===== 組指令 =====
const quote = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
const word = (s) => (/^[A-Za-z_][A-Za-z0-9_]*$/.test(s) && !/^(true|false)$/i.test(s) ? s : quote(s));
const isNum = (v) => v !== undefined && v !== null && String(v).trim() !== '' && Number.isFinite(Number(v));
const num = (v) => String(Number(v));
const clamp = (n, lo = -Infinity, hi = Infinity) => Math.min(hi, Math.max(lo, n));
const compound = (pairs) => `{${pairs.map(([k, v]) => `${k}:${v}`).join(',')}}`;

function fieldValue(def, v) {
  if (v === undefined || v === '' || v === false) return null;
  switch (def.t) {
    case 'bool': return def.on || '1b';
    case 'off': return '0b';
    case 'int': return isNum(v) ? num(clamp(Math.round(Number(v)), def.min, def.max) + (def.off || 0)) + (def.f || '') : null;
    case 'num': return isNum(v) ? num(clamp(Number(v), def.min, def.max)) + (def.f || '') : null;
    case 'sel': return isNum(v) ? v + (def.f || '') : word(v);
    case 'variant': case 'block': return word(v);
    case 'item': return `{id:${word(v)},count:1}`;
    case 'owner': return owner(v);
    default: return quote(v);
  }
}

function owner(v) {
  const s = v.trim();
  if (!s) return null;
  if (/^\[I;\s*-?\d+(\s*,\s*-?\d+){3}\s*\]$/.test(s)) return s.replace(/\s+/g, '');
  const hex = s.replace(/-/g, '');
  if (/^[0-9a-f]{32}$/i.test(hex)) return `[I;${hex.match(/.{8}/g).map((h) => parseInt(h, 16) | 0).join(',')}]`;
  return quote(s);
}

function nameComponent(segs, font) {
  const used = segs.filter((s) => s.text !== '');
  if (!used.length) return null;
  const one = (s) => {
    const p = [['text', quote(s.text)]];
    if (s.color) p.push(['color', quote(s.color)]);
    for (const [k] of NAME_STYLES) if (s[k]) p.push([k, '1b']);
    if (font) p.push(['font', word(font)]);
    return p.length === 1 ? p[0][1] : compound(p);
  };
  if (used.length === 1) return one(used[0]);
  // 第一段的樣式會傳給後面的段落，所以前面放一個空字串
  return `["",${used.map(one).join(',')}]`;
}

// 切開最外層的逗號（會略過引號和括號裡面的）
function splitTop(s) {
  const out = [];
  let depth = 0;
  let q = null;
  let cur = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (q) {
      cur += ch;
      if (ch === '\\') cur += s[++i] ?? '';
      else if (ch === q) q = null;
      continue;
    }
    if (ch === '"' || ch === "'") q = ch;
    if ('[{('.includes(ch)) depth++;
    if (']})'.includes(ch)) depth--;
    if (ch === ',' && depth === 0) { out.push(cur); cur = ''; } else cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

// 貼上的 /give 指令或 [components] → 元件清單
function parseComponents(raw) {
  let s = (raw || '').trim();
  if (!s) return [];
  const give = s.match(/^\/?give\s+(@[a-z](?:\[[^\]]*\])?|\S+)\s+/); // 略過 @p[...] 這種目標
  if (give) s = s.slice(give[0].length);
  const start = s.indexOf('[');
  if (give || /^(\w+:)?\w*\[/.test(s)) {
    if (start < 0) return [];
    s = s.slice(start + 1, s.lastIndexOf(']') > start ? s.lastIndexOf(']') : undefined);
  }
  return splitTop(s).map((part) => {
    const eq = part.indexOf('=');
    if (eq < 0) {
      const t = part.trim();
      return t.startsWith('!') ? [quote(t), '{}'] : null;
    }
    const k = part.slice(0, eq).trim();
    return [/^[a-z_]+$/.test(k) ? k : quote(k), part.slice(eq + 1).trim()];
  }).filter(Boolean);
}

function itemStack(it) {
  const comps = parseComponents(it.raw);
  const ench = (it.ench || []).filter((e) => e.id);
  if (ench.length) {
    const i = comps.findIndex(([k]) => /enchantments"?$/.test(k) && !k.includes('stored'));
    if (i >= 0) comps.splice(i, 1);
    const uniq = Object.fromEntries(ench.map((e) => [e.id, clamp(Math.round(Number(e.lvl) || 1), 1, 255)]));
    comps.push(['enchantments', compound(Object.entries(uniq))]);
  }
  const p = [['id', word(it.id)]];
  if (isNum(it.count) && Number(it.count) > 1) p.push(['count', clamp(Math.round(Number(it.count)), 1, 99)]);
  if (comps.length) p.push(['components', compound(comps)]);
  return compound(p);
}

function layerNbt(l) {
  const ent = ENT[l.entity];
  const out = [];
  const p = l.p;

  // 專屬欄位與群組標籤
  const villager = [];
  for (const [k, def] of fieldList(ent)) {
    const v = fieldValue(def, l.f[k]);
    if (v === null || k.startsWith('fish')) continue;
    if (k === 'profession' || k === 'vtype' || k === 'vlevel') villager.push([{ vtype: 'type', vlevel: 'level' }[k] || k, v]);
    else out.push([k, v]);
  }
  if (villager.length) {
    out.push(['VillagerData', compound(villager)]);
    if (villager.some(([k]) => k === 'profession')) out.push(['Xp', '1']); // 沒有經驗的村民會忘記職業
  }

  if (ent.id === 'tropical_fish' && ['fishShape', 'fishBase', 'fishPattern'].some((k) => l.f[k])) {
    out.push(['Variant', String((Number(l.f.fishShape || 0) + Number(l.f.fishBase || 0) * 65536 + Number(l.f.fishPattern || 0) * 16777216) | 0)]);
  }

  // 屬性與血量
  const attrs = ent.kind ? l.attrs.filter((a) => ent.attrs[a.id] !== undefined && isNum(a.base)) : [];
  const uniq = {};
  for (const a of attrs) uniq[a.id] = clamp(Number(a.base), ATTR[a.id].min, ATTR[a.id].max);
  let health = isNum(p.Health) ? Math.max(0, Number(p.Health)) : null;
  if (ent.kind) {
    if (health !== null && uniq.max_health === undefined && health > ent.attrs.max_health) uniq.max_health = clamp(health, 1, 1024);
    if (health === null && uniq.max_health !== undefined) health = uniq.max_health;
    if (health !== null && uniq.max_health !== undefined) health = Math.min(health, uniq.max_health);
  }

  // 特性
  const nm = nameComponent(l.name, p.font);
  if (nm) out.push(['CustomName', nm]);
  if (p.CustomNameVisible) out.push(['CustomNameVisible', '1b']);
  if (ent.kind && health !== null) out.push(['Health', num(health)]);
  for (const [k, , kind] of PROPS) if (p[k] && ent.kind >= kind) out.push([k, '1b']);
  if (isNum(p.yaw) || isNum(p.pitch)) out.push(['Rotation', `[${num(p.yaw || 0)}f,${num(p.pitch || 0)}f]`]);
  if (['mx', 'my', 'mz'].some((k) => isNum(p[k]))) out.push(['Motion', `[${['mx', 'my', 'mz'].map((k) => `${num(clamp(Number(p[k]) || 0, -10, 10))}d`).join(',')}]`]);
  if (ent.kind === 2) {
    if (['hx', 'hy', 'hz'].every((k) => isNum(p[k]))) {
      out.push(['home_pos', `[I;${['hx', 'hy', 'hz'].map((k) => Math.round(Number(p[k]))).join(',')}]`]);
      if (isNum(p.home_radius)) out.push(['home_radius', String(Math.max(0, Math.round(Number(p.home_radius))))]);
    }
  }
  const tags = (p.Tags || '').split(/[,，\s]+/).filter(Boolean);
  if (tags.length) out.push(['Tags', `[${tags.map(quote).join(',')}]`]);
  if (p.Team && ent.kind) out.push(['Team', quote(p.Team.trim())]);
  if (isNum(p.Fire)) out.push(['Fire', String(clamp(Math.round(Number(p.Fire)), -1, 32767))]);
  if (isNum(p.TicksFrozen)) out.push(['TicksFrozen', String(Math.max(0, Math.round(Number(p.TicksFrozen))))]);
  if (isNum(p.invulnerable_time)) out.push(['invulnerable_time', String(Math.max(0, Math.round(Number(p.invulnerable_time))))]);

  // 效果
  if (ent.kind) {
    const eff = l.effects.map((e) => {
      const q = [['id', e.id], ['duration', e.forever ? '-1' : String(isNum(e.dur) ? Math.max(1, Math.round(Number(e.dur))) : 600)]];
      const amp = clamp(Math.round(Number(e.lvl) || 1), 1, 256) - 1;
      if (amp) q.push(['amplifier', amp]);
      if (e.ambient) q.push(['ambient', '1b']);
      if (e.particles === false) q.push(['show_particles', '0b']);
      if (e.icon === false) q.push(['show_icon', '0b']);
      return compound(q);
    });
    if (eff.length) out.push(['active_effects', `[${eff.join(',')}]`]);

    const items = SLOTS.filter(([s]) => l.items[s]?.id);
    if (items.length) out.push(['equipment', compound(items.map(([s]) => [s, itemStack(l.items[s])]))]);
    const drops = SLOTS.filter(([s]) => l.items[s]?.id && isNum(l.items[s].drop));
    if (drops.length && ent.kind === 2) out.push(['drop_chances', compound(drops.map(([s]) => [s, num(clamp(Number(l.items[s].drop), 0, 200) / 100)]))]);

    const at = Object.entries(uniq).map(([id, base]) => compound([['id', id], ['base', num(base)]]));
    if (at.length) out.push(['attributes', `[${at.join(',')}]`]);
  }
  return out;
}

const coord = (v) => (v || '').trim() || '~';
const coordOk = (v) => /^([~^]?-?\d+(\.\d+)?|[~^])$/.test(coord(v));

function build() {
  let inner = null;
  // 第一層騎在第二層上面，第二層騎在第三層上面……
  for (const l of state.layers) {
    const nbt = layerNbt(l);
    if (inner) nbt.push(['Passengers', `[${inner}]`]);
    inner = compound([['id', l.entity], ...nbt]);
    l._nbt = nbt;
  }
  const base = state.layers[state.layers.length - 1];
  const pos = state.pos.map(coord).join(' ');
  return `/summon ${base.entity} ${pos}${base._nbt.length ? ` ${compound(base._nbt)}` : ''}`;
}

function problems() {
  const out = [];
  if (!state.pos.every(coordOk)) out.push('召喚位置只能填數字，或是 <code>~</code>、<code>~5</code> 這種寫法。');
  const caret = state.pos.filter((v) => coord(v).startsWith('^')).length;
  if (caret && caret < 3) out.push('用 <code>^</code> 的話，x、y、z 三個都要用 <code>^</code>。');
  state.layers.forEach((l, i) => {
    const ent = ENT[l.entity];
    const who = `${i ? '坐騎' : '生物'}「${ent.zh}」`;
    if (l.entity === 'item' && !l.f.Item) out.push(`${who}要選是哪一個物品，不然不會出現。`);
    const h = ['hx', 'hy', 'hz'].filter((k) => isNum(l.p[k])).length;
    if (h && h < 3) out.push(`${who}的家的位置，x、y、z 三個都要填。`);
  });
  return out;
}

// ===== 畫面小工具 =====
function el(tag, props = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') node.className = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (k in node) node[k] = v;
    else node.setAttribute(k, v);
  }
  node.append(...kids.filter((k) => k !== null && k !== undefined));
  return node;
}

const row = (label, ...field) => el('div', { class: 'gen-row' }, el('span', { class: 'gen-label' }, label), el('div', { class: 'gen-field' }, ...field));
const hint = (text) => (text ? el('p', { class: 'hint' }, text) : null);

function textInput(obj, key, { type = 'text', label = '', placeholder = '', cls = '', min, max, step } = {}) {
  const i = el('input', { type, value: obj[key] ?? '', placeholder, class: cls, 'aria-label': label || placeholder });
  if (min !== undefined) i.min = min;
  if (max !== undefined) i.max = max;
  if (type === 'number') i.step = step || 'any';
  i.addEventListener('input', () => { obj[key] = i.value; update(); });
  return i;
}

const numInput = (obj, key, o = {}) => textInput(obj, key, { type: 'number', cls: 'n', ...o });

function checkbox(obj, key, label, { def = false, title = '' } = {}) {
  const c = el('input', { type: 'checkbox', checked: obj[key] ?? def });
  c.addEventListener('change', () => { obj[key] = c.checked; update(); });
  return el('label', { class: 'chk', title }, c, ` ${label}`);
}

// opts: [值, 文字]；可用 groups: {分類: [...]}
function select(value, opts, onchange, { empty, label = '', groups } = {}) {
  const s = el('select', { 'aria-label': label });
  if (empty !== undefined) s.append(el('option', { value: '' }, empty));
  const add = (box, list) => list.forEach(([v, t]) => box.append(el('option', { value: v }, t)));
  if (groups) for (const [g, list] of Object.entries(groups)) { const og = el('optgroup', { label: g }); add(og, list); s.append(og); }
  else add(s, opts);
  s.value = value ?? '';
  s.addEventListener('change', () => onchange(s.value));
  return s;
}

const xyz = (obj, keys) => el('div', { class: 'xyz' }, ...keys.map((k, i) => el('label', {}, el('span', {}, 'xyz'[i]), numInput(obj, k, { label: 'xyz'[i] }))));

function trash(label, fn) {
  return el('button', { type: 'button', class: 'btn-trash', title: label, 'aria-label': label, onclick: fn }, '🗑️');
}

// 可以清空的圖示選擇器
function pickField(kind, get, set) {
  const table = kind === 'blocks' ? BLOCK : ITEM;
  const wrap = el('span', { class: 'pick-wrap' });
  const draw = () => {
    const cur = table[get()];
    const btn = makePicker(kind);
    if (cur) setPicked(btn, cur);
    else {
      btn.dataset.value = '';
      btn.title = '';
      btn.querySelector('.mc-icon').classList.add('none');
      btn.querySelector('.pick-name').textContent = '沒有（按這裡選）';
    }
    btn.addEventListener('pick', (e) => { set(e.detail[0]); draw(); update(); wrap.querySelector('.mc-picker').focus(); });
    wrap.replaceChildren(btn);
    if (cur) wrap.append(el('button', { type: 'button', class: 'btn-x', title: '清掉', 'aria-label': '清掉', onclick: () => { set(''); draw(); update(); } }, '✕'));
  };
  draw();
  return wrap;
}

// ===== 分頁內容 =====
function fieldRow(l, k, def) {
  const f = l.f;
  const set = (v) => { f[k] = v; update(); };
  const h = hint(def.hint);
  switch (def.t) {
    case 'bool': case 'off': return row('', checkbox(f, k, def.zh), h);
    case 'int': case 'num': return row(def.zh, numInput(f, k, { label: def.zh, min: def.min, max: def.max }), h);
    case 'sel': return row(def.zh, select(f[k], def.opts, set, { empty: '（不設定）', label: def.zh }), h);
    case 'variant': return row(def.zh, select(f[k], variantOpts(l.entity), set, { empty: '（不設定）', label: def.zh }), h);
    case 'block': return row(def.zh, pickField('blocks', () => f[k], (v) => { f[k] = v; }), h);
    case 'item': return row(def.zh, pickField('items', () => f[k], (v) => { f[k] = v; }), h);
    default: return row(def.zh, textInput(f, k, { label: def.zh }), h);
  }
}

const ENT_GROUPS = {};
for (const e of MC_ENTITIES) (ENT_GROUPS[e[2]] ||= []).push([e[0], `${e[1]} ${e[0]}`]);

function tabSummon(l) {
  const ent = ENT[l.entity];
  const own = fieldList(ent).filter(([, d]) => !d.g);
  const box = el('div', {}, row('生物', select(l.entity, null, (v) => { l.entity = v; l.f = {}; render(); }, { groups: ENT_GROUPS, label: '生物' })));
  if (own.length) own.forEach(([k, d]) => box.append(fieldRow(l, k, d)));
  else box.append(el('p', { class: 'hint center' }, '這個生物沒有專屬的選項，看看其他分頁吧！'));
  if (ent.keys.includes('CanBreakDoors')) box.append(row('', hint('「殭屍增援隊」在「屬性」分頁裡面。')));
  if (['skeleton', 'stray', 'bogged', 'parched', 'wither_skeleton', 'pillager', 'illusioner', 'vindicator', 'piglin', 'piglin_brute', 'zombified_piglin', 'drowned'].includes(l.entity)) {
    box.append(el('p', { class: 'tip' }, '💡 只要加了任何選項，這個生物就不會自己拿武器。想要它有武器，請到「裝備」分頁的主手選一個。'));
  }
  return box;
}

function nameEditor(l) {
  const box = el('div', { class: 'name-editor' });
  const preview = el('div', { class: 'name-preview' });
  const paint = () => {
    preview.replaceChildren(...l.name.filter((s) => s.text).map((s) => {
      const c = NAME_COLORS.find((x) => x[0] === s.color);
      const sp = el('span', {}, s.obfuscated ? s.text.replace(/\S/g, '▓') : s.text);
      sp.style.color = c ? c[2] : s.color || '#fff';
      sp.style.fontWeight = s.bold ? 'bold' : 'normal';
      sp.style.fontStyle = s.italic ? 'italic' : 'normal';
      sp.style.textDecoration = [s.underlined && 'underline', s.strikethrough && 'line-through'].filter(Boolean).join(' ') || 'none';
      return sp;
    }));
    if (!preview.childNodes.length) preview.append(el('span', { class: 'ph' }, '名字會長這樣'));
  };
  const list = el('div');
  const draw = () => {
    list.replaceChildren(...l.name.map((s, i) => {
      const t = el('input', { type: 'text', value: s.text, placeholder: i ? '再一段文字' : '打上名字', 'aria-label': `名字第 ${i + 1} 段` });
      t.addEventListener('input', () => { s.text = t.value; paint(); update(); });
      const custom = s.color?.startsWith('#');
      const color = select(custom ? '#' : s.color, [...NAME_COLORS.map(([v, n]) => [v, n]), ['#', '自己選…']], (v) => {
        s.color = v === '#' ? '#ff88cc' : v;
        draw(); paint(); update();
      }, { empty: '顏色', label: '顏色' });
      const pickColor = custom ? el('input', { type: 'color', value: s.color, 'aria-label': '自己選顏色' }) : null;
      pickColor?.addEventListener('input', () => { s.color = pickColor.value; paint(); update(); });
      const styles = NAME_STYLES.map(([k, ch, zh]) => {
        const b = el('button', { type: 'button', class: `btn-style s-${k}`, title: zh, 'aria-label': zh, 'aria-pressed': String(!!s[k]) }, ch);
        b.addEventListener('click', () => { s[k] = !s[k]; b.setAttribute('aria-pressed', String(s[k])); paint(); update(); });
        return b;
      });
      return el('div', { class: 'name-seg' }, t, color, pickColor, el('span', { class: 'styles' }, ...styles),
        l.name.length > 1 ? trash('刪掉這段', () => { l.name.splice(i, 1); draw(); paint(); update(); }) : null);
    }));
  };
  draw();
  paint();
  box.append(list, el('button', { type: 'button', class: 'btn-plain', onclick: () => { l.name.push({ text: '' }); draw(); } }, '＋ 加一段不同顏色的文字'), preview);
  return box;
}

function tabProps(l) {
  const ent = ENT[l.entity];
  const p = l.p;
  const ticks = (k, zh, h) => row(zh, numInput(p, k, { label: zh, min: 0 }), hint(h));
  return el('div', {},
    row('自訂名稱', nameEditor(l)),
    row('字型', select(p.font, [['uniform', '細字'], ['alt', '附魔台文字'], ['illageralt', '災厄村民文字']], (v) => { p.font = v; update(); }, { empty: '一般', label: '字型' })),
    row('', checkbox(p, 'CustomNameVisible', '一直顯示名字')),
    ent.kind ? row('血量', numInput(p, 'Health', { label: '血量', min: 0 }), hint(`2 = 一顆心；${ent.zh}原本最多 ${ent.attrs.max_health}，填更大會自動提高上限（最多 1024）`)) : null,
    el('hr'),
    row('特性', el('div', { class: 'grid2' }, ...PROPS.filter((x) => ent.kind >= x[2]).map(([k, zh]) => checkbox(p, k, zh)))),
    el('hr'),
    row('面向（左右）', numInput(p, 'yaw', { label: '面向', min: -180, max: 180 }), hint('0 南、90 西、180 北、-90 東')),
    row('抬頭低頭', numInput(p, 'pitch', { label: '抬頭低頭', min: -90, max: 90 }), hint('-90 看天空，90 看地板')),
    row('飛出去的速度', xyz(p, ['mx', 'my', 'mz']), hint('y 填 1 會往上彈；最多 10')),
    ent.kind === 2 ? row('家的位置', xyz(p, ['hx', 'hy', 'hz']), hint('生物會待在這附近，三個都要填')) : null,
    ent.kind === 2 ? row('離家多遠', numInput(p, 'home_radius', { label: '離家多遠', min: 0 }), hint('幾格；家的位置有填才有用')) : null,
    row('標籤', textInput(p, 'Tags', { label: '標籤' }), hint('自己取的記號，用逗號隔開。之後可以用 @e[tag=標籤] 找到牠')),
    ent.kind ? row('隊伍', textInput(p, 'Team', { label: '隊伍' }), hint('要先用 /team add 建立這個隊伍')) : null,
    el('hr'),
    ticks('Fire', '著火時間', TICKS),
    ticks('TicksFrozen', '冰凍時間', TICKS),
    ticks('invulnerable_time', '無敵時間', `${TICKS}；時間內不會受傷`));
}

const EFF_GROUPS = {};
for (const [id, zh, g] of MC_EFFECTS) (EFF_GROUPS[g] ||= []).push([id, `${zh} ${id}`]);

function tabEffects(l) {
  const box = el('div', {}, el('p', { class: 'hint' }, '跟藥水一樣的效果。有些效果對怪物沒有用，例如劇毒對殭屍沒用，立即治療反而會讓牠受傷。'));
  l.effects.forEach((e, i) => {
    const dur = numInput(e, 'dur', { label: '時間', placeholder: '600', min: 1 });
    dur.disabled = !!e.forever;
    const forever = checkbox(e, 'forever', '永遠');
    forever.firstChild.addEventListener('change', () => { dur.disabled = e.forever; });
    box.append(el('div', { class: 'gen-item' },
      el('label', {}, el('b', {}, '效果'), select(e.id, null, (v) => { e.id = v; update(); }, { groups: EFF_GROUPS, label: '效果' })),
      el('label', {}, el('b', {}, '時間（刻）'), dur),
      forever,
      el('label', {}, el('b', {}, '等級'), numInput(e, 'lvl', { label: '等級', placeholder: '1', min: 1, max: 256 })),
      el('span', { class: 'chks' },
        checkbox(e, 'ambient', '淡淡的粒子'),
        checkbox(e, 'particles', '顯示粒子', { def: true }),
        checkbox(e, 'icon', '顯示圖示', { def: true })),
      trash('刪掉這個效果', () => { l.effects.splice(i, 1); render(); })));
  });
  box.append(el('p', { class: 'gen-add' }, el('button', { type: 'button', class: 'btn-add', onclick: () => { l.effects.push({ id: 'speed' }); render(); } }, '＋ 新增效果')), el('p', { class: 'hint center' }, TICKS));
  return box;
}

function tabGroups(l) {
  const ent = ENT[l.entity];
  const groups = {};
  for (const [k, d] of fieldList(ent)) if (d.g) (groups[d.g] ||= []).push([k, d]);
  const box = el('div');
  for (const [g, list] of Object.entries(groups)) box.append(el('h3', {}, g), ...list.map(([k, d]) => fieldRow(l, k, d)));
  if (!box.childNodes.length) box.append(el('p', { class: 'hint center' }, `${ent.zh}沒有群組標籤。換成狼、馬、豬這些動物試試看！`));
  return box;
}

const ENCH_OPTS = MC_ENCHANTS.map(([id, zh, max]) => [id, `${zh} ${id}（一般最高 ${max}）`]);

function tabItems(l) {
  const ent = ENT[l.entity];
  const box = el('div', {}, el('p', { class: 'hint' }, '選好物品之後，可以加附魔。也可以把 /give 指令貼到「進階」，會自動轉換。'));
  for (const [slot, zh] of SLOTS) {
    const it = (l.items[slot] ||= { id: '' });
    const wrap = el('div', { class: 'slot' });
    const draw = () => {
      const more = el('div', { class: 'slot-more' });
      if (it.id) {
        more.append(
          el('label', {}, '數量 ', numInput(it, 'count', { label: '數量', placeholder: '1', min: 1, max: 99 })),
          ent.kind === 2 ? el('label', {}, '掉落機率 ', numInput(it, 'drop', { label: '掉落機率', min: 0, max: 100 }), ' %') : '');
        const list = el('div', { class: 'ench' });
        (it.ench || []).forEach((e, i) => list.append(el('div', { class: 'ench-row' },
          select(e.id, ENCH_OPTS, (v) => { e.id = v; update(); }, { label: '附魔' }),
          el('label', {}, '等級 ', numInput(e, 'lvl', { label: '附魔等級', placeholder: '1', min: 1, max: 255 })),
          trash('刪掉這個附魔', () => { it.ench.splice(i, 1); draw(); update(); }))));
        list.append(el('button', { type: 'button', class: 'btn-plain', onclick: () => { (it.ench ||= []).push({ id: 'sharpness' }); draw(); update(); } }, '＋ 附魔'));
        const raw = textInput(it, 'raw', { label: '進階', placeholder: '貼上 /give 指令或 [unbreakable={}]' });
        more.append(list, el('details', { open: !!it.raw }, el('summary', {}, '進階'), raw));
      }
      wrap.replaceChildren(el('b', { class: 'slot-name' }, zh),
        el('div', { class: 'slot-body' }, pickField('items', () => it.id, (v) => { it.id = v; draw(); }), more));
    };
    draw();
    box.append(wrap);
  }
  return box;
}

function sliderRange(a, def) {
  const max = a.max > 200 ? ({ max_health: 1024, attack_damage: 100, follow_range: 200, movement_speed: 5, flying_speed: 5 }[a.id] || Math.max(20, def * 10)) : a.max;
  const min = Math.max(a.min, -20);
  const step = max - min <= 2 ? 0.01 : max - min <= 40 ? 0.1 : 1;
  return [Number((Math.ceil(min / step) * step).toFixed(2)), Math.min(max, a.max), step];
}

function tabAttrs(l) {
  const ent = ENT[l.entity];
  const opts = Object.keys(ent.attrs).map((id) => [id, `${ATTR[id].zh} ${id}`]).sort((a, b) => a[1].localeCompare(b[1], 'zh-Hant'));
  const box = el('div', {}, el('p', { class: 'hint' }, `改變${ent.zh}的能力，例如「大小」「最高生命值」「速度」。這裡只列出${ent.zh}能用的屬性。`));
  l.attrs.forEach((a, i) => {
    if (ent.attrs[a.id] === undefined) return;
    const info = ATTR[a.id];
    const def = ent.attrs[a.id];
    const [lo, hi, step] = sliderRange(info, def);
    const range = el('input', { type: 'range', min: lo, max: hi, step, 'aria-label': info.zh });
    range.value = a.base;
    const n = numInput(a, 'base', { label: info.zh, min: info.min, max: info.max });
    range.addEventListener('input', () => { a.base = n.value = range.value; update(); });
    n.addEventListener('input', () => { range.value = n.value; });
    box.append(el('div', { class: 'gen-item' },
      select(a.id, opts, (v) => { a.id = v; a.base = ent.attrs[v]; render(); }, { label: '屬性' }),
      range, n,
      trash('刪掉這個屬性', () => { l.attrs.splice(i, 1); render(); }),
      el('p', { class: 'hint' }, `原本是 ${def}，可以填 ${info.min} 到 ${info.max}`)));
  });
  box.append(el('p', { class: 'gen-add' }, el('button', { type: 'button', class: 'btn-add', onclick: () => {
    const used = l.attrs.map((a) => a.id);
    const id = ['scale', 'max_health', 'movement_speed', 'attack_damage', ...Object.keys(ent.attrs)].find((x) => ent.attrs[x] !== undefined && !used.includes(x));
    if (id) l.attrs.push({ id, base: ent.attrs[id] });
    render();
  } }, '＋ 新增屬性')));
  return box;
}

const TABS = [
  ['summon', '召喚', tabSummon, 0], ['props', '特性', tabProps, 0], ['effects', '狀態效果', tabEffects, 1],
  ['groups', '群組標籤', tabGroups, 0], ['items', '裝備', tabItems, 1], ['attrs', '屬性', tabAttrs, 1],
];

function layerCard(l, i) {
  const ent = ENT[l.entity];
  const tabs = TABS.filter((t) => ent.kind >= t[3]);
  if (!tabs.some((t) => t[0] === l.tab)) l.tab = 'summon';
  const bar = el('div', { class: 'tabs', role: 'tablist' }, ...tabs.map(([id, zh]) => el('button', {
    type: 'button', role: 'tab', class: 'tab', 'aria-selected': String(l.tab === id),
    onclick: () => { l.tab = id; render(); document.querySelectorAll('.layer')[i].querySelector('[aria-selected="true"]').focus({ preventScroll: true }); },
  }, zh)));
  return el('section', { class: 'card gen-card layer' },
    el('div', { class: 'gen-top' },
      el('h2', {}, i ? `🐴 坐騎 ${i}：${ent.zh}` : `🧟 ${ent.zh}`),
      state.layers.length > 1 ? trash('刪掉這一隻', () => { state.layers.splice(i, 1); render(); }) : null),
    i ? el('p', { class: 'hint' }, `上面那隻「${ENT[state.layers[i - 1].entity].zh}」會騎在牠身上。`) : null,
    bar,
    el('div', { class: 'tab-body', role: 'tabpanel' }, tabs.find((t) => t[0] === l.tab)[2](l)));
}

// ===== 更新 =====
const $ = (id) => document.getElementById(id);

function update() {
  const cmd = build();
  const errs = problems();
  $('output').value = cmd;
  const long = cmd.length > 256;
  $('length').textContent = `${cmd.length} 個字${long ? '（超過聊天框的 256 個字）' : '，可以直接貼到聊天框'}`;
  $('length').classList.toggle('long', long);
  $('too-long').hidden = !long;
  $('errors').hidden = !errs.length;
  $('errors').innerHTML = errs.map((e) => `⚠️ ${e}`).join('<br>');
}

function render() {
  Popup.close();
  $('pos').replaceChildren(...['x', 'y', 'z'].map((n, i) => el('label', {}, el('span', {}, n), textInput(state.pos, i, { label: n, placeholder: '~', cls: 'n' }))));
  $('layers').replaceChildren(...state.layers.map(layerCard));
  update();
}

// ===== 儲存（只存在這台電腦的瀏覽器） =====
const KEY = 'mc-summon-saved';
const loadSaved = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
function storeSaved(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch { return false; } }

function drawSaved() {
  const list = loadSaved();
  $('saved').replaceChildren(...(list.length ? [el('h3', {}, '已儲存（存在這台電腦的瀏覽器）'), ...list.map((s, i) => el('div', { class: 'saved-row' },
    el('span', {}, s.name),
    el('button', { type: 'button', class: 'btn-plain', onclick: () => {
      const st = structuredClone(s.state);
      st.layers = st.layers.filter((l) => ENT[l.entity]);
      if (!st.layers.length) return;
      state = st;
      render();
      window.scrollTo({ top: 0 });
    } }, '打開'),
    trash('刪掉這筆儲存', () => { if (confirm(`要刪掉「${s.name}」嗎？`)) { const a = loadSaved(); a.splice(i, 1); storeSaved(a); drawSaved(); } })))] : []));
}

function flashPlain(btn, text) {
  const old = btn.dataset.label ||= btn.textContent;
  btn.textContent = text;
  clearTimeout(btn._t);
  btn._t = setTimeout(() => { btn.textContent = old; }, 1600);
}

$('add-mount').addEventListener('click', () => {
  state.layers.push(newLayer('horse'));
  render();
  document.querySelector('.layer:last-child').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
$('copy').addEventListener('click', async () => {
  if (problems().length) return flash($('copy'), '⚠️ 先修正問題', 'warn');
  const ok = await copyText($('output').value);
  flash($('copy'), ok ? '✅ 已複製！' : '❌ 複製失敗', ok ? 'copied' : 'warn');
});
$('copy-cb').addEventListener('click', async () => flashPlain($('copy-cb'), (await copyText('/give @s command_block')) ? '✅ 已複製！' : '❌ 失敗'));
$('save').addEventListener('click', () => {
  const name = prompt('幫這個召喚取個名字：', ENT[state.layers[0].entity].zh);
  if (!name) return;
  const clean = JSON.parse(JSON.stringify(state, (k, v) => (k === '_nbt' ? undefined : v)));
  flashPlain($('save'), storeSaved([...loadSaved(), { name, state: clean }]) ? '✅ 已儲存' : '❌ 這台電腦不能儲存');
  drawSaved();
});
$('reset').addEventListener('click', () => {
  if (!confirm('要全部重來嗎？現在的選擇會消失。')) return;
  state = newState();
  render();
});

render();
drawSaved();
