<template>
  <!-- Return Bar -->
  <RtnBar></RtnBar>
  <!-- Post Info -->
  <div class="mt-12 overflow-y-auto">
    <user-info
      :user-info="userInfo"
      @click="
        () => {
          const userid = Cookies.get('userid');
          console.log('this is cookie userid', userid);
          console.log('this is the userinfo userid', userInfo.userid);
          if (userid == userInfo.userid) {
            // current user's post
            router.push(`/profile`);
          } else {
            // other user's post
            router.push(`/profile/${userInfo.userid}`);
          }
        }
      "
    ></user-info>
    <Title :title="postInfo.reactiveData?.title"></Title>
    <Chips
      :options="postInfo.reactiveData?.options"
      :type="postInfo.reactiveData?.type"
    ></Chips>
    <Carousel :pics="postInfo.reactiveData?.pics" :is-static="true"></Carousel>
    <Article :article="postInfo.reactiveData?.article"></Article>
    <CommentSec
      :comments="commentInfo.reactiveData?.rows"
      :total="commentInfo.reactiveData?.total"
      :postid="postInfo.reactiveData?.postid"
      @emit-delete-comment="getCommentsData"
    ></CommentSec>
  </div>
  <!-- Controls at bottom -->
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation grow>
      <!-- like button -->
      <v-btn class="d-flex justify-center align-center" @click="sendLike">
        <v-icon v-if="!like" size="x-large">mdi-heart-outline</v-icon>
        <v-icon v-else size="x-large" color="red">mdi-heart</v-icon>
        <span class="subheading">{{ postInfo.reactiveData?.likes }}</span>
      </v-btn>

      <!-- comment button -->
      <v-btn
        class="d-flex justify-center align-center"
        @click="openBottomSheet"
      >
        <v-icon size="x-large">mdi-comment-outline</v-icon>
        <span class="subheading">{{ commentInfo.reactiveData?.total }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>

  <v-bottom-sheet v-model="sheet.isVisible">
    <v-card class="pb-6">
      <div class="d-flex">
        <v-card-title>发表你的评论</v-card-title>
        <v-spacer></v-spacer>
        <v-card-actions class="mr-3"
          ><v-btn color="black" variant="outlined" @click="sendComment"
            >发送</v-btn
          >
        </v-card-actions>
      </div>

      <!-- String Input -->
      <v-text-field
        variant="underlined"
        :label="`请输入${''}`"
        flat
        class="px-6"
        v-model="sheet.comment"
      ></v-text-field>
    </v-card>
  </v-bottom-sheet>
  <v-dialog v-model="commentHint.isVisible" width="auto" opacity="0">
    <span class="bg-grey-darken-3 rounded-lg pa-2 opacity-75">{{
      commentHint.isReady ? "评论发表成功" : "评论发表失败，请重试"
    }}</span></v-dialog
  >
</template>

<script setup>
// import { postsDetail } from "@/assets/data/posts";
// import comments from "./assets/data/comments";
import RtnBar from "./components/RtnBar.vue";
import UserInfo from "./components/POST/UserInfo.vue";
import Title from "./components/POST/Title.vue";
import Carousel from "./components/POST/Carousel.vue";
import Article from "./components/POST/Article.vue";
import Chips from "./components/POST/Chips.vue";
import CommentSec from "./components/CommentSec.vue";

import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import postJSON from "@/assets/data/post.json";
import commentsJSON from "@/assets/data/comments.json";

let commentHint = ref({ isVisible: false, isReady: false });
let sheet = ref({ isVisible: false, comment: "" });
let like = ref(false);
let postInfo = reactive({ reactiveData: null });
let commentInfo = reactive({ reactiveData: null });
let userInfo = computed(() => {
  const username = postInfo.reactiveData?.username;
  const location = postInfo.reactiveData?.location;
  const time = postInfo.reactiveData?.time;
  const avatar = postInfo.reactiveData?.avatar;
  const userid = postInfo.reactiveData?.userid;
  return { username, location, time, avatar, userid };
});

import axios from "axios";
// const baseURL = process.env.VUE_APP_BASE_URL;
import baseURL from "@/CONST/env";
import config from "@/CONST/config";
import Cookies from "js-cookie";

// get the current postid from the route param
const route = useRoute();
const router = useRouter();
let pid = route.params.id;

// const { total, list } = comments.data;

async function sendComment() {
  try {
    if (!sheet.value.comment.length) {
      throw new Error("no comment content");
    }
    const res = await axios.post(
      `${baseURL}/posts/${pid}/comments`,
      {
        content: sheet.value.comment,
      },
      { headers: { token: Cookies.get("userToken") } }
    );

    sheet.value.isVisible = false;
    sheet.value.comment = "";

    commentHint.value.isReady = true;

    // getCommentsData();
    location.reload();
  } catch (err) {
    commentHint.value.isReady = false;
    console.error(err);
  } finally {
    commentHint.value.isVisible = true;
    setTimeout(
      () => {
        commentHint.value.isVisible = false;
      },
      commentHint.value.isReady ? 1000 : 2000
    );
  }
}

async function sendLike() {
  like.value = true;
  try {
    const res = await axios.patch(`${baseURL}/posts/${pid}/likes`, null, {
      headers: { token: Cookies.get("userToken") },
    });
    // console.log("patch request", res.data);
    getPostInfoData();
  } catch (err) {
    console.error(err);
  }
}

function openBottomSheet() {
  sheet.value.isVisible = true;
}

// get detailed post info data from API
async function getPostInfoData() {
  try {
    const res = await axios.get(`${baseURL}/posts/${pid}`, config);
    postInfo.reactiveData = res.data.data;
    // console.log(res.data.data);
    /* const res = postJSON.data;
    postInfo.reactiveData = res; */
  } catch (err) {
    console.error(err);
  }
}

// get relevant comments
async function getCommentsData() {
  try {
    const res = await axios.get(`${baseURL}/posts/${pid}/comments`, config);
    // console.log("comment data", res.data);
    commentInfo.reactiveData = res.data.data;
    /* const res = commentsJSON.data;
    commentInfo.reactiveData = res; */
  } catch (err) {
    console.error(err);
  }
}

getPostInfoData();
getCommentsData();

window.scrollTo(0, 0);
</script>

<style scoped>
.onTop {
  z-index: 1;
}
</style>
