(function () {
  const HEROES = window.SGS_HEROES || [];
  const CARDS = window.SGS_CARDS || [];
  const RULES = window.SGS_RULES || {};
  const REC = window.SGS_RECOMMENDER;

  const FACTION_LABEL = { wei: '魏', shu: '蜀', wu: '吴', qun: '群', shen: '神', jin: '晋' };
  const PAGE_SIZE = 40;

  // Build ordered list of hero packs and card packs dynamically from loaded datasets
  const HERO_PACKS = [];
  const heroPackSeen = new Map();
  HEROES.forEach((h) => {
    const pid = h.packId || 'other';
    if (!heroPackSeen.has(pid)) {
      const entry = { id: pid, label: h.pack || pid, count: 0 };
      heroPackSeen.set(pid, entry);
      HERO_PACKS.push(entry);
    }
    heroPackSeen.get(pid).count++;
  });

  const CARD_PACKS = [];
  const cardPackSeen = new Map();
  CARDS.forEach((c) => {
    const pid = c.packId || 'other';
    if (!cardPackSeen.has(pid)) {
      const entry = { id: pid, label: c.pack || pid, count: 0 };
      cardPackSeen.set(pid, entry);
      CARD_PACKS.push(entry);
    }
    cardPackSeen.get(pid).count++;
  });

  // Resolve quick flagship Lord buttons (including 界/谋 classics) from actual loaded HEROES
  const FLAGSHIP_LORD_NAMES = ['曹操', '刘备', '孙权', '张角', '孙策', '袁绍', '界曹操', '界刘备', '界孙权', '曹丕'];
  const FLAGSHIP_LORDS = FLAGSHIP_LORD_NAMES
    .map((name) => HEROES.find((h) => h.name === name))
    .filter(Boolean);

  const STORAGE_FAVS = 'sgs_favorites_v1';
  const STORAGE_REC = 'sgs_recommender_v1';

  const state = {
    tab: 'heroes',
    query: '',
    heroFilter: 'all',
    heroPack: 'all',
    heroVisible: PAGE_SIZE,
    cardFilter: 'all',
    cardPack: 'all',
    ruleFilter: 'all',
    rulePlayerCount: 8,
    favorites: loadFavorites(),
    calc: {
      players: 8,
      mySeat: 1,
      targetSeat: 3,
      hasMinusOne: false,
      targetPlusOne: false,
      weaponRange: 1
    },
    rec: loadRecState(),
    lordQuery: '',
    candidateQuery: ''
  };

  // DOM references
  const searchWrap = document.getElementById('search-wrap');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const filterBar = document.getElementById('filter-bar');
  const resultMeta = document.getElementById('result-meta');
  const contentArea = document.getElementById('content-area');
  const headerSubtitle = document.getElementById('header-subtitle');
  const detailModal = document.getElementById('detail-modal');
  const modalBody = document.getElementById('modal-body');
  const toastEl = document.getElementById('toast');
  const shareAppBtn = document.getElementById('share-app-btn');
  const navItems = Array.from(document.querySelectorAll('.nav-item'));

  let toastTimer = null;

  function loadFavorites() {
    try {
      const raw = localStorage.getItem(STORAGE_FAVS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_FAVS, JSON.stringify(state.favorites));
    } catch {
      // Ignore storage quota / private mode failures
    }
  }

  function loadRecState() {
    const defaults = {
      role: 'rebel',
      lordHeroId: 'caocao',
      playerCount: 8,
      seat: 2,
      packScope: 'popular',
      styles: [],
      difficulty: 'any',
      candidateIds: []
    };
    try {
      const raw = localStorage.getItem(STORAGE_REC);
      if (!raw) return defaults;
      return { ...defaults, ...JSON.parse(raw) };
    } catch {
      return defaults;
    }
  }

  function saveRecState() {
    try {
      localStorage.setItem(STORAGE_REC, JSON.stringify(state.rec));
    } catch {
      // Ignore storage errors
    }
  }

  function esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.add('hidden'), 2200);
  }

  function copyLink(url, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(
        () => showToast(successMsg),
        () => fallbackCopy(url, successMsg)
      );
    } else {
      fallbackCopy(url, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch {
      showToast('请从浏览器地址栏复制链接分享');
    }
    document.body.removeChild(ta);
  }

  function renderHpDots(hp) {
    const dotCount = Math.min(5, Math.max(1, hp));
    let dots = '';
    for (let i = 0; i < dotCount; i++) {
      dots += '<span class="hp-dot" aria-hidden="true"></span>';
    }
    return `<span class="hp-dots" aria-label="${hp}体力">${dots}<span class="hp-text">${hp}血</span></span>`;
  }

  function renderStars(count) {
    return '★'.repeat(count) + '☆'.repeat(Math.max(0, 5 - count));
  }

  function difficultyBadge(diff) {
    const label = REC.DIFFICULTY_LABELS[diff] || '进阶';
    return `<span class="diff-pill diff-${diff}">${label}</span>`;
  }

  function toggleFavorite(heroId, event) {
    if (event) event.stopPropagation();
    const idx = state.favorites.indexOf(heroId);
    if (idx >= 0) {
      state.favorites.splice(idx, 1);
      showToast('已取消收藏');
    } else {
      state.favorites.push(heroId);
      showToast('已加入收藏');
    }
    saveFavorites();
    renderMain();
  }

  // Smart hero search scoring (exact name > prefix > contains > pinyin > skill text)
  function scoreHeroMatch(hero, q) {
    if (!q) return 1;
    const name = hero.name.toLowerCase();
    if (name === q) return 100;
    if (name.startsWith(q)) return 85;
    if (name.includes(q)) return 75;
    const py = (hero.pinyin || '').toLowerCase();
    if (py.split(' ').includes(q)) return 70;
    if (py.includes(q)) return 55;
    const title = (hero.title || '').toLowerCase();
    if (title.includes(q)) return 45;
    const skillNames = hero.skills.map((s) => s.name.toLowerCase()).join(' ');
    if (skillNames.includes(q)) return 40;
    const meta = `${FACTION_LABEL[hero.faction] || ''} ${hero.pack || ''} ${hero.subpack || ''}`.toLowerCase();
    if (meta.includes(q)) return 30;
    const skillDesc = hero.skills.map((s) => s.desc.toLowerCase()).join(' ');
    if (skillDesc.includes(q)) return 15;
    return 0;
  }

  // ==================== Header & Tabs ====================
  function switchTab(tab, updateHash = true) {
    state.tab = tab;
    state.query = '';
    state.heroVisible = PAGE_SIZE;
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');

    navItems.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    if (tab === 'heroes') {
      headerSubtitle.textContent = `收录 ${HEROES.length} 位官方武将 · 涵盖 ${HERO_PACKS.length} 大扩展包`;
      searchInput.placeholder = '搜武将(界徐盛/谋黄忠)、首字母(zgl)、技能名…';
      searchWrap.classList.remove('hidden');
      filterBar.classList.remove('hidden');
    } else if (tab === 'recommend') {
      headerSubtitle.textContent = '按主公 · 身份 · 座位 · 扩展包智能选将';
      searchWrap.classList.add('hidden');
      filterBar.classList.add('hidden');
    } else if (tab === 'cards') {
      headerSubtitle.textContent = `标准 / 军争 / 应变 / 用间 / 国战等 ${CARDS.length} 种卡牌`;
      searchInput.placeholder = '搜卡牌名(冰杀/洞烛/木牛)、首字母或效果…';
      searchWrap.classList.remove('hidden');
      filterBar.classList.remove('hidden');
    } else if (tab === 'rules') {
      headerSubtitle.textContent = '身份配比 · 回合流程 · 距离计算 · 高频FAQ';
      searchInput.placeholder = '搜索争议问题，如：铁索、无懈、距离、判定…';
      searchWrap.classList.remove('hidden');
      filterBar.classList.remove('hidden');
    }

    if (updateHash && !window.location.hash.startsWith('#hero=') && !window.location.hash.startsWith('#card=')) {
      history.replaceState(null, '', `#tab=${tab}`);
    }

    renderFilterBar();
    renderMain();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderFilterBar() {
    let chips = [];
    let current = 'all';
    if (state.tab === 'heroes') {
      current = state.heroFilter;
      chips = [
        { id: 'all', label: `全部` },
        { id: 'fav', label: `收藏 ★ (${state.favorites.length})` },
        { id: 'wei', label: '魏' },
        { id: 'shu', label: '蜀' },
        { id: 'wu', label: '吴' },
        { id: 'qun', label: '群' },
        { id: 'shen', label: '神' },
        { id: 'jin', label: '晋' }
      ];
    } else if (state.tab === 'cards') {
      current = state.cardFilter;
      chips = [
        { id: 'all', label: '全部' },
        { id: 'basic', label: '基本牌' },
        { id: 'trick', label: '普通锦囊' },
        { id: 'delay', label: '延时锦囊' },
        { id: 'weapon', label: '武器' },
        { id: 'armor', label: '防具' },
        { id: 'horse', label: '坐骑' },
        { id: 'treasure', label: '宝物' }
      ];
    } else if (state.tab === 'rules') {
      current = state.ruleFilter;
      chips = [
        { id: 'all', label: '全部速查' },
        { id: 'roles', label: '身份配置' },
        { id: 'distance', label: '距离计算器' },
        { id: 'phases', label: '回合流程' },
        { id: 'faq', label: '争议FAQ' }
      ];
    } else {
      filterBar.innerHTML = '';
      return;
    }

    filterBar.innerHTML = chips
      .map(
        (c) =>
          `<button class="filter-chip ${c.id === current ? 'active' : ''}" data-filter="${c.id}" type="button">${esc(c.label)}</button>`
      )
      .join('');
  }

  function renderMain() {
    if (state.tab === 'heroes') {
      renderHeroesTab();
    } else if (state.tab === 'recommend') {
      renderRecommendTab();
    } else if (state.tab === 'cards') {
      renderCardsTab();
    } else if (state.tab === 'rules') {
      renderRulesTab();
    }
  }

  // ==================== Tab 1: Heroes ====================
  function renderHeroesTab() {
    const q = state.query.trim().toLowerCase();
    const scored = [];
    for (let i = 0; i < HEROES.length; i++) {
      const h = HEROES[i];
      if (state.heroFilter === 'fav' && !state.favorites.includes(h.id)) continue;
      if (['wei', 'shu', 'wu', 'qun', 'shen', 'jin'].includes(state.heroFilter) && h.faction !== state.heroFilter) continue;
      if (state.heroPack !== 'all' && h.packId !== state.heroPack) continue;
      const sc = scoreHeroMatch(h, q);
      if (sc > 0) scored.push({ hero: h, score: sc, idx: i });
    }
    if (q) {
      scored.sort((a, b) => b.score - a.score || a.idx - b.idx);
    }

    const total = scored.length;
    const shown = scored.slice(0, state.heroVisible);
    const remaining = total - shown.length;

    resultMeta.innerHTML = `<span>共匹配 ${total} 位武将</span><span>点击查看完整技能与详情</span>`;

    const packSelectHtml = `
      <div class="subfilter-row">
        <select id="hero-pack-select" class="subfilter-select" aria-label="按扩展包筛选武将">
          <option value="all" ${state.heroPack === 'all' ? 'selected' : ''}>全部扩展包（${HEROES.length} 位官方武将）</option>
          ${HERO_PACKS.map(
            (p) =>
              `<option value="${p.id}" ${state.heroPack === p.id ? 'selected' : ''}>${esc(p.label)}（${p.count}位）</option>`
          ).join('')}
        </select>
      </div>
    `;

    if (total === 0) {
      contentArea.innerHTML =
        packSelectHtml +
        `<div class="empty-state">${
          state.heroFilter === 'fav'
            ? '还没有收藏武将，点击卡片右上角 ☆ 即可快速收藏本局常用武将。'
            : '没有找到匹配的武将，试试切换扩展包为「全部」或搜汉字/拼音首字母。'
        }</div>`;
      return;
    }

    const cardsHtml = shown
      .map(({ hero }) => {
        const isFav = state.favorites.includes(hero.id);
        const skillsHtml = hero.skills
          .slice(0, 3)
          .map(
            (s) =>
              `<div class="skill-preview-line"><span class="skill-name-inline">【${esc(s.name)}】</span>${esc(s.desc)}</div>`
          )
          .join('');
        const extraSkills =
          hero.skills.length > 3
            ? `<div class="skill-preview-line" style="color:var(--ink-muted);">… 还有 ${hero.skills.length - 3} 个技能，点击查看全部</div>`
            : '';
        return `
          <article class="hero-card" data-hero-id="${hero.id}">
            <div class="hero-card-head">
              <div class="hero-id-group">
                <div class="faction-badge faction-${hero.faction}">${FACTION_LABEL[hero.faction] || '群'}</div>
                <div>
                  <div class="hero-name-row">
                    <span class="hero-name">${esc(hero.name)}</span>
                    ${hero.title ? `<span class="hero-title">${esc(hero.title)}</span>` : ''}
                  </div>
                  <div class="hero-meta-row">
                    ${renderHpDots(hero.hp)}
                    <span class="pack-pill">${esc(hero.subpack || hero.pack)}</span>
                    ${difficultyBadge(hero.difficulty)}
                  </div>
                </div>
              </div>
              <button class="star-btn ${isFav ? 'starred' : ''}" data-star-hero="${hero.id}" type="button" aria-label="收藏${esc(hero.name)}">
                ${isFav ? '★' : '☆'}
              </button>
            </div>
            <div class="hero-skills-preview">${skillsHtml}${extraSkills}</div>
          </article>
        `;
      })
      .join('');

    const loadMoreHtml =
      remaining > 0
        ? `<button id="load-more-heroes-btn" class="load-more-btn" type="button">加载更多武将（还有 ${remaining} 位）</button>`
        : '';

    contentArea.innerHTML = packSelectHtml + cardsHtml + loadMoreHtml;
  }

  // ==================== Tab 2: Smart Hero Recommender ====================
  function renderRecommendTab() {
    resultMeta.innerHTML = '';
    const r = state.rec;
    if (r.role === 'lord') {
      r.seat = 1;
    } else if (r.seat < 2 || r.seat > r.playerCount) {
      r.seat = 2;
    }

    const seatCtx = REC.getSeatContext(r.playerCount, r.seat, r.role);
    const currentLord = HEROES.find((h) => h.id === r.lordHeroId);

    let seatButtonsHtml = '';
    if (r.role === 'lord') {
      seatButtonsHtml = `<button class="seat-btn active" type="button" disabled>1号位（主公）</button>`;
    } else {
      for (let s = 2; s <= r.playerCount; s++) {
        const tag = s === 2 ? '2·下家' : s === r.playerCount ? `${s}·上家` : `${s}号`;
        seatButtonsHtml += `<button class="seat-btn ${r.seat === s ? 'active' : ''}" data-rec-seat="${s}" type="button">${tag}</button>`;
      }
    }

    const lordSectionHtml =
      r.role === 'lord'
        ? ''
        : `
      <div>
        <div class="rec-section-title">
          <span>2. 当前主公武将</span>
          <span class="rec-hint">当前已选：${currentLord ? esc(currentLord.name) : '未指定'}</span>
        </div>
        <div class="chip-wrap" style="margin-bottom: 8px;">
          ${FLAGSHIP_LORDS.map(
            (lh) =>
              `<button class="opt-chip ${r.lordHeroId === lh.id ? 'active' : ''}" data-rec-lord="${lh.id}" type="button">${esc(lh.name)}</button>`
          ).join('')}
        </div>
        <div class="candidate-input-wrap">
          <input
            id="lord-search-input"
            class="candidate-input"
            type="text"
            autocomplete="off"
            value="${esc(state.lordQuery)}"
            placeholder="或搜索任意主公武将（如 谋曹操、刘禅、董卓、神曹操…）"
          />
          <div id="lord-dropdown" class="candidate-dropdown hidden"></div>
        </div>
      </div>
    `;

    contentArea.innerHTML = `
      <div class="rec-panel">
        <div>
          <div class="rec-section-title">
            <span>1. 我的身份与本局人数</span>
            <select id="rec-players-select" class="select-input" style="width: auto; height: 30px; font-size: 12.5px;" aria-label="本局人数">
              ${[4, 5, 6, 7, 8, 9, 10]
                .map((n) => `<option value="${n}" ${r.playerCount === n ? 'selected' : ''}>${n}人局</option>`)
                .join('')}
            </select>
          </div>
          <div class="role-picker">
            ${['lord', 'loyalist', 'rebel', 'renegade']
              .map(
                (roleKey) =>
                  `<button class="role-btn ${r.role === roleKey ? 'active' : ''}" data-role="${roleKey}" type="button">${REC.ROLE_LABELS[roleKey]}</button>`
              )
              .join('')}
          </div>
        </div>

        ${lordSectionHtml}

        <div>
          <div class="rec-section-title">
            <span>${r.role === 'lord' ? '2.' : '3.'} 我的座位号</span>
            <span class="rec-hint">1号位为主公，逆时针数</span>
          </div>
          <div class="seat-pills">${seatButtonsHtml}</div>
          <div class="seat-context-box">
            <strong>${esc(seatCtx.label)}</strong>
            <span>${esc(seatCtx.summary)}</span>
          </div>
        </div>

        <div>
          <div class="rec-section-title">
            <span>${r.role === 'lord' ? '3.' : '4.'} 本局扩展包范围</span>
            <span class="rec-hint">候选对比模式始终支持全库</span>
          </div>
          <div class="chip-wrap">
            ${Object.entries(REC.PACK_SCOPES)
              .map(
                ([key, cfg]) =>
                  `<button class="opt-chip ${(r.packScope || 'popular') === key ? 'active' : ''}" data-rec-scope="${key}" type="button">${esc(cfg.label)}</button>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <div class="rec-section-title">
            <span>${r.role === 'lord' ? '4.' : '5.'} 偏好打法风格（可多选）</span>
            ${r.styles.length > 0 ? '<button id="clear-styles-btn" class="text-link-btn" type="button">不限</button>' : '<span class="rec-hint">未选表示不限</span>'}
          </div>
          <div class="chip-wrap">
            ${Object.entries(REC.STYLE_LABELS)
              .map(
                ([key, label]) =>
                  `<button class="opt-chip ${r.styles.includes(key) ? 'active' : ''}" data-rec-style="${key}" type="button">${label}</button>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <div class="rec-section-title">
            <span>${r.role === 'lord' ? '5.' : '6.'} 操作难度偏好</span>
          </div>
          <div class="chip-wrap">
            ${[
              { val: 'any', label: '不限难度' },
              { val: '1', label: '新手友好 ★' },
              { val: '2', label: '进阶策略 ★★' },
              { val: '3', label: '高手操作 ★★★' }
            ]
              .map(
                (d) =>
                  `<button class="opt-chip ${String(r.difficulty) === d.val ? 'active' : ''}" data-rec-diff="${d.val}" type="button">${d.label}</button>`
              )
              .join('')}
          </div>
        </div>

        <div class="candidate-box">
          <div class="rec-section-title">
            <span>可选：对比我手头抽到的候选武将</span>
            ${r.candidateIds.length > 0 ? '<button id="clear-candidates-btn" class="text-link-btn" type="button">清空候选</button>' : '<span class="rec-hint">可搜全部 1961 位武将</span>'}
          </div>
          <div class="candidate-input-wrap">
            <input
              id="candidate-search-input"
              class="candidate-input"
              type="text"
              autocomplete="off"
              value="${esc(state.candidateQuery)}"
              placeholder="输入抽到的武将名或首字母（如 界徐盛、谋黄忠、zgl）…"
            />
            <div id="candidate-dropdown" class="candidate-dropdown hidden"></div>
          </div>
          <div id="selected-candidates" class="selected-candidates"></div>
        </div>
      </div>

      <div id="rec-results-wrap" style="display:flex;flex-direction:column;gap:10px;"></div>
    `;

    renderLordDropdown();
    renderCandidateSection();
    renderRecommendResults();
  }

  function renderLordDropdown() {
    const dropdown = document.getElementById('lord-dropdown');
    if (!dropdown) return;
    const q = state.lordQuery.trim().toLowerCase();
    if (!q) {
      dropdown.classList.add('hidden');
      dropdown.innerHTML = '';
      return;
    }
    const matches = HEROES
      .map((h) => ({ h, sc: scoreHeroMatch(h, q) }))
      .filter((x) => x.sc >= 45)
      .sort((a, b) => b.sc - a.sc)
      .slice(0, 6);

    dropdown.classList.remove('hidden');
    if (matches.length === 0) {
      dropdown.innerHTML = '<div class="candidate-option" style="color:var(--ink-muted);cursor:default;">未找到匹配主公武将</div>';
      return;
    }
    dropdown.innerHTML = matches
      .map(
        ({ h }) => `
        <button class="candidate-option" data-pick-lord="${h.id}" type="button">
          <span><strong>${esc(h.name)}</strong> · ${FACTION_LABEL[h.faction] || '群'} · ${h.hp}血 · ${esc(h.pack)}</span>
          <span style="color:var(--crimson);font-size:12px;font-weight:700;">设为主公</span>
        </button>
      `
      )
      .join('');
  }

  function renderCandidateSection() {
    const dropdown = document.getElementById('candidate-dropdown');
    const selectedWrap = document.getElementById('selected-candidates');
    if (!dropdown || !selectedWrap) return;

    const q = state.candidateQuery.trim().toLowerCase();
    if (q) {
      const matches = HEROES
        .filter((h) => {
          if (state.rec.role !== 'lord' && h.id === state.rec.lordHeroId) return false;
          if (state.rec.candidateIds.includes(h.id)) return false;
          return true;
        })
        .map((h) => ({ h, sc: scoreHeroMatch(h, q) }))
        .filter((x) => x.sc >= 45)
        .sort((a, b) => b.sc - a.sc)
        .slice(0, 6);

      dropdown.classList.remove('hidden');
      if (matches.length > 0) {
        dropdown.innerHTML = matches
          .map(
            ({ h }) => `
            <button class="candidate-option" data-add-candidate="${h.id}" type="button">
              <span><strong>${esc(h.name)}</strong> · ${FACTION_LABEL[h.faction] || '群'} · ${h.hp}血 · ${esc(h.pack)}</span>
              <span style="color:var(--crimson);font-size:12px;font-weight:700;">+ 加入对比</span>
            </button>
          `
          )
          .join('');
      } else {
        dropdown.innerHTML = `<div class="candidate-option" style="color:var(--ink-muted);cursor:default;">未找到可添加的武将</div>`;
      }
    } else {
      dropdown.classList.add('hidden');
      dropdown.innerHTML = '';
    }

    selectedWrap.innerHTML = state.rec.candidateIds
      .map((id) => {
        const h = HEROES.find((item) => item.id === id);
        if (!h) return '';
        return `
          <span class="cand-chip">
            ${esc(h.name)}（${esc(h.pack)}）
            <button class="cand-remove" data-remove-candidate="${h.id}" type="button" aria-label="移除${esc(h.name)}">✕</button>
          </span>
        `;
      })
      .join('');
  }

  function renderRecommendResults() {
    const wrap = document.getElementById('rec-results-wrap');
    if (!wrap) return;

    const output = REC.recommend(HEROES, state.rec);
    const titleText = output.isCandidateMode
      ? `你的候选武将推荐排序（${output.results.length}选1）`
      : `当前局势推荐 Top ${output.results.length}（池内 ${output.poolSize} 位）`;

    const cardsHtml = output.results
      .map((item, index) => {
        const h = item.hero;
        const rank = index + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        const reasonsHtml = [
          ...item.pros.map((p) => `<div class="reason-item reason-pro">✓ ${esc(p)}</div>`),
          ...item.warns.map((w) => `<div class="reason-item reason-warn">! ${esc(w)}</div>`)
        ].join('');

        return `
          <article class="rec-card ${rank === 1 ? 'top-pick' : ''}" data-hero-id="${h.id}">
            <div class="rec-card-top">
              <div class="rec-left">
                <div class="rank-badge ${rankClass}">${rank === 1 ? '★' : rank}</div>
                <div class="faction-badge faction-${h.faction}">${FACTION_LABEL[h.faction] || '群'}</div>
                <div>
                  <div class="hero-name-row">
                    <span class="hero-name">${esc(h.name)}</span>
                    ${rank === 1 ? '<span class="skill-tag">本局首选</span>' : ''}
                  </div>
                  <div class="hero-meta-row">
                    ${renderHpDots(h.hp)}
                    <span class="pack-pill">${esc(h.pack)}</span>
                    ${difficultyBadge(h.difficulty)}
                  </div>
                </div>
              </div>
              <div class="score-pill">
                <span class="score-num tier-${item.tierCode}">${item.score}</span>
                <span class="score-tier tier-${item.tierCode}">${item.tier}</span>
              </div>
            </div>
            <div class="reason-list">${reasonsHtml}</div>
          </article>
        `;
      })
      .join('');

    wrap.innerHTML = `
      <div class="rec-results-header">
        <h2>${titleText}</h2>
        <span class="rec-hint">点击卡片查看技能详情</span>
      </div>
      ${cardsHtml || '<div class="empty-state">请至少选择1位非主公武将进行对比。</div>'}
    `;
  }

  // ==================== Tab 3: Cards ====================
  function renderCardsTab() {
    const q = state.query.trim().toLowerCase();
    const list = CARDS.filter((c) => {
      if (state.cardFilter !== 'all' && c.category !== state.cardFilter) return false;
      if (state.cardPack !== 'all' && c.packId !== state.cardPack) return false;
      if (!q) return true;
      const hay = `${c.name} ${c.pinyin || ''} ${c.subtype} ${c.pack} ${c.effect} ${(c.faq || []).join(' ')}`.toLowerCase();
      return hay.includes(q);
    });

    resultMeta.innerHTML = `<span>共找到 ${list.length} 种卡牌</span><span>点击查看完整效果与结算</span>`;

    const packSelectHtml = `
      <div class="subfilter-row">
        <select id="card-pack-select" class="subfilter-select" aria-label="按扩展包筛选卡牌">
          <option value="all" ${state.cardPack === 'all' ? 'selected' : ''}>全部官方牌堆（${CARDS.length} 种卡牌）</option>
          ${CARD_PACKS.map(
            (p) =>
              `<option value="${p.id}" ${state.cardPack === p.id ? 'selected' : ''}>${esc(p.label)}（${p.count}种）</option>`
          ).join('')}
        </select>
      </div>
    `;

    if (list.length === 0) {
      contentArea.innerHTML =
        packSelectHtml +
        '<div class="empty-state">没有找到匹配的卡牌，试试切换牌堆为「全部」或搜「冰杀」、「洞烛」、「木牛」、「明光铠」。</div>';
      return;
    }

    contentArea.innerHTML =
      packSelectHtml +
      list
        .map(
          (card) => `
        <article class="card-item" data-card-id="${card.id}">
          <div class="card-item-head">
            <div class="card-title-group">
              <span class="cat-badge cat-${card.category}">${esc(card.subtype)}</span>
              <span class="card-name">${esc(card.name)}</span>
            </div>
            ${card.range ? `<span class="range-badge">范围 ${card.range}</span>` : `<span class="pack-pill">${esc(card.pack)}</span>`}
          </div>
          <p class="card-effect-preview">${esc(card.effect)}</p>
        </article>
      `
        )
        .join('');
  }

  // ==================== Tab 4: Rules, Distance Calc & FAQ ====================
  function computeDistance() {
    const { players, mySeat, targetSeat, hasMinusOne, targetPlusOne, weaponRange } = state.calc;
    const rawDiff = Math.abs(mySeat - targetSeat);
    const seatDist = Math.min(rawDiff, players - rawDiff);
    if (seatDist === 0) {
      return { seatDist: 0, finalDist: 0, canSha: false, canShun: false, sameSeat: true };
    }
    const modified = seatDist - (hasMinusOne ? 1 : 0) + (targetPlusOne ? 1 : 0);
    const finalDist = Math.max(1, modified);
    return {
      seatDist,
      finalDist,
      canSha: finalDist <= weaponRange,
      canShun: finalDist <= 1,
      sameSeat: false
    };
  }

  function renderRulesTab() {
    const q = state.query.trim().toLowerCase();
    const filter = state.ruleFilter;
    const showRoles = !q && (filter === 'all' || filter === 'roles');
    const showDist = !q && (filter === 'all' || filter === 'distance');
    const showPhases = !q && (filter === 'all' || filter === 'phases');
    const showFaq = Boolean(q) || filter === 'all' || filter === 'faq';

    const matchedFaqs = (RULES.faqs || []).filter((f) => {
      if (!q) return true;
      return `${f.q} ${f.tag} ${f.a}`.toLowerCase().includes(q);
    });

    resultMeta.innerHTML = q
      ? `<span>找到 ${matchedFaqs.length} 条相关结算FAQ</span>`
      : '<span>面杀必备速查手册</span><span>离线可用</span>';

    const blocks = [];

    if (showRoles) {
      const cfg = RULES.roleConfigs.find((c) => c.players === state.rulePlayerCount) || RULES.roleConfigs[4];
      blocks.push(`
        <section class="rule-card">
          <h2>身份局人数配比</h2>
          <div class="player-count-pills">
            ${RULES.roleConfigs
              .map(
                (c) =>
                  `<button class="mini-pill ${c.players === state.rulePlayerCount ? 'active' : ''}" data-rule-players="${c.players}" type="button">${c.players}人</button>`
              )
              .join('')}
          </div>
          <div class="role-grid">
            <div class="role-stat role-lord"><span class="role-stat-label">主公</span><span class="role-stat-num">${cfg.lord}</span></div>
            <div class="role-stat role-loyalist"><span class="role-stat-label">忠臣</span><span class="role-stat-num">${cfg.loyalist}</span></div>
            <div class="role-stat role-rebel"><span class="role-stat-label">反贼</span><span class="role-stat-num">${cfg.rebel}</span></div>
            <div class="role-stat role-renegade"><span class="role-stat-label">内奸</span><span class="role-stat-num">${cfg.renegade}</span></div>
          </div>
          <div class="note-box">${esc(cfg.note)}</div>
          <div class="detail-section">
            <h3>击杀奖惩</h3>
            <ul class="faq-bullets">
              ${RULES.killRewards.map((k) => `<li>${esc(k)}</li>`).join('')}
            </ul>
          </div>
        </section>
      `);
    }

    if (showDist) {
      const c = state.calc;
      const dist = computeDistance();
      blocks.push(`
        <section class="rule-card">
          <h2>面杀距离与范围计算器</h2>
          <div class="calc-grid">
            <div>
              <label class="field-label" for="calc-players">存活总人数</label>
              <select id="calc-players" class="select-input">
                ${[2, 3, 4, 5, 6, 7, 8, 9, 10]
                  .map((n) => `<option value="${n}" ${c.players === n ? 'selected' : ''}>${n}人</option>`)
                  .join('')}
              </select>
            </div>
            <div>
              <label class="field-label" for="calc-weapon">我的武器攻击范围</label>
              <select id="calc-weapon" class="select-input">
                ${[
                  { v: 1, l: '1（无武器 / 诸葛连弩）' },
                  { v: 2, l: '2（青釭/雌雄/寒冰/古锭/倚天）' },
                  { v: 3, l: '3（青龙/丈八/贯石斧/乌铁/三尖）' },
                  { v: 4, l: '4（方天画戟/朱雀/五行鹤翎扇）' },
                  { v: 5, l: '5（麒麟弓）' }
                ]
                  .map((w) => `<option value="${w.v}" ${c.weaponRange === w.v ? 'selected' : ''}>${w.l}</option>`)
                  .join('')}
              </select>
            </div>
            <div>
              <label class="field-label" for="calc-my-seat">我的座位号</label>
              <select id="calc-my-seat" class="select-input">
                ${Array.from({ length: c.players }, (_, idx) => idx + 1)
                  .map((n) => `<option value="${n}" ${c.mySeat === n ? 'selected' : ''}>${n}号位</option>`)
                  .join('')}
              </select>
            </div>
            <div>
              <label class="field-label" for="calc-target-seat">目标座位号</label>
              <select id="calc-target-seat" class="select-input">
                ${Array.from({ length: c.players }, (_, idx) => idx + 1)
                  .map((n) => `<option value="${n}" ${c.targetSeat === n ? 'selected' : ''}>${n}号位</option>`)
                  .join('')}
              </select>
            </div>
          </div>

          <div class="toggle-row">
            <button class="toggle-chip ${c.hasMinusOne ? 'active' : ''}" data-calc-toggle="hasMinusOne" type="button">我有 -1马 / 马术</button>
            <button class="toggle-chip ${c.targetPlusOne ? 'active' : ''}" data-calc-toggle="targetPlusOne" type="button">目标有 +1马</button>
          </div>

          <div class="calc-result">
            ${
              dist.sameSeat
                ? '<div class="calc-headline">请选择两个不同的座位号</div>'
                : `
              <div class="calc-headline">你到目标的距离：${dist.finalDist}（基础座位距 ${dist.seatDist}）</div>
              <div class="reach-badges">
                <span class="reach-pill ${dist.canSha ? 'reach-ok' : 'reach-no'}">【杀】${dist.canSha ? '可以打到' : '够不到'}</span>
                <span class="reach-pill ${dist.canShun ? 'reach-ok' : 'reach-no'}">【顺手牵羊 / 兵粮】${dist.canShun ? '够得到' : '够不到'}</span>
                <span class="reach-pill reach-ok">【过拆 / 决斗 / 乐 / 火攻】无视距离</span>
              </div>
            `
            }
          </div>
        </section>
      `);
    }

    if (showPhases) {
      blocks.push(`
        <section class="rule-card">
          <h2>回合六阶段流程</h2>
          <div class="phase-list">
            ${RULES.turnPhases
              .map(
                (p) => `
              <div class="phase-item">
                <span class="phase-num">${p.step}</span>
                <div>
                  <div class="phase-name">${esc(p.name)}</div>
                  <div class="phase-desc">${esc(p.desc)}</div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </section>
      `);
    }

    if (showFaq) {
      blocks.push(`
        <section class="rule-card">
          <h2>面杀高频争议 FAQ（${matchedFaqs.length}条）</h2>
          ${
            matchedFaqs.length === 0
              ? '<div class="empty-state" style="padding:18px 0;">未找到匹配问题，换个关键词试试。</div>'
              : matchedFaqs
                  .map(
                    (f, idx) => `
              <details class="faq-item" ${q || idx === 0 ? 'open' : ''}>
                <summary>
                  <span>${esc(f.q)}</span>
                  <span class="faq-tag">${esc(f.tag)}</span>
                </summary>
                <div class="faq-answer">${esc(f.a)}</div>
              </details>
            `
                  )
                  .join('')
          }
        </section>
      `);
    }

    contentArea.innerHTML = blocks.join('');
  }

  // ==================== Detail Bottom Sheet ====================
  function openHeroModal(heroId) {
    const hero = HEROES.find((h) => h.id === heroId);
    if (!hero) return;
    const isFav = state.favorites.includes(hero.id);

    const skillsHtml = hero.skills
      .map(
        (s) => `
        <div class="skill-block">
          <div class="skill-block-head">
            <span class="skill-block-name">${esc(s.name)}</span>
            ${(s.tags || []).map((t) => `<span class="skill-tag">${esc(t)}</span>`).join('')}
          </div>
          <p class="skill-block-desc">${esc(s.desc)}</p>
        </div>
      `
      )
      .join('');

    const faqSectionHtml =
      hero.faq && hero.faq.length > 0
        ? `
      <div class="detail-section">
        <h3>结算要点与 FAQ</h3>
        <ul class="faq-bullets">
          ${hero.faq.map((line) => `<li>${esc(line)}</li>`).join('')}
        </ul>
      </div>
    `
        : '';

    modalBody.innerHTML = `
      <div class="modal-header-row">
        <div class="hero-id-group">
          <div class="faction-badge faction-${hero.faction}" style="width:42px;height:42px;font-size:20px;">${FACTION_LABEL[hero.faction] || '群'}</div>
          <div>
            <div class="hero-name-row">
              <span id="modal-title" class="hero-name" style="font-size:20px;">${esc(hero.name)}</span>
              ${hero.title ? `<span class="hero-title">${esc(hero.title)}</span>` : ''}
            </div>
            <div class="hero-meta-row">
              ${renderHpDots(hero.hp)}
              <span class="pack-pill">${esc(hero.subpack || hero.pack)}</span>
              ${difficultyBadge(hero.difficulty)}
            </div>
          </div>
        </div>
        <button id="modal-close-btn" class="modal-close-btn" type="button" aria-label="关闭">✕</button>
      </div>

      <div class="detail-section">
        <h3>武将技能</h3>
        ${skillsHtml}
      </div>

      <div class="detail-section">
        <h3>身份适应度</h3>
        <div class="suitability-grid">
          <div class="suit-box"><span class="suit-role">主公</span><span class="suit-stars">${renderStars(hero.roleRatings.lord)}</span></div>
          <div class="suit-box"><span class="suit-role">忠臣</span><span class="suit-stars">${renderStars(hero.roleRatings.loyalist)}</span></div>
          <div class="suit-box"><span class="suit-role">反贼</span><span class="suit-stars">${renderStars(hero.roleRatings.rebel)}</span></div>
          <div class="suit-box"><span class="suit-role">内奸</span><span class="suit-stars">${renderStars(hero.roleRatings.renegade)}</span></div>
        </div>
      </div>

      ${faqSectionHtml}

      <div class="detail-section">
        <h3>打法定位</h3>
        <div class="note-box">${esc(hero.tips)}</div>
      </div>

      <div class="modal-actions">
        <button id="modal-fav-btn" class="btn-secondary" data-fav-id="${hero.id}" type="button">
          ${isFav ? '★ 已收藏' : '☆ 收藏武将'}
        </button>
        <button id="modal-share-btn" class="btn-primary" data-share-hash="#hero=${hero.id}" type="button">
          复制武将链接
        </button>
      </div>
    `;

    showModal(`#hero=${hero.id}`);
  }

  function openCardModal(cardId) {
    const card = CARDS.find((c) => c.id === cardId);
    if (!card) return;

    const faqHtml =
      card.faq && card.faq.length > 0
        ? `
      <div class="detail-section">
        <h3>常见结算疑问</h3>
        <ul class="faq-bullets">
          ${card.faq.map((line) => `<li>${esc(line)}</li>`).join('')}
        </ul>
      </div>
    `
        : '';

    modalBody.innerHTML = `
      <div class="modal-header-row">
        <div>
          <div class="card-title-group" style="margin-bottom:6px;">
            <span class="cat-badge cat-${card.category}">${esc(card.subtype)}</span>
            ${card.range ? `<span class="range-badge">攻击范围 ${card.range}</span>` : `<span class="pack-pill">${esc(card.pack)}</span>`}
          </div>
          <div id="modal-title" class="hero-name" style="font-size:19px;">${esc(card.name)}</div>
        </div>
        <button id="modal-close-btn" class="modal-close-btn" type="button" aria-label="关闭">✕</button>
      </div>

      <div class="detail-section">
        <h3>所属扩展 / 使用时机</h3>
        <div class="note-box">${esc(card.pack)} · ${esc(card.timing)}</div>
      </div>

      <div class="detail-section">
        <h3>卡牌效果</h3>
        <div class="skill-block">
          <p class="skill-block-desc">${esc(card.effect)}</p>
        </div>
      </div>

      ${faqHtml}

      <div class="modal-actions">
        <button id="modal-share-btn" class="btn-primary" data-share-hash="#card=${card.id}" type="button">
          复制卡牌链接发到微信群
        </button>
      </div>
    `;

    showModal(`#card=${card.id}`);
  }

  function showModal(hash) {
    detailModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    if (hash) {
      history.replaceState(null, '', hash);
    }
  }

  function closeModal() {
    detailModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    history.replaceState(null, '', `#tab=${state.tab}`);
  }

  // ==================== Event Delegation ====================
  navItems.forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  searchInput.addEventListener('input', (e) => {
    state.query = e.target.value;
    state.heroVisible = PAGE_SIZE;
    clearSearchBtn.classList.toggle('hidden', !state.query);
    renderMain();
  });

  clearSearchBtn.addEventListener('click', () => {
    state.query = '';
    state.heroVisible = PAGE_SIZE;
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    renderMain();
    searchInput.focus();
  });

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;
    const val = btn.dataset.filter;
    if (state.tab === 'heroes') {
      state.heroFilter = val;
      state.heroVisible = PAGE_SIZE;
    } else if (state.tab === 'cards') {
      state.cardFilter = val;
    } else if (state.tab === 'rules') {
      state.ruleFilter = val;
    }
    renderFilterBar();
    renderMain();
  });

  shareAppBtn.addEventListener('click', () => {
    const cleanUrl = `${window.location.origin}${window.location.pathname}#tab=${state.tab}`;
    copyLink(cleanUrl, '已复制链接，直接发到微信即可打开！');
  });

  contentArea.addEventListener('click', (e) => {
    // Load more heroes pagination
    if (e.target.id === 'load-more-heroes-btn') {
      state.heroVisible += PAGE_SIZE;
      renderHeroesTab();
      return;
    }

    // Star toggle on hero card
    const starBtn = e.target.closest('[data-star-hero]');
    if (starBtn) {
      toggleFavorite(starBtn.dataset.starHero, e);
      renderFilterBar();
      return;
    }

    // Open hero detail (from Heroes tab or Recommend tab)
    const heroCard = e.target.closest('[data-hero-id]');
    if (heroCard) {
      openHeroModal(heroCard.dataset.heroId);
      return;
    }

    // Open card detail
    const cardItem = e.target.closest('[data-card-id]');
    if (cardItem) {
      openCardModal(cardItem.dataset.cardId);
      return;
    }

    // Rules tab player count pills
    const rulePlayersBtn = e.target.closest('[data-rule-players]');
    if (rulePlayersBtn) {
      state.rulePlayerCount = Number(rulePlayersBtn.dataset.rulePlayers);
      renderRulesTab();
      return;
    }

    // Distance calc toggles
    const calcToggle = e.target.closest('[data-calc-toggle]');
    if (calcToggle) {
      const key = calcToggle.dataset.calcToggle;
      state.calc[key] = !state.calc[key];
      renderRulesTab();
      return;
    }

    // Recommender role buttons
    const roleBtn = e.target.closest('[data-role]');
    if (roleBtn) {
      state.rec.role = roleBtn.dataset.role;
      if (state.rec.role === 'lord') {
        state.rec.seat = 1;
      } else if (state.rec.seat === 1) {
        state.rec.seat = 2;
      }
      saveRecState();
      renderRecommendTab();
      return;
    }

    // Recommender flagship lord quick buttons
    const lordBtn = e.target.closest('[data-rec-lord]');
    if (lordBtn) {
      state.rec.lordHeroId = lordBtn.dataset.recLord;
      state.rec.candidateIds = state.rec.candidateIds.filter((id) => id !== state.rec.lordHeroId);
      state.lordQuery = '';
      saveRecState();
      renderRecommendTab();
      return;
    }

    // Recommender searched lord pick
    const pickLord = e.target.closest('[data-pick-lord]');
    if (pickLord) {
      state.rec.lordHeroId = pickLord.dataset.pickLord;
      state.rec.candidateIds = state.rec.candidateIds.filter((id) => id !== state.rec.lordHeroId);
      state.lordQuery = '';
      saveRecState();
      renderRecommendTab();
      return;
    }

    // Recommender seat buttons
    const seatBtn = e.target.closest('[data-rec-seat]');
    if (seatBtn) {
      state.rec.seat = Number(seatBtn.dataset.recSeat);
      saveRecState();
      renderRecommendTab();
      return;
    }

    // Recommender pack scope
    const scopeBtn = e.target.closest('[data-rec-scope]');
    if (scopeBtn) {
      state.rec.packScope = scopeBtn.dataset.recScope;
      saveRecState();
      renderRecommendTab();
      return;
    }

    // Recommender playstyle chips (multi-select)
    const styleBtn = e.target.closest('[data-rec-style]');
    if (styleBtn) {
      const key = styleBtn.dataset.recStyle;
      const idx = state.rec.styles.indexOf(key);
      if (idx >= 0) state.rec.styles.splice(idx, 1);
      else state.rec.styles.push(key);
      saveRecState();
      renderRecommendTab();
      return;
    }

    if (e.target.id === 'clear-styles-btn') {
      state.rec.styles = [];
      saveRecState();
      renderRecommendTab();
      return;
    }

    // Recommender difficulty chips
    const diffBtn = e.target.closest('[data-rec-diff]');
    if (diffBtn) {
      const val = diffBtn.dataset.recDiff;
      state.rec.difficulty = val === 'any' ? 'any' : Number(val);
      saveRecState();
      renderRecommendTab();
      return;
    }

    // Candidate pool add / remove / clear
    const addCand = e.target.closest('[data-add-candidate]');
    if (addCand) {
      const id = addCand.dataset.addCandidate;
      if (!state.rec.candidateIds.includes(id)) {
        state.rec.candidateIds.push(id);
        saveRecState();
      }
      state.candidateQuery = '';
      const input = document.getElementById('candidate-search-input');
      if (input) input.value = '';
      renderCandidateSection();
      renderRecommendResults();
      return;
    }

    const remCand = e.target.closest('[data-remove-candidate]');
    if (remCand) {
      const id = remCand.dataset.removeCandidate;
      state.rec.candidateIds = state.rec.candidateIds.filter((x) => x !== id);
      saveRecState();
      renderCandidateSection();
      renderRecommendResults();
      return;
    }

    if (e.target.id === 'clear-candidates-btn') {
      state.rec.candidateIds = [];
      state.candidateQuery = '';
      saveRecState();
      renderRecommendTab();
      return;
    }
  });

  contentArea.addEventListener('change', (e) => {
    const id = e.target.id;
    if (id === 'hero-pack-select') {
      state.heroPack = e.target.value;
      state.heroVisible = PAGE_SIZE;
      renderHeroesTab();
    } else if (id === 'card-pack-select') {
      state.cardPack = e.target.value;
      renderCardsTab();
    } else if (id === 'rec-players-select') {
      state.rec.playerCount = Number(e.target.value);
      if (state.rec.role !== 'lord' && state.rec.seat > state.rec.playerCount) {
        state.rec.seat = state.rec.playerCount;
      }
      saveRecState();
      renderRecommendTab();
    } else if (id === 'calc-players') {
      state.calc.players = Number(e.target.value);
      state.calc.mySeat = Math.min(state.calc.mySeat, state.calc.players);
      state.calc.targetSeat = Math.min(state.calc.targetSeat, state.calc.players);
      renderRulesTab();
    } else if (id === 'calc-weapon') {
      state.calc.weaponRange = Number(e.target.value);
      renderRulesTab();
    } else if (id === 'calc-my-seat') {
      state.calc.mySeat = Number(e.target.value);
      renderRulesTab();
    } else if (id === 'calc-target-seat') {
      state.calc.targetSeat = Number(e.target.value);
      renderRulesTab();
    }
  });

  contentArea.addEventListener('input', (e) => {
    if (e.target.id === 'candidate-search-input') {
      state.candidateQuery = e.target.value;
      renderCandidateSection();
    } else if (e.target.id === 'lord-search-input') {
      state.lordQuery = e.target.value;
      renderLordDropdown();
    }
  });

  // Modal interactions
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal || e.target.closest('.sheet-handle-bar') || e.target.id === 'modal-close-btn') {
      closeModal();
      return;
    }
    if (e.target.id === 'modal-fav-btn') {
      const heroId = e.target.dataset.favId;
      toggleFavorite(heroId);
      renderFilterBar();
      openHeroModal(heroId);
      return;
    }
    if (e.target.id === 'modal-share-btn') {
      const hash = e.target.dataset.shareHash;
      const url = `${window.location.origin}${window.location.pathname}${hash}`;
      copyLink(url, '已复制直达链接，发到微信群即可直接打开！');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !detailModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Deep-link bootstrap
  function handleInitialHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#hero=')) {
      const heroId = hash.slice(6);
      switchTab('heroes', false);
      openHeroModal(heroId);
      return;
    }
    if (hash.startsWith('#card=')) {
      const cardId = hash.slice(6);
      switchTab('cards', false);
      openCardModal(cardId);
      return;
    }
    if (hash.startsWith('#tab=')) {
      const tab = hash.slice(5);
      if (['heroes', 'recommend', 'cards', 'rules'].includes(tab)) {
        switchTab(tab, false);
        return;
      }
    }
    switchTab('heroes', false);
  }

  // Register PWA service worker when supported
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  handleInitialHash();
})();
