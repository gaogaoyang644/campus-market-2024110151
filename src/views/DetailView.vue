<template>
  <div>
    <h1>商品详情</h1>
    <p>商品ID: {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>
