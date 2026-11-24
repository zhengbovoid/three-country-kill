window.SGS_HEROES = [
  // ==================== 魏国 (Wei) ====================
  {
    id: 'caocao',
    name: '曹操',
    title: '魏武帝',
    pinyin: 'caocao cc',
    faction: 'wei',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['defense', 'tempo'],
    reach: 'medium',
    roleRatings: { lord: 5, loyalist: 3, rebel: 3, renegade: 4 },
    traits: ['selfHurt', 'antiAoe', 'defenseOffTurn', 'lordSkill'],
    skills: [
      {
        name: '奸雄',
        tags: [],
        desc: '当你受到伤害后，你可以获得对你造成伤害的牌。'
      },
      {
        name: '护驾',
        tags: ['主公技'],
        desc: '当你需要使用或打出【闪】时，你可以令其他魏势力角色选择是否打出一张【闪】（视为由你使用或打出）。'
      }
    ],
    faq: [
      '若对你造成伤害的牌是转化牌（如关羽红牌当杀、丈八蛇矛两牌当杀），奸雄可获得构成该转化牌的全部实体牌。',
      '体力流失（如黄盖苦肉、周瑜反间若无牌？注：反间为直接伤害无伤害牌；典韦强袭、张春华绝情等）没有对应的伤害牌，不能发动奸雄。',
      '发动护驾时，按当前回合角色起的逆时针顺序依次询问其他魏势力角色。'
    ],
    tips: '标准常青主公；作为反贼或忠臣时面对袁绍、南蛮、万箭收益极高，可反吃AOE爆发。'
  },
  {
    id: 'simayi',
    name: '司马懿',
    title: '狼顾之鬼',
    pinyin: 'simayi smy',
    faction: 'wei',
    hp: 3,
    pack: '标准',
    difficulty: 2,
    styles: ['control', 'defense'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 4, rebel: 4, renegade: 5 },
    traits: ['judge', 'selfHurt', 'defenseOffTurn', 'lateGame', 'handDisrupt'],
    skills: [
      {
        name: '反馈',
        tags: [],
        desc: '当你受到伤害后，你可以获得伤害来源的一张牌。'
      },
      {
        name: '鬼才',
        tags: [],
        desc: '当一名角色的判定牌生效前，你可以打出一张手牌代替之。'
      }
    ],
    faq: [
      '反馈可拿伤害来源的手牌或装备区里的牌，但不能拿判定区里的牌；每次受到伤害（哪怕是2点酒杀）在标准版中仅发动一次反馈。',
      '鬼才只能打出「手牌」，不能使用装备区里的牌；原判定牌直接进入弃牌堆（不会归司马懿）。',
      '若场上同时存在司马懿与张角，按当前回合角色起逆时针顺序依次决定是否改判。'
    ],
    tips: '全能控判与威慑型武将，内奸顶级选择，也是曹操主与张角主的优质搭档。'
  },
  {
    id: 'xiahoudun',
    name: '夏侯惇',
    title: '独眼的罗刹',
    pinyin: 'xiahoudun xhd',
    faction: 'wei',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['defense'],
    reach: 'medium',
    roleRatings: { lord: 2, loyalist: 3, rebel: 3, renegade: 3 },
    traits: ['selfHurt', 'defenseOffTurn', 'antiAoe'],
    skills: [
      {
        name: '刚烈',
        tags: [],
        desc: '当你受到伤害后，你可以进行判定：若结果不为红桃，则伤害来源选择一项：1. 弃置两张手牌；2. 受到你造成的1点伤害。'
      }
    ],
    faq: [
      '刚烈的判定只要不是红桃（黑桃、梅花、方块均算）即触发效果，75%概率生效。',
      '伤害来源若不足两张手牌，则无法选择弃置两张手牌，只能受到1点伤害。',
      '若自己对自己造成伤害（如闪电无来源除外，火攻自己等）理论上也可发动刚烈。'
    ],
    tips: '新手友好，高威慑防御型武将，不怕无脑AOE消耗，但主动进攻手段相对单一。'
  },
  {
    id: 'zhangliao',
    name: '张辽',
    title: '前将军',
    pinyin: 'zhangliao zl',
    faction: 'wei',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['control', 'tempo'],
    reach: 'long',
    roleRatings: { lord: 3, loyalist: 4, rebel: 5, renegade: 4 },
    traits: ['handDisrupt', 'distanceFree', 'earlyBurst', 'lateGame'],
    skills: [
      {
        name: '突袭',
        tags: [],
        desc: '摸牌阶段，你可以放弃摸牌，改为获得至多两名其他角色的各一张手牌。'
      }
    ],
    faq: [
      '突袭无距离限制，全场任意有手牌的其他角色均可成为目标。',
      '目标角色必须至少有1张手牌；若全场只有一名其他角色有手牌，也可只突袭这1人（仍放弃本回合摸牌）。',
      '被兵粮寸断跳过摸牌阶段时，无法发动突袭。'
    ],
    tips: '最稳定的控场神将之一，全位置通用；尤其克制孙权、曹操、诸葛亮、张角等依赖手牌质量的武将。'
  },
  {
    id: 'xuchu',
    name: '许褚',
    title: '虎痴',
    pinyin: 'xuchu xc',
    faction: 'wei',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['burst'],
    reach: 'short',
    roleRatings: { lord: 2, loyalist: 3, rebel: 4, renegade: 2 },
    traits: ['earlyBurst', 'duel'],
    skills: [
      {
        name: '裸衣',
        tags: [],
        desc: '摸牌阶段，你可以少摸一张牌；若如此做，本回合你使用【杀】或【决斗】造成伤害时，此伤害+1。'
      }
    ],
    faq: [
      '裸衣对「本回合内你使用【杀】或【决斗】造成的伤害」均有效，包括同一回合内通过诸葛连弩多杀或决斗的伤害。',
      '通过借刀杀人让别人出杀，或使用南蛮入侵/万箭齐发造成的伤害，不享受裸衣+1加成。',
      '裸衣+酒+杀可打出3点高额爆发（若属性杀遇藤甲可达4点）。'
    ],
    tips: '近主位强力秒杀反贼，但极度依赖距离与手牌，远主位或缺乏过牌支持时容易断杀断距离。'
  },
  {
    id: 'guojia',
    name: '郭嘉',
    title: '早终的先知',
    pinyin: 'guojia gj',
    faction: 'wei',
    hp: 3,
    pack: '标准',
    difficulty: 1,
    styles: ['support', 'defense'],
    reach: 'long',
    roleRatings: { lord: 3, loyalist: 5, rebel: 4, renegade: 4 },
    traits: ['selfHurt', 'cardDraw', 'antiAoe', 'defenseOffTurn', 'judge'],
    skills: [
      {
        name: '天妒',
        tags: [],
        desc: '当你的判定牌生效后，你可以获得此牌。'
      },
      {
        name: '遗计',
        tags: [],
        desc: '当你受到1点伤害后，你可以观看牌堆顶的两张牌，然后将这些牌交给任意角色。'
      }
    ],
    faq: [
      '受到2点伤害时，遗计可以发动两次（共看4张牌并自由分配），每次可分别给不同角色或留给自己。',
      '若有人对郭嘉的判定牌改判（如司马懿鬼才、张角鬼道），郭嘉天妒获得的是最终生效的那张改判牌。',
      '遗计给牌无距离限制，且不会展示给其他角色看。'
    ],
    tips: '顶级保核与反AOE辅助，曹操/袁绍主绝配忠臣，也是后置位最不怕盲狙的万金油。'
  },
  {
    id: 'zhenji',
    name: '甄姬',
    title: '薄幸的美人',
    pinyin: 'zhenji zj',
    faction: 'wei',
    hp: 3,
    pack: '标准',
    difficulty: 1,
    styles: ['defense', 'tempo'],
    reach: 'medium',
    roleRatings: { lord: 3, loyalist: 4, rebel: 4, renegade: 4 },
    traits: ['defenseOffTurn', 'antiAoe', 'cardDraw', 'judge', 'lateGame'],
    skills: [
      {
        name: '倾国',
        tags: [],
        desc: '你可以将一张黑色手牌当【闪】使用或打出。'
      },
      {
        name: '洛神',
        tags: [],
        desc: '准备阶段，你可以进行判定：若结果为黑色，你获得此判定牌，且你可以重复此流程。'
      }
    ],
    faq: [
      '倾国只能使用「黑色手牌」，装备区里的黑色装备牌不能当闪使用。',
      '洛神在准备阶段结算，早于判定阶段，因此即便头上有乐不思蜀或闪电，依然可以先洛神摸牌。',
      '洛神判定出红色牌时停止，该红色判定牌进入弃牌堆，此前获得的黑色牌全部保留。'
    ],
    tips: '回合外防御拉满，配合司马懿/张角改判或诸葛亮观星控顶可实现恐怖爆发。'
  },
  {
    id: 'xiahouyuan',
    name: '夏侯渊',
    title: '疾行的猎豹',
    pinyin: 'xiahouyuan xhy',
    faction: 'wei',
    hp: 4,
    pack: '风',
    difficulty: 2,
    styles: ['burst'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 3, rebel: 4, renegade: 3 },
    traits: ['distanceFree', 'earlyBurst'],
    skills: [
      {
        name: '神速',
        tags: [],
        desc: '你可以做出如下选择：1. 跳过判定阶段和摸牌阶段；2. 跳过出牌阶段并弃置一张装备牌。你每选择一项，便视为你使用了一张无距离限制的【杀】。'
      }
    ],
    faq: [
      '选择神速1会同时跳过判定阶段，可用来规避乐不思蜀、兵粮寸断与闪电，但也要放弃摸两张牌。',
      '神速视为使用的【杀】无颜色、无花色、无属性，因此不会触发仁王盾（防黑杀）和藤甲（防普杀？注意：藤甲防普通杀，神速杀为普通无色杀，会被藤甲免疫！）。',
      '可以同时发动神速1和神速2，一回合远程打出两张无视距离的杀，且不受出牌阶段1杀限制。'
    ],
    tips: '远主位狙击高手，无视+1马与座位距离，关键时刻可跳过乐不思蜀精准补刀残血。'
  },
  {
    id: 'caoren',
    name: '曹仁',
    title: '大将军',
    pinyin: 'caoren cr',
    faction: 'wei',
    hp: 4,
    pack: '风',
    difficulty: 2,
    styles: ['defense'],
    reach: 'medium',
    roleRatings: { lord: 2, loyalist: 2, rebel: 2, renegade: 3 },
    traits: ['defenseOffTurn', 'stall'],
    skills: [
      {
        name: '据守',
        tags: [],
        desc: '结束阶段，你可以摸三张牌，然后将你的武将牌翻面。'
      }
    ],
    faq: [
      '据守在弃牌阶段之后、结束阶段发动，因此摸到的3张牌不会在本回合被弃置。',
      '武将牌翻面后，轮到你的下一个回合将跳过整个回合（直接翻回正面），期间无法行动但仍受乐不思蜀等待下个回合。'
    ],
    tips: '标准风包曹仁翻面代价较大，适合残局蓄牌或需要高防御自保时谨慎发动。'
  },
  {
    id: 'xunyu',
    name: '荀彧',
    title: '王佐之才',
    pinyin: 'xunyu xy',
    faction: 'wei',
    hp: 3,
    pack: '火',
    difficulty: 2,
    styles: ['support', 'control'],
    reach: 'long',
    roleRatings: { lord: 3, loyalist: 5, rebel: 5, renegade: 4 },
    traits: ['selfHurt', 'cardDraw', 'directDmg', 'distanceFree', 'antiAoe'],
    skills: [
      {
        name: '驱虎',
        tags: [],
        desc: '出牌阶段限一次，你可以与一名体力值大于你的角色拼点：若你赢，你令该角色对其攻击范围内的另一名角色造成1点伤害；若你没赢，其对你造成1点伤害。'
      },
      {
        name: '节命',
        tags: [],
        desc: '当你受到1点伤害后，你可以令一名角色将手牌补至体力上限（至多补至5张）。'
      }
    ],
    faq: [
      '驱虎拼点输了后是对方对你造成1点伤害，可借此主动触发「节命」为队友或自己补牌！',
      '驱虎赢了后，若目标攻击范围内没有其他角色，则无法造成伤害；造成伤害的来源是拼点目标而非荀彧（如击杀反贼由对方摸3张）。',
      '节命补牌上限为5张（即使主公或董卓体力上限超过5，最多也只补到5张）。'
    ],
    tips: '超强全能辅助与控场，忠反皆为T0级选择，与高血量主公（如曹操、刘备、袁绍）配合极佳。'
  },
  {
    id: 'dianwei',
    name: '典韦',
    title: '古之恶来',
    pinyin: 'dianwei dw',
    faction: 'wei',
    hp: 4,
    pack: '火',
    difficulty: 1,
    styles: ['burst'],
    reach: 'short',
    roleRatings: { lord: 2, loyalist: 3, rebel: 4, renegade: 2 },
    traits: ['directDmg', 'earlyBurst', 'unblockable'],
    skills: [
      {
        name: '强袭',
        tags: [],
        desc: '出牌阶段限一次，你可以失去1点体力或弃置一张武器牌，然后对你攻击范围内的一名其他角色造成1点伤害。'
      }
    ],
    faq: [
      '若弃置的是当前装备区里的武器牌，攻击范围按弃置武器前的攻击范围计算（部分规则版本按当前，面杀建议提前统一；常见线上与标准FAQ允许用装备区武器打其攻击范围内的目标）。',
      '强袭造成的1点伤害无对应实体牌，不会触发曹操奸雄，也不触发闪、八卦阵、仁王盾、藤甲等防杀效果，极度克制张角、甄姬等高防脆皮。'
    ],
    tips: '近主位暴力直伤反贼，专治张角、甄姬、诸葛亮等难杀武将；远主位则极易够不到目标。'
  },
  {
    id: 'zhanghe',
    name: '张郃',
    title: '料敌机先',
    pinyin: 'zhanghe zh',
    faction: 'wei',
    hp: 4,
    pack: '山',
    difficulty: 3,
    styles: ['control', 'tempo'],
    reach: 'long',
    roleRatings: { lord: 3, loyalist: 5, rebel: 5, renegade: 4 },
    traits: ['handDisrupt', 'distanceFree', 'judge', 'lateGame'],
    skills: [
      {
        name: '巧变',
        tags: [],
        desc: '你可以弃置一张手牌，跳过你的一个阶段（准备阶段和结束阶段除外）。若你以此法跳过摸牌阶段，你可以获得至多两名其他角色的各一张手牌；若你以此法跳过出牌阶段，你可以将场上的一张牌移动至另一名角色的对应区域内。'
      }
    ],
    faq: [
      '巧变跳判定阶段可无视乐不思蜀/兵粮寸断/闪电（但延时锦囊仍留在判定区）；跳出牌阶段可直接把头上的乐/兵移给敌人！',
      '移动装备牌时，若目标角色对应装备栏已有装备，则无法移动至该位置（不可顶掉已有装备）。',
      '巧变跳弃牌阶段可保留全部手牌，适合在手牌充裕时囤积防御牌。'
    ],
    tips: '操作上限极高的顶级控场大师，集突袭、移乐、移装备、免弃牌于一身，全位置强势。'
  },

  // ==================== 蜀国 (Shu) ====================
  {
    id: 'liubei',
    name: '刘备',
    title: '乱世的枭雄',
    pinyin: 'liubei lb',
    faction: 'shu',
    hp: 4,
    pack: '标准',
    difficulty: 2,
    styles: ['support', 'tempo'],
    reach: 'long',
    roleRatings: { lord: 5, loyalist: 5, rebel: 5, renegade: 3 },
    traits: ['heal', 'cardDraw', 'distanceFree', 'lordSkill'],
    skills: [
      {
        name: '仁德',
        tags: [],
        desc: '出牌阶段，你可以将任意张手牌交给其他角色；当你以此法于此阶段内首次给出至少两张牌时，你回复1点体力。'
      },
      {
        name: '激将',
        tags: ['主公技'],
        desc: '当你需要使用或打出【杀】时，你可以令其他蜀势力角色选择是否打出一张【杀】（视为由你使用或打出）。'
      }
    ],
    faq: [
      '仁德可以在同一出牌阶段分多次给不同角色牌，只要累计给出达到2张即触发回血（每阶段限回1次）。',
      '给牌无距离限制，非常适合远主位跨全场包养队友核心（如黄月英、张飞、孙尚香、貂蝉）。',
      '激将打出的杀视为刘备使用，计入刘备出牌阶段的出杀次数，并享受刘备武器效果（但不享受出牌蜀将的武器效果）。'
    ],
    tips: '经典强主与顶级团队发动机，只要队友有强力输出核心，刘备的收益就能指数级放大。'
  },
  {
    id: 'guanyu',
    name: '关羽',
    title: '美髯公',
    pinyin: 'guanyu gy',
    faction: 'shu',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['burst', 'defense'],
    reach: 'medium',
    roleRatings: { lord: 2, loyalist: 3, rebel: 3, renegade: 3 },
    traits: ['duel', 'antiAoe'],
    skills: [
      {
        name: '武圣',
        tags: [],
        desc: '你可以将一张红色牌当【杀】使用或打出。'
      }
    ],
    faq: [
      '武圣既可使用红色手牌，也可使用装备区里的红色装备牌（如红桃/方块武器、马、防具）。',
      '武圣转化的【杀】保留原牌花色与点数（红桃或方块），因此可以穿透仁王盾（防黑杀），且仍为普通杀（非火杀）。',
      '配合诸葛连弩时满手红牌可爆发，但也极易被卡距离。'
    ],
    tips: '新手最易上手的稳健四血将，刘备主忠臣可稳定响应激将，克制南蛮入侵与仁王盾。'
  },
  {
    id: 'zhangfei',
    name: '张飞',
    title: '万夫不当',
    pinyin: 'zhangfei zf',
    faction: 'shu',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['burst'],
    reach: 'short',
    roleRatings: { lord: 2, loyalist: 3, rebel: 4, renegade: 2 },
    traits: ['earlyBurst'],
    skills: [
      {
        name: '咆哮',
        tags: ['锁定技'],
        desc: '你于出牌阶段内使用【杀】无次数限制。'
      }
    ],
    faq: [
      '咆哮仅解除出杀「次数限制」，不改变攻击范围，仍需武器或-1马才能打到远距离目标。',
      '酒在每个出牌阶段依然只能使用1次，仅对下一张杀生效，不会让咆哮的每一张杀都+1伤。'
    ],
    tips: '简单粗暴的菜刀流代表，近主位反贼或配刘备主忠臣极具威慑力，但非常怕断杀和卡距离。'
  },
  {
    id: 'zhugeliang',
    name: '诸葛亮',
    title: '迟暮的丞相',
    pinyin: 'zhugeliang zgl',
    faction: 'shu',
    hp: 3,
    pack: '标准',
    difficulty: 3,
    styles: ['control', 'defense', 'support'],
    reach: 'long',
    roleRatings: { lord: 3, loyalist: 4, rebel: 4, renegade: 4 },
    traits: ['judge', 'defenseOffTurn', 'lateGame', 'distanceFree'],
    skills: [
      {
        name: '观星',
        tags: [],
        desc: '准备阶段，你可以观看牌堆顶的X张牌（X为存活角色数且至多为5），然后以任意顺序放回牌堆顶或牌堆底。'
      },
      {
        name: '空城',
        tags: ['锁定技'],
        desc: '若你没有手牌，你不能成为【杀】或【决斗】的目标。'
      }
    ],
    faq: [
      '观星在准备阶段执行，早于判定阶段，因此可以自己控判解乐不思蜀、解兵粮寸断、控闪电劈人，还能精准控下家的手牌！',
      '空城只免疫【杀】与【决斗】，依然会被南蛮入侵、万箭齐发、火攻、顺手牵羊（拿装备）、过河拆桥、决斗外的直伤技能命中。',
      '借刀杀人可以指定空城诸葛亮为目标，但无法让其出杀（因为无手牌），装备武器会被夺走。'
    ],
    tips: '极致控场与节奏大师，控下家手牌价值巨大；当反贼坐在主公上家时尤其令主公窒息。'
  },
  {
    id: 'zhaoyun',
    name: '赵云',
    title: '少年将军',
    pinyin: 'zhaoyun zy',
    faction: 'shu',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['defense'],
    reach: 'medium',
    roleRatings: { lord: 3, loyalist: 3, rebel: 3, renegade: 4 },
    traits: ['defenseOffTurn', 'antiAoe', 'lateGame'],
    skills: [
      {
        name: '龙胆',
        tags: [],
        desc: '你可以将【杀】当【闪】、【闪】当【杀】使用或打出。'
      }
    ],
    faq: [
      '龙胆转化的杀/闪保留原牌的花色与点数，但若把火杀/雷杀当闪打出后，或把闪当杀使用时，闪当杀视为普通杀。',
      '面对南蛮入侵、万箭齐发、决斗时都能灵活应对，极难被常规输出秒杀。'
    ],
    tips: '攻守均衡的万金油四血将，新手友好、后置位抗压极强，适合忠臣护主或内奸保命单挑。'
  },
  {
    id: 'machao',
    name: '马超',
    title: '一骑当千',
    pinyin: 'machao mc',
    faction: 'shu',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['burst'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 3, rebel: 4, renegade: 3 },
    traits: ['unblockable', 'earlyBurst', 'distanceFree'],
    skills: [
      {
        name: '马术',
        tags: ['锁定技'],
        desc: '你计算与其他角色的距离-1。'
      },
      {
        name: '铁骑',
        tags: [],
        desc: '当你使用【杀】指定目标后，你可以进行判定：若结果为红色，该角色不能使用【闪】响应此【杀】。'
      }
    ],
    faq: [
      '马术可与装备的-1马叠加，总共-2距离，顺手牵羊和兵粮寸断也享受马术的距离减免！',
      '铁骑判定为红色后，目标既不能打出手牌【闪】，也不能发动八卦阵或曹操护驾（因为均属于使用/打出【闪】）。'
    ],
    tips: '自带进攻马+强命，极少卡距离，远近位反贼都好用，专克甄姬、赵云、张角等闪多的角色。'
  },
  {
    id: 'huangyueying',
    name: '黄月英',
    title: '归隐的杰女',
    pinyin: 'huangyueying hyy',
    faction: 'shu',
    hp: 3,
    pack: '标准',
    difficulty: 1,
    styles: ['burst', 'tempo'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 4, rebel: 5, renegade: 3 },
    traits: ['cardDraw', 'distanceFree', 'earlyBurst'],
    skills: [
      {
        name: '集智',
        tags: [],
        desc: '当你使用非延时类锦囊牌时，你可以摸一张牌。'
      },
      {
        name: '奇才',
        tags: ['锁定技'],
        desc: '你使用锦囊牌无距离限制。'
      }
    ],
    faq: [
      '集智在锦囊牌「使用时」即摸牌，早于对手打出无懈可击结算；因此就算锦囊被无懈抵消，月英依然已经摸到牌。',
      '乐不思蜀、兵粮寸断、闪电属于延时锦囊，使用它们不能触发集智，但依然享受奇才（无距离限制，可全场任意顺手、贴兵！）。',
      '使用无懈可击属于非延时锦囊，也能触发集智摸1张牌。'
    ],
    tips: '上限极高的过牌爆发神将，奇才让她在远主位也能全场顺手与兵粮，配刘备主忠臣爆发毁天灭地。'
  },
  {
    id: 'huangzhong',
    name: '黄忠',
    title: '老当益壮',
    pinyin: 'huangzhong hz',
    faction: 'shu',
    hp: 4,
    pack: '风',
    difficulty: 1,
    styles: ['burst'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 3, rebel: 5, renegade: 3 },
    traits: ['unblockable', 'earlyBurst'],
    skills: [
      {
        name: '烈弓',
        tags: [],
        desc: '当你于出牌阶段内使用【杀】指定目标后，若该角色的手牌数不小于你的体力值，或不大于你的攻击范围，则该角色不能使用【闪】响应此【杀】。'
      }
    ],
    faq: [
      '烈弓只在「出牌阶段内」使用杀时有效，回合外（如借刀杀人）不能发动。',
      '满足「目标手牌数 ≥ 黄忠当前体力值」或「目标手牌数 ≤ 黄忠攻击范围」任一条件即可强命！装备长武器（如麒麟弓5）时几乎百发百中。',
      '烈弓强命同样使八卦阵、护驾、倾国无法响应。'
    ],
    tips: '极强的破防强命输出，专杀囤手牌的主公（如孙权、曹操、张角）与高防武将，装上武器后威慑力翻倍。'
  },
  {
    id: 'weiyan',
    name: '魏延',
    title: '嗜血的独狼',
    pinyin: 'weiyan wy',
    faction: 'shu',
    hp: 4,
    pack: '风',
    difficulty: 1,
    styles: ['burst', 'defense'],
    reach: 'short',
    roleRatings: { lord: 2, loyalist: 3, rebel: 4, renegade: 3 },
    traits: ['heal', 'earlyBurst'],
    skills: [
      {
        name: '狂骨',
        tags: ['锁定技'],
        desc: '当你对距离1以内的角色造成1点伤害后，你回复1点体力。'
      }
    ],
    faq: [
      '狂骨判定的是「伤害造成前/时你与目标的距离是否为1」（不是攻击范围！装备长武器但距离为2不能回血，但装-1马可拉近到1）。',
      '无论是杀、决斗、南蛮、万箭、火攻还是连环传导，只要对你距离1以内的角色造成伤害都能触发回血（连自己也可以）。'
    ],
    tips: '近主位续航极强的肉盾菜刀，2号位/8号位发挥最佳；远主位则极易变成白板。'
  },
  {
    id: 'wolongzhuge',
    name: '卧龙诸葛亮',
    title: '卧龙',
    pinyin: 'wolongzhugeliang wlzg zgl',
    faction: 'shu',
    hp: 3,
    pack: '火',
    difficulty: 2,
    styles: ['control', 'defense'],
    reach: 'long',
    roleRatings: { lord: 3, loyalist: 4, rebel: 4, renegade: 4 },
    traits: ['defenseOffTurn', 'antiAoe', 'directDmg', 'distanceFree'],
    skills: [
      {
        name: '八阵',
        tags: ['锁定技'],
        desc: '若你的装备区没有防具牌，视为你装备着【八卦阵】。'
      },
      {
        name: '火计',
        tags: [],
        desc: '你可以将一张红色手牌当【火攻】使用。'
      },
      {
        name: '看破',
        tags: [],
        desc: '你可以将一张黑色手牌当【无懈可击】使用。'
      }
    ],
    faq: [
      '八阵视为装备八卦阵，因此会被青釭剑无视，且装备其他防具后八阵暂时失效。',
      '火计与看破都只能使用「手牌」，不能使用装备区里的牌。',
      '看破可用来保队友免受乐不思蜀、顺手、决斗、南蛮、万箭，战略价值极高。'
    ],
    tips: '全场顶级锦囊克星，自带防具+全场无懈+远程火攻破藤甲，非常适合远主位辅助与控场。'
  },
  {
    id: 'pangtong',
    name: '庞统',
    title: '凤雏',
    pinyin: 'pangtong pt',
    faction: 'shu',
    hp: 3,
    pack: '火',
    difficulty: 2,
    styles: ['control', 'defense'],
    reach: 'long',
    roleRatings: { lord: 3, loyalist: 4, rebel: 4, renegade: 4 },
    traits: ['defenseOffTurn', 'distanceFree', 'lateGame', 'heal'],
    skills: [
      {
        name: '连环',
        tags: [],
        desc: '你可以将一张梅花手牌当【铁索连环】使用或重铸。'
      },
      {
        name: '涅槃',
        tags: ['限定技'],
        desc: '当你处于濒死状态时，你可以弃置你区域里的所有牌，然后复原你的武将牌，摸三张牌并将体力回复至3点。'
      }
    ],
    faq: [
      '连环可把任意梅花手牌直接重铸过牌，手牌运转非常顺滑；连起对手后配合火杀/雷杀/火攻能打群体核爆。',
      '涅槃会弃置「区域里的所有牌」，包括手牌、装备区以及判定区里的乐不思蜀/兵粮/闪电，并解除横置与翻面！'
    ],
    tips: '自带复活甲的两条命武将，后置位不怕盲狙，连环还能破除对方高防阵型。'
  },

  // ==================== 吴国 (Wu) ====================
  {
    id: 'sunquan',
    name: '孙权',
    title: '年轻的贤君',
    pinyin: 'sunquan sq',
    faction: 'wu',
    hp: 4,
    pack: '标准',
    difficulty: 2,
    styles: ['tempo', 'defense'],
    reach: 'medium',
    roleRatings: { lord: 5, loyalist: 4, rebel: 5, renegade: 5 },
    traits: ['cardDraw', 'lateGame', 'lordSkill', 'heal'],
    skills: [
      {
        name: '制衡',
        tags: [],
        desc: '出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。'
      },
      {
        name: '救援',
        tags: ['主公技', '锁定技'],
        desc: '其他吴势力角色于你的濒死状态下对你使用【桃】时，你额外回复1点体力。'
      }
    ],
    faq: [
      '制衡可以同时弃置手牌和装备区里的牌（但不能弃置判定区的牌），且至少弃置1张。',
      '单挑王者！凭借极强的牌堆过滤能力，能稳定找到桃、无懈、关键装备与距离。',
      '救援只在孙权「濒死状态」下由其他吴势力角色出桃才+1，非濒死时出桃或自己吃桃不触发额外回血。'
    ],
    tips: '全身份神将（主/忠/反/内均极强），尤其被称为「单挑之王」，内奸与主公首选之一。'
  },
  {
    id: 'ganning',
    name: '甘宁',
    title: '锦帆游侠',
    pinyin: 'ganning gn',
    faction: 'wu',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['control'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 4, rebel: 5, renegade: 3 },
    traits: ['handDisrupt', 'distanceFree', 'earlyBurst'],
    skills: [
      {
        name: '奇袭',
        tags: [],
        desc: '你可以将一张黑色牌当【过河拆桥】使用。'
      }
    ],
    faq: [
      '奇袭可使用黑色手牌或黑色装备牌，无距离限制，能拆敌方手牌、防具、+1马，也能拆队友头上的乐不思蜀/兵粮寸断！',
      '注意奇袭转化的过河拆桥属于黑色锦囊，无法指定拥有「帷幕」的贾诩。'
    ],
    tips: '新手友好的顶级拆迁办，全位置百搭；拆主公防具/手牌或帮队友拆乐兵都极其好用。'
  },
  {
    id: 'lvmeng',
    name: '吕蒙',
    title: '白衣渡江',
    pinyin: 'lvmeng lm',
    faction: 'wu',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['defense'],
    reach: 'medium',
    roleRatings: { lord: 2, loyalist: 2, rebel: 2, renegade: 4 },
    traits: ['stall', 'lateGame', 'defenseOffTurn'],
    skills: [
      {
        name: '克己',
        tags: [],
        desc: '若你未于出牌阶段内使用或打出过【杀】，则你可以跳过弃牌阶段。'
      }
    ],
    faq: [
      '在出牌阶段使用【决斗】、【南蛮入侵】、【万箭齐发】等锦囊不会破坏克己，但如果对方在决斗中逼你打出【杀】，则会破坏克己！',
      '回合外打出【杀】（如响应南蛮、借刀）不影响自己回合的克己。'
    ],
    tips: '经典蓄爆内奸，低嘲讽易活到残局；但在快节奏局中作为忠臣/反贼容易脱节，建议慎选。'
  },
  {
    id: 'huanggai',
    name: '黄盖',
    title: '轻身为国',
    pinyin: 'huanggai hg',
    faction: 'wu',
    hp: 4,
    pack: '标准',
    difficulty: 2,
    styles: ['burst'],
    reach: 'short',
    roleRatings: { lord: 1, loyalist: 2, rebel: 4, renegade: 1 },
    traits: ['earlyBurst', 'cardDraw'],
    skills: [
      {
        name: '苦肉',
        tags: [],
        desc: '出牌阶段，你可以失去1点体力，然后摸两张牌。'
      }
    ],
    faq: [
      '苦肉不限次数；若苦肉至0血会先进入濒死求桃流程，救回后才会摸这两张牌。',
      '苦肉属于「失去体力」而非受到伤害，不触发伤害类结算，也不能主动卖血给曹操/郭嘉类效果（注：黄盖无卖血技）。'
    ],
    tips: '极致的赌命爆发流，2号位反贼找诸葛连弩一回合秒主公极具节目效果，但风险极高。'
  },
  {
    id: 'zhouyu',
    name: '周瑜',
    title: '大都督',
    pinyin: 'zhouyu zy',
    faction: 'wu',
    hp: 3,
    pack: '标准',
    difficulty: 2,
    styles: ['tempo', 'burst'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 4, rebel: 4, renegade: 4 },
    traits: ['cardDraw', 'directDmg', 'distanceFree', 'lateGame'],
    skills: [
      {
        name: '英姿',
        tags: [],
        desc: '摸牌阶段，你可以多摸一张牌。'
      },
      {
        name: '反间',
        tags: [],
        desc: '出牌阶段限一次，你可以令一名其他角色选择一种花色，然后获得你的一张手牌并展示之；若此牌花色与其所选不同，你对其造成1点伤害。'
      }
    ],
    faq: [
      '反间无距离限制，且造成的1点伤害没有对应伤害牌，曹操不能奸雄，且直接无视八卦阵、仁王盾、藤甲、空城！',
      '反间对手抽到你的手牌后若未猜中，依然保留那张牌；因此反间前最好先打光桃、无懈等关键牌避免资敌。'
    ],
    tips: '稳定三牌运转+远程直伤，全位置发挥均衡，特别克制曹操、张角、诸葛亮与残血高防将。'
  },
  {
    id: 'daqiao',
    name: '大乔',
    title: '矜持之花',
    pinyin: 'daqiao dq',
    faction: 'wu',
    hp: 3,
    pack: '标准',
    difficulty: 2,
    styles: ['control', 'defense'],
    reach: 'medium',
    roleRatings: { lord: 2, loyalist: 4, rebel: 5, renegade: 3 },
    traits: ['handDisrupt', 'defenseOffTurn', 'earlyBurst'],
    skills: [
      {
        name: '国色',
        tags: [],
        desc: '你可以将一张方块牌当【乐不思蜀】使用。'
      },
      {
        name: '流离',
        tags: [],
        desc: '当你成为【杀】的目标时，你可以弃置一张牌并将此【杀】转移给你攻击范围内的另一名角色（不能是此【杀】的使用者）。'
      }
    ],
    faq: [
      '国色可使用方块手牌或方块装备牌，且乐不思蜀无距离限制，可全场任意控人！',
      '流离可以弃置装备区里的牌（注意：若弃置了当前装备的武器，攻击范围通常按弃置前/现有规则看，标准版里流离目标必须在弃置后仍于攻击范围内，面杀需留意别弃掉唯一长武器导致够不到人）。',
      '流离不能转移给空城诸葛亮，但可以转移给本来在杀使用者攻击范围之外的人。'
    ],
    tips: '最强单体硬控，2号位忠/反起手乐核心破坏力极强；装备长武器后流离防守反击能力极佳。'
  },
  {
    id: 'luxun',
    name: '陆逊',
    title: '儒生雄才',
    pinyin: 'luxun lx',
    faction: 'wu',
    hp: 3,
    pack: '标准',
    difficulty: 2,
    styles: ['tempo', 'defense'],
    reach: 'medium',
    roleRatings: { lord: 2, loyalist: 3, rebel: 3, renegade: 4 },
    traits: ['cardDraw', 'lateGame', 'defenseOffTurn'],
    skills: [
      {
        name: '谦逊',
        tags: ['锁定技'],
        desc: '你不能成为【顺手牵羊】和【乐不思蜀】的目标。'
      },
      {
        name: '连营',
        tags: [],
        desc: '当你失去最后的手牌时，你可以摸一张牌。'
      }
    ],
    faq: [
      '连营在你回合外失去最后一张手牌（比如打出最后的闪、被拆走/突袭最后一张牌）也能立刻摸1张牌！',
      '配合诸葛连弩时，只要不断摸到杀/锦囊就能实现「联营永动机」。',
      '谦逊只防顺手与乐不思蜀，不防兵粮寸断与过河拆桥。'
    ],
    tips: '免疫乐与顺手的单挑好手，内奸发挥稳定，但在八人局团队爆发力依赖装备与牌运。'
  },
  {
    id: 'sunshangxiang',
    name: '孙尚香',
    title: '弓腰姬',
    pinyin: 'sunshangxiang ssx',
    faction: 'wu',
    hp: 3,
    pack: '标准',
    difficulty: 2,
    styles: ['support', 'tempo', 'burst'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 5, rebel: 5, renegade: 3 },
    traits: ['heal', 'cardDraw', 'distanceFree'],
    skills: [
      {
        name: '结姻',
        tags: [],
        desc: '出牌阶段限一次，你可以弃置两张手牌并选择一名已受伤的男性角色，你与其各回复1点体力。'
      },
      {
        name: '枭姬',
        tags: [],
        desc: '当你失去装备区里的一张牌时，你可以摸两张牌。'
      }
    ],
    faq: [
      '即使孙尚香自己是满血，也可以发动结姻弃两张手牌帮已受伤的男性队友回1血。',
      '顶替自己装备区里的旧装备（如换一把新武器）、被敌人拆/顺装备，都会触发枭姬摸2张牌！'
    ],
    tips: '顶级奶妈兼装备过牌核，孙权主与刘备主绝佳忠臣，远主位也能稳定给团队提供高额续航。'
  },
  {
    id: 'xiaoqiao',
    name: '小乔',
    title: '矫情之花',
    pinyin: 'xiaoqiao xq',
    faction: 'wu',
    hp: 3,
    pack: '风',
    difficulty: 2,
    styles: ['defense', 'support'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 4, rebel: 4, renegade: 4 },
    traits: ['defenseOffTurn', 'antiAoe', 'distanceFree'],
    skills: [
      {
        name: '天香',
        tags: [],
        desc: '当你受到伤害时，你可以弃置一张红桃手牌，将此伤害转移给一名其他角色，然后该角色摸X张牌（X为其已损失的体力值）。'
      },
      {
        name: '红颜',
        tags: ['锁定技'],
        desc: '你的黑桃牌视为红桃牌。'
      }
    ],
    faq: [
      '红颜使小乔的黑桃手牌也可用于发动天香；且小乔自己判定闪电永远不会中（黑桃2~9全变成红桃），但乐不思蜀判定黑桃也会变成红桃而躲过！',
      '天香转移给已受伤的队友（如满血转1血不划算，转给1血队友可让其摸2~3张，甚至配合郭嘉/荀彧刷牌），也能用来直接弹死1血敌人！',
      '天香转移伤害时，伤害来源不变（原攻击者若借此击杀反贼，由原攻击者摸3张牌）。'
    ],
    tips: '极强威慑与反弹能力，自带半免疫闪电与乐，面对袁绍万箭时还能弹伤配合队友或反杀。'
  },
  {
    id: 'zhoutai',
    name: '周泰',
    title: '历战之躯',
    pinyin: 'zhoutai zt',
    faction: 'wu',
    hp: 4,
    pack: '风',
    difficulty: 1,
    styles: ['defense'],
    reach: 'medium',
    roleRatings: { lord: 3, loyalist: 3, rebel: 3, renegade: 4 },
    traits: ['defenseOffTurn', 'antiAoe', 'lateGame', 'stall'],
    skills: [
      {
        name: '不屈',
        tags: [],
        desc: '当你扣减1点体力后，若你的体力值不大于0，你可以从牌堆顶亮出一张牌置于你的武将牌上（称为「创」）：若此牌点数与已有的「创」均不同，你不会进入濒死状态；若点数相同，则你进入濒死状态。每当你回复1点体力后，弃置一张「创」。'
      }
    ],
    faq: [
      '不屈状态下周泰手牌上限按当前体力值算（通常为0，但很多规则/界限突破有调整；标准风包中处于不屈状态时手牌上限为0，弃牌阶段须弃光手牌）。',
      '因点数共13种，运气好可顶住多轮致命集火，非常适合抗盲狙与消耗敌方火力。'
    ],
    tips: '超强生存盾牌，末置位不怕被集火秒杀，拖后期与残局单挑都很有韧性。'
  },
  {
    id: 'taishici',
    name: '太史慈',
    title: '笃烈之士',
    pinyin: 'taishici tsc',
    faction: 'wu',
    hp: 4,
    pack: '火',
    difficulty: 2,
    styles: ['burst'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 4, rebel: 5, renegade: 3 },
    traits: ['earlyBurst', 'distanceFree'],
    skills: [
      {
        name: '天义',
        tags: [],
        desc: '出牌阶段限一次，你可以与一名角色拼点：若你赢，直到回合结束，你使用【杀】无距离限制、次数上限+1、且可额外指定一个目标；若你没赢，本回合你不能使用【杀】。'
      }
    ],
    faq: [
      '天义拼点赢了后，本回合可出2张杀，每张杀都无距离限制且可以同时杀2个目标（最多一回合造成4次杀的打击！），配酒可双杀同时+1伤！',
      '拼点可以选择手牌少或小牌多的队友/对手来提高胜率；注意若拼点输了，本回合哪怕装备诸葛连弩也不能出杀。'
    ],
    tips: '爆发力惊人的多目标菜刀，赢下拼点即可无视距离双杀压制全场，近远位反贼和吴国忠臣都很强。'
  },
  {
    id: 'lusu',
    name: '鲁肃',
    title: '独断的外交家',
    pinyin: 'lusu ls',
    faction: 'wu',
    hp: 3,
    pack: '林',
    difficulty: 3,
    styles: ['support', 'control', 'tempo'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 5, rebel: 5, renegade: 2 },
    traits: ['handDisrupt', 'cardDraw', 'distanceFree', 'earlyBurst'],
    skills: [
      {
        name: '好施',
        tags: [],
        desc: '摸牌阶段，你可以多摸两张牌；若此时你的手牌数大于5，则你须将一半手牌（向下取整）交给手牌最少的一名其他角色。'
      },
      {
        name: '缔盟',
        tags: [],
        desc: '出牌阶段限一次，你可以选择两名其他角色并弃置X张牌（X为这两名角色手牌数之差），然后令这两名角色交换手牌。'
      }
    ],
    faq: [
      '好施发动时共摸4张牌；如果摸完后手牌≤5张则不需要分牌！若＞5张，且有多名手牌最少者，由鲁肃自行选择交给其中一人。',
      '缔盟弃置的牌可以是手牌或装备牌；如果目标两人手牌数相同（差值为0），甚至可以0成本直接交换他们手牌！'
    ],
    tips: '公认的「大师」级T0神将，缔盟瞬间拉爆敌我手牌差，全位置极强但极易遭集火，需注意保命。'
  },
  {
    id: 'sunce',
    name: '孙策',
    title: '江东的小霸王',
    pinyin: 'sunce sc',
    faction: 'wu',
    hp: 4,
    pack: '山',
    difficulty: 2,
    styles: ['tempo', 'defense'],
    reach: 'medium',
    roleRatings: { lord: 4, loyalist: 3, rebel: 3, renegade: 4 },
    traits: ['cardDraw', 'lateGame', 'lordSkill', 'duel'],
    skills: [
      {
        name: '激昂',
        tags: [],
        desc: '当你使用【决斗】或红色【杀】指定目标后，或成为【决斗】或红色【杀】的目标后，你可以摸一张牌。'
      },
      {
        name: '魂姿',
        tags: ['觉醒技'],
        desc: '准备阶段，若你的体力值为1，你减1点体力上限，然后获得技能「英姿」和「英魂」。'
      },
      {
        name: '制霸',
        tags: ['主公技'],
        desc: '其他吴势力角色的出牌阶段限一次，该角色可以与你拼点（若你已觉醒，你可以拒绝此次拼点）；若其没赢，你可以获得拼点的两张牌。'
      }
    ],
    faq: [
      '英魂（觉醒获得）：准备阶段，若你已受伤，你可以选择一名其他角色并选择一项：1. 令其摸X张牌，然后弃置1张牌；2. 令其摸1张牌，然后弃置X张牌（X为你已损失的体力值）。',
      '觉醒条件是「你的准备阶段开始时体力值为1」，因此反贼常会故意把孙策控在2血不压到1血，防止其觉醒。',
      '制霸吴国忠臣可以用小牌故意输给孙策来给主公送关键牌（如桃、红杀、无懈）。'
    ],
    tips: '一旦成功觉醒强度质变（英姿+英魂），做主公和内奸极具后期统治力，但前期怕被反贼控血不打。'
  },

  // ==================== 群雄 (Qun) ====================
  {
    id: 'huatuo',
    name: '华佗',
    title: '神医',
    pinyin: 'huatuo ht',
    faction: 'qun',
    hp: 3,
    pack: '标准',
    difficulty: 1,
    styles: ['support', 'defense'],
    reach: 'long',
    roleRatings: { lord: 3, loyalist: 5, rebel: 4, renegade: 4 },
    traits: ['heal', 'defenseOffTurn', 'antiAoe', 'distanceFree', 'lateGame'],
    skills: [
      {
        name: '急救',
        tags: [],
        desc: '你的回合外，你可以将一张红色牌当【桃】使用。'
      },
      {
        name: '青囊',
        tags: [],
        desc: '出牌阶段限一次，你可以弃置一张手牌，令一名已受伤的角色回复1点体力。'
      }
    ],
    faq: [
      '急救可使用红色手牌或装备区里的红色装备牌，但只能在「你的回合外」发动（自己回合内只能用真桃或青囊）。',
      '青囊无距离限制，可以给自己或全场任意已受伤角色回血。',
      '注意面对贾诩「完杀」时，贾诩回合内华佗不能对其他濒死角色发动急救救人，只能救自己。'
    ],
    tips: '全游戏最强续航与奶妈，新人闭眼可拿的顶级忠臣/辅助，极其克制慢速消耗与AOE阵容。'
  },
  {
    id: 'lvbu',
    name: '吕布',
    title: '武的化身',
    pinyin: 'lvbu lb',
    faction: 'qun',
    hp: 4,
    pack: '标准',
    difficulty: 1,
    styles: ['burst'],
    reach: 'medium',
    roleRatings: { lord: 2, loyalist: 3, rebel: 4, renegade: 3 },
    traits: ['unblockable', 'earlyBurst', 'duel'],
    skills: [
      {
        name: '无双',
        tags: ['锁定技'],
        desc: '当你使用【杀】指定目标后，该角色需连续使用两张【闪】才能抵消此【杀】；当你成为【决斗】的目标或使用【决斗】指定目标后，对手每次需连续打出两张【杀】。'
      }
    ],
    faq: [
      '若目标装备了八卦阵，可以连续进行两次判定，两次皆红才算抵消；若只成功一次，仍需手动补打1张闪。',
      '若目标只打出1张闪但没有第2张闪，通常不建议浪费第1张闪（标准规则允许只出1张仍受伤，实战中没2张闪直接掉血更划算）。',
      '配合貂蝉离间、借刀杀人或决斗都能触发无双压制。'
    ],
    tips: '简单直观的强杀猛将，极其消耗敌人防御牌，近主位反贼与张角主群雄忠臣都不错。'
  },
  {
    id: 'diaochan',
    name: '貂蝉',
    title: '绝世的舞姬',
    pinyin: 'diaochan dc',
    faction: 'qun',
    hp: 3,
    pack: '标准',
    difficulty: 2,
    styles: ['control', 'burst', 'tempo'],
    reach: 'long',
    roleRatings: { lord: 2, loyalist: 4, rebel: 5, renegade: 5 },
    traits: ['duel', 'directDmg', 'cardDraw', 'distanceFree', 'lateGame', 'earlyBurst'],
    skills: [
      {
        name: '离间',
        tags: [],
        desc: '出牌阶段限一次，你可以弃置一张牌，令一名男性角色视为对另一名男性角色使用一张【决斗】（此【决斗】不能被【无懈可击】响应）。'
      },
      {
        name: '闭月',
        tags: [],
        desc: '结束阶段，你可以摸一张牌。'
      }
    ],
    faq: [
      '离间无距离限制！选人时注意顺序：先选的角色视为「决斗目标」（先出杀），后选的角色视为「决斗使用者」（后出杀，即造成伤害者）——面杀请先说清谁先出杀！',
      '离间产生的决斗无法被【无懈可击】抵消，且不吃距离、不吃八卦/仁王盾/藤甲，极其克制张角、曹操等男性主公。',
      '离间不能指定空城诸葛亮（空城免疫决斗），且不能指定女性角色（如甄姬、黄月英、孙尚香、大乔、小乔）。'
    ],
    tips: '全标准版最强武将之一！自带稳定输出+过牌+不吃距离，全身份全位置皆为顶级选择。'
  },
  {
    id: 'zhangjiao',
    name: '张角',
    title: '大贤良师',
    pinyin: 'zhangjiao zj',
    faction: 'qun',
    hp: 3,
    pack: '风',
    difficulty: 3,
    styles: ['control', 'defense'],
    reach: 'long',
    roleRatings: { lord: 4, loyalist: 4, rebel: 3, renegade: 3 },
    traits: ['judge', 'defenseOffTurn', 'directDmg', 'distanceFree', 'lordSkill'],
    skills: [
      {
        name: '雷击',
        tags: [],
        desc: '当你使用或打出【闪】时，你可以令一名角色进行判定：若结果为黑桃，你对其造成2点雷电伤害。'
      },
      {
        name: '鬼道',
        tags: [],
        desc: '当一名角色的判定牌生效前，你可以打出一张黑色牌替换之（并获得原判定牌）。'
      },
      {
        name: '黄天',
        tags: ['主公技'],
        desc: '其他群势力角色的出牌阶段限一次，该角色可以将一张【闪】或【闪电】交给你。'
      }
    ],
    faq: [
      '鬼道可以使用黑色手牌或黑色装备牌，而且能把原来的判定牌收进手牌（比司马懿鬼才多回收1牌，但不能改红牌）。',
      '雷击判定过程中张角自己就可以发动鬼道换黑桃牌，实现「出闪即劈2血雷伤」，配合铁索连环更可怕！',
      '雷击对曹操造成伤害时无实体牌，曹操不能奸雄；但张角非常怕直伤（如典韦、周瑜、貂蝉）与拆迁（甘宁、张辽）。'
    ],
    tips: '极具特色的主公与控判核，配合八卦阵或群雄忠臣（华佗、貂蝉）威慑力恐怖，但害怕无杀直伤和断闪。'
  },
  {
    id: 'jiaxu',
    name: '贾诩',
    title: '冷酷的毒士',
    pinyin: 'jiaxu jx',
    faction: 'qun',
    hp: 3,
    pack: '林',
    difficulty: 3,
    styles: ['control', 'defense', 'burst'],
    reach: 'long',
    roleRatings: { lord: 3, loyalist: 4, rebel: 5, renegade: 5 },
    traits: ['defenseOffTurn', 'lateGame', 'distanceFree', 'directDmg'],
    skills: [
      {
        name: '完杀',
        tags: ['锁定技'],
        desc: '你的回合内，除濒死角色外，其他角色不能使用【桃】。'
      },
      {
        name: '乱武',
        tags: ['限定技'],
        desc: '出牌阶段，你可以令所有其他角色依次选择一项：1. 对距离最近的另一名角色使用一张【杀】；2. 失去1点体力。'
      },
      {
        name: '帷幕',
        tags: ['锁定技'],
        desc: '你不能成为黑色锦囊牌的目标。'
      }
    ],
    faq: [
      '帷幕免疫所有黑色锦囊：黑过河拆桥、黑顺手、黑决斗、黑乐/兵、黑南蛮/万箭、黑铁索连环、闪电（全黑桃，直接免疫）！但红锦囊和无懈可击仍生效。',
      '完杀下别人濒死时，只有「濒死角色自己」能吃桃/酒，包括华佗、刘备主队友在内其他所有人都不能出桃救人！',
      '乱武时若有人没有杀或够不到最近角色，只能失去1点体力；常在残局配合完杀一举清场收割。'
    ],
    tips: '顶级刺客与残局收割机，帷幕超强防御让他在后置位与内奸局极其难死，乱武+完杀可瞬间翻盘。'
  },
  {
    id: 'yuanshao',
    name: '袁绍',
    title: '高贵的名门',
    pinyin: 'yuanshao ys',
    faction: 'qun',
    hp: 4,
    pack: '火',
    difficulty: 2,
    styles: ['burst'],
    reach: 'long',
    roleRatings: { lord: 4, loyalist: 4, rebel: 3, renegade: 1 },
    traits: ['aoe', 'earlyBurst', 'distanceFree', 'lordSkill'],
    skills: [
      {
        name: '乱击',
        tags: [],
        desc: '你可以将两张花色相同的手牌当【万箭齐发】使用。'
      },
      {
        name: '血裔',
        tags: ['主公技', '锁定技'],
        desc: '你的手牌上限+2X（X为场上其他群势力角色数）。'
      }
    ],
    faq: [
      '乱击只能用两张「手牌」（不能用装备牌），且每回合无次数限制，只要凑齐同花色两张就能继续放万箭！',
      '袁绍做主公时首轮连续乱击极易压残全场反贼，但也要注意别把没闪的脆皮忠臣射死（主公杀忠臣会弃光全部手牌与装备！）。',
      '作为忠臣搭配曹操主公时，可以疯狂放万箭给曹操「奸雄」刷牌，是三国杀最经典的配合之一。'
    ],
    tips: '全屏压血炮台，主公与曹操主忠臣极具爆发力；但做反贼遇到曹操主或卖血队时要格外小心。'
  }
];
