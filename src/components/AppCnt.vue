<template>
  <div id="app">
    <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
    <ResumeEditor ref="resumeEditor" :markdown="currentMarkdown" :enableHtml="enableHtml"></ResumeEditor>
  </div>
</template>

<script>
  import StyleEditor from './StyleEditor.vue'
  import ResumeEditor from './ResumeEditor.vue'

  export default {
    name: 'app',
    props:['currentMarkdown','currentStyle','enableHtml'],
    components: {
      StyleEditor,
      ResumeEditor
    },
    data() {
      return {};
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    min-height: 100vh;
  }
  
  * {
    -webkit-transition: all .3s;
    transition: all .3s;
  }

</style>



// WEBPACK FOOTER //
// App.vue?42e9b078