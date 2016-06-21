<template>
  <div id="quote-third">
    <div id="page-scheme">
      <header id="cx-app-heaer">
          <a class="icon-back " v-link="{path: '/quote-second'}"></a>
          投保方案
      </header>
      <section id="scheme-wrap">
          <div class="com-margin-box">
              <span class="insur-type-tit">购买险种</span>
              <div class="com-corn-box insur-type-con">
                  <em class="ico_corner"></em>
                  <p class="insur-type-item chosen" style="display: none;" data-type="sy" onClick="chooseUpTwo(this);">
                      <span class="icon-radio-nor "></span>
                      &nbsp;商业险
                  </p>
                  <p class="insur-type-item chosen" v-bind:class="{'chosen': DS.tax_type}" @click="chooseTax()">
                      <span class="icon-radio-nor "></span>
                      &nbsp;交强险、代缴车船税
                  </p>

              </div>
              </div>
          <div class="insur-box basic-insur-box">
              <div class="tit-box">
                  <span>基本险</span>
                  <b id="ico-why" class="  " data="01"></b>
              </div>
              <ul>

                  <li class="sg-insur-item" id="uqCarLosInsur">
                      <div class="item-up" @click="switchTo('01', $this)">
                          <div class="sg-insur-item-tit" v-bind:class="{'chosen': DS.c01_duty_01}">
                              <span class="icon-radio-nor "></span>
                              &nbsp;
                              车辆损失险
                          </div>

                          <div class="select-out " v-bind:class="{'hide': !DS.c01_duty_01}"></div>
                          <span class="sg-insur-item-mp" v-bind:class="{'gray': !DS.c01_duty_01_deduction, 'hide': !DS.c01_duty_01}" @click="deductionTo('01', $event)">不计免赔</span>
                      </div>
                  </li>


                  <li class="sg-insur-item">
                      <div class="item-up" @click="switchTo('02', $this)">

                          <div class="sg-insur-item-tit"  v-bind:class="{'chosen': DS.c01_duty_02}">
                              <span class="icon-radio-nor "></span>
                              &nbsp;
                              第三者责任险
                          </div>


                          <div v-bind:class="{'hide': !DS.c01_duty_02}" class="select-out ">
                              <select v-model="DS.c01_duty_02_amount" @click="stopEvent($event)">
                                  <option value="5">5万元</option>
                                  <option value="10">10万元</option>
                                  <option value="15">15万元</option>
                                  <option value="20">20万元</option>
                                  <option value="30">30万元</option>
                                  <option value="50">50万元</option>
                                  <option value="100">100万元</option>
                                  <option value="150">150万元</option>
                                  <option value="200">200万元</option>
                              </select>
                          </div>

                          <span  class="sg-insur-item-mp" v-bind:class="{'gray': !DS.c01_duty_02_deduction, 'hide': !DS.c01_duty_02}" @click="deductionTo('02', $event)">不计免赔</span>
                      </div>
                  </li>


                  <li class="sg-insur-item">
                      <div class="item-up" @click="switchTo('03', $this)">

                          <div class="sg-insur-item-tit" v-bind:class="{'chosen': DS.c01_duty_03}">
                              <span class="icon-radio-nor "></span>
                              &nbsp;
                              全车盗抢险
                          </div>


                          <div v-bind:class="{'hide': !DS.c01_duty_03}" class="select-out " ></div>

                          <span class="sg-insur-item-mp" v-bind:class="{'gray': !DS.c01_duty_03_deduction, 'hide': !DS.c01_duty_03}" @click="deductionTo('03', $event)">不计免赔</span>
                      </div>
                  </li>


                  <li class="sg-insur-item">
                      <div class="item-up" @click="switchTo('04', $this)">

                          <div class="sg-insur-item-tit" v-bind:class="{'chosen': DS.c01_duty_04}">
                              <span class="icon-radio-nor "></span>
                              &nbsp;
                              司机座位责任险
                          </div>


                          <div v-bind:class="{'hide': !DS.c01_duty_04}" class="select-out ">
                              <select v-model="DS.c01_duty_04_amount" @click="stopEvent($event)">
                                  <option value="5000">5000元</option>
                                  <option value="10000">1万元</option>
                                  <option value="20000">2万元</option>
                                  <option value="30000">3万元</option>
                                  <option value="40000">4万元</option>
                                  <option value="50000">5万元</option>
                                  <option value="100000">10万元</option>
                                  <option value="200000">20万元</option>
                              </select>
                          </div>

                          <span class="sg-insur-item-mp"  v-bind:class="{'gray': !DS.c01_duty_04_deduction, 'hide': !DS.c01_duty_04}" @click="deductionTo('04', $event)">不计免赔</span>
                      </div>
                  </li>


                  <li class="sg-insur-item">
                      <div class="item-up" @click="switchTo('05', $this)">

                          <div class="sg-insur-item-tit" v-bind:class="{'chosen': DS.c01_duty_05}">
                              <span class="icon-radio-nor "></span>
                              &nbsp;
                              乘客座位责任险
                          </div>


                          <div v-bind:class="{'hide': !DS.c01_duty_05}" class="select-out " style="margin-top: 0.5rem;">
                              <select v-model="DS.c01_duty_05_amount" @click="stopEvent($event)">
                                  <option value="5000">5000元</option>
                                  <option value="10000">1万元</option>
                                  <option value="20000">2万元</option>
                                  <option value="30000">3万元</option>
                                  <option value="40000">4万元</option>
                                  <option value="50000">5万元</option>
                                  <option value="100000">10万元</option>
                                  <option value="200000">20万元</option>
                                  <option value="500000">50万元</option>
                              </select>


                          </div>
                          <div class="seatt" v-bind:class="{'hide': !DS.c01_duty_05}">
                          <select id="seat" style="margin-top: 0.1rem;" v-model="DS.c01_duty_05_seat" @click="stopEvent($event)">
                              <option value="4">4</option>
                              <option value="6">6</option>
                          </select>


                          <span class="sg-insur-item-mp" class="sg-insur-item-mp"  v-bind:class="{'gray': !DS.c01_duty_05_deduction, 'hide': !DS.c01_duty_05}" @click="deductionTo('05', $event)">不计免赔</span>
                          </div>
                      </div>
                  </li>


              </ul>
          </div>

          <div class="insur-box attach-insur-box">
              <div class="tit-box">
                  <span>附加险</span>
              </div>
              <ul>

                  <li class="sg-insur-item">
                      <div class="item-up" @click="switchTo('18', $this)">
                          <div class="sg-insur-item-tit " v-bind:class="{'chosen': DS.c01_duty_18}">
                              <span class="icon-radio-nor"></span>
                              &nbsp;
                              自燃损失险
                          </div>

                          <div class="select-out" v-bind:class="{'hide': !DS.c01_duty_18}"></div>

                          <span class="sg-insur-item-mp"  v-bind:class="{'gray': !DS.c01_duty_18_deduction, 'hide': !DS.c01_duty_18}" @click="deductionTo('18', $event)">不计免赔</span>
                      </div>
                  </li>

                  <li class="sg-insur-item">
                      <div class="item-up" @click="switchTo('08', $this)">
                          <div class="sg-insur-item-tit " v-bind:class="{'chosen': DS.c01_duty_08}">
                              <span class="icon-radio-nor"></span>
                              &nbsp;
                              玻璃单独破碎险
                          </div>

                          <div class="select-out" v-bind:class="{'hide': !DS.c01_duty_08}">
                              <select v-model="DS.c01_duty_08_kind" @click="stopEvent($event)">
                                  <option value="0">国产</option>
                                  <option value="1">进口</option>
                              </select>
                          </div>
                          <span class="sg-insur-item-mp" v-bind:class="{'gray': !DS.c01_duty_08_deduction, 'hide': !DS.c01_duty_08}" @click="deductionTo('08', $event)">不计免赔</span>
                      </div>
                  </li>

                  <li class="sg-insur-item">
                      <div class="item-up" @click="switchTo('17', $this)">
                          <div class="sg-insur-item-tit " v-bind:class="{'chosen': DS.c01_duty_17}">
                              <span class="icon-radio-nor"></span>
                              &nbsp;
                              车身划痕险
                          </div>

                          <div class="select-out" v-bind:class="{'hide': !DS.c01_duty_17}">
                              <select v-model="DS.c01_duty_17_amount" @click="stopEvent($event)">
                                  <option value="2000">2000元</option>
                                  <option value="5000">5000元</option>
                                  <option value="10000">10000元</option>
                                  <option value="20000">2万元</option>
                              </select>
                          </div>
                          <span class="sg-insur-item-mp"  v-bind:class="{'gray': !DS.c01_duty_17_deduction, 'hide': !DS.c01_duty_17}" @click="deductionTo('17', $event)">不计免赔</span>
                      </div>
                  </li>

                  <li class="sg-insur-item">
                      <div class="item-up" @click="switchTo('41', $this)">
                          <div class="sg-insur-item-tit " v-bind:class="{'chosen': DS.c01_duty_41}">
                              <span class="icon-radio-nor"></span>
                              &nbsp;
                              发动机涉水损失险
                          </div>

                          <div class="select-out" v-bind:class="{'hide': !DS.c01_duty_41}"></div>
                          <span class="sg-insur-item-mp" v-bind:class="{'gray': !DS.c01_duty_41_deduction, 'hide': !DS.c01_duty_41}" @click="deductionTo('41', $event)">不计免赔</span>
                      </div>
                  </li>

              </ul>
          </div>
          <div class="insurance-buttn">    <a href="record-detail.html" class="btn_blue" >保障范围</a>      <a @click="toNext()"  class="btn_org" >立即比价</a></div>
        <!--  <div class="btn-org" onClick="queryPrice(this);">询&nbsp;价</div>-->
      </section>
    </div>

    <div id="layermbox2" class="layermbox layermbox0 hide" index="2">
      <div class="laymshade"></div>
      <div class="layermmain">
          <div class="section">
              <div class="layermchild  layermanim">
                  <div class="layermcont">
                      <h4 style="height:1.35938rem;line-height:1.35938rem;border-bottom:1px solid #ddd; text-align: center;font-size:0.4375rem;color:#999;">保单信息</h4>
                      <div id="loading_wrap"></div>
                      <div class="uqInsurPopLayer-in" style="visibility: visible;">
                          <p style="height:1.0625rem;line-height:1.0625rem;padding-left:0.4375rem;background-color:#f9f9f9;color:#999;font-size:0.375rem;text-align:left;">您的保险起期如下，请确认</p>
                          <div class="com-frm-input">
                              <div class="input-wrap posi-rela">
                                  <label>商业险起期</label>
                                  <input id="sy_date" type="date" v-model="DS.c01_startDate" name="registerDate" placeholder="请选择商业险起期" validator="required" valid-name="商业险起期"></div>
                              <div class="input-wrap posi-rela">
                                  <label>交强险起期</label>
                                  <input id="jq_date" type="date" v-model="DS.c51_startDate" placeholder="请选择交强险起期" validator="required" valid-name="商业险起期"></div>
                          </div>
                          <div class="box">
                              <div class="key" style="color:#ff9933; padding-left:0.5em; display: block;">生效日期哪里找?</div>
                              <div class="text" style="font-size:0.4375rem; display: none;">请您在您的车险保单中间位置查找您的保 险期间，
                                  <br> 正确填写您本次投保的保险起期;
                                  <br> 新车用户的保单会在投保日的次日生效。
                                  <br> </div>
                          </div>
                          <div id="btnConfirm" @click="toQuote()">确认</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>


  </div>
