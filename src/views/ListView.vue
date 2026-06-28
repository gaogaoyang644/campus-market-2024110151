<template>
  <div>
    <h1>商品列表</h1>
    <ul>
      <li v-for="item in items" :key="item.id" @click="goDetail(item.id)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const items = [
  { id: 1, name: '商品A' },
  { id: 2, name: '商品B' },
  { id: 3, name: '商品C' },
]

function goDetail(id: number) {
  router.push({ name: 'DetailView', params: { id } })
}
</script>
