<template>
  <v-card-text class="text-body-2 px-6 py-1 compact">
    {{ article }}
  </v-card-text>
</template>

<script setup>
const { article } = defineProps(["article"]);
</script>

<style scoped>
.compact {
  line-height: 18px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serifW;
}
</style>
