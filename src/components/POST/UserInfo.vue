<template>
  <v-card-actions>
    <v-list-item class="w-100 px-3">
      <template v-slot:prepend>
        <v-avatar color="grey-darken-3" :image="userInfo.avatar"></v-avatar>
      </template>
      <template v-slot:append>
        <span class="text-grey">{{ userInfo.time }}</span>
      </template>
      <v-list-item-title>{{ userInfo.username }}</v-list-item-title>
      <v-list-item-subtitle>{{ userInfo.location }}</v-list-item-subtitle>
    </v-list-item>
  </v-card-actions>
</template>

<script setup>
import { useRouter } from "vue-router";

const { userInfo } = defineProps(["user-info"]);
</script>

<style></style>
