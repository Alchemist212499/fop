const postsReview = {
  message: "",
  data: {
    total: 0,
    rows: [
      {
        postid: "",
        postStatus: "",
        type: "adoption",
        userid: "",
        username: "Username",
        avatar:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        location: "United States",
        time: "12 mins ago",
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium consectetur, neque amet voluptas quibusdam!",
        likes: 45,
        views: 0,

        pics: [
          { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
          { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg" },
          {
            base64Encoded:
              "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          },
        ],
      },
      {
        postid: "",
        postStatus: "",
        type: "lost-n-found",
        userid: "",
        username: "Username",
        avatar:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        location: "United States",
        time: "12 mins ago",
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium consectetur, neque amet voluptas quibusdam!",
        likes: 45,
        views: 0,

        pics: [
          { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
          { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg" },
          {
            base64Encoded:
              "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          },
        ],
      },
      {
        postid: "",
        postStatus: "",
        type: "transaction",
        userid: "",
        username: "Username",
        avatar:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        location: "United States",
        time: "12 mins ago",
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium consectetur, neque amet voluptas quibusdam!",
        likes: 45,
        views: 0,

        pics: [
          { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
          { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg" },
          {
            base64Encoded:
              "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          },
        ],
      },
      {
        postid: "",
        postStatus: "",
        type: "q-n-a",
        userid: "",
        username: "Username",
        avatar:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        location: "United States",
        time: "12 mins ago",
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium consectetur, neque amet voluptas quibusdam!",
        likes: 45,
        views: 0,

        pics: [
          { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
          { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg" },
          {
            base64Encoded:
              "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          },
        ],
      },
      {
        postid: "",
        postStatus: "",
        type: "adoption",
        userid: "",
        username: "Username",
        avatar:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        location: "United States",
        time: "12 mins ago",
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium consectetur, neque amet voluptas quibusdam!",
        likes: 45,
        views: 0,

        pics: [
          { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
          { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg" },
          {
            base64Encoded:
              "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          },
        ],
      },
    ],
  },
};

const postsDetail = {
  message: "",
  data: {
    postStatus: "",
    type: "adoption", // 帖子类型
    username: "Username",
    avatar:
      "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
    location: "United States",
    time: "12 mins ago",
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium consectetur, neque amet voluptas quibusdam!",
    article:
      "   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta similique modi quas dolor. Error quod vitae ipsam, repellendus ea reprehenderit natus pariatur optio tenetur aut officia exercitationem praesentium quam. Dolorem!", // 正文
    likes: 0,
    views: 0,

    pics: [
      { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
      { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg" },
      { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" },
    ],

    // 附加信息
    options: {
      source: "stray dog", // 宠物来源
      breed: "golden retriever", // 宠物品种
      age: "3 yrs old", // 宠物年龄
      gender: "male", // 宠物性别
      deposit: 1000, // 押金数额
      contract: false, // 是否签订协议
    },
  },
};

const gallery = {};

export { postsReview, postsDetail };
