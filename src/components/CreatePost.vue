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

    <DropdownMenu
      :options="4"
      @emit-type-selection="switchPostType"
    ></DropdownMenu>

    <v-spacer></v-spacer>

    <v-btn class="pa-1" icon @click="submit" type="submit">
      <v-icon size="default">mdi-send-variant-outline</v-icon>
    </v-btn>
  </v-toolbar>

  <v-container fluid class="mt-12 bg-grey-lighten-4" style="min-height: 100vh">
    <!-- Main Input -->
    <div class="rounded-xl mx-3 mb-8 pa-4 bg-white">
      <!-- Title -->
      <v-form fast-fail @submit.prevent>
        <v-text-field
          class="pb-3"
          variant="solo"
          flat
          label="标题"
          placeholder="请输入标题..."
          count
          v-model="title"
          :rules="[
            (value) => {
              if (value?.length) return true;
              return '！标题不能为空';
            },
          ]"
        ></v-text-field>
        <v-divider></v-divider>
        <!-- Article -->
        <v-textarea
          variant="solo"
          counter
          flat
          no-resize
          class="mb-5"
          label="正文"
          placeholder="请输入正文..."
          v-model="article"
          :rules="[
            (value) => {
              if (value?.length) return true;
              return '！正文不能为空';
            },
          ]"
        ></v-textarea>
      </v-form>
      <!-- Image -->
      <v-row class="my-2 mx-1" fluid>
        <!--       <v-col class="d-flex child-flex pa-1" cols="4">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            aspect-ratio="1"
            cover
            rounded="sm"
          ></v-img>
        </v-col> -->
        <v-col
          class="d-flex child-flex pa-1"
          cols="4"
          v-for="(image, index) in base64ImageArray"
          :key="index"
        >
          <v-img :src="image" cover rounded="lg"></v-img>
        </v-col>
        <!-- Add image -->
        <v-col
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
      <!--  <v-row class="mb-1 mx-2">
        <v-chip rounded="lg" color="red">
          <v-icon class="mr-2">mdi-pin</v-icon> Location
        </v-chip>
      </v-row> -->
    </div>
    <!-- Options -->
    <div
      class="rounded-xl mx-3 mb-8 px-2 bg-white"
      v-if="Object.entries(optionsData[postType]).length"
    >
      <v-list lines="two" class="rounded-xl">
        <v-list-item
          v-for="(option, key) in optionsData[postType]"
          @click="openBottomSheet(option, key)"
        >
          <v-list-title>{{ option.name }}</v-list-title>
          <template v-slot:append>
            <v-list-subheader v-if="option.type === 'Boolean'" class="pr-0">{{
              option.value[option.index]
            }}</v-list-subheader>
            <v-list-subheader v-else class="pr-0">{{
              option.value
            }}</v-list-subheader>
            <v-icon size="small">mdi-chevron-right</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </div>

    <!-- Bottom Sheet -->
    <v-bottom-sheet v-model="sheet.isVisible">
      <v-card class="pb-6">
        <div class="d-flex">
          <v-card-title>{{ sheet.name }} </v-card-title>
          <v-spacer></v-spacer>
          <v-card-actions class="mr-3"> </v-card-actions>
        </div>
        <!-- Number Input -->
        <v-text-field
          v-if="sheet.type === 'Number'"
          variant="underlined"
          :label="`请输入${sheet.name}`"
          flat
          class="px-6"
          type="number"
          v-model="sheet.value"
          min="0"
        ></v-text-field>
        <!-- Boolean Input -->
        <v-btn-toggle
          v-else-if="sheet.type === 'Boolean'"
          v-model="sheet.index"
          borderless
          class="d-flex"
          mandatory
        >
          <v-btn value="0" class="w-50">
            <v-icon> {{ sheetIcons[0] }}</v-icon>
          </v-btn>

          <v-btn value="1" class="w-50">
            <v-icon> {{ sheetIcons[1] }} </v-icon>
          </v-btn>
        </v-btn-toggle>

        <!-- String Input -->
        <v-text-field
          v-else
          variant="underlined"
          :label="`请输入${sheet.name}`"
          flat
          class="px-6"
          v-model="sheet.value"
          :rules="[
            (value) => {
              if (value?.length) return true;
              return `！${sheet.name}不能为空`;
            },
          ]"
        ></v-text-field>
      </v-card>
    </v-bottom-sheet>
  </v-container>

  <v-dialog v-model="submitHint.isVisible" width="auto" opacity="0">
    <span class="bg-grey-darken-3 rounded-lg pa-2 opacity-75">{{
      submitHint.isReady ? "帖子发表成功！" : "请完善您的帖子信息"
    }}</span></v-dialog
  >
</template>

<script setup>
/* Imports */
import { useRouter } from "vue-router";
import DropdownMenu from "./DropdownMenu.vue";
import { computed, reactive, ref, watch, watchEffect } from "vue";
import axios from "axios";
/* Variables */

const router = useRouter();
// const baseURL = process.env.VUE_APP_BASE_URL;
import baseURL from "@/CONST/env";
import config from "@/CONST/config";
import Cookies from "js-cookie";

