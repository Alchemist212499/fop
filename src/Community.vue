<template>
  <TopNav @emit-post-type="handleEmit"></TopNav>
  <v-infinite-scroll
    v-if="postsReview.reactiveData !== null"
    @load="loadNextPage"
    class="mt-9 overflow-y-auto"
    mode="manual"
  >
    <PostCard
      v-for="(post, index) in postsReview.reactiveData"
      :post-info="post"
      :key="index"
      @click="console.log('this is the post data', post)"
    ></PostCard>
    <template v-slot:empty>
      <v-alert type="warning">没有更多帖子了</v-alert>
    </template>
  </v-infinite-scroll>

  <BtmNav></BtmNav>
  <Progress v-if="isLoading"></Progress>
</template>

<script setup>
import PostCard from "./components/PostCard.vue";
import BtmNav from "./components/BtmNav.vue";
import TopNav from "./components/TopNav.vue";
import Progress from "./components/Progress.vue";
import axios from "axios";
import emitter from "./utils/Events";
// import { postsReview } from "@/assets/data/posts";
import postsReviewJSON from "@/assets/data/posts.json";

import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";

import baseURL from "@/CONST/env";
import config from "@/CONST/config";
import { useRoute, useRouter } from "vue-router";
import Cookies from "js-cookie";

const ptype = ref("all");
const curPage = ref(1);
const route = useRoute();
const router = useRouter();

const postsReview = reactive({ reactiveData: null });

const isLoading = computed(() => {
  if (postsReview.reactiveData !== null) {
    return false;
  } else {
    return true;
  }
});

async function handleEmit(type) {
  console.log("finally here", type);
  ptype.value = type;
  // await getData();
}

async function getData(page) {
  try {
    const res = await axios.get(
      `${baseURL}/posts?ptype=all&page=${page}`,
      config
    );
    postsReview.reactiveData = res.data.data.rows;
    console.log("res arrived");
    /* const res = postsReviewJSON.data.rows;
    postsReview.reactiveData = res; */
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
}

async function loadNextPage({ done }) {
  if (postsReview.reactiveData !== null) {
    const prevPosts = [...postsReview.reactiveData];
    console.log("curpage", curPage.value);
    // const res = postsReviewJSON.data.rows;
    if (curPage.value * 10 < totalPosts) {
      const res = await getData(++curPage.value);
      console.log("curpage", curPage.value);
      postsReview.reactiveData = [...prevPosts, ...res.rows];
      done("ok");
    } else {
      done("empty");
    }

    /*  setTimeout(() => {
      postsReview.reactiveData = [...prevPosts, ...res];
    }, 1000); */
  }
}

let totalPosts;
onMounted(async () => {
  const firstRes = await getData(curPage.value);
  totalPosts = firstRes?.total;
  console.log("total posts", totalPosts);
});
</script>

<style></style>
