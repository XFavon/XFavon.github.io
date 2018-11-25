$(function () { 


init()
//初始化函数
function init() { 
    getGoodssilder()
 }


//生成动态轮播图
 function getGoodssilder() {
    $.get('goods/detail',{goods_id:getUrl("goods_id")},function (result) { 
        console.log(result);
        var html=template('goodsliderTmp',result.data);
        $('.pyg_view').html(html)
        var gallery = mui('.mui-slider');
        gallery.slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
        }); 
     })



   }


   







    //获取url的参数
    function getUrl(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }









 })