jQuery(function($){
    // 渲染数据
    var $ul1 = $(".render_r");
    $.ajax({
        url: "./api/list1.php",
        success: function (res) {
            var result1 = JSON.parse(res);
            var result = result1.data;
            var pagenum = Math.ceil(result1.total/12);
            var str = "";
            for(var i=0;i<result.length;i++){
                str += `<li data_id="${result[i].id}">
                    <a href="javascript:;" class="a_img">
                        <img src="${result[i].url}" alt="">
                    </a>
                    <a href="javascript:;" class="a_name">${result[i].title.slice(0,8)}</a>
                    <p>${result[i].author.slice(0,5)}</p>
                    <div class="clearfix">
                        <span class="fl">￥${result[i].newprice}</span>
                        <span class="fl">包邮</span>
                        <span class="fr">定价￥${result[i].oldprice}</span>
                    </div>
                    <button>立即购买</button>
                </li>`;
            }
            $ul1.html(str);
            var $lis1 = $ul1.find("li");
            $lis1.click(function(){
                var id = $(this).attr("data_id");
                location.href="./html/details.html?id="+id;
            });
            var $parent = $(".render");
            for(var i=1;i<=pagenum;i++){
                $("<span>"+i+"</span>").appendTo($parent);
            }
            var $btn2 = $parent.children("span");
            $($btn2[0]).addClass("active");
            $btn2.click(function(){
                $btn2.removeClass("active");
                $(this).addClass("active");
                var page = $(this).text();
                $.ajax({
                    url: "./api/list1.php",
                    data: {
                        page:page
                    },
                    success: function (res) {
                        var result1 = JSON.parse(res);
                        var result = result1.data;
                        var pagenum = Math.ceil(result1.total/12);
                        var str = "";
                        for(var i=0;i<result.length;i++){
                            str += `<li data_id="${result[i].id}">
                                <a href="javascript:;" class="a_img">
                                    <img src="${result[i].url}" alt="">
                                </a>
                                <a href="javascript:;" class="a_name">${result[i].title.slice(0,8)}</a>
                                <p>${result[i].author.slice(0,5)}</p>
                                <div class="clearfix">
                                    <span class="fl">￥${result[i].newprice}</span>
                                    <span class="fl">包邮</span>
                                    <span class="fr">定价￥${result[i].oldprice}</span>
                                </div>
                                <button>立即购买</button>
                            </li>`;
                        }
                        $ul1.html(str);
                        var $lis1 = $ul1.find("li");
                        $lis1.click(function(){
                            var id = $(this).attr("data_id");
                            location.href="./html/details.html?id="+id;
                        });
                    }
                });
            })
        }
    });
    // 本站常销区域
    var $ul2 = $(".site>ul");
    $.ajax({
        url: "./api/list2.php",
        success: function (res) {
            var result = JSON.parse(res);
            var str = "";
            for(var i=0;i<result.length;i++){
                str += `<li data_id="${result[i].id}">
                    <a href="javascript:;" class="a_pic">
                        <img src="${result[i].url}" alt="">
                    </a>
                    <a href="javascript:;">${result[i].title.slice(0,8)}</a>
                    <p>${result[i].author.slice(0,8)}</p>
                    <div class="clearfix">
                        <span class="fl">￥${result[i].newprice}</span>
                        <span class="fl">￥${result[i].oldprice}</span>
                    </div>
                    <button>加入购物车</button>
                </li>`;
            }
            $ul2.html(str);
            var $lis2 = $ul2.find("li>a");
            $lis2.click(function(){
                var id = $(this).parent().attr("data_id");
                location.href="./html/details.html?id="+id;
            });
            // 加入购物车
            var $btn = $(".site>ul>li>button");
            $btn.click(function(){
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