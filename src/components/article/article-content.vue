<template>
  <div class="content-wrap">
    <div class="nav-wrap">
      <Menu theme="light" :active-name="0">
        <MenuGroup title="栏目">
          <MenuItem
            v-for="(column, index) in columns"
            :key="index"
            :name="index"
          >
            <Icon type="md-document" />
            <span @click="getList(column.id)">
              {{ column.name }}
            </span>
          </MenuItem>
        </MenuGroup>
      </Menu>
    </div>
    <div class="list-wrap">
      <List border v-if="articleList.length > 0">
        <ListItem v-for="article in articleList" :key="article.id">
          <div class="list-item-wrap">
            <h4 @click="showArticle(article.id)">{{ article.title }}</h4>
            <div class="viewer" @click="showArticle(article.id)">
              <viewer :viewCode="article.content" />
            </div>
            <h5>作者：{{ article.person.name }}</h5>
          </div>
        </ListItem>
      </List>
    </div>
  </div>
</template>

<script>
import { service } from "../../utils/service";
import Viewer from "./article-viewer";

export default {
  components: {
    viewer: Viewer
  },
  data() {
    return {
      columns: [],
      articleList: []
    };
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    }
  },
  methods: {
    getList(columnId) {
      var _this = this;
      _this.articleList = [];
      service.getColumnArticlesByColumnId(columnId).then(d => {
        const tempIdList = [];

        if (d.data.data.d.length < 1) {
          alert("该栏目暂无文章");
        } else {
          for (let x in d.data.data.d) {
            tempIdList.push(d.data.data.d[x].articleId);
          }
          service.getArticlesByArticleIds(tempIdList).then(articleListData => {
            _this.articleList = articleListData.data.data.d;
          });
        }
      });
    },
    showArticle(articleId) {
      this.$router.push({ name: "article", params: { articleId } });
    }
  },
  beforeMount() {
    var _this = this;

    if (_this.userId === "") {
      const columns = [];
      service.getAllColumns().then(allColumns => {
        const tempColumns = allColumns.data.data;
        for (let x in tempColumns) {
          columns.push(tempColumns[x]);
        }
      });
      _this.columns = columns;
      service.getAllArticles().then(d => {
        _this.articleList = d.data.data.d;
      });
    } else {
      service.getUserColumns(_this.userId).then(d => {
        if (d.data.data[0].columns.length > 0) {
          _this.columns = d.data.data[0].columns;

          if (_this.columns.length > 0) {
            service.getColumnArticlesByColumnId(_this.columns[0].id).then(d => {
              const tempIdList = [];

              if (d.data.data.d.length < 1) {
                alert("该栏目暂无文章");
              } else {
                for (let x in d.data.data.d) {
                  tempIdList.push(d.data.data.d[x].articleId);
                }
                service
                  .getArticlesByArticleIds(tempIdList)
                  .then(articleListData => {
                    _this.articleList = articleListData.data.data.d;
                  });
              }
            });
          }
        } else {
          _this.columns = _this.$store.state.allColumns;
          service.getAllArticles().then(d => {
            _this.articleList = d.data.data.d;
          });
        }
      });
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
    width: 70%;
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
}
</style>
