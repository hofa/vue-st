<template>
  <div id="app">

    <h1>{{ message }}</h1><blog-head>head</blog-head>
    <header>11</header>
    <p>
      <!-- 使用指令 v-link 进行导航。 -->
      <a v-link="{ path: '/foo' }">Go to Foo</a>
      <a v-link="{ path: '/bar' }">Go to Bar</a>
    </p>
    <!-- 路由外链 -->
    <router-view></router-view>

    <a @click="alert">点击我提示</a>
    <a href="http://www.baidu.com" target="_blank">百度</a>
    <blog-foot>foot</blog-foot>
  </div>
</template>

<script>
  import blogHead from './components/blog-head.vue'
  import blogFoot from './components/blog-foot.vue'

  // import header from './components/header.vue'
  // import Header from  './components/Header'
  export default {
    data: function() {
      return {
        message: "hello world"
      }
    },
    methods: {
      alert: function() {
        // alert(1)
        this.$route.router.go('/login')
        // console.log(this.$route.router.go('/foo'))
      }
    },
    components: {
      blogHead,
      blogFoot
    }
  }
</script>

<style lang=less>
.fontsize {
  font-size: 16px;
  text-decoration: underline;
};

a {
  color: blue;
  &:hover {
    color: red;
    text-decoration: none;
  }
  .fontsize
};
</style>
