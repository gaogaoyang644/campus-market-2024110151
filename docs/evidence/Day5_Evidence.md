# Day5 Evidence - Pinia 状态管理、用户状态模拟、我的发布与收藏功能实现

## 1. 今日完成内容

引入了 Pinia 状态管理机制，创建了用户状态 Store 和收藏状态 Store，完善了个人中心页面（用户资料展示、我的发布、我的收藏），并在导航栏、首页、发布页面等多处使用了 Store 中的共享状态。

## 2. Store 设计

### user.ts — 用户状态 Store

| 成员 | 类型 | 说明 |
|---|---|---|
| state.isLoggedIn | boolean | 模拟登录状态（默认 true） |
| state.currentUser | CurrentUser | 当前用户信息（id、name、college、grade、avatar、bio） |
| getter.displayName | string | 用户昵称 |
| getter.userDescription | string | 组合显示"学院·年级" |
| action.updateProfile | (payload) => void | 更新用户资料 |
| action.logout / login | () => void | 切换登录状态 |

### favorite.ts — 收藏状态 Store

| 成员 | 类型 | 说明 |
|---|---|---|
| state.favorites | FavoriteItem[] | 收藏列表 |
| getter.favoriteCount | number | 收藏总数 |
| action.isFavorite | (type, id) => boolean | 判断某项是否已收藏 |
| action.addFavorite | (item) => void | 添加收藏 |
| action.removeFavorite | (type, id) => void | 取消收藏 |
| action.toggleFavorite | (item) => void | 切换收藏状态 |

## 3. 状态与组件对应关系

| Store 状态 | 使用的组件 | 使用方式 |
|---|---|---|
| currentUser.name | AppHeader.vue | 右上角显示用户名 |
| isLoggedIn | AppHeader.vue | 显示"已登录"徽章 |
| currentUser | HomeView.vue | 首页问候语 "姓名" |
| currentUser | PublishView.vue | 显示当前发布者 |
| currentUser | UserCenterView.vue | 个人资料展示 |
| favorites | TradeView.vue 等四列表页 | 收藏/取消收藏按钮 |
| favorites | UserCenterView.vue | 收藏列表展示与取消 |

## 4. 个人中心功能

### 用户资料区域
- 头像（显示姓名首字）
- 用户姓名 + 学院·年级
- 个人简介
- "编辑资料"按钮 → 展开表单可修改昵称、学院、年级、简介

### 我的收藏
- 从 favoriteStore 读取收藏列表（favorites 数组）
- 展示收藏项及其类型标签（使用 getTypeLabel 映射）
- 提供"取消收藏"按钮
- 收藏项为空时展示 EmptyState 组件

### 我的发布
- 本阶段已完成结构展示，显示提示说明文字
- 基础学生到此为止，进阶学生可继续实现 publisher 字段过滤逻辑

### 消息中心（MessageView.vue）
- 使用静态消息数据展示聊天列表
- 为 Day6 的交互优化提供基础页面结构

## 5. 列表页收藏功能

所有四个业务列表页均添加了收藏按钮：

| 页面 | 收藏类型参数 | 源文件 |
|---|---|---|
| TradeView.vue | `'trade'` | 二手交易每项卡片底部增加收藏按钮 |
| LostFoundView.vue | `'lostFound'` | 失物招领每项卡片底部增加收藏按钮 |
| GroupBuyView.vue | `'groupBuy'` | 拼单搭子每项卡片底部增加收藏按钮 |
| ErrandView.vue | `'errand'` | 跑腿委托每项卡片底部增加收藏按钮 |

收藏按钮逻辑：
- 未收藏时显示"收藏"，点击后调用 `toggleFavorite` 添加
- 已收藏时显示"已收藏"，点击后调用 `toggleFavorite` 取消
- 按钮通过 `isFavorite(type, id)` 实时判断状态

## 5. 跨页面状态使用

### AppHeader.vue
- 读取 userStore.displayName 和 isLoggedIn
- 右上角显示"用户名 + 已登录"信息

