<template>
  <div class="px-5 my-1" v-if="type !== 'q-n-a'">
    <v-chip
      class="mx-1 my-1"
      :color="icon.color"
      size="small"
      variant="outlined"
      v-for="(icon, index) of icons[type]"
      :key="index"
    >
      <span
        ><v-icon :icon="icon.icon" start></v-icon>
        {{ `${icon.name}：${options[icon.key]}` }}</span
      >
    </v-chip>
  </div>
  <div class="px-5" v-else-if="type === 'lost-n-found'"></div>
  <div class="px-5" v-else-if="type === 'transaction'"></div>
  <div class="px-5" v-else></div>
</template>

<script setup>
const { type, options } = defineProps(["type", "options"]);

const icons = {
  adoption: [
    {
      name: "来源",
      key: "source",
      icon: "mdi-source-branch",
      color: "red-darken-4",
    },
    { name: "年龄", key: "age", icon: "mdi-numeric", color: "cyan-darken-4" },
    {
      name: "性别",
      key: "gender",
      icon: "mdi-gender-male-female",
      color: "deep-purple",
    },

    {
      name: "领养押金",
      key: "deposit",
      icon: "mdi-currency-usd",
      color: "green-darken-4",
    },
    {
      name: "签订协议",
      key: "contract",
      icon: "mdi-file-document-edit-outline",
      color: "black",
    },
    { name: "品种", key: "breed", icon: "mdi-dog-side", color: "brown" },
  ],
  "lost-n-found": [
    {
      name: "走失地址",
      key: "address",
      icon: "mdi-map-marker",
      color: "red-accent-4",
    },
    {
      name: "报酬感谢",
      key: "reward",
      icon: "mdi-account-cash",
      color: "light-green-darken-4",
    },
  ],
  transaction: [
    {
      name: "交易物品名称",
      key: "item",
      icon: "mdi-invoice-list-outline",
      color: "blue-darken-4",
    },
    {
      name: "购入价格",
      key: "price_in",
      icon: "mdi-bank-transfer-in",
      color: "red-darken-4",
    },
    {
      name: "转让价格",
      key: "price_out",
      icon: "mdi-bank-transfer-out",
      color: "green-accent-4",
    },
  ],
  "q-n-a": [],
};
console.log("this is the post type", icons[`${type}`]);
</script>

<style></style>
