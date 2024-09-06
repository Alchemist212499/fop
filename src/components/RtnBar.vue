<template>
  <v-toolbar
    density="compact"
    class="position-fixed top-0 left-0 right-0 onTop pt-1"
    color="white"
  >
    <v-btn class="pa-1" icon @click="router.back()">
      <v-icon size="x-large">mdi-chevron-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn class="ma-1" icon @click="router.push('/posts')">
      <v-icon size="large">mdi-dog</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
.onTop {
  z-index: 1;
}
</style>
