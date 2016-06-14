var PE = {
      neslist: [],
    binit: function () {
            $(".am-share").addClass("am-modal-active");
            if($(".sharebg").length>0){
                $(".sharebg").addClass("sharebg-active");
            }else{
                $("body").append('<div class="sharebg"></div>');
                $(".sharebg").addClass("sharebg-active");
            }
            $(".sharebg-active,.share_btn").click(function(){
                $(".am-share").removeClass("am-modal-active");
                setTimeout(function(){
                    $(".sharebg-active").removeClass("sharebg-active");
                    $(".sharebg").remove();
                },300);
            })

    },
    newsinfo:function(){
        function params(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
            var tmpStr = window.location.href.substr(window.location.href.indexOf("?") + 1).match(reg);
            if (tmpStr != null) {
                return unescape(tmpStr[2]);
            }
            return null;
        }

        var id = params('id');
        RQ.newsinfo( id, false, PE.newsinfoCB);
    },
    newsinfoCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        $('#newsinfo').html(template('info', res.data));

    },
    init: function () {
        PE.newsinfo();
        PE.binit();
    }

}

$(document).ready(function() {
    PE.init();
});