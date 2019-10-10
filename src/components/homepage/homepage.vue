<template>
  <div class="homepage">
    <tobbar />
    <div class="article-content-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import TobBar from "./topbar";
export default {
  components: {
    tobbar: TobBar
  },
  beforeCreate() {
    this.$store.dispatch("getAllColumns");
  }
};
</script>
<style lang="less" scoped>
.homepage {
  height: 100%;
  .article-content-wrap {
    display: flex;
    justify-content: center;
  }
}
</style>
