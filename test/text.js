


function getCategories() {  
    $.get('categories',function (result) {
        //准备材料
        if(result.meta.status == 200){
            CateDatas=result.data;
            var obj={
                data:CateDatas,
                time:Date.now()
            }
            var jsonStr=JSON.stringify(obj);
            localStorage.setItem('cates',jsonStr)
            renderleft();
            rendenright(0)
        }
        //判断工作
        if(localStorage.getItem('cates')){

            var orddata=localStorage.getItem('cates');
            var ordStr=JSON.parse(orddata)
            if(Date.now() - localStorage.time > 10 *1000 ){
                renderCategories()
            }else{
                CateDatas=ordStr.data
                renderleft()
                renderright(0)

            }
        }else{
            renderCategories()
        }

        //不用传数据的TAb栏
        var childrens=CateDatas[index].childrens;

        var times=$('.rigth img ').length;
        $('.rigth img ').on('load',function () {

            times--;
            if(index == 0 ){
                var 
            }
          })


      })


}