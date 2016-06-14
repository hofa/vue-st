var PE = {
    car: "",
    bindId: 0,

    _init: function() {


        //显示弹框
        $('.topcar a').click(function(){
            className = $(this).attr('class');
            $('#dialogBg').fadeIn(300);
            $('#dialog').removeAttr('class').addClass('animated '+className+'').fadeIn();
        });

        //关闭弹窗
        $('.claseDialogBtn').click(function(){
            $('#dialogBg').fadeOut(300,function(){
                $('#dialog').addClass('bounceOutUp').fadeOut();
            });
        });
    },

    // 排名
    scoreRank: function () {
        RQ.scoreRank(PE.bindId, false, PE.scoreRankCB);
    },

    scoreRankCB: function(res) {
        // console.log(res);
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        $('#cartop-box1').html(template('cartop-tpl1', res.data));
        $('#cartop-box3').html(template('cartop-tpl3', res.data));
    },

    // 里程
    mileage: function() {
        RQ.mileage(PE.bindId, "", false, PE.mileageCB);
    },

    mileageCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }

        var h = parseInt(res.data.run_time_night/3600);
        var m = parseInt((res.data.run_time_night - h * 3600) / 60);
        var s = res.data.run_time_night - h * 3600 - m * 60;
        res.data.h = h < 10 ? '0' + h : h;
        res.data.m = m < 10 ? '0' + m : m;
        res.data.s = s < 10 ? '0' + s : s;
        res.data.acce = res.data.acce < 10 ? '0' + res.data.acce : res.data.acce;
        res.data.dece = res.data.dece < 10 ? '0' + res.data.dece : res.data.dece;
        $('#cartop-box2').html(template('cartop-tpl2', res.data));
        $('#historyClick').bind('click', function() {
            CM.r('/web/h5/v2/center/carhistory.html?bindId=' + PE.bindId);
        });
    },

    // 设定车
    setCar: function(bindId, car) {
        PE.car = car;
        PE.bindId = bindId;
        $('#car').text(car);
    },

    // 取车
    getCar: function () {
        RQ.carlist(1, false, this.getCarCB);
    },

    getCarCB: function (res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        
        $('#carList').html(template('carListData', res));
        if (typeof res.data != "undefined" && typeof res.data[0] != "undefined") {
            PE.setCar(res.data[0].bind_id, res.data[0].carcard);
        
            // 绑定车辆选择事件
            $('#carList li').bind('click', function(i) {
                if ($(this).data('bindid') != PE.bindId) {
                    PE.setCar($(this).data('bindid'), $(this).text());
                    PE.scoreRank();
                    PE.mileage();
                }
                $('.claseDialogBtn').click();
            });

            

            // 查昨日里程
            PE.mileage();

            $('.topcar').show();
        }

        // 查分
        PE.scoreRank();
    },

    init: function() {
        $('.topcar').hide();
        PE._init();
        // RQ.login(function(res) {
        PE.getCar();
            // console.log(res.data.loginname);
            // $('.welcome').html(res.data.loginname);
        // });
    }
}

$(document).ready(function() {
    PE.init();
});