// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 富文本
import VueQuillEditor from 'vue-quill-editor'
// 地图组件
import BaiduMap from 'vue-baidu-map'
import {BmlMarkerClusterer} from 'vue-baidu-map'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 头部菜单组件
// import nav from './components/naving.vue'
import nav from './components/naving2.vue'
// 页面组件
import firstModel from './components/common/firstmodel.vue'
import secondModel from './components/common/secondmodel.vue'
import thirdModel from './components/common/thirdmodel.vue'
// elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/common.css';
// Antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/common.css';
// 头部标题
import title from './components/title.vue'
// 当前位置
import place from './components/place.vue'
// 文章内容
import content from './components/content.vue'
// 带图片的文章内容
import piccontent from './components/piccontent.vue'
// 使用统计图插件
import zxCharts from './components/zxCharts.vue'
import roundCharts from './components/roundCharts.vue'
import smallCharts from './components/smallCharts.vue'
// 分页
import pages from './components/pages.vue'
// vuex
import store from '@/store/index.js'

Vue.config.productionTip = false
// 挂载全局vuex
Vue.prototype.$store = store
Vue.prototype.router = router
// 组件使用
// Vue.component('Naving',nav);
Vue.component('Naving',nav);
Vue.component('v-fm',firstModel)
Vue.component('v-sm',secondModel)
Vue.component('v-tm',thirdModel)
Vue.component('Title',title)
Vue.component('Place',place)
Vue.component('Content',content)
Vue.component('PicContent',piccontent)
Vue.component('zx-c',zxCharts)
Vue.component('r-c',roundCharts)
Vue.component('s-c',smallCharts)
Vue.component('v-pages',pages)
// elementui
Vue.use(ElementUI)
// Antd
Vue.use(Antd);
// 富文本
Vue.use(VueQuillEditor)
// 滚动条
// import vuescroll from 'vuescroll/dist/vuescroll';
// Vue.use(vuescroll);
// 地图
Vue.component('bml-marker-cluster', BmlMarkerClusterer)

Vue.use(BaiduMap, {
  ak: '0B9a6ab17bc736bda4066cea07f009a0'
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
