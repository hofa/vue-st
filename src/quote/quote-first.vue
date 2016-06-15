<template>
  <div id="quote-first">

    <header class="com-header"><img src="./assets/image/index_banner.png"></header>
    <section class="step1-wrap valid-box">
        <div class="select-wrap ml-26" style="height: 1rem;">  <div class="inptname" style="line-height: 1rem">行驶城市：</div> <span id="toubao_city" value="" validator="required" valid-name="投保城市"> {{ areaName }}</span>
            <div class="" id="toubao_ciick" @click="changeCity()">更改城市</div>
        </div>
        <div class="input-wrap ico2-out" >
            <div class="input-inner-wrap">
                <div class="inptname">是否未上牌：</div>
                <input  type="checkbox" id="hascar" style="" value="0"><div style="height: 1.34375rem;  line-height:1.34375rem; ">未上牌</div>
        </div>
        </div>
        <div class="input-wrap ico1-out" id="chenumber">
            <div class="input-inner-wrap">
                <div class="inptname">车辆牌号：</div>
                <input type="text" v-model="storeCarno" id="cs-brand" placeholder="请输入车牌号" validator="required" valid-name="车牌号"
                       class="ui-text-uppercase"/>
        </div>
        </div>
        <div class="input-wrap ico2-out">
          <div class="input-inner-wrap">
            <div class="inptname">车主姓名：</div>
            <input id="txtDRName" type="text" placeholder="请输入车主姓名" validator="required" valid-name="车主姓名"/>
          </div>
        </div>
        <div class="input-wrap ico3-out">
          <div class="input-inner-wrap">
            <div class="inptname"> 手机号码：</div>
            <input id="txtDRmobile" type="text" placeholder="请输入手机号码" validator="required" valid-name="手机号码"/>
          </div>
        </div>
        <div id="btnQuery" class="btn-blue validator_btn" @click="toNext()">
            下一步
        </div>
        <input type="hidden" id="orderid" name="orderid" value="0">

        <div class="frhelp">填写太麻烦？</div>
        <div class="insurance-buttn"><a href="upphoto.html" class="btn_blue" id="btn-success">拍照报价</a> <a
                href="tel:075584357001" class="btn_org" id="btn-success">电话询价</a></div>
        <div id="gototop" onclick="gototop();" style="display:none;"></div>

    </section>
    <div class="foote"><img src="./assets/image/Information.png"></div>
    <div id="pop_city_layer" v-bind:style="cityPanel">
      <div class="pop-tit"> 选择城市 <span id="icon-close" class="icon-close" @click="closeCity()"></span></div>
      <div class="pop-con-wrap"></div>
      <div class="white-box fail-wrap ">X&nbsp;定位失败</div>
      <div class="tit-box">全部城市（按首字母顺序）</div>
      <div class="letters-wrap white-box  clearfix">
        <a v-for="cl in cityListLetter" @click="redirectToDiv(cl)"> {{cl}} </a>
      </div>

      <div v-for="cl in cityListLetter">
        <div class="tit-box" id="{{cl}}"> {{cl}}</div>
        <ul class="white-box line-box">
          <li v-for="tl in letterCities[cl]" @click="setPlace(tl.areaName, tl.areaNumber)">{{tl.areaName}}</li>
        </ul>
      </div>
    </div>

    <div id="top" @click="toTop()">Top</div>
  </div>
</template>



