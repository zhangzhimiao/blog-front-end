<template>
  <div class="topbar-wrap">
    <div class="blog center" @click="goIndexPage">
      BLOG
    </div>
    <div class="motto center">If you to do, you can arrived!</div>
    <div class="user-menu center">
      <span class="login" @click="login" v-show="!isSignIn">{{
        loginText
      }}</span>
      <Dropdown class="login" @on-click="dropMenu" v-show="isSignIn">
        <a href="javascript:void(0)">
          {{ username }}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="homepage">个人主页</DropdownItem>
          <DropdownItem name="publishArticle">发布文章</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      &nbsp;|&nbsp;
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
    goIndexPage() {
      this.$router.push("/index/home");
    },
    login() {
      this.$router.push("/login");
    },
    dropMenu(name) {
      this.$router.push(`/index/${name}`);
    },
    register() {
      this.$router.push("/login");
    },
    signout() {
      location.reload();
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
  .blog:hover {
    cursor: pointer;
  }
  .motto {
    width: 70%;
    height: 100%;
    justify-content: center;
  }
  .user-menu {
    width: 15%;
    height: 100%;
    justify-content: flex-end;
    padding-right: 30px;
    span {
      cursor: pointer;
    }
    span:hover {
      color: red;
    }
  }
}
</style>
