<template>
  <div class="message page">
    <h1 class="message-title">消息</h1>
    <div class="chat-list">
      <div v-for="msg in messages" :key="msg.id" class="chat-item">
        <div class="chat-avatar"></div>
        <div class="chat-body">
          <p class="chat-name">{{ msg.name }}</p>
          <p class="chat-text">{{ msg.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const messages = [
  { id: 1, name: '张三', text: '你好，请问这个商品还在吗？' },
  { id: 2, name: '李四', text: '价格可以再商量一下吗？' },
  { id: 3, name: '王五', text: '好的，明天下午交易' },
]
</script>

<style scoped>
.message-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.chat-list {
  max-width: 600px;
  margin: 0 auto;
}

.chat-item {
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 16px;
  border-bottom: 1px solid #f0f0f0;
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #dcdfe6;
  flex-shrink: 0;
  margin-right: 12px;
}

.chat-body {
  flex: 1;
  min-width: 0;
}

.chat-name {
  font-size: 15px;
  color: #333;
  margin-bottom: 4px;
}

.chat-text {
  font-size: 13px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
