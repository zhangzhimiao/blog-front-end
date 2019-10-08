<template>
  <div class="topbar-wrap">
    <div class="topbar-logo">
      BLOG
      <div class="topbar-user-info">
        <span>{{login}}</span>
      </div>
    </div>
    <Menu mode="horizontal" theme="dark" :active-name="0">
      <MenuItem v-for="(item, index) in nav" :name="index" :key="index">{{ item.name }}</MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [{ name: '1' }, { name: '2' }]
    }
  },
  computed: {
    login() {
      return sessionStorage.getItem('user') !== null
        ? sessionStorage.getItem('user').name
        : '登录|注册'
    }
  }
}
</script>

<style lang="less">
.topbar {
  &-logo {
    padding: 30px;
    font-size: 30px;
    color: #fff;
    background-color: rgb(81, 90, 110);
    border-bottom: 1px solid #fff;
  }
  &-user-info {
    float: right;
    font-size: 20px;
    padding-top: 7px;
    padding-right: 15px;
  }
}
</style>
