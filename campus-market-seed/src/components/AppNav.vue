<template>
  <nav class="app-nav">
    <RouterLink to="/" class="nav-item">首页</RouterLink>
    <RouterLink to="/trade" class="nav-item">二手交易</RouterLink>
    <RouterLink to="/lost-found" class="nav-item">失物招领</RouterLink>
    <RouterLink to="/group-buy" class="nav-item">拼单搭子</RouterLink>
    <RouterLink to="/errand" class="nav-item">跑腿委托</RouterLink>
    <RouterLink to="/publish" class="nav-item">发布信息</RouterLink>
    <RouterLink to="/message" class="nav-item">消息中心</RouterLink>
    <RouterLink to="/user" class="nav-item">个人中心</RouterLink>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  gap: 8px;
}
.nav-item {
  text-decoration: none;
  color: #333;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 14px;
}
.nav-item:hover {
  background: #f0f0f0;
}
:deep(.router-link-active) {
  color: #1677ff;
  font-weight: 600;
}
</style>