### HomeView.vue
- 根据当前时间显示"早上好/下午好/晚上好，XXX"

### PublishView.vue
- 显示"当前发布者：XXX（学院·年级）"
- 后续发布操作可直接使用 userStore 信息填充 publisher 字段

## 6. 我的设计

- **Store 粒度设计**：将用户状态和收藏状态分开为两个 Store，遵循"单一职责"原则。用户 Store 管理用户相关信息，收藏 Store 管理收藏交互状态，互不耦合。
- **模拟用户数据**：使用模拟用户"校园用户（计算机学院·2023 级）"，不接入真实登录。所有页面通过 userStore 获取用户信息，未来接入真实登录只需修改 Store 中的填充逻辑，页面代码无需改动。
- **收藏 Store API 设计**：使用 `isFavorite(type, id)` 作为 action（而非 getter）以支持带参数调用；`toggleFavorite` 内部调用 `isFavorite` 判断后执行添加或移除，避免重复代码。
- **收藏 Store 使用数组**：收藏列表存储为 FavoriteItem 数组，提供 type 和 id 去重判断，避免同一内容多次收藏。
- **我的发布实现方式**：当前为结构展示阶段，显示提示文案。进阶可改为从四个接口获取数据后通过 publisher 字段过滤。
- **列表页统一收藏入口**：四个列表页的 ItemCard footer 插槽中均添加收藏按钮，用户可在浏览时直接收藏感兴趣的内容。
- **状态边界意识**：收藏数据仅存储在 Pinia 内存中，刷新页面后丢失。这是 Day5 有意为之的设计，重点在于理解状态共享而非持久化。后续可结合 localStorage 或后端接口实现持久化。
- **消息中心静态展示**：MessageView.vue 使用静态数组展示三条聊天消息，为 Day6 的交互优化提供基础页面。

## 7. 状态与接口数据、页面数据的区别

| 数据类型 | 示例 | 存放位置 | 共享范围 |
|---|---|---|---|
| 全局状态 | 当前用户信息 | Store（user.ts） | 全局 |
| 交互状态 | 收藏列表 | Store（favorite.ts） | 多个页面 |
| 接口数据 | 全部 trades 列表 | 页面组件或 Store | 按需决定 |
| 页面数据 | 编辑表单输入内容 | 页面组件 | 仅当前页 |

## 8. AI 协作记录

**使用的 AI 工具**：opencode（deepseek-chat）

**核心提示词**：使用任务卡提供的 Day5 标准提示词，要求创建 Pinia Store、完善个人中心页面、实现跨页面状态共享。

**AI 生成的内容**：
1. `src/stores/user.ts` — 完整的 user Store（defineStore、state、getters、actions）
2. `src/stores/favorite.ts` — 完整的 favorite Store（favorites 数组、isFavorite、addFavorite、removeFavorite、toggleFavorite）
3. `src/views/UserCenterView.vue` — 个人中心页面（用户资料展示、收藏列表展示、取消收藏）
4. 跨页面集成 — AppHeader、HomeView、PublishView 中引入和使用 userStore
5. 四列表页收藏按钮 — TradeView、LostFoundView、GroupBuyView、ErrandView 的收藏功能

**AI 生成结果中需要人工判断之处**：
1. Store 的 getter 命名是否语义化（displayName / userDescription）
2. 收藏类型 FavoriteItem 的字段设计是否满足需求（id + type + title + description + location）
3. 个人中心采用推荐的结构展示方式（用户资料卡片 + 收藏面板 + 发布占位），而非复杂的 Tab 切换 + 四接口数据聚合
4. 四个列表页的收藏按钮是否都正确传入了 type 和 id 参数
5. 是否需要在发布页面自动填充 publisher 字段

## 9. 人工调整内容

