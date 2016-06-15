/**
 * 表单提交数据绑定
 */
// 定义几个全局notify消息
/**
 * 表单提交前
 */
var G_BIND_FORM_BEFORE_SUBMIT = 'G_BIND_FORM_BEFORE_SUBMIT';
/**
 * 表单提交成功
 */
var G_BIND_FORM_SUBMIT_SUCC = 'G_BIND_FORM_SUBMIT_SUCC';
/**
 * 表单提交失败
 * @type {string}
 */
var G_BIND_FORM_SUBMIT_ERROR = 'G_BIND_FORM_SUBMIT_ERROR';

/**
 * 有新的表单被动态创建，需要绑定
 */
var G_BIND_FORM_NEW_FORM_CREATE = 'G_BIND_FORM_NEW_FORM_CREATE';

(function () {
    // 判断是jQuery还是zepto
    var isJquery = (typeof jQuery !== 'undefined');

    function FormSubmitBinder(form) {
        this.jForm = $(form);
        this.validCallback = this.jForm.attr("validCallback");
        var that = this;

        // 有些按钮不能默认是submit，如果默认是submit，可能导致没绑定form，用户就点击了提交，
        // 但又希望按钮有submit属性(比如支持回车提交)
        // 这种方法直接可以设置form变动onsubmi=return false;
        /**
         * 拦截提交表单
         */

        this.jForm.initValid({
            'btnSelector' : '.validator_btn',
            'submit': function (e) {

                /*
                var cannext=nextStep(this);
                if(!cannext){
                    return false;
                }*/

                //提交前执行函数
                if( !eval(that.jForm.data("submit")) ) {
                    return false
                };
                
                var btn = $(this);
                if(btn.is('form')){
                    // 表单，则默认是submit按钮的点击
                    btn = btn.find('input[type="submit"]');
                }

                var canSubmit = Q.notify.broadcast(G_BIND_FORM_BEFORE_SUBMIT,{
                    form:that.jForm,
                    "btn":btn
                });
                if((typeof canSubmit !== 'undefined' && canSubmit ==false)||that.jForm.hasClass("valid-box")){
                    return false;
                }

                if(btn.hasClass('btn_loading') || btn.attr('disabled')){
                    // 如果还在loading,不提交，防止用户重复点击
                    return false;
                }
                // post 数据
                btn.addClass('btn_loading');
                // 生成表单数据
                var url = that.jForm.attr('action');
                var temp = that.jForm.serializeArray(),
                    formDataStr={};
                $.each(temp, function (i) {
                    formDataStr[temp[i]["name"]]=temp[i]["value"];
                });
				
				 var key = temp[1]["value"];
				 
                //console.log("start print");
                //console.log($.extend({},{"parameters":[formDataStr],type:"JSONP",command:that.jForm.data("command")}));
                //console.log($.extend(formDataStr,{type:"JSONP",command:that.jForm.data("command")}));
                var tmpdata=$.extend({},{"parameters":JSON.stringify(formDataStr),type:"JSON",command:that.jForm.data("command")});
               console.log("start print");
               console.log(tmpdata);
                $.ajax({
                    url:'http://api.ubi001.com/v1/offer/search',
                    type:"get",
                    contentType : 'application/json',
                    dataType:'json',
                    async:true,
                    data:{key:key},
                   
                    timeout : 10000,
                    success:function(respon){
                        if(respon.errcode=="0"){
                            btn.removeClass('btn_loading');
                            // 提交成功
                            Q.notify.broadcast(G_BIND_FORM_SUBMIT_SUCC,{
                                form:that.jForm,
                                data:respon.data
                            });
                        }else{
                            btn.removeClass('btn_loading');
                             Q.notify.broadcast(G_BIND_FORM_SUBMIT_ERROR,{
                                form:that.jForm,
                                data:respon.exception
                            });
                        }
                    },
                    error:function(data){
                        btn.removeClass('btn_loading');
                       if(data && data.exception)
                        alert(data.exception);
                        Q.notify.broadcast(G_BIND_FORM_SUBMIT_ERROR,{
                            form:that.jForm,
                            data:data
                        });
                    }
                })
                // 屏蔽默认的表单提交
                return false;
            }
        });
       return this;
    }

    $(document).ready(function(){

        var init = function(){

            // 自动绑定所有列表
            $('.binder-form-submit,.valid-box').each(function(){

                var jThis = $(this);
                var hasBinder = jThis.data('binder-form');


                if(hasBinder)
                    return;

                jThis.data('binder-form','1');
                var bind = new FormSubmitBinder(this);
            });
        }

        Q.notify.listen(G_BIND_FORM_NEW_FORM_CREATE,init);

        init();

       
    });
})();
