<template>
  <div class="list-view page">
    <h1 class="list-title">商品列表</h1>
    <div class="grid">
      <div
        v-for="item in items"
        :key="item.id"
        class="card"
        @click="goDetail(item.id)"
      >
        <div class="card-body">
          <h3 class="card-name">{{ item.name }}</h3>
          <p class="card-desc">商品简介信息</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const items = [
  { id: 1, name: '商品A' },
  { id: 2, name: '商品B' },
  { id: 3, name: '商品C' },
  { id: 4, name: '商品D' },
]

function goDetail(id: number) {
  router.push({ name: 'DetailView', params: { id } })
}
</script>

<style scoped>
.list-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.card-body {
  padding: 20px 16px;
}

.card-name {
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
}

.card-desc {
  font-size: 14px;
  color: #999;
}
</style>
