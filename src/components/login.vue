<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="true">
        <div class="manage_tip">
          <p>学历证明系统</p>
        </div>
        <el-form ref="loginForm">
          <el-form-item class="item" prop="username">
            <el-input v-model="username" placeholder="用户名">
              <span>dsfsf</span>
            </el-input>
          </el-form-item>
          <el-form-item class="item" prop="password">
            <el-input type="password" placeholder="密码" v-model="password"></el-input>
          </el-form-item>
          <el-form-item class="item">
            <el-button
              type="primary"
              @click="submitForm()"
              class="submit_btn"
              :loading="openLoading"
            >登陆</el-button>
          </el-form-item>
        </el-form>
        <p class="tip">温馨提示：</p>
        <p class="tip">未登录过的新用户，自动注册</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
      </section>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
// import

export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
      openLoading: false // 登录loading状态
    };
  },
  methods: {
    submitForm() {
      this.checkForm() && this.axiosLogin();
    },
    checkForm() {
      if (this.username == "") {
        this.$message("用户名不能为空");
        return false;
      } else if (this.password == "") {
        this.$message("密码不能为空");
        return false;
      }
      return true;
    },
    axiosLogin() {
      this.openLoading = true;

      axios({
        url: url.login,
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$message({
              message: response.data.message,
              type: "success"
            });
            this.$router.push("/");
            this.openLoading = false;
            localStorage.setItem("user_name", this.username);
          } else {
            this.openLoading = false;
            this.$message({
              message: "登录失败",
              type: "fail"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style  lang="less" scoped>
@import "../style/mixin";
.login_page {
  background-color: #324057;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 210px);
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>