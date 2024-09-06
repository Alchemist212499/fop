<template>
  <v-card
    variant="text"
    class="pb-4 border-b"
    @click="router.push(`/posts/${postid}`)"
  >
    <!-- UserInfo -->
    <user-info :user-info="{ username, location, time, avatar }"></user-info>
    <!-- Title -->
    <PostType :post-type="type"></PostType>
    <Title :title="title"></Title>
    <!-- Carousel -->
    <Carousel :pics="pics" :is-static="false"></Carousel>
    <!-- Controls -->
    <Controls :likes="likes" :views="views"></Controls>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import Carousel from "./POST/Carousel.vue";
import UserInfo from "./POST/UserInfo.vue";
import Controls from "./POST/Controls.vue";
import Title from "./POST/Title.vue";
import PostType from "./POST/PostType.vue";

const router = useRouter();

const { postInfo } = defineProps(["postInfo"]);
// const postInfo = {};
const {
  pics,
  username,
  location,
  title,
  likes,
  views,
  postid,
  time,
  avatar,
  type,
} = postInfo;
</script>

<style></style>
