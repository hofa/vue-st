

$("#carbrand").click(function () {
    $("#bg").css({
        display: "block", height: $(document).height()
    });
    var $box = $('.payment_time_mask');
    $box.css({
        display: "block",
    });
});
//点击关闭按钮的时候，遮罩层关闭
$("#gradet li").on('click',function () {
    $("#bg,.payment_time_mask").css("display", "none");

    $("#carbrand").val($(this).html());
});

//Regional开始
$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.grade-eject').hasClass('grade-w-roll')) {
            $('.grade-eject').removeClass('grade-w-roll');
        } else {
            $('.grade-eject').addClass('grade-w-roll');
        }
    });
});

$(document).ready(function(){


    var json = {"u":'' , "t":''};
    $.ajax({
        url: 'http://192.168.70.60:8080/v1/AppInterfaceCar/carFactory',
        type: "post",
        dataType: 'json',
        async: true,
        data:JSON.stringify(json),
        success: function (respon) {
            if (respon.errcode == "0") {
                console.log(respon.data);
                //console.log(template.render("tpl123",{dt:respon,dd:respon.data}));

                $("#gradew").append(template.render("tpl123",{dt:respon,dd:respon.data}));

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
    });



    $(".grade-w>li").click(function(){

        $(".grade-t").css("left","33.48%");
    });
});




//Sort开始


//js点击事件监听开始
function grade1(wbj){
    var arr = document.getElementById("gradew").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    wbj.style.background = "#eee";

    var id = $(wbj).attr("id");
    var json = {"u":'' , "t":'',"factoryId":id};

    $.ajax({
        url: 'http://192.168.70.60:8080/v1/AppInterfaceCar/carModel',
        type: "post",
        dataType: 'json',
        async: true,
        data:JSON.stringify(json),
        success: function (respon) {
            if (respon.errcode == "0") {
                console.log(respon.data);


                //console.log(template.render("tpl123",{dt:respon,dd:respon.data}));

                $("#gradet").append(template.render("tplcar",{dt:respon,dd:respon.data}));

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
    });
    $(".grade-t").css("left","33.48%");
}

function gradet(tbj){
    var arr = document.getElementById("gradet").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    tbj.style.background = "#fff"
}

function grades(sbj){
    var arr = document.getElementById("grades").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.borderBottom = "";
    };
    sbj.style.borderBottom = "solid 1px #ff7c08"
}







