<template>
  <v-container class="pa-0 bg-grey-lighten-4 position-sticky top-0 z1">
    <!-- Toolbar -->
    <div class="d-flex pa-1">
      <v-btn
        class="pa-1"
        color="grey-lighten-4"
        icon
        flat
        @click="router.push('/posts')"
      >
        <v-icon size="large">mdi-dog</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <span class="mt-3">我的主页</span>
      <v-spacer></v-spacer>

      <v-btn class="pa-1" color="grey-lighten-4" icon flat @click="logout">
        <v-icon size="default">mdi-logout</v-icon>
      </v-btn>
    </div>
    <!-- UserInfo -->
    <UserInfo :is-my-info="true"></UserInfo>
    <!-- Display Selection -->
    <v-btn-toggle borderless mandatory class="d-flex" v-model="toggle">
      <v-btn
        class="w-50"
        icon="mdi-card-account-details-outline"
        value="posts"
        @click="toggleView"
      >
      </v-btn>
      <v-btn
        class="w-50"
        icon="mdi-view-grid-outline"
        value="gallery"
        @click="toggleView"
      >
      </v-btn>
    </v-btn-toggle>
  </v-container>
  <!-- Posts -->
  <PostsView
    v-if="toggle === 'posts'"
    class=""
    :is-my-profile="true"
  ></PostsView>
  <!-- Gallery -->
  <GalleryView v-else :is-my-profile="true"> </GalleryView>
  <!-- Bottom Nav -->
  <BtmNav></BtmNav>
</template>

<script setup>
import UserInfo from "./PROFILE/UserInfo.vue";
import BtmNav from "./BtmNav.vue";
import PostsView from "./PROFILE/PostsView.vue";
import GalleryView from "./PROFILE/GalleryView.vue";

import axios from "axios";
// const baseURL = process.env.VUE_APP_BASE_URL;
import baseURL from "@/CONST/env";

const toggle = ref("posts");

import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
let galleryView = reactive({ reactiveData: null });
let userInfo = reactive({ reactiveData: null });

function logout() {
  Cookies.remove("userToken");
  Cookies.remove("userid");
  router.push("/login");
}

const router = useRouter();
</script>

<style scoped>
.z1 {
  z-index: 1;
}
.z2 {
  z-index: 2;
}
</style>
