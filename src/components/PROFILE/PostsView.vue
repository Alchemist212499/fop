<template>
  <v-container class="d-flex bg-grey-lighten-4">
    <v-row>
      <!-- Post Card -->
      <v-col
        v-for="(post, index) in postsView.reactiveData"
        cols="6"
        class="px-2 top-0"
        :key="index"
        @click.prevent="router.push(`/posts/${post.postid}`)"
        @contextmenu.prevent="
          () => {
            if (isMyProfile) {
              controlOptions = true;
            }
          }
        "
      >
        <v-card elevation="0" rounded="lg">
          <!-- Image -->
          <v-img
            :src="post.pics[0]?.base64Encoded"
            height="225"
            cover
            class="position-relative"
          >
            <!-- Views -->
            <v-chip
              class="position-absolute bottom-0 ma-1"
              tonal
              color="white"
              density="compact"
              size="small"
            >
              <v-icon class="mr-1">mdi-eye-outline</v-icon>
              <span>{{ post.views }}</span>
            </v-chip>
            <!-- Post Type -->
            <v-chip
              class="position-absolute top-0 right-0 ma-1"
              label
              tonal
              density="compact"
              :color="matchIcon(post.type)?.color"
            >
              <v-icon class="">{{ matchIcon(post.type)?.icon }}</v-icon>
            </v-chip>
          </v-img>
          <!-- Title -->
          <v-card-title class="pl-2 text-body-1" style="max-width: 150px">{{
            post.title
          }}</v-card-title>
          <!-- User Info Thumbnail -->
          <div class="d-flex align-center px-1 py-2">
            <v-avatar size="25" :image="post.avatar" color="grey"></v-avatar>
            <v-card-subtitle class="px-1">{{ post.username }}</v-card-subtitle>
            <v-spacer></v-spacer>
            <!-- Likes -->
            <div class="pb-1 px-1">
              <v-icon size="small" class="pr-1">mdi-heart-outline</v-icon>
              <span class="">{{ post.likes }}</span>
            </div>
          </div>
        </v-card>
        <v-dialog v-model="controlOptions"
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
  </v-container>
  <Progress v-if="isLoading"></Progress>
</template>

<script setup>
// const { posts } = defineProps(["posts-review"]);
// const posts = reactive(postsReview.data.list);
// import { postsReview } from "@/assets/data/posts";
import postsReviewJSON from "@/assets/data/posts.json";
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const { isMyProfile } = defineProps(["is-my-profile"]);

const controlOptions = ref(false);
const deleteHint = ref({ isReady: false, isVisible: false });

let postsView = reactive({ reactiveData: null });
const uid = isMyProfile ? Cookies.get("userid") : route.params.id;

import axios from "axios";
// const baseURL = process.env.VUE_APP_BASE_URL;
import baseURL from "@/CONST/env";
import config from "@/CONST/config";
import Cookies from "js-cookie";
import Progress from "../Progress.vue";

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

const isLoading = computed(() => {
  if (postsView.reactiveData !== null) {
    return false;
  } else {
    return true;
  }
});

function matchIcon(type) {
  const foundChip = typeChip.find((item) => item.type === type);
  return foundChip;
}

// posts data
async function getPostsData() {
  try {
    const postsRes = await axios.get(`${baseURL}/posts?uid=${uid}`, {
      headers: { token: Cookies.get("userToken") },
    });

    postsView.reactiveData = postsRes.data.data.rows;
    // postsView.reactiveData = postsReviewJSON.data.rows;
  } catch (err) {
    console.error(err);
  }
}

/* async function showOptions(pid) {
  console.log("show options");
  if (isMyProfile) {
    controlOptions.value = true;

    const del = confirm("是否删除");
    if (del) {
      try {
        const res = await axios.delete(`${baseURL}/posts/${pid}`, {
          headers: { token: Cookies.get("userToken") },
        });
        console.log(res.data);
        getPostsData();
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
    getPostsData();
    setTimeout(() => {
      deleteHint.value.isVisible = false;
    }, 2000);
  } catch (err) {
    console.error(err);
    deleteHint.value.isVisible = true;
    setTimeout(() => {
      deleteHint.value.isVisible = false;
    }, 1000);
  }
}

getPostsData();
// onBeforeMount(getPostsData);
</script>

<style scoped>
.z1 {
  z-index: 1;
}
</style>
