window.__ModuleLoader__.load({
  id: '@local/model-vendor-selector',
  factory(require) {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const h = React.createElement;
    const NS = 'model-vendor-selector';
    const HIDDEN_KEY = 'model-vendor-selector:hidden';
    const PANEL_H = 540;

    const DICT = {
      en: {
        title: 'Dual-column model selector', vendor: 'Vendor', model: 'Model',
        loading: 'Loading models…', empty: 'No models available',
        failed: 'Some catalogs failed to load', selected: 'Selected',
        copy: 'Copy model name', copied: 'Copied', unavailable: 'Model catalog is unavailable',
        sessionInUse: 'This session is busy; try again in a moment',
        settings: 'Manage visibility', showAll: 'Show all',
        manageHint: 'Uncheck any group or model to hide it from both columns.',
        hiddenCount: 'Hidden', effort: 'Thinking effort',
        effortNone: 'This model has no thinking-effort levels',
        effortHint: 'Drag the slider to apply',
        sort: 'Order', sortDefault: 'Registered order',
        sortNameAsc: 'Name A→Z', sortNameDesc: 'Name Z→A',
        sortCountDesc: 'Most models', sortCountAsc: 'Fewest models',
      },
      zh: {
        title: '双列厂商模型选择器', vendor: '模型厂商', model: '模型',
        loading: '正在加载模型…', empty: '暂无可用模型',
        failed: '部分模型目录加载失败', selected: '已选',
        copy: '复制模型名称', copied: '已复制', unavailable: '模型目录不可用',
        sessionInUse: '当前会话正在写入，请稍后重试',
        settings: '管理显示', showAll: '全部显示',
        manageHint: '取消勾选即可隐藏对应分组或模型，两列中不再显示。',
        hiddenCount: '已隐藏', effort: '思考强度',
        effortNone: '该模型没有可选思考强度',
        effortHint: '拖动滑块即时生效',
        sort: '排序', sortDefault: '注册顺序',
        sortNameAsc: '名称升序', sortNameDesc: '名称降序',
        sortCountDesc: '模型多→少', sortCountAsc: '模型少→多',
      },
    };

    // 弹层内部抬起面：以主题容器底色为基底，混入 6% 主文字色，浅色得极淡灰、深色得略亮灰，不透明且跟随主题
    const RAISED_BG = 'color-mix(in srgb, var(--dsw-alias-label-primary) 6%, var(--dsw-alias-bg-layer-1))';

    const CSS = `
.mvs-root{font-family:inherit;font-size:13px;line-height:1.5}
.mvs-root button{font:inherit}
.mvs-flow{background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,transparent),transparent)}
.mvs-row:hover{background:${RAISED_BG}}
.mvs-rowsep{position:relative}
.mvs-rowsep::after{content:'';position:absolute;left:8px;right:8px;bottom:0;height:1px;opacity:.5;background:linear-gradient(90deg,transparent 0,color-mix(in srgb,var(--dsw-alias-border-l2) 80%,var(--dsw-alias-brand-primary)) 12%,color-mix(in srgb,var(--dsw-alias-border-l2) 80%,var(--dsw-alias-brand-primary)) 88%,transparent 100%)}
.mvs-row[aria-selected="true"]::after{display:none}
.mvs-rowsep:last-child::after{display:none}
.mvs-effort::before{content:'';position:absolute;left:8px;right:8px;top:0;height:1px;background:linear-gradient(90deg,transparent 0,color-mix(in srgb,var(--dsw-alias-border-l2) 55%,var(--dsw-alias-brand-primary)) 12%,color-mix(in srgb,var(--dsw-alias-border-l2) 55%,var(--dsw-alias-brand-primary)) 88%,transparent 100%)}
.mvs-tick:hover{background:${RAISED_BG};color:var(--dsw-alias-label-primary)}
.mvs-root .mvs-row:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.mvs-check{accent-color:var(--dsw-alias-brand-primary);width:14px;height:14px;cursor:pointer;flex:0 0 auto}
.mvs-range{position:absolute;left:0;top:50%;transform:translateY(-50%);width:100%;height:18px;margin:0;padding:0;-webkit-appearance:none;appearance:none;background:transparent;outline:none;cursor:pointer}
.mvs-range::-webkit-slider-runnable-track{height:18px;background:transparent;border:0}
.mvs-range::-moz-range-track{height:18px;background:transparent;border:0}
.mvs-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;box-sizing:border-box;width:14px;height:14px;margin-top:2px;border-radius:50%;background:var(--dsw-alias-bg-overlay);border:3px solid var(--mvs-accent,var(--dsw-alias-brand-primary));box-shadow:0 1px 3px rgba(0,0,0,.16);cursor:grab}
.mvs-range::-moz-range-thumb{box-sizing:border-box;width:14px;height:14px;border-radius:50%;background:var(--dsw-alias-bg-overlay);border:3px solid var(--mvs-accent,var(--dsw-alias-brand-primary));box-shadow:0 1px 3px rgba(0,0,0,.16);cursor:grab}
.mvs-range:focus-visible::-webkit-slider-thumb{outline:2px solid var(--mvs-accent,var(--dsw-alias-brand-primary));outline-offset:2px}
.mvs-range:disabled{cursor:not-allowed;opacity:.5}
`;

    const ACCENT_COLORS = [
      'var(--dsw-alias-brand-primary)',
      'var(--dsw-alias-state-success-primary)',
      'var(--dsw-alias-state-warn-primary)',
      'var(--dsw-alias-state-error-primary)',
      'var(--dsw-alias-label-secondary)',
      'var(--dsw-alias-label-primary)',
    ];
    const EFFORT_COLORS = [
      'var(--dsw-alias-state-success-primary)',
      'var(--dsw-alias-state-warn-primary)',
      'var(--dsw-alias-brand-primary)',
    ];
    const SORTS = ['default', 'nameAsc', 'nameDesc', 'countDesc', 'countAsc'];

    function groupColor(id) {
      const key = String(id || '');
      let n = 0;
      for (let i = 0; i < key.length; i++) n = (n * 31 + key.charCodeAt(i)) >>> 0;
      return ACCENT_COLORS[n % ACCENT_COLORS.length];
    }
    function effortAccent(r) {
      return EFFORT_COLORS[Math.min(EFFORT_COLORS.length - 1, Math.floor(r * EFFORT_COLORS.length))];
    }
    function byName(a, b) {
      return String(a.name).localeCompare(String(b.name), undefined, { sensitivity: 'base' });
    }
    function sortGroups(list, sort) {
      if (sort === 'default') return list.slice();
      const out = list.slice().sort(sort.indexOf('count') === 0
        ? (a, b) => a.models.length - b.models.length || byName(a, b)
        : byName);
      if (sort === 'nameDesc' || sort === 'countDesc') out.reverse();
      return out;
    }
    function sortModels(list, sort) {
      if (sort !== 'nameAsc' && sort !== 'nameDesc') return list;
      const out = list.slice().sort(byName);
      if (sort === 'nameDesc') out.reverse();
      return out;
    }

    const style = {
      trigger: {
        display: 'inline-flex', alignItems: 'center', alignSelf: 'center',
        flex: '0 0 auto', gap: 4, maxWidth: 260, minHeight: 22,
        padding: '0 6px', border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 7,
        background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)',
        cursor: 'pointer', font: 'inherit', fontSize: 12.5, lineHeight: '20px',
      },
      triggerOpen: { borderColor: 'var(--dsw-alias-brand-primary)' },
      triggerLocked: { opacity: .5, cursor: 'not-allowed' },
      triggerName: { flex: '0 1 auto', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 },
      triggerEffort: {
        flex: '0 0 auto', fontSize: 10.5, color: 'var(--dsw-alias-label-secondary)',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 72,
      },
      chevron: { flex: '0 0 auto', fontSize: 10, opacity: .6 },
      backdrop: { position: 'fixed', inset: 0, zIndex: 40 },
      popover: {
        position: 'fixed', zIndex: 41, display: 'flex', flexDirection: 'column',
        width: 600, maxWidth: 'calc(100vw - 32px)', height: PANEL_H,
        maxHeight: 'calc(100vh - 32px)', overflow: 'hidden',
        border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 12,
        background: 'var(--dsw-alias-bg-layer-1)', color: 'var(--dsw-alias-label-primary)',
        boxShadow: '0 8px 28px rgba(0, 0, 0, .14)',
        fontFamily: 'inherit', fontSize: 13, lineHeight: 1.5,
      },
      header: {
        display: 'flex', alignItems: 'center', gap: 9, flex: '0 0 auto',
        padding: '10px 14px 8px',
      },
      headerMark: {
        width: 3, height: 14, borderRadius: 2, flex: '0 0 auto',
        background: 'var(--dsw-alias-brand-primary)',
      },
      headerTitle: { fontSize: 13, fontWeight: 700, letterSpacing: '.02em' },
      headerSub: { fontSize: 11, color: 'var(--dsw-alias-label-secondary)' },
      gear: {
        marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 6px', borderRadius: 6, cursor: 'pointer', fontSize: 11.5,
        border: '1px solid transparent',
        background: 'transparent',
        color: 'var(--dsw-alias-label-secondary)',
      },
      gearActive: { color: 'var(--dsw-alias-brand-primary)' },
      flowStrip: { height: 1, flex: '0 0 1px' },
      body: { display: 'flex', flex: 1, minHeight: 0, padding: '10px 12px', gap: 12 },
      col: { display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 },
      colVendor: { flex: '3 1 0' },
      colModel: { flex: '4 1 0' },
      divider: { width: 1, alignSelf: 'stretch', background: 'var(--dsw-alias-border-l2)', opacity: .6 },
      title: {
        display: 'flex', alignItems: 'center', gap: 6, flex: '0 0 auto',
        fontSize: 10.5, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase',
        color: 'var(--dsw-alias-label-secondary)', padding: '0 4px 6px',
      },
      titleDot: { width: 6, height: 6, borderRadius: 2, flex: '0 0 auto' },
      countPill: {
        flex: '0 0 auto', fontSize: 10.5, fontWeight: 600, padding: '0 6px',
        borderRadius: 999, lineHeight: 1.7,
      },
      list: {
        flex: 1, minHeight: 0, overflowY: 'auto', padding: 2,
        borderRadius: 8,
      },
      row: {
        display: 'block', width: '100%', textAlign: 'left', padding: '5px 10px',
        border: 0, borderRadius: 7, marginBottom: 2,
        background: 'transparent', color: 'inherit', cursor: 'pointer', font: 'inherit',
      },
      rowActive: {
        background: RAISED_BG,
        color: 'var(--dsw-alias-brand-primary)',
      },
      rowName: {
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        fontWeight: 600, overflow: 'hidden', overflowWrap: 'anywhere',
      },
      rowId: {
        display: 'block', fontSize: 10.5, marginTop: 1,
        color: 'var(--dsw-alias-label-secondary)',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      },
      rowIdActive: { color: 'var(--dsw-alias-brand-primary)', opacity: .7 },
      vendorDot: {
        display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
        verticalAlign: 'middle', marginRight: 8, flex: '0 0 auto',
      },
      rowLine: { display: 'flex', alignItems: 'flex-start', gap: 6 },
      rowLineName: { flex: '1 1 auto', minWidth: 0 },
      rowBadge: { marginTop: 3 },
      badge: {
        display: 'inline-flex', alignItems: 'center', flex: '0 0 auto',
        fontSize: 9.5, fontWeight: 700, color: '#fff', letterSpacing: '.02em',
        lineHeight: '13px', height: 13, padding: '0 5px', borderRadius: 999,
        background: 'var(--dsw-alias-brand-primary)', whiteSpace: 'nowrap',
        maxWidth: 88, overflow: 'hidden',
      },
      badgeText: {
        minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      },
      badgeCompact: {
        fontSize: 9, lineHeight: '12px', height: 12, padding: '0 4px', maxWidth: 64,
      },
      badgeTone: {
        info: 'var(--dsw-alias-brand-primary)',
        success: 'var(--dsw-alias-state-success-primary)',
        warning: 'var(--dsw-alias-state-warn-primary)',
        danger: 'var(--dsw-alias-state-error-primary)',
        error: 'var(--dsw-alias-state-error-primary)',
      },
      notice: { padding: '10px 6px', color: 'var(--dsw-alias-label-secondary)' },
      effort: {
        position: 'relative', flex: '0 0 auto', padding: '9px 14px 10px',
      },
      effortHead: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 },
      effortLabel: {
        fontSize: 11, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase',
        color: 'var(--dsw-alias-label-secondary)',
      },
      effortValue: {
        fontSize: 11.5, fontWeight: 700, padding: '2px 9px', borderRadius: 999,
        whiteSpace: 'nowrap',
      },
      effortHint: { marginLeft: 'auto', fontSize: 10.5, color: 'var(--dsw-alias-label-secondary)', opacity: .8 },
      trackWrap: { position: 'relative', height: 18, display: 'flex', alignItems: 'center', padding: '0 8px' },
      track: {
        position: 'relative', width: '100%', height: 6, borderRadius: 999, overflow: 'hidden',
        background: 'var(--dsw-alias-bg-layer-2)',
      },
      fill: {
        position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: 999,
        background: 'linear-gradient(90deg, color-mix(in srgb, var(--mvs-accent) 45%, transparent), var(--mvs-accent))',
      },
      ticks: { display: 'flex', gap: 4, marginTop: 9 },
      tick: {
        flex: 1, textAlign: 'center', fontSize: 11, padding: '3px 4px', cursor: 'pointer',
        borderRadius: 6, border: '1px solid transparent',
        background: 'transparent',
        color: 'var(--dsw-alias-label-secondary)',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        transition: 'background .15s, color .15s',
      },
      tickActive: { fontWeight: 700 },
      settings: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 16px' },
      settingsHint: { fontSize: 12, color: 'var(--dsw-alias-label-secondary)', marginBottom: 10 },
      sortRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
      sortLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase', color: 'var(--dsw-alias-label-secondary)' },
      select: {
        flex: 1, minWidth: 0, padding: '5px 8px', borderRadius: 7, cursor: 'pointer',
        border: '1px solid var(--dsw-alias-border-l2)',
        background: 'var(--dsw-alias-bg-layer-2)',
        color: 'var(--dsw-alias-label-primary)', font: 'inherit', fontSize: 12,
      },
      groupBar: { width: 3, height: 16, borderRadius: 2, flex: '0 0 auto' },
      groupRow: {
        display: 'flex', alignItems: 'center', gap: 9, padding: '9px 6px',
        borderBottom: '1px solid var(--dsw-alias-border-l1)', fontWeight: 600,
      },
      modelRow: {
        display: 'flex', alignItems: 'center', gap: 9, padding: '6px 6px 6px 28px',
        fontSize: 12, color: 'var(--dsw-alias-label-secondary)',
      },
      rowHidden: { opacity: .45, textDecoration: 'line-through' },
      footer: {
        flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        padding: '9px 14px', borderTop: '1px solid var(--dsw-alias-border-l1)',
        fontSize: 12,
      },
      value: {
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        padding: '2px 6px', borderRadius: 6,
        background: RAISED_BG,
        wordBreak: 'break-all',
      },
      count: { fontSize: 11, color: 'var(--dsw-alias-label-secondary)' },
      button: {
        padding: '4px 10px', borderRadius: 7, cursor: 'pointer',
        border: '1px solid transparent',
        background: RAISED_BG,
        color: 'var(--dsw-alias-label-primary)', font: 'inherit',
      },
    };

    function readCatalog(response) {
      if (response && response.ok === true) return response.value;
      if (response && response.ok === false) throw new Error(String(response.error && response.error.message || response.error));
      if (response && Array.isArray(response.groups)) return response;
      throw new Error('Unexpected model catalog response');
    }

    function badgeText(v) {
      if (typeof v === 'string') return v;
      if (v && typeof v === 'object') {
        if (typeof v.text === 'string') return v.text;
        if (typeof v.zh === 'string') return v.zh;
        if (typeof v.en === 'string') return v.en;
        const keys = Object.keys(v);
        if (keys.length && typeof v[keys[0]] === 'string') return v[keys[0]];
      }
      return null;
    }

    function renderBadge(m, compact) {
      if (!m || !m.badge) return null;
      const tone = String(m.badge.tone || m.badge.type || 'info').toLowerCase();
      const text = badgeText(m.badge.text);
      if (!text) return null;
      return h('span', { key: 'badge-' + m.id, title: text,
        style: { ...style.badge, ...(compact ? style.badgeCompact : {}),
          background: style.badgeTone[tone] || style.badgeTone.info } },
        h('span', { style: style.badgeText }, text));
    }

    function loadPrefs() {
      const fallback = { groups: [], models: [], sort: 'default' };
      try {
        const raw = window.localStorage && window.localStorage.getItem(HIDDEN_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return {
          groups: Array.isArray(parsed && parsed.groups) ? parsed.groups : [],
          models: Array.isArray(parsed && parsed.models) ? parsed.models : [],
          sort: SORTS.indexOf(parsed && parsed.sort) >= 0 ? parsed.sort : fallback.sort,
        };
      } catch (e) { return fallback; }
    }

    function Selector({ ctx, sessionId, locked }) {
      const [catalog, setCatalog] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [open, setOpen] = React.useState(false);
      const [anchor, setAnchor] = React.useState(null);
      const [vendorId, setVendorId] = React.useState(null);
      const [modelId, setModelId] = React.useState(null);
      const [current, setCurrent] = React.useState(null);
      const [copied, setCopied] = React.useState(false);
      const [showSettings, setShowSettings] = React.useState(false);
      const [prefs, setPrefs] = React.useState(loadPrefs);
      const [draftEffort, setDraftEffort] = React.useState(null);
      const triggerRef = React.useRef(null);
      const t = ctx.locale.bind(NS);
      const session = ctx.remote && ctx.remote.session;

      React.useEffect(() => {
        let alive = true;
        if (!session || typeof session.modelCatalog !== 'function') {
          setError(t('unavailable'));
          return () => { alive = false; };
        }
        session.modelCatalog().then(response => {
          if (!alive) return;
          setCatalog(readCatalog(response));
        }, err => {
          if (alive) setError(String(err && err.message || err));
        });
        return () => { alive = false; };
      }, []);

      React.useEffect(() => {
        if (!open) return undefined;
        const onKey = event => { if (event.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
      }, [open]);

      const allGroups = (catalog && catalog.groups) || [];
      const groups = sortGroups(allGroups
        .map(g => ({ ...g, models: sortModels(g.models.filter(m => prefs.models.indexOf(g.id + '/' + m.id) < 0), prefs.sort) }))
        .filter(g => prefs.groups.indexOf(g.id) < 0), prefs.sort);
      const active = groups.find(g => g.id === vendorId) || groups[0];
      const models = active ? active.models : [];
      const selected = models.find(m => m.id === modelId) || models[0];

      const currentSel = current || (catalog && catalog.default) || null;
      const currentGroup = currentSel ? allGroups.find(g => g.id === currentSel.provider) : null;
      const currentModel = currentGroup ? currentGroup.models.find(m => m.id === currentSel.model) : null;
      const currentEfforts = (currentModel && currentModel.reasoning && currentModel.reasoning.efforts) || [];
      const currentEffortId = (current && current.model === (currentModel && currentModel.id) && current.reasoningEffort)
        || (currentModel && currentModel.reasoning && currentModel.reasoning.defaultEffort);
      const currentEffort = currentEfforts.find(e => e.id === currentEffortId);

      const sliderModel = currentModel;
      const efforts = (sliderModel && sliderModel.reasoning && sliderModel.reasoning.efforts) || [];
      const savedEffort = (current && current.reasoningEffort)
        || (sliderModel && sliderModel.reasoning && sliderModel.reasoning.defaultEffort);
      const effortIndex = draftEffort !== null
        ? Math.min(draftEffort, Math.max(0, efforts.length - 1))
        : Math.max(0, efforts.findIndex(e => e.id === savedEffort));
      const effort = efforts[effortIndex];
      const sliderProvider = currentSel && currentSel.provider;

      React.useEffect(() => {
        if (!active) return;
        setVendorId(active.id);
      }, [active && active.id]);

      const persistPrefs = next => {
        setPrefs(next);
        try { window.localStorage && window.localStorage.setItem(HIDDEN_KEY, JSON.stringify(next)); } catch (e) { /* best-effort */ }
      };
      const toggleGroup = id => persistPrefs({
        groups: prefs.groups.indexOf(id) >= 0 ? prefs.groups.filter(x => x !== id) : prefs.groups.concat([id]),
        models: prefs.models, sort: prefs.sort,
      });
      const toggleModel = (gid, mid) => {
        const key = gid + '/' + mid;
        persistPrefs({
          groups: prefs.groups,
          models: prefs.models.indexOf(key) >= 0 ? prefs.models.filter(x => x !== key) : prefs.models.concat([key]),
          sort: prefs.sort,
        });
      };
      const showAll = () => persistPrefs({ groups: [], models: [], sort: prefs.sort });
      const setSort = sort => persistPrefs({ groups: prefs.groups, models: prefs.models, sort });

      const openPanel = () => {
        if (locked) return;
        const node = triggerRef.current;
        const rect = node && node.getBoundingClientRect ? node.getBoundingClientRect() : null;
        if (!rect) { setAnchor({ left: 24, top: 120, width: 560 }); setOpen(true); return; }
        const width = Math.min(600, window.innerWidth - 32);
        const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
        const above = rect.top - 8 - PANEL_H;
        const top = above >= 8 ? above : Math.min(rect.bottom + 8, window.innerHeight - PANEL_H - 8);
        setAnchor({ left, top: Math.max(8, top), width });
        setShowSettings(false);
        setDraftEffort(null);
        if (currentSel) {
          const target = groups.find(g => g.id === currentSel.provider);
          if (target) { setVendorId(target.id); setModelId(currentSel.model); }
          else if (groups[0]) { setVendorId(groups[0].id); setModelId(null); }
        }
        setOpen(true);
      };

      const saveEffort = (idx, m, provider) => {
        const level = efforts[idx];
        if (!m || !level) return;
        if (current && current.provider === provider && current.model === m.id && current.reasoningEffort === level.id) return;
        const selection = { provider, model: m.id, reasoningEffort: level.id };
        setDraftEffort(idx);
        setError(null);
        if (!sessionId || !session || typeof session.selectModel !== 'function') {
          setCurrent(selection);
          return;
        }
        session.selectModel({ sessionId, ...selection }).then(result => {
          if (result && result.ok === false) {
            const code = (result.error && result.error.code) || 'error';
            setError(code === 'session/writer-held'
              ? t('sessionInUse')
              : code + ': ' + String((result.error && result.error.message) || ''));
            return;
          }
          setCurrent(selection);
        }, err => setError(String(err && err.message || err)));
      };

      const choose = m => {
        if (!active) return;
        const def = m.reasoning && m.reasoning.defaultEffort;
        const selection = { provider: active.id, model: m.id };
        if (def) selection.reasoningEffort = def;
        setModelId(m.id);
        setDraftEffort(null);
        setError(null);
        if (!sessionId || !session || typeof session.selectModel !== 'function') {
          setCurrent(selection);
          setOpen(false);
          return;
        }
        session.selectModel({ sessionId, ...selection }).then(result => {
          if (result && result.ok === false) {
            const code = (result.error && result.error.code) || 'error';
            setError(code === 'session/writer-held'
              ? t('sessionInUse')
              : code + ': ' + String((result.error && result.error.message) || ''));
            return;
          }
          setCurrent(selection);
          setOpen(false);
        }, err => setError(String(err && err.message || err)));
      };

      const onRangeInput = event => setDraftEffort(Number(event.target.value));
      const onRangeCommit = event => saveEffort(Number(event.currentTarget.value), sliderModel, sliderProvider);
      const onRangeKey = event => {
        if (event.key.indexOf('Arrow') !== 0 && event.key !== 'Home' && event.key !== 'End') return;
        onRangeCommit(event);
      };

      const copy = () => {
        if (!selected) return;
        try {
          if (window.navigator && window.navigator.clipboard && window.navigator.clipboard.writeText) {
            window.navigator.clipboard.writeText(selected.name);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
          }
        } catch (e) { /* clipboard is best-effort */ }
      };

      const ratio = efforts.length > 1 ? effortIndex / (efforts.length - 1) : 0;
      const fillPct = (ratio * 100) + '%';
      const accent = effortAccent(ratio);

      const trigger = h('button', {
        ref: triggerRef, type: 'button', disabled: locked,
        'aria-haspopup': 'dialog', 'aria-expanded': open,
        onClick: openPanel,
        title: currentModel ? currentModel.id : undefined,
        style: { ...style.trigger, ...(open ? style.triggerOpen : {}), ...(locked ? style.triggerLocked : {}) },
      },
        h('span', { style: style.triggerName },
          currentModel ? currentModel.name : (catalog ? t('empty') : t('loading'))),
        currentModel ? renderBadge(currentModel, true) : null,
        currentEffort && h('span', { style: style.triggerEffort }, '· ' + currentEffort.name),
        h('span', { style: style.chevron, 'aria-hidden': true }, open ? '▾' : '▴'),
      );

      const vendorRows = groups.map(g => {
        const isActive = active && active.id === g.id;
        const color = groupColor(g.id);
        return h('button', {
          key: g.id, type: 'button', role: 'option', className: 'mvs-row mvs-rowsep',
          'aria-selected': isActive,
          style: { ...style.row, ...(isActive ? style.rowActive : {}) },
          onClick: () => { setVendorId(g.id); setModelId(null); },
          title: g.name,
        },
          h('span', { style: { ...style.rowName, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', overflowWrap: 'normal' } },
            h('span', { style: { ...style.vendorDot, background: color, marginRight: 0 } }),
            h('span', { style: { flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, g.name),
            h('span', {
              style: { ...style.countPill, color },
              'aria-label': String(g.models.length), title: String(g.models.length),
            }, g.models.length)),
          h('span', { style: { ...style.rowId, ...(isActive ? style.rowIdActive : {}) } }, g.id),
        );
      });

      const modelRows = models.map(m => {
        const isActive = selected && selected.id === m.id;
        return h('button', {
          key: m.id, type: 'button', role: 'option', className: 'mvs-row mvs-rowsep',
          'aria-selected': isActive,
          style: { ...style.row, ...(isActive ? style.rowActive : {}) },
          onClick: () => choose(m),
          title: m.id,
        },
          h('span', { style: style.rowLine },
            h('span', { style: { ...style.rowName, ...style.rowLineName } }, m.name),
            m.badge && h('span', { style: style.rowBadge }, renderBadge(m))),
        );
      });

      const settingsPane = h('div', { style: style.settings },
        h('div', { style: style.settingsHint }, t('manageHint')),
        h('div', { style: style.sortRow },
          h('label', { style: style.sortLabel, htmlFor: 'mvs-sort' }, t('sort')),
          h('select', {
            id: 'mvs-sort', style: style.select, value: prefs.sort,
            onChange: event => setSort(event.target.value),
          }, SORTS.map(s => h('option', { key: s, value: s }, t('sort' + s.charAt(0).toUpperCase() + s.slice(1)))))),
        h('button', { type: 'button', style: style.button, onClick: showAll }, t('showAll')),
        sortGroups(allGroups, prefs.sort).map(g => {
          const groupHidden = prefs.groups.indexOf(g.id) >= 0;
          const color = groupColor(g.id);
          return h('div', { key: g.id },
            h('label', { style: { ...style.groupRow, ...(groupHidden ? style.rowHidden : {}) } },
              h('span', { style: { ...style.groupBar, background: color } }),
              h('input', { type: 'checkbox', className: 'mvs-check', checked: !groupHidden, onChange: () => toggleGroup(g.id) }),
              h('span', { style: { flex: 1, minWidth: 0 } }, g.name),
              h('span', { style: { ...style.countPill, color }, title: String(g.models.length) }, g.models.length),
              h('span', { style: style.rowId }, g.id)),
            g.models.map(m => {
              const key = g.id + '/' + m.id;
              const off = groupHidden || prefs.models.indexOf(key) >= 0;
              return h('label', { key: m.id, style: { ...style.modelRow, ...(off ? style.rowHidden : {}) } },
                h('input', { type: 'checkbox', className: 'mvs-check', checked: !off, onChange: () => toggleModel(g.id, m.id) }),
                h('span', null, m.name));
            }));
        }));

      const body = showSettings ? settingsPane : h('div', { style: style.body },
        h('div', { style: { ...style.col, ...style.colVendor } },
          h('div', { style: style.title },
            h('span', { style: { ...style.titleDot, background: 'var(--dsw-alias-state-success-primary)' } }),
            t('vendor')),
          h('div', { style: style.list, role: 'listbox', 'aria-label': t('vendor') },
            groups.length === 0 && h('div', { style: style.notice }, catalog ? t('empty') : t('loading')),
            vendorRows)),
        h('div', { style: style.divider, 'aria-hidden': true }),
        h('div', { style: { ...style.col, ...style.colModel } },
          h('div', { style: style.title },
            h('span', { style: { ...style.titleDot, background: 'var(--dsw-alias-brand-primary)' } }),
            t('model')),
          h('div', { style: style.list, role: 'listbox', 'aria-label': t('model') },
            models.length === 0 && h('div', { style: style.notice }, catalog ? t('empty') : t('loading')),
            modelRows)));

      const effortPane = h('div', { className: 'mvs-effort', style: style.effort },
        h('div', { style: style.effortHead },
          h('span', { style: { ...style.titleDot, background: accent } }),
          h('span', { style: style.effortLabel }, t('effort')),
          h('span', { style: { ...style.effortValue, ...(efforts.length > 1
            ? { color: accent, background: RAISED_BG }
            : { color: 'var(--dsw-alias-label-secondary)', background: 'transparent' }) } },
            effort ? effort.name : t('effortNone')),
          efforts.length > 1 && h('span', { style: style.effortHint }, t('effortHint'))),
        h('div', { style: { ...style.trackWrap, '--mvs-accent': accent } },
          h('div', { style: style.track },
            h('div', { style: { ...style.fill, width: fillPct } }),
          ),
          h('input', {
            type: 'range', className: 'mvs-range', min: 0,
            max: Math.max(0, efforts.length - 1), step: 1, value: effortIndex,
            disabled: efforts.length < 2,
            'aria-label': t('effort'),
            'aria-valuetext': effort ? effort.name : t('effortNone'),
            onInput: onRangeInput, onChange: onRangeInput,
            onPointerUp: onRangeCommit, onPointerCancel: onRangeCommit,
            onKeyUp: onRangeKey,
            onMouseDown: event => event.stopPropagation(),
          }),
        ),
        h('div', { style: style.ticks },
          efforts.map((e, i) => h('span', {
            key: e.id, className: 'mvs-tick',
            style: { ...style.tick, ...(i === effortIndex ? {
              ...style.tickActive, color: accent,
              background: RAISED_BG,
            } : {}) },
            onClick: () => { setDraftEffort(i); saveEffort(i, sliderModel, sliderProvider); },
          }, e.name))),
      );

      const panel = open && anchor ? ReactDOM.createPortal(
        h('div', { style: style.backdrop, onMouseDown: () => setOpen(false) },
          h('div', {
            role: 'dialog', 'aria-label': t('title'), className: 'mvs-root',
            onMouseDown: event => event.stopPropagation(),
            style: { ...style.popover, left: anchor.left, top: anchor.top, width: anchor.width },
          },
            h('style', null, CSS),
            h('div', { style: style.header },
              h('span', { style: style.headerMark, 'aria-hidden': true }),
              h('span', { style: style.headerTitle }, t('title')),
              h('span', { style: style.headerSub }, t('model') + ' / ' + t('vendor')),
              h('button', {
                type: 'button', 'aria-label': t('settings'),
                style: { ...style.gear, ...(showSettings ? style.gearActive : {}) },
                onClick: () => setShowSettings(v => !v),
              },
                h('svg', { viewBox: '0 0 24 24', width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, 'aria-hidden': true },
                  h('line', { x1: 4, y1: 7, x2: 20, y2: 7 }),
                  h('line', { x1: 4, y1: 17, x2: 20, y2: 17 }),
                  h('circle', { cx: 9, cy: 7, r: 2.2 }),
                  h('circle', { cx: 15, cy: 17, r: 2.2 })),
                t('settings'))),
            h('div', { className: 'mvs-flow', style: style.flowStrip, 'aria-hidden': true }),
            body,
            effortPane,
            h('div', { style: style.footer },
              error && h('span', { style: { ...style.notice, color: 'var(--dsw-alias-state-error-primary)' } }, error),
              catalog && catalog.failures && catalog.failures.length > 0 &&
                h('span', { style: { ...style.notice, color: 'var(--dsw-alias-state-warn-primary)' } }, t('failed')),
              h('span', { style: style.count }, t('selected') + ': '),
              h('span', { style: style.value, 'data-model-name': selected ? selected.name : '' },
                selected ? selected.name : '—'),
              h('span', { style: style.value, 'data-model-id': selected ? selected.id : '' },
                selected ? selected.id : '—'),
              prefs.groups.length + prefs.models.length > 0 &&
                h('span', { style: style.count }, t('hiddenCount') + ': ' + (prefs.groups.length + prefs.models.length)),
              h('button', { type: 'button', style: style.button, onClick: copy, disabled: !selected },
                copied ? t('copied') : t('copy')),
            ),
          ),
        ),
        document.body) : null;

      return h(React.Fragment, null, trigger, panel);
    }

    return {
      inject: ['slots', 'locale', 'remote', 'remote.session'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, DICT), 'model-vendor-selector: locale');
        ctx.slots.inject('conversation.input.model', () => ctx.slots.register({
          name: 'conversation.input.model',
          id: 'model-vendor-selector',
          priority: -1,
          label: () => ctx.locale.bind(NS)('title'),
        }, props => h(Selector, { ctx, sessionId: props.sessionId, locked: props.locked })));
      },
    };
  },
});
