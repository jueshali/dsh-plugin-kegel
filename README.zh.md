# dsh-plugin-kegel

[English](README.md) | 中文

[![CI](https://github.com/jueshali/dsh-plugin-kegel/actions/workflows/ci.yml/badge.svg)](https://github.com/jueshali/dsh-plugin-kegel/actions/workflows/ci.yml)

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 用的**提肛（凯格尔）提醒器**：
按间隔提醒你一次，然后用提示音带着你做完一组「收紧 / 放松」。

它是一个提醒器，**不是医疗建议**，也不是训练日志。节奏以自己舒适为准，不适就停。

```
┌ 侧边栏 ─────────────┐   ┌ 主面板 ─────────────────────────────────┐
│  ⏱ 提肛提醒          │ → │  距下次提醒 42:15   ◔ 进度环              │
│  ⚙  Plugins          │   │  [立即做一组] [重置计时]                  │
└─────────────────────┘   │  今日 3 组 · 累计 30 次 / 设置             │
                          └─────────────────────────────────────────┘

┌ 会话头部 ─────────────────────────────────────────────────────────┐
│ (◔ 42:15 ·) ▶ ↗     会话标题 …                                    │
└──────────────────────────────────────────────────────────────────┘
       │       │ └ 打开完整面板
       │       └ 立即做一组（正在做的时候隐藏）
       └ 点一下 = 当前阶段的主操作（等提醒→开始，收紧/放松→暂停/继续）
```

![面板实拍：一组进行中，收紧 5 秒，第 1/10 次，设置已展开](docs/screenshot.png)

*完整面板实拍（截图取自中文界面）。*

胶囊位于会话头部的窗口拖拽区里，所以自带 `-webkit-app-region: no-drag`；写成 `.kg_chip.kg_chip`
是为了在权重上压过宿主的 `[data-window-drag]`，否则点击会被当成拖动窗口。

## 安装

需要带 **web surface** 的 DSH 构建（profile bundles 含 `@deepseek-ai/dsh-base` 与
`@deepseek-ai/dsh-web-app`）。开发与验证版本：**0.2.0-rc.2**。

```bash
# 从 GitHub 安装（插件管理器会装依赖并选中该 bundle）：
plugin_manager install_bundle github:jueshali/dsh-plugin-kegel
```

也可以在侧边栏 **Plugins** 页里粘贴 `github:jueshali/dsh-plugin-kegel`；若将来发了 npm 包，则
`plugin_manager install_bundle dsh-plugin-kegel`。

本插件是一个 *bundle*：安装会把 `dsh-plugin-kegel` 加进 `dsh.profile.bundles`，它自己的
[`cordis.patch.yml`](cordis.patch.yml) 负责插入那唯一一行 loader 条目。卸载：

```bash
plugin_manager remove_bundle dsh-plugin-kegel
```

<details>
<summary>手工安装（不用包管理器）</summary>

把仓库克隆到任意位置，然后让 profile 能解析到这个包，并把它加入 bundle 列表：

```jsonc
// <profile>/package.json
{
  "dependencies": { "dsh-plugin-kegel": "link:/绝对路径/dsh-plugin-kegel" },
  "dsh": { "profile": { "bundles": ["@deepseek-ai/dsh-base", "@deepseek-ai/dsh-web-app", "dsh-plugin-kegel"] } }
}
```

不需要构建：浏览器半边就是提交进仓库的 `lib/client.js`。
</details>

## 工作流程

```
        间隔到点            「开始一组」
wait ──────────────► due ─────────────► 收紧 #1 ─► 放松 #1 ─► … ─► 收紧 #N
  ▲                  │                                            │
  │                  │ 推迟 5 分钟                                 │ 一组做完
  │                  └────────────────► wait ◄────────────────────┘
  └────────────────────────────────────┘
```

- **wait**：距下次提醒的倒计时，插件挂载即开始走。
- **due**：到点了，提示音 +（可选）桌面通知。它会等你点「开始一组」或「推迟 5 分钟」；默认**不会**
  自动开始指导——不然你人不在时它会自己数完还顺手把闹钟重置了。想全自动就打开「到点自动开始一组」。
- **收紧 / 放松**：指导阶段，每次切换有不同提示音（收紧是上行两声，放松是低音一声，一组做完三连音）。
- 一组做完即记一次成绩，通知里带上下次提醒时间，并立刻开始下一轮 `wait`。
- 关掉页面期间错过的时间只算**一次**提醒，不会攒成一堆。
- 倒计时基于截止时间戳（`endAt`），后台标签被节流也不会走偏；状态镜像到
  `localStorage`（`dsh.kegel.v1`），刷新不丢。

## 设置

| 项 | 默认 | 范围 |
|---|---|---|
| 提醒间隔（分钟） | 60 | 1–480 |
| 每组次数 | 10 | 1–50 |
| 收缩时长（秒） | 5 | 1–60 |
| 放松时长（秒） | 5 | 1–60 |
| 到点自动开始一组 | 关 | 开/关 |
| 提示音 | 开 | 开/关 |
| 桌面通知 | 关 | 开/关 |

「今日组数 / 累计次数」按自然日重置。

## 占用的 slots

| slot | 形态 | 内容 |
|---|---|---|
| `main` | keyed，key `kegel` | 完整面板 |
| `sidebar.panellist` | list，id `kegel` | 侧边栏图标；id 与 main 的 key 相同，点图标即切到该面板 |
| `conversation.header.leading` | single，root | 上面说的会话头部胶囊 |

## 开发

```
lib/index.js       node 半边 —— 空 apply()，唯一作用是占据一行 loader 条目
lib/client.js      浏览器半边 —— 全部 UI，手写的 lazy-CJS bundle
cordis.patch.yml   插入 loader 条目的 bundle 补丁
test/smoke.mjs     离线自测：不需要浏览器，也不需要 DSH，约 60 条断言
```

```bash
node test/smoke.mjs     # 契约 + 状态机 + 渲染，全部用桩
```

`test/smoke.mjs` 复现了 shell 强制的两份契约 —— bundle 形态
（`window.__ModuleLoader__.load({ id, factory })`，副作用延迟到物化时执行）与插件本体
（`apply(ctx)` + `inject`）—— 然后在受控时钟上驱动提醒引擎，并用桩 React 渲染每个组件。
CI 会在 Node 18/20/22 上跑它。

### 改代码前值得知道的两件事

1. **浏览器半边就是这个包的 client half。** `@deepseek-ai/dsh-client-modules` 会扫描已启用的 loader
   条目，取声明了 `dsh.client.platform === "web"` 的包的 `exports["./client"]`，然后从
   `/plugins/<包名>/client.js` 提供。bundle 里的 `id` 必须等于包名。它只 `require("react")`
   （shell 内置），所以本包没有运行时依赖、也没有构建步骤 —— 直接改 `lib/client.js`。
2. **只改 `lib/client.js` 还不够。** node 半边在**组合（compose）时**把 bundle 字节快照进内存，
   所以刷新页面拿到的仍是旧代码。要让改动生效，得让 loader 重新处理这一行 —— 把插件关掉再打开
   （`plugin_manager set_plugin include:ui-kegel enabled=false`，再 `enabled=true`），或重启 DSH。
   之后 client HMR 链会把新模块推给浏览器，通常不用手动刷新。

## 许可

[MIT](LICENSE)
