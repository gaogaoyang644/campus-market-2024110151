<template>
  <div class="home page">
    <h1 class="home-title">校园轻集市</h1>
    <p class="home-desc">
      {{ greeting }}，{{ userStore.displayName }}！<br>
      欢迎来到校园轻集市 — 一个属于同学们的校园生活服务平台。<br>
      在这里，你可以交易二手商品、发布失物招领、寻找拼单搭子、委托跑腿任务，让校园生活更加便捷。
    </p>

    <div v-if="!userStore.isLoggedIn" class="home-actions">
      <RouterLink to="/login" class="btn-primary">登录</RouterLink>
      <RouterLink to="/register" class="btn-secondary">注册</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return '早上好'
  if (hour < 18) return '下午好'
  return '晚上好'
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px - 48px);
  text-align: center;
  padding-top: 80px;
  padding-bottom: 80px;
}

.home-title {
  font-size: 48px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
}

.home-desc {
  font-size: 18px;
  color: #666;
  line-height: 1.8;
  max-width: 600px;
}

.home-actions {
  margin-top: 32px;
  display: flex;
  gap: 16px;
}

.btn-primary,
.btn-secondary {
  display: inline-block;
  padding: 12px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
}

.btn-primary {
  background: #2563eb;
  color: #fff;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}
</style>
