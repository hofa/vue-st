import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {config} from './setting'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.http.options.emulateJSON = true

var router = new VueRouter()

var Home = Vue.extend({
    template: '<p>我是首页</p>',
    created: function () {
      this.$route.router.go('/quote')
    }
})

var Page404 = Vue.extend({
  template: '<p> 404 Not Found! redirect <h3><a style="color:blue" v-link="{path:\'/quote\'}">/</a> </p>' +
            '<p><a style="color:blue" v-link="{path:\'/async\'}">async test</a></h3></p>'
})

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter()

// 定义路由规则
router.map({
    '/': {
      component: function (resolve) {
        require(['./quote/quote-first.vue'], resolve)
      },
      config: config
    },
    '/quote': {
      component: function (resolve) {
        require(['./quote/quote-first.vue'], resolve)
      },
      config: config
    },
    '/quote-second': {
      component: function (resolve) {
        require(['./quote/quote-second.vue'], resolve)
      },
      config: config
    },
    '/quote-third': {
      component: function (resolve) {
        require(['./quote/quote-third.vue'], resolve)
      },
      config: config
    },
    '/quote-fourth': {
      component: function (resolve) {
        require(['./quote/quote-fourth.vue'], resolve)
      },
      config: config
    },
    '/404': {
      component: Page404,
      config: config
    },
    '/quote-photograph': {
      component: function (resolve) {
        require(['./quote/quote-photograph.vue'], resolve)
      },
      config: config
    }
})

router.redirect({
  '*' : '/404'
})

router.beforeEach(function(transition) {
  transition.next()
})

router.start(App, 'app')

