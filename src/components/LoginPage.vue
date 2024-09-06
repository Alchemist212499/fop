<template>
  <el-form
    ref="form"
    label-width="70px"
    :inline="true"
    class="login_container"
    :model="form"
  >
    <h3 class="login_title">宠物信息平台系统登录</h3>
    <el-form-item label="手机号" prop="tel">
      <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item class="row" label="密码" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="row">
      <el-button @click="submit" type="text">登录</el-button>
      <el-button @click="auth" type="text">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from "axios";
import baseURL from "@/CONST/env";
import config from "@/CONST/config";
import Cookies from "js-cookie";
const loginRes = {
  message: "",
  data: {
    msg: "login success", //是否成功登录
    data: "eyJhbGciOiJIUzI1NiJ9.eyJ0ZWxlcGhvbmUiOiIxMDAwMDAwMTAwMDAwIiwidXNlck5hbWUiOiJ0ZXN0VXNlcjEiLCJleHAiOjE3MjUzNjk0MDF9.2IfrZ0W8Cr2u_NbkbtLAXET_RfNWwg1q3rpCrXBf98I", //jwt令牌
    userid: "1",
    // data: null,
  },
};
export default {
  data() {
    return {
      form: {
        tel: "",
        password: "",
      },
    };
  },
  methods: {
    // 提交表单
    async submit() {
      const data = {
        tel: this.form.tel,
        password: this.form.password,
        role: 0,
      };

      const validation = this.checkInput(this.form.tel, this.form.password);
      console.log("here");

      if (validation === "success") {
        try {
          const res = await axios.post(`${baseURL}/login`, data);
          console.log("login res", res);
          // const res = loginRes;
          // no token was received
          if (res.data.msg === "success") {
            // set token and userid as cookie
            Cookies.set("userToken", res.data.data);
            const userRes = await axios.get(`${baseURL}/users/info`, {
              headers: { token: Cookies.get("userToken") },
            });

            console.log("i need userid", userRes.data);
            Cookies.set("userid", userRes.data.data.userid);
            // re-route
            this.$router.push("/posts");
            /*    setTimeout(async () => {
            
            }, 0); */
          } else {
            throw new Error(res.data.msg);
          }
        } catch (err) {
          console.error(err);
          alert(`登录失败：${err.message}`);
        }
      } else {
        alert(validation);
      }
    },
    //路由跳转AuthPage
    auth() {
      this.$router.push("/auth");
    },
    // 检查输入
    checkInput(tel, password) {
      const telRe = /[^0-9]/;
      const psdRe = /[^0-9a-zA-Z@#$]/;

      if (password.length < 6 || password.length > 20) {
        return "请输入6-20位密码";
      }
      if (tel.length !== 11) {
        return "请输入11位手机号";
      }
      if (tel.match(telRe)) {
        return "请输入手机号，包括11位数字";
      }
      if (password.match(psdRe)) {
        return "请输入合法字符，包括数字，大小写字母，@，#，$";
      }
      return "success";
    },
  },
};
</script>
<style lang="less" scoped>
.login_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
}
.row {
  margin-top: 10px;
}
.login_title {
  text-align: center;
  margin-bottom: 40px;
  color: #505458;
}
.el-form-item__error {
  color: #ccc;
  background-color: #ccc;
}
</style>
