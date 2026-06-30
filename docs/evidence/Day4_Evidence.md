# Day4 Evidence - 发布表单设计、表单校验、数据提交与页面联动

## 1. 今日完成内容

完成了发布页面的业务类型选择、动态表单字段渲染、基础表单校验、Axios POST 数据提交，以及提交成功后的页面跳转功能。实现了四类业务（二手交易、失物招领、拼单搭子、跑腿委托）的统一发布入口。

## 2. 发布类型设计

| 业务类型 | 路由路径 | 提交的集合 | 特有字段 |
|---|---|---|---|
| 二手交易 | /publish (trade) | /trades | price、condition |
| 失物招领 | /publish (lostFound) | /lostFound | lfType(lost/found)、itemName、eventTime |
| 拼单搭子 | /publish (groupBuy) | /groupBuys | gbType、targetCount、deadline |
| 跑腿委托 | /publish (errand) | /errands | taskType、from、to、reward、deadline |

## 3. 表单字段设计

### 通用字段（所有类型共用）

| 字段 | 类型 | 校验规则 |
|---|---|---|
| title | text | 必填，至少2个字符 |
| description | textarea | 必填，至少5个字符 |
| location | text | 必填 |
| contact | text | 必填（手机号/QQ/微信） |

### 二手交易特有字段

| 字段 | 类型 | 校验规则 | 说明 |
|---|---|---|---|
| price | number | 必填，> 0 | 价格字段 |
| condition | select | 非必填 | 全新/九成新/八成新/七成新 |

### 失物招领特有字段

| 字段 | 类型 | 校验规则 | 说明 |
|---|---|---|---|
| lfType | radio | 必填 | lost（失物）/ found（拾物） |
| itemName | text | 必填 | 丢失或拾到的物品名称 |
| eventTime | datetime-local | 非必填 | 事件发生时间 |

### 拼单搭子特有字段

| 字段 | 类型 | 校验规则 | 说明 |
|---|---|---|---|
| gbType | select | 必填 | 拼餐/学习资料/课程/拼购 |
| targetCount | number | 必填，≥ 2 | 目标凑单人数 |
| deadline | datetime-local | 必填 | 拼单截止时间 |

### 跑腿委托特有字段

| 字段 | 类型 | 校验规则 | 说明 |
|---|---|---|---|
| taskType | select | 必填 | 取快递/代买/取件/搬运/代办 |
| from | text | 必填 | 出发地点 |
| to | text | 必填 | 目的地点 |
| reward | number | 必填，> 0 | 报酬金额 |
| deadline | datetime-local | 必填 | 任务截止时间 |

## 4. 校验逻辑说明

校验规则通过 `rules` 对象统一管理，使用 `validate()` 函数遍历执行：

```typescript
const rules: Record<string, (v: string | number) => string> = {
  title: (v) => !v ? '请输入标题' : (v as string).length < 2 ? '标题至少2个字符' : '',
  description: (v) => !v ? '请输入描述' : (v as string).length < 5 ? '描述至少5个字符' : '',
  // ...
}
```

校验特点：
- 每个校验规则返回空字符串表示通过，返回错误信息表示不通过
- errors 对象在每次校验前清空，只保留当前失败的字段信息
- 校验失败时，对应字段下方显示红色错误提示文字
- 提交时先执行校验，不通过则阻止提交

## 5. 数据提交流程

```
用户填写表单 → 点击发布 → validate() 校验
  ├─ 校验失败 → 显示错误提示
  └─ 校验通过 → submitting = true → 调用对应 POST API
       ├─ 成功 → 跳转到对应列表页面
       └─ 失败 → alert('发布失败，请重试')
            └─ submitting = false
```

提交时的关键处理：
- **自动填充**：publisher 统一设为"当前用户"（因无真实登录），publishTime 自动取当前时间，status 设为 "open"
- **类型路由跳转**：根据当前 type 值动态拼接路由路径，跳转到对应的列表页
- **submitting 状态**：提交过程中禁用按钮并显示"发布中..."，防止重复提交

