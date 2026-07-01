<template>
  <header class="app-header">
    <div class="header-inner">
      <h1 class="logo">校园轻集市</h1>
      <p class="slogan">轻享校园，自在交易</p>
      <div class="user-info">
        <span class="user-name">{{ userStore.displayName }}</span>
        <span class="user-badge">{{ userStore.isLoggedIn ? '已登录' : '未登录' }}</span>
      </div>
    </div>
    <AppNav />
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import AppNav from './AppNav.vue'

const userStore = useUserStore()
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
.user-badge {
  color: #52c41a;
  font-size: 12px;
  background: #f6ffed;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid #b7eb8f;
}
</style>
