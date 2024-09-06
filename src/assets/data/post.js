const postRes = {
  message: "",
  data: {
    postStatus: "",
    type: "adoption",
    userid: "1",
    username: "Username",
    avatar:
      "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
    location: "United States",
    time: "12 mins ago",
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium consectetur, neque amet voluptas quibusdam!",
    article:
      "   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta similique modi quas dolor. Error quod vitae ipsam, repellendus ea reprehenderit natus pariatur optio tenetur aut officia exercitationem praesentium quam. Dolorem!",
    likes: 0,
    views: 0,

    pics: [
      { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
      { base64Encoded: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg" },
      {
        base64Encoded: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      },
      { base64Encoded: "https://picsum.photos/200/300" },
    ],

    // 领养帖
    options: {
      source: "流浪狗",
      breed: "拉布拉多",
      age: "3个月",
      gender: "公",
      deposit: 1000,
      contract: false,
    },

    /*  // 走失帖
    options: {
      address: "",
      reward: 0,
    },

    // 交易帖
    options: {
      item: "",
      price_in: 0,
      price_out: 0,
    },

    // 交流问答帖
    options: null, */
  },
};
