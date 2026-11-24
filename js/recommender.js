window.SGS_RECOMMENDER = (function () {
  const STYLE_LABELS = {
    burst: '爆发输出',
    control: '控场拆迁',
    support: '团队辅助',
    defense: '生存防御',
    tempo: '过牌运营'
  };

  const DIFFICULTY_LABELS = {
    1: '新手友好',
    2: '进阶策略',
    3: '高手操作'
  };

  const ROLE_LABELS = {
    lord: '主公',
    loyalist: '忠臣',
    rebel: '反贼',
    renegade: '内奸'
  };

  // Handcrafted Lord-specific synergy & counter matrices for the 6 flagship Lords
  const LORD_PROFILES = {
    caocao: {
      lordSkillFaction: 'wei',
      lordSkillName: '护驾',
      loyalistBest: ['guojia', 'simayi', 'xunyu', 'yuanshao', 'zhenji', 'zhangliao', 'zhanghe'],
      loyalistNote: {
        yuanshao: '乱击万箭给曹操奸雄刷牌，经典核弹配合',
        guojia: '魏势力护驾+卖血双核，反AOE极强',
        simayi: '魏势力护驾+鬼才控判防乐/闪电',
        xunyu: '魏势力护驾+节命帮主公补满5手牌'
      },
      rebelBest: ['zhangliao', 'ganning', 'lusu', 'zhouyu', 'diaochan', 'jiaxu', 'daqiao', 'dianwei', 'huangzhong'],
      rebelAvoid: ['yuanshao'],
      rebelNote: {
        yuanshao: '反贼放万箭容易帮曹操奸雄白拿大量牌',
        dianwei: '强袭直伤无实体牌，曹操无法奸雄',
        zhouyu: '反间直伤无实体牌，绕开曹操奸雄',
        zhangliao: '突袭压低曹操手牌质量，避免给奸雄牌',
        ganning: '奇袭拆光曹操手牌/防具，极大压制'
      }
    },
    liubei: {
      lordSkillFaction: 'shu',
      lordSkillName: '激将',
      loyalistBest: ['huangyueying', 'zhangfei', 'guanyu', 'zhaoyun', 'sunshangxiang', 'taishici', 'diaochan', 'huangzhong', 'lusu'],
      loyalistNote: {
        huangyueying: '刘备给锦囊触发集智，一回合瞬间爆发',
        zhangfei: '刘备给杀配合咆哮，近主爆发极高',
        guanyu: '蜀势力稳定响应激将，攻守兼备',
        sunshangxiang: '刘备送装备触发枭姬+结姻回血，强强联合'
      },
      rebelBest: ['zhangliao', 'ganning', 'daqiao', 'lusu', 'zhanghe', 'jiaxu', 'diaochan'],
      rebelAvoid: [],
      rebelNote: {
        daqiao: '国色贴乐直接断掉刘备仁德发牌核心',
        lusu: '缔盟交换刘备囤积的手牌，瓦解仁德体系',
        zhangliao: '突袭偷牌削弱刘备发牌与防御能力'
      }
    },
    sunquan: {
      lordSkillFaction: 'wu',
      lordSkillName: '救援',
      loyalistBest: ['sunshangxiang', 'lusu', 'huatuo', 'daqiao', 'ganning', 'zhouyu', 'taishici', 'xiaoqiao'],
      loyalistNote: {
        sunshangxiang: '吴势力救援+结姻回血，孙权极难阵亡',
        lusu: '吴势力救援+缔盟控场，上限极高',
        huatuo: '顶级续航保护孙权拖入后期统治局'
      },
      rebelBest: ['zhangliao', 'ganning', 'daqiao', 'lusu', 'huangzhong', 'diaochan', 'jiaxu', 'xuchu'],
      rebelAvoid: [],
      rebelNote: {
        zhangliao: '突袭直接削减孙权制衡手牌基数',
        daqiao: '乐不思蜀封锁孙权制衡回合，压制力极强',
        huangzhong: '孙权常留大量手牌，极易触发烈弓强命'
      }
    },
    zhangjiao: {
      lordSkillFaction: 'qun',
      lordSkillName: '黄天',
      loyalistBest: ['huatuo', 'diaochan', 'simayi', 'liubei', 'lusu', 'guojia', 'zhugeliang', 'jiaxu', 'lvbu'],
      loyalistNote: {
        huatuo: '群势力黄天送闪+急救保3血主公防暴毙',
        diaochan: '群势力黄天送闪+强力输出控场',
        simayi: '鬼才协同改判，配合雷击威慑全场',
        liubei: '仁德定向给张角喂闪和黑桃牌'
      },
      rebelBest: ['dianwei', 'zhouyu', 'diaochan', 'zhangliao', 'ganning', 'lusu', 'huangzhong', 'machao', 'wolongzhuge', 'jiaxu'],
      rebelAvoid: ['zhangfei', 'guanyu'],
      rebelNote: {
        dianwei: '强袭无视闪直接掉血，天生克制张角',
        zhouyu: '反间不走杀闪流程，完美绕开雷击',
        huangzhong: '烈弓强命不给张角出闪雷击的机会',
        machao: '铁骑红判强命，直接封锁雷击反杀',
        zhangfei: '普通多杀极易给张角送闪触发雷击反劈'
      }
    },
    sunce: {
      lordSkillFaction: 'wu',
      lordSkillName: '制霸',
      loyalistBest: ['lusu', 'sunshangxiang', 'huatuo', 'xunyu', 'daqiao', 'ganning', 'zhouyu', 'taishici'],
      loyalistNote: {
        lusu: '吴势力制霸送牌+强力辅助，帮主公稳渡前期',
        sunshangxiang: '吴势力制霸+结姻稳血防反贼爆发',
        huatuo: '防止孙策压到1血觉醒前直接被反贼一波带走'
      },
      rebelBest: ['ganning', 'zhangliao', 'daqiao', 'lusu', 'dianwei', 'huangzhong', 'jiaxu', 'diaochan'],
      rebelAvoid: [],
      rebelNote: {
        jiaxu: '完杀+乱武可在孙策2血时直接一波击杀不给觉醒机会',
        daqiao: '贴乐压制孙策觉醒前的节奏',
        lusu: '缔盟掏空孙策手牌，打乱控血与防守'
      }
    },
    yuanshao: {
      lordSkillFaction: 'qun',
      lordSkillName: '血裔',
      loyalistBest: ['guojia', 'simayi', 'xunyu', 'caocao', 'huatuo', 'diaochan', 'jiaxu', 'zhenji'],
      loyalistNote: {
        guojia: '袁绍放万箭触发遗计，给主公补牌继续乱击',
        xunyu: '袁绍万箭触发节命，直接把袁绍补回5张手牌！',
        caocao: '奸雄收走万箭，不怕主公误伤还能反打',
        huatuo: '群势力血裔+急救防止脆皮忠臣被万箭射死'
      },
      rebelBest: ['caocao', 'guojia', 'simayi', 'xunyu', 'zhenji', 'huatuo', 'wolongzhuge', 'xiaoqiao', 'zhaoyun', 'xiahoudun', 'zhoutai'],
      rebelAvoid: ['huanggai', 'lusu'],
      rebelNote: {
        caocao: '反吃袁绍万箭反手全场爆发，天生天敌',
        guojia: '每波万箭帮反贼队友狂刷手牌',
        zhenji: '倾国满手黑牌当闪，完全不怕乱击',
        wolongzhuge: '自带八阵+看破无懈，极度克制万箭齐发',
        lusu: '3血无防易在袁绍首轮乱击中被直接射残'
      }
    }
  };

  const PACK_SCOPES = {
    classic: {
      label: '经典面杀（标+神话）',
      packs: ['standard', 'shenhua']
    },
    popular: {
      label: '主流扩展（标+神话+界+一将+谋+神）',
      packs: ['standard', 'shenhua', 'extra', 'refresh', 'yijiang', 'newjiang', 'sb', 'shiji', 'yingbian']
    },
    all: {
      label: '全部官方扩展（全库）',
      packs: null
    }
  };

  function resolveLordProfileKey(lordHero) {
    if (!lordHero) return null;
    if (LORD_PROFILES[lordHero.id]) return lordHero.id;
    const n = lordHero.name || '';
    if (n.includes('曹操') && !n.includes('神')) return 'caocao';
    if (n.includes('刘备') && !n.includes('神')) return 'liubei';
    if (n.includes('孙权') && !n.includes('神')) return 'sunquan';
    if (n.includes('张角') && !n.includes('神')) return 'zhangjiao';
    if (n.includes('孙策') && !n.includes('神')) return 'sunce';
    if (n.includes('袁绍') && !n.includes('神')) return 'yuanshao';
    return null;
  }

  function getSeatContext(playerCount, seat, role) {
    if (role === 'lord') {
      return {
        seat: 1,
        distToLord: 0,
        code: 'lord',
        label: '1号位（主公先手）',
        summary: '首回合先手行动且多1点体力上限，重生存、过牌与团队统御力'
      };
    }
    const clampedSeat = Math.max(2, Math.min(playerCount, seat));
    const distToLord = Math.min(clampedSeat - 1, playerCount + 1 - clampedSeat);

    if (clampedSeat === 2) {
      return {
        seat: clampedSeat,
        distToLord,
        code: 'nextLord',
        label: `${clampedSeat}号位 · 主公下家（近主先手）`,
        summary: '距主公仅1且最先行动，节奏价值最高；忠反重先手爆发/控场，内奸须防集火'
      };
    }
    if (clampedSeat === playerCount) {
      return {
        seat: clampedSeat,
        distToLord,
        code: 'prevLord',
        label: `${clampedSeat}号位 · 主公上家（近主末位）`,
        summary: '距主公仅1但最后行动，首轮易吃盲狙/AOE，偏爱强防御、卖血或近主补刀'
      };
    }
    if (distToLord >= 2) {
      const isLate = clampedSeat >= playerCount - 1 && playerCount >= 6;
      return {
        seat: clampedSeat,
        distToLord,
        code: isLate ? 'farLate' : 'farSeat',
        label: `${clampedSeat}号位 · 远主位（距主公${distToLord}）`,
        summary: '离主公较远，极度偏爱无视距离、远攻、拆迁或团队辅助型武将，慎选短手菜刀'
      };
    }
    return {
      seat: clampedSeat,
      distToLord,
      code: 'midNear',
      label: `${clampedSeat}号位 · 近中置位（距主公${distToLord}）`,
      summary: '位置均衡，进攻与辅助空间都较宽裕'
    };
  }

  function hasTrait(hero, trait) {
    return hero.traits && hero.traits.includes(trait);
  }

  function evaluateHero(hero, config, lordHero) {
    const { role, lordHeroId, playerCount, seat, styles, difficulty } = config;
    const seatCtx = getSeatContext(playerCount, seat, role);
    const pros = [];
    const warns = [];

    // 1. Base identity score (1..5 -> 30..62)
    const roleRating = hero.roleRatings[role] || 3;
    let score = 22 + roleRating * 8;
    if (roleRating === 5) {
      pros.push(`${ROLE_LABELS[role]}顶级梯度（${roleRating}★）`);
    } else if (roleRating === 4) {
      pros.push(`非常适合担任${ROLE_LABELS[role]}（${roleRating}★）`);
    } else if (roleRating <= 2) {
      warns.push(`常规${ROLE_LABELS[role]}强度偏低（${roleRating}★）`);
    }

    // 2. Lord-specific synergy / counter (when role is not lord)
    if (role !== 'lord' && lordHero) {
      const profileKey = resolveLordProfileKey(lordHero);
      const profile = profileKey ? LORD_PROFILES[profileKey] : null;
      if (profile) {
        if (role === 'loyalist') {
          if (profile.lordSkillFaction && hero.faction === profile.lordSkillFaction) {
            score += 9;
            pros.push(`同势力配合${lordHero.name}【${profile.lordSkillName}】`);
          }
          if (profile.loyalistBest.includes(hero.id)) {
            score += 10;
            pros.push(
              (profile.loyalistNote && profile.loyalistNote[hero.id]) ||
                `与${lordHero.name}主公体系高度契合`
            );
          } else if (profileKey === 'caocao' && (hasTrait(hero, 'selfHurt') || hasTrait(hero, 'aoe'))) {
            score += 6;
            pros.push('卖血/AOE体系与曹操主公联动良好');
          } else if (profileKey === 'yuanshao' && (hasTrait(hero, 'selfHurt') || hasTrait(hero, 'antiAoe') || hasTrait(hero, 'heal'))) {
            score += 7;
            pros.push('抗万箭/卖血或续航，适合配合袁绍主公');
          } else if (profileKey === 'zhangjiao' && (hasTrait(hero, 'judge') || hasTrait(hero, 'heal'))) {
            score += 7;
            pros.push('改判/续航可有效支援张角主公');
          } else if (profileKey === 'liubei' && (hasTrait(hero, 'earlyBurst') || hasTrait(hero, 'cardDraw'))) {
            score += 6;
            pros.push('吃牌转化能力强，适合接刘备仁德');
          }
        } else if (role === 'rebel') {
          if (profile.rebelBest.includes(hero.id)) {
            score += 11;
            pros.push(
              (profile.rebelNote && profile.rebelNote[hero.id]) ||
                `有效克制${lordHero.name}主公体系`
            );
          } else if (profileKey === 'caocao' && (hasTrait(hero, 'handDisrupt') || hasTrait(hero, 'directDmg') || hasTrait(hero, 'unblockable'))) {
            score += 8;
            pros.push('拆牌/直伤/强命可有效压制曹操奸雄');
          } else if (profileKey === 'zhangjiao' && (hasTrait(hero, 'unblockable') || hasTrait(hero, 'directDmg') || hasTrait(hero, 'handDisrupt'))) {
            score += 8;
            pros.push('强命/直伤/拆手牌绕开张角出闪雷击');
          } else if ((profileKey === 'sunquan' || profileKey === 'liubei') && (hasTrait(hero, 'handDisrupt') || hasTrait(hero, 'unblockable'))) {
            score += 7;
            pros.push(`控牌/强命有效压制${lordHero.name}手牌运营`);
          } else if (profileKey === 'yuanshao' && (hasTrait(hero, 'antiAoe') || hasTrait(hero, 'selfHurt') || hasTrait(hero, 'defenseOffTurn'))) {
            score += 8;
            pros.push('防万箭/卖血反打，克制袁绍首轮乱击');
          }
          if (profile.rebelAvoid.includes(hero.id)) {
            score -= 16;
            warns.push(
              (profile.rebelNote && profile.rebelNote[hero.id]) ||
                `面对${lordHero.name}主公容易反向资敌`
            );
          }
        } else if (role === 'renegade') {
          if (profileKey === 'yuanshao' && (hasTrait(hero, 'antiAoe') || hasTrait(hero, 'defenseOffTurn'))) {
            score += 9;
            pros.push('能扛住袁绍主公首轮乱击压血，稳健过渡');
          }
          if (profileKey === 'yuanshao' && hero.hp <= 3 && !hasTrait(hero, 'defenseOffTurn') && !hasTrait(hero, 'antiAoe')) {
            score -= 10;
            warns.push('3血脆皮面对袁绍主公极易开局暴毙');
          }
        }
      } else {
        // Generic trait & faction Lord-skill synergy/counter for any expansion Lord
        if (role === 'loyalist') {
          if (hasTrait(lordHero, 'lordSkill') && hero.faction === lordHero.faction) {
            score += 8;
            pros.push(`同势力配合${lordHero.name}主公技`);
          }
          if (lordHero.hp <= 3 && (hasTrait(hero, 'heal') || hero.styles.includes('support'))) {
            score += 9;
            pros.push(`保护3血主公${lordHero.name}，提升续航容错`);
          }
          if (hasTrait(lordHero, 'selfHurt') && hasTrait(hero, 'heal')) {
            score += 6;
            pros.push(`奶量配合卖血主公${lordHero.name}循环收益`);
          }
        } else if (role === 'rebel') {
          if (hasTrait(lordHero, 'selfHurt') && (hasTrait(hero, 'handDisrupt') || hasTrait(hero, 'directDmg'))) {
            score += 9;
            pros.push(`拆牌/直伤有效限制卖血主公${lordHero.name}`);
          }
          if (lordHero.hp <= 3 && hasTrait(hero, 'earlyBurst') && seatCtx.distToLord === 1) {
            score += 8;
            pros.push(`近主爆发可直接威胁3血主公${lordHero.name}`);
          }
        }
      }

      if (role === 'renegade' && hasTrait(hero, 'lateGame')) {
        score += 10;
        pros.push('残局单挑能力强，利于内奸后期收割');
      }
    }

    // 3. Seat position evaluation
    if (role === 'lord') {
      if (hasTrait(hero, 'lordSkill')) {
        score += 14;
        pros.push('自带主公技，团队联动上限高');
      }
      if (hero.hp >= 4 || hasTrait(hero, 'defenseOffTurn') || hasTrait(hero, 'antiAoe')) {
        score += 10;
        pros.push('主公+1血上限后抗压稳健，防反贼首轮集火');
      }
      if (hasTrait(hero, 'cardDraw') || hasTrait(hero, 'heal')) {
        score += 5;
        pros.push('自带过牌/续航，长盘统治力强');
      }
    } else if (seatCtx.code === 'nextLord') {
      // 2号位：主公下家，距离1且先手
      if (role === 'rebel') {
        if (hasTrait(hero, 'earlyBurst') || hasTrait(hero, 'handDisrupt') || hero.styles.includes('control')) {
          score += 9;
          pros.push('2号位近主先手，起手即可压制/爆发');
        }
      } else if (role === 'loyalist') {
        if (hero.styles.includes('control') || hero.styles.includes('support') || hasTrait(hero, 'earlyBurst')) {
          score += 7;
          pros.push('2号位先手抢节奏，保护主公建立优势');
        }
      } else if (role === 'renegade') {
        if (hasTrait(hero, 'defenseOffTurn') || hasTrait(hero, 'stall')) {
          score += 7;
          pros.push('2号位易被盲狙，强防御可稳住血线');
        } else if (hero.hp <= 3 && !hasTrait(hero, 'defenseOffTurn')) {
          score -= 7;
          warns.push('2号位内奸仇恨高，脆皮容易过早被集火');
        }
      }
    } else if (seatCtx.code === 'prevLord') {
      // 末置位：主公上家，距离1但行动最晚
      if (hasTrait(hero, 'defenseOffTurn') || hasTrait(hero, 'selfHurt') || hasTrait(hero, 'heal')) {
        score += 10;
        pros.push('末置位强防御/卖血，不怕首轮盲狙和AOE');
      } else if (hero.hp <= 3 && !hasTrait(hero, 'defenseOffTurn')) {
        score -= 8;
        warns.push('末置位行动最晚，3血无防易首轮被压残');
      }
      if (role === 'rebel' && hero.reach === 'short' && hero.hp >= 4) {
        score += 5;
        pros.push('主公上家距离仅1，短手高爆也能直接摸到主公');
      }
      if (hero.id === 'zhugeliang' && role === 'rebel') {
        score += 7;
        pros.push('主公上家观星可直接控死主公下回合手牌');
      }
    } else if (seatCtx.code === 'farSeat' || seatCtx.code === 'farLate') {
      // 远主位：距离 >= 2
      if (hero.reach === 'long' || hasTrait(hero, 'distanceFree')) {
        score += 11;
        pros.push(`远主位（距主公${seatCtx.distToLord}）不卡距离，全局影响力强`);
      } else if (hero.reach === 'short') {
        const penalty = role === 'rebel' ? 14 : 10;
        score -= penalty;
        warns.push(`远主位（距主公${seatCtx.distToLord}）极易卡距离，容易空过`);
      }
      if (seatCtx.code === 'farLate' && (hasTrait(hero, 'defenseOffTurn') || hasTrait(hero, 'selfHurt'))) {
        score += 5;
        pros.push('后置位抗压能力优秀');
      }
    } else {
      // Mid-near
      if (hero.reach === 'long') {
        score += 3;
      }
    }

    // 4. Preferred playstyle matching
    if (styles && styles.length > 0) {
      const matched = styles.filter((s) => hero.styles.includes(s));
      if (matched.length > 0) {
        score += 8 + (matched.length - 1) * 4;
        pros.push(`契合偏好风格：${matched.map((s) => STYLE_LABELS[s]).join(' / ')}`);
      } else {
        score -= 6;
      }
    }

    // 5. Difficulty matching
    if (difficulty !== 'any') {
      const targetDiff = Number(difficulty);
      if (hero.difficulty === targetDiff) {
        score += 7;
        pros.push(`符合「${DIFFICULTY_LABELS[targetDiff]}」操作难度`);
      } else if (targetDiff === 1 && hero.difficulty === 3) {
        score -= 10;
        warns.push('技能结算/大局观要求较高，新手上手门槛偏高');
      } else if (Math.abs(hero.difficulty - targetDiff) === 1) {
        score -= 2;
      }
    }

    // Clamp display score to 35..99
    const finalScore = Math.max(35, Math.min(99, Math.round(score)));
    let tier = '可用';
    let tierCode = 'B';
    if (finalScore >= 82) {
      tier = '强烈推荐';
      tierCode = 'S';
    } else if (finalScore >= 70) {
      tier = '优质选择';
      tierCode = 'A';
    } else if (finalScore < 56) {
      tier = '当前慎选';
      tierCode = 'C';
    }

    // Deduplicate and cap reasons cleanly
    const uniquePros = [...new Set(pros)].slice(0, 3);
    const uniqueWarns = [...new Set(warns)].slice(0, 2);

    return {
      hero,
      score: finalScore,
      tier,
      tierCode,
      pros: uniquePros,
      warns: uniqueWarns
    };
  }

  function recommend(heroes, config) {
    const lordHero = config.role !== 'lord'
      ? heroes.find((h) => h.id === config.lordHeroId) || null
      : null;

    const hasCandidates = Array.isArray(config.candidateIds) && config.candidateIds.length > 0;
    const scopeObj = PACK_SCOPES[config.packScope || 'popular'] || PACK_SCOPES.all;
    const allowedPacks = scopeObj.packs;

    let pool = heroes.filter((h) => {
      if (config.role !== 'lord' && h.id === config.lordHeroId) return false;
      if (hasCandidates) return config.candidateIds.includes(h.id);
      if (allowedPacks && !allowedPacks.includes(h.packId)) return false;
      return true;
    });

    const ranked = pool
      .map((hero) => evaluateHero(hero, config, lordHero))
      .sort((a, b) => b.score - a.score || b.hero.roleRatings[config.role] - a.hero.roleRatings[config.role]);

    return {
      seatContext: getSeatContext(config.playerCount, config.seat, config.role),
      lordHero,
      isCandidateMode: hasCandidates,
      poolSize: pool.length,
      results: hasCandidates ? ranked : ranked.slice(0, 12)
    };
  }

  return {
    STYLE_LABELS,
    DIFFICULTY_LABELS,
    ROLE_LABELS,
    PACK_SCOPES,
    getSeatContext,
    recommend
  };
})();
