// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 通用方法
 */
var CM = {
    // lt: 7200000, // 后台登录保存时间
    r: function (addr) {
        // console.log(addr);
        // return;
        window.location = addr;
    },
    rIndex: function () {
        this.r(Mserver + 'h5/v1/main?rurl=' + encodeURI(encodeURI(location.href)));
    },
    rLogin: function () {
        this.r(Mserver + 'h5/v1/account/login?rurl=' + encodeURI(encodeURI(location.href)));
    },
    rUrl: function () {
        var rurl = CM.get('rurl') || Mserver + 'h5/v1/main';
        this.r(rurl);
    },
    alert: function(msg, ycb) {
        layer.open({
            content: msg,
            shadeClose: false,
            btn: ['OK'],
            success: function(elem){
                if (typeof ycb == "function" || typeof ycb == "object") ycb(elem);
            } 
        });
    },
    confirm:function(msg, ycb, ncb) {
        layer.open({
            content: msg,
            btn: ['确认', '取消'],
            shadeClose: false,
            yes: function(){
                if (typeof ycb == "function" || typeof ycb == "object") ycb();
            }, no: function(){
                if (typeof ncb == "function" || typeof ncb == "object") ncb();
            }
        });
    },
    tips: function(msg, sec) {
        layer.open({
            content: msg,
            time: sec
        });
    },
    ok: function (res) {
        return parseInt(res.errcode) == 0 ? true : false;
    },
    // 取?后参数
    get: function(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },

    login: function(data) {
        console.log("登录写入");
        var cookietime = new Date(); 
        cookietime.setTime(cookietime.getTime() + (data.expires_in * 1000));//coockie保存二小时 
        $.cookie("u", data.uid, {expires:cookietime, path:"/"});
        $.cookie("t", data.token, {expires:cookietime, path:"/"});
        $.cookie("m", data.mobile, {expires:cookietime, path:"/"});
        $.cookie("h", data.headPic, {expires:cookietime, path:"/"});
        RQ.setUT(data.uid, data.token);
    },

    isLogin: function() {
        return typeof $.cookie("u") != "undefined" && parseInt($.cookie("u")) > 0 ? true : false;
    },

    getUT: function() {
        return {u:  $.cookie("u") || 0, t: $.cookie("t") || '', h: $.cookie("h")  || '', m: $.cookie("m")  || ''};
    },

    // 续cookie
    refresh: function() {
        if (CM.isLogin()) 
        {
            console.log("cookie 续期");
            CM.login({
                uid: $.cookie("u"),
                token: $.cookie("t"),
                mobile: $.cookie("m"),
                headPic: $.cookie("h"),
                expires_in: 7200 - 100
            });
        }
    },

    cd: {},
    // 倒计时
    countdown: function(id, sum, pcb, ccb, step) {
        var s = typeof step == "undefined" || parseInt(step) == 0 ? 1000 : step;
        var c = sum;
        CM.cd[id] = setTimeout(function() {
            c = c - s;
            if (c != 0) {
                typeof pcb == "function" || typeof pcb == "object" ? pcb(c) : null;
                CM.countdown(id, c, pcb, ccb, s);
            }
            if (c == 0) {
                typeof ccb == "function" || typeof ccb == "object" ? ccb(c) : null;
                clearTimeout(CM.cd[id]);
            }
        }, s);
    },

    /**
    formatDate("2010-04-30", "yyyy-MM-dd HH:mm:ss");   
    formatDate("2010-4-29 1:50:00", "yyyy-MM-dd HH:mm:ss");   
     */
    // formatDate: function(date, format) {   
    //     if (!date) return;   
    //     if (!format) format = "yyyy-MM-dd";   
    //     switch(typeof date) {   
    //         case "string":   
    //             date = new Date(date.replace(/-/, "/"));   
    //             break;   
    //         case "number":   
    //             date = new Date(date);   
    //             break;   
    //     }    
    //     if (!date instanceof Date) return;   
    //     var dict = {   
    //         "yyyy": date.getFullYear(),   
    //         "M": date.getMonth() + 1,   
    //         "d": date.getDate(),   
    //         "H": date.getHours(),   
    //         "m": date.getMinutes(),   
    //         "s": date.getSeconds(),   
    //         "MM": ("" + (date.getMonth() + 101)).substr(1),   
    //         "dd": ("" + (date.getDate() + 100)).substr(1),   
    //         "HH": ("" + (date.getHours() + 100)).substr(1),   
    //         "mm": ("" + (date.getMinutes() + 100)).substr(1),   
    //         "ss": ("" + (date.getSeconds() + 100)).substr(1)   
    //     };       
    //     return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {   
    //         return dict[arguments[0]];   
    //     });                   
    // }
};
/**
 * model
 */
