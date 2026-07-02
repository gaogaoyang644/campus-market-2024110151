# 校园轻集市 (Campus Market)

基于 Vue 3 的校园轻集市前端项目——校园二手交易、失物招领、拼单搭子、跑腿委托综合平台。

## 项目简介

校园轻集市是一个面向高校学生的校园生活服务平台，提供四大核心业务模块：
- **二手交易**：浏览、搜索、收藏校园二手商品
- **失物招领**：发布和查看失物/拾物信息
- **拼单搭子**：寻找拼单伙伴，分摊优惠
- **跑腿委托**：发布和接受跑腿任务

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Vue 3 (Composition API) |
| 编程语言 | TypeScript |
| 构建工具 | Vite |
| 路由 | Vue Router 4 |
| 状态管理 | Pinia |
| 网络请求 | Axios |
| Mock 后端 | JSON Server |
| 代码规范 | ESLint + Oxlint |
| AI 协作 | OpenCode |

## 快速开始

### 安装依赖
```bash
nvm use
pnpm install
```

### 启动 Mock 服务（终端 1）
```bash
pnpm mock
```
JSON Server 将运行在 http://localhost:3001

### 启动前端项目（终端 2）
```bash
pnpm dev
```
访问 http://localhost:5173

### 构建项目
```bash
pnpm build
```

## 项目目录说明

```
campus-market-2024110151
├── docs/
│   ├── ai/                     # AI 协作记录
│   ├── evidence/               # 每日过程证据 (Day1-Day7)
│   └── guide/                  # 环境配置与快速开始指南
├── public/                     # 静态资源
├── src/                        # 项目源码
│   ├── api/                    # API 接口封装 (Axios)
│   │   ├── http.ts             # Axios 实例与拦截器
│   │   ├── trade.ts            # 二手交易 API
│   │   ├── lostFound.ts        # 失物招领 API
│   │   ├── groupBuy.ts         # 拼单搭子 API
│   │   ├── errand.ts           # 跑腿委托 API
│   │   └── user.ts             # 用户 API
│   ├── components/             # 公共组件
│   │   ├── AppHeader.vue       # 顶部导航栏
│   │   ├── AppLayout.vue       # 整体布局
│   │   ├── AppNav.vue          # 底部导航
│   │   ├── EmptyState.vue      # 空状态组件
│   │   ├── ErrorState.vue      # 错误状态组件
│   │   ├── FormField.vue       # 表单字段组件
│   │   ├── ItemCard.vue        # 信息卡片组件
│   │   ├── LoadingState.vue    # 加载状态组件
│   │   └── SearchBar.vue       # 搜索栏组件
│   ├── router/                 # 路由配置
│   ├── stores/                 # Pinia 状态管理
│   │   ├── user.ts             # 用户状态
│   │   └── favorite.ts         # 收藏状态
│   ├── views/                  # 页面视图
│   │   ├── HomeView.vue        # 首页
│   │   ├── TradeView.vue       # 二手交易
│   │   ├── LostFoundView.vue   # 失物招领
│   │   ├── GroupBuyView.vue    # 拼单搭子
│   │   ├── ErrandView.vue      # 跑腿委托
│   │   ├── PublishView.vue     # 发布页面
│   │   ├── LoginView.vue       # 登录
│   │   ├── RegisterView.vue    # 注册
│   │   ├── UserCenterView.vue  # 个人中心
│   │   └── MessageView.vue     # 消息中心
│   ├── style/                  # 全局样式
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 入口文件
├── db.json                     # Mock 数据
├── CHECK_REPORT.md             # 检测报告
└── package.json                # 项目配置
```

## 核心功能

- 四大业务列表：二手交易、失物招领、拼单搭子、跑腿委托
- 关键词搜索与按分类筛选
- 信息收藏与个人中心查看
- 信息发布与表单校验
- 模拟登录/注册与用户状态持久化
- 加载状态、空状态、错误状态提示

## 每日开发记录

| 天数 | 内容 |
|------|------|
| Day1 | 项目启动与业务梳理 |
| Day2 | 页面骨架与路由导航 |
| Day3 | Mock 数据建模与列表渲染 |
| Day4 | 发布表单与数据新增 |
| Day5 | 状态管理与用户中心 |
| Day6 | 交互优化与体验完善 |
| Day7 | 综合验收与项目展示 |

## AI 协作说明

本项目在开发过程中使用 AI Coding 工具 (OpenCode) 辅助完成页面骨架、Mock 数据、接口封装、表单设计、状态管理和交互优化。开发者对 AI 生成内容进行了人工审查、修改和取舍，具体过程记录在 `docs/evidence/` 和 `docs/ai/` 中。
