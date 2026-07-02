# Day6 Evidence - Mock 注册登录、用户状态持久化与交互优化

## 1. 今日完成内容

本日完成了校园轻集市项目的 Mock 注册/登录功能、用户状态持久化、页面联动改造和交互体验优化。具体包括：在 db.json 中增加了 users 数据资源并预置了测试账号；创建了注册页面和登录页面，实现用户数据写入 JSON Server 和账号密码校验；改造了 userStore，使用 Pinia + localStorage 管理登录、退出和状态恢复；改造了 AppHeader 导航栏，根据登录状态显示不同入口；改造了 PublishView 和 UserCenterView，处理未登录状态的提示；在首页增加了登录/注册入口。

## 2. 注册登录设计

### 用户数据设计
在 db.json 中新增 users 数组，每个用户包含 id、username、password、name、college、grade、bio 字段。预置了两个测试账号：test/123456 和 admin/admin123。

### 注册流程
用户在 /register 填写用户名、密码、昵称等信息，提交时先调用 getUsers() 检查用户名是否已存在，不存在则调用 createUser() 将新用户写入 JSON Server /users 接口，注册成功后自动登录并跳转首页。

### 登录流程
用户在 /login 输入用户名和密码，提交时调用 getUsers() 获取全部用户，在客户端通过 find() 匹配用户名和密码。匹配成功则调用 userStore.login() 保存状态，失败则提示"用户名或密码错误"。

### 状态保存
登录成功后，userStore 的 login() 方法将当前用户信息保存到 Pinia 的 state 中，同时写入 localStorage（key 为 campus_market_user）。退出时 logout() 清空 Pinia state 并删除 localStorage 中的记录。App.vue 在 onMounted 时调用 restoreLogin()，从 localStorage 中恢复登录状态。

## 3. 状态持久化设计

使用 localStorage 实现登录状态持久化的原因是：Pinia 的状态在浏览器刷新后会丢失，而 localStorage 的数据不会因页面刷新而消失。通过在登录成功时将用户信息写入 localStorage，并在 App 根组件挂载时读取恢复，实现了"刷新后仍保持登录"的效果。这种方案简单有效，适合前端实训项目。但在生产环境中，持久化应当使用 HttpOnly Cookie + Token 的方式，而不是 localStorage，因为 localStorage 存在 XSS 安全风险。

## 4. 交互优化清单

| 优化内容 | 涉及页面或组件 | 优化目的 |
|---|---|---|
| 注册功能 | RegisterView.vue | 实现新用户注册并写入 Mock API |
| 登录功能 | LoginView.vue | 实现账号密码校验和状态保存 |
| 退出登录 | AppHeader.vue | 清空状态并跳转首页 |
| 登录状态恢复 | App.vue、userStore | 刷新后从 localStorage 恢复 |
| 导航栏状态 | AppHeader.vue | 登录显示用户名，未登录显示登录/注册 |
| 发布页登录提示 | PublishView.vue | 未登录时提示先登录 |
| 个人中心登录提示 | UserCenterView.vue | 未登录时显示登录/注册入口 |
| 首页登录入口 | HomeView.vue | 未登录时显示登录/注册按钮 |
| 加载状态 | LoadingState.vue | 请求数据时显示加载中 |
| 错误状态 | ErrorState.vue | 请求失败时显示错误提示 |
| 搜索功能 | SearchBar.vue、TradeView.vue 等 | 四类业务页支持关键词搜索 |

## 5. 页面联动记录

注册/登录状态影响以下页面：
- AppHeader：登录后显示用户名和退出按钮，未登录显示"登录"和"注册"链接
- HomeView：登录后显示问候语，未登录增加登录/注册按钮
- PublishView：登录后显示当前发布者，未登录显示"请先登录后再发布信息"
- UserCenterView：登录后展示个人资料和收藏，未登录显示"请先登录"提示
- 所有列表页：搜索、加载、错误状态均正常工作

## 6. 为什么本项目不是生产级认证系统

