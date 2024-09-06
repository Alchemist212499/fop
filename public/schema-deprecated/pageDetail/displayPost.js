// 领养
const data1 = {
  type: "adoption", // 帖子类型：领养
  username: "", // 用户名
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
    source: "", // 宠物来源
    breed: "", // 宠物品种
    age: "", // 宠物年龄
    gender: "", // 宠物性别
    deposit: 0, // 押金数额
    contract: false, // 是否签订协议
  },

  // 评论
  comments: [
    { avatar: "", username: "", time: "", content: "" },
    { avatar: "", username: "", time: "", content: "" },
    { avatar: "", username: "", time: "", content: "" },
  ],
};

// 走失
const data2 = {
  type: "lost-n-found", // 帖子类型：领养
  username: "", // 用户名
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
    address: "", // 走失地址
    reward: 0, // 报酬感谢
  },

  // 评论
  comments: [
    { avatar: "", username: "", time: "", content: "" },
    { avatar: "", username: "", time: "", content: "" },
    { avatar: "", username: "", time: "", content: "" },
  ],
};

// 交易
const data3 = {
  type: "transaction",
  username: "", // 用户名
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
    item: "", // 交易物品名称
    price_in: 0, // 购入价格
    price_out: 0, // 转让价格
  },

  // 评论
  comments: [
    { avatar: "", username: "", time: "", content: "" },
    { avatar: "", username: "", time: "", content: "" },
    { avatar: "", username: "", time: "", content: "" },
  ],
};

// 交流问答
const data4 = {
  type: "q-n-a",
  username: "", // 用户名
  location: "", // 定位
  time: "", // 发布时间
  title: "", // 标题
  article: "", // 正文
  likes: 0, // 点赞数
  views: 0, // 浏览数

  // 照片
  pics: [{ base64Encoded: "" }, { base64Encoded: "" }, { base64Encoded: "" }],

  // 该类型帖子无附加信息

  // 评论
  comments: [
    { avatar: "", username: "", time: "", content: "" },
    { avatar: "", username: "", time: "", content: "" },
    { avatar: "", username: "", time: "", content: "" },
  ],
};
