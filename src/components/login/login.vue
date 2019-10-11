<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-wrap-title">欢迎使用博客系统</div>
      <div class="login-wrap-input-wrap">
        <div>
          <input type="text" placeholder="请输入用户名: )" v-model="name" />
          <br />
          <input type="password" placeholder="请输入密码" v-model="password" />
          <br />
          <input
            v-show="!isLogin"
            type="password"
            placeholder="请确认密码"
            v-model="enablepassword"
          />
        </div>
      </div>
      <div class="login-wrap-operate">
        <div class="login-wrap-operate-submit">
          <input type="button" value="登录" @click="login" v-show="!isLogin" />
          <input
            type="button"
            value="登录"
            @click="enablelogin"
            v-show="isLogin"
          />
        </div>
        <div
          class="login-wrap-operate-register"
          @click="register"
          v-show="isLogin"
        >
          <input type="button" value="注册" />
        </div>
        <div
          class="login-wrap-operate-register"
          @click="enableregister"
          v-show="!isLogin"
        >
          <input type="button" value="注册" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { service } from "../../utils/service";

export default {
  data() {
    return {
      name: "",
      password: "",
      enablepassword: "",
      isLogin: true
    };
  },
  methods: {
    login() {
      this.isLogin = true;
    },
    enablelogin() {
      service.login(this.name, this.password).then(d => {
        if (d.data.code === 0 && d.data.data.id) {
          this.$store.commit("setUserId", d.data.data.id);
          this.$store.commit("setUserName", d.data.data.name);
          this.$store.commit("setIsSignIn", true);
          this.$router.push("/");
        } else {
          alert("登录失败，请重新登录");
        }
      });
    },
    register() {
      this.isLogin = false;
    },
    enableregister() {
      var _this = this;
      if (this.name.length < 2) {
        alert("用户名必须超过两位");
        return;
      }
      if (this.password !== this.enablepassword) {
        alert("两次密码输入不一致");
        return;
      }
      if (this.password.length < 6) {
        alert("密码长度必须超过六位");
        return;
      }
      service.register(this.name, this.password).then(d => {
        if (d.data.code === 0 && d.data.data) {
          _this.isLogin = true;
          alert("注册成功");
        } else {
          alert("注册失败，请重新注册");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background: linear-gradient(white, black, white);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 380px;
  min-height: 450px;
  &-wrap {
    width: 380px;
    height: 450px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 6px;
    &-title {
      font-size: 30px;
      color: #fff;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #000;
    }
    &-input-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      div {
        width: 80%;
      }
      input {
        outline: none;
        border: none;
        border-bottom: 1px solid #000;
        width: 100%;
        height: 40px;
        margin-top: 20px;
        font-size: 25px;
        background: border-box;
      }
    }
    &-operate {
      height: 150px;
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        input {
          width: 100%;
          height: 40px;
          margin-top: 15px;
          border-radius: 10px;
          outline: none;
          font-size: 20px;
        }
      }
      &-register {
        input {
          color: rgb(56, 56, 56);
        }
      }
      &-submit {
        input {
          color: red;
        }
      }
    }
  }
}
</style>
