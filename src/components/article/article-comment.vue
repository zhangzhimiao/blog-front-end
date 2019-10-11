<template>
  <div class="content-wrap">
    <div v-if="comment.id">
      <div>
        {{ comment.content }}
      </div>
      <span>回复</span>
      <div>
        <Input v-model="content" placeholder="文章标题" style="width: 300px" />
        <Button class="care-button" @click="addComment">添加评论</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {}
  },
  data() {
    return {
      content: "",
      replay: false
    };
  }
};
</script>

<style lang="less" scoped>
.content-wrap {
  width: 100%;
}
</style>
