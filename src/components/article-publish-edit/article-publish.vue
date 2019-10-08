<template>
  <div>
    <div ref="editor"></div>
    <button @click="publish">发布</button>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'highlight.js/styles/github.css'
import Editor from 'tui-editor'

export default {
  data() {
    return {
      editor: null,
      viewer: null
    }
  },
  mounted() {
    this.editor = new Editor({
      el: this.$refs.editor,
      initialEditType: 'markdown',
      height: '300px'
    })
  },
  methods: {
    publish() {
      this.editor.getValue()
    }
  }
}
</script>
