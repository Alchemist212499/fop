const loginReq = {
  tel: "10000001",
  password: "password",
  role: 0,
};

const loginRes = {
  message: "",
  data: {
    msg: "login success", //是否成功登录
    data: "eyJhbGciOiJIUzI1NiJ9.eyJ0ZWxlcGhvbmUiOiIxMDAwMDAwMTAwMDAwIiwidXNlck5hbWUiOiJ0ZXN0VXNlcjEiLCJleHAiOjE3MjUzNjk0MDF9.2IfrZ0W8Cr2u_NbkbtLAXET_RfNWwg1q3rpCrXBf98I", //jwt令牌
  },
};

export default { loginReq, loginRes };
