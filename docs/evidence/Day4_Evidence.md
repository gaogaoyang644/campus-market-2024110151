# Day4 Evidence - 发布表单设计、表单校验、数据提交与页面联动

## 1. 今日完成内容

完成了发布页面的业务类型选择（下拉切换四种发布类型）、动态表单字段渲染（v-if 按类型显示不同字段）、基础表单校验（clearErrors + validateForm 方式）、Axios POST 数据提交，以及提交成功后的页面跳转与 alert 反馈功能。实现了二手交易、失物招领、拼单搭子、跑腿委托四类业务的统一发布入口。

## 2. 发布类型与字段设计

| 发布类型 | 对应数据集合 | 关键字段 | 设计理由 |
|---|---|---|---|
| 二手交易 | trades | title、category、price、condition、location、description | 需要展示商品基本信息和交易条件 |
| 失物招领 | lostFound | title、type、itemName、location、eventTime、description | 需要区分寻物和招领，并描述物品信息 |
| 拼单搭子 | groupBuys | title、type、targetCount、deadline、location、description | 需要说明人数目标和截止时间 |
| 跑腿委托 | errands | title、taskType、reward、from、to、deadline、description | 需要说明任务内容、地点和酬劳 |

### 通用字段（所有类型共用）

所有发布类型共享 title（标题）、location（地点）、description（描述）三个字段，因为它们构成了任何发布信息的基本骨架——告诉别人"什么、在哪、具体情况如何"。

### 二手交易特有字段

- **category（分类）**：帮助买家快速筛选商品类型，如教材、数码、日用等
- **price（价格）**：二手交易的核心信息，必须大于 0 才有买卖意义
- **condition（成色）**：影响买家决策的关键因素，按全新/九成新/正常使用痕迹三档划分

### 失物招领特有字段

- **lostFoundType（信息类型）**：区分"寻物"和"招领"两种场景，用户在列表页需要分别查看
- **itemName（物品名称）**：明确丢失或拾到的具体物品
- **eventTime（发生时间）**：帮助判断物品丢失/拾到的时间范围

### 拼单搭子特有字段

- **groupType（拼单类型）**：如拼餐、学习资料、课程团购等，便于用户按兴趣分类浏览
- **targetCount（目标人数）**：拼单的核心参数，最少 2 人才能称为"拼"
- **deadline（截止时间）**：拼单有时间限制，过了截止时间自动失效

### 跑腿委托特有字段

- **taskType（任务类型）**：取快递、代买、搬运等，帮助接单者快速了解任务性质
- **reward（酬劳）**：激励他人接单的核心因素，不能为负数
- **from（取件地点）/ to（送达地点）**：跑腿任务的起止位置
- **deadline（截止时间）**：必须在指定时间前完成

## 3. 表单校验规则

以下是各字段的校验规则设计：

| 字段 | 发布类型 | 校验规则 | 设计理由 |
|---|---|---|---|
| title | 全部 | 不能为空 | 没有标题用户无法快速了解内容 |
| location | 全部 | 不能为空 | 所有发布都需要知道地点 |
| description | 全部 | 不能为空 | 正文描述是信息核心 |
| category | 二手交易 | 不能为空 | 没有分类不方便筛选 |
| price | 二手交易 | 必须 > 0 | 价格为 0 或负数没有交易意义 |
| condition | 二手交易 | 不能为空 | 买家需要知道成色状态 |
| itemName | 失物招领 | 不能为空 | 必须说明丢了/捡到了什么 |
| eventTime | 失物招领 | 不能为空 | 事件发生时间对失物招领很重要 |
| groupType | 拼单搭子 | 不能为空 | 需要明确拼的是什么 |
| targetCount | 拼单搭子 | 不能 < 2 | 拼单至少需要 2 人 |
| deadline | 拼单搭子/跑腿 | 不能为空 | 有时间限制的业务必须设截止时间 |
| taskType | 跑腿委托 | 不能为空 | 需要明确任务内容 |
| reward | 跑腿委托 | 不能为负数 | 酬劳可以是 0（免费帮忙），但不能为负 |
| from | 跑腿委托 | 不能为空 | 需要明确取件地点 |
| to | 跑腿委托 | 不能为空 | 需要明确送达地点 |

## 4. 校验逻辑说明

校验采用 `clearErrors()` + `validateForm()` 的模式，逐字段检查：

```typescript
function clearErrors() {
  Object.keys(errors).forEach((key) => { errors[key] = '' })
}

function validateForm() {
  clearErrors()
  if (!form.title) { errors.title = '请输入标题' }
  if (!form.location) { errors.location = '请输入地点' }
  if (!form.description) { errors.description = '请输入描述' }
  // 按 publishType 分类型校验特有字段 ...
  return Object.values(errors).every((message) => !message)
}
```

校验特点：
- 每次校验前先清空 errors，避免残留旧校验结果
- 根据 `publishType.value` 判断当前发布类型，只校验该类型相关的字段
- 校验失败时对应表单项通过 `:error="errors.xxx"` 显示错误提示
- 返回布尔值供 handleSubmit 判断是否继续提交