本项目的注册/登录是教学场景下的 Mock 实现，存在以下安全局限性：
- 密码以明文存储在 db.json 中，没有加密
- 用户数据通过 HTTP 明文传输，没有 HTTPS
- 没有使用 JWT Token 或 Session，登录后没有服务端验证
- 没有路由守卫，用户可以直接访问 URL
- localStorage 存储的用户信息可以被浏览器开发者工具读取
- 没有防止 XSS、CSRF 等安全攻击的措施
- 用户名查重只在前端检查，没有后端唯一约束

因此，本项目不适合用于生产环境。真实项目中还需要密码加密（bcrypt）、Token 管理、路由守卫、HTTPS、安全 Cookie 等机制。

## 7. AI 协作记录

使用的 AI 工具：opencode（DeepSeek 模型）。

核心任务：按照 Day6 实训要求完成 Mock 注册登录、状态持久化、页面联动改造。

AI 生成内容：
- src/api/user.ts：用户 API 模块
- RegisterView.vue 和 LoginView.vue：注册和登录页面
- stores/user.ts：改造后的 userStore（含 localStorage 持久化）
- App.vue：登录状态恢复
- AppHeader.vue：登录/退出 UI
- UserCenterView.vue 和 PublishView.vue：未登录状态处理

人工调整内容：
- 调整了 userStore 中 LoginUser 接口的字段，使其与 db.json 中的 UserAccount 一致
- 在 PublishView.vue 中添加了 RouterLink 的 import
- 在注册页面增加了用户名查重逻辑
- 统一了错误提示文案风格
- 确认没有引入 JWT、权限路由等超出范围的功能

## 8. 完整功能走查记录

1. 打开首页，导航正常，显示"晚上好，未登录！"和登录/注册按钮
2. 点击"注册"，进入 /register 注册页面
3. 填写新用户信息（用户名: zhangshan, 密码: 123, 昵称: 张三）
4. 提交注册，提示"注册成功！"，自动跳转首页
5. 打开 db.json，确认 users 中新增了用户数据
6. 退出登录
7. 使用 test/123456 测试登录
8. 登录成功后首页显示"晚上好，测试用户！"
9. 导航栏显示"测试用户"和"退出"按钮
10. 刷新页面，确认仍然保持登录状态（localStorage 恢复）
11. 进入发布页面，显示"当前发布者：测试用户"
12. 进入个人中心，显示用户资料和收藏信息
13. 点击退出，提示"已退出登录"，跳转首页
14. 未登录状态下访问个人中心，显示"请先登录"提示
15. 未登录状态下打开发布页面，显示"请先登录后再发布信息"
16. 进入二手交易页面，搜索功能正常
17. 停止 JSON Server，刷新列表页，显示错误提示和重新加载按钮
18. 恢复 JSON Server，点击重新加载，页面恢复

## 9. 遇到的问题与解决方法

问题1：注册成功后需要自动登录，但 createUser() 返回的数据不包含 id。
解决方法：在注册成功后将 created.data 中的信息传递给 userStore.login()，JSON Server 自动生成 id 并返回。

问题2：userStore 初始化的 state 中，如果从 localStorage 读取空数据会导致 currentUser 字段缺失。
解决方法：在 state 初始化时调用 loadFromStorage()，如果返回 null 则使用空的默认对象。

问题3：AppHeader.vue 中退出登录后，导航栏和首页没有立即更新。
解决方法：退出时调用 router.push('/') 跳转首页，同时 userStore.logout() 更新响应式状态，模板自动重新渲染。

## 10. 今日反思

通过 Day6 的实训，我深刻理解了前端项目中"用户身份来源"的重要性。从 Day5 的"写死模拟用户"升级到"注册登录驱动的用户状态"，项目的完整性和可演示性有了明显提升。注册、登录、退出、状态恢复、导航联动、发布人关联、个人中心展示，这些功能都不是独立存在的，而是围绕用户状态形成一条完整链路。Pinia 负责运行时状态管理，localStorage 负责刷新后的状态恢复，JSON Server 提供前端实训阶段的 Mock 用户数据，三者缺一不可。同时我也认识到，Mock 注册登录只是教学场景下的简化实现，真实项目还需要密码加密、Token 验证、路由守卫、安全防护等机制。在 Day6 的交互优化方面，加载状态、错误状态、搜索功能、按钮反馈等细节，让项目从"功能能跑"走向了"用户可以顺畅使用"，为 Day7 的最终展示做好了准备。
