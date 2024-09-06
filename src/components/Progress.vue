<template>
  <v-overlay
    v-model="isVisible"
    opacity="0.95"
    class="d-flex justify-center align-center flex-column-reverse"
    ><v-progress-circular
      indeterminate
      :size="128"
      color="white"
    ></v-progress-circular>
    <div class="text-white ma-3">数据加载中...</div></v-overlay
  >
</template>

<script setup>
const isVisible = true;
</script>

<style></style>
