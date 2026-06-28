<template>
  <div class="publish page">
    <h1 class="publish-title">发布商品</h1>
    <form class="publish-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label">商品名称</label>
        <input type="text" class="form-input" placeholder="请输入商品名称" />
      </div>
      <div class="form-group">
        <label class="form-label">商品价格</label>
        <input type="text" class="form-input" placeholder="请输入价格" />
      </div>
      <div class="form-group">
        <label class="form-label">商品描述</label>
        <textarea class="form-input form-textarea" placeholder="请输入商品描述"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">联系方式</label>
        <input type="text" class="form-input" placeholder="请输入联系方式" />
      </div>
      <button type="submit" class="submit-btn">发布</button>
    </form>
  </div>
</template>

<script setup lang="ts">
function handleSubmit() {
  //
}
</script>

<style scoped>
.publish-title {
  font-size: 24px;
  margin-bottom: 24px;
}

.publish-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #409eff;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 12px 0;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #337ecc;
}
</style>