var RQ = {
    timeout: 30,
    uid: 0,
    token: '',
    st: true,
    setUT: function(uid, token) {
        this.uid = uid;
        this.token = token;
    },

    // login: function (scb) {
    //     // console.log(Mserver + 'login/getToken');
    //     this.g(Mserver + 'login/getToken', {}, false, function(res) {
    //         if (res.data.uid != 0) {
    //             RQ.setUT(res.data.uid, res.data.token);
    //             // console.log(res.data.uid, res.data.token);
    //             if (typeof scb == 'function' || typeof scb == 'object') {
    //                 scb(res);
    //             }
    //         } else {
    //             CM.alert('请先登录');
    //             CM.rLogin();
    //         }
    //     });
    // },

    // 快捷登录
    quickLogin: function(mobile, phoneCode, bcb, scb) {
        this.g(APIserver + 'AppInterfaceLogin/quickLogin', {mobile: mobile, phoneCode: phoneCode}, bcb, scb);
    },

    // 验证码发送
    sendPhoneCode: function(type, mobile, bcb, scb) {
        // type 1不对号码进行检测；2登录快捷发送；3注册发送
        this.g(APIserver + 'AppInterfaceLogin/sendPhoneCode', {type: type, mobile: mobile}, bcb, scb);
    },

    // 登录
    appLogin: function(mobile, password, bcb, scb) {
        this.g(APIserver + 'AppInterfaceLogin/appLogin', {mobile: mobile, password: password}, bcb, scb);
    },

    // 是否注册
    checkMobileExist: function(mobile, bcb, scb) {
        this.g(APIserver + 'AppInterfaceLogin/checkMobileExist', {mobile: mobile}, bcb, scb);
    },

    // 注册
    appRegister: function(mobile, password, phoneCode, bcb, scb) {
        this.g(APIserver + 'AppInterfaceLogin/appRegister', {mobile: mobile, password: password, phoneCode: phoneCode, tg: 'H5'}, bcb, scb);
    },


    // 密码找回
    findPassword: function(mobile, uid, password, phoneCode, bcb, scb) {
        this.g(APIserver + 'AppInterfaceLogin/findPassword', {mobile: mobile, password: password, phoneCode: phoneCode, uid: uid}, bcb, scb);
    },

    // 重置密码
    resetPassword: function(newPassword, bcb, scb) {
        this.g(APIserver + 'AppInterfaceObd/resetPassword', {newPassword: newPassword}, bcb, scb);
    },

    // 车辆列表
    carlist: function(type, bcb, scb) {
        this.g(APIserver + 'AppInterfaceCar/carList', {type: type}, bcb, scb);
    },

    // 收益
    income: function(bindId, weeks, bcb, scb) {
        this.g(APIserver + 'AppInterfaceReport/income', {bindId: bindId, 'weeks': weeks}, bcb, scb);
    },

    // 昨日行驶里程
    mileage: function(bindId, startTime, bcb, scb) {
        this.g(APIserver + 'AppInterfaceObd/mileage', {bindId: bindId, startTime: startTime}, bcb, scb);
    },

    // 里程列表
    mileageList: function(bindId, curPage, size, bcb, scb) {
        this.g(APIserver + 'AppInterfaceObd/mileageList', {bindId: bindId, curPage: curPage, size: size}, bcb, scb);
    },

    // app data
    indexData: function(bindId, bcb, scb) {
        this.g(APIserver + 'AppInterfaceObd/indexData', {bindId: bindId}, bcb, scb);
    },

    // 驾驶得分接口
    scoreRank: function(bindId, bcb, scb) {
        this.g(APIserver + 'AppInterfaceReport/scoreRank', {bindId: bindId}, bcb, scb);
    },

    // 钱包
    wallte: function(u,t,bcb, scb) {
        this.g(APIserver + 'AppInterfaceReport/wallet', {u:u,t:t}, bcb, scb);
    },

    // 获取车辆最早激活设备的时间
    activateTime: function(bindId, bcb, scb) {
        this.g(APIserver + 'AppInterfaceObd/activateTime', {bindId: bindId}, bcb, scb);
    },

    // 获取发现banner
    banner: function(count, bcb, scb) {
        this.g(APIserver + 'AppInterfaceNews/banner', {count: count}, bcb, scb);
    },

    // 获取发现资讯列表
    newslist: function(page,pageSize, bcb, scb) {
        this.g(APIserver + 'AppInterfaceNews', {page: page,pageSize:pageSize}, bcb, scb);
    },

    // 获取发现资讯详情
    newsinfo: function(id, bcb, scb) {
        this.g(APIserver + 'AppInterfaceNews/detailWeb/'+id,{id:id}, bcb, scb);
    },

    // 获取保单列表
    polist: function(u,t,page,pagesiez, bcb, scb) {
        this.g(APIserver + 'AppInterfaceOfferOrder',{u:u,t:t,page:page,pagesize:pagesiez}, bcb, scb);
    },
    poinfo: function(u,t,q ,bcb, scb) {
        this.g(APIserver + 'AppInterfaceOfferOrder/detail',{u:u,t:t,quoteNumber:q}, bcb, scb);
    },
    cmArg: function() {
        return {version: '1.0.0', deviceName: '', systemVersion: '', systemName: '', channel: ''}
    },

    g: function(url, data, bcb, scb) {
        data = $.extend(data, this.cmArg());

        if (this.uid != 0) {
            data['u'] = this.uid;
            data['t'] = this.token;
        }
        // console.log("get:" + url);
        // 执行请求
        $.ajax({
            timout: this.timeout,
            data: JSON.stringify(data),
            url:url,
            async: true,
            dataType: 'json',
            type: 'POST',
            beforeSend: function (XMLHttpRequest) {
                if (typeof bcb == 'function' || typeof bcb == 'object') {
                    bcb(XMLHttpRequest);
                } else {
                    // console.log('b err');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // alert(XMLHttpRequest.status);
                // alert(XMLHttpRequest.readyState);
                CM.alert('Error:' + textStatus);
            },
            success: function(res)
            {
                if (typeof scb == 'function' || typeof scb == 'object') {
                    scb(res);
                } else {
                    console.log(scb);
                }

               // console.log(res);
            }
        });
    }
}
/**
 * 页面通用事件
 * @type {Object}
 */
var CMPE = {
    ch: function(idx) {
        console.log($('footer').find('a').removeClass().eq(idx).addClass('active'));
    }
}
$(document).ready(function() {
    CM.refresh();



    // 判断跳转提示
    if (window.location.href.indexOf(document.domain + '/h5/v1/account') == -1 && 
        window.location.href.indexOf(document.domain + '/h5/v1/main') < 0) {
        var u = CM.getUT();
        if (u.u == 0) {
            CM.rLogin();
        }
    }
});