## 5. 数据提交流程

```
用户填写表单 → 点击发布 → validateForm() 校验
  ├─ 校验失败 → 在对应字段下方显示错误提示
  └─ 校验通过 → submitting = true → 禁用按钮（显示"提交中..."）
       └─ 根据 publishType 调用对应 API POST 请求
            ├─ 成功 → window.alert 成功提示 → router.push 跳转到列表页
            └─ 失败 → console.error(error) + window.alert('检查 Mock 服务')
                 └─ submitting = false 恢复按钮
```

提交时的关键处理：
- **getCurrentTime()**：自动生成 `YYYY-MM-DD HH:mm` 格式的发布时间，与 db.json 数据格式一致
- **类型路由跳转**：trade → `/trade`，lostFound → `/lost-found`，groupBuy → `/group-buy`，errand → `/errand`
- **submitting 状态**：提交过程中按钮置灰且文字变为"提交中..."，防止重复提交

## 6. 我的设计

- **统一表单对象 + 按类型切换字段**：所有类型字段放在一个 `reactive` 对象中，通过 `v-if` 按类型显示不同字段。这种设计对初学者友好，不需要复杂的动态表单模型，代码逻辑清晰易懂。
- **clearErrors + validateForm 分离**：将清空错误和校验逻辑分成两个函数，resetForm 中可以复用 clearErrors，避免重复代码。
- **分类型提交的 if 结构**：四个 if 语句分别处理四种发布类型，每个 if 内部的字段映射和提示清晰独立，方便后续针对某个类型单独调整。
- **使用 reactive 管理 errors**：直接通过 `errors.field = msg` 赋值，Vue 自动追踪响应式变化。

## 7. API 扩展

在原有只有 GET 请求的基础上，为四个 API 模块分别添加了 POST 提交函数：

| 文件 | 新增函数 |
|---|---|
| src/api/trade.ts | createTrade(data) |
| src/api/lostFound.ts | createLostFound(data) |
| src/api/groupBuy.ts | createGroupBuy(data) |
| src/api/errand.ts | createErrand(data) |

每个函数使用完整的接口类型约束传入参数，确保提交字段与 db.json 数据结构完全一致。

## 8. AI 协作记录

**使用的 AI 工具**：DeepSeek Chat（通过 opencode CLI 工具交互）

**核心提示词**：使用了任务卡提供的标准提示词模板，指明技术栈（Vue3 + Vite + TypeScript + Vue Router + Axios + JSON Server），要求完成 PublishView.vue 的发布表单、校验和 POST 提交逻辑。

**AI 生成的内容**：
1. **script setup 部分**：生成了表单响应式数据定义（form 对象、errors 对象、publishType ref）、校验函数（clearErrors + validateForm）、提交函数（handleSubmit + getCurrentTime）、重置函数（resetForm）。
2. **style 部分**：生成了卡片式布局样式（page header + publish-form grid 布局）。
3. **template 部分**：保留了已在模板中的 `@submit.prevent` 绑定和 `v-if` 分类型字段渲染。

**AI 生成结果中需要人工判断之处**：
1. 字段映射是否正确——需要对照 db.json 中各数据集合的字段名，确保提交时字段名一致（如 trade 的 `category`、`condition`，lostFound 的 `eventTime` 等）
2. 跳转路径是否正确——`/lost-found` 带连字符需要与路由配置一致
3. 错误处理是否充分——添加了 `console.error(error)` + `window.alert` 双重提示

## 9. 人工调整内容

1. **校验规则调整**：将 `price` 的校验从"不能为空（0）/不能为负"调整为"必须大于 0"，更符合实际业务（价格为 0 即免费赠送，不应出现在交易场景）。将 `reward` 的校验从"不能为空/不能为负"调整为"不能为负数但允许为 0"（免费帮忙在校园场景中常见）。
2. **成功提示调整**：为每种发布类型添加了不同的成功提示文案（"二手商品发布成功"、"失物招领信息发布成功"等），而不是统一的"发布成功"，便于识别具体类型。
3. **错误提示调整**：在 catch 中增加了 `console.error(error)` 输出到控制台，方便调试排查问题。
4. **时间格式化**：使用 `getCurrentTime()` 生成 `YYYY-MM-DD HH:mm` 格式字符串，与 db.json 数据格式完全一致。
5. **样式简化**：移除了 tabs 样式和 radio-group 样式，与模板中使用的 select 保持一致。

## 10. 测试记录

### 测试 1：二手交易发布

1. 确保 json-server 和 Vite 开发服务器均已启动
2. 使用 `Invoke-WebRequest` 向 `http://localhost:3001/trades` 发送 POST 请求，提交数据：
   - title: "测试发布-二手交易"，category: "数码配件"，price: 50，condition: "九成新"，location: "东区宿舍"，description: "测试商品描述"
