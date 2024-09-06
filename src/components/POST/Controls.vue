<template>
  <div class="d-flex justify-space-around px-5">
    <div>
      <v-icon class="me-1" icon="mdi-heart-outline"></v-icon>
      <span class="subheading me-2">{{ likes }}</span>
    </div>
    <div>
      <v-icon class="me-1" icon="mdi-eye-outline"></v-icon>
      <span class="subheading">{{ views }}</span>
    </div>
  </div>
</template>

<script setup>
const { likes, views } = defineProps(["likes", "views"]);
</script>

<style></style>
