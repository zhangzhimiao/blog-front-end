<template>
  <div>
    <div ref="viewer"></div>
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "highlight.js/styles/github.css";
import Viewer from "tui-editor/dist/tui-editor-Viewer";

export default {
  props: {
    viewCode: String
  },
  data() {
    return {
      viewer: null
    };
  },
  mounted() {
    this.viewer = new Viewer({
      el: this.$refs.viewer,
      height: "500px",
      initialValue: this.viewCode
    });
  }
};
</script>
