var PE = {
      neslist: [],
    binit: function () {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            centeredSlides: true,
            autoplay: 3000,
            autoplayDisableOnInteraction: false
        });
    },
    banner:function(){
        var count = 5;
        RQ.banner( count, false, PE.bannerCB);
    },
    bannerCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        $('#bannerlist').html(template('bannerl', res));

    },
    newslist:function(){

        var page = 1;
        var pageSize = 10;
        RQ.newslist( page,pageSize, false, PE.newslistcb);

    },
    newslistcb: function (res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }
        $.each(res.data, function (idx, obj) {
            for(var d in res.data) {
                this.addtime = moment(res.data[d].addtime*1000).format('YYYY-MM-DD');
            }
        });
        $('#scroller').html(template('newsl', res));

    },
    page:function(){




    },
    init: function () {
        PE.binit();
        PE.banner();
        PE.newslist();
        PE.page();
        CMPE.ch(1);
    }

}

$(document).ready(function() {
    PE.init();




});