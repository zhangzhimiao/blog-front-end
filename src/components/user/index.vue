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
              <span class="base-operate-style" @click="disLike(article.id)"
                >不再喜欢</span
              >
            </div>
          </div>
        </ListItem>
      </List>

      <List border v-if="careList.length > 0 && this.navSelelct === '关注列表'">
        <ListItem v-for="care in careList" :key="care.id">
          <div class="list-item-wrap">
            <h4>
              {{ care.name }}
              <span class="cancle-care" @click="disCare(care.id)"
                >取消关注</span
              >
            </h4>
          </div>
        </ListItem>
      </List>

      <div class="user-info-center" v-if="this.navSelelct === '个人中心'">
        <div class="column-manage">管理关注栏目</div>
        <CheckboxGroup v-model="personColumn" @on-change.self="columnsChange">
          <Checkbox
            v-for="column in allColumns"
            :key="column.id"
            :label="column.id"
          >
            {{ column.name }}
          </Checkbox>
        </CheckboxGroup>
        <Button class="edit-column-button" @click="editColumn">修改栏目</Button>
      </div>
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
      likeList: [],
      personColumn: []
    };
  },
  computed: {
    allColumns() {
      return this.$store.state.allColumns;
    }
  },
  methods: {
    getPersonColumn() {
      var _this = this;
      service.getColumnsByUserId(_this.$store.state.userId).then(d => {
        if (d[0].columns) {
          const columns = [];
          for (let x in d[0].columns) {
            columns.push(d[0].columns[x].id);
          }
          _this.personColumn = columns;
        }
      });
    },
    editColumn() {
      var _this = this;
      service
        .editUserColumns(_this.personColumn, _this.$store.state.userId)
        .then(d => {
          if (d.data.data.id) {
            alert("编辑成功");
            this.getPersonColumn();
          } else {
            alert("编辑失败，请重试！");
          }
        });
    },
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
        if (name === "关注列表") {
          _this.getCareList();
        }
        if (name === "个人中心") {
          _this.getPersonColumn();
        }
      }
    },
    columnsChange() {},
    getMyArticles() {
      var _this = this;
      service.getSelfArticlesByUserId(_this.$store.state.userId).then(d => {
        if (d.length === 0) {
          alert("您暂未发布过文章，请发布后再访问该栏");
        }
        _this.myArticles = d;
      });
    },
    getLiskeArticle() {
      var _this = this;
      service.getLikesArticleByUserId(_this.$store.state.userId).then(d => {
        if (d) {
          _this.likeList = d;
        } else {
          _this.likeList = [];
          alert("暂无点赞的文章");
        }
      });
    },
    editArticle(articleId) {
      this.$router.push({ name: "editArticle", params: { articleId } });
    },
    disLike(articleId) {
      service.cancelLike(this.$store.state.userId, articleId).then(d => {
        if (d) {
          alert("取消点赞成功");
          this.getLiskeArticle();
        } else {
          alert("取消点赞失败");
        }
      });
    },
    disCare(personId) {
      service.cancelCare(this.$store.state.userId, personId).then(d => {
        if (d) {
          alert("取消关注成功");
          this.getCareList();
        } else {
          alert("取消关注失败");
        }
      });
    },
    showArticle(articleId) {
      this.$router.push({ name: "article", params: { articleId } });
    },
    getCareList() {
      var _this = this;
      service.getCaresByCareId(_this.$store.state.userId).then(d => {
        const ids = [];
        for (let x in d) {
          ids.push(d[x].beCarePersonId);
        }
        if (ids.length > 0) {
          service.getPersonsByIds(ids).then(d1 => {
            const careList = [];
            for (let x in d1) {
              careList.push(d1[x]);
            }
            if (careList.length > 0) {
              _this.careList = careList;
            }
          });
        } else {
          alert("暂无关注的作者");
          _this.careList = [];
        }
      });
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
    margin-right: 15px;
  }
  .column-manage {
    font-size: 20px;
    font-weight: bolder;
    border-bottom: 1px solid rgb(83, 90, 108);
    margin-bottom: 20px;
  }
  .edit-column-button {
    margin-top: 20px;
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
    .cancle-care {
      font-weight: bolder;
      float: right;
    }
    .cancle-care:hover {
      cursor: pointer;
      color: red;
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