const submitHint = ref({ isReady: false, isVisible: false });

// 初始化附加信息
const options = {
  source: "宠物来源", // 宠物来源
  breed: "宠物品种", // 宠物品种
  age: "宠物年龄", // 宠物年龄
  gender: "宠物性别", // 宠物性别
  deposit: "押金数额", // 押金数额
  contract: "签订协议", // 是否签订协议
};

const icons = {
  gender: ["mdi-gender-male", "mdi-gender-female"],
  contract: ["mdi-check", "mdi-close"],
};

/* Reactive */
const imgInput = ref(); // component ref

let postType = ref("adoption");
const title = ref("");
const article = ref("");
let base64ImageArray = ref([]);
const optionsData = reactive({
  adoption: {
    source: { type: "String", name: "宠物来源", value: "" },
    breed: { type: "String", name: "宠物品种", value: "" },
    age: { type: "String", name: "宠物年龄", value: "" },
    gender: {
      type: "Boolean",
      name: "宠物性别",
      value: ["公", "母"],
      index: 0,
    },
    deposit: { type: "Number", name: "押金数额", value: "" },
    contract: {
      type: "Boolean",
      name: "签订协议",
      value: ["是", "否"],
      index: 0,
    },
  },
  "lost-n-found": {
    address: { type: "String", name: "走失地址", value: "" },
    reward: { type: "Number", name: "报酬感谢", value: "" },
  },
  transaction: {
    item: { type: "String", name: "交易物品名称", value: "" },
    price_in: { type: "Number", name: "购入价格", value: "" },
    price_out: { type: "Number", name: "转让价格", value: "" },
  },
  "q-n-a": {},
});

// 提前定义好reactive的data，只需要通过帖子的类型来进行判断，不需要用之前的createOptionsMap方法，太麻烦了

const sheet = reactive({
  isVisible: false,
  type: "String",
  name: "",
  value: "",
  key: "",
  index: 0,
});

const sheetIcons = computed(() => {
  if (sheet.type === "Boolean") {
    return icons[sheet.key];
  }
});

/* Functions */

function switchPostType(type) {
  const lcType = type.toLowerCase();
  switch (lcType) {
    case "adoption":
      postType.value = lcType;
      break;
    case "lost & found":
      postType.value = "lost-n-found";
      break;
    case "transaction":
      postType.value = lcType;
      break;
    case "q & a":
      postType.value = "q-n-a";
      break;
  }
}

watch(sheet, (newSheet, oldSheet) => {
  if (newSheet.key !== "") {
    if (newSheet.type === "Boolean") {
      optionsData[postType.value][newSheet.key]["index"] = newSheet.index;
      console.log("new sheet index", newSheet.index);
    } else {
      optionsData[postType.value][newSheet.key]["value"] = newSheet.value;
    }
  }
});

function fileHandler(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const res = e.target.result;
    base64ImageArray.value.push(res);
  };
  if (file) {
    reader.readAsDataURL(file);
  }
}

function openBottomSheet(option, key) {
  if (option.type === "Boolean") {
    sheet.index = option.index;
    console.log("sheet index:", sheet.index);
  } else {
    sheet.value = option.value;
  }
  sheet.isVisible = true;
  sheet.name = option.name;
  sheet.type = option.type;
  sheet.key = key;
}

function checkOptions() {
  for (const item in optionsData[postType.value]) {
    const option = optionsData[postType.value][item];
    if (!option.value.length) return false;
  }
  return true;
}

const submitReady = computed(() => {
  return (
    base64ImageArray.value.length &&
    title.value.length &&
    article.value.length &&
    checkOptions()
  );
});

async function submit() {
  if (submitReady.value) {
    const pType = postType.value;
    const postTitle = title.value;
    const postArticle = article.value;
    const postLocation = "";

    const postImage = base64ImageArray.value.map((img) => ({
      base64Encoded: img,
    }));

    const postOptions = Object.entries(optionsData[postType.value]).reduce(
      (acc, [key, option]) => {
        if (option.type === "Boolean") {
          acc[key] = option.value[option.index];
        } else {
          acc[key] = option.value;
        }
        return acc;
      },
      {}
    );

    try {
      const res = await axios.post(
        `${baseURL}/posts`,
        {
          type: pType,
          title: postTitle,
          article: postArticle,
          location: postLocation,
          options: postOptions,
          pics: postImage,
        },
        { headers: { token: Cookies.get("userToken") } }
      );
      // console.log(res.data);
      // alert("posted");
      // 显示
      submitHint.value.isReady = true;
      submitHint.value.isVisible = true;
      // 提示发表成功
      setTimeout(() => {
        // 隐藏
        submitHint.value.isVisible = false;
        router.push("/posts");
      }, 1000);
    } catch (err) {
      alert(`发布失败:${err.message}`);
    }
  } else {
    submitHint.value.isVisible = true;
    setTimeout(() => {
      submitHint.value.isVisible = false;
    }, 1000);
  }
}
</script>

<style scoped>
.z1 {
  z-index: 1;
}

textarea::-webkit-scrollbar {
  display: none;
}

.hide {
  display: none;
}
</style>
