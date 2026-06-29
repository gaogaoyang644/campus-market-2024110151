# Day3 Evidence - Mock 数据建模与列表渲染

## 1. 今日完成内容

完成了四类核心业务的 Mock 数据结构设计、JSON Server 启动配置、Axios 请求封装、业务 API 模块创建、通用卡片组件开发、空状态组件开发，以及四个核心页面的数据请求和列表渲染工作。

## 2. Mock 数据结构说明

| 数据集合 | 对应业务 | 主要字段 | 页面用途 |
|---|---|---|---|
| trades | 二手交易 | title、price、category、condition、publisher、publishTime、location、images、description、status | 展示二手商品列表 |
| lostFound | 失物招领 | title、type、itemName、location、eventTime、contact、description、status | 展示失物和招领信息 |
| groupBuys | 拼单搭子 | title、type、targetCount、currentCount、deadline、location、publisher、description、status | 展示拼单和搭子信息 |
| errands | 跑腿委托 | title、taskType、reward、from、to、deadline、publisher、description、status | 展示跑腿任务列表 |

## 3. 我的设计

我主要做了以下设计判断：

**二手交易为什么要 price 和 condition？**
因为二手交易的核心是买卖，价格和成色是买家最关心的两个信息。price 用于展示金额，condition 帮助判断物品的新旧程度，两者缺一不可。

**失物招领为什么要 type 字段？**
我特别保留了 type 字段并用 'lost' 和 'found' 区分，因为失物招领包含"寻物"和"招领"两种完全不同的场景，页面展示时需要分别用"丢失"和"拾到"标签区分，这个字段是必须的。

**拼单搭子为什么要 targetCount 和 currentCount？**
我保留了这两个字段，因为拼单业务的核心是"凑人数"，用户需要知道还差几个人才能成团。currentCount/targetCount 的进度展示是拼单页面的关键交互点。

**跑腿委托为什么要 from、to 和 reward？**
跑腿委托的核心是"从哪里送到哪里"以及"报酬多少"。from 和 to 描述任务路线，reward 决定任务吸引力，这三个字段一起才能完整描述一个跑腿任务。

**我补充了 description 字段：**
AI 最开始生成的 trades 数据没有 description 字段，但 ItemCard 组件需要展示描述内容。我发现页面中 description 显示为 undefined 后，手动为每条 trade 数据补充了贴近校园生活的描述文本。

**状态字段设计：**
我统一使用了 open、closed、done 三种状态，对应到页面上分别显示为不同的颜色标签（蓝色/灰色/绿色），让用户一目了然。

## 4. AI 设计

AI 帮我生成了以下内容：

- **db.json**：AI 根据四类业务生成了完整的数据结构，每类包含 5-6 条贴近校园场景的数据，字段命名也比较清晰。
- **API 模块**：AI 为每类业务创建了独立的 API 文件，包括 TypeScript 接口定义和请求函数。
- **页面代码**：AI 在四个 View 文件中添加了数据请求和列表渲染逻辑，使用了 onMounted + ref 的模式。
- **ItemCard 组件**：AI 生成了可在四个页面复用的卡片组件，支持 title、description、tag、location、time 等 props 和 footer 插槽。
- **EmptyState 组件**：AI 生成了空状态展示组件，并在四个页面中集成了空状态判断。

**AI 设计中我注意到的问题：**

1. **trades 缺少 description 字段**：AI 生成的 trades 数据中没有 description，但 ItemCard 组件需要展示描述内容。如果不加，页面上会显示 undefined，这是我人工审查时发现并手动补充的。

2. **数据字段比较简洁**：AI 没有添加过多复杂字段，这反而是好事，符合 Day3 的要求。如果 AI 生成了用户表、评论表、订单表等复杂结构，我会直接删除。

3. **集合命名单复数混用**：AI 使用了 lostFound（单数）作为集合名，而其他三个是复数 trades、groupBuys、errands。我检查了命名一致性后决定保留，因为 JSON Server 的 key 只要前后端路径一致即可运行。

## 5. 最终调整

我自己做了以下修改：

1. **补充 description 字段**：为 trades 中的 6 条数据逐一添加了校园场景的描述文本，如"高等数学第七版上册，笔记已标记重点，适合期末复习"。
2. **调整个别数据内容**：将部分数据的时间、地点调整为更贴近真实校园生活的场景。
3. **状态区分**：在每类数据中混入了 open、closed、done 三种状态的数据，确保页面能展示不同的状态标签颜色。
4. **证据卡记录**：撰写本证据卡，记录我的设计思路和 AI 协作过程。

## 6. 遇到的问题与解决方法

**问题：npm run mock 无法启动，提示 json-server 未安装**

解决方法：执行 `npm install json-server -D` 安装后重新运行。

**问题：trades 页面 description 显示为 undefined**

排查过程：
1. 打开浏览器开发者工具查看 Network 面板，确认 API 返回的 trades 数据中没有 description 字段。
2. 检查 ItemCard 组件的 props，确认 description 是从 props 传入的。
3. 最终定位到 db.json 中 trades 的每条数据缺少 description 字段。
4. 手动补充后页面正常显示。

**问题：跨域问题**

解决方法：确认 JSON Server 启动在 3001 端口，Vite 在 5173 端口，Axios baseURL 配置为 http://localhost:3001。JSON Server 默认支持 CORS，未出现跨域报错。

## 7. 今日反思

通过 Day3 的任务，我深刻理解了 Mock 数据、JSON Server 和列表渲染在前后端分离开发中的重要性。Mock 数据是前端开发的基石，没有合理的数据结构设计，页面展示就无法真实反映业务需求。JSON Server 提供了一种轻量级的 Mock API 方案，让我在不依赖后端的情况下就能完成接口调试和页面开发。

最让我有收获的是手动发现并修复 AI 生成的数据缺陷——trades 缺少 description 字段。这说明 AI 工具虽然能快速生成大量代码，但学生必须主动审查才能保证数据质量。我的设计思路是以页面展示需求为导向，先想清楚每个页面要展示什么信息，再倒推数据需要哪些字段。这种"页面驱动数据设计"的思路在后续 Day4 的发布表单、Day5 的状态管理中还会继续用到。

总的来说，Day3 让项目从"静态页面"进入了"数据驱动页面"阶段，为后续的功能迭代打下了基础。
