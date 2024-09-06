<template>
  <v-toolbar
    :title="`评论`"
    density="compact"
    color="grey-lighten-3"
    class="mt-5"
  ></v-toolbar>
  <Comment
    v-for="(comment, index) in comments"
    :key="index"
    :info="comment"
    :index="index"
    @contextmenu.prevent="deleteComment(comment.commentid, comment.userid)"
  >
    <!-- <v-dialog v-model="controlOptions" class=""
      ><v-card title="是否删除评论？">
        <v-card-actions>
          <v-btn
            color="red"
            variant="tonal"
            @click="
              () => {
                console.log('in heerre');
                controlOptions = false;
                deleteComment(comment.commentid);
              }
            "
            >删除</v-btn
          >
        </v-card-actions>
      </v-card></v-dialog
    >
    <v-dialog v-model="deleteHint.isVisible" width="auto" opacity="0">
      <span class="bg-grey-darken-3 rounded-lg pa-2 opacity-75">{{
        deleteHint.isReady ? "评论删除成功！" : "评论删除失败"
      }}</span></v-dialog
    > --></Comment
  >
</template>

<script setup>
import Cookies from "js-cookie";
import Comment from "./COMMENT/Comment.vue";
import axios from "axios";
import baseURL from "@/CONST/env";
import config from "@/CONST/config";
import { ref } from "vue";
const { comments, total, postid } = defineProps([
  "comments",
  "total",
  "postid",
]);

const emits = defineEmits(["emit-delete-comment"]);
const deleteComfirm = ref(false);
let controlOptions = ref(false);
const deleteHint = ref({ isReady: false, isVisible: false });

async function deleteComment(cid, uid) {
  /*   try {
    const res = await axios.delete(
      `${baseURL}/posts/${postid}/comments/${cid}`,
      { headers: { token: Cookies.get("userToken") } }
    );
    console.log(res.data);
    deleteHint.value.isReady = true;
    deleteHint.value.isVisible = true;
    emits("emit-delete-comment");
    setTimeout(() => {
      deleteHint.value.isVisible = false;
    }, 2000);
  } catch (err) {
    console.error(err);
    deleteHint.value.isVisible = true;
    setTimeout(() => {
      deleteHint.value.isVisible = false;
    }, 1000);
  } */

  console.log(cid);
  console.log(uid);
  if (uid == Cookies.get("userid")) {
    deleteComfirm.value = true;
    const deleteCfm = confirm("是否删除评论？");
    if (deleteCfm) {
      try {
        const res = await axios.delete(
          `${baseURL}/posts/${postid}/comments/${cid}`,
          { headers: { token: Cookies.get("userToken") } }
        );
        console.log(res.data);
        emits("emit-delete-comment");
        location.reload();
      } catch (err) {
        alert(err);
      }
    }
  }
}

function handleClick(uid) {
  console.log("here you want me");
  console.log(uid);
  console.log(Cookies.get("userid"));
  if (uid === Cookies.get("userid")) {
    controlOptions.value = true;
    console.log(controlOptions.value);
  }
}
</script>

<styles></styles>
