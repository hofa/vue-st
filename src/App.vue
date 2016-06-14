<template>
  <div id="app">
    <h1>Hello App!1</h1>
    <p>
      <!-- 使用指令 v-link 进行导航。 -->
      <a v-link="{ path: '/foo' }">Go to Foo</a>
      <a v-link="{ path: '/bar' }">Go to Bar</a>
    </p>
    <!-- 路由外链 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Header from  './components/Header'

// export default {
//   components: {
//     Header
//   }
// }
</script>

