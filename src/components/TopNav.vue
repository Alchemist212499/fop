<template>
  <v-toolbar
    density="compact"
    class="position-fixed top-0 left-0 right-0 onTop pt-1"
    color="white"
    elevation="2"
  >
    <v-btn class="pa-1" icon @click="refresh">
      <v-icon size="large">mdi-dog</v-icon>
    </v-btn>
    <span>Pet Community</span>

    <!-- <v-toolbar-title>Pet Community</v-toolbar-title> -->
    <!-- <v-spacer></v-spacer> -->

    <!-- <DropdownMenu :options="5" @emit-post-type="handleEmit"></DropdownMenu> -->

    <v-spacer></v-spacer>

    <!--  <v-btn class="pa-1" icon>
      <v-icon size="large">mdi-magnify</v-icon>
    </v-btn> -->
  </v-toolbar>
</template>

<script setup>
import { useRouter } from "vue-router";
import DropdownMenu from "./DropdownMenu.vue";
const emits = defineEmits(["emit-post-type"]);
const router = useRouter();
function handleEmit(type) {
  emits("emit-post-type", type);
}

function refresh() {
  location.reload();
}
</script>

<style scoped>
.onTop {
  z-index: 1;
}
</style>
