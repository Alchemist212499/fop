<template>
  <v-chip :color="chip?.color" class="mx-4">
    <v-icon>{{ chip?.icon }}</v-icon>
    <span class="mx-1">{{ chip?.name }}</span>
  </v-chip>
</template>

<script setup>
import { defineProps, computed } from "vue";
const { postType } = defineProps(["post-type"]);

const typeChip = [
  {
    type: "adoption",
    icon: "mdi-handshake",
    color: "indigo-darken-1",
    name: "领养",
  },
  {
    type: "lost-n-found",
    icon: "mdi-cellphone-marker",
    color: "red-accent-4",
    name: "走失",
  },
  {
    type: "transaction",
    icon: "mdi-currency-usd",
    color: "green-accent-3",
    name: "交易",
  },
  {
    type: "q-n-a",
    icon: "mdi-share",
    color: "cyan-accent-3",
    name: "交流问答",
  },
];

const chip = computed(() => {
  const foundChip = typeChip.find((chip) => chip.type === postType);
  return foundChip;
});
</script>

<style></style>
