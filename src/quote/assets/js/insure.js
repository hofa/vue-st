var apiHost = "http://api.ubi001.com/v1/offer/";
var serverIp = '112.74.95.105';
var serverPort = 2111;
var maxseconds = 10 * 60;//设置最长轮询时间10分钟
var per_item_cent, percent;
var localEnquiryNum;

var _spaBusinTit = $("#spaBusinTit"),
    _ul = _spaBusinTit.next();

$(function () {

    var prevdata;
    var dtTalentQuote = store.get('dtTalentQuote');//读取询价信息

    var localAction;

    //读取URL的参数  action=repick 重选保险公司/ enquiryNum询价单号
    location.search.replace(/^\?|&?(\w+)=(\w+)?/g, function (str, key, val) {
        if (key === 'enquiryNum') {
            localEnquiryNum = val;
        } else if (key === 'action') {
            localAction = val;
            store.set("packageAction", val);
        }
    });


    if (typeof localEnquiryNum != 'undefined') {

        //已有询价单号，直接获取询价结果
        getQuote(localEnquiryNum)
        store.set("dtquoteresult", {queryno: localEnquiryNum});

    } else if (typeof localAction !== 'undefined') {

        if (localAction === 'repick' && store.get('dtTalentQuote')) {
            //action=repick 重选保险公司 否则进行询价
            // getQuoteHandler(dtTalentQuote, dtTalentQuote.result.quoteResults[0].enquiryNum)

        } else if (localAction === 'doPackageEnquiry' && store && store.get("dtinsurscheme")) {

            prevdata = store.get("dtinsurscheme");

            prevdatatwo = store.get("dtstep1");

            //action=doPackageEnquiry 套餐
            var appVersion = window.navigator.appVersion,
                localSearch = sessionStorage.localSearch,//读取session里的数据
                parameters = {
                    platformFlag: appVersion.match(/android/gi) && 31 || appVersion.match(/iphone/gi) && 30,
                    carId: store.get('carId'),
                    busiInsureStartTime: prevdata.busiInsureStartTime,
                    trafficInsureStartTime: prevdata.trafficInsureStartTime
                };

            localSearch.replace(/(\w+)=(\w+)&?/g, function (str, key, val) {
                parameters[key] = val
            });

            $.ajax({
                url: 'http://api.ubi001.com/v1/offer/quote',
                type: "POST",
                contentType: 'application/json',
                dataType: 'json',
                async: true,
                timeout: 10000,
                data: {

                    parameters: JSON.stringify(parameters)
                },
                jsonpCallback: 'json',
                success: function (respon) {
                    if (respon.error == "0") {
                        getQuote(respon.data.enquiryNum);
                        store.set("dtquoteresult", {queryno: respon.data.enquiryNum});
                    } else {
                        layer.open({
                            content: respon.exception + ",请稍后重试",
                            style: 'background-color:#000; color:#fff; border:none;',
                            time: 3
                        });
                    }
                },
                error: function (httpReq, textStatus, errorThrown) {
                    if (textStatus && textStatus == 'timeout') {
                        $("#loading_wrap").remove();
                        layer.open({
                            content: "请求超时，请稍后刷新重试",
                            style: 'background-color:#000; color:#fff; border:none;',
                            time: 3
                        });
                        return;
                    }
                    layer.open({
                        content: httpReq.responseText,
                        style: 'background-color:#000; color:#fff; border:none;',
                        time: 3
                    });
                }
            })

        }

    } else {

        //默认进行轮询
        if (store && store.get("dtinsurscheme")) {
            prevdata = store.get("dtinsurscheme");
            prevdatatwo = store.get("dtstep1");
            prevdatathree = store.get("dtstep2");

            dtTalentQuote = store.get("dtTalentQuote");

            dutys = store.get("dutys");

            var dutt = JSON.stringify(dutys);
            var dtlength = dutt.length - 10;
            //alert(dtlength)
            var dutts = dutt.substr(9, dtlength);
            //alert(dutts)
            //console.log(dutys)
            //dutt = jQuery.parseJSON(dutys);
            // alert(dutt)

            var comm = {
                "errcode": 0,
                "data": [
                    {
                        "code": "TAIC",
                        "name": "天安保险股份有限公司",
                        "channel": "sys"
                    },
                    {
                        "code": "MACN",
                        "name": "民安保险（中国）有限公司",
                        "channel": "sys"
                    },
                    {
                        "code": "FDBX",
                        "name": "富德财产保险股份有限公司",
                        "channel": "sys"
                    },

                    {
                        "code": "MACN",
                        "name": "民安财产保险有限公司",
                        "channel": "hz"
                    }
                ]
            };


            for (var i = 0; i < comm.data.length; i++) {
                var item = comm.data[i];
                var channel = item.channel;
                var code = item.code;


            }
            var socket_enquire = $('#carEnPut').data('socket');

            //var channel = name;


            var company = '中国平安财产保险股份有限公司';
            var carcard = prevdatatwo.platenum + prevdatatwo.platenumtxt;

            var owner = {
                name: prevdatatwo.hzname,
                type: 1,
                id: prevdatathree.ownercardnum,
                birthday: prevdatathree.birthday,
                sex: 1
            };

            var vehicle = {
                carcard: carcard,
                engine: prevdatatwo.frameNo,
                vin: prevdatatwo.engineNum,
                register: prevdatatwo.registerDate,
                model: prevdatatwo.brandModel,
                code: 'BMI1468DGB',
                id: '4028b28841cafa3d0141e8e7f6cd16d2'
            };
            var bxresult = {
                q: prevdatatwo.orderid,
                channel: channel,
                company: company,
                owner: owner,
                applicant: owner,
                insurant: owner,
                vehicle: vehicle,
            };

            var tempparameters = {
                q: prevdatatwo.orderid,
                areaId: prevdata.areaid,
                areaName: prevdata.areaname,
                areaNum: prevdata.areanum,
                busiInsureStartTime: prevdata.busiInsureStartTime,
                trafficInsureStartTime: prevdata.trafficInsureStartTime,
                carId: prevdata.carid,
                companys: [],
                isBuyTravelTax: prevdata.ccs,
                talentPackageProtects: prevdata.sy,
                userId: 1,
                vehicleId: prevdata.vehicleid
            };
            if (typeof(prevdata.sy) != "undefined" && prevdata.sy.length > 0 && prevdata.jq == 1) {
                $.extend(tempparameters, {insureSelectFlag: 3});
            } else {
                if (prevdata.jq == 1) {
                    $.extend(tempparameters, {insureSelectFlag: 1});
                } else {
                    $.extend(tempparameters, {insureSelectFlag: 2});
                }
            }

            if (typeof(store.get("platform")) != "undefined") {
                tempparameters.platformFlag = store.get("platform").platformFlag;
                $.extend(tempparameters, {thirdPlatformKey: store.get("platform").thirdPlatformKey});
            }

            // var channel = $('#insure input[name="channel"]').val();
            var q = prevdatatwo.orderid;
            var apiHost = "http://api.ubi001.com/v1/offer/";
            var serverIp = '112.74.95.105';
            var serverPort = 2111;
            dutys = store.get("dutys");
            var dutt = JSON.stringify(dutys);

            var dtlength = dutt.length - 10;
            //alert(dtlength)
            var dutts = dutt.substr(9, dtlength);

            duttssss = store.get("dutttt");
            packJson = JSON.parse(dutts);
            // console.log(packJson)
            store.set("dutttt", packJson);
            var bToObj = JSON.parse(dutts);

            $.each(bToObj, function (idx, obj) {

                if (obj.code == 05) {
                    this.seat = 4;
                }
                if (obj.code == 08) {
                    this.kind = 0;
                }

            });


            var insureFu = {
                quote: function (channel, company) {


                        var jsondata = {
                                "owner": {
                                    "name": prevdatatwo.hzname,
                                    "type": "01",
                                    "id": prevdatathree.ownercardnum,
                                    "birthday": prevdatathree.birthday,
                                    "sex": prevdatathree.sex
                                },
                                "vehicle": {
                                    "newcar": prevdatatwo.hascar,
                                    "transfer": prevdatathree.ifPass,
                                    "transdate": prevdatathree.transferdate,
                                    "carcard": carcard,
                                    "engine": prevdatathree.engineNum,
                                    "vin": prevdatathree.frameNo,
                                    "register": prevdatathree.registerDate,
                                    "model": prevdatathree.brandModel,
                                    "id": prevdata.vehicleid,
                                    "code": prevdata.carcode
                                },
                                "c01": {
                                    "startDate": prevdata.busiInsureStartTime,
                                    "dutys": bToObj
                                },
                                "company": company
                            };




                    if(prevdata.jq==0){

                        var jsondata = {
                            "owner": {
                                "name": prevdatatwo.hzname,
                                "type": "01",
                                "id": prevdatathree.ownercardnum,
                                "birthday": prevdatathree.birthday,
                                "sex": prevdatathree.sex
                            },
                            "vehicle": {
                                "newcar": prevdatatwo.hascar,
                                "transfer": prevdatathree.ifPass,
                                "transdate": prevdatathree.transferdate,
                                "carcard": carcard,
                                "engine": prevdatathree.engineNum,
                                "vin": prevdatathree.frameNo,
                                "register": prevdatathree.registerDate,
                                "model": prevdatathree.brandModel,
                                "id": prevdata.vehicleid,
                                "code": prevdata.carcode
                            },
                            "c01": {
                                "startDate": prevdata.busiInsureStartTime,
                                "dutys": bToObj
                            },
                            "company": company
                        };

                    }else {
                        var jsondata = {
                            "owner": {
                                "name": prevdatatwo.hzname,
                                "type": "01",
                                "id": prevdatathree.ownercardnum,
                                "birthday": prevdatathree.birthday,
                                "sex": prevdatathree.sex
                            },
                            "vehicle": {
                                "newcar": prevdatatwo.hascar,
                                "transfer": prevdatathree.ifPass,
                                "transdate": prevdatathree.transferdate,
                                "carcard": carcard,
                                "engine": prevdatathree.engineNum,
                                "vin": prevdatathree.frameNo,
                                "register": prevdatathree.registerDate,
                                "model": prevdatathree.brandModel,
                                "id": prevdata.vehicleid,
                                "code": prevdata.carcode
                            },
                            "c01": {
                                "startDate": prevdata.busiInsureStartTime,
                                "dutys": bToObj
                            },

                            "c51": {
                                "startDate": prevdata.trafficInsureStartTime
                            },
                            "tax": {
                                "type": prevdata.jq
                            },
                            "company": company
                        };
                    }


                   /* var jsondata = {
                            "owner": {
                                "name": prevdatatwo.hzname,
                                "type": "01",
                                "id": prevdatathree.ownercardnum,
                                "birthday": prevdatathree.birthday,
                                "sex": prevdatathree.sex
                            },
                            "vehicle": {
                                "newcar": prevdatatwo.hascar,
                                "transfer": prevdatathree.ifPass,
                                "transdate": prevdatathree.transferdate,
                                "carcard": carcard,
                                "engine": prevdatathree.engineNum,
                                "vin": prevdatathree.frameNo,
                                "register": prevdatathree.registerDate,
                                "model": prevdatathree.brandModel,
                                "id": prevdata.vehicleid,
                                "code": prevdata.carcode
                            },
                            "c01": {
                                "startDate": prevdata.busiInsureStartTime,
                                "dutys": bToObj
                            },

                            "c51": {
                                "startDate": prevdata.trafficInsureStartTime
                            },
                            "tax": {
                                "type": prevdata.jq
                            },
                            "company": company
                        };*/






                    $.ajax({
                        url: 'http://api.ubi001.com/v1/offer/' + "quote?q=" + q + '&channel=' + channel,
                        type: "POST",
//                                      contentType : 'application/json',
                        dataType: 'json',
//                                      async:true,
//                                      timeout :10000,
                        data: JSON.stringify(jsondata),
//                                      jsonpCallback: 'json',
                        success: function (respon) {


                            if (channel == 'hz') {
                                if (respon.errcode == 0) {
                                    //$('#carEn-res').html(renderjson(respon.data));

                                    var uid = respon.data.enquiryNum;

                                    if (!socket_enquire) {
                                        // 连接服务端
                                        socket_enquire = io('http://' + serverIp + ':' + serverPort);
                                        socket_enquire.on('connect', function () {
                                            socket_enquire.emit('login', uid);
                                            // console.log(uid);
                                        });
                                        // 后端推送来消息时
                                        socket_enquire.on('new_msg', function (msg) {

                                            if (msg.indexOf('hzCarEnquiryNotification') > 0) {

                                                //alert(msg);
                                                //console.log(JSON.parse(msg).type);
                                                console.log('hz');
                                                console.log(msg);
                                                var msgData = JSON.parse(msg);
                                                msgData.respCode = parseInt(msgData.respCode);
                                                // msgData.isDiscount = parseInt(msgData.isDiscount);
                                                // msgData.status = parseInt(msgData.status);
                                                console.log(msgData);
                                                // console.log(msgData.respCode);
                                                _ul.append(template.render("tplBusiness", {dt: msgData}));
                                                // $('#carEn-callback').append(renderjson(JSON.parse(msg)));
                                                // $('#carEn-callback').append('<hr>');
                                            }
                                        });
                                    }
                                    else {
                                        socket_enquire.emit('login', uid);
                                    }
                                }
                                else {
                                    //$('#carEn-res').html(data.errmsg);
                                }
                            }
                            else {
                                // console.log(respon);


                                if (respon.errcode == 0) {
                                    _ul.append(template.render("tplsys", {
                                        dt: respon,
                                        dd: respon.data,
                                        company: company
                                    }));

                                    store.set(company,{data:respon.data});


                                    // console.log(respon.errcode);
                                    // var bximg = $(".insur-price").attr("data-branchid");

                                    /*for (var i = 0; i < 3; i++) {

                                     store.set("result"[i],{company:company,"bunnis":respon.data.riskDtoList[0].benchmarkPremium,"car":respon.data.riskDtoList[1].benchmarkPremium});


                                     }*/


                                    // $('#carEn-res').html(renderjson(respon.data));
                                }


                                else {

                                    _ul.append(template.render("tplsystwo", {
                                        dt: respon.data,
                                        errcode: respon.errcode,
                                        errmsg: respon.errmsg,
                                        company: company
                                    }));

                                    console.log(respon);
                                    //$('#carEn-res').html(respon.errmsg);
                                }
                            }

                        },
                        error: function (httpReq, textStatus, errorThrown) {
                            if (textStatus && textStatus == 'timeout') {
                                $("#loading_wrap").remove();
                                layer.open({
                                    content: "请求超时，请稍后刷新重试",
                                    style: 'background-color:#000; color:#fff; border:none;',
                                    time: 3
                                });
                                return;
                            }
                            layer.open({
                                content: httpReq.responseText,
                                style: 'background-color:#000; color:#fff; border:none;',
                                time: 3
                            });
                        }
                    })

                },


                init: function () {

                    var comm = [

                        {
                            "code": "TAIC",
                            "name": "天安保险股份有限公司",
                            "channel": "sys"
                        },
                        {
                            "code": "MACN",
                            "name": "民安保险（中国）有限公司",
                            "channel": "sys"
                        },
                        {
                            "code": "FDBX",
                            "name": "富德财产保险股份有限公司",
                            "channel": "sys"
                        }
                    ];

                    for (var i = 0; i < 3; i++) {

                        var item = comm[i];
                        var channel = item.channel;
                        var company = item.code;

                        this.quote(channel, company);

                    }


                }

            }

            insureFu.init();


        } else {
            //无缓存数据，回上一步重新填写
            window.location.href = "cx-insur-scheme.html";
        }

    }
})


