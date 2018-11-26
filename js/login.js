$(function () {

    init();


    function init() {
        getLogin()


    }

    function getLogin() {

        $('#login_btn').on('tap', function () {
            //获取用户名和用户密码
            var username = $("[name='username']").val().trim();
            var userpwd = $("[name='userpassword']").val().trim();
            //验证用户名信息
            if (!$.checkPhone(username)) {
                mui.toast('账号不存在!!!');
                return;
            }
            //验证用户名密码
            if (userpwd.lenth > 6) {
                mui.toast('密码格式不对!!!');
                return;
            }

            //发送数据请求信息
            $.ajax({
                type: "post",
                url: "login",
                data: {
                    username: username,
                    password: userpwd
                },
                dataType: "json",
                success: function (result) {
                    console.log(result)
                    if(result.meta.status == 200){
                        //提示信息
                        mui.toast('登陆成功!品优购欢迎您~');
                        //把拿回来的数据存进浏览器
                        sessionStorage.setItem('userinfo',JSON.stringify(result.data));
                        //判断用户是不是从浏览页面跳过来的!!!!
                        var pageurl=sessionStorage.getItem('pageurl');
                        //判断
                        if(!pageurl){
                            location.href=pageurl;

                        }
                        //设置页面跳转!
                        setTimeout(function(){
                            location.href='../index.html';
                        },1000)
                    }else{
                        //提示错误!!!!
                        mui.toast(result.meta.msg);
                    }




                }
            });



        })






    }






})