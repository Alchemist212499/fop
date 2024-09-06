const optionsMap = [
  {
    key: "source",
    value: {
      val: null,
      name: "宠物来源",
      type: "String",
    },
  },
  {
    key: "breed",
    value: {
      val: null,
      name: "宠物品种",
      type: "String",
    },
  },
  {
    key: "age",
    value: {
      val: null,
      name: "宠物年龄",
      type: "String",
    },
  },
  {
    key: "gender",
    value: {
      val: [
        {
          val: "male",
          icon: "mdi-gender-male",
        },
        {
          val: "female",
          icon: "mdi-gender-female",
        },
      ],
      name: "宠物性别",
      type: "Boolean",
    },
  },
  {
    key: "deposit",
    value: {
      val: [
        {
          val: "male",
          icon: "mdi-gender-male",
        },
        {
          val: "female",
          icon: "mdi-gender-female",
        },
      ],
      name: "押金数额",
      type: "Number",
    },
  },
  {
    key: "contract",
    value: {
      val: [
        {
          val: "yes",
          icon: "mdi-check",
        },
        {
          val: "no",
          icon: "mdi-close",
        },
      ],
      name: "签订协议",
      type: "Boolean",
    },
  },
];

const sourceObj = optionsMap.find((obj) => obj.key === "source");
sourceObj.value.val = "corrected";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ0ZWxlcGhvbmUiOiIxMDAwMDAwMTAwMDAwIiwidXNlck5hbWUiOiJ0ZXN0VXNlcjEiLCJleHAiOjE3MjUzNjk0MDF9.2IfrZ0W8Cr2u_NbkbtLAXET_RfNWwg1q3rpCrXBf98I";
const config = {
  headers: { token },
};
const axios = require("axios");
const baseURL = "http://10.249.114.216:8080";

async function main() {
  try {
    const res = await axios.put(
      `${baseURL}/users`,
      {
        avatar: {},
        bio: "new bio",
      },
      config
    );
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}

main();
