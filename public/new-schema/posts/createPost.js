const commonPost = {
  type: "", // 帖子类型（与路径名相同）
  title: "", // 标题
  article: "", // 正文
  userid: "", // 用户ID
  location: "", // 用户定位
  time: "", // 发布时间
  likes: 0, // 点赞数
  views: 0, // 浏览数

  // 附加信息
  options: {
    // 视具体帖子类型而决定
  },

  // 照片
  pics: [{ base64Encoded: "" }, { base64Encoded: "" }, { base64Encoded: "" }],
};

const galleryPost = {
  type: "image", // 画廊帖
  title: "", // 标题
  userid: "", // 用户ID
  time: "", // 发布时间

  // 该类型帖子无附加信息

  pic: { base64Encoded: "" }, // 照片
};
