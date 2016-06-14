var PE = {
    car: "",
    bindId:0,
    canvasLabels:[],
    canvasData:[],
    _init: function () {
        var w,h,className;
        function getSrceenWH(){
            w = $(window).width();
            h = $(window).height();
            $('#dialogBg').width(w).height(h);
        }

        window.onresize = function(){
            getSrceenWH();
        }
        $(window).resize();

            getSrceenWH();

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

            $('#dialogBg').click(function(){
                $('#dialogBg').fadeOut(100,function(){
                    $('#dialog').addClass('bounceOutUp').fadeOut();
                });
            });

       
    },

    canvas: function () {
         /*------------------------------------------------
        * 收益曲线  start */
        var lineChartData = {
            labels : PE.canvasLabels,
            datasets : [
                {
                    fillColor : "rgba(34,166,249,0.1)",
                    strokeColor : "rgba(34,166,249,1)",
                    pointColor : "rgba(34,166,249,1)",
                    pointStrokeColor : "#fff",
                    data : PE.canvasData
                }
            ]
        };
        setIntroChart();
        function setIntroChart(){
            var ctx = document.getElementById("canvas").getContext("2d");
            new Chart(ctx).Line(lineChartData,{animation: Modernizr.canvas, scaleShowLabels : true, scaleFontColor : "#767C8D",tooltipFillColor: "rgba(34,166,249,0.9)",tooltipFontFamily: "'Helvetica', 'Arial', sans-serif"});
        }
    },

    // 收益
    income: function() {
        RQ.income(PE.bindId, 20, false, PE.incomeCB);
    },

    incomeCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        var c = 0;
        for(var d in res.data.week_income_list) {
            // console.log(res.data.week_income_list[d].income_date.replace(/-/g, "/"));
            res.data.week_income_list[d].date = new Date(res.data.week_income_list[d].income_date.replace(/-/g, "/")).Format("MM-dd");
            if (c <= 8) {
                PE.canvasLabels.push(res.data.week_income_list[d].date);
                PE.canvasData.push(res.data.week_income_list[d].income);
            }
            c++;
        }
        
        // 上周收益
        res.data.yincome = typeof res.data.week_income_list[0] != "undefined" ? res.data.week_income_list[0].income : "0.00";
        $('#cartop-box1').html(template('cartop-tpl1', res.data));
        $('#cartop-box2').html(template('cartop-tpl2', res.data));

        PE.canvasLabels.reverse();
        PE.canvasData.reverse();

        // 绘图
        PE.canvas();
    },

    // 钱包
    wallte: function() {
        RQ.wallte(false, PE.wallteCB);
    },

    wallteCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        $('#money').html(res.data.money);
            $('#getmn').click(function() {
                if (parseFloat(res.data.money) > 0) {
                    CM.r('/returnMoney');
                } else {
                    CM.alert('亲，你账号没有可提金额喔！');
                }
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

                    PE.income();
                }
                $('.claseDialogBtn').click();
            });

            // 收益
            PE.income();
            // PE.wallte();

            $('.topcar').show();
        }
    },

    init: function () {
        $('.topcar').hide();
        this._init();
        // RQ.login(function(res) {
        PE.getCar();
            // console.log(res.data.loginname);
        //     $('.welcome').html(res.data.loginname);
        // });
    }
}

$(document).ready(function() {
    PE.init();
});