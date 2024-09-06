<template>
  <v-card-text class="text-subtitle-1 font-weight-medium px-6 py-1 compact">
    {{ title }}
  </v-card-text>
</template>

<script setup>
const { title } = defineProps(["title"]);
</script>

<style scoped>
.compact {
  line-height: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serifW;
}
</style>
