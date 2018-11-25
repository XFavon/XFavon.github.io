$(function () {  
    init();




    function init() {
        getswiperdata();
        getcatitems();
        getgoodslist();
      }





      //获取轮播图数据
    function getswiperdata() {  
        $.ajax({
            type: "get",
            url: "home/swiperdata",
            dataType: "json",
            success: function (result) {
                // console.log(result)
                if(result.meta.status==200){
                    var html=template('sliderTmp',{data:result.data})
                    $('.pyg_silder').html(html);

                    var gallery = mui('.mui-slider');
                    gallery.slider({
                    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                    });
                }
            }
        });



    }

    //获取首页分页数据
    function getcatitems() {  
        $.get('home/catitems',function (result){ 
            // console.log(result);
            if(result.meta.status == 200){
            var catehtml=template('catesTmp',{data:result.data})
            $('.pyg_cates').html(catehtml);
            }
         })
    }

    //获取首页主干数据
    function getgoodslist() { 
        $.get('home/goodslist',function (result) {  
            // console.log(result);
            if(result.meta.status == 200){
                var goodshtml=template('goodsTmp',{data:result.data});
                $('.pyg_lists').html(goodshtml);
            }
       
            
        })
     }























})