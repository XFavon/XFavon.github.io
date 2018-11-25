$(function () {


    // 定义全局变量
    var CateDatas;
    var leftISscorll;

    init()
    // 初始化
    function init() {
        renderCategories()
        evenlist()

        window.onresize = function () {
            setfont()
        }
    }

    //所有绑定事件
    function evenlist() {
        //给ul添加事件委托
        $('.left').on('tap', 'li', function () {
            //使用排他的方法，实现它li添加样式
            $(this).addClass('active').siblings().removeClass('active');
            //获取点击元素的索引
            var index = $(this).index();
            //渲染数据
            renderright(index);
            // 点击菜单 往上置顶
            leftISscorll.scrollToElement(this);
        })
    }

    //获取左侧栏
    function renderleft() {
        //发送请求数据
                    var categoryhtml = template('lisTmp', {
                data: CateDatas
            });
            //渲染模板
            $('.left').html(categoryhtml);
            //给左边的父元素添加滚动事件（给父元素添加滚动事件，其第一个子元素可以滚动，其他的忽略）
            leftISscorll = new IScroll('.left')

    }

    //获取 content 数据
    function renderright(index) {
        var childrens = CateDatas[index].children;
        //获取模板数据
        var rigthHTML = template('categoriesTmp', {
            data: childrens
        })
        //渲染模板数据
        $('.rigth').html(rigthHTML);
        /**
         * （掌握）资源优化！！！！
         * 等所有数据加载完毕再执行
         * 
         */
        //获取元素的子元素的长度
        var times = $('.rigth img').length;
        //添加加载事件
        $('.rigth img').on('load', function () {
            //每加载成功一次数据，元素的长度减1
            times--;
            //假若长度为0，说明数据已经加载完毕
            if (times == 0) {
                //添加滑动事件
                var rightScroll = new IScroll(".rigth");
            }
        })

    }


    //发送请求获取数据回来
    function getCategories() {
        //发送请求
        $.get('categories', function (result) {
            // 判断数据是否发送成功
            if (result.meta.status == 200) {
                //拿到数据库返回来的数据，存储到CateDatas里
                CateDatas = result.data;
                //定义需要存储进浏览器的信息
                var obj = {
                    //总数据
                    data: CateDatas,
                    //传入的时间  给数据定义一个有效期
                    time: Date.now()
                }
                //因为本地存储的数据的字符串的形式存储，所以需要将js数据或对象转换为json格式字符串
                var jsonCateDatas = JSON.stringify(obj);
                //将数据存储进浏览器
                localStorage.setItem('cates', jsonCateDatas);
                //渲染数据
                renderleft()
                renderright(0)
            }
        });
    }

    //渲染整个页面的数据
    function renderCategories() {
        /**
         * 判断浏览器是否有缓存？？？即此前是否传入数据
         * 如果有传入，需要拿到旧数据进行判断是否过期，若数据过期则重新发送数据渲染页面，否则将旧数据重置再渲染页面
         * 没有数据则重新发送请求渲染数据
         */
        //判断浏览器是否传入数据
        if (localStorage.getItem('cates')) {
            // 拿到本地存储数据
            var catesStr = localStorage.getItem('cates');
            //将json字符串转换为数组对象
            var localData = JSON.parse(catesStr);
            //判断数据是否过期
            if (Date.now() - localData.time > 10 * 10000) {
                //重新发送请求渲染数据
                getCategories()
            } else {
               
                //重置数据
                CateDatas = localData.data;
                // 渲染数据
                renderleft()
                renderright(0)
            }
        } else {
            //重新发送请求渲染数据
            getCategories()
        }
    }


    setfont()
    //使用js 实现rem设置的字体随着屏幕的变化而变化
    function setfont() {
        //基础值
        var base = 100;
        //设计稿的宽度
        var shejigao = 320;
        //获取当前页面的宽度
        var pageWidth = document.querySelector('html').offsetWidth;
        // 要计算的fontsize的大小=  基础值 *  要适配的屏幕的宽度/   设计稿的宽度 （320）
        var fz = base * pageWidth / shejigao;
        //设置根目录的字体大小
        document.querySelector('html').style.fontSize = fz + 'px';


    }







})