//$(".insur-price").attr("data-branchid")


//pop三大问号
$(".ico-why").on("click", function () {
    var dtindex = parseInt($(this).attr("data"));
    switch (dtindex) {
        case 1:
            layer.open({
                title: [
                    '车船税'
                ],
                content: '<div>车船税为投保年度整年税金，如上年未缴纳车船税，则今年车船税为今年需缴纳的额度加上上年需补缴车船税以及滞纳金的总和</div>'

            });
            break;
    }
});

//show 失败原因
function showFailReason(ele) {
    var _this = $(ele);
    if (_this.hasClass("dn")) {
        _this.removeClass("dn");
        _this.next().addClass("hide");
    } else {
        _this.addClass("dn");
        _this.next().removeClass("hide");
    }
}

function showsussReason(ele) {
    var _this = $(ele);
    if (_this.hasClass("dnt")) {
        _this.removeClass("dnt");
        _this.next().next().addClass("hide");
    } else {
        _this.addClass("dnt");
        _this.next().next().removeClass("hide");
    }
}


//jump to 报价详情
function jumpToDetail(ele) {
    window.location.href = "cx-quote-detail.html?companyid=" + $(ele).data("compnyid") + "&branchid=" + $(ele).data("branchid");
}
//轮询投保
function getQuote(quotenumber) {

    prevdatatwo = store.get("dtstep1");
    areanumber = prevdatatwo.areanumber;
    maxseconds = maxseconds - 5;
    $.ajax({
        url: 'http://api.ubi001.com/v1/offer/getCompanyList',
        type: "get",
        contentType: 'application/json',
        dataType: 'json',
        async: true,
        timeout: 10000,
        data: {code: areanumber},
        jsonpCallback: 'json',
        success: function (data) {




            //console.log (respon)
            //处理函数

            showEnquiryUrl(quotenumber);
            getQuoteHandler(respon, quotenumber);

        }



        /*success:function(respon){

         console.log (respon)
         //处理函数

         showEnquiryUrl(quotenumber);
         getQuoteHandler(respon, quotenumber);
         }*/,
        error: function (httpReq, textStatus, errorThrown) {
            if (textStatus && textStatus == 'timeout') {
                $("#loading_wrap").remove();
                layer.open({
                    content: "请求超时，请稍后刷新重试",
                    style: 'background-color:#000; color:#fff; border:none;',
                    time: 3
                });
                return;
            }
            layer.open({
                content: httpReq.responseText,
                style: 'background-color:#000; color:#fff; border:none;',
                time: 3
            });
        }
    })
}

