<template>
  <div class="index">
    <h1 class="thumbnails" style="width:0; height:0; overflow:hidden; position:absolute;">
    驾驶收益
    <p>驾驶收益</p>
    <img src="#" title="分享图片地址" style="width:0; height:0; overflow:hidden; position:absolute;">
    </h1>
    <header class="banner">
        <a href="../index.html" class="btn-back"></a>
        <a href="javascript:void(0);" id="mine-title"><span>驾驶收益</span><em class="imgs arr"></em></a>
        <a class="btn-show" href="javascript:void(0);"></a>
        <nav class="nav">
            <div class="mask"></div>
            <a class="btn-close" href="javascript:void(0);"></a>
            <ul class="navlist">
                <li class="home" data-page-id="0"><span class="nav-icons"></span><p>首页</p><span class="arrow"></span></li>
                <li class="apply" data-page-id="1"><span class="nav-icons"></span><p>免费申领</p><span class="arrow"></span></li>
                <li class="member" data-page-id="2"><span class="nav-icons"></span><p>个人中心</p><span class="arrow"></span></li>
                <li class="guide" data-page-id="3"><span class="nav-icons"></span><p>新手指引</p><span class="arrow"></span></li>
                <li class="aboutus" data-page-id="4"><span class="nav-icons"></span><p>关于我们</p><span class="arrow"></span></li>
            </ul>
            <div class="login-box">
                <div class="unlogin">
                    <a href="../register/register.html" class="btn-reg">免费注册</a>
                    <a href="../login/login.html" class="gologin">已有账号，去登录<div class="arrow"></div></a>
                </div>
                <div class="logined hide">
                    <div class="welcome">Hi，Orange</div>
                    <a href="../logout.html" class="btn-logout">退出登录</a>
                </div>
            </div>
        </nav>
    </header>

    <section id="cargains">
        <div class="wrapper">
            <div class="topcar"><a  href="javascript:;">粤B123456 <i class="icon-arrow" ></i></a></div>
            <div class="gains">
                <div class="gains-title"><span>累计驾驶收益</span></div>
                <div class="none hide"><span>暂无收益</span></div>
                <div class="mygains">
                   <div class="gainstotal">898.8元</div>
                    <div class="gainsprve">上周新增收益<span>23.50</span>元 </div>
                </div>
            </div>
            <div class="purse"><div class="purseleft"><span class="pure">钱包(元)</span><span class="pursemoney">1000.50</span></div><div class="purseright"> <div class="balloons">
                <div class="balloon balllight"><div class="inner"><a class="ballhref" href="">明细</a> </div></div>
                <div class="balloontwo balllighttwo"><div class="inner"><a  class="balltwo" href="">提现</a> </div></div>


            </div></div> </div>

            <div class="clearbg"></div>
            <div class="mine-def-title"><span>驾驶收益一览表</span></div>
            <div class="cleartw"></div>
            <div class="yield-curve"><canvas id="canvas"></canvas></div>

            <div class="clearline"></div>
            <div class="gainslist-title">驾驶收益明细</div>
            <div class="gainslist">
                <ul>
                    <li><div class="gainsdate">04-20</div><div class="gainstt">驾驶收益</div><div class="gainsmoney">+0.3</div></li>
                    <li><div class="gainsdate">04-20</div><div class="gainstt">驾驶收益</div><div class="gainsmoney">+0.3</div></li>
                    <li><div class="gainsdate">04-20</div><div class="gainstt">驾驶收益</div><div class="gainsmoney">+0.3</div></li>
                    <li><div class="gainsdate">04-20</div><div class="gainstt">驾驶收益</div><div class="gainsmoney">+0.3</div></li>

                </ul>

            </div>

            <footer id="footer">
                <div class="wrap">
                    <div class="copyright">&copy;深圳鼎然信息科技有限公司&nbsp;&nbsp;&nbsp;ICP备14065655号-3</div>
                </div>
            </footer>
        </div>

        <!--注册信息出错提示层---->
        <div id="pop-mask" class="hide"></div>
        <div id="pop-reg-tips" class="pop-tips hide">
            <div class="pop-bd"></div>
            <a href="javascript:void(0);" id="btn-submit" class="btn_blue_s">确定</a>
        </div>
        <div id="dialogBg"></div>
        <div id="dialog" class="animated">

            <div class="dialogTop">
                我的爱车<a href="javascript:;" class="claseDialogBtn">关闭</a>
            </div>
            <ul>
                <li>粤B12345</li>
                <li>粤B12345</li>
                <li>粤B12345</li>
                <li>粤B12345</li>
                <li>粤B12345</li>
            </ul>
        </div>
        </div>
    </section>
  </div>
</template>


<script>

// import jquery from '../../assets/js/jquery.min.js'
// import { Chart } from '../../assets/js/Chart.js'
// import '../../assets/js/modernizr.min.js'
// import '../../assets/js/main.js'

// require('../../assets/js/modernizr.min.js')
// import Chart from "chart"
// import Modernizr from "modernizr"
// require('../../assets/js/Chart.js')
import hofa from '../../assets/js/hofa.js'


export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  ready () {

    console.log(hofa.m1())
  }
}
</script>

