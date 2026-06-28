<template>
  <div class="detail page">
    <h1 class="detail-title">商品详情</h1>
    <p class="detail-id">商品ID: {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px;
  min-height: calc(100vh - 56px);
}

.detail-title {
  font-size: 28px;
  margin-bottom: 24px;
}

.detail-id {
  font-size: 24px;
  color: #409eff;
  font-weight: 600;
}
</style>
