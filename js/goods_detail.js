$(function () { 

//定义一个全局变量
var GOODOBJ;

init()
//初始化函数
function init() { 
    getGoodssilder()
    evenlist()
 }


//生成动态轮播图
function getGoodssilder() {
     //发送请求
    $.get('goods/detail',{goods_id:$.getUrl("goods_id")},function (result) { 
        // console.log(result);
        //定义一个全局变量,便于下面使用
        GOODOBJ=result.data;
        //拿到模板数据
        var html=template('goodsliderTmp',GOODOBJ);
        //渲染模板数据
        $('.pyg_view').html(html)
        //轮播图初始化
        var gallery = mui('.mui-slider');
        gallery.slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
        }); 
     })
}



function evenlist() { 

    $('#buy_btn').on('tap',function () { 
        //获取浏览器的session
        var getsession=sessionStorage.getItem('userinfo');
        //将源跳转过来的页面存储起来!!!!
        sessionStorage.setItem("pageurl", location.href);
        //判断session 是否存在!!!
        if(!getsession){
            //提示用户重新登陆!
            mui.toast('你还没有登陆!请重新登陆!!!');
            //跳转页面!!
            setTimeout(function () { 
                location.href="./login.js";
             },1000)

        }else{
            //如果用户已经登陆过!则将用户数据
            //定义一个对象存储需要的参数
            var goodsObj={
                cat_id:GOODOBJ.cat_id,
                goods_id:GOODOBJ.goods_id,
                goods_name:GOODOBJ.goods_name,
                goods_number:GOODOBJ.goods_number,
                goods_price:GOODOBJ.goods_price,
                goods_small_logo:GOODOBJ.goods_small_logo,
                goods_weight:GOODOBJ.goods_weight
            }
         
            //将js对象转换为json字符串
            var goodsTR=JSON.stringify(goodsObj)

            //将我们存进浏览器的数据转为对象拿到token
            var token =JSON.parse(getsession).token;

            //发送请求拿数据!!!
             $.ajax({
                 type: "post",
                 url: "my/cart/add",
                 data: {info:goodsTR},
                 dataType: "json",
                 headers:{
                    "Authorization" : token
                 },
                 success: function (result) {
                     console.log(result);
                     
                 }
             });




        }




     })




}











 })