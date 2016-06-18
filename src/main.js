import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'


// components
import appLogin from './components/app-login'
import quoteFirst from './quote/quote-first'
import quoteSecond from './quote/quote-second'

import {config} from './setting'

// import {store} from './setting'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.http.options.emulateJSON = true;

var router = new VueRouter()

var Home = Vue.extend({
    template: '<p>我是首页</p>',
    created: function () {
      this.$route.router.go('/quote')
    }
})

// 定义组件
var Foo = Vue.extend({
    template: '<p>This is foo!</p>'
})

var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
})

// var quote2 = Vue.extend({
//     data: function() {
//       return {
//         store: store
//       }
//     },
//     template: '<p>This is quote <a style="color:red" v-link="{ path: \'/quote\' }">click me {{store.a}}</a></p>'
// })
// 路由器需要一个根组件。
// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
// var App = Vue.extend({})

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter()

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({
    '/': {
      component: Home
    },
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    },
    '/login': {
      component: appLogin
    },
    '/quote': {
      component: quoteFirst,
      config: config
    },
    '/quote-second': {
      component: quoteSecond,
      config: config
    }
})

router.beforeEach(function(transition) {
  // console.log(111);
  transition.next()
})

// router.redirect('/login')
router.start(App, 'app')

