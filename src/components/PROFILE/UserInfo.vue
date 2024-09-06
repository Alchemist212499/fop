<template>
  <v-card
    class="w-100 d-block bg-grey-lighten-4 px-3"
    elevation="1"
    rounded="0"
  >
    <div class="d-flex align-center" border="sm">
      <!-- Avatar -->
      <v-card-item>
        <v-avatar
          color="grey-lighten-1"
          size="70"
          @click="
            () => {
              if (isMyInfo) {
                imgInput.click();
              }
            }
          "
        >
          <v-img :src="userInfo?.reactiveData?.avatar" alt="pic"> </v-img>
        </v-avatar>
        <input
          v-if="isMyInfo"
          type="file"
          name=""
          class="hide"
          ref="imgInput"
          @change="fileHandler"
      /></v-card-item>
      <!-- Username + tel -->
      <div>
        <v-card-title class="text-h5 pl-1 py-0">{{
          userInfo?.reactiveData?.nickName
        }}</v-card-title>
        <v-card-subtitle class="pl-1"
          ><span>联系方式：</span
          ><span>{{ userInfo?.reactiveData?.tel }}</span></v-card-subtitle
        >
      </div>
    </div>
    <!-- Bio -->
    <v-card-text class="rounded-lg px-5"
      ><span>个人简介：</span>
      <span>{{ userInfo?.reactiveData?.bio }}</span></v-card-text
    >
  </v-card>
</template>

<script setup>
import userInfoJSON from "@/assets/data/user";
// const userInfo = reactive(user.data);
// const { userInfo } = defineProps(["user-info"]);

import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import baseURL from "@/CONST/env";
import config from "@/CONST/config";
import Cookies from "js-cookie";

const { isMyInfo } = defineProps(["is-my-info"]);

let route = useRoute();
let userInfo = reactive({ reactiveData: null });
// let uid = Cookies.get("userid");

const avatar = reactive({ base64Encoded: "" });
const imgInput = ref(); // component ref
console.log("avatar image", userInfo.reactiveData);

async function fileHandler(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const res = e.target.result;
    avatar.base64Encoded = res;
    // console.log(avatar.base64Encoded);
  };
  reader.readAsDataURL(file);

  setTimeout(async () => {
    await submit();
    location.reload();
  }, 1);
}

async function submit() {
  if (true) {
    try {
      const res = await axios.put(
        `${baseURL}/users`,
        {
          avatar: avatar.base64Encoded,
        },
        { headers: { token: Cookies.get("userToken") } }
      );
    } catch (err) {
      console.error(err);
    }
  } else {
  }
}

// user info data
async function getUserInfoData(uid) {
  try {
    const userInfoRes = await axios.get(`${baseURL}/users/${uid}`, {
      headers: { token: Cookies.get("userToken") },
    });
    console.log("userInfoRes", userInfoRes);
    userInfo.reactiveData = userInfoRes.data.data;
    /* console.log(userInfoJSON);
    userInfo.reactiveData = userInfoJSON.data; */
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  console.log("route mounted:", route.path);
  if (route.path !== "/profile") {
    getUserInfoData(route.params.id);
  } else {
    getUserInfoData(Cookies.get("userid"));
  }
});

watch(
  route,
  (newVal, oldVal) => {
    console.log("new path", newVal.path);
  },
  { flush: "pre", immediate: true, deep: true }
);
// getUserInfoData();
</script>

<style scoped>
.hide {
  display: none;
}
</style>
