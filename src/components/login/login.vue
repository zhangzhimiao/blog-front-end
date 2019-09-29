<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-wrap-title"></div>
      <div class="login-wrap-input-wrap"></div>
      <div class="login-wrap-remember"></div>
      <div class="login-wrap-submit"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.login {
  .wrap {
    .title {
      color: #fff;
    }
    .input-wrap {
      input {
        outline: none;
        border: none;
        border-bottom: 1px solid #000;
      }
    }
    .remember {
      color: #000;
    }
    .submit {
      button {
        border-radius: 50%;
        background: rgb(222, 103, 94);
        color: #fff;
      }
    }
  }
}
</style>
