<template>
  <nav class="app-nav">
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/trade">二手交易</RouterLink>
    <RouterLink to="/lost-found">失物招领</RouterLink>
    <RouterLink to="/group-buy">拼单搭子</RouterLink>
    <RouterLink to="/errand">跑腿委托</RouterLink>
    <RouterLink to="/publish">发布</RouterLink>
    <RouterLink to="/message">消息</RouterLink>
    <RouterLink to="/user">我的</RouterLink>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-nav {
  display: flex;
  gap: 20px;
  align-items: center;
}

.app-nav a {
  color: #333;
  text-decoration: none;
  font-size: 15px;
}

.app-nav a.router-link-active {
  color: #2563eb;
  font-weight: 600;
}
</style>
