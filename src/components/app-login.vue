<template>
  <div id="app-login">
    <section id="login" class="login">
        <div class="logo"> </div>
        <div class="wrapper">
            <div class="header">
                <div class="switch" id="switch">
                    <a class="" v-bind:class="{'switch_btn_focus': !isQuick, 'switch_btn': isQuick}" id="switch_qlogin" href="javascript:void(0);" tabindex="7" @click="switchs()">路比帐号登录</a>

                    <a class="" id="switch_login" v-bind:class="{'switch_btn_focus': isQuick, 'switch_btn': !isQuick}" href="javascript:void(0);" tabindex="8" @click="switchs()">手机号快捷登录</a>
                    <div class="switch_bottom" id="switch_bottom" v-bind:class="{'leftBottom': !isQuick, 'rightBottom': isQuick}">
                    </div>
                </div>
            </div>

            <div class="web_qr_login" id="web_qr_login" v-bind:class="{'show': !isQuick, 'hide': isQuick}">
            <form id="loginForm" method="post" action="javascript:;">
                <ul class="new_register">
                    <li><span class=" ico_email">帐号</span>
                        <input type="text" v-model="mobile" placeholder="请输入用户名/手机号码" class="r_email" />
                        <em class=" ico_input_right fr"></em><em class=" ico_input_error fr hide"></em>
                    </li>
                    <li><span class=" ico_lock">密码</span>
                        <input type="password" v-model="password" placeholder="请输入登录密码" class="r_psw" maxlength="16" />
                        <em class=" ico_input_right fr hide"></em><em class=" ico_input_error fr"></em>
                    </li>

                </ul>

                <input type="submit" class="btn_gray" id="btn-login" value="登  录" />
                <!--当条件满足时，将class"btn_gray"切换为"btn_blue"-->
                <!--完成这步后，转到填写车辆信息"reg_vehicle.html"-->
                <div class="register_text"><a href="../login/register.html">免费注册，即送车险UBI</a> <a href="../accountPwd/toReset.html" class="resetPwd fr">忘记密码</a></div>


            </form>
            </div>


            <div class="qlogin" id="qlogin"  v-bind:class="{'show': isQuick, 'hide': !isQuick}">


                <form id="loginForm" method="post" action="javascript:;">
                    <ul class="qnew_register">
                        <li><span class=" ico_phone" >手机号</span>
                            <input type="text" v-model="mobile" placeholder="请输入手机号码" class="r_mobile" />
                        </li>
                        <li><span class=" ico_ver">验证码</span>
                            <input type="text" v-model="code" placeholder="请输入验证码" class="r_vcode" maxlength="16" />
                            <a href="javascript:void(0)" class="btn_gray_s fr">获取验证码</a>
                        </li>
                    </ul>

                    <input type="submit" class="btn_gray" id="btn-login" value="登  录" />
                    <!--当条件满足时，将class"btn_gray"切换为"btn_blue"-->
                    <!--完成这步后，转到填写车辆信息"reg_vehicle.html"-->

                </form>

                </div>


            </div>

        </div>
    </section>
  </div>
</template>


<script>
  import request from '../request'
  export default {
    ready: function() {
      // var RQ = new request
      request.g('http://api.ubi001.com/v1/', {id: 1}, false, function(res) {
        console.log(res)
      });
      // var resource = this.$resource('http://api.ubi001.com/v1/')

      // get item
      // resource.get({id: 1}).then(function (response) {
      //     this.$set('item', response.item)
      // });

      // save item
      // resource.save({id: 1}).then(function (response) {
      //     // success callback
      //     console.log('success');
      // }, function (response) {
      //     // error callback
      //     console.log('error');
      // });

      // delete item
      // resource.delete({id: 1}).then(function (response) {
      //     // success callback
      // }, function (response) {
      //     // error callback
      // });

      // console.log(resource);
    },
    data: function() {
      return {

        message: "hello world",
        isQuick: true,

        mobile: "",
        password: "",
        code: "",

        counter: 1
      }
    },
    methods: {
      alert: function() {
        // alert(1)
        this.$route.router.go('/login')
        // console.log(this.$route.router.go('/foo'))
      },
      switchs: function() {
        this.isQuick = this.counter % 2 ? false : true
        this.counter++
      }

    }
  }
</script>

<style lang=less>
.leftBottom {
  position: absolute; width: 50%; left: 0px;
}
.rightBottom {
  position: absolute; width: 50%; right: 0px;
}
.show {
  display: block;
}

.hide {
  display: none;
}
</style>
