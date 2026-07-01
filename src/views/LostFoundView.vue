<template>
  <section class="page">
    <div class="page-header">
      <h1>失物招领</h1>
      <p>发布和查找丢失物品，帮助失物早日归还原主。</p>
    </div>

    <EmptyState
      v-if="lostFounds.length === 0"
      text="暂无失物招领信息"
    />

    <div v-else class="list">
      <ItemCard
        v-for="item in lostFounds"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type === 'lost' ? '丢失' : '拾到'"
        :location="item.location"
        :time="item.eventTime"
      >
        <template #footer>
          <span>联系人：{{ item.contact }}</span>
          <span :class="['status', item.status]">{{ statusMap[item.status] }}</span>
          <button class="favorite-btn" @click="favoriteStore.toggleFavorite({
            id: item.id!,
            type: 'lostFound',
            title: item.title,
            description: item.description,
            location: item.location
          })">
            {{ favoriteStore.isFavorite('lostFound', item.id!) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { useFavoriteStore } from '../stores/favorite'

const favoriteStore = useFavoriteStore()
const lostFounds = ref<LostFoundItem[]>([])

const statusMap: Record<string, string> = {
  open: '寻找中',
  closed: '已关闭',
  done: '已完成',
}

onMounted(async () => {
  const res = await getLostFounds()
  lostFounds.value = res.data
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.page-header h1 {
  margin: 0 0 8px;
}

.page-header p {
  margin: 0;
  color: #6b7280;
}

.list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.status {
  margin-left: 12px;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
}

.status.open {
  background: #fef3c7;
  color: #d97706;
}

.status.done {
  background: #d1fae5;
  color: #059669;
}

.status.closed {
  background: #f3f4f6;
  color: #6b7280;
}
.favorite-btn {
  margin-left: 12px;
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
}
.favorite-btn:hover {
  background: #1677ff;
  color: #fff;
}
</style>
