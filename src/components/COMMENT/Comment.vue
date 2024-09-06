<template>
  <v-card rounded="0" class="border-0" elevation="0" :color="bgColor">
    <v-card-item>
      <template v-slot:prepend class="d-flex align-content-start">
        <v-avatar :image="avatar" color="grey"></v-avatar>
      </template>
      <v-card-title style="font-size: 16px">{{ username }}</v-card-title>

      <v-card-subtitle>{{ time }}</v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{ content }}
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from "vue";

const { info, index } = defineProps(["info", "index"]);

const bgColor = computed(() => {
  return index % 2 ? "grey-lighten-4" : "white";
});

const { avatar, username, time, content } = info;
</script>

<style></style>
