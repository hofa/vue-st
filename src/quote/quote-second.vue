<template>
  <div id="quote-second">
    <div id="wrapper" v-bind:class="{hide: panel}">
      <header id="cx-app-heaer">
          <a class="icon-back " href="javascript:history.go(-1);"></a>
          详情录入
      </header>
      <section id="step2-wrap" class="com-frm-input">

          <div class="infotips">请准确填写车辆信息，仅支持9座以下家庭自用客车比价 </div>

          <div class="infoone">机动车行驶证信息<span class="infohelp"><img style=" width: 1em; margin-left: 0.5em;" src="./assets/image/help.png"  ></span>
              <div class="infohelptwo"><a href="upphoto.html"> <img src="./assets/image/photo.png" style="width: 30%; margin-top: 0.2rem; margin-left: 0.8em;" ></a></div>
          </div>

          <form class="binder-form-submit" action="http://api.ubi001.com" data-command="addUserCarInfoForManual"
                data-submit="addUserCarInfoForManual()">

              <div class="input-wrap">
                  <label>车辆识别代码</label>
                  <input v-model="DS.vehicle_vin" id="txtFrameNo" style="text-transform:uppercase;" type="text" name="frameNo" placeholder="车辆识别代码" validator="required min_length:17 max_length:17"
                         valid-name="车辆识别代码">
              </div>


              <div class="input-wrap posi-rela">
                  <label>品牌款型</label>
                  <input v-model="DS.vehicle_model" id="txtBrandNo" type="text" name="brandModel" class="ui-text-uppercase" placeholder="请输入品牌型号关键字"
                         validator="required" valid-name="品牌型号">
                  <!--<em class="icon-arrow-hollow-right ico-dn-arrow" data-img="1"></em>-->
              </div>

              <div class="input-wrap posi-rela">
                  <label>注册日期</label>
                  <input v-model="DS.vehicle_register" id="txtRegisterDate" type="text" placeholder="请选择注册日期" valid-name="注册日期">
                  <em class="icon-arrow-hollow-right ico-dn-arrow"></em>
              </div>


              <div class="input-wrap posi-rela">
                  <label>发动机号</label>
                  <input v-model="DS.vehicle_engine" id="txtEngineeNo" type="text" name="engineNum" class="ui-text-uppercase" placeholder="请准确输入发动机号"
                         validator="required" valid-name="发动机号">

              </div>

              <div id="ifPass" class="input-wrap chk-wrap" style="position: relative; z-index: 10;">
                  <label>是否过户</label>
                  <span class="chk-item" v-bind:class="{'chosen': DS.vehicle_transfer}" @click="tranferClick(1)" value="1">是</span>
                  <span class="chk-item" v-bind:class="{'chosen': !DS.vehicle_transfer}" @click="tranferClick(0)" value="0">否</span>
              </div>
              <div class="input-wrap posi-rela" style="display:none;">
                  <label>过户时间</label>
                  <input id="txtTransferTime" type="text" placeholder="请选择过户时间" readonly="readonly">
                  <em class="icon-arrow-hollow-right ico-dn-arrow"></em>
              </div>


              <div class="clear" style="height: 1em; background-color: #efeff4;"></div>
              <div class="carowner">车主信息(保险公司要求必填)</div>

              <div class="input-wrap">
                  <label>车主身份证号</label>
                  <input v-model="DS.applicant_id" id="txtIdCard" type="text" name="ownercardnum" placeholder="请输入车主身份证号"
                         validator="required  id_card min_length:15 " valid-name="车主身份证号">
              </div>

              <span class="btn-two validator_btn" @click="toNext()">提交</span>
          </form>

      </section>
    </div>

    <div id="pop_type_layer" v-bind:class="{hide: !panel}">
      <div class="pop-tit">
        选择车型
        <span id="icon-close" class="icon-close" @click="closePanel()"></span>
      </div>
      <section id="cs-type-wrap" class="com-frm-input">
          <p class="tip-info">请选择一个与您的车辆最为匹配的车型</p>
          <div id="carModelList">
            <ul id="carModelListUl" class="type-list" data-tauserid="" data-id="1">
                <li v-for="c in carModelList" id="{{c.code}}" class="type-lt-item" @click="changCar(c.code, c.vehicleId)">
                    <div class="type-lt-item-in">
                        <em class="icon-radio-nor"></em>
                        <p class="item-intro">{{c.name}}</p>
                        <p class="item-price">参考价格：<span class="pri">￥{{c.price}}</span></p>
                    </div>
                </li>
            </ul>
          </div>
          <a id="loadMore" class="norm-a" style="display:none;">加载更多</a>
          <a id="btnChooseInsur" class="btn-choose btn-blue" @click="toQuote()">选择投保方案</a>
          <!-- <a class="norm-a">没有找到</a> -->
      </section>
    </div>
  </div>
</template>


<script>
  import $ from 'jquery'
  import './assets/js/lib/flexible.js'
  import {watcher, dataStore} from '../setting'

  export default {
    ready() {
      // console.log(this.$route)
      this.autoSetCarData()
      this.panel = false
    },
    data() {
      return {
        chooseModel: false,
        panel: false,
        carModelList: [],
        DS: dataStore
      }
    },
    methods: {
      // 查车牌自动填充
      autoSetCarData: function() {
        if (this.DS.carNO != this.DS.searchCarNO) {
          var resource = this.$resource(this.$route.config.APIServer + 'offer/query')

          resource.get({carcard: this.DS.carNO, owner: this.DS.ownName}).then(function (response) {
            if (response.data.errcode == 0) {
              if(response.data.data) {
                this.DS.vehicle_code = response.data.data.autoModelCode
                this.DS.vehicle_engine = response.data.data.engineNo
                this.DS.vehicle_model = response.data.data.autoModelName
                this.DS.vehicle_vin = response.data.data.vehicleFrameNo
                this.DS.vehicle_register = response.data.data.firstRegisterDate

                this.DS.searchCarNO = this.DS.carNO
              }
            }
          }, function(response) {
            console.log('填充失败');
          });
        }
      },

      // 查车型选择
      searchCar: function() {
          var resource = this.$resource(this.$route.config.APIServer + 'offer/search')

          resource.get({key: this.DS.vehicle_model}).then(function (response) {
            if (response.data.errcode == 0 && response.data.data) {
              // console.log(response.data.data)
              this.carModelList = response.data.data
              $('#pop_type_layer').height($(window).height())
              $('#pop_type_layer').css('z-index', 999)
              // 拉起选择车型面板
              this.panel = true
            } else{
              alert('无法查询到车型数据')
            }
          }, function(response) {
            console.log('填充失败');
          });
      },

      // 过户按钮
      tranferClick: function(v) {
        this.DS.vehicle_transfer = v
        // console.log(v)
      },

      toNext: function() {
        // console.log('click')

        this.searchCar()
      },

      closePanel: function() {
        this.panel = false
        $('html, body').scrollTop("0px")
      },

      changCar: function(code, vehicleId) {
        this.DS.vehicle_code = code
        this.DS.vehicle_vin = vehicleId
        $('.chosen').removeClass('chosen')
        $('#' + code).addClass('chosen')
        // console.log(domObj)
        this.chooseModel = true
      },

      toQuote: function() {
        if (!this.chooseModel) {
          return alert('请选择车型')
        }

      }
    },
    watch: watcher
  }
</script>


<style lang=less>
  body{font-size: 24px;}
  @import "./assets/css/cx-step2.css";
  html, #cx-app-heaer, .binder-form-submit, .infoone, #step2-wrap{background-color: white;}
  .btn-blue{background-color: #ff9933}
</style>
