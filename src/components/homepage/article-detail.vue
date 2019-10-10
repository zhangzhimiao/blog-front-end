<template>
  <div class="content-wrap">
    <div v-if="article">
      <div class="title">{{ article.title }}</div>
      <div class="viewer"><viewer :viewCode="article.content" /></div>
      <div class="likeOrCollect">
        <div class="like" @click="operateLike">{{ isLike }}</div>
        &emsp;&emsp;
        <div class="collect" @click="operateCollect">{{ isCollect }}</div>
      </div>
    </div>
    <div v-else class="error">
      文章获取失败，请重试!
    </div>
  </div>
</template>

<script>
import { service } from "../../utils/service";
import Viewer from "../article-publish-edit-viewer/article-viewer";

export default {
  components: {
    viewer: Viewer
  },
  data() {
    return {
      articleId: this.$route.params.articleId,
      article: null,
      like: false,
      collect: false
    };
  },
  computed: {
    isLike() {
      return this.like ? "取消点赞" : "点赞";
    },
    isCollect() {
      return this.collect ? "取消收藏" : "收藏";
    }
  },
  created() {
    var _this = this;
    service.getDetailArticle(_this.articleId).then(d => {
      _this.article = d.data.data.d;
    });
  },
  methods: {
    operateLike() {
      if (!this.$store.state.isSignIn) {
        alert("请先登录");
        return;
      }
      var _this = this;
      if (_this.like) {
        service
          .cancelLike(_this.$store.state.userId, _this.articleId)
          .then(d => {
            if (d) {
              _this.like = false;
            } else {
              alert("取消点赞失败");
            }
          });
      } else {
        service.addLike(_this.$store.state.userId, _this.articleId).then(d => {
          if (d) {
            _this.like = true;
          } else {
            alert("点赞失败");
          }
        });
      }
    },
    operateCollect() {
      if (!this.$store.state.isSignIn) {
        alert("请先登录");
        return;
      }
      var _this = this;
      if (_this.collect) {
        service
          .cancelCollect(_this.$store.state.userId, _this.articleId)
          .then(d => {
            if (d) {
              _this.collect = false;
            } else {
              alert("取消收藏失败");
            }
          });
      } else {
        service
          .addCollect(_this.$store.state.userId, _this.articleId)
          .then(d => {
            if (d) {
              _this.collect = true;
            } else {
              alert("收藏失败");
            }
          });
      }
    }
  },
  mounted() {
    var _this = this;
    if (this.$store.state.isSignIn) {
      service
        .judgeIfLike(_this.$store.state.userId, _this.articleId)
        .then(d => {
          if (d) {
            _this.like = true;
          } else {
            _this.like = false;
          }
        });
      service
        .judgeIfCollected(_this.$store.state.userId, _this.articleId)
        .then(d => {
          if (d) {
            _this.collect = true;
          } else {
            _this.collect = false;
          }
        });
      return;
    }
  }
};
</script>

<style lang="less" scoped>
.content-wrap {
  width: 100%;
  padding: 50px;
  .title {
    display: flex;
    justify-content: center;
    font-size: 20px;
    color: #000;
  }
  .viewer {
    width: 70%;
    display: flex;
    margin: 0 auto;
  }
  .error {
    display: flex;
    justify-content: center;
  }
  .likeOrCollect {
    width: 70%;
    display: flex;
    margin: 0 auto;
    justify-content: center;
  }
  .like:hover {
    color: red;
    cursor: pointer;
  }
  .collect:hover {
    color: red;
    cursor: pointer;
  }
}
</style>
