<template>
  <header class="app-header">
    <div class="header-inner">
      <h1 class="logo">校园轻集市</h1>
      <p class="slogan">轻享校园，自在交易</p>
      <div class="user-info">
        <template v-if="userStore.isLoggedIn">
          <span class="user-name">{{ userStore.displayName }}</span>
          <button class="logout-btn" @click="handleLogout">退出</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="auth-link">登录</RouterLink>
          <RouterLink to="/register" class="auth-link register">注册</RouterLink>
        </template>
      </div>
    </div>
    <AppNav />
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import AppNav from './AppNav.vue'

const userStore = useUserStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
  window.alert('已退出登录')
  router.push('/')
}
</script>

<style scoped>
.app-header {
  height: 64px;
  padding: 0 32px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.logo {
  font-size: 20px;
  font-weight: 700;
}

.slogan {
  font-size: 13px;
  color: #6b7280;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.user-name {
  color: #333;
  font-weight: 500;
}

.auth-link {
  color: #2563eb;
  text-decoration: none;
  padding: 4px 12px;
  border-radius: 6px;
  background: #eff6ff;
}

.auth-link.register {
  background: #2563eb;
  color: #fff;
}

.logout-btn {
  border: none;
  border-radius: 6px;
  padding: 4px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 13px;
}

.logout-btn:hover {
  background: #fee2e2;
  color: #dc2626;
}
</style>
