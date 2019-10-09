<template>
  <div class="homepage">
    <tobbar @setLoginState="setLoginState" />
    <div class="article-content-wrap">
      <article-content :id="userId" />
    </div>
  </div>
</template>
<script>
import TobBar from "./topbar";
import ArtileContent from "./article-content";
export default {
  components: {
    tobbar: TobBar,
    articleContent: ArtileContent
  },
  data() {
    return {
      userId: ""
    };
  },
  methods: {
    setLoginState() {
      alert();
    }
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
