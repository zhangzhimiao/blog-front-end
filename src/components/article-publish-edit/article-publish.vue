<template>
  <div>
    <div ref="editor"></div>
    <div ref="viewer"></div>
    <button @click="getHtml">点我</button>
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "highlight.js/styles/github.css";

import Viewer from "tui-editor/dist/tui-editor-Viewer";

import Editor from "tui-editor";
export default {
  data() {
    return {
      editor: null,
      viewer: null
    };
  },
  mounted() {
    this.editor = new Editor({
      el: this.$refs.editor,
      initialEditType: "markdown",
      height: "300px"
    });
    this.viewer = new Viewer({
      el: this.$refs.viewer,
      height: "500px",
      initialValue: `
        # 1级标题
        ## 2级标题
        ### 3级标题
        #### 四级标题
        ##### 五级标题
        ###### 六级标题
      `
    });
  },
  methods: {
    getHtml() {
      console.log(this.editor.getValue());
      this.viewer.setValue(this.editor.getValue());
    }
  }
};
</script>
