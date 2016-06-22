<template>
  <div id="quote-photograph">
    <div id="wrapper">
      <header id="cx-app-heaer">
          <a class="icon-back " v-link="{path:'/quote'}"></a>
          上传证件照
      </header>
      <section id="step2-wrap" class="com-frm-input">
          <!-- <script type="text/html" id="tplInfo">-->


          <div class="tips" >证件信息仅限于车辆投保使用，请放心上传。上传后工
              作人员将在30分钟内与您联系。</div>


          <form class="binder-form-submit" action="http://api.ubi001.com" data-command="addUserCarInfoForManual" data-submit="addUserCarInfoForManual()">

              <div class="input-wrap">
                  <label>手机号码</label>
                  <input v-model="DS.mobile" id="txtmobile" type="text" name="upmobile" placeholder="请输入手机号码" validator="required   id_card min_length:15 " valid-name="手机号码">
              </div>

              <div class="clearcor"></div>

              <div class="photone">

                  <div class="form-group" id="showPic" >
                      <label for="image"class="col-sm-2 control-label"></label>
                      <div class="col-sm-10">
                          <img src="./assets/image/xsz.png" />
                      </div>
                  </div>

                  <input type="hidden" id="image" name="image" value="" />

                  <div class="btn-blue" id="pickfiles">上传行驶证</div>

              </div>
              <div class="clearcor" style="margin-top:20px;"></div>

              <div class="phototwo">

                  <div class="form-group" id="showPictwo" >
                      <label for="image"class="col-sm-2 control-label"></label>
                      <div class="col-sm-10">
                          <img src="./assets/image/jsz.png" />
                      </div>
                  </div>

                  <input type="hidden" id="imagetwo" name="image" value="" />

                  <div class="btn-blue" id="xszup">上传驾驶证</div>



              </div>


              <div class="btn-org" id="btnup" @click="uploading">保存并上传</div>
          </form>
          <!-- </script>-->
      </section>
    </div>

    <modal :show.sync="loadingModal" :type="2" :lock="true">
      <h3 slot="body"><img src="./assets/image/loading_5.gif"></h3>
    </modal>

    <modal :show.sync="msgModal" :type="3" :lock="false">
      <h3 slot="body">{{msg}}</h3>
    </modal>

    <modal :show.sync="tipsModal" :type="1" :lock="false" :timeout="2000">
      <h3 slot="body">{{msg}}</h3>
    </modal>
  </div>
</template>

