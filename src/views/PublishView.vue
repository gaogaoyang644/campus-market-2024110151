<template>
  <div class="page">
    <div class="page-header">
      <h1>发布信息</h1>
      <p>发布二手、失物招领、拼单或跑腿信息。</p>
      <p class="publisher-info">当前发布者：<strong>{{ userStore.displayName }}</strong>（{{ userStore.userDescription }}）</p>
    </div>

    <div class="form-card">
      <div class="type-selector">
        <label>选择发布类型 <span class="required">*</span></label>
        <select v-model="type">
          <option value="trade">二手交易</option>
          <option value="lostFound">失物招领</option>
          <option value="groupBuy">拼单搭子</option>
          <option value="errand">跑腿委托</option>
        </select>
      </div>

      <form @submit.prevent="handleSubmit">
        <FormField label="标题" required>
          <input v-model="form.title" type="text" placeholder="请输入标题" required />
        </FormField>

        <FormField label="描述" required>
          <textarea v-model="form.description" placeholder="请详细描述信息内容" rows="4" required />
        </FormField>

        <FormField label="地点">
          <input v-model="form.location" type="text" placeholder="请输入地点" />
        </FormField>

        <template v-if="type === 'trade'">
          <div class="form-row">
            <FormField label="分类" required>
              <select v-model="form.category" required>
                <option value="">请选择分类</option>
                <option value="教材">教材</option>
                <option value="出行">出行</option>
                <option value="乐器">乐器</option>
                <option value="日用">日用</option>
                <option value="体育">体育</option>
                <option value="电子">电子</option>
                <option value="其他">其他</option>
              </select>
            </FormField>
            <FormField label="成色">
              <select v-model="form.condition">
                <option value="全新">全新</option>
                <option value="九成新">九成新</option>
                <option value="八成新">八成新</option>
                <option value="七成新">七成新</option>
                <option value="正常使用痕迹">正常使用痕迹</option>
              </select>
            </FormField>
          </div>
          <FormField label="价格（元）" required>
            <input v-model="form.price" type="number" min="0" step="0.01" placeholder="请输入价格" required />
          </FormField>
        </template>

        <template v-if="type === 'lostFound'">
          <div class="form-row">
            <FormField label="类型" required>
              <select v-model="form.lostType" required>
                <option value="">请选择类型</option>
                <option value="lost">寻物</option>
                <option value="found">招领</option>
              </select>
            </FormField>
            <FormField label="物品名称">
              <input v-model="form.itemName" type="text" placeholder="如：校园卡、钥匙" />
            </FormField>
          </div>
          <FormField label="联系方式">
            <input v-model="form.contact" type="text" placeholder="手机号、QQ 或站内消息" />
          </FormField>
        </template>

        <template v-if="type === 'groupBuy'">
          <div class="form-row">
            <FormField label="类型" required>
              <select v-model="form.groupType" required>
                <option value="">请选择类型</option>
                <option value="拼餐">拼餐</option>
                <option value="拼购">拼购</option>
                <option value="课程">课程</option>
                <option value="学习资料">学习资料</option>
                <option value="其他">其他</option>
              </select>
            </FormField>
            <FormField label="目标人数" required>
              <input v-model="form.targetCount" type="number" min="2" placeholder="如：6" required />
            </FormField>
          </div>
          <FormField label="截止时间">
            <input v-model="form.deadline" type="datetime-local" />
          </FormField>
        </template>

        <template v-if="type === 'errand'">
          <div class="form-row">
            <FormField label="任务类型" required>
              <select v-model="form.taskType" required>
                <option value="">请选择任务类型</option>
                <option value="取快递">取快递</option>
                <option value="代买">代买</option>
                <option value="代送">代送</option>
                <option value="其他">其他</option>
              </select>
            </FormField>
            <FormField label="报酬（元）" required>
              <input v-model="form.reward" type="number" min="0" step="0.5" placeholder="如：5" required />
            </FormField>
          </div>
          <div class="form-row">
            <FormField label="取件地点">
              <input v-model="form.from" type="text" placeholder="取件/出发地点" />
            </FormField>
            <FormField label="送达地点">
              <input v-model="form.to" type="text" placeholder="送达目的地" />
            </FormField>
          </div>
          <FormField label="截止时间">
            <input v-model="form.deadline" type="datetime-local" />
          </FormField>
        </template>

        <div class="form-actions">
          <button
            type="submit"
            class="btn-primary"
            :disabled="submitting"
          >
            {{ submitting ? '提交中...' : '发布' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '../components/FormField.vue'
import { useUserStore } from '@/stores/user'
import { createTrade } from '../api/trade'
import { createLostFound } from '../api/lostFound'
import { createGroupBuy } from '../api/groupBuy'
import { createErrand } from '../api/errand'

const userStore = useUserStore()
const router = useRouter()

const type = ref('trade')
const submitting = ref(false)

const form = reactive({
  title: '',
  description: '',
  location: '',
  category: '',
  condition: '正常使用痕迹',
  price: '',
  lostType: '',
  itemName: '',
  contact: '',
  groupType: '',
  targetCount: '',
  deadline: '',
  taskType: '',
  reward: '',
  from: '',
  to: '',
})

const routeMap: Record<string, string> = {
  trade: '/trade',
  lostFound: '/lost-found',
  groupBuy: '/group-buy',
  errand: '/errand',
}

const targetRoute = computed(() => routeMap[type.value] || '/trade')

async function handleSubmit() {
  if (!form.title || !form.description) {
    window.alert('请填写标题和描述')
    return
  }

  submitting.value = true

  try {
    const now = new Date()
    const publishTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    if (type.value === 'trade') {
      if (!form.category) {
        window.alert('请选择商品分类')
        submitting.value = false
        return
      }
      await createTrade({
        title: form.title,
        category: form.category,
        price: Number(form.price) || 0,
        condition: form.condition,
        location: form.location || '未填写',
        publisher: userStore.displayName,
        publishTime,
        image: '',
        status: 'open',
        description: form.description,
      })
    } else if (type.value === 'lostFound') {
      if (!form.lostType) {
        window.alert('请选择失物招领类型')
        submitting.value = false
        return
      }
      await createLostFound({
        title: form.title,
        type: form.lostType as 'lost' | 'found',
        itemName: form.itemName || form.title,
        location: form.location || '未填写',
        eventTime: publishTime,
        contact: form.contact || '站内消息联系',
        status: 'open',
        description: form.description,
      })
    } else if (type.value === 'groupBuy') {
      if (!form.groupType) {
        window.alert('请选择拼单类型')
        submitting.value = false
        return
      }
      await createGroupBuy({
        title: form.title,
        type: form.groupType,
        targetCount: Number(form.targetCount) || 2,
        currentCount: 1,
        deadline: form.deadline || publishTime,
        location: form.location || '未填写',
        publisher: userStore.displayName,
        status: 'open',
        description: form.description,
      })
    } else if (type.value === 'errand') {
      if (!form.taskType) {
        window.alert('请选择任务类型')
        submitting.value = false
        return
      }
      await createErrand({
        title: form.title,
        taskType: form.taskType,
        reward: Number(form.reward) || 0,
        from: form.from || '未填写',
        to: form.to || '未填写',
        deadline: form.deadline || publishTime,
        publisher: userStore.displayName,
        status: 'open',
        description: form.description,
      })
    }

    window.alert('发布成功！')
    router.push(targetRoute.value)
  } catch {
    window.alert('发布失败，请确认 JSON Server 已启动，并检查表单数据是否完整。')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.page-header h1 {
  margin: 0 0 8px;
}

.page-header p {
  margin: 0;
  color: #6b7280;
}

.publisher-info {
  margin-top: 12px !important;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  color: #374151 !important;
}

.form-card {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.type-selector {
  margin-bottom: 20px;
}

.type-selector label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

.type-selector select {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  background: #fff;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-actions {
  margin-top: 20px;
  text-align: right;
}

.required {
  color: #dc2626;
}

.btn-primary {
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 16px;
  cursor: pointer;
  background: #2563eb;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #1d4ed8;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