## 6. 我的设计

- **选择 tabs 而非下拉框**：我使用 4 个 tab 按钮切换业务类型，相比于下拉选择器，tab 切换更直观、操作路径更短，用户一眼就能看到所有可选类型。
- **通用字段 + 动态字段**：四个类型的表单有 4 个通用字段（标题、描述、地点、联系方式），外加各类型的特有字段。这种设计减少了代码冗余，也保持了页面一致性。
- **使用 reactive 管理 errors**：我使用 reactive 对象而非 ref 来管理校验错误信息，这样可以直接通过 `errors.field = msg` 赋值，无需处理深层响应式问题。

## 7. API 扩展

在原有只有 GET 请求的基础上，为四个 API 模块分别添加了 POST 提交函数：

| 文件 | 新增函数 |
|---|---|
| src/api/trade.ts | addTrade(data) |
| src/api/lostFound.ts | addLostFound(data) |
| src/api/groupBuy.ts | addGroupBuy(data) |
| src/api/errand.ts | addErrand(data) |

每个函数使用 `Omit<T, 'id'>` 类型约束传入参数，确保不传 id（由 JSON Server 自动生成）。

## 8. AI 协作过程

AI 在本次任务中帮助我：

1. **生成 POST API 代码**：为四个 API 文件添加了 addXxx 函数，类型标注使用了 Omit 排除 id 字段。
2. **生成 PublishView.vue 框架**：包括 tab 切换、动态表单字段、校验规则、提交逻辑的完整代码。

**我人工审查并修改的地方：**

1. **联系方式字段**：我要求 AI 将联系方式的校验改为非严格模式（不要求固定手机号格式），因为校园场景下更常用 QQ/微信联系。
2. **校验规则个性化**：我要求 AI 将标题校验改为至少 2 个字符、描述校验改为至少 5 个字符，而不是简单的非空检查。
3. **跳转路径修正**：AI 生成的跳转逻辑中 `lost-found` 路径带横线，而路由定义中正是 `lost-found`，此处检查确认后保留。
4. **时间格式化**：我要求 AI 使用 `formatNow()` 函数统一生成 `YYYY-MM-DD HH:mm` 格式的时间字符串，与 db.json 中已有数据格式一致。

## 9. 遇到的问题与解决方法

**问题：POST 请求 404**

排查过程：
1. 确认 json-server 正在运行（npm run mock）
2. 检查 Axios baseURL 为 http://localhost:3001
3. 检查请求路径为 /trades、/lostFound 等，与 db.json 中的 key 一致
4. 确认 json-server 默认支持 POST 方法，最终发现是 json-server 未启动导致的

**问题：校验通过后表单仍为空**

排查过程：
1. 检查 validate() 函数返回值的判断逻辑
2. 确认 errors 对象在每次校验前已清空
3. 发现问题在于 rules 中缺少对 contact 字段的校验规则定义，补充后正常

## 10. 今日反思

Day4 的核心收获是理解了"从展示到交互"的转变。前三天我们一直在做数据展示（页面渲染、列表展示），而 Day4 开始让用户能够"产生数据"。

发布表单的设计让我更加理解了业务驱动设计——每个业务类型的字段设计不是随意决定的，而是来源于该业务的真实需求。二手交易需要价格和成色，失物招领需要区分丢失和拾到，拼单需要人数和截止时间，跑腿需要起止地点和报酬——这些字段都是从业务场景中自然推导出来的。

校验逻辑看似简单，但让我体会到了好的校验设计对用户体验的重要性。错误提示要具体（"标题至少2个字符"而不是"标题格式错误"），校验要在合适的时机触发（提交时校验而非输入时立即校验），这些细节决定了表单的使用体验。

通过 AI 协作，我发现 AI 能快速生成表单框架，但校验规则的具体阈值（标题最少字符数、描述最少字符数）、业务字段的取舍（是否需要联系方式）、以及页面跳转逻辑的细节，仍然需要人工根据项目实际情况进行调整。AI 是效率工具，但业务判断还是要靠自己。
