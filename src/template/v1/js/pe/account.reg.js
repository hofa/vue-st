var PE = {
    codeSend: true,

    appRegister: function() {
        $('#btn-register').bind('click', function() {
            var mobile = $.trim($('#qmobile').val());
            var password = $.trim($('#code').val());
            var code = $.trim($('#qcode').val());

            if (!$('#checkbox-1-1').prop('checked'))
            {
                return CM.alert("同意 《鼎然科技用户使用协议! 》才能继续下一步");
            }

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
            
            RQ.appRegister(mobile, password, code, false, PE.appRegisterCB);
        });
    },

    appRegisterCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        CM.login(res.data);
        CM.r('/h5/v1/main');
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

            RQ.sendPhoneCode(3, mobile, false, PE.sendPhoneCodeCB);
        });
    },

    sendPhoneCodeCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
    },

    init: function () {
        PE.appRegister();
        PE.sendPhoneCode();
    }
}

$(document).ready(function() {
    PE.init();
});