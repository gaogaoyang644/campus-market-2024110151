# Day2 实训证据卡 —— 页面骨架搭建与前端路由导航

## 项目信息
- **项目名称**：校园轻集市（campus-market-seed）
- **实训日期**：2026-06-28
- **核心任务**：页面骨架搭建与前端路由导航实现
- **技术栈**：Vue3 + Vite + TypeScript + VueRouter4 + Pinia

---

## 一、开发步骤

### 步骤1：项目目录规划
按照实训要求，在 `campus-market-seed/src` 下创建了 `components`（公共组件）、`router`（路由配置）、`views`（页面组件）三个核心目录。其中 `components` 下放置 `AppHeader.vue`、`AppNav.vue`、`AppLayout.vue`，`views` 下放置 8 个页面组件，`router` 下放置 `index.ts` 路由配置文件。

### 步骤2：路由配置
在 `router/index.ts` 中引入全部 8 个页面组件，使用 `createWebHistory` 创建 HTML5 历史模式路由。配置了 8 条路由规则，每条包含 `path`、`name`、`component` 以及 `meta.title` 页面标题。路由路径与命名严格遵循：`/`（home）、`/trade`（trade）、`/lost-found`（lostFound）、`/group-buy`（groupBuy）、`/errand`（errand）、`/publish`（publish）、`/message`（message）、`/user`（user）。

### 步骤3：公共组件开发
- **AppNav.vue**：使用 `<RouterLink>` 实现 8 个导航项的跳转，并利用 Vue Router 内置的 `router-link-active` 类名实现当前页高亮效果。
- **AppHeader.vue**：顶部显示项目名称"校园轻集市"和标语"轻享校园，自在交易"，下方嵌入 `AppNav` 导航菜单。
- **AppLayout.vue**：全局布局容器，顶部引入 `AppHeader`，主体区域通过 `<RouterView>` 动态渲染当前路由对应的页面组件。

### 步骤4：入口文件与根组件
`main.ts` 引入 Vue、Pinia、Router 和根组件 `App.vue`，依次 `use` Pinia 和 Router 后挂载到 `#app`。`App.vue` 仅引入并渲染 `AppLayout`，保持根组件足够简洁。

### 步骤5：8 个页面组件
每个视图组件均使用基础模板：一个 `<h1>` 作为页面标题、一个 `<p>` 作为业务描述，并添加 `style="padding: 24px"` 简单内边距。`<script setup lang="ts">` 保持空脚本，不写入任何业务逻辑。

---

## 二、问题与解决

| 问题 | 解决方式 |
|------|----------|
| `@/views` 路径别名在 Vite 中无法识别 | 需在 `vite.config.ts` 中配置 `resolve.alias`，设置 `'@': path.resolve(__dirname, 'src')` |
| `router-link-active` 样式不生效 | 发现该 class 默认作用在 `<a>` 标签上，使用 `:deep(.router-link-active)` 穿透样式作用域 |
| 路由配置后页面空白 | 检查发现 `main.ts` 中忘记调用 `app.use(router)`，添加后恢复正常 |

---

## 三、今日反思

通过 Day2 实训，基本掌握了 Vue3 项目从零搭建页面骨架和前端路由的完整流程。使用 `createWebHistory` 代替 Hash 模式使 URL 更美观，通过 `meta.title` 为每个页面携带标题信息便于后续动态设置 `document.title`。公共组件采用分层设计（AppLayout > AppHeader > AppNav）提高了代码复用性。8 个页面组件的统一模板为后续填充业务逻辑打下了基础。不足之处在于对 Vite 路径别名配置不熟悉，导致首次运行时导入报错，后续需加强对构建工具的配置理解。
