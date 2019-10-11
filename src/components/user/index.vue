<template>
  <div class="content-wrap">
    <div class="nav-wrap">
      <Menu theme="light" active-name="我的文章" @on-select="navChange">
        <MenuGroup title="菜单">
          <MenuItem name="我的文章">
            <Icon type="md-document" />
            我的文章
          </MenuItem>
          <MenuItem name="关注列表">
            <Icon type="md-chatbubbles" />
            关注列表
          </MenuItem>
          <MenuItem name="点赞文章">
            <Icon type="md-chatbubbles" />
            点赞文章
          </MenuItem>
          <MenuItem name="个人中心">
            <Icon type="md-chatbubbles" />
            个人中心
          </MenuItem>
        </MenuGroup>
      </Menu>
    </div>
    <div class="list-wrap">
      <List
        border
        v-if="myArticles.length > 0 && this.navSelelct === '我的文章'"
      >
        <ListItem v-for="article in myArticles" :key="article.id">
          <div class="list-item-wrap">
            <h4 @click="showArticle(article.id)">{{ article.title }}</h4>
            <div class="viewer" @click="showArticle(article.id)">
              <viewer :viewCode="article.content" />
            </div>
            <div class="article-operate">
              <span class="base-operate-style" @click="toEdit(article.id)"
                >编辑</span
              ><span class="delete-article">删除</span>
            </div>
          </div>
        </ListItem>
      </List>

      <List border v-if="likeList.length > 0 && this.navSelelct === '点赞文章'">
        <ListItem v-for="article in likeList" :key="article.id">
          <div class="list-item-wrap">
            <h4 @click="showArticle(article.id)">{{ article.title }}</h4>
            <div class="viewer" @click="showArticle(article.id)">
              <viewer :viewCode="article.content" />
            </div>
            <div class="article-operate">
              <span class="base-operate-style">不再喜欢</span>
            </div>
          </div>
        </ListItem>
      </List>

      <List border v-if="careList.length > 0 && this.navSelelct === '关注列表'">
        <ListItem v-for="care in careList" :key="care.id">
          <div class="list-item-wrap">
            <h4 @click="showArticle(care.id)">{{ care.title }}</h4>
            <div class="viewer" @click="showArticle(care.id)">
              <viewer :viewCode="article.content" />
            </div>
            <div><span>不再喜欢</span></div>
          </div>
        </ListItem>
      </List>
    </div>
  </div>
</template>

<script>
import { service } from "../../utils/service";
import viewer from "../article/article-viewer";

export default {
  components: { viewer },
  data() {
    return {
      navSelelct: "我的文章",
      myArticles: [],
      careList: [],
      likeList: []
    };
  },
  methods: {
    toEdit(articleId) {
      this.$router.push({ name: "editArticle", params: { articleId } });
    },
    navChange(name) {
      var _this = this;
      _this.navSelelct = name;
      if (this.$store.state.isSignIn) {
        if (name === "我的文章") {
          _this.getMyArticles();
        }
        if (name === "点赞文章") {
          _this.getLiskeArticle();
        }
      }
    },
    getMyArticles() {
      var _this = this;
      service.getSelfArticlesByUserId(_this.$store.state.userId).then(d => {
        _this.myArticles = d;
      });
    },
    getLiskeArticle() {
      var _this = this;
      service.getLikesArticleByUserId(_this.$store.state.userId).then(d => {
        _this.likeList = d;
      });
    },
    editArticle(articleId) {
      this.$router.push({ name: "editArticle", params: { articleId } });
    }
  },
  mounted() {
    var _this = this;
    if (this.$store.state.isSignIn) {
      _this.getMyArticles();
    }
  },
  beforeCreate() {
    if (!this.$store.state.isSignIn) {
      alert("请登录后访问该页面");
      this.$router.push("home");
    }
  }
};
</script>

<style lang="less" scoped>
.content-wrap {
  width: 100%;
  max-width: 1400px;
  display: flex;
  padding: 50px 50px;
  justify-content: space-between;
  .nav-wrap {
    width: 20%;
  }
  .list-wrap {
    width: 75%;
    .viewer {
      height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-top: 1px solid #e8eaec;
    }
    .list-item-wrap {
      width: 100%;
    }
    .list-item-wrap:hover {
      cursor: pointer;
    }
    h5 {
      padding-top: 15px;
      color: rgb(83, 90, 108);
    }
  }
  .article-operate {
    padding-top: 10px;
    .base-operate-style,
    .delete-article {
      font-weight: bolder;
    }
    .delete-article {
      margin-left: 20px;
    }
    .base-operate-style:hover,
    .delete-article:hover {
      cursor: pointer;
      color: red;
    }
  }
}
</style>
