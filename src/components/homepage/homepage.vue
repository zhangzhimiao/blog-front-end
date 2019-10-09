<template>
  <div class="homepage">
    <tobbar />
    <div class="article-content-wrap">
      <article-content />
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
