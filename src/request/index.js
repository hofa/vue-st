

var request = {
  uid: 0,
  token: "",
  timout: 1000,
  g: function(url, data, bcb, scb) {


    //1.创建XMLHttpRequest组建
    var xhr = new XMLHttpRequest()
    // console.log(XMLHttpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8"))
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    //2.设置回调函数
    xhr.onreadystatechange = function() {

      try {
        if(xhr.readyState == 4) {
           // 判断对象状态是否交互成功,如果成功则为200
          if(xhr.status == 200) {
              var response = xhr.responseText;
              if (typeof bcb == 'function' || typeof bcb == 'object') {
                  scb(response);
              } else {
                  // console.log('b err');
              }
          } else{
            console.log("ajax error");
          }
        } else {
          // 等待事件
           if (typeof bcb == 'function' || typeof bcb == 'object') {
                bcb();
            } else {
                // console.log('b err');
            }
        }
      } catch(e) {
        console.log(e)
      }
    }

    xhr.timeout = this.timeout;
    xhr.ontimeout = function(){
        console.log('request timeout');
    }
    //post请求要自己设置请求头


    //3.初始化XMLHttpRequest组建
    xhr.open("POST", url, true)

    data = JSON.stringify({a: 1, b: 2})
    // console.log(data)
    //4.发送请求
    xhr.send(data)


    // data = $.extend(data, this.cmArg());

    // if (this.uid != 0) {
    //     data['u'] = this.uid;
    //     data['t'] = this.token;
    // }

    // $.ajax({
    //     timout: this.timeout,
    //     data: JSON.stringify(data),
    //     url:url,
    //     async: true,
    //     dataType: 'json',
    //     type: 'POST',
    //     beforeSend: function (XMLHttpRequest) {
    //         if (typeof bcb == 'function' || typeof bcb == 'object') {
    //             bcb(XMLHttpRequest);
    //         } else {
    //             // console.log('b err');
    //         }
    //     },
    //     error: function(XMLHttpRequest, textStatus, errorThrown) {
    //         // alert(XMLHttpRequest.status);
    //         // alert(XMLHttpRequest.readyState);
    //         CM.alert('Error:' + textStatus);
    //     },
    //     success: function(res)
    //     {
    //         if (typeof scb == 'function' || typeof scb == 'object') {
    //             scb(res);
    //         } else {
    //             console.log(scb);
    //         }
    //     }
    // });
    }
}


export default request;
