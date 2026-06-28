<template>
  <header class="app-header">
    <div class="header-inner">
      <h1 class="logo">校园轻集市</h1>
      <p class="slogan">轻享校园，自在交易</p>
    </div>
    <AppNav />
  </header>
</template>

<script setup lang="ts">
import AppNav from './AppNav.vue'
</script>

<style scoped>
.app-header {
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding: 16px 24px;
}
.header-inner {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
}
.logo {
  font-size: 22px;
  margin: 0;
  color: #1677ff;
}
.slogan {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>
