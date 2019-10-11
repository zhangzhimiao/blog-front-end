<template>
  <div class="content-wrap">
    <div v-if="article">
      <div class="author">
        {{ article.person.name }}
        <Button class="care-button" @click="operateCare">{{ isCare }}</Button>
      </div>
      <div class="title">
        {{ article.title }}
      </div>
      <div class="viewer"><viewer :viewCode="article.content" /></div>
      <div class="likeOrCollect">
        <div class="like" @click="operateLike">
          <Button>{{ isLike }}</Button>
        </div>
        &emsp;&emsp;
        <div class="collect" @click="operateCollect">
          <Button>{{ isCollect }}</Button>
        </div>
      </div>
      <div class="comment">
        <div class="publish-comment">
          <Input
            v-model="comment"
            placeholder="评论内容"
            style="width: 300px"
          />
          <Button class="care-button" @click="addComment">添加评论</Button>
        </div>
        <div class="comment-list">
          <List border v-if="comments.length > 0">
            <ListItem v-for="comment in comments" :key="comment.id">
              <div class="comment-list-item-wrap">
                <div class="item-content">
                  <h3>
                    {{ comment.personName }}
                  </h3>
                  <p>{{ comment.content }}</p>
                  <p class="comment-time">
                    发布时间:&nbsp;{{ commentTime(comment.commentTime) }}
                  </p>
                </div>
                <span
                  v-if="isAminOrAuthor"
                  class="comment-delete"
                  @click="deleteComment(comment.id)"
                  >删除</span
                >
              </div>
            </ListItem>
          </List>
        </div>
      </div>
    </div>
    <div v-else class="error">
      文章获取失败，请重试!
    </div>
  </div>
</template>

<script>
import { service } from "../../utils/service";
import Viewer from "./article-viewer";
import { formatTime } from "../../utils/time";

export default {
  components: {
    viewer: Viewer
  },
  data() {
    return {
      articleId: this.$route.params.articleId,
      article: null,
      like: false,
      collect: false,
      care: false,
      comment: "",
      comments: []
    };
  },
  computed: {
    isLike() {
      return this.like ? "取消点赞" : "点赞";
    },
    isCollect() {
      return this.collect ? "取消收藏" : "收藏";
    },
    isCare() {
      return this.care ? "取消关注" : "关注";
    },
    isAminOrAuthor() {
      return (
        this.$store.state.isAdmin === 0 ||
        this.article.person.id === this.$store.state.userId
      );
    }
  },
  created() {
    var _this = this;
    service.getDetailArticle(_this.articleId).then(d => {
      _this.article = d.data.data.d;
      _this.getComments();
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
        service
          .judgeIfCare(_this.$store.state.userId, _this.article.person.id)
          .then(d => {
            if (d) {
              _this.care = true;
            } else {
              _this.care = false;
            }
          });
      }
    });
  },
  methods: {
    commentTime(time) {
      return formatTime(time);
    },
    getComments() {
      var _this = this;
      service.getComments(_this.articleId).then(d => {
        const commentsData = d.data.data;
        const commentList = [];
        for (let x in commentsData) {
          commentList.push(commentsData[x]);
        }
        _this.comments = commentList;
      });
    },
    addComment() {
      if (!this.$store.state.isSignIn) {
        alert("请先登录");
        return;
      }
      var _this = this;
      service
        .addComment(
          _this.articleId,
          _this.$store.state.userId,
          _this.comment,
          _this.$store.state.userName
        )
        .then(d => {
          if (d) {
            alert("评论成功");
            _this.getComments();
            _this.comment = "";
          } else {
            alert("评论失败");
          }
        });
    },
    deleteComment(commentId) {
      var _this = this;
      service.deleteComment(commentId).then(d => {
        _this.getComments();
        if (d) {
          alert("删除成功");
          _this.getComments();
        } else {
          alert("删除失败");
        }
      });
    },
    operateCare() {
      if (!this.$store.state.isSignIn) {
        alert("请先登录");
        return;
      }
      var _this = this;
      if (_this.care) {
        service
          .cancelCare(_this.$store.state.userId, _this.article.person.id)
          .then(d => {
            if (d) {
              _this.care = false;
            } else {
              alert("取消关注失败");
            }
          });
      } else {
        service
          .addCare(_this.$store.state.userId, _this.article.person.id)
          .then(d => {
            if (d) {
              _this.care = true;
            } else {
              alert("关注失败");
            }
          });
      }
    },
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
  }
};
</script>

<style lang="less" scoped>
.content-wrap {
  width: 100%;
  padding: 50px;
  .author {
    display: flex;
    font-size: 20px;
    font-weight: bolder;
    width: 70%;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-bottom: 1px solid rgb(204, 204, 204);
    justify-content: space-between;
    padding-bottom: 20px;
    .care-button {
      justify-self: flex-end;
    }
  }
  .title {
    display: flex;
    justify-content: center;
    font-size: 20px;
    color: #000;
    padding-top: 20px;
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
    padding: 20px 0;
  }
  .like:hover {
    color: red;
    cursor: pointer;
  }
  .collect:hover {
    color: red;
    cursor: pointer;
  }
  .comment {
    border-top: 1px solid rgb(204, 204, 204);
    padding-top: 20px;
    width: 70%;
    margin: 0 auto;
    .publish-comment {
      padding-bottom: 20px;
    }
    button {
      margin-left: 20px;
    }
    .comment-delete {
      font-size: 10px;
    }
    .comment-delete:hover {
      color: red;
      cursor: pointer;
    }
    .item-content {
      padding: 10px 0;
    }
    .comment-time {
      font-size: 10px;
    }
    h3 {
      padding-bottom: 5px;
    }
  }
}
</style>
