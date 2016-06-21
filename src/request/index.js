// var $ = require('jquery')
var request = {
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


export default request;
