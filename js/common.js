$(function () { 



//使用模板导入定义公共的URL变量!!!!!
var baseurl="http://api.pyg.ak48.xyz/";

//导入模板引擎定义好的变量
if(window.template){
    template.defaults.imports.baseurl=baseurl;
}










//发送请求之前所操作的       拦截器！！！
// 属于 框架的配置的部分 懂得怎么去使用就可以了。
$.ajaxSettings.beforeSend=function (xhr,ajaxObj) { 
/**
 * xhr  原生的ajax对象
 * ajaxObj   $ajax 对象
 * ajax.url  http://api.pyg.ak48.xyz/api/public/v1/ 取接口的相同部分
 */
    ajaxObj.url=baseurl+"api/public/v1/" + ajaxObj.url;


    $('body').addClass('loadding');
 }
 // 发送成功后被调用       拦截器！！！
 $.ajaxSettings.complete = function () {

    $('body').removeClass('loadding');
 }



   // 扩展zepto (里面封装了很多很多函数哇)
   $.extend($, {



    /**
     * 获取url上参数的值
     * @param {String} name 要求查询的参数名
     */
    getUrl: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },



    /**
     * 使用正则验证号码
     * @param {Number} phone 要验证的手机号码
     */
    checkPhone: function (phone) {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
      } else {
        return true;
      }
    },



    /**
     * 验证邮箱合法性
     * @param {email} myemail 邮箱
     */
    checkEmail: function (myemail) {
      var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      if (myReg.test(myemail)) {
        return true;
      } else {
        return false;
      }
    }



  })









 })