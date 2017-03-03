/**
 * Created by mating on 2017/2/23.
 */
/*vue.js 版本要和vue-template-compiler版本一致*/
import Vue from 'vue'
import Marked from './marked.min'
import App from './components/AppCnt.vue'
 new Vue({
    el:'#app',
     template:'<App :currentMarkdown="msg" :currentStyle="stylemsg" :enableHtml="true"/>',
     components:{
         App
     },
    data:{
        msg:'',
        stylemsg:'',
        innercss:`/*开始样式编辑；*/
        html {
          color: rgb(222,222,222); background: rgb(0,43,54); 
        }
        * {
          -webkit-transition: all .3s;
          transition: all .3s;
        }
        .styleEditor {
          padding: .5em;
          border: 1px solid;margin: .5em;
          overflow: auto;
          width: 45vw; height: 90vh;
          background: rgb(28, 40, 62);
        }
        .resumeEditor{
          position: fixed; right: 0; top: 0;
          padding: .5em;  margin: .5em;
          width: 48vw; height: 90vh; 
          border: 1px solid;
          background: white; color: #222;
          overflow: auto;
          
        }
        /* 再对 HTML 加点样式 */
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
          content: '•';
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
        }`,
        innertxt:`我的简历：
        
马婷
----

资深前端工程师，2012年于浙江农林大学毕业，专业计算机科学与技术。

技能
----

* 前端开发
* html5, es6
* backbone, vue, webpack
* nodejs

工作经历
----

1. 网新恒天
2. 通策

链接
----

* [GitHub](https://github.com/itsTina)
* [我的文章](https://www.zhihu.com/people/zhihusucks/pins/posts)

> 如果你喜欢……

`
    },
     //render: h => h(Nav),/**/
     /*render:function(createElement){
      /!*render方法比template更接近编译器，在amount里调用*!/
      /!*createElement： return vNode;
      * param: 第一个参数为html标签（如div）或一函数*!/
      return createElement('div',{
      'class': {
      "content-wrapper": true
      },
      style: {
      padding:'40px',
      color: 'red',
      fontSize: '14px'
      }
      },[createElement(Nav)]);
      },*/
     mounted:function () {
         //markdown
         //document.getElementsByClassName('markedCode')[0].innerHTML= Marked(this.msg);
       this.updateContent();
     }  ,
     methods:{
         updateContent:async  function(){
             await this.tickCss();
             await this.tickValue();
         },
         tickCss:function () {
             var index=0, len= this.innercss.length, id, me=this;
             return new Promise(function(resolve,reject){
                 var id=setInterval(function(){
                     if(index<len){
                         me.stylemsg =me.innercss.substr(0, index++);
                     }else{
                         clearInterval(id);
                         resolve();
                     }
                 },60);
             });

         },
         tickValue: function(){
             var index=0, len= this.innertxt.length, id, me=this;
             return new Promise(function(resolve,reject){
                 var id=setInterval(function(){
                     if(index<len){
                         me.msg =me.innertxt.substr(0, index++);
                     }else{
                         clearInterval(id);
                         resolve();
                     }
                 },100);
             });

         }
     }
}) 
