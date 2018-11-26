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
//获取验证码
function getPhonedata() {
    //给按钮注册点击事件
    $('#code_btn').on('tap',function(){
        // 获取用户输入的内容
        var phonemun=$('#phonemun').val();
        //验证手机号码是否正确
        var tel=/^[1][3,4,5,7,8][0-9]{9}$/;
        // console.log(phonemun)
    if(!tel.test(phonemun)){
        mui.toast("手机号码不合法")
            return;
     }else{
         //发送请求获取验证码（需要传参数！！）
        $.ajax({
            type: "post",
            url: "users/get_reg_code",
            data:{
                mobile: phonemun
            },
            dataType: "json",
            success:function(result){
                // console.log(result);
                if(result.meta.status == 200){
                    console.log('操作成功！！！！');
                    //禁用按钮
                    $("#code_btn").attr("disabled", "disabled");
                    //定义一个时间
                    var total = 30;
                    //添加定时器
                    var timer= setInterval(function () {
                        //时间减
                         total--;
                         //改变按钮的文字
                         $("#code_btn").text(total + "秒后再获取");
                         //当时间为0时
                         if( total == 0 ){
                             //清除定时器
                             clearInterval(timer);
                            //  修改按钮原来的样子
                             $("#code_btn").text("获取验证码");
                             // 移除属性
                             $("#code_btn").removeAttr("disabled");
                         }
                       },1000)
                }else{
                    //失败！！！
                }
                
            }
        
        })


     }

    });

    $('#res_btn').on('tap',function () { 
        // 获取表单里的数据
        var mobile_txt = $("[name='mobile']").val().trim();
        var code_txt = $("[name='code']").val().trim();
        var email_txt = $("[name='email']").val().trim();
        var pwd_txt = $("[name='pwd']").val().trim();
        var pwd_txt2 = $("[name='pwd2']").val().trim();
        var gender_txt = $("[name='gender']:checked").val();
        //检测手机号码是否正确
        if(!$.checkPhone(mobile_txt)){
            mui.toast("手机号码不合法！！！");
            return;
        }

        //检测验证码是否正确
        if(code_txt.length != 4){
            mui.toast("验证码不正确！！！");
            return;
        }

        //检测邮箱是否正确
        if(!$.checkEmail(email_txt)){
            mui.toast("邮箱格式有误！！！");
            return;
        }

        //验证密码是否正确
        if(pwd_txt.length < 6 ){
            mui.toast("密码格式有误！！！");
            return;
        }
        //再次验证密码是否正确
        if(pwd_txt2 != pwd_txt){
            mui.toast("两次密码不一致！！！");
            return;
        }

        //构造一个对象用于传多个参数
        var parsams={
            mobile: mobile_txt,
            code: code_txt,
            email: email_txt, 
            pwd: pwd_txt,
            gender: gender_txt
        }

        $.post('users/reg',parsams,function (result) {
            if(result.meta.status == 200){
                mui.toast('注册成功！！！')
                setTimeout(function () {
                    //通过js实现页面跳转
                    location.href="../index.html";
                  },1000)

            }else{
                //错误提示!!!
                mui.toast(result.meta.msg)
            }
            

          })









      
     })
       
}























});
 

