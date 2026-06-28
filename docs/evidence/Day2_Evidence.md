# Day2 实训证据文档

## 一、今日新增页面清单

共创建 7 个页面组件，位于 `src/views/` 目录下：

| 序号 | 文件名称 | 功能描述 |
|------|----------|----------|
| 1 | `HomeView.vue` | 首页，展示商品列表/推荐内容 |
| 2 | `ListView.vue` | 列表页，分类浏览全部商品 |
| 3 | `DetailView.vue` | 详情页，展示单个商品详细信息 |
| 4 | `PublishView.vue` | 发布页，用户发布闲置商品 |
| 5 | `MessageView.vue` | 消息页，聊天/通知消息列表 |
| 6 | `ProfileView.vue` | 个人中心，用户信息与设置 |
| 7 | `BoardView.vue` | 看板页，数据统计图表展示 |

## 二、路由设计方案

### 2.1 路由配置

共 7 条路由，定义在 `src/router/index.ts`：

| path | name | 对应组件 | 参数 |
|------|------|----------|------|
| `/home` | HomeView | HomeView.vue | 无 |
| `/list` | ListView | ListView.vue | 无 |
| `/detail/:id` | DetailView | DetailView.vue | `:id` 动态路由参数 |
| `/publish` | PublishView | PublishView.vue | 无 |
| `/message` | MessageView | MessageView.vue | 无 |
| `/profile` | ProfileView | ProfileView.vue | 无 |
| `/board` | BoardView | BoardView.vue | 无 |

### 2.2 懒加载配置

所有路由组件均使用动态 `import()` 实现懒加载（Lazy Loading），语法如下：

```typescript
component: () => import('@/views/HomeView.vue'),
```

仅在访问对应路由时才会加载该组件代码，减少首屏包体积，提升页面加载性能。

### 2.3 App.vue 导航设计

使用 Element Plus 的 `el-menu` 组件实现顶部导航栏，通过 `router` 属性启用 Vue Router 模式，`el-menu-item` 的 `index` 属性绑定路由 path，点击即可完成页面跳转。示例代码：

```vue
<el-menu mode="horizontal" router>
  <el-menu-item index="/home">首页</el-menu-item>
  <el-menu-item index="/list">列表页</el-menu-item>
  <el-menu-item index="/detail/1">详情页</el-menu-item>
  <el-menu-item index="/publish">发布页</el-menu-item>
  <el-menu-item index="/message">消息页</el-menu-item>
  <el-menu-item index="/profile">个人中心</el-menu-item>
  <el-menu-item index="/board">看板页</el-menu-item>
</el-menu>
<router-view />
```

## 三、开发过程遇到的问题

### 3.1 npm 安装相关

**问题**：执行 `npm install` 时安装速度慢，部分依赖下载超时。

**解决**：使用淘宝镜像源加速安装，命令如下：

```bash
npm config set registry https://registry.npmmirror.com
```

重新执行 `npm install` 后安装成功。

### 3.2 TypeScript 类型报错

**问题**：运行 `npm run typecheck` 或编辑器中报 TypeScript 类型错误，如 `el-menu` 组件 `router` 属性类型不匹配、`el-menu-item` 缺少类型声明等。

**解决**：确认 `tsconfig.app.json` 已正确配置，确保 Element Plus 的类型声明文件被正确引用；检查组件属性和 TypeScript 类型匹配，对于框架提供的组件属性以官方类型声明为准。

### 3.3 项目启动失败

**问题**：执行 `npm run dev` 后控制台报错，Vite 服务无法正常启动。

**解决**：检查 Node.js 版本是否符合 `.nvmrc` 要求，删除 `node_modules` 和 `package-lock.json` 后重新执行 `npm install`，再次启动正常。

### 3.4 路由传参问题

**问题**：详情页使用动态路由 `/detail/:id`，从列表页跳转到详情页时参数传递不正确，`el-menu-item` 的 `index` 中 `/detail/1` 使用了固定参数而非动态绑定。

**解决**：在列表页中使用编程式导航 `router.push` 传递动态 `id` 参数，配合 `useRoute` 在 DetailView 中通过 `route.params.id` 获取参数；导航栏中的 `/detail/1` 作为演示入口使用，页面内跳转使用编程式导航传递真实数据。

## 四、AI 协作记录

### 4.1 页面创建

使用 OpenCode 辅助生成 7 个页面组件的基础模板。通过 `opencode chat` 指令输入"请帮我创建 HomeView 首页组件，使用 Element Plus 布局"，AI 生成包含组件模板、脚本、样式的基础代码，大幅提升页面创建效率。

### 4.2 路由配置

使用 OpenCode 协助完成路由配置文件编写，AI 一次性生成 7 条路由配置，包含懒加载 `import()` 和动态路由参数 `/detail/:id` 的正确写法，避免手动逐条编写导致的语法错误。

### 4.3 进阶功能开发

通过 OpenCode 获取以下技术支持：

- **Element Plus 集成**：AI 指导在 `main.ts` 中正确注册 Element Plus 插件，提供 `el-menu` + `router` 属性实现导航跳转的最佳实践；
- **TypeScript 类型处理**：针对编译时的类型报错，AI 提供类型声明配置建议和代码修正方案；
- **路由传参**：AI 解释动态路由 `:id` 的解析方式，提供 `useRoute` / `useRouter` 完整使用示例；
- **语法检查**：使用 `npm run typecheck` 和 `npm run lint` 检查代码质量，AI 帮助解读报错信息并给出修正方案。

### 4.4 协作总结

OpenCode 在 Day2 开发中主要发挥代码生成助手和技术咨询两个角色。页面骨架代码由 AI 生成后手动调整，路由配置直接复用 AI 输出结果，遇到编译错误时通过向 AI 描述问题快速获取解决方案。AI 协作将页面+路由的搭建时间缩短约 60%，同时减少了语法和配置层面的低级错误。
