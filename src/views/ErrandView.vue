<template>
  <section class="page">
    <div class="page-header">
      <h1>跑腿委托</h1>
      <p>发布或接单跑腿任务，互助互惠更方便。</p>
    </div>

    <SearchBar
      v-model="keyword"
      placeholder="搜索标题、任务类型、地点或描述"
    />

    <LoadingState
      v-if="loading"
      text="正在加载跑腿任务..."
    />

    <ErrorState
      v-else-if="error"
      message="跑腿数据加载失败，请检查 Mock 服务是否正常运行。"
      show-retry
      @retry="loadErrands"
    />

    <EmptyState
      v-else-if="filteredItems.length === 0"
      :text="keyword ? '未搜索到符合条件的跑腿任务' : '暂无跑腿任务'"
    />

    <div v-else class="list">
      <ItemCard
        v-for="item in filteredItems"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.taskType"
        :location="`${item.from} → ${item.to}`"
        :time="item.deadline"
      >
        <template #footer>
          <strong>￥{{ item.reward }}</strong>
          <span :class="['status', item.status]">{{ statusMap[item.status] }}</span>
          <button
            class="favorite-btn"
            :class="{ active: favoriteStore.isFavorite('errand', item.id!) }"
            @click="favoriteStore.toggleFavorite({
              id: item.id!,
              type: 'errand',
              title: item.title,
              description: item.description
            })"
          >
            {{ favoriteStore.isFavorite('errand', item.id!) ? '已收藏' : '收藏' }}
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
import { getErrands, type ErrandItem } from '../api/errand'
import { useFavoriteStore } from '../stores/favorite'

const favoriteStore = useFavoriteStore()
const errands = ref<ErrandItem[]>([])
const loading = ref(false)
const error = ref(false)
const keyword = ref('')

const statusMap: Record<string, string> = {
  open: '进行中',
  closed: '已关闭',
  done: '已完成',
}

const filteredItems = computed(() => {
  const value = keyword.value.trim()
  if (!value) return errands.value

  return errands.value.filter((item) => {
    return (
      item.title.includes(value) ||
      item.taskType.includes(value) ||
      item.from.includes(value) ||
      item.to.includes(value) ||
      item.description.includes(value)
    )
  })
})

async function loadErrands() {
  loading.value = true
  error.value = false

  try {
    const res = await getErrands()
    errands.value = res.data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadErrands()
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
  background: #eff6ff;
  color: #2563eb;
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
