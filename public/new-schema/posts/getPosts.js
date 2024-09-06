const getAllPostsRes = {
  message: "",
  data: {
    total: 0,
    // 数组
    list: [
      {
        postid: "", // 帖子id
        postStatus: "", // 帖子状态
        type: "", // 帖子类型

        user: {
          username: "", // 用户名
          avatar: "", // 头像
        },

        location: "", // 定位
        time: "", // 发布时间
        title: "", // 标题
        article: "", // 正文
        likes: 0, // 点赞数
        views: 0, // 浏览数

        // 照片
        pics: [
          { base64Encoded: "" },
          { base64Encoded: "" },
          { base64Encoded: "" },
        ],

        // 附加信息
        options: {
          // 视具体帖子类型而决定
        },
      },
    ],
  },
};

const getCategorizedPostsRes = {
  message: "",
  // 数组
  data: {
    total: 0,
    list: [
      {
        postid: "", // 帖子id
        postStatus: "", // 帖子状态
        type: "", // 与路径名相同（帖子类型）

        user: {
          username: "", // 用户名
          avatar: "", // 头像
        },

        location: "", // 定位
        time: "", // 发布时间
        title: "", // 标题
        article: "", // 正文
        likes: 0, // 点赞数
        views: 0, // 浏览数

        // 照片
        pics: [
          { base64Encoded: "" },
          { base64Encoded: "" },
          { base64Encoded: "" },
        ],

        // 附加信息
        options: {
          // 视具体帖子类型而决定
        },
      },
    ],
  },
};

const getGalleryPostsRes = {
  message: "",
  data: {
    total: 0,
    list: [
      {
        postid: "", // 帖子id
        type: "image", // 画廊帖
        title: "", // 标题
        user: {
          username: "", // 用户名
          avatar: "", // 头像
        },
        time: "", // 发布时间

        // 该类型帖子无附加信息

        pic: { base64Encoded: "" }, // 照片
      },
    ],
  },
};

// 页面详情
const getPostRes = {
  message: "",
  data: {
    postid: "", // 帖子id
    postStatus: "", // 帖子状态
    type: "", // 帖子类型

    user: {
      username: "", // 用户名
      avatar: "", // 头像
    },

    location: "", // 定位
    time: "", // 发布时间
    title: "", // 标题
    article: "", // 正文
    likes: 0, // 点赞数
    views: 0, // 浏览数

    // 照片
    pics: [{ base64Encoded: "" }, { base64Encoded: "" }, { base64Encoded: "" }],

    // 附加信息
    options: {
      // 视具体帖子类型而决定
    },
  },
};