1. **getter 命名调整**：AI 最初生成的 getter 命名为 `fullName` 和 `description`，手动调整为 `displayName` 和 `userDescription`，更加语义化，避免与表单字段 description 混淆。
2. **收藏 Store 重构**：将 `favoriteList` 重命名为 `favorites`，将 `isFavorited` getter 改为 `isFavorite` action（推荐风格），参数顺序从 `(id, type)` 调整为 `(type, id)`。
3. **FavoriteItem 字段调整**：将 `addedAt` 字段替换为 `description` 和 `location?`，使收藏项直接展示内容描述，不需要额外时间戳。
4. **个人中心重构**：从复杂的 Tab 切换 + 四接口数据聚合方案，改为推荐的结构展示方案（用户资料卡片 + 收藏面板 + 发布占位）。删除 `getTrades`、`getLostFounds` 等 API 调用，简化为只依赖 Store。
5. **列表页收藏按钮扩展**：从仅 TradeView 扩展到全部四个业务列表页面，每个页面都引入 `useFavoriteStore` 并添加收藏按钮。
6. **ItemCard 的 footer 插槽使用**：使用已有的 footer 插槽来放置收藏按钮和取消收藏按钮，不需要修改 ItemCard 组件。
7. **TypeScript 编译错误修复**：修复了模板中 `fav.id + fav.type` 的类型错误以及 filter 语法错误。
8. **消息中心静态数据**：MessageView.vue 保留静态消息数组，未引入额外状态管理。

## 10. 测试记录

### 测试 1：Store 状态验证

1. 打开浏览器开发者工具 → Vue Devtools → Pinia 面板
2. 确认 user Store 存在，state 中包含 isLoggedIn: true 和 currentUser 模拟数据
3. 确认 favorite Store 存在，favorites 初始为空数组

### 测试 2：导航栏用户信息

1. 访问首页（/）
2. 确认导航栏右上角显示"校园用户"和"已登录"绿色徽章

### 测试 3：个人中心 - 用户资料

1. 访问 /user
2. 确认头像区域显示用户姓名首字"校"
3. 确认显示"校园用户"、"计算机学院 · 2023 级"、个人简介
4. 确认页面为推荐结构：用户资料卡片 + 我的收藏面板 + 我的发布面板

### 测试 4：二手交易页 - 收藏操作

1. 访问 /trade
2. 确认每张 ItemCard 底部都有"收藏"按钮
3. 点击第一个商品的"收藏"按钮
4. 确认按钮文字变为"已收藏"
5. 再次点击"已收藏"按钮，确认按钮文字变回"收藏"（取消收藏）

### 测试 5：个人中心 - 我的收藏

1. 在二手交易页收藏 1-2 个商品
2. 访问 /user
3. 确认"我的收藏"面板显示刚才收藏的商品信息
4. 点击"取消收藏"按钮，确认收藏项被移除
5. 全部移除后确认显示 EmptyState "暂无收藏内容"

### 测试 6：消息中心

1. 访问 /message
2. 确认显示三条聊天消息（张三、李四、王五）

### 测试 6：首页问候

1. 访问首页（/）
2. 确认显示"早上好/下午好/晚上好，校园用户！"

### 测试 7：发布页面显示

1. 访问 /publish
2. 确认页面显示"当前发布者：校园用户（计算机学院·2023 级）"

### 验证要点

| 检查项 | 结果 |
|---|---|
| Pinia 是否已挂载（main.ts） | ✅ |
| user Store 是否可访问 | ✅ |
| favorite Store 是否可访问 | ✅ |
| AppHeader 是否显示用户名 | ✅ |
| 首页问候语是否正确 | ✅ |
| 发布页面是否显示发布者信息 | ✅ |
| 个人中心资料展示（推荐布局） | ✅ |
| 我的发布结构展示 | ✅ |
| 二手交易页收藏/取消收藏 | ✅ |
| 失物招领页收藏/取消收藏 | ✅ |
| 拼单搭子页收藏/取消收藏 | ✅ |
| 跑腿委托页收藏/取消收藏 | ✅ |
| 个人中心收藏列表与取消 | ✅ |
| 消息中心静态展示 | ✅ |
| TypeScript 编译通过 | ✅ |
| Vite 构建成功 | ✅ |