var isShowEnquiryUrl = 0;
function showEnquiryUrl(quotenumber) {
    if (isShowEnquiryUrl === 0 && store && typeof(store.get("dtstep0")) != "undefined" && typeof localEnquiryNum === 'undefined') {
        isShowEnquiryUrl = 1;
        $.ajax({
            url: ipPort,
            type: "get",
            contentType: 'application/json',
            dataType: 'jsonp',
            async: true,
            data: {
                command: "saveAgentInfo", token: "H5_plate_token", parameters: JSON.stringify({
                    managerName: store.get("dtstep0").managerName,
                    memberName: store.get("dtstep0").memberName,
                    memberTel: store.get("dtstep0").memberTel,
                    enquiryNum: quotenumber
                })
            },
            jsonpCallback: 'jsonp',
            success: function (respon) {
                var id = respon.result;
                if (id > 0) {
                    store.set("dtstep0", {
                        managerName: store.get("dtstep0").managerName,
                        memberName: store.get("dtstep0").memberName,
                        memberTel: store.get("dtstep0").memberTel,
                        enquiryNum: quotenumber,
                        id: id
                    });
                }
            },
            error: function (httpReq, textStatus, errorThrown) {
                layer.open({
                    content: '保存代理询价单号失败，询价单号为' + quotenumber,
                    style: 'background-color:#000; color:#fff; border:none;'
                });
            }
        });
        var enquryUrl = $("#agentEnquiryUrl");
        //enquryUrl.append($("<span class='fz-nrml'>代理询价地址为：" + location.href + "?enquiryNum=" + quotenumber + "</span>"));
        $("#agentEnquiryUrlContent").append($("<span>" + location.href + "?enquiryNum=" + quotenumber + "</span>"));
        enquryUrl.show();
    }
}