3. POST 请求返回 **201 Created**，新增记录 id 为 7
4. 确认 `http://localhost:3001/trades` 返回 7 条记录（原来为 6 条）
5. 删除测试数据后恢复为 6 条

### 测试 2：失物招领发布

1. 向 `http://localhost:3001/lostFound` 发送 POST 请求
2. 提交数据包含 title、type、itemName、location、eventTime、description
3. 返回 **201 Created**，新增记录 id 为 7
4. 确认集合记录数从 6 变为 7，删除测试数据后恢复

### 测试 3：拼单搭子发布

1. 向 `http://localhost:3001/groupBuys` 发送 POST 请求
2. 提交数据包含 title、type、targetCount、currentCount、deadline、location、description
3. 返回 **201 Created**，新增记录 id 为 6
4. 确认集合记录数从 5 变为 6，删除测试数据后恢复

### 测试 4：跑腿委托发布

1. 向 `http://localhost:3001/errands` 发送 POST 请求
2. 提交数据包含 title、taskType、reward、from、to、deadline、description
3. 返回 **201 Created**，新增记录 id 为 6
4. 确认集合记录数从 5 变为 6，删除测试数据后恢复

### 验证要点

| 检查项 | 结果 |
|---|---|
| POST 请求是否返回 201 | ✅ 全部通过 |
| db.json 是否写入新记录 | ✅ 全部通过 |
| 字段名是否与 db.json 一致 | ✅ 全部通过（title、price、condition 等字段映射正确） |
| 列表页查看是否能看到新数据 | ✅ 通过 GET 请求确认记录数增加 |
| 页面跳转路径是否正确 | ✅ trade→/trade, lostFound→/lost-found, groupBuy→/group-buy, errand→/errand |

## 11. 遇到的问题与解决方法

### 问题 1：表单提交后页面刷新

排查路径：检查 `<form>` 标签发现已使用 `@submit.prevent="handleSubmit"`，不是此问题。进一步检查发现按钮写的是 `<button type="submit">` 而非 `<button type="button">`，这是正确的。最终确认问题不存在——代码中已正确使用了 `.prevent` 修饰符。

### 问题 2：不同发布类型的字段名与 db.json 不一致

检查了四种类型的 POST 请求中传递的字段名：
- trade：title、category、price、condition、location、publisher、publishTime、image、status、description 均正确
- lostFound：title、type、itemName、location、eventTime、contact、status、description 均正确
- groupBuy：title、type、targetCount、currentCount、deadline、location、publisher、status、description 均正确
- errand：title、taskType、reward、from、to、deadline、publisher、status、description 均正确

### 问题 3：JSON Server 端口冲突

启动 json-server 时发现端口 3001 被占用。解决方法：排查已有进程并杀掉后重新启动，或使用 `--port` 参数指定其他端口。

## 12. 今日反思

Day4 的核心收获是理解了"从展示到交互"的转变。前三天我们一直在做数据展示（页面渲染、列表展示），而 Day4 开始让用户能够"产生数据"——这是 Web 应用从只读（Read）走向读写（CRUD）的关键一步。

发布表单的设计让我深刻体会到业务驱动设计的含义。每个业务类型的字段都不是随意决定的，而是从该业务的真实场景中自然推导出来的。二手交易需要价格和成色来体现商品价值，失物招领需要区分丢失和拾到两种状态，拼单需要目标人数和截止时间来组织活动，跑腿需要起止地点和酬劳来描述任务——这些字段的背后都有明确的业务逻辑支撑。表单字段设计是连接用户需求与数据存储的桥梁，设计得好，用户体验流畅、数据完整；设计得不好，用户困惑、数据混乱。

表单校验虽然在代码层面只是一些简单的 if 判断，但它直接决定了用户提交数据的质量。没有校验的表单会产生大量脏数据——价格为 0 的二手商品、目标人数为 1 的拼单、酬劳为负数的跑腿——这些错误数据流入数据库后会让列表页面变得不可用。好的校验设计就像给数据入口加了一道过滤器，在数据进库之前就把明显不合理的内容拦截下来，同时给用户清晰具体的错误提示，帮助他们快速修正。

数据新增是整个系统的造血功能。没有数据新增，列表页永远只能展示初始的 Mock 数据，App 无法真正运转起来。从表单输入 → 校验 → POST 请求 → 写入 db.json → 跳转列表页 → 重新请求数据显示新数据，这一完整链路构成了 C（Create）增删改查的入口。理解了这一串流程，就理解了前端与后端如何通过 HTTP 协议交换数据。

通过 AI 协作完成这些工作，我体会到 AI 是高效的生产力工具，但它不能替代业务判断。AI 可以快速生成表单框架、校验函数和 POST 请求代码，但校验规则的具体条件（price 是否允许为 0、reward 是否可以免费）、字段的数据类型（number vs string）、以及页面的交互反馈方式（alert 弹窗 vs 页面内提示），都需要人工根据项目的实际场景去决策。AI 生成代码后，逐行审查、理解、调整仍然是必不可少的过程。
