<template>
  <div class="profile page">
    <div class="profile-card">
      <div class="profile-avatar"></div>
      <h2 class="profile-name">用户昵称</h2>
      <p class="profile-bio">校园集市用户</p>
    </div>
    <div class="menu-list">
      <div v-for="item in menuItems" :key="item.key" class="menu-item">
        <span>{{ item.label }}</span>
        <span class="menu-arrow">&gt;</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const menuItems = [
  { key: 'orders', label: '我的订单' },
  { key: 'published', label: '我的发布' },
  { key: 'favorites', label: '我的收藏' },
  { key: 'settings', label: '设置' },
]
</script>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
}

.profile-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #dcdfe6;
  margin-bottom: 16px;
}

.profile-name {
  font-size: 20px;
  color: #333;
  margin-bottom: 6px;
}

.profile-bio {
  font-size: 14px;
  color: #999;
}

.menu-list {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  transition: background 0.2s ease;
}

.menu-item:hover {
  background: #f5f7fa;
}

.menu-item + .menu-item {
  border-top: 1px solid #f0f0f0;
}

.menu-arrow {
  color: #ccc;
  font-size: 14px;
}
</style>
