$(function () { 

//发送请求之前所操作的       拦截器！！！
// 属于 框架的配置的部分 懂得怎么去使用就可以了。
$.ajaxSettings.beforeSend=function (xhr,ajaxObj) { 
/**
 * xhr  原生的ajax对象
 * ajaxObj   $ajax 对象
 * ajax.url  http://api.pyg.ak48.xyz/api/public/v1/ 取接口的相同部分
 */
    ajaxObj.url="http://api.pyg.ak48.xyz/api/public/v1/" + ajaxObj.url;


    $('body').addClass('loadding');
 }
 // 发送成功后被调用       拦截器！！！
 $.ajaxSettings.complete = function () {

    $('body').removeClass('loadding');
 }









 })