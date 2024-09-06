<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation v-model="value" color="primary" active grow>
      <div>
        <v-btn class="pa-1">
          <v-icon size="x-large">mdi-heart-outline</v-icon>
        </v-btn>
        <span class="subheading">13</span>
      </div>
      <v-btn class="px-10">
        <v-icon size="x-large">mdi-comment-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup>
const { likes, commentCnt } = defineProps(["likes", "commentCnt"]);
</script>

<style></style>
