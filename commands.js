// ===== Minecraft Java 版 ID 清單 =====
// 格式：[中文名稱, Minecraft ID]
const LISTS = {
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
  items: [
    ['鑽石', 'diamond'],
    ['鐵錠', 'iron_ingot'],
    ['金錠', 'gold_ingot'],
    ['綠寶石', 'emerald'],
    ['獄髓錠', 'netherite_ingot'],
    ['鑽石劍', 'diamond_sword'],
    ['獄髓劍', 'netherite_sword'],
    ['鑽石鎬', 'diamond_pickaxe'],
    ['獄髓鎬', 'netherite_pickaxe'],
    ['鑽石斧', 'diamond_axe'],
    ['鑽石鏟', 'diamond_shovel'],
    ['弓', 'bow'],
    ['箭', 'arrow'],
    ['弩', 'crossbow'],
    ['三叉戟', 'trident'],
    ['重錘', 'mace'],
    ['盾牌', 'shield'],
    ['鑽石頭盔', 'diamond_helmet'],
    ['鑽石胸甲', 'diamond_chestplate'],
    ['鑽石護腿', 'diamond_leggings'],
    ['鑽石靴子', 'diamond_boots'],
    ['鞘翅', 'elytra'],
    ['煙火', 'firework_rocket'],
    ['不死圖騰', 'totem_of_undying'],
    ['金蘋果', 'golden_apple'],
    ['附魔金蘋果', 'enchanted_golden_apple'],
    ['牛排', 'cooked_beef'],
    ['麵包', 'bread'],
    ['蛋糕', 'cake'],
    ['終界珍珠', 'ender_pearl'],
    ['終界之眼', 'ender_eye'],
    ['火把', 'torch'],
    ['打火石', 'flint_and_steel'],
    ['水桶', 'water_bucket'],
    ['岩漿桶', 'lava_bucket'],
    ['鞍', 'saddle'],
    ['拴繩', 'lead'],
    ['命名牌', 'name_tag'],
    ['指南針', 'compass'],
    ['時鐘', 'clock'],
    ['望遠鏡', 'spyglass'],
    ['經驗瓶', 'experience_bottle'],
    ['指令方塊', 'command_block'],
  ],
  blocks: [
    ['石頭', 'stone'],
    ['鵝卵石', 'cobblestone'],
    ['泥土', 'dirt'],
    ['草地', 'grass_block'],
    ['沙子', 'sand'],
    ['玻璃', 'glass'],
    ['橡木材', 'oak_planks'],
    ['橡木原木', 'oak_log'],
    ['櫻花木材', 'cherry_planks'],
    ['紅磚', 'bricks'],
    ['石磚', 'stone_bricks'],
    ['白色羊毛', 'white_wool'],
    ['紅色羊毛', 'red_wool'],
    ['藍色羊毛', 'blue_wool'],
    ['石英方塊', 'quartz_block'],
    ['金方塊', 'gold_block'],
    ['鐵方塊', 'iron_block'],
    ['鑽石方塊', 'diamond_block'],
    ['綠寶石方塊', 'emerald_block'],
    ['黑曜石', 'obsidian'],
    ['螢光石', 'glowstone'],
    ['海燈籠', 'sea_lantern'],
    ['冰', 'ice'],
    ['雪塊', 'snow_block'],
    ['TNT', 'tnt'],
  ],
  fillBlocks: [
    ['空氣（清除方塊）', 'air'],
    ['水', 'water'],
    ['岩漿', 'lava'],
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
  structures: [
    ['村莊（任何種類）', '#village'],
    ['沙漠神殿', 'desert_pyramid'],
    ['叢林神殿', 'jungle_pyramid'],
    ['雪屋', 'igloo'],
    ['女巫小屋', 'swamp_hut'],
    ['掠奪者前哨站', 'pillager_outpost'],
    ['林地府邸', 'mansion'],
    ['海底神殿', 'monument'],
    ['要塞（找終界傳送門）', 'stronghold'],
    ['廢棄礦坑', 'mineshaft'],
    ['沉船', 'shipwreck'],
    ['埋藏的寶藏', 'buried_treasure'],
    ['廢棄傳送門', 'ruined_portal'],
    ['古蹟廢墟', 'trail_ruins'],
    ['試煉密室', 'trial_chambers'],
    ['遠古城市', 'ancient_city'],
    ['地獄要塞（地獄）', 'fortress'],
    ['堡壘遺跡（地獄）', 'bastion_remnant'],
    ['終界城（終界）', 'end_city'],
  ],
  biomes: [
    ['平原', 'plains'],
    ['向日葵平原', 'sunflower_plains'],
    ['繁花森林', 'flower_forest'],
    ['櫻花樹林', 'cherry_grove'],
    ['黑森林', 'dark_forest'],
    ['蒼白花園', 'pale_garden'],
    ['沙漠', 'desert'],
    ['叢林', 'jungle'],
    ['竹林', 'bamboo_jungle'],
    ['蘑菇島', 'mushroom_fields'],
    ['冰刺', 'ice_spikes'],
    ['雪原', 'snowy_plains'],
    ['惡地', 'badlands'],
    ['沼澤', 'swamp'],
    ['紅樹林沼澤', 'mangrove_swamp'],
    ['草甸', 'meadow'],
    ['海洋', 'ocean'],
    ['溫暖海洋', 'warm_ocean'],
    ['蒼鬱洞窟', 'lush_caves'],
    ['鐘乳石洞窟', 'dripstone_caves'],
    ['深暗之域', 'deep_dark'],
  ],
};

// ===== 指令表 =====
// 字串 = 固定文字；{list: '清單名'} = 下拉選單；{num: [預設, 最小, 最大]} = 數字輸入
const SECTIONS = [
  {
    title: '🎮 遊戲設定',
    rows: [
      ['切換遊戲模式', ['/gamemode ', { list: 'gamemode' }]],
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
      ['傳送到座標（X Y Z）', ['/tp @s ', { num: [0, -30000000, 30000000] }, ' ', { num: [100, -64, 320] }, ' ', { num: [0, -30000000, 30000000] }]],
      ['找最近的結構（會告訴你座標）', ['/locate structure ', { list: 'structures' }]],
      ['找最近的生態域', ['/locate biome ', { list: 'biomes' }]],
    ],
  },
  {
    title: '🎁 物品',
    rows: [
      ['給自己物品', ['/give @s ', { list: 'items', extra: 'blocks' }, ' ', { num: [1, 1, 64] }]],
      ['幫手上的東西附魔', ['/enchant @s ', { list: 'enchantments' }, ' ', { num: [1, 1, 5] }]],
    ],
  },
  {
    title: '🐷 生物',
    rows: [
      ['召喚生物', ['/summon ', { list: 'mobs' }]],
      ['騎上旁邊最近的生物', ['/ride @s mount @e[type=', { list: 'rideable' }, ',limit=1,sort=nearest]']],
      ['讓所有生物停住不動', ['/tick freeze']],
      ['讓生物恢復移動', ['/tick unfreeze']],
      ['清除某一種生物', ['/kill @e[type=', { list: 'mobs' }, ']']],
    ],
  },
  {
    title: '💪 狀態效果與傷害',
    rows: [
      ['給自己效果（秒數、等級）', ['/effect give @s ', { list: 'effects' }, ' ', { num: [30, 1, 1000000] }, ' ', { num: [0, 0, 255] }]],
      ['清除身上所有效果', ['/effect clear @s']],
      ['對自己造成傷害（1 = 半顆心）', ['/damage @s ', { num: [2, 1, 1000] }]],
      ['讓自己死掉（重生用）', ['/kill @s']],
    ],
  },
  {
    title: '🧱 建築',
    rows: [
      ['在腳下鋪一塊 5×5 的地板', ['/fill ~-2 ~-1 ~-2 ~2 ~-1 ~2 ', { list: 'blocks', extra: 'fillBlocks' }]],
      ['把身邊 7×4×7 的空間填滿或清空', ['/fill ~-3 ~ ~-3 ~3 ~3 ~3 ', { list: 'fillBlocks', extra: 'blocks' }]],
      ['拿到指令方塊', ['/give @s command_block']],
    ],
  },
];

// ===== 畫面 =====
function makeSelect(spec) {
  const sel = document.createElement('select');
  const addGroup = (name, label) => {
    const group = label ? document.createElement('optgroup') : sel;
    if (label) group.label = label;
    for (const [zh, id] of LISTS[name]) {
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = `${zh} ${id}`;
      group.appendChild(opt);
    }
    if (label) sel.appendChild(group);
  };
  if (spec.extra) {
    addGroup(spec.list, GROUP_LABELS[spec.list]);
    addGroup(spec.extra, GROUP_LABELS[spec.extra]);
  } else {
    addGroup(spec.list);
  }
  return sel;
}

const GROUP_LABELS = { items: '物品', blocks: '方塊', fillBlocks: '特別' };

function makeNumber([value, min, max]) {
  const input = document.createElement('input');
  input.type = 'number';
  input.value = value;
  input.min = min;
  input.max = max;
  input.style.width = `${Math.max(String(value).length, String(max).length > 4 ? 5 : 3) + 2}ch`;
  return input;
}

function readCommand(codeEl) {
  let text = '';
  for (const node of codeEl.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) text += node.textContent;
    else if (node.tagName === 'SELECT' || node.tagName === 'INPUT') text += node.value;
  }
  return text;
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

function render() {
  const root = document.getElementById('command-list');
  for (const section of SECTIONS) {
    const card = document.createElement('section');
    card.className = 'card cmd-card';
    const h2 = document.createElement('h2');
    h2.textContent = section.title;
    card.appendChild(h2);

    const table = document.createElement('div');
    table.className = 'cmd-table';
    for (const [use, parts] of section.rows) {
      const row = document.createElement('div');
      row.className = 'cmd-row';

      const useEl = document.createElement('div');
      useEl.className = 'cmd-use';
      useEl.textContent = use;

      const right = document.createElement('div');
      right.className = 'cmd-right';
      const code = document.createElement('code');
      code.className = 'cmd-code';
      for (const part of parts) {
        if (typeof part === 'string') code.appendChild(document.createTextNode(part));
        else if (part.list) code.appendChild(makeSelect(part));
        else if (part.num) code.appendChild(makeNumber(part.num));
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-copy';
      btn.textContent = '📋 複製';
      btn.addEventListener('click', async () => {
        const ok = await copyText(readCommand(code));
        btn.textContent = ok ? '✅ 已複製！' : '❌ 複製失敗';
        btn.classList.toggle('copied', ok);
        clearTimeout(btn._t);
        btn._t = setTimeout(() => {
          btn.textContent = '📋 複製';
          btn.classList.remove('copied');
        }, 1500);
      });

      right.append(code, btn);
      row.append(useEl, right);
      table.appendChild(row);
    }
    card.appendChild(table);
    root.appendChild(card);
  }
}

render();
