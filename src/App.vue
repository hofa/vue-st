<template>
  <div id="app">
    <!-- 路由外链 -->
    <router-view></router-view>
  </div>
</template>

<script>

  import blogHead from './components/blog-head.vue'
  import blogFoot from './components/blog-foot.vue'

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
@import "./template/v1/css/reset.css";
@import "./template/v1/css/style.css";
</style>