## 11. 遇到的问题与解决方法

### 问题 1：TypeScript 编译报错 — filter 语法不支持

在模板中使用了 `fav.type | typeLabel` 的 Vue 2 风格的 filter 语法，TypeScript 报错。解决方法：改为函数调用 `typeLabel(fav.type)`。

### 问题 2：收藏列表 key 类型错误

`fav.id` 是 number 类型，`fav.type` 是 string 类型，拼接 `fav.id + fav.type` 时 TypeScript 提示类型不兼容。解决方法：使用模板字符串 `:key="\`fav-${fav.type}-${fav.id}\`"` 确保类型安全。

### 问题 3：FavoriteItem 字段设计

最初设计的 FavoriteItem 包含 `addedAt` 时间戳字段，但在个人中心展示时，时间戳对用户无实际意义。改为包含 `description` 和 `location?` 字段，直接复用 ItemCard 组件的展示能力，收藏项能直接显示标题、描述和地点。

### 问题 4：个人中心方案选择

最初实现了复杂的 Tab 切换 + 四接口数据聚合方案（fetchAllPublishes + myPublishes computed），代码量较大且包含多个 API 调用。根据任务建议，改为推荐的结构展示方案：用户资料卡片 + 收藏面板 + 发布占位提示。这种方案更简洁，适合基础学生理解 Pinia 的核心用途。

## 12. 今日反思

Day5 是我从"页面功能实现"走向"前端应用组织"的关键一天。引入 Pinia 之前，多个页面共享数据只能通过 props 逐层传递或者简单的全局变量，维护起来非常麻烦。有了 Pinia 之后，用户信息在导航栏、首页、发布页面和个人中心之间可以无缝共享，编辑资料后所有地方同步更新——这种"一处修改，处处生效"的体验让我直观感受到状态管理带来的便利。

在设计两个 Store 时，我认真思考了"哪些状态应该放在 Store 中"这个问题。用户信息显然是全局共享的，收藏状态也是跨页面（列表页和个人中心）使用的，这两个放在 Store 中合情合理。而表单输入框的内容、临时校验错误信息等，只属于单个页面，放在页面组件内部即可。这种"共享 vs 私有"的区分原则，是理解状态管理精髓的第一步。

收藏功能的实现让我体会到前端交互状态和持久化数据的区别。目前的收藏只是存储在内存中（Pinia 的 state），刷新页面后就会丢失。如果要做真正的收藏功能，需要将收藏数据保存到后端数据库——但那是 Day6 的任务了。Day5 阶段先用内存模拟，重点在于理解"如何通过 Store 跨页面共享交互状态"。

个人中心的"我的发布"功能也很有意思。它需要从四种不同类型的数据集合中找出当前用户发布的内容，这让我认识到：真实项目中"我的"类功能往往需要后端提供专门的聚合查询接口，或者在前端做多来源数据合并。在当前阶段，前端的合并方式虽然简单粗暴，但让我理解了数据来源多样化的挑战。

通过 AI 协作生成 Store 代码和个人中心页面，我体会到 AI 在"生成框架代码"方面效率极高——defineStore 的模式代码、getter 和 action 的基本结构、个人中心页面的骨架都可以快速生成。但具体的数据过滤逻辑、字段映射关系、样式细节和 TypeScript 类型修正，仍然需要人工逐行审查和调整。AI 是高效的起点，但不是可靠的终点。

Day5 的一个关键收获是状态边界的理解。明确了哪些数据放入 Store（用户信息、收藏列表）、哪些不放入 Store（单个页面的表单输入、临时的校验错误、接口返回的完整数据列表）。这种"共享 vs 私有"的区分能力，是做好前端状态管理的基础。消息中心目前保持静态展示，没有引入 Store，因为消息数据目前只在消息页面使用，不涉及跨页面共享——如果有跨页面需求（如导航栏显示未读消息数），那时再把它提取到 Store 中也不迟。在不确定时先放在页面组件里，比把所有数据都塞进 Store 要更合理。
