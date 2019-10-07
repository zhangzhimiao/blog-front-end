<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-wrap-title">欢迎使用博客系统</div>
      <div class="login-wrap-input-wrap">
        <div>
          <input type="text" placeholder="请输入用户名：)" v-model="name" />
          <br />
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
      </div>
      <div class="login-wrap-operate">
        <div class="login-wrap-operate-submit">
          <input type="button" value="登录" @click="login" />
        </div>
        <div class="login-wrap-operate-register" @click="register">
          <input type="button" value="注册" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { service } from '../../utils/service'
export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login() {},
    register() {
      service.register(this.name, this.password).then(d => {
        // eslint-disable-next-line no-console
        console.log(d)
      })
    }
  }
}
</script>

<style lang="less">
.login {
  background: linear-gradient(white, black, white);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-wrap {
    width: 380px;
    height: 400px;
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
      height: 150px;
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
