<template>
  <div class="app-layout">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #f5f5f5;
}
.main-content {
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 24px;
}
</style>
