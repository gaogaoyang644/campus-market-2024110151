<template>
  <div class="publish page">
    <h1 class="publish-title">发布信息</h1>

    <div class="publish-tabs">
      <button
        v-for="t in types"
        :key="t.value"
        :class="['tab-btn', { active: type === t.value }]"
        @click="type = t.value"
      >
        {{ t.label }}
      </button>
    </div>

    <form class="publish-form" @submit.prevent="handleSubmit">
      <FormField
        v-model="form.title"
        label="标题"
        type="text"
        placeholder="请输入标题"
        required
        :error="errors.title"
      />
      <FormField
        v-model="form.description"
        label="描述"
        type="textarea"
        placeholder="请详细描述你的信息"
        required
        :error="errors.description"
      />
      <FormField
        v-model="form.location"
        label="地点"
        type="text"
        placeholder="请输入地点"
        required
        :error="errors.location"
      />
      <FormField
        v-model="form.contact"
        label="联系方式"
        type="text"
        placeholder="请输入手机号或 QQ/微信"
        required
        :error="errors.contact"
      />

      <template v-if="type === 'trade'">
        <FormField
          v-model="form.price"
          label="价格 (元)"
          type="number"
          placeholder="请输入价格"
          required
          :error="errors.price"
        />
        <FormField
          v-model="form.condition"
          label="成色"
          type="select"
          placeholder="请选择成色"
          :options="['全新', '九成新', '八成新', '七成新']"
        />
      </template>

      <template v-if="type === 'lostFound'">
        <div class="form-group">
          <label class="form-label">类型 <span class="required">*</span></label>
          <div class="radio-group">
            <label class="radio-label">
              <input v-model="form.lfType" type="radio" value="lost" />
              失物
            </label>
            <label class="radio-label">
              <input v-model="form.lfType" type="radio" value="found" />
              拾物
            </label>
          </div>
          <p v-if="errors.lfType" class="form-error">{{ errors.lfType }}</p>
        </div>
        <FormField
          v-model="form.itemName"
          label="物品名称"
          type="text"
          placeholder="请输入物品名称"
          required
          :error="errors.itemName"
        />
        <FormField
          v-model="form.eventTime"
          label="发生时间"
          type="datetime-local"
        />
      </template>

      <template v-if="type === 'groupBuy'">
        <FormField
          v-model="form.gbType"
          label="拼单类型"
          type="select"
          placeholder="请选择类型"
          required
          :error="errors.gbType"
          :options="['拼餐', '学习资料', '课程', '拼购']"
        />
        <div class="form-row">
          <FormField
            v-model="form.targetCount"
            label="目标人数"
            type="number"
            placeholder="目标人数"
            required
            :min="2"
            :error="errors.targetCount"
          />
          <FormField
            v-model="form.deadline"
            label="截止时间"
            type="datetime-local"
            required
            :error="errors.deadline"
          />
        </div>
      </template>

      <template v-if="type === 'errand'">
        <FormField
          v-model="form.taskType"
          label="任务类型"
          type="select"
          placeholder="请选择类型"
          required
          :error="errors.taskType"
          :options="['取快递', '代买', '取件', '搬运', '代办']"
        />
        <FormField
          v-model="form.from"
          label="出发地点"
          type="text"
          placeholder="从哪出发"
          required
          :error="errors.from"
        />
        <FormField
          v-model="form.to"
          label="目的地点"
          type="text"
          placeholder="送到哪里"
          required
          :error="errors.to"
        />
        <FormField
          v-model="form.reward"
          label="报酬 (元)"
          type="number"
          placeholder="请输入报酬"
          required
          :error="errors.reward"
        />
        <FormField
          v-model="form.deadline"
          label="截止时间"
          type="datetime-local"
          required
          :error="errors.deadline"
        />
      </template>

      <button type="submit" class="submit-btn" :disabled="submitting">
        {{ submitting ? '发布中...' : '发布' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '../components/FormField.vue'
import { addTrade } from '../api/trade'
import { addLostFound } from '../api/lostFound'
import { addGroupBuy } from '../api/groupBuy'
import { addErrand } from '../api/errand'

const router = useRouter()

const types = [
  { label: '二手交易', value: 'trade' },
  { label: '失物招领', value: 'lostFound' },
  { label: '拼单搭子', value: 'groupBuy' },
  { label: '跑腿委托', value: 'errand' },
]

const type = ref('trade')
const submitting = ref(false)

const form = reactive({
  title: '',
  description: '',
  location: '',
  contact: '',
  price: 0,
  condition: '',
  lfType: 'lost',
  itemName: '',
  eventTime: '',
  gbType: '',
  targetCount: 2,
  deadline: '',
  taskType: '',
  reward: 0,
  from: '',
  to: '',
})

const errors = reactive<Record<string, string>>({})

const rules: Record<string, (v: string | number) => string> = {
  title: (v) => !v ? '请输入标题' : (v as string).length < 2 ? '标题至少2个字符' : '',
  description: (v) => !v ? '请输入描述' : (v as string).length < 5 ? '描述至少5个字符' : '',
  location: (v) => !v ? '请输入地点' : '',
  contact: (v) => !v ? '请输入联系方式' : '',
  price: (v) => type.value === 'trade' && (v === 0 || v === '') ? '请输入价格' : '',
  lfType: (v) => type.value === 'lostFound' && !v ? '请选择失物/拾物类型' : '',
  itemName: (v) => type.value === 'lostFound' && !v ? '请输入物品名称' : '',
  gbType: (v) => type.value === 'groupBuy' && !v ? '请选择拼单类型' : '',
  targetCount: (v) => type.value === 'groupBuy' && (v as number) < 2 ? '目标人数至少2人' : '',
  deadline: (v) => ['groupBuy', 'errand'].includes(type.value) && !v ? '请选择截止时间' : '',
  taskType: (v) => type.value === 'errand' && !v ? '请选择任务类型' : '',
  reward: (v) => type.value === 'errand' && (v === 0 || v === '') ? '请输入报酬' : '',
  from: (v) => type.value === 'errand' && !v ? '请输入出发地点' : '',
  to: (v) => type.value === 'errand' && !v ? '请输入目的地点' : '',
}

function validate(): boolean {
  Object.keys(errors).forEach((k) => delete errors[k])
  let valid = true
  for (const [field, fn] of Object.entries(rules)) {
    const msg = fn(form[field as keyof typeof form])
    if (msg) {
      errors[field] = msg
      valid = false
    }
  }
  return valid
}

async function handleSubmit() {
  if (!validate()) return

  submitting.value = true
  try {
    const now = formatNow()

    if (type.value === 'trade') {
      await addTrade({
        title: form.title,
        price: form.price,
        category: '其他',
        condition: form.condition || '其他',
        publisher: '当前用户',
        publishTime: now,
        location: form.location,
        images: [],
        description: form.description,
        status: 'open',
      })
    } else if (type.value === 'lostFound') {
      await addLostFound({
        title: form.title,
        type: form.lfType as 'lost' | 'found',
        itemName: form.itemName,
        location: form.location,
        eventTime: form.eventTime || now,
        contact: form.contact,
        description: form.description,
        status: 'open',
      })
    } else if (type.value === 'groupBuy') {
      await addGroupBuy({
        title: form.title,
        type: form.gbType,
        targetCount: form.targetCount,
        currentCount: 1,
        deadline: form.deadline,
        location: form.location,
        publisher: '当前用户',
        description: form.description,
        status: 'open',
      })
    } else if (type.value === 'errand') {
      await addErrand({
        title: form.title,
        taskType: form.taskType,
        reward: form.reward,
        from: form.from,
        to: form.to,
        deadline: form.deadline,
        publisher: '当前用户',
        description: form.description,
        status: 'open',
      })
    }

    resetForm()
    router.push(`/${type.value === 'lostFound' ? 'lost-found' : type.value === 'groupBuy' ? 'group-buy' : type.value}`)
  } catch {
    alert('发布失败，请重试')
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  form.title = ''
  form.description = ''
  form.location = ''
  form.contact = ''
  form.price = 0
  form.condition = ''
  form.lfType = 'lost'
  form.itemName = ''
  form.eventTime = ''
  form.gbType = ''
  form.targetCount = 2
  form.deadline = ''
  form.taskType = ''
  form.reward = 0
  form.from = ''
  form.to = ''
  Object.keys(errors).forEach((k) => delete errors[k])
}

function formatNow(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
</script>

<style scoped>
.publish-title {
  font-size: 24px;
  margin-bottom: 12px;
}

.publish-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 8px 18px;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

.publish-form {
  max-width: 520px;
}

.form-row {
  display: flex;
  gap: 12px;
}

.form-row :deep(.form-group) {
  flex: 1;
}

.radio-group {
  display: flex;
  gap: 20px;
  padding: 6px 0;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 12px 0;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #337ecc;
}

.submit-btn:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}
</style>
