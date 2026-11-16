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
.mvs-root{
  --mvs-line:color-mix(in srgb,var(--dsw-alias-border-l2) 60%,transparent);
  --mvs-line-soft:linear-gradient(90deg,transparent 0,var(--mvs-line) 10%,var(--mvs-line) 90%,transparent 100%);
  font-family:inherit;font-size:13px;line-height:1.5;
  animation:mvs-in .14s ease-out both;
}
@keyframes mvs-in{from{opacity:0;transform:translateY(4px) scale(.99)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.mvs-root{animation:none}}
.mvs-root button{font:inherit}
.mvs-flow{background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,transparent),transparent)}
.mvs-flow{background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--dsw-alias-brand-primary) 14%,transparent),transparent)}
.mvs-row:hover{background:${RAISED_BG}}
.mvs-rowsep{position:relative}
.mvs-rowsep::after{content:'';position:absolute;left:8px;right:8px;bottom:0;height:1px;opacity:.5;background:linear-gradient(90deg,transparent 0,color-mix(in srgb,var(--dsw-alias-border-l2) 80%,var(--dsw-alias-brand-primary)) 12%,color-mix(in srgb,var(--dsw-alias-border-l2) 80%,var(--dsw-alias-brand-primary)) 88%,transparent 100%)}
.mvs-rowsep::after{content:'';position:absolute;left:10px;right:10px;bottom:0;height:1px;background:var(--mvs-line-soft)}
.mvs-row[aria-selected="true"]::after{display:none}
.mvs-rowsep:last-child::after{display:none}
.mvs-effort::before{content:'';position:absolute;left:8px;right:8px;top:0;height:1px;background:linear-gradient(90deg,transparent 0,color-mix(in srgb,var(--dsw-alias-border-l2) 55%,var(--dsw-alias-brand-primary)) 12%,color-mix(in srgb,var(--dsw-alias-border-l2) 55%,var(--dsw-alias-brand-primary)) 88%,transparent 100%)}
.mvs-effort::before{content:'';position:absolute;left:14px;right:14px;top:0;height:1px;background:var(--mvs-line-soft)}
.mvs-tick:hover{background:${RAISED_BG};color:var(--dsw-alias-label-primary)}
.mvs-root .mvs-row:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.mvs-trigger{border:0}
.mvs-trigger:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-label-primary) 8%,transparent) !important}
.mvs-trigger:focus-visible{outline:2px solid color-mix(in srgb,var(--dsw-alias-brand-primary) 60%,transparent);outline-offset:1px}
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
    // 1) 带 routing group 标识的项目全部归入左列一个叫「分组」的厂商，点击后右列列出这些项目；
    // 2) magpie 分组下的模型 id 形如 "供应商/模型名"，按前缀拆成多个供应商子分组（保留原始 provider）。
    const RG_MARKER = 'routing group';
    function splitVendorGroups(list) {
      const out = [];
      const rgModels = [];
      for (const g of list) {
        const models = g.models || [];
        // 带 routing group 标识的模型抽走归入「分组」，其余模型保留在原分组
        const kept = models.filter(m => String(m.name || '').indexOf(RG_MARKER) < 0);
        for (const m of models) {
          if (String(m.name || '').indexOf(RG_MARKER) >= 0) rgModels.push(m);
        }
        if (kept.length === 0) continue; // 整组都是 routing group，原分组就不留空行
        if (g.id !== 'magpie' || !kept.some(m => String(m.id || '').indexOf('/') > 0)) {
          out.push({ ...g, models: kept, provider: g.id });
          continue;
        }
        const buckets = new Map();
        for (const m of kept) {
          const idx = String(m.id || '').indexOf('/');
          const vendor = idx > 0 ? m.id.slice(0, idx) : '未分类';
          if (!buckets.has(vendor)) buckets.set(vendor, []);
          buckets.get(vendor).push(m);
        }
        for (const [vendor, subModels] of buckets) {
          out.push({ id: g.id + '/' + vendor, name: vendor, provider: g.id, models: subModels });
        }
      }
      if (rgModels.length) {
        out.push({ id: 'routing-group', name: '分组', provider: 'magpie', models: rgModels });
      }
      return out;
    }

    const style = {
      trigger: {
        display: 'inline-flex', alignItems: 'center', alignSelf: 'center',
        flex: '0 0 auto', gap: 4, maxWidth: 260, minHeight: 22,
        padding: '0 6px', border: '1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 55%, transparent)', borderRadius: 7,
        background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)',
        flex: '0 0 auto', gap: 4, maxWidth: 260, minHeight: 26,
        padding: '3px 8px', borderRadius: 8, border: 0,
        background: 'color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent)',
        color: 'var(--dsw-alias-label-primary)',
        cursor: 'pointer', font: 'inherit', fontSize: 12.5, lineHeight: '20px',
        transition: 'background-color .15s, color .15s',
      },
      triggerOpen: { borderColor: 'var(--dsw-alias-brand-primary)' },
      triggerOpen: {
        background: 'color-mix(in srgb, var(--dsw-alias-brand-primary) 11%, transparent)',
        color: 'var(--dsw-alias-brand-primary)',
      },
      triggerLocked: { opacity: .5, cursor: 'not-allowed' },
      triggerName: { flex: '0 1 auto', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 },
      triggerEffort: {
        flex: '0 0 auto', fontSize: 10.5, color: 'var(--dsw-alias-label-secondary)',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 72,
      },
      triggerEffort: { flex: '0 0 auto', fontSize: 10.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 72 },
      // 三段文字色区分（无背景）：模型名=深青 business，费用=琥珀 warn，思考强度=绿 success
      chipColor: { name: 'var(--dsw-alias-state-business-primary)', price: 'var(--dsw-alias-state-warn-primary)', effort: 'var(--dsw-alias-state-success-primary)' },
      chevron: { flex: '0 0 auto', fontSize: 10, opacity: .6 },
      backdrop: { position: 'fixed', inset: 0, zIndex: 40 },
      popover: {
        position: 'fixed', zIndex: 41, display: 'flex', flexDirection: 'column',
        width: 600, maxWidth: 'calc(100vw - 32px)', height: PANEL_H,
        maxHeight: 'calc(100vh - 32px)', overflow: 'hidden',
        border: '1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 55%, transparent)', borderRadius: 12,
        border: '1px solid var(--mvs-line)', borderRadius: 14,
        background: 'var(--dsw-alias-bg-layer-1)', color: 'var(--dsw-alias-label-primary)',
        boxShadow: '0 8px 28px rgba(0, 0, 0, .14)',
        boxShadow: '0 0 0 1px color-mix(in srgb, var(--dsw-alias-label-primary) 3%, transparent), 0 2px 8px rgba(0, 0, 0, .05), 0 16px 40px rgba(0, 0, 0, .10)',
        fontFamily: 'inherit', fontSize: 13, lineHeight: 1.5,
      },
      header: {
        display: 'flex', alignItems: 'center', gap: 9, flex: '0 0 auto',
        padding: '10px 14px 8px',
        padding: '12px 16px 10px',
      },
      headerMark: {
        width: 3, height: 14, borderRadius: 2, flex: '0 0 auto',
        background: 'var(--dsw-alias-brand-primary)',
      },
      headerTitle: { fontSize: 13, fontWeight: 700, letterSpacing: '.02em' },
      headerSub: { fontSize: 11, color: 'var(--dsw-alias-label-secondary)' },
      gear: {
        marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 6px', borderRadius: 必须仔细保证与源文件完全一致，cursor: 'pointer', fontSize: 11.5,
        border: '1px solid transparent',
        background: 'transparent',
        color: 'var(--dsw-alias-label-secondary)',
      },