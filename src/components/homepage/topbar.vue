<template>
  <div class="topbar-wrap">
    <div class="blog center">BLOG</div>
    <div class="motto center">If you to do, you can arrived!</div>
    <div class="user-menu center">
      <span class="login" @click="login" v-show="!isSignIn">{{
        loginText
      }}</span
      ><span class="login" @click="show" v-show="isSignIn">
        {{ username }} </span
      >&nbsp;|&nbsp;
      <span class="register" @click="register" v-show="!isSignIn">{{
        registerText
      }}</span>
      <span class="register" @click="signout" v-show="isSignIn">{{
        "注销"
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [{ name: "1" }, { name: "2" }],
      loginText: "登录",
      registerText: "注册"
    };
  },
  computed: {
    isSignIn() {
      return this.$store.state.isSignIn;
    },
    username() {
      return this.$store.state.userName;
    }
  },
  methods: {
    login() {
      this.$router.push("login");
    },
    show() {},
    register() {
      this.$router.push("login");
    },
    signout() {
      this.$store.commit("setIsSignIn", false);
    }
  }
};
</script>

<style lang="less" scoped>
.topbar-wrap {
  background-color: #fff;
  display: flex;
  height: 80px;
  border-bottom: 1px solid #000;
  .center {
    display: flex;
    align-items: center;
  }
  .blog {
    width: 15%;
    height: 100%;
    font-size: 30px;
    padding-left: 35px;
  }
  .motto {
    width: 75%;
    height: 100%;
    justify-content: center;
  }
  .user-menu {
    width: 10%;
    height: 100%;
  }
}
</style>
