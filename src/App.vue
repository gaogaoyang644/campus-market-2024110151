<script setup lang="ts"></script>

<template>
  <div class="app">
    <el-menu mode="horizontal" router>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/list">列表页</el-menu-item>
      <el-menu-item index="/detail/1">详情页</el-menu-item>
      <el-menu-item index="/publish">发布页</el-menu-item>
      <el-menu-item index="/message">消息页</el-menu-item>
      <el-menu-item index="/profile">个人中心</el-menu-item>
      <el-menu-item index="/board">看板页</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<style scoped>
.app {
  padding: 32px;
}
</style>