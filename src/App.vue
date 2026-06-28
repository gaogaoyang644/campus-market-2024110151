<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/home', label: '首页' },
  { path: '/list', label: '列表页' },
  { path: '/detail/1', label: '详情页' },
  { path: '/publish', label: '发布页' },
  { path: '/message', label: '消息页' },
  { path: '/profile', label: '个人中心' },
  { path: '/board', label: '看板页' },
]
</script>

<template>
  <div class="app">
    <nav class="nav-bar">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: route.path === item.path || (item.path === '/detail/1' && route.path.startsWith('/detail/')) }"
      >
        {{ item.label }}
      </router-link>
    </nav>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 16px;
  background: #f5f5f5;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.nav-item {
  text-decoration: none;
  color: #333;
  font-size: 14px;
  padding: 6px 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #409eff;
}

.nav-item.active {
  color: #409eff;
  font-weight: 600;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #409eff;
  border-radius: 1px;
}

.main-content {
  padding-top: 56px;
}

@media (max-width: 640px) {
  .nav-item {
    font-size: 12px;
  }
}
</style>
