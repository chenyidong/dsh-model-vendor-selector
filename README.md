# 双列厂商模型选择器 / Dual-column Model Vendor Selector

DeepSeek Harness Web GUI 的 UI 插件：点击输入框里的模型选择器，弹出双列面板 —— 左侧选厂商，右侧选模型，**模型名称按注册值原样输出**。

## 功能

- **双列选择**：左列按厂商分组（色点 + 可见模型数徽标），右列列出该厂商的模型（名称、ID、`badge` 小标签），点击即切换会话模型。
- **紧凑排版**：模型徽章为 13px 高的小圆角标签，与模型名、模型 ID 同行显示（超长自动省略并保留 `title` 提示）；输入框触发器固定单行高度，徽章不再撑高文本窗口。
- **思考强度滑块**：底部流动光带滑块，拖动 / 方向键 / 点击刻度即时切换 `reasoningEffort`；只有一档的模型会禁用并显示提示。
- **管理显示**：排序（注册顺序、名称升/降序、模型数多/少），勾选隐藏分组或单个模型，配置持久化在浏览器 `localStorage`（键 `model-vendor-selector:hidden`）。
- **已选信息**：footer 原样显示选中模型的 `name` 与 `id`，一键复制模型名称。
- **主题**：仅使用 `--dsw-alias-*` 主题令牌，跟随 Harness 明暗主题；多色强调（品牌色 / 成功 / 警告 / 错误 / 标签色）。

## 安装

在 Harness 会话中用插件管理器安装本地目录（安装后对所有会话生效，重启后仍在）：

```
plugin_manager install_bundle C:\Users\Admin\.dsh\model-vendor-selector
```

或克隆本仓库后用 `plugin_manager install_bundle <克隆目录>`。目录以 `link:` 方式挂到当前 profile，修改源码后由 HMR 生效，无需重装。

插件注册到 `conversation.input.model` 槽位（`priority: -1`），会替代内置的单列模型选择器；弹层通过 `ReactDOM.createPortal` 挂到 `document.body`。

## 目录

| 文件 | 作用 |
| --- | --- |
| `client.js` | Client 半部：全部 UI 与交互 |
| `index.js` | Host 半部（空 `apply`，仅用于 Loader 登记） |
| `cordis.patch.yml` | bundle 补丁，插入插件行 |
| `package.json` | manifest 与 `dsh.client` 声明 |
| `icon.svg` | 插件管理器显示用图标 |
| `locale/*.json` | 8 语言文案与 `meta` 元数据 |

## 依赖

Client 侧 `dsh.client.inject`：`@deepseek-ai/dsh-api-session-controller`、`@deepseek-ai/dsh-api-remotes`、`@deepseek-ai/dsh-client-locale`、`@deepseek-ai/dsh-client-ui-conversation`。模型目录来自 `ctx.remote.session.modelCatalog()`，选模型走 `ctx.remote.session.selectModel()`。无 Host 侧业务依赖，不需要打包工具。

## 版本

1.0.1
