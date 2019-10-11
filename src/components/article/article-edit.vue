<template>
  <div class="editor-wrap">
    <div class="article-title">
      <Input v-model="title" placeholder="文章标题" style="width: 300px" />
    </div>
    <div ref="editor"></div>
    <div class="publish-commit-button">
      <Button @click="publish">发布</Button>
    </div>
    <div
      class="enable-publish-wrap"
      v-show="publishMask"
      @click.self="hiddenMask"
    >
      <div class="article-info-wrap">
        <div class="article-info-title">添加文章信息</div>
        <div class="row-wrap">
          <div class="row-name">文章所属栏目</div>
          <CheckboxGroup
            v-model="articleColumns"
            @on-change.self="columnsChange"
          >
            <Checkbox
              v-for="column in allColumns"
              :key="column.id"
              :label="column.id"
            >
              {{ column.name }}
            </Checkbox>
          </CheckboxGroup>
        </div>
        <div class="row-wrap">
          <div class="row-name">文章是否公开</div>
          <RadioGroup v-model="isPublic">
            <Radio label="0">
              是
            </Radio>
            <Radio label="1">
              否
            </Radio>
          </RadioGroup>
        </div>
        <div class="row-wrap noborder">
          <div class="row-name">添加文章标签</div>
          <Input
            v-model="articleLabel"
            placeholder="输入标签"
            style="width: 300px"
          /><Button @click="addLabel">添加</Button>
          <div class="labels-wrap">
            <CheckboxGroup v-model="labels" @on-change.self="labelsChange">
              <Checkbox
                v-for="(label, index) in labels"
                :key="index"
                :label="label"
              >
                {{ label }}
              </Checkbox>
            </CheckboxGroup>
          </div>
        </div>
        <div class="button-wrap">
          <Button type="error" @click="enablePublish">发布</Button>
          <Button @click="hiddenMask">取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "highlight.js/styles/github.css";
import Editor from "tui-editor";
import { service } from "../../utils/service";

export default {
  data() {
    return {
      title: "",
      publishMask: false,
      articleColumns: [],
      isPublic: "0",
      articleLabel: "",
      labels: [],
      articleId: this.$route.params.articleId,
      article: {}
    };
  },
  computed: {
    allColumns() {
      return this.$store.state.allColumns;
    }
  },

  mounted() {
    var _this = this;
    service.getDetailArticle(_this.articleId).then(d => {
      _this.article = d.data.data.d;
      _this.title = _this.article.title;
      _this.editor = new Editor({
        el: _this.$refs.editor,
        initialEditType: "markdown",
        height: "800px",
        initialValue: _this.article.content
      });
      _this.getArticleLabels();
      _this.getArticleColumns();
    });
  },
  methods: {
    getArticleLabels() {
      var _this = this;
      service.getLabelsByArticleId(_this.articleId).then(d => {
        const labels = [];
        for (let x in d) {
          labels.push(d[x].name);
        }
        _this.labels = labels;
      });
    },
    getArticleColumns() {
      var _this = this;
      service.getColumnsByArticleId(_this.articleId).then(d => {
        const columns = [];
        for (let x in d) {
          columns.push(d[x]);
        }
        _this.articleColumns = columns;
      });
    },
    publish() {
      this.publishMask = true;
      document.body.style.overflow = "hidden";
    },
    enablePublish() {
      var _this = this;
      if (_this.$store.state.isSignIn) {
        if (_this.title === "") {
          alert("请输入文章标题");
          this.publishMask = false;
          document.body.style.overflow = "";
          return;
        }
        if (_this.articleColumns.length === 0) {
          alert("请选择文章栏目");
          return;
        }
        service
          .publishArticle(
            _this.$store.state.userId,
            _this.editor.getValue(),
            _this.isPublic,
            _this.title,
            _this.articleColumns,
            _this.labels
          )
          .then(d => {
            if (d) {
              this.publishMask = false;
              document.body.style.overflow = "";
              alert("发布文章成功");
            } else {
              alert("发布文章失败");
            }
          });
      } else {
        alert("请保存文章后重新登录发布");
      }
    },
    hiddenMask() {
      this.publishMask = false;
      document.body.style.overflow = "";
    },
    columnsChange() {},
    labelsChange() {},
    addLabel() {
      this.labels.push(this.label);
      this.label = "";
    }
  }
};
</script>
<style lang="less" scoped>
.editor-wrap {
  padding: 50px;
  .article-title {
    padding-bottom: 15px;
  }
  .publish-commit-button {
    padding-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
  .enable-publish-wrap {
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    .article-info-wrap {
      z-index: 9999;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 450px;
      background: white;
      height: 550px;
      transition: translate(-50%, -50%);
      border-radius: 10px;
      .article-info-title {
        font-size: 25px;
        font-weight: bolder;
        display: flex;
        justify-content: center;
        padding: 20px 0;
        border-bottom: 1px solid rgb(204, 204, 204);
      }
      .row-wrap {
        padding: 15px;
        border-bottom: 1px solid rgb(204, 204, 204);
        .row-name {
          font-size: 20px;
          padding-bottom: 5px;
        }
        .labels-wrap {
          padding-top: 10px;
        }
      }
      button {
        margin-left: 10px;
      }
    }
    .noborder {
      border: none !important;
    }
    .button-wrap {
      padding: 15px;
      display: flex;
      justify-content: space-around;
      position: absolute;
      border-top: 1px solid rgb(204, 204, 204);
      width: 100%;
      bottom: 0;
    }
  }
}
</style>
