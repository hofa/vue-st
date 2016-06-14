var PE = {
    codeSend: true,

    _init: function() {
        $('#switch_qlogin').click(function() {
            $('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
            $('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
            $('#switch_bottom').animate({left:'0px',width:'50%'});
            $('#qlogin').css('display','none');
            $('#web_qr_login').css('display','block');
        });

        $('#switch_login').click(function() {

            $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
            $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
            $('#switch_bottom').animate({left:'154px',width:'61%'});

            $('#qlogin').css('display','block');
            $('#web_qr_login').css('display','none');
        });

        function logintab() {
            scrollTo(0);
            $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
            $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
            $('#switch_bottom').animate({left:'154px',width:'96px'});
            $('#qlogin').css('display','none');
            $('#web_qr_login').css('display','block');
        }
    },

    quickLogin: function() {
        $('#btn-qlogin').bind('click', function() {
            var mobile = $.trim($('#qmobile').val());
            var code = $.trim($('#qcode').val());
            if (mobile.length != 11) {
                $('#qmobile').focus();
                return CM.alert("手机号码格式不正确!");
            }

            if (code.length != 4) {
                $('#qcode').focus();
                return CM.alert("验证码格式不正确!");
            }
            RQ.quickLogin(mobile, code, false, PE.quickLoginCB);
        });
    },

    quickLoginCB: function(res) {
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

            RQ.sendPhoneCode(2, mobile, false, PE.sendPhoneCodeCB);
        });
    },

    sendPhoneCodeCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
    },

    appLogin: function() {
        $('#btn-login').bind('click', function() {
            var mobile = $.trim($('#mobile').val());
            var code = $.trim($('#code').val());
            if (mobile.length != 11) {
                $('#mobile').focus();
                return CM.alert("手机号码格式不正确!");
            }

            if (code.length < 6) {
                $('#code').focus();
                return CM.alert("密码格式不正确!");
            }
            RQ.appLogin(mobile, code, false, PE.appLoginCB);
        });
    },

    appLoginCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        CM.login(res.data);
        CM.rUrl();
    },

    init: function () {
        PE._init();
        PE.quickLogin();
        PE.sendPhoneCode();
        PE.appLogin();
    }
}

$(document).ready(function() {
    PE.init();
});