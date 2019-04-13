// ==============放大镜的代码======================
jQuery(function($){
    var $sign = $(".sign");
    var $rbox = $(".big_img");
    var $rimg = $rbox.find("img");
    $(".big_l").mouseover(function(){
        $sign.show();
        $rbox.show();
    }).mousemove(function(){
        var x = event.x - $sign.width()/2 - $(this).offset().left;
        var y = event.y - $sign.height()/2 - $(this).offset().top;
        var max_x = $(this).width() - $sign.width();
        var max_y = $(this).height() - $sign.height();
        if(x>max_x) {
            x = max_x;
        }
        if(y>max_y) {
            y = max_y;
        }
        if(x<=0) {
            x= 0;
        }
        if(y<=0) {
            y = 0;
        }
        $sign.css({"left":x+"px","top":y+"px"});
        $rimg.css({"left":-2*x+"px","top":-2*y+"px"});
    }).mouseout(function(){
        $sign.hide();
        $rbox.hide();
    });
    // 渲染数据
    var $render = $(".big_c");
    var $spic = $(".big_l>img");
    var $bpic = $(".big_img>img");
    var id = location.search.slice(4);
    $.ajax({
        url: "./api/details.php",
        data:{id:id},
        success: function (res) {
            var result = JSON.parse(res);
            $spic.prop("src",result[0].url);
            $bpic.prop("src",result[0].url);
            str = `<div class="big_c1">
                <h4>
                    ${result[0].title}
                </h4>
                <p class="p1">
                    ${result[0].desc}
                </p>
                <p class="p2">
                    作者： <a href="#">${result[0].author}</a>
                </p>
                <p class="p3">
                    出版社： 
                    <a href="#">${result[0].club}</a>
                    出版时间： 
                    <span>${result[0].outtime}</span>
                </p>
                <p class="p4">
                    开本： 
                    <span>${result[0].kaiben}</span>
                    页数： 
                    <span>${result[0].page}</span>
                </p>
                <p class="p5">
                    读者评分： 
                    <span>${result[0].grade}</span>
                    <i class="iconfont icon-xingxing"></i>
                    <i class="iconfont icon-xingxing"></i>
                    <i class="iconfont icon-xingxing"></i>
                    <i class="iconfont icon-xingxing"></i>
                    <i class="iconfont icon-yiban"></i>
                    <a href="#">${result[0].comment}条评论</a>
                </p>
                <p class="p6">
                    排名： 
                    <a href="#">${result[0].rankname}</a>
                    第<span>${result[0].ranknum}</span>位
                </p>
            </div>
            <div class="big_c2">
                <div class="clearfix">
                    <p class="fl">
                        中图价： 
                        <span>￥${result[0].newprice}</span>
                    </p>
                    <p class="fl">
                        <span>(${result[0].count}折)</span>
                        定价:<span>￥${result[0].oldprice}</span>
                        <a href="#">登录后可看到会员价</a>
                    </p>
                </div>
                <p>
                    促销活动： 
                    <a href="#">3-5折|每满99减30</a>
                    <a href="#">新上架特惠下单折上七折</a>
                </p>
            </div>
            <div class="big_c3 clearfix">
                <a href="#" class="fl">
                    <i class="iconfont icon-gouwuche"></i>
                    加入购物车
                </a>
                <a href="#" class="fl">收藏</a>
                <a href="#" class="fl">运费6元，满69元免运费</a>
            </div>
            <div class="big_c4">
                <span>温馨提示：</span>
                5折以下图书主要为出版社尾货，大部分为全新，个别图书品相8-9成新、切口
                有划线标记、光盘等附件不全
            </div>`;
            $render.html(str);
            
            // 加入购物车
            var btn = $(".big_c3>a")[0];
            $(btn).click(function(){
                $.ajax({
                    url: "./api/list3.php",
                    data: {id:id},
                    success: function (res2) {
                        var result2 = JSON.parse(res2);
                        $.ajax({
                            url: "./api/list4.php",
                            data: {
                                id:result2[0].id,
                                title:result2[0].title,
                                url:result2[0].url,
                                oldprice:result2[0].oldprice,
                                newprice:result2[0].newprice
                            },
                            success: function (res2) {
                                location.href = "./html/gouwuche.html";
                            }
                        });
                    }
                });
                return false;
            })
        }
    });
    // 买过本商品的人还买了
    var $ul1 = $(".detail_r1>div>ul");
    $.ajax({
        url: "./api/details1.php",
        success: function(res){
            var result = JSON.parse(res);
            str = "";
            for(var i=0;i<result.length;i++){
                str += `<li data_id="${result[i].id}">
                    <a href="javascript:;">
                        <img src="${result[i].url}" alt="">
                    </a>
                    <a href="javascript:;">${result[i].title.slice(0,9)}</a>
                    <p>${result[i].author.slice(0,7)}</p>
                    <div>
                        <span>￥${result[i].newprice}</span>
                        <span>￥${result[i].oldprice}</span>
                    </div>
                </li>`;
            }
            $ul1.html(str);
            var $lis1 = $ul1.find("li>a");
            $lis1.click(function(){
                var $id = $(this).parent().attr("data_id");
                location.href="./html/details.html?id="+$id;
            });
        }
    });
    // 左右按键
    var $btns = $(".detail_r1>div>div>i");
    var $zuo = $btns.filter(".fl");
    var $you = $btns.filter(".fr");
    var a = true;
    $you.click(function(){
        if(a){
            $ul1.css({"transform":"translate(-980px)"});
            a = false;
        }
    });
    $zuo.click(function(){
        if(!a){
            $ul1.css({"transform":"translate(0px)"});
            a = true;
        }
    });
    // 逻辑推荐区域
    var $ul2 = $(".edit>ul");
    $.ajax({
        url: "./api/details2.php",
        success: function(res){
            var result = JSON.parse(res);
            str = "";
            for(var i=0;i<result.length;i++){
                str += `<li data_id="${result[i].id}">
                    <a href="javascript:;">
                        <img src="${result[i].url}" alt="">
                    </a>
                    <a href="javascript:;">${result[i].title.slice(0,7)}</a>
                    <p>${result[i].author.slice(0,7)}</p>
                    <div>
                        <span>￥${result[i].newprice}</span>
                        <span>￥${result[i].oldprice}</span>
                    </div>
                    <button>加入购物车</button>
                </li>`;
            }
            $ul2.html(str);
            var $lis2 = $ul2.find("li>a");
            $lis2.click(function(){
                var $id = $(this).parent().attr("data_id");
                location.href="./html/details.html?id="+$id;
            });
            // 加入购物车
            var $btn1 = $(".edit>ul>li>button");
            $btn1.click(function(){
                var id1 = $(this).parent().attr("data_id");
                $.ajax({
                    url: "./api/list3.php",
                    data: {id:id1},
                    success: function (res1) {
                        var result1 = JSON.parse(res1);
                        $.ajax({
                            url: "./api/list4.php",
                            data: {
                                id:result1[0].id,
                                title:result1[0].title,
                                url:result1[0].url,
                                oldprice:result1[0].oldprice,
                                newprice:result1[0].newprice
                            },
                            success: function (res2) {
                                location.href = "./html/gouwuche.html";
                            }
                        });
                    }
                });
            })
        }
    });
})