<script>
  import {watcher, dataStore} from '../setting'
  import modal from './widget-modal'
  var $script = require("scriptjs")
  export default {
    ready() {
      var that = this
      $script("http://m.ubi001.com/web/quote/qiniujs/moxie.js", function () {
          $script("http://m.ubi001.com/web/quote/qiniujs/plupload.dev.js", function () {
              $script("http://m.ubi001.com/web/quote/qiniujs/qiniu.min.js", function () {
                that.bindUpload()
              })
          })
      })
    },
    data() {
      return {
        loadingModal: false,
        msgModal: false,
        tipsModal: false,
        msg: "",
        DS: dataStore,

        // 驾驶证图片
        driverImage: '',
        // 行驶证图片
        travelImage: ''
      }
    },
    methods: {

      bindUpload: function () {
        var uploader= Qiniu.uploader({
            runtimes: 'html5,flash,html4',    //上传模式,依次退化
            browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
            uptoken_url: 'http://api.ubi001.com/v1/offerStep/getUpToken',
            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
            // uptoken : '',
            //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
    //  unique_names: true,
            // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
    //     save_key: true,
            // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
            domain: '7xqedc.com2.z0.glb.qiniucdn.com',
            get_new_uptoken: false,
            //bucket 域名，下载资源时用到，**必需**
    //  container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
            max_file_size: '5mb',           //最大文件体积限制
            flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
            max_retries: 3,                   //上传失败最大重试次数
            dragdrop: true,                   //开启可拖曳上传
    //  drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',                //分块上传时，每片的体积
            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        // 文件添加进队列后,处理相关的事情
                    });
                },
                'BeforeUpload': function(up, file) {
                    // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': function(up, file) {
                    // 每个文件上传时,处理相关的事情
                    $('#pickfiles').html('正在上传...');
                },
                'FileUploaded': function(up, file, info) {
                    // 每个文件上传成功后,处理相关的事情
                    var data    = $.parseJSON(info);
                    $('#image').val(data.key);
                    $('#showPic').show();
                    $('#showPic img').attr('src', 'http://7xqedc.com2.z0.glb.qiniucdn.com/' + data.key);
                },
                'Error': function(up, err, errTip) {
                    //上传出错时,处理相关的事情
                    alert('上传错误:' + err);
                },
                'UploadComplete': function() {
                    //队列文件处理完毕后,处理相关的事情
                    $('#pickfiles').html('上传行驶证');
                },
                'Key': function(up, file) {
                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    // 该配置必须要在 unique_names: false , save_key: false 时才生效
                    var key = "";
                    // do something with key here
                    return file.id;
                }
            }
        })



        var Q2 = new QiniuJsSDK();

        var uploadertwo = Q2.uploader({
            runtimes: 'html5,flash,html4',    //上传模式,依次退化
            browse_button: 'xszup',       //上传选择的点选按钮，**必需**
        uptoken_url: 'http://api.ubi001.com/v1/offerStep/getUpToken',
            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
            // uptoken : 'H8y9gcMMyb-EvMTClnomjm9Adm0tgEvJvN_S6azn:0xsGZYUWnnvZR3WCHvG9SwIDfS0=:eyJzY29wZSI6ImRyLWNhci1waWMiLCJkZWFkbGluZSI6MTQ2MjY5NjA0N30=',
            //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
    //  unique_names: true,
            // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
    //     save_key: true,
            // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
            domain: '7xqedc.com2.z0.glb.qiniucdn.com',
        get_new_uptoken: false,
            //bucket 域名，下载资源时用到，**必需**
    //  container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
            max_file_size: '5mb',           //最大文件体积限制
            flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
            max_retries: 3,                   //上传失败最大重试次数
            dragdrop: true,                   //开启可拖曳上传
    //  drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',                //分块上传时，每片的体积
            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        // 文件添加进队列后,处理相关的事情
                    });
                },
                'BeforeUpload': function(up, file) {
                    // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': function(up, file) {
                    // 每个文件上传时,处理相关的事情
                },
                'FileUploaded': function(up, file, info) {
                    // 每个文件上传成功后,处理相关的事情
                    var data    = $.parseJSON(info);
                    $('#imagetwo').val(data.key);
                    $('#showPictwo').show();
                    $('#showPictwo img').attr('src', 'http://7xqedc.com2.z0.glb.qiniucdn.com/' + data.key);
                },
                'Error': function(up, err, errTip) {
                    //上传出错时,处理相关的事情
                },
                'UploadComplete': function() {
                    //队列文件处理完毕后,处理相关的事情
                },
                'Key': function(up, file) {
                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    // 该配置必须要在 unique_names: false , save_key: false 时才生效
                    var key = "";
                    // do something with key here
                    return file.id;
                }
            }
        })
      },

      uploading: function() {
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;

        if (this.DS.mobile == '') {
            return this.tips("手机号码不能为空!")
        }

        if(this.DS.mobile.length != 11) {
          return this.tips("请输入有效的手机号码")
        }

        if(!myreg.test(this.DS.mobile)) {
            return this.tips("请输入有效的手机号码!")
        }

        if(this.travelImage == '') {
          return this.tips("请上传行驶证图片")
        }

        if(this.driverImage == '') {
          return this.tips("请上传驾驶证图片")
        }

        var resource = this.$resource(this.$route.config.APIServer + 'offer/getCityList')
        this.loadingModal = true
        resource.get({quote_number: this.DS.quoteNumber, mobile: this.DS.mobile, driver_license: this.travelImage, driving_license: this.driverImage}).then(function (response) {
          if (response.data.errcode == 0) {
            this.loadingModal = false
            if (response.data.data) {

            }
          } else {
            this.alert('请重新上传图片');
          }
        }, function(response) {
          this.alert('请上传图片失败');
        });
      },

      alert: function(msg) {
        this.msgModal = true
        this.msg = msg
      },

      tips: function(msg) {
        this.tipsModal = true
        this.msg = msg
      }
    },
    watch: watcher,
    components: {
      modal: modal
    }
  }
</script>

<style lang=less scoped>

@import "./assets/css/cx-step2.css";
</style>
