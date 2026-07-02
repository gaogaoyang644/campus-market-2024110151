<template>
  <div class="page">
    <div class="form-card">
      <h1>登录</h1>
      <p>使用账号和密码登录校园轻集市。</p>

      <form @submit.prevent="handleLogin">
        <FormField label="用户名" required>
          <input v-model="username" type="text" placeholder="请输入用户名" required />
        </FormField>

        <FormField label="密码" required>
          <input v-model="password" type="password" placeholder="请输入密码" required />
        </FormField>

        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="submitting">
            {{ submitting ? '登录中...' : '登录' }}
          </button>
        </div>

        <p class="form-footer">
          还没有账号？<RouterLink to="/register">去注册</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '../components/FormField.vue'
import { getUsers } from '../api/user'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const submitting = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  errorMsg.value = ''

  if (!username.value || !password.value) {
    errorMsg.value = '请输入用户名和密码'
    return
  }

  submitting.value = true

  try {
    const res = await getUsers()
    const user = res.data.find(
      (u) => u.username === username.value && u.password === password.value,
    )

    if (!user) {
      errorMsg.value = '用户名或密码错误'
      submitting.value = false
      return
    }

    userStore.login({
      id: user.id!,
      username: user.username,
      name: user.name,
      college: user.college,
      grade: user.grade,
      bio: user.bio,
    })

    window.alert('登录成功！')
    router.push('/')
  } catch {
    errorMsg.value = '登录失败，请确认 JSON Server 已启动。'
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
  max-width: 400px;
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
