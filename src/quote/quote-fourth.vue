<template>
  <div id="quote-fourth">
    <header id="cx-app-heaer">
    <a class="icon-back " href="javascript:history.go(-1);"></a>
    报价结果
    </header>
    <section id="quote_result_wrap">
        <div class="compn-count" style="display:none;">
            <span class="fz-nrml">查询完毕</span>
            <span class="compn-count-total">共有<font class="cor-red" id="ftCompanyCount"></font>家公司给出报价</span>
        </div>
        <!-- <div id="agent_enquiry_url" class="compn-ing" style="display:none;">
        </div> -->
        <!-- <div class="compn-ing">
                   <span class="fz-nrml">正在为您询价中...</span>
                   <div class="progress-bar-wrap">
                       <div class="progress-bar-in">
                           <span id="spaProgress" data-percent="40"></span>
                       </div>
                   </div>
               </div>-->
        <div class="list-box">
            <p id="agentEnquiryUrl" class="insur-tit" style="display:none;" onClick="showFailReason(this)">代询价地址<i
                    class="icon-arrow-hollow-tel"></i></p>
            <div class="com-corn-box fail-wrap hide">
                <em class="ico_corner"></em>
                <p id="agentEnquiryUrlContent" class="fail-reason"></p>
            </div>
            <span id="spaBusinTit" class="insur-tit" style="display:none;"></span>
            <ul class="busin-insur-list">
                <li class="busin-insur-item fail " data-ifsucc="fail">
                    <img src="./assets/image/5.png">


                    <span class="insur-name">暂时无法报价，请联系路比保险客服</span>
                   <span class="insur-price" data-compnyid="" data-branchid="" > <a href="tel:075584357001">&nbsp;<i
                            class="icon-arrow-hollow-tel"></i></a></span>

                    <div class="com-corn-box fail-wrap hide">
                        <em class="ico_corner"></em>


                        <div class="btn-two"><a href="tel:075584357001">电话下单</a></div>
                        <p class="fail-info">（以上数据来自平安保险公司实时反馈）</p>
                    </div>

                </li>

                <li class="busin-insur-item fail " data-ifsucc="fail">
                    <img src="./assets/image/3.png">


                    <span class="insur-name">暂时无法报价，请联系路比保险客服</span>
                    <span class="insur-price" data-compnyid="" data-branchid="[%=errcode%]" ><a href="tel:075584357001">&nbsp;<i
                            class="icon-arrow-hollow-tel"></i></a></span>

                    <div class="com-corn-box fail-wrap hide">
                        <em class="ico_corner"></em>


                        <div class="btn-two"><a href="tel:075584357001">电话下单</a></div>
                        <p class="fail-info">（以上数据来自太平洋保险公司实时反馈）</p>
                    </div>

                </li>

                <li class="busin-insur-item fail " data-ifsucc="fail">
                    <img src="./assets/image/1.png">


                    <span class="insur-name">暂时无法报价，请联系路比保险客服</span>
                    <span class="insur-price" data-compnyid="" data-branchid="[%=errcode%]"><a href="tel:075584357001">&nbsp;<i
                            class="icon-arrow-hollow-tel"></i></a></span>

                    <div class="com-corn-box fail-wrap hide">
                        <em class="ico_corner"></em>


                        <div class="btn-two"><a href="tel:075584357001">电话下单</a></div>
                        <p class="fail-info">（以上数据来自安盛天平保险公司实时反馈）</p>
                    </div>

                </li>

                <li class="busin-insur-item fail " data-ifsucc="fail">
                    <img src="./assets/image/6.png">


                    <span class="insur-name"><a href=tel:075584357001>暂时无法报价，请联系路比保险客服</a></span>
                    <span class="insur-price" data-compnyid="" data-branchid="[%=errcode%]" ><a href="tel:075584357001">&nbsp;<i
                            class="icon-arrow-hollow-tel"></i></a></span>

                    <div class="com-corn-box fail-wrap hide">
                        <em class="ico_corner"></em>


                        <div class="btn-two"><a href="tel:075584357001">电话下单</a></div>
                        <p class="fail-info">（以上数据来自阳光保险公司实时反馈）</p>
                    </div>

                </li>


            </ul>

            <button style="width: 400px;" id="carEnPut" class="btn btn-large" hidden="hidden">查询</button>
        </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import './assets/js/lib/flexible.js'
  import {watcher, dataStore} from '../setting'

  export default {
    ready() {
      this.quote()
    },
    data() {
      return {
        qc: [
          {
            "code": "TAIC",
            "name": "天安保险股份有限公司",
            "channel": "sys"
          }, {
            "code": "MACN",
            "name": "民安保险（中国）有限公司",
            "channel": "sys"
          }, {
            "code": "FDBX",
            "name": "富德财产保险股份有限公司",
            "channel": "sys"
          }, {
            "code": "MACN",
            "name": "",
            "channel": "_cisg"
          }
        ],
        DS: dataStore
      }
    },
    methods: {
      quote: function() {
        for(let s in this.qc) {
          this._quote(this.qc[s].code, this.qc[s].name, this.qc[s].channel)
        }
      },

      _quote: function(company, name, channel) {
        var struct = {
          "owner": {
            "name": this.DS.ownName,
            "type": "01",
            "id": this.DS.applicant_id,
            "birthday": this.getBirthday(this.DS.applicant_id),
            "sex": this.getSexById(this.DS.applicant_id)
          },

          "vehicle": {
            "newcar": this.DS.vehicle_newcar ? 1 : 0,
            "transfer": this.DS.vehicle_transfer,
            "transdate": this.DS.vehicle_transferDate,
            "carcard": this.DS.carNO.toUpperCase(),
            "engine": this.DS.vehicle_engine,
            "vin": this.DS.vehicle_vin,
            "register": this.DS.vehicle_register,
            "model": this.DS.vehicle_model,
            "id": this.DS.vehicle_id,
            "code": this.DS.vehicle_code
          },
          "c01": {
            "startDate": this.DS.c01_startDate,
            "dutys": []
          },
          "c51": {
            "startDate": this.DS.c51_startDate
          },
          "tax": {
            "type": this.DS.tax_type
          },
          "company": company
        }

        if (this.DS.c01_duty_01) {
          struct['c01']['dutys'].push({
                        'code': '01',
                        'deduction': this.DS.c01_duty_01_deduction,
                      })
        }

        if (this.DS.c01_duty_02) {
          struct['c01']['dutys'].push({
                        'code': '02',
                        'deduction': this.DS.c01_duty_02_deduction,
                        'amount': this.DS.c01_duty_02_amount,
                      })
        }

        if (this.DS.c01_duty_04) {
          struct['c01']['dutys'].push({
                        'code': '04',
                        'deduction': this.DS.c01_duty_04_deduction,
                        'amount': this.DS.c01_duty_04_amount,
                      })
        }

        if (this.DS.c01_duty_05) {
          struct['c01']['dutys'].push({
                        'code': '05',
                        'deduction': this.DS.c01_duty_05_deduction,
                        'amount': this.DS.c01_duty_05_amount,
                        'seat': this.DS.c01_duty_05_seat,
                      })
        }

        if (this.DS.c01_duty_08) {
          struct['c01']['dutys'].push({
                        'code': '08',
                        'deduction': this.DS.c01_duty_08_deduction,
                        'kind': this.DS.c01_duty_08_kind,
                      })
        }

        if (this.DS.c01_duty_17) {
          struct['c01']['dutys'].push({
                        'code': '17',
                        'deduction': this.DS.c01_duty_17_deduction,
                        'amount': this.DS.c01_duty_17_amount,
                      })
        }

        if (this.DS.c01_duty_41) {
          struct['c01']['dutys'].push({
                        'code': '41',
                        'deduction': this.DS.c01_duty_41_deduction,
                      })
        }

        if (this.DS.c01_duty_03) {
          struct['c01']['dutys'].push({
                        'code': '03',
                        'deduction': this.DS.c01_duty_03_deduction,
                      })
        }

        if (this.DS.c01_duty_18) {
          struct['c01']['dutys'].push({
                        'code': '18',
                        'deduction': this.DS.c01_duty_18_deduction,
                      })
        }

        $.ajax({
          type: "POST",
          url: this.$route.config.APIServer + "offer/quote?q=" + this.DS.quoteNumber + '&channel=' + channel,
          data: JSON.stringify(struct),
          dataType: "json",
          beforeSend: function () {

          },
          success: function (data) {
              console.log(channel, company, data)
          }
        })
      },

      /**
      * 1 男 0女
      */
      getSexById: function(id){
        // 第二代
        if (id.length == 18) {
          return parseInt(id[16]) % 2 == 0 ? 0 : 1
        }
        // 第一代
        if (id.length == 15) {
          return parseInt(id[14]) % 2 == 0? 0 : 1
        }

        return 1
      },
      getBirthday: function(id) {
        return id[6] + id[7] + id[8]+ id[9] + '-' + id[10] + id[11] + '-' + id[12] + id[13]
      }


    },
    watch: watcher
  }

</script>
<style lang=less>
  @import "./assets/css/result.css";
  .insur-name a{color:#666; font-size: 0.375rem;}
  .bxcat{margin: 0 auto;}
  .bxcatlist{ margin-top: 0.5em;}
  .bxcat  li{ float: left; width: 25%; font-size: 0.4rem; text-align: center; margin-bottom: 0.2rem;}
  .bxcatlist li{float: left; width: 25%; font-size: 0.3rem; margin-top: 0.1rem; text-align: center; }

</style>
