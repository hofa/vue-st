/**
 * Created by lenovo on 2016/5/19.
 */
$(function(){

    $('#switch_qlogin').click(function(){
        $('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
        $('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
        $('#switch_bottom').animate({left:'0px',width:'50%'});
        $('#qlogin').css('display','none');
        $('#web_qr_login').css('display','block');

    });
    $('#switch_login').click(function(){

        $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
        $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
        $('#switch_bottom').animate({left:'154px',width:'61%'});

        $('#qlogin').css('display','block');
        $('#web_qr_login').css('display','none');
    });
    /*if(getParam("a")=='0')
    {
        $('#switch_login').trigger('click');
    }*/

});

function logintab(){
    scrollTo(0);
    $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
    $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
    $('#switch_bottom').animate({left:'154px',width:'96px'});
    $('#qlogin').css('display','none');
    $('#web_qr_login').css('display','block');

}




