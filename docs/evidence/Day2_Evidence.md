# Day2 Evidence - 页面骨架与路由导航

## 1. 今日完成内容

今天完成了校园轻集市前端项目 Day2 的核心任务：搭建页面骨架、配置路由导航、设计公共布局组件。

具体包括：
- 在 `src/views` 目录下创建了 8 个页面组件：HomeView、TradeView、LostFoundView、GroupBuyView、ErrandView、PublishView、MessageView、UserCenterView
- 在 `src/components` 目录下创建了 3 个公共布局组件：AppLayout、AppHeader、AppNav
- 重写了 `src/router/index.ts`，配置了 8 条基础路由，每条路由都包含 path、name、component 和 meta.title
- 重写了 `src/App.vue`，使用 AppLayout 作为统一页面容器
- 清理了 Day1 遗留的旧页面文件（BoardView、ListView、DetailView、ProfileView）
- 更新了 HomeView 的内容，使其与"校园轻集市"的品牌定位一致

项目已通过 `npm run build` 构建验证，无报错。

## 2. 页面与路由清单

| 页面名称 | 路由路径 | 文件位置 |
|---|---|---|
| 首页 | / | src/views/HomeView.vue |
| 二手交易 | /trade | src/views/TradeView.vue |
| 失物招领 | /lost-found | src/views/LostFoundView.vue |
| 拼单搭子 | /group-buy | src/views/GroupBuyView.vue |
| 跑腿委托 | /errand | src/views/ErrandView.vue |
| 发布信息 | /publish | src/views/PublishView.vue |
| 消息中心 | /message | src/views/MessageView.vue |
| 个人中心 | /user | src/views/UserCenterView.vue |

## 3. AI 协作记录

本次任务使用了 AI Coding 工具（当前 AI 助手）辅助完成 Day2 开发。

核心提示词内容：
- 要求创建 8 个核心业务页面（首页、二手交易、失物招领、拼单搭子、跑腿委托、发布、消息、个人中心）
- 要求配置 Vue Router 路由，路径语义清晰
- 要求创建公共布局组件（AppLayout、AppHeader、AppNav）
- 要求页面保持基础结构，不引入复杂业务逻辑

AI 生成的内容：
- 生成了 5 个新页面（TradeView、LostFoundView、GroupBuyView、ErrandView、UserCenterView）的骨架代码
- 生成了 3 个布局组件（AppNav、AppHeader、AppLayout）的完整代码
- 生成了路由配置文件的完整内容
- 生成了 App.vue 的简化版本

人工审查和修改的内容：
- 审查了所有页面名称是否与文件名一一对应，确保没有命名不一致的问题
- 修改了 HomeView.vue 的内容，将原来的"校园集市"改为"校园轻集市"，并更新了业务描述以覆盖所有核心功能（二手交易、失物招领、拼单搭子、跑腿委托）
- 删除了旧项目遗留的 BoardView、ListView、DetailView、ProfileView 页面，避免路由混淆
- 确认路由路径使用短横线命名法（如 /lost-found、/group-buy），而非驼峰或下划线
- 检查了布局组件的样式，确保 AppNav 中的 router-link-active 类能正确高亮当前页面
- 运行了 `npm run build` 验证项目构建通过

## 4. 遇到的问题与解决方法

**问题 1：旧项目与需求页面不匹配**

Day1 的项目已经包含了一些页面（HomeView、ListView、DetailView、BoardView、ProfileView、PublishView、MessageView），但这些页面的命名和路由与 Day2 要求的页面清单不一致。例如，要求的是 TradeView 而不是 ListView，要求的是 LostFoundView 而不是 BoardView。

解决方法：保留原本已有的 HomeView、PublishView、MessageView，新建 TradeView、LostFoundView、GroupBuyView、ErrandView、UserCenterView，然后删除不再需要的旧页面文件（BoardView、ListView、DetailView、ProfileView），同时更新路由配置指向新的页面组件。

**问题 2：App.vue 的导航与路由不协调**

Day1 的 App.vue 中包含了内联导航菜单，指向的路径是 /home、/list、/detail/1、/profile、/board 等旧路由，与 Day2 的新路由体系不一致。此外，布局代码混在 App.vue 中，不利于后续维护。

解决方法：将 App.vue 完全重写为仅引入 AppLayout 组件的简洁入口，将导航逻辑分离到 AppNav.vue 中，将布局逻辑分离到 AppLayout.vue 中，将顶部品牌区域分离到 AppHeader.vue 中。这样实现了页面组件与公共组件的清晰分离。

**问题 3：AI 生成的首页内容需要调整**

AI 直接沿用了 Day1 HomeView 中"校园集市"的名称和描述，但项目定位已更新为"校园轻集市"，且描述需要覆盖所有业务模块。

解决方法：手动修改 HomeView.vue，将标题改为"校园轻集市"，描述文字改为覆盖二手交易、失物招领、拼单搭子、跑腿委托四大核心业务，使首页内容与项目整体定位保持一致。

## 5. 今日反思

页面骨架、路由导航和公共布局是后续所有开发的基础。今天的工作让我深刻体会到，一个前端项目不能从某一个页面孤立开始开发，而是要先建立清晰的页面结构、路由关系、布局规则和组件边界。具体来说：

**页面骨架**决定了项目的整体范围和边界。通过列出所有核心页面，我能够一目了然地看到项目要覆盖哪些业务场景（二手交易、失物招领、拼单搭子、跑腿委托），这为后续的功能开发提供了清晰的路线图。

**路由导航**决定了用户如何在不同页面之间跳转。今天配置的 8 条路由采用了语义化的路径命名（如 /trade、/lost-found、/group-buy），每条路由都包含了 meta.title 信息，这为后续的导航高亮、页面标题动态设置、权限控制等功能奠定了良好的基础。

**公共布局**决定了页面的统一视觉结构和交互范式。通过将 AppHeader（顶部品牌区）、AppNav（导航菜单区）、AppMain（内容区）分离到独立的组件中，实现了关注点分离。这样，后续开发新页面时只需要关注页面本身的业务逻辑，不需要重复编写布局代码。

总之，Day2 虽然不涉及复杂的业务逻辑，但页面骨架、路由导航和公共布局的搭建质量直接决定了项目后续的可维护性和扩展性。一个好的起点能为后续开发节省大量时间。
