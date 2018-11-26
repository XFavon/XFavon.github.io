$(function () {


    //定义全局变量方便传参数
    var QueryParams = {
        // 查询关键字
        query: '',
        // 获取分类ID
        cid: $.getUrl("cid"),
        //页数
        pagenum: 1,
        //每页的长度
        pageSize: 10
    }
 
    // 初始化页数
    var TotalPages = 1
   //调用初始化函数
   init()

    //初始化
    function init() {
        evenlist();
        mui.init({
            pullRefresh: {
                // 指定一个下拉刷新容器标识
                container: ".pyg_view",
                // 下拉刷新组件
                down: {
                    // 自动触发  默认先显示一次 下拉刷新组件
                    auto: true,
                    //  触发下拉刷新时自动触发
                    callback: function () {
                        //重置页数
                        QueryParams.pagenum = 1;
                        //回调函数：下拉刷新执行
                        getGoodsList(function (goods) {
                            //拿到模板数据
                            var html = template('listTmp', {
                                arr: goods
                            })
                             //渲染模板
                            $('.goods_item').html(html);
                            //结束下来刷新
                            mui('.pyg_view').pullRefresh().endPulldownToRefresh();
                            // 重置上拉组件
                            mui('.pyg_view').pullRefresh().refresh(true);
                        });

                    }
                },
                // 上拉加载下一页
                up: {
                    //  触发上拉刷新时自动触发
                    callback: function () {
                        //判断其页数是否需要关闭上拉
                        if (QueryParams.pagenum >= TotalPages) {
                            //说明没有数据，结束上拉操作
                            mui('.pyg_view').pullRefresh().endPullupToRefresh(true);
                        }else{
                            //增加页面数据
                            QueryParams.pagenum++;
                            //执行回调函数追加数据
                            getGoodsList(function (goods) {
                                //模板
                                var html = template('listTmp', {
                                    arr: goods
                                });
                                //追加数据
                                $('.goods_item').append(html);
                                //说明有数据传入
                                mui('.pyg_view').pullRefresh().endPullupToRefresh(false);
                            })
                        }
                    }
                }
            }
        });
    }
    


    /**
     * 今日流程：
     * 1.当弹性盒子遇上单行省略或子元素宽度过大的时候，记得把老大印藏起来（ overflow: hidden;）然后再慢慢膨胀（text-overflow: ellipsis;overflow: hidden;white-space: nowrap;）
     * 2.下拉
     *   2.1引用MUI的组件，使其可以在页面显示出来 记得初始化！！！
     *   2.2其次主要是通过回调函数处理业务逻辑  
     *   2.3当进行下拉操作时，通过回调函数拿到模板数据进行渲染，然后结束下拉，再重置组件！！！
     * 3.上拉
     *   3.1根据拿回来的页面数据进行计算，判断是否还需要追加数据！！！！
     * 
     */



    //获取商品列表
    function getGoodsList(callback) {
        $.get('goods/search', QueryParams, function (result) {
            if (result.meta.status == 200) {
                //计算总页面数 （天花板！！！）
                TotalPages = Math.ceil(result.data.total / QueryParams.pageSize);

                callback(result.data.goods);
            } else {
                //说明失败
            }
        })
    }


    //绑定事件
    //获取a标签上的href属性
    function evenlist() {
        $('.goods_item').on('tap', 'a', function () {
            var href = this.href;
            location.href = href;
        })
    }






})