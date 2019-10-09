<template>
  <div class="homepage">
    <tobbar />
  </div>
</template>
<script>
import TobBar from "./topbar";
export default {
  components: {
    tobbar: TobBar
  }
};
</script>
<style lang="less" scoped>
.homepage {
  height: 100%;
}
</style>
