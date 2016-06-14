var PE = {
    car: "",
    bindId: 0,

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
        
        // $('#carList').html(template('carListData', res));
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
            // PE.mileage();

            $('.topcar').show();
        }

        if (PE.bindId != 0) {
            // 查分
            PE.scoreRank();
            // 查里程
            PE.mileage();
            // 查收益
            PE.income();
        }
    },

    // 收益
    income: function() {
        RQ.income(PE.bindId, 0, false, PE.incomeCB);
    },

    incomeCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        $('#income').html(res.data.income_sum);
    },

    // 排名
    scoreRank: function () {
        RQ.scoreRank(PE.bindId, false, PE.scoreRankCB);
    },

    scoreRankCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        $('#score').html(res.data.score);
    },

    // 里程
    mileage: function() {
        RQ.mileage(PE.bindId, "", false, PE.mileageCB);
    },

    mileageCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        $('#mileage').html(res.data.trip_mile);
    },

    init: function () {
        var u = CM.getUT();

        $('.syhelp').on('click', function (){
            layer.open({
                content:'文案测试',
                style: 'background-color:#000; color:#fff; border:none;',
                time: 3
            });
        });

        $('#income').bind('click', function() {
            CM.r('/h5/v1/center/income?bindId=' + PE.bindId);
        });

        $('#mileage, #score').bind('click', function() {
            CM.r('/h5/v1/center/mileage?bindId=' + PE.bindId);
        });

        $('.orleft').bind('click', function() {
            
        });

        $('.orright').bind('click', function() {
            CM.r('/web/quote/index.html');
        });

        if (u.u > 0) {
            PE.getCar();
            
        }
        CMPE.ch(0);
    }




}

$(document).ready(function() {
    PE.init();
});