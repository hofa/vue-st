var PE = {
    bindId: 0,
    // activateDate: "",
    curPage: 0,
    size: 10,
    mouthList: [],
    total: 0,
    dyc: false,
    scount: 0,
    showsussReason: function(ele) {
        console.log(1);
        var _this=$(ele);
        if(_this.hasClass("dnt")){
            _this.removeClass("dnt");
            _this.next().addClass("hide");
            // _this.prev().addClass("hide");
        }else{
            _this.addClass("dnt");
            _this.next().removeClass("hide");
        }
    },

    mileageList: function() {
        PE.dyc = false;
        PE.curPage++;
        if (PE.total != 0 && PE.scount >= PE.total) {
            return false;
        }
        RQ.mileageList(PE.bindId, PE.curPage, PE.size, false, PE.mileageListCB);
    },

    mileageListCB: function(res) {
        if (!CM.ok(res)) {
            return CM.alert(res.errmsg);
        }

        if (typeof res.data != "undefined" && res.data.length > 0) {
            for(var d in res.data) {
                var h = parseInt(res.data[d].run_time_night/3600);
                var m = parseInt((res.data[d].run_time_night - h * 3600) / 60);
                var s = res.data[d].run_time_night - h * 3600 - m * 60;
                res.data[d].h = h < 10 ? '0' + h : h;
                res.data[d].m = m < 10 ? '0' + m : m;
                res.data[d].s = s < 10 ? '0' + s : s;
                var tabTitle = CM.formatDate(res.data[d].collect_date, "yyyy年MM月");
                if (PE.mouthList.indexOf(tabTitle) == -1) {
                    res.data[d].tip = tabTitle;
                    PE.mouthList.push(tabTitle);
                } else {
                    res.data[d].tip = '';
                }
            }
            PE.total = res.total;
            PE.scount = PE.scount + parseInt(res.count);
            $('#cartop-box1').append(template('cartop-tpl1', res));
        } else {
            // $('#cartop-box1').append();
        }
        PE.dyc = true;
    },

    init: function () {
      /*  RQ.login(function() {
            PE.bindId = parseInt(CM.get('bindId') || 0);
            if (PE.bindId == 0) {
                CM.alert('页面异常', function() {
                    // CM.r('/');
                });
                return false;
            }
            PE.mileageList();
        });*/

        $("#carhistory").height($(window).height());
        $("#carhistory").swipe({

            //Generic swipe handler for all directions
            swipe:function(event, direction,click, distance, duration, fingerCount, fingerData) {

              /*  var _this=$(this);
                console.log($(this));
                if(_this.hasClass("dnt")){
                    _this.removeClass("dnt");
                    _this.next().addClass("hide");
                    // _this.prev().addClass("hide");
                }else{
                    _this.addClass("dnt");
                    _this.next().removeClass("hide");
                }*/
                 $(this).text("You swiped " + click  );
               console.log('click', event, direction, distance, duration, fingerCount, fingerData);
                console.log('self', this);
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold:0,
            swipeUp:function(event, direction, distance, duration, fingerCount, fingerData) {
                // CM.tips("上滑", 1);
                // if (PE.dyc == true) PE.mileageList();
                PE.mileageList();
            },
            swipeDown:function(event, direction, distance, duration, fingerCount, fingerData) {
                // CM.tips("下滑", 1);

            },
        });
    }
}



$(document).ready(function() {
    // CM.init();
    PE.init();
});/**
 * Created by lenovo on 2016/5/23.
 */
