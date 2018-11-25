$(function () { 
    init()


function init() {
    getPhonedata()
}

/**
 * 
 * 清除浮动
 * 1.给父元素高度
 * 2.添加overflow:hidden
 * 3.添加伪元素清除浮动
 */

function getPhonedata() {
    $('#code_btn').on('tap',function(){
        $.ajax({
            type: "post",
            url: "http://api.pyg.ak48.xyz/api/public/v1/users/get_reg_code",
            dataType: "json",
            beforeSend:function () { 
                var phonemun=$('#phonemun').val();
                var tel=/^[1][3,4,5,7,8][0-9]{9}$/;
            if(!tel.test(phonemun)){
                    //待添加元素提示用户重新输入(动画延迟)
                   var tips=$('.tips')
                    $('.tips').text('请输入正确的手机号码').fadeIn(1000).delaycall({'func':tips ,'times':1000}).fadeOut(1000);
                    return false;
             }else{
                var total = 5;
                var timer= setInterval(function () {
                     total--;
                     console.log(total);
                     if( total < 0 ){
                         clearInterval(timer);
                         return;
                     }
                     $('#code_btn').val(total + '秒后再获取');
                   },1000)
             }

            


            },
            success:function(result){
                console.log(result);
                
            }

        })
    });
       
}

});
 

