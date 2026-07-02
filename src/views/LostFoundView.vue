<template>
  <section class="page">
    <div class="page-header">
      <h1>失物招领</h1>
      <p>发布和查找丢失物品，帮助失物早日归还原主。</p>
    </div>

    <SearchBar
      v-model="keyword"
      placeholder="搜索标题、物品名称、地点或描述"
    />

    <div class="filters">
      <select v-model="typeFilter">
        <option value="">全部类型</option>
        <option value="lost">寻物</option>
        <option value="found">招领</option>
      </select>
    </div>

    <LoadingState
      v-if="loading"
      text="正在加载失物招领信息..."
    />

    <ErrorState
      v-else-if="error"
      message="失物招领数据加载失败，请检查 Mock 服务是否正常运行。"
      show-retry
      @retry="loadLostFounds"
    />

    <EmptyState
      v-else-if="filteredItems.length === 0"
      :text="keyword || typeFilter ? '未搜索到符合条件的失物招领信息' : '暂无失物招领信息'"
    />

    <div v-else class="list">
      <ItemCard
        v-for="item in filteredItems"
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
          <button
            class="favorite-btn"
            :class="{ active: favoriteStore.isFavorite('lostFound', item.id!) }"
            @click="favoriteStore.toggleFavorite({
              id: item.id!,
              type: 'lostFound',
              title: item.title,
              description: item.description,
              location: item.location
            })"
          >
            {{ favoriteStore.isFavorite('lostFound', item.id!) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import SearchBar from '../components/SearchBar.vue'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { useFavoriteStore } from '../stores/favorite'

const favoriteStore = useFavoriteStore()
const lostFounds = ref<LostFoundItem[]>([])
const loading = ref(false)
const error = ref(false)
const keyword = ref('')
const typeFilter = ref('')

const statusMap: Record<string, string> = {
  open: '寻找中',
  closed: '已关闭',
  done: '已完成',
}

const filteredItems = computed(() => {
  return lostFounds.value.filter((item) => {
    const matchType = !typeFilter.value || item.type === typeFilter.value
    const value = keyword.value.trim()
    const matchKeyword = !value || (
      item.title.includes(value) ||
      item.itemName.includes(value) ||
      item.location.includes(value) ||
      item.description.includes(value)
    )
    return matchType && matchKeyword
  })
})

async function loadLostFounds() {
  loading.value = true
  error.value = false

  try {
    const res = await getLostFounds()
    lostFounds.value = res.data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadLostFounds()
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

.filters {
  padding: 0 16px;
}

.filters select {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  background: #fff;
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

.favorite-btn.active {
  background: #dbeafe;
  color: #2563eb;
}

.favorite-btn:hover {
  background: #1677ff;
  color: #fff;
}

.favorite-btn.active:hover {
  background: #dbeafe;
  color: #2563eb;
}
</style>
