<template>
  <!-- top toolbar -->
  <v-toolbar
    density="compact"
    class="position-fixed top-0 left-0 right-0 z1 bg-grey-lighten-4"
    color="white"
  >
    <v-btn class="pa-1" icon @click="router.back()">
      <v-icon size="large">mdi-chevron-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <span class="pt-1">发表画廊图片</span>
    <v-spacer></v-spacer>

    <v-btn
      class="pa-1"
      icon
      @click="
        async () => {
          await submit();
        }
      "
    >
      <v-icon size="default">mdi-send-variant-outline</v-icon>
    </v-btn>
  </v-toolbar>

  <v-container fluid class="mt-12 bg-grey-lighten-4" style="min-height: 95vh">
    <!-- Main Input -->
    <div class="rounded-xl mx-3 pa-4 bg-white">
      <!-- Title -->
      <v-text-field
        variant="solo"
        flat
        placeholder="请输入标题"
        count
        v-model="title"
      ></v-text-field>

      <!-- Image -->
      <v-row class="my-2 mx-1">
        <v-col
          class="d-flex child-flex pa-1"
          cols="4"
          v-for="(image, index) in base64ImageArray"
          :key="index"
        >
          <v-img :src="image" aspect-ratio="1" cover rounded="sm"></v-img>
        </v-col>
        <!-- Add image -->
        <v-col
          v-if="!base64ImageArray.length"
          class="d-flex child-flex pa-1 border border-dotted rounded-lg"
          cols="4"
          @click="
            () => {
              imgInput.click();
            }
          "
        >
          <v-img
            :src="require('../assets/img/white.png')"
            aspect-ratio="1"
            cover
            rounded="lg"
            class="d-flex justify-center pa-0 ma-0"
            color="bg-white"
          >
            <div class="d-flex w-100 h-100 justify-center align-center">
              <v-icon size="x-large" color="grey">mdi-plus</v-icon>
            </div>
          </v-img>
          <input
            type="file"
            name=""
            class="hide"
            ref="imgInput"
            @change="fileHandler"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import baseURL from "@/CONST/env";
import config from "@/CONST/config";
import Cookies from "js-cookie";

const router = useRouter();

const imgInput = ref(); // component ref
const title = ref("");
const base64ImageArray = ref([]);

function fileHandler(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const res = e.target.result;
    base64ImageArray.value.push(res);
  };
  reader.readAsDataURL(file);
}

async function submit() {
  if (true) {
    const postTitle = title.value;

    const postImage = base64ImageArray.value.map((img) => ({
      base64Encoded: img,
    }));

    try {
      const res = await axios.post(
        `${baseURL}/posts`,
        {
          title: postTitle,
          pics: postImage,
          type: "gallery",
        },
        { headers: { token: Cookies.get("userToken") } }
      );
      console.log(res.data);
      router.back();
    } catch (err) {
      console.error(err);
    }
  } else {
  }
}
</script>

<style scoped>
.hide {
  display: none;
}

.z1 {
  z-index: 1;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
