var PE = {
    codeSend: true,
    uid: 0,
    checkMobileExist: function () {
        var mobile = $.trim($('#qmobile').val());
        RQ.checkMobileExist(mobile, false, PE.checkMobileExistCB);
    },

    checkMobileExistCB: function (res) {
        if (typeof res.data == 'undefined' || typeof res.data.uid == 'undefined') {
            return CM.alert(res.errmsg);
        }
        
        PE.uid = typeof res.data.uid == "undefined" ? res.uid : res.data.uid;
        var mobile = $.trim($('#qmobile').val());
        RQ.sendPhoneCode(1, mobile, false, PE.sendPhoneCodeCB);
    },

    findPassword: function() {
        $('#btn-reset').bind('click', function() {
            var mobile = $.trim($('#qmobile').val());
            var code = $.trim($('#qcode').val());
            var password = $.trim($('#code').val());


            if (mobile.length != 11) {
                $('#qmobile').focus();
                return CM.alert("手机号码格式不正确!");
            }

            if (code.length != 4) {
                $('#qcode').focus();
                return CM.alert("验证码格式不正确!");
            }


            if (password.length < 6) {
                $('#code').focus();
                return CM.alert("密码不能小于6位");
            }

            if (PE.uid == 0) {
                return CM.alert("程序异常，请刷新页面重试！")
            }
            RQ.findPassword(mobile, PE.uid, password, code, false, PE.findPasswordCB);
        });
    },

    findPasswordCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        CM.login(res.data);
        CM.rUrl();
    },

    sendPhoneCode: function(res) {
        $('#btn-qsend').bind('click', function() {

            var mobile = $.trim($('#qmobile').val());
            if (mobile.length != 11) {
                $('#qmobile').focus();
                return CM.alert("手机号码格式不正确!");
            }

            if (!PE.codeSend) return false;
            PE.codeSend = false;

            console.log('倒计时');
            // 倒计时
            CM.countdown('ql', 120 * 1000
            ,  function(c) {
                $('#btn-qsend').text(parseInt(c/1000));
            }, function () {
                $('#btn-qsend').text('获取验证码');
                PE.codeSend = true;
            }, 1000);

            PE.checkMobileExist();
        });
    },


    sendPhoneCodeCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
    },

    init: function () {
        PE.findPassword();
        PE.sendPhoneCode();
    }
}

$(document).ready(function() {
    PE.init();
});