</template>

<script>
  // import $ from 'jquery'
  // import './assets/js/lib/flexible.js'
  import {watcher, dataStore} from '../setting'
  // import layer from './assets/js/third/layer.js'

  export default {
    ready() {
      // console.log(this.$route)

    },
    data() {
      return {
        DS: dataStore
      }
    },
    methods: {
      // 商业险种选择
      switchTo: function(code, dom) {
        // console.log('switchTo' + code)
        this.DS['c01_duty_'+code] = this.DS['c01_duty_'+code] == 1 ? 0 : 1
      },

      // 不计免赔选择
      deductionTo: function(code, event) {
        // console.log('deductionTo' + code)
        event.preventDefault()
        event.stopPropagation()
        this.DS['c01_duty_'+code+'_deduction'] = this.DS['c01_duty_'+code+'_deduction'] == 1 ? 0 : 1

      },

      // 车船税选择
      chooseTax: function() {
        this.DS.tax_type = this.DS.tax_type == 1 ? 0 : 1
      },

      // 阻止事件传播
      stopEvent: function(event) {
        event.preventDefault()
        event.stopPropagation()
      },

      // 点击在线比价
      toNext: function() {
        $('#layermbox2 .laymshade').click(function() {
          $('#layermbox2').addClass('hide')
        })
        $('#layermbox2').removeClass('hide')
      },

      toQuote: function() {
        // console.log(this.DS.c51_startDate.length)
        if (this.DS.c51_startDate.length != 10) {
          return alert('请选择交强险起期')
        }

        if (this.DS.c01_startDate.length != 10) {
          return alert('请选择商业险起期')
        }

        $('#layermbox2').addClass('hide')
        $('#layermbox2 .laymshade').unbind('click')

        this.$route.router.go('/quote-fourth')
      }
    },
    watch: watcher
  }

</script>
<style lang=less>
  @import "./assets/css/cx-insur-scheme.css";
  body{font-size: 36px;background-color: white;}
  .seatt .sg-insur-item-mp {
            margin-left: 0.375rem;
            margin-right: 0.15625rem;
            padding-left: 0.3125rem;
            padding-right: 0.3125rem;
            padding-top: 0.09375rem;
            padding-bottom: 0.09375rem;
            background-color: #ff9933;
            color: #fff;
            font-size: 0.28125rem;
            text-align: center;
        }

  .seatt .gray{ background-color: #ddd;}
  #scheme-wrap{background-color: white;}

</style>
