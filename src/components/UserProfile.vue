<template>
  <v-container class="pa-0 bg-grey-lighten-4 position-sticky top-0 z1">
    <!-- Toolbar -->
    <div class="d-flex pa-1">
      <v-btn
        class="pa-1"
        color="grey-lighten-4"
        icon
        flat
        @click="router.back()"
      >
        <v-icon size="large">mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <span class="mt-3">TA的主页</span>
      <v-spacer></v-spacer>
      <v-btn
        class="pa-1"
        color="grey-lighten-4"
        icon
        flat
        @click="router.push('/posts')"
      >
        <v-icon size="large">mdi-dog</v-icon>
      </v-btn>
    </div>
    <!-- UserInfo -->
    <UserInfo :is-my-info="false"></UserInfo>
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
  <PostsView v-if="toggle === 'posts'" :is-my-profile="false"></PostsView>
  <!-- Gallery -->
  <GalleryView v-else :is-my-profile="false"></GalleryView>
  <!-- Bottom Nav -->
</template>

<script setup>
import UserInfo from "./PROFILE/UserInfo.vue";
import BtmNav from "./BtmNav.vue";
import PostsView from "./PROFILE/PostsView.vue";
import GalleryView from "./PROFILE/GalleryView.vue";

import axios from "axios";
import baseURL from "@/CONST/env";

const toggle = ref("posts");

import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
let galleryView = reactive({ reactiveData: null });
let userInfo = reactive({ reactiveData: null });

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
