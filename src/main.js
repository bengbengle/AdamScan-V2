import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import router from './router.js';
import './axios.js';

import HomeHead from "@/views/base/homeHead"
import HomeFooter from "@/views/base/homeFooter"

import App from './App.vue'
// 引入echarts
import echarts from 'echarts'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueHighlightJS from 'highlight.js';

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.use(VueHighlightJS)

Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    VueHighlightJS.highlightBlock(block)
  })
})

Vue.directive('title', {
  // eslint-disable-next-line no-unused-vars
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

Vue.prototype.$echarts = echarts

Vue.use(HomeHead)

Vue.use(HomeFooter)

Vue.use(ElementUI)

Vue.use(MintUI)

Vue.config.productionTip = false

Vue.use(mavonEditor)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



// const baseSize = 28
// // 设置 rem 函数
// function setRem () {
//   // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
//   const scale = document.documentElement.clientWidth / 750
//   // 设置页面根节点字体大小
//   document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
// }
// // 初始化
// setRem()
// // 改变窗口大小时重新设置 rem
// window.onresize = function () {
//   setRem()
// }