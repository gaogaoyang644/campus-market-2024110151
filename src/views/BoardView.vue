<template>
  <div class="board page">
    <h1 class="board-title">数据看板</h1>
    <div class="stats-grid">
      <div class="stat-card">
        <p class="stat-label">商品总数</p>
        <p class="stat-value">128</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">今日发布</p>
        <p class="stat-value">12</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">注册用户</p>
        <p class="stat-value">356</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-title {
  font-size: 24px;
  margin-bottom: 24px;
}

.stats-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 200px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 28px 24px;
  text-align: center;
}

.stat-label {
  font-size: 14px;
  color: #999;
  margin-bottom: 12px;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: #409eff;
}
</style>
