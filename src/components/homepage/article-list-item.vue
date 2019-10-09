<template>
  <div class="item-wrap">
    <div class="item-title">{{ title }}</div>
    <div class="item-content">{{ content }}</div>
    <div class="item-author">{{ author }}</div>
  </div>
</template>

<script>
export default {
  props: ["title", "content", "author"],
  computed: {}
};
</script>

<style lang="less" scoped>
</style>
