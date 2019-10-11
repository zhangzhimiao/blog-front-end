<template>
  <div class="comment-wrap">
    <div v-if="comment.id">
      <div>
        {{ comment.content }}
      </div>
      <!-- <span @click="changReplyState">回复</span>
      <div v-if="replay">
        <Input v-model="content" placeholder="文章标题" style="width: 300px" />
        <Button class="care-button" @click="addComment">回复评论</Button>
      </div> -->
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
  },
  methods: {
    changReplyState() {
      this.replay = !this.replay;
    },
    addComment() {}
  }
};
</script>

<style lang="less" scoped>
.comment-wrap {
  width: 100%;
  border-bottom: 1px solid rgb(204, 204, 204);
  padding-bottom: 20px;
  margin-bottom: 20px;
  button {
    margin-left: 20px;
  }
}
</style>
