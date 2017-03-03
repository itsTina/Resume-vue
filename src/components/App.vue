<template>
  <div id="app">
    <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
    <ResumeEditor ref="resumeEditor" :markdown="currentMarkdown" :enableHtml="enableHtml"></ResumeEditor>
  </div>
</template>

<script>
  import StyleEditor from './components/StyleEditor'
  import ResumeEditor from './components/ResumeEditor'
  import './assets/reset.css'

  export default {
    name: 'app',
    components: {
      StyleEditor,
      ResumeEditor
    },
    data() {
      return {
        interval: 50,
        currentStyle: '',
        enableHtml: false,
        fullStyle: [
          `/*
* Inspired by http://strml.net/
* å¤§å®¶å¥½ï¼Œæˆ‘æ˜¯æ–¹æ–¹ 
* äºŒæœˆäº†ï¼Œå¥½å¤šå…¬å¸éƒ½åœ¨æ‹›è˜ï¼Œä½ æ˜¯ä¸æ˜¯ä¹Ÿåœ¨å‡†å¤‡ç®€åŽ†å‘€ã€‚
* è¯´åšå°±åšï¼Œæˆ‘ä¹Ÿæ¥å†™ä¸€ä»½ç®€åŽ†ï¼
*/

/* é¦–å…ˆç»™æ‰€æœ‰å…ƒç´ åŠ ä¸Šè¿‡æ¸¡æ•ˆæžœ */
* {
  -webkit-transition: all .3s;
  transition: all .3s;
}
/* ç™½è‰²èƒŒæ™¯å¤ªå•è°ƒäº†ï¼Œæˆ‘ä»¬æ¥ç‚¹èƒŒæ™¯ */
html {
  color: rgb(222,222,222); background: rgb(0,43,54); 
}
/* æ–‡å­—ç¦»è¾¹æ¡†å¤ªè¿‘äº† */
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* ä»£ç é«˜äº® */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }

/* åŠ ç‚¹ 3D æ•ˆæžœå‘— */
html{
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0; 
  -webkit-transition: none; 
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}

/* æŽ¥ä¸‹æ¥æˆ‘ç»™è‡ªå·±å‡†å¤‡ä¸€ä¸ªç¼–è¾‘å™¨ */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh; 
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
/* å¥½äº†ï¼Œæˆ‘å¼€å§‹å†™ç®€åŽ†äº† */


`,
          `
/* è¿™ä¸ªç®€åŽ†å¥½åƒå·®ç‚¹ä»€ä¹ˆ
 * å¯¹äº†ï¼Œè¿™æ˜¯ Markdown æ ¼å¼çš„ï¼Œæˆ‘éœ€è¦å˜æˆå¯¹ HR æ›´å‹å¥½çš„æ ¼å¼
 * ç®€å•ï¼Œç”¨å¼€æºå·¥å…·ç¿»è¯‘æˆ HTML å°±è¡Œäº†
 */
`
          ,
          `
/* å†å¯¹ HTML åŠ ç‚¹æ ·å¼ */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
}
.resumeEditor ul> li::before{
  content: 'â€¢';
  margin-right: .5em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before {
  counter-increment: section;            
  content: counters(section, ".") " ";  
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
`],
        currentMarkdown: '',
        fullMarkdown: `æ–¹åº”æ­
----

èµ„æ·±å‰ç«¯å·¥ç¨‹å¸ˆï¼Œèµ„æ·±å‰ç«¯è®²å¸ˆï¼ŒçŽ°åœ¨åœ¨ [é¥¥äººè°·](http://jirengu.com) æ•™å‰ç«¯è¯¾ç¨‹ã€‚

æŠ€èƒ½
----

* å‰ç«¯å¼€å‘
* Rails å¼€å‘
* Node.js å¼€å‘
* å‰ç«¯æŽˆè¯¾

å·¥ä½œç»åŽ†
----

1. [é¥¥äººè°·](http://jirengu.com)
2. è…¾è®¯å³æ—¶é€šè®¯å¹³å°éƒ¨
3. é˜¿é‡Œå·´å·´B2Béƒ¨é—¨
4. å½©ç¨‹çŸ¥äººé¡¹ç›®ç»„

é“¾æŽ¥
----

* [GitHub](https://github.com/frankfang)
* [æˆ‘çš„æ–‡ç« ](https://www.zhihu.com/people/zhihusucks/pins/posts)

> å¦‚æžœä½ å–œæ¬¢è¿™ä¸ªæ•ˆæžœï¼ŒFork [æˆ‘çš„é¡¹ç›®](https://github.com/jirengu-inc/animating-resume)ï¼Œæ‰“é€ ä½ è‡ªå·±çš„ç®€åŽ†ï¼

`
      }
    },
    created() {
      this.makeResume()
    },

    methods: {
      makeResume: async function () {
        await this.progressivelyShowStyle(0)
        await this.progressivelyShowResume()
        await this.progressivelyShowStyle(1)
        await this.showHtml()
        await this.progressivelyShowStyle(2)
      },
      showHtml: function () {
        return new Promise((resolve, reject) => {
          this.enableHtml = true
          resolve()
        })
      },
      progressivelyShowStyle(n) {
        return new Promise((resolve, reject) => {
          let interval = this.interval
          let showStyle = (async function () {
            let style = this.fullStyle[n]
            if (!style) { return }
            // è®¡ç®—å‰ n ä¸ª style çš„å­—ç¬¦æ€»æ•°
            let length = this.fullStyle.filter((_, index) => index <= n).map((item) => item.length).reduce((p, c) => p + c, 0)
            let prefixLength = length - style.length
            if (this.currentStyle.length < length) {
              let l = this.currentStyle.length - prefixLength
              let char = style.substring(l, l + 1) || ' '
              this.currentStyle += char
              if (style.substring(l - 1, l) === '\n' && this.$refs.styleEditor) {
                this.$nextTick(() => {
                  this.$refs.styleEditor.goBottom()
                })
              }
              setTimeout(showStyle, interval)
            } else {
              resolve()
            }
          }).bind(this)
          showStyle()
        })
      },
      progressivelyShowResume() {
        return new Promise((resolve, reject) => {
          let length = this.fullMarkdown.length
          let interval = this.interval
          let showResume = () => {
            if (this.currentMarkdown.length < length) {
              this.currentMarkdown = this.fullMarkdown.substring(0, this.currentMarkdown.length + 1)
              let lastChar = this.currentMarkdown[this.currentMarkdown.length - 1]
              let prevChar = this.currentMarkdown[this.currentMarkdown.length - 2]
              console.log(prevChar)
              if (prevChar === '\n' && this.$refs.resumeEditor) {
                this.$nextTick(() => this.$refs.resumeEditor.goBottom())
              }
              setTimeout(showResume, interval)
            } else {
              resolve()
            }
          }
          showResume()
        })
      }
    }
  }

</script>

<style scoped>
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