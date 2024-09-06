<template>
  <el-card class="d-flex justify-center align-center" style="height: 100vh">
    <div class="d-flex justify-start">
      <a href="" class="text-caption" @click="this.$router.push('/login')"
        >&lt;返回登录</a
      >
    </div>

    <el-form
      ref="form"
      label-width="70px"
      :inline="true"
      class="login_container"
      :model="form"
    >
      <h3 class="login_title">注册</h3>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item class="row" label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item class="row" label="真实姓名" prop="realName">
        <el-input v-model="form.realName" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item class="row" label="昵称" prop="nickName">
        <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
      </el-form-item>

      <el-form-item class="row" label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址"></el-input>
      </el-form-item>

      <el-form-item class="row" label="性别" prop="gender">
        <el-radio class="genderMan" v-model="form.gender" label="man"
          >男</el-radio
        >

        <el-radio class="genderMale" v-model="form.gender" label="male"
          >女</el-radio
        >
      </el-form-item>

      <el-form-item class="row" label="上传头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="fileChange"
        >
          <img v-if="form.avatar !== ''" class="img" :src="form.avatar" />
          <v-icon v-else>mdi-plus</v-icon>
        </el-upload>
      </el-form-item>

      <!-- 上传相片 -->

      <el-form-item class="row" label="个人简介" prop="bio">
        <el-input
          type="textarea"
          v-model="form.bio"
          placeholder="请输入个人简介"
        ></el-input>
      </el-form-item>

      <el-form-item class="row">
        <el-button @click="submit" type="text">确定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import Cookie from "js-cookie";
import axios from "axios";
import baseURL from "@/CONST/env";
import router from "@/routes";

export default {
  data() {
    return {
      form: {
        tel: "", // 电话号码
        realName: "", // 真实名称
        nickName: "", // 用户昵称
        password: "", // 密码
        avatar: "", // 头像
        address: "", // 地址
        gender: "", // 性别
        bio: "", // 个人简介
      },
    };
  },
  methods: {
    async submit() {
      const data = {
        tel: this.form.tel, // 电话号码
        realName: this.form.realName, // 真实名称
        nickName: this.form.nickName, // 用户昵称
        password: this.form.password, // 密码
        avatar: this.form.avatar, // 头像
        address: this.form.address, // 地址
        gender: this.form.gender, // 性别
        bio: this.form.bio, // 个人简介
      };

      const validation = this.checkInput(
        this.form.tel,
        this.form.realName,
        this.form.nickName,
        this.form.password,
        this.form.avatar,
        this.form.address,
        this.form.gender,
        this.form.bio
      );

      if (validation === "success") {
        try {
          const res = await axios.post(`${baseURL}/auth`, data);
          console.log(res);
          // const res = { data: { data: null, message: "" } };
          // custom error
          if (res.data.msg === "success") {
            alert(`注册成功`);
            // throw new Error("custom error");
            this.$router.push("/login");
          } else {
            alert(`注册失败：${res.data.msg}`);
          }
        } catch (err) {
          console.error(err);
          alert("注册失败：", err);
        }
      } else {
        alert(validation);
      }
    },

    fileChange(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target.result;
        this.form.avatar = res;
      };
      reader.readAsDataURL(file.raw);
    },

    checkInput(
      tel,
      realName,
      nickName,
      password,
      avatar,
      address,
      gender,
      bio
    ) {
      const telRe = /[^0-9]/;
      const realRe = /[^\u4e00-\u9fa5]/;
      const nickRe = /[^\u4e00-\u9fa5,0-9,a-z,A-Z,@#$]/;
      const psdRe = /[^0-9a-zA-Z@#$]/;

      if (tel.length !== 11) {
        return "请输入11位手机号";
      }
      if (tel.match(telRe)) {
        return "请输入手机号，包括11位数字";
      }
      if (password.length < 6 || password.length > 20) {
        return "请输入6到20位密码";
      }
      if (password.match(psdRe)) {
        return "密码请输入合法字符，包括数字，大小写字母，@，#，$";
      }
      if (realName.length < 2 || realName.length > 20) {
        return "请输入真实姓名";
      }
      if (realName.match(realRe)) {
        return "真实姓名只允许输入汉字";
      }
      if (!nickName) {
        return "请输入昵称";
      }
      if (nickName.length > 20) {
        return "昵称不要超过20个字符";
      }
      if (nickName.match(nickRe)) {
        return "昵称只允许输入汉字，大小写字母与@,#,$";
      }
      if (!address) {
        return "请输入地址";
      }
      if (address.length > 200) {
        return "地址不要超过200个字符";
      }
      if (!gender) {
        return "请选择性别";
      }
      if (!avatar) {
        return "请上传头像";
      }
      if (!bio) {
        return "请输入个人简介";
      }
      if (bio.length > 1000) {
        return "个人简介不要超过1000字";
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
  padding-top: 2rem;
  width: 350px;
  border: 1px solid #eaeaea;

  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
}
.row {
  margin-top: 10px;
  display: flex;
  justify-content: center;
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
.genderMan {
  margin-right: 10px;
}
.genderMale {
  margin-left: 20px;
  margin-right: 20px;
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  width: 80px;
  height: 80px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.img {
  width: 80px;
  height: 80px;
}
</style>
