<template>
  <v-carousel
    hide-delimiters
    :show-arrows="isStatic ? 'hover' : false"
    class="px-5 my-3"
    :cycle="true"
    :interval="2000"
    :mandatory="force"
    @click="console.log('here debug', pics)"
  >
    <v-carousel-item
      v-for="(pic, index) in pics"
      :src="pic.base64Encoded"
      :key="index"
      cover
      rounded="xl"
    ></v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { computed, defineProps, onMounted, ref, watch } from "vue";

const { pics, isStatic } = defineProps(["pics", "isStatic"]);

const interval = ref(1000);

/* const interval = computed(() => {
  if (isStatic) {
    // if isStatic === true (postcard), interval should be static
    return 1000;
  } else {
    // if isStatic === false (detailed post) interval should be dynamic
    return setTimeout(() => 5000, 1000);
  }
}); */

// const picArray = ref([]);

/* watch(
  pics,
  (newVal, oldVal) => {
    console.log("picsArray", picArray.value);
    console.log("new pics", newVal);
    if (newVal?.length) {
      picArray.value = newVal;
    }
  },
  { flush: "pre", immediate: true, deep: true }
); */

onMounted(() => {
  setTimeout(() => {
    interval.value = 5000;
  }, 1000);
});
</script>

<style></style>