//询价处理函数
function getQuoteHandler(respon, quotenumber) {

    var _spaBusinTit = $("#spaBusinTit"),
        _ul = _spaBusinTit.next();

    if (respon.errcode == "0") {

        var result = respon.data.length;


        per_item_cent = per_item_cent ? per_item_cent : (parseInt(100 / result)).toFixed(1);//计算进度单位
        percent = per_item_cent * result;//计算进度
        percent = percent > 100 ? 100 : percent < 40 ? 40 : percent;

        if (_spaBusinTit.is(":hidden") && result > 0) {
            _spaBusinTit.show();
        }
        if (respon.data.length != result) {
            if (_ul.find(">.busin-insur-item").length < respon.data.companys.length) {
                var index = _ul.find(">.busin-insur-item").last().index();
                for (var i = index + 1; i < respon.data.companys.length; i++) {
                    //per_item_cent
                    var _spa = $("#spaProgress");
                    _spa.parent().css("width", percent + "%");
                    _spa.data("percent", percent).text(percent + "%");
                    if (_spa.data("percent") == 100) {
                        var _tempresult = _spa.parent().parent().parent().hide().prev();
                        _tempresult.find("#ftCompanyCount").text(respon.data.companys.length);//$(".busin-insur-list").find(">li").length
                        if (respon.data.length != respon.data.companys.length) {
                            _tempresult.append($('<font class="fz-nrml">,剩下' + (respon.data.length - respon.data.companys.length) + '家无结果</font>'));
                        }
                        _tempresult.show();
                        //ftCompanyCount
                    }
                    _ul.append(template.render("tplBusiness", {dt: respon.companys.data[i]}));
                    if ($("#spaForceTit").is(":hidden") && respon.data.companys[i].status == 1) {
                        //spaForceTit
                        var templis = $("#spaForceTit").next().find(">.other-insur-item");
                        templis.eq(0).children().eq(1).text("￥" + respon.data.companys[i].trafficPremium);
                        templis.eq(1).children().eq(1).text("￥" + respon.data.companys[i].taxationPremium);
                        $("#spaForceTit").show().next().show();
                    }
                }
            }
            //continue轮询
            if (maxseconds > 0) {
                setTimeout("getQuote('" + quotenumber + "')", 5000);
            } else {
                $("#loading_wrap").remove();
                var templis = $("#spaForceTit").next().find(">.other-insur-item");
                templis.eq(0).children().eq(1).text("报价失败");
                templis.eq(1).children().eq(1).text("报价失败");
                $("#spaForceTit").show().next().show();
                var _spa = $("#spaProgress");
                _spa.parent().css("width", percent + "%");
                _spa.data("percent", percent).text(_spa.data("percent") + "%");
                if (_spa.data("percent") == 100) {
                    var _tempresult = _spa.parent().parent().parent().hide().prev();
                    _tempresult.find("#ftCompanyCount").text(respon.data.companys.length);//$(".busin-insur-list").find(">li").length
                    if (respon.data.length != respon.data.companys.length) {
                        _tempresult.append($('<font class="fz-nrml">,剩下' + (respon.data.length - respon.data.companys.length) + '家无结果</font>'));
                    }
                    _tempresult.show();
                    //ftCompanyCount
                }
            }
        } else {
            store.set("dtTalentQuote", respon);//保存询价信息
            if (_ul.find(">.busin-insur-item").length < respon.data.length) {
                var index = _ul.find(">.busin-insur-item").last().index();
                for (var i = index + 1; i < respon.data.length; i++) {
                    var _spa = $("#spaProgress");
                    _spa.parent().css("width", percent + "%");
                    _spa.data("percent", percent).text(percent + "%");
                    if (_spa.data("percent") == 100) {
                        setTimeout(function () {
                            var _tempresult = _spa.parent().parent().parent().hide().prev();
                            _tempresult.find("#ftCompanyCount").eq(0).text(respon.data.companys.length);//$(".busin-insur-list").find(">li").length
                            if (respon.result.companyNum != respon.data.companys.length) {
                                _tempresult.append($('<font class="fz-nrml">,剩下' + (respon.data.length - respon.data.companys.length) + '家无结果</font>'));
                            }
                            _tempresult.show();
                        }, 1000)
                    }
                    _ul.append(template.render("tplBusiness", {dt: respon.data[i]}));
                    if ($("#spaForceTit").is(":hidden") && respon.data[i].status == 1) {
                        //spaForceTit
                        var templis = $("#spaForceTit").next().find(">.other-insur-item");
                        templis.eq(0).children().eq(1).text("￥" + respon.data.companys[i].trafficPremium);
                        templis.eq(1).children().eq(1).text("￥" + respon.data.companys[i].taxationPremium);
                        $("#spaForceTit").show().next().show();
                    }
                }
            }
            $("#loading_wrap").remove();
        }
        if (_ul.find(">.busin-insur-item").length == respon.data.length && $("#spaForceTit").is(":hidden")) {
            var templis = $("#spaForceTit").next().find(">.other-insur-item");
            templis.eq(0).children().eq(1).text("报价失败");
            templis.eq(1).children().eq(1).text("报价失败");
            $("#spaForceTit").show().next().show();
        }
    }

}