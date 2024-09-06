<template>
  <v-btn color="black" width="10rem">
    {{ btnText }}
    <v-icon>mdi-chevron-down</v-icon>
    <v-menu activator="parent">
      <v-list>
        <v-list-item
          v-for="(postType, index) in postTypes"
          :key="index"
          :value="index"
          @click="clickHandler(index)"
        >
          <v-list-item-title class="text-center">{{
            postType
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup>
import axios from "axios";
import { ref, defineProps, defineEmits, computed } from "vue";
import baseURL from "@/CONST/env";
import config from "@/CONST/config";
import emitter from "@/utils/Events";
import router from "@/routes";

const { options } = defineProps({ options: Number });
const emits = defineEmits(["emitTypeSelection", "emitPostType"]);

const btnText = ref("");
const postTypes = ref([]);

if (options === 4) {
  postTypes.value = ["Adoption", "Lost & Found", "Transaction", "Q & A"];
  // btnText = ref(postTypes[0]);
  btnText.value = "Adoption";
} else {
  // options === 5
  postTypes.value = ["All", "Adoption", "Lost & Found", "Transaction", "Q & A"];
  btnText.value = "Pet Community";
}

const pTypes = ["all", "adoption", "lost-n-found", "transaction", "q-n-a"];

function clickHandler(index) {
  if (options === 4) {
    btnText.value = postTypes.value[index];
  } else {
    // options === 5
    if (index === 0) {
      btnText.value = "Pet Community";
    } else {
      btnText.value = `PC > ${postTypes.value[index]}`;
    }
    // router.push({ name: "community", query: { pType: pTypes[index] } });
    // router.go();

    // emitter.emit("reset-post-type", pTypes[index]);
    emits("emit-post-type", pTypes[index]);
  }
  emits("emitTypeSelection", postTypes.value[index]);
}
</script>
