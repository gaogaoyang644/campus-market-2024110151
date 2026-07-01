<template>
  <div class="page" style="padding: 24px">
    <h1>发布信息</h1>
    <p>当前发布者：<strong>{{ userStore.displayName }}</strong>（{{ userStore.userDescription }}）</p>
    <p>发布二手、失物招领、拼单或跑腿信息。</p>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>
