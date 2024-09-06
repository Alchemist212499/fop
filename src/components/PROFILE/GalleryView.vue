<template>
  <v-container class="d-flex px-0">
    <v-row class="" style="margin-left: 1px; margin-right: 1px">
      <v-col
        v-for="(post, index) in galleryView?.reactiveData"
        cols="4"
        class=""
        style="padding: 1px"
        :key="index"
        @click="showOverlay(post.postid)"
        @contextmenu.prevent="
          () => {
            if (isMyProfile) {
              controlOptions = true;
            }
          }
        "
      >
        <v-img
          :src="post.pics[0].base64Encoded"
          aspect-ratio="1"
          cover
          rounded="sm"
        ></v-img>
        <v-dialog v-model="controlOptions" opacity="0.15"
          ><v-card title="是否删除帖子？">
            <v-card-actions>
              <v-btn
                color="red"
                variant="tonal"
                @click="
                  () => {
                    controlOptions = false;
                    deletePost(post.postid);
                  }
                "
                >删除</v-btn
              >
            </v-card-actions>
          </v-card></v-dialog
        >
        <v-dialog v-model="deleteHint.isVisible" width="auto" opacity="0">
          <span class="bg-grey-darken-3 rounded-lg pa-2 opacity-75">{{
            deleteHint.isReady ? "帖子删除成功！" : "帖子删除失败"
          }}</span></v-dialog
        >
      </v-col>
    </v-row>
    <v-btn
      v-if="isMyProfile"
      icon
      variant="elevated"
      elevation="5"
      @click="router.push('/create-gallery')"
      class="position-fixed right-0 me-5 z2 bottom-50"
      style="bottom: 15vh"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>

  <v-overlay
    v-model="overlay.isVisible"
    class="d-flex justify-center align-center"
    opacity="0.95"
    @click="overlay.isVisible = false"
  >
    <v-img :src="overlay.img" class="px-10 my-5" width="100vw"></v-img>
    <span class="text-white mx-12 text-h6 d-flex">{{ overlay.title }}</span>
  </v-overlay>
  <Progress v-if="isLoading"></Progress>
</template>

<script setup>
// import { postsReview } from "@/assets/data/posts";
// const posts = reactive(postsReview.data.list);
import { computed, reactive, ref, watch } from "vue";

const route = useRoute();
const router = useRouter();
const { isMyProfile } = defineProps(["is-my-profile"]);
let galleryView = reactive({ reactiveData: null });
const isLoading = computed(() => {
  if (galleryView.reactiveData !== null) {
    return false;
  } else {
    return true;
  }
});

let overlay = ref({ isVisible: false, img: "", title: "default title" });
const uid = isMyProfile ? Cookies.get("userid") : route.params.id;

import axios from "axios";
import { useRoute, useRouter } from "vue-router";
// const baseURL = process.env.VUE_APP_BASE_URL;
import baseURL from "@/CONST/env";
import config from "@/CONST/config";
import postsJSON from "@/assets/data/posts.json";
import postJSON from "@/assets/data/post.json";
import Cookies from "js-cookie";
import Progress from "../Progress.vue";

// gallery data
async function getGalleryData() {
  try {
    const galleryRes = await axios.get(
      `${baseURL}/posts?uid=${uid}&ptype=gallery`,
      { headers: { token: Cookies.get("userToken") } }
    );
    galleryView.reactiveData = galleryRes.data.data.rows;
    //  galleryView.reactiveData = postsJSON.data.rows;
  } catch (err) {
    console.error(err);
  }
}

async function showOverlay(postid) {
  overlay.value.isVisible = true;
  try {
    const res = await axios.get(`${baseURL}/posts/${postid}`, {
      headers: { token: Cookies.get("userToken") },
    });
    overlay.value.img = res.data.data.pics[0].base64Encoded;
    overlay.value.title = res.data.data.title;
    /*  overlay.value.img = postJSON.data.pics[2].base64Encoded;
    overlay.value.title = postJSON.data.title; */
  } catch (err) {
    console.error(err);
  }
}

const controlOptions = ref(false);
const deleteHint = ref({ isReady: false, isVisible: false });

/* async function showControlOptions(pid) {
  console.log("show options");
  if (isMyProfile) {
    const del = confirm("是否删除");
    if (del) {
      try {
        const res = await axios.delete(`${baseURL}/posts/${pid}`, {
          headers: { token: Cookies.get("userToken") },
        });
        console.log(res.data);
        getGalleryData();
      } catch (err) {
        alert(err);
      }
    }
  }
} */

async function deletePost(pid) {
  try {
    const res = await axios.delete(`${baseURL}/posts/${pid}`, {
      headers: { token: Cookies.get("userToken") },
    });
    console.log(res.data);
    deleteHint.value.isReady = true;
    deleteHint.value.isVisible = true;
    getGalleryData();
    setTimeout(() => {
      deleteHint.value.isVisible = false;
    }, 2000);
  } catch (err) {
    deleteHint.value.isVisible = true;
    setTimeout(() => {
      deleteHint.value.isVisible = false;
    }, 1000);
    console.error(err);
  }
}

watch(
  overlay,
  (newVal, oldVal) => {
    if (newVal.isVisible === false) {
      overlay.value.img = "";
    }
  },
  { flush: "pre", immediate: true, deep: true }
);

getGalleryData();
</script>

<style scoped>
.z1 {
  z-index: 1;
}
.z2 {
  z-index: 2;
}
</style>
