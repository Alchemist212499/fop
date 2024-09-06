// 某用户档案
const getUserRes = {
  message: "",
  data: {
    userid: "", // 用户id
    userStatus: "", // 用户状态
    role: "", // 用户角色
    tel: "", // 电话号码
    gender: "", // 性别
    realName: "", // 真实名称
    nickName: "", // 用户昵称
    password: "", // 密码
    avatar: "", // 头像
    address: "", // 地址
    bio: "", // 个人简介
    time: "", // 注册时间
  },
};

// 所有用户档案
const getAllUsersRes = {
  message: "",
  data: [
    {
      userid: "", // 用户id
      userStatus: "", // 用户状态
      role: "", // 用户角色
      tel: "", // 电话号码
      gender: "", // 性别
      realName: "", // 真实名称
      nickName: "", // 用户昵称
      password: "", // 密码
      avatar: "", // 头像
      address: "", // 地址
      bio: "", // 个人简介
      time: "", // 注册时间
    },
  ],
};
