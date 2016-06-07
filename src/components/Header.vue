<template>
    <div class="header">
        <div id="_myheader">
            <div class="top">
                <a href="#" class="shuaxin"><span></span><i></i></a><a href="/search_1_p1.html" class="search"></a>
                <div id="m_gjz_001">
                    <script>LG('m_gjz_001');</script>
                </div>
            </div>
            <div class="nav_box">
                <ul class="list_all" style="display: none">
                    <li><a href="/mobile/">手机</a></li>
                    <li><a href="/dc/">数码相机</a></li>
                    <li><a href="/nb/">笔记本</a></li>
                    <li><a href="/pad/">平板电脑</a></li>
                    <li><a href="/diy/">电脑</a></li>
                    <li><a href="/tv/">电视</a></li>
                    <li><a href="/ilife/">智能硬件</a></li>
                </ul>
                <div class="nav_more" style="z-index: 100"><a href="#">更多<em></em></a></div>
                <div id="wrapp" class="nav_menu">
                    <div id="scro" class="nav">
                        <a style="color: #e85c40;" onclick="moveTo(0)">最新</a>
                        <a onclick="moveTo(1)">晨博社</a>
                        <a onclick="moveTo(2)">泡美美</a>
                        <a onclick="moveTo(3)">爱极客</a>
                        <a onclick="moveTo(4)">值得买</a>

                    </div>
                    <div id="htag" class="" style="display: none;"></div>
                </div>

            </div>
            <p id="insertnull" class="more" style="display: none">真没了,往下翻吧</p>
        </div>
    <div>
</template>

<script>
  export default {
      data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!'
      }
    }
  }
</script>
