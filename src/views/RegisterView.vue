<template>
  <div class="page">
    <div class="form-card">
      <h1>注册</h1>
      <p>创建一个新账号，开始使用校园轻集市。</p>

      <form @submit.prevent="handleRegister">
        <FormField label="用户名" required>
          <input v-model="form.username" type="text" placeholder="请输入用户名" required />
        </FormField>

        <FormField label="密码" required>
          <input v-model="form.password" type="password" placeholder="请输入密码" required />
        </FormField>

        <FormField label="昵称" required>
          <input v-model="form.name" type="text" placeholder="请输入昵称" required />
        </FormField>

        <div class="form-row">
          <FormField label="学院">
            <input v-model="form.college" type="text" placeholder="如：计算机学院" />
          </FormField>
          <FormField label="年级">
            <select v-model="form.grade">
              <option value="">请选择</option>
              <option value="2021 级">2021 级</option>
              <option value="2022 级">2022 级</option>
              <option value="2023 级">2023 级</option>
              <option value="2024 级">2024 级</option>
              <option value="2025 级">2025 级</option>
            </select>
          </FormField>
        </div>

        <FormField label="个人简介">
          <textarea v-model="form.bio" placeholder="简单介绍一下自己" rows="3" />
        </FormField>

        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="submitting">
            {{ submitting ? '注册中...' : '注册' }}
          </button>
        </div>

        <p class="form-footer">
          已有账号？<RouterLink to="/login">去登录</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '../components/FormField.vue'
import { getUsers, createUser } from '../api/user'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const submitting = ref(false)
const errorMsg = ref('')

const form = reactive({
  username: '',
  password: '',
  name: '',
  college: '计算机学院',
  grade: '2023 级',
  bio: '热爱校园生活。',
})

async function handleRegister() {
  errorMsg.value = ''

  if (!form.username || !form.password || !form.name) {
    errorMsg.value = '请填写用户名、密码和昵称'
    return
  }

  submitting.value = true

  try {
    const res = await getUsers()
    const exists = res.data.some((u) => u.username === form.username)
    if (exists) {
      errorMsg.value = '该用户名已被注册'
      submitting.value = false
      return
    }

    const newUser = {
      username: form.username,
      password: form.password,
      name: form.name,
      college: form.college || '计算机学院',
      grade: form.grade || '2023 级',
      bio: form.bio || '热爱校园生活。',
    }

    const created = await createUser(newUser)

    userStore.login({
      id: created.data.id!,
      username: created.data.username,
      name: created.data.name,
      college: created.data.college,
      grade: created.data.grade,
      bio: created.data.bio,
    })

    window.alert('注册成功！')
    router.push('/')
  } catch {
    errorMsg.value = '注册失败，请确认 JSON Server 已启动。'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

.form-card {
  width: 100%;
  max-width: 480px;
  padding: 32px;
  border-radius: 16px;
  background: #fff;
}

.form-card h1 {
  margin: 0 0 8px;
}

.form-card > p {
  margin: 0 0 24px;
  color: #6b7280;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.error-msg {
  color: #dc2626;
  font-size: 14px;
  margin: 12px 0 0;
}

.form-actions {
  margin-top: 20px;
  text-align: right;
}

.form-footer {
  margin-top: 16px;
  text-align: center;
  color: #6b7280;
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
