(function($){
    $.fn.crxCarousel = function(obj){
        var defaults = {
            img : [],
            width : 200,
            height : 200,
            type : "horizontal",
            seamless : false,
            idx : 0
        }
        var obj = Object.assign({},defaults,obj);
        obj.img.push(obj.img[0]);
        $(this).each(function(idx,item){
            var len = obj.img.length;
            var $ul;
            //初始化
            var init = () => {
                $ul = $("<ul/>");
                $ul.appendTo($(item).addClass("crxCarousel"));
                for(var i=0;i<len;i++){
                    $('<img src="'+obj.img[i]+'"/>').width(obj.width).height(obj.height).appendTo($('<li></li>').appendTo($ul))
                    ;
                }
                $(item).width(obj.width).height(obj.height);
                if(obj.type == "horizontal"){
                    $ul.width(obj.width*len).addClass("horizontal");
                }else if(obj.type == "faded"){
                    $ul.width(obj.width).height(obj.height).addClass("faded");
                }
                move();

            }
            // 生成页码
            var $sign;
            var sign = () => {
                $sign = $("<div></div>");
                $sign.addClass("page").appendTo($(this));
                for(var i=1;i<len;i++){
                    $("<span>"+i+"</span>").appendTo($sign);
                }
                clickpage();
            }
            //点击页码，改变索引、图片
            var clickpage = () => {
                $sign.children().click(function(){
                    obj.idx = $(this).text() - 2;
                    auto();
                    $sign.children().removeClass("active");
                    $(this).addClass("active");
                });
            }
            //生成左右按钮
            // var $zuo;
            // var $you;
            // var buttons = () => {
            //     $zuo = $("<p><</p>");
            //     $zuo.addClass("zuo").appendTo($(this));
            //     $you = $("<p>></p>");
            //     $you.addClass("you").appendTo($(this));
            //     $you.click(function(){
            //         auto();
            //     });
            //     $zuo.click(function(){
            //         if(obj.idx == 0){
            //             obj.idx = len - 3;
            //         }else{
            //             obj.idx = obj.idx - 2; 
            //         }
                    
            //         auto();
            //     });
            // }
            var timer;
            //轮播图滚动
            var move = () => {
                timer = setInterval(function(){
                    auto();
                }, 2000)
            }
            //鼠标悬停
            var slide = () => {
                $(this).hover(function(){
                    clearInterval(timer);
                },function(){
                    timer = setInterval(function(){
                        auto();
                    }, 2000)
                });
            }
            //执行滚动
            var auto = () => {
                $sign.children().removeClass("active");
                obj.idx++;
                
                if(obj.idx > len-1){
                    obj.idx = 1;
                    $ul.css({"left":0,"top":0});
                }
                if(obj.idx == len-1){
                    $sign.children()[0].classList.add("active");  
                }else if(obj.idx < len-1){
                    $sign.children()[obj.idx].classList.add("active");              
                }
                if(obj.type == "vertical"){
                    $ul.animate({"top":-obj.idx * obj.height},500);
                }else if(obj.type == "horizontal"){
                    $ul.animate({"left":-obj.idx * obj.width},500);
                }else{
                    $ul.children().not(":eq("+obj.idx+")").fadeOut(500);
                    $ul.children().filter(":eq("+obj.idx+")").fadeIn(500);
                }
            }
            init();
            slide();
            sign();
            // buttons();
            $sign.children()[0].classList.add("active");
        })
    }
})(jQuery)