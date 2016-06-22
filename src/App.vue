<template>
  <div id="app">
    <!-- 路由外链 -->
    <router-view></router-view>
  </div>
</template>

<script>
var $script = require("scriptjs")
$script("http://m.ubi001.com/web/quote/js/lib/flexible.js", function() {

})
</script>

<style>
  @import "./quote/assets/css/base.css";
  @import "./quote/assets/css/style.css";
  @import "./quote/assets/css/layer.css";
  /*@import "./assets/css/cx-step1.css";*/
  @import "./quote/assets/skins/all.css";
</style>

