<template>
  <div class="home page">
    <h1 class="home-title">校园集市</h1>
    <p class="home-desc">
      欢迎来到校园集市 — 一个属于同学们的闲置物品交易平台。<br>
      在这里，你可以轻松发布、浏览和交换各类商品，让资源循环利用，让校园生活更加便捷。
    </p>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);
  text-align: center;
  padding-top: 80px;
  padding-bottom: 80px;
}

.home-title {
  font-size: 48px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
}

.home-desc {
  font-size: 18px;
  color: #666;
  line-height: 1.8;
  max-width: 600px;
}
</style>
