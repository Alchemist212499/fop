<template>
  <v-layout class="overflow-visible" style="height: 56px" v-model="curView">
    <v-bottom-navigation color="black" grow active>
      <v-btn class="pa-1" @click="navigate('/posts', 0)" :value="0">
        <v-icon size="x-large">mdi-home-circle-outline</v-icon>
      </v-btn>

      <v-btn class="pa-1" @click="navigate('/create', 1)" :value="1">
        <v-icon size="x-large">mdi-plus-circle-outline</v-icon>
      </v-btn>

      <v-btn class="pa-1" @click="navigate('/profile', 2)" :value="2">
        <v-icon size="x-large">mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// const curView = ref("community");
const curView = ref(0);

function activeColor(index) {
  let color = "white";
  if (index === curView.value) {
    color = "grey";
  }
  return color;
}

function navigate(path, value) {
  router.push(path);
  curView.value = value;
}

/* watch(, (newVal, oldVal) => {
  console.log("here indeed", newVal);
}); */
</script>

<style></style>