<script>
  import $ from 'jquery'
  import request from '../request'
  import './assets/js/lib/flexible.js'
  // import $ from './assets/js/jquery-2.2.3.min.js'
  // import './assets/js/lib/fastclick.min.js'
  // import './assets/js/third/layer.js'
  // import store from './assets/js/lib/store.min.js'
  // import './assets/js/widget/notification.js'
  // import './assets/js/widget/validator.js'
  // import './assets/js/widget/form-submit.js'
  import {store} from '../setting'

  export default {
    ready: function() {
      var o = {
        a : 7,
        get b(){return this.a +1;},//通过 get,set的 b,c方法间接性修改 a 属性
        set c(x){this.a = x/2}
    };

      console.log(o.a)
      console.log(store)
      // this.storeCarno = "123"
    },
    data: function() {
      return {
        cityPanel: {
          display: 'none'
        },
        cityListLetter: [],
        cityList: [],
        letterCities: [],
        areaName: '',
        areaNumber: 0,
        storeCarno: "AB",
        store: store
      }
    },
    methods: {

      redirectToDiv: function(id) {
        // console.log(id)
        // console.log(document.getElementById(id))
        // console.log(document.getElementById(id).offetTop)

        $('html, body').animate({scrollTop: $('#' + id).offset().top + 'px'}, 800);
      },

      /**
       * 定义位置
       * @param {[type]} areaName   [description]
       * @param {[type]} areaNumber [description]
       */
      setPlace: function(areaName, areaNumber) {
        this.areaName = areaName
        this.areaNumber = areaNumber
        this.closeCity()
      },

      /**
       * 切换城市
       * @return {[type]} [description]
       */
      changeCity: function() {
        this.store.a += 1000
        // console.log(this.cityList)
        $('#top').show();
        if (this.cityList.length == 0) {
          var resource = this.$resource('http://api.ubi001.com/v1/offer/getCityList')
          var cityListLetter = []
          var letterCities = []
          resource.get().then(function (response) {
            if (response.data.errcode == 0) {
              this.cityList = response.data.data
              var area_hold = []
              // var letterCities = []
              if (response.data.data) {
                for (var i = 0; i < response.data.data.length; i++) {
                  var temp = response.data.data[i]
                  var templetter = temp.shortName.substr(0, 1).toUpperCase()
                  if (typeof(letterCities[templetter]) != "undefined") {
                    letterCities[templetter].push(temp)
                  } else {
                    letterCities[templetter] = [temp]
                  }

                  if(cityListLetter.indexOf(templetter) == -1) {
                    cityListLetter.push(templetter)
                  }
                }
              }
              // console.log(this.letterCities)
              // console.log(area_hold)
              cityListLetter.sort()
              this.letterCities = letterCities
              this.cityListLetter = cityListLetter
              console.log(letterCities, cityListLetter)
              this.cityPanel.display = 'block'
            }
          }, function(response) {
            alert('读取地址失败');
          });
        }
        else {
          this.cityPanel.display = 'block'
        }
      },

      /**
       * 关闭城市panel
       * @return {[type]} [description]
       */
      closeCity: function() {
        this.cityPanel.display = 'none'
        //document.body.scrollTop = document.documentElement.scrollTop = 0
        // $('html, body').animate({scrollTop: "0px"}, 100)
        $('html, body').scrollTop("0px")
        $('#top').hide();
      },

      toTop: function() {
        $('html, body').animate({scrollTop: "0px"}, 800)
      },

      toNext: function() {
        this.$route.router.go('/quote/2')
      }
    }
  }
</script>

<style lang=less>
  @import "./assets/css/base.css";
  @import "./assets/css/style.css";
  @import "./assets/css/layer.css";
  @import "./assets/css/cx-step1.css";
  @import "./assets/skins/all.css";
  body{background:#f0f0f0;}

  #quote-first {
    position: relative;
  }
  #top {
    text-align: center;
    color:white;
    background: black;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    z-index: 999;
    position:fixed;
    right: 0.1rem;
    bottom: 0.1rem;
    border-radius: 0.8rem; /* 所有角都使用半径为5px的圆角，此属性为CSS3标准属性 */
    -moz-border-radius: 0.8rem; /* Mozilla浏览器的私有属性 */
    -webkit-border-radius: 0.8rem; /* Webkit浏览器的私有属性 */
    /*border-radius: 5px 4px 3px 2px;*/ /* 四个半径值分别是左上角、右上角、右下角和左下角 */
  }
</style>
