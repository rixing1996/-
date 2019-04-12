jQuery(function($){
    // ========================================
    // 轮播图
    var $banner = $("#carousel .banner");
    var $ban_lis = $banner.find("ul li");
    var $ban_page = $banner.find(".banner_show span");
    var index = 0;
    var timer;
    $ban_lis[0].style.zIndex = "1";
    $ban_page[0].style.background = "orange";
    timer = setInterval(function(){
        auto();
    },2000);
    // 滑上下面的内容，图片跑到对于的位置
    $ban_page.mouseover(function(){
        clearInterval(timer);
        index = $(this).attr("data_id");
        index--;
        auto();
    }).mouseout(function(){
        timer = setInterval(function(){
            auto();
        },2000);
    });
    // 滑上li标签，停止轮播，移开开启
    $ban_lis.mouseover(function(){
        clearInterval(timer);
    }).mouseout(function(){
        timer = setInterval(function(){
            auto();
        },2000);
    });
    // 点击左右键切换
    var $zy = $banner.find(".banner_btn span");
    var $zuo = $banner.find(".banner_btn .fl");
    var $you = $banner.find(".banner_btn .fr");
    $zy.mouseover(function(){
        clearInterval(timer);
    }).mouseout(function(){
        timer = setInterval(function(){
            auto();
        },2000);
    });
    $you.click(function(){
        auto();
    });
    $zuo.click(function(){
        index = index - 2;
        if(index < -1){
            index = 4;
        }
        auto();
    });
    function auto(){
        index++;
        if(index >= $ban_lis.length){
            index = 0;
        }
        $ban_lis.css({"zIndex":0});
        $ban_page.css({"background":"rgba(49, 41, 36,0.8)"});
        $ban_lis[index].style.zIndex = "1";
        $ban_page[index].style.background = "orange";
    }
    // ======================================
    // 新品特惠区域
    var $lis1 = $(".hotbook .hot_ban li");
    var $as1 = $(".hot_show_t a");
    $as1.click(function(){
        var id = $(this).attr("data_id");
        location.href="./html/details.html?id="+id;
    });
    var $ul1 = $(".hot_show_b");
    $lis1.mouseover(function(){
        $lis1.css({"float": "left",
            "padding":"10px 25px",
            "fontSize": "16px",
            "background": "rgb(239, 242, 250)",
            "paddingTop": "8px",
            "borderTop":"0 none",
            "fontWeight": "300",
            "color":"black"});
        $(this).css({"background": "white",
            "borderTop": "2px solid rgb(230, 0, 0)",
            "paddingTop": "8px",
            "color":"rgb(230, 0, 0)",
            "fontWeight": 600});
        var id = $(this).attr("date_id");
        $.ajax({
            url:"./api/index1.php",
            data:{id:id},
            success:function(res){
                var result = JSON.parse(res);
                var str = "";
                for(var i=1;i<result.length;i++){
                    str += `<li data_id="${result[i].id}">
                    <a href="#"><img src="${result[i].url}" alt=""></a>
                    <a href="#">${result[i].title}</a>
                    <p>
                        <span>￥${result[i].newprice}</span>
                        <span>￥${result[i].oldprice}</span>
                    </p>
                    </li>`;
                }
                $ul1.html(str);
                var $spans1 = $(".hot_show_t span");
                var $divs1 = $(".hot_show_t>div>div");
                $divs1[0].innerText = result[0].desc;
                $spans1[0].innerText = result[0].newprice;
                $spans1[1].innerText = result[0].oldprice;
                $as1.attr("data_id",result[0].id);
                $as1[0].children[0].src = result[0].url;
                $as1[1].innerText = result[0].title;
                var $as2 = $ul1.find("li");
                $as2.click(function(){
                    var id = $(this).attr("data_id");
                    location.href="./html/details.html?id="+id;
                });
            }

        })
    })
    // =========================
    // 淘书团热销渲染
    var $ul2 = $(".team_content>ul");
    $.ajax({
        url: "./api/index2.php",
        success: function (res) {
            var result = JSON.parse(res);
            str = "";
            for(var i=0;i<result.length;i++){
                str += `<li data_id="${result[i].id}">
                    <a href="#"><img src="${result[i].url}" alt=""></a>
                    <div>
                        <a href="#">${result[i].desc}</a>
                        <p class="clearfix">
                            团购价:￥
                            <span>${result[i].newprice}</span>
                            <span>￥${result[i].oldprice}</span>
                            <span class="fr">${result[i].count}折</span>
                        </p>
                    </div>
                </li>`;
            }
            $ul2.html(str);
            var $lis7 = $ul2.find("li");
            $lis7.click(function(){
                var id = $(this).attr("data_id");
                location.href="./html/details.html?id="+id;
            });
        }
    });
    // =============================
    // 包邮区
    var $ul3 = $(".mail_content");
    $.ajax({
        url: "./api/index3.php",
        success: function (res) {
            var result = JSON.parse(res);
            str = "";
            for(var i=0;i<result.length;i++){
                str += `<li data_id="${result[i].id}">
                    <a href="#">${result[i].title}</a>
                    <span>¥${result[i].oldprice}</span>
                    <img src="./img/baoyou1.png" alt="">
                    <a href="#"><img src="${result[i].url}" alt=""></a>
                </li>`;
            }
            $ul3.html(str);
            var $lis8 = $ul3.find("li");
            $lis8.click(function(){
                var id = $(this).attr("data_id");
                location.href="./html/details.html?id="+id;
            });
        }
    });
    // =========================
    // 文学图书区
    var $lis2 = $(".wxbook_ban>ul>li");
    $lis2.mouseover(function(){
        var id = $(this).attr("data_id");
        $.ajax({
            url: "./api/index4.php",
            data: {id:id},
            success: function (res) {
                var result = JSON.parse(res);
                var $ul4 = $(".wxbook_content_c");
                var str = "";
                for(var i=0;i<result.length;i++){
                    str += `<li data_id="${result[i].id}">
                        <a href="#">
                            <img src="${result[i].url}" alt="">
                        </a>
                        <a href="#">${result[i].title.slice(0,7)}</a>
                        <p>${result[i].author.slice(0,7)}</p>
                        <div class="clearfix">
                            <span class="fl">￥${result[i].newprice}</span>
                            <span class="fl">￥${result[i].oldprice}</span>
                        </div>
                    </li>`;
                }
                $ul4.html(str);
                var $lis9 = $ul4.find("li");
                $lis9.click(function(){
                    var id = $(this).attr("data_id");
                    location.href="./html/details.html?id="+id;
                });
            }
        });
    });
    // ======================
    // 社科图书区
    var $lis3 = $(".skbook_ban>ul>li");
    $lis3.mouseover(function(){
        var id = $(this).attr("data_id");
        $.ajax({
            url: "./api/index4.php",
            data: {id:id},
            success: function (res) {
                var result = JSON.parse(res);
                var $ul5 = $(".skbook_content_c");
                var str = "";
                for(var i=0;i<result.length;i++){
                    str += `<li data_id="${result[i].id}">
                        <a href="#">
                            <img src="${result[i].url}" alt="">
                        </a>
                        <a href="#">${result[i].title.slice(0,7)}</a>
                        <p>${result[i].author.slice(0,7)}</p>
                        <div class="clearfix">
                            <span class="fl">￥${result[i].newprice}</span>
                            <span class="fl">￥${result[i].oldprice}</span>
                        </div>
                    </li>`;
                }
                $ul5.html(str);
                var $lis10 = $ul5.find("li");
                $lis10.click(function(){
                    var id = $(this).attr("data_id");
                    location.href="./html/details.html?id="+id;
                });
            }
        });
    });
    // =======================
    // 少儿图书区域
    var $lis4 = $(".sebook_ban>ul>li");
    $lis4.mouseover(function(){
        var id = $(this).attr("data_id");
        $.ajax({
            url: "./api/index4.php",
            data: {id:id},
            success: function (res) {
                var result = JSON.parse(res);
                var $ul6 = $(".sebook_content_c");
                var str = "";
                for(var i=0;i<result.length;i++){
                    str += `<li data_id="${result[i].id}">
                        <a href="#">
                            <img src="${result[i].url}" alt="">
                        </a>
                        <a href="#">${result[i].title.slice(0,7)}</a>
                        <p>${result[i].author.slice(0,7)}</p>
                        <div class="clearfix">
                            <span class="fl">￥${result[i].newprice}</span>
                            <span class="fl">￥${result[i].oldprice}</span>
                        </div>
                    </li>`;
                }
                $ul6.html(str);
                var $lis11 = $ul6.find("li");
                $lis11.click(function(){
                    var id = $(this).attr("data_id");
                    location.href="./html/details.html?id="+id;
                });
            }
        });
    });
    // ========================
    // 无标题区域
    var $lis5 = $(".note_ban>ul>li");
    $lis5.mouseover(function(){
        var id = $(this).attr("data_id");
        $.ajax({
            url: "./api/index5.php",
            data: {id:id},
            success: function (res) {
                var result = JSON.parse(res);
                var $ul7 = $(".note_content_c");
                var str = "";
                for(var i=0;i<result.length;i++){
                    str += `<li data_id="${result[i].id}">
                        <a href="#">
                            <img src="${result[i].url}" alt="">
                        </a>
                        <a href="#">${result[i].title.slice(0,7)}</a>
                        <p>${result[i].author.slice(0,7)}</p>
                        <div class="clearfix">
                            <span class="fl">￥${result[i].newprice}</span>
                            <span class="fl">￥${result[i].oldprice}</span>
                        </div>
                    </li>`;
                }
                $ul7.html(str);
                var $lis12 = $ul7.find("li");
                $lis12.click(function(){
                    var id = $(this).attr("data_id");
                    location.href="./html/details.html?id="+id;
                });
            }
        });
    });
    // ===================
    // 出版社专区
    var $lis6 = $(".club_l_l>div>ul>li>a");
    $lis6.mouseover(function(){
        var id = $(this).attr("data_id");
        $.ajax({
            url: "./api/index6.php",
            data: {id:id},
            success: function (res) {
                var result = JSON.parse(res);
                var $ul8 = $(".club_l_r_content_c");
                var str = "";
                for(var i=0;i<result.length;i++){
                    str += `<li data_id="${result[i].id}">
                        <a href="#">
                            <img src="${result[i].url}" alt="">
                        </a>
                        <a href="#">${result[i].title.slice(0,7)}</a>
                        <p>${result[i].author.slice(0,7)}</p>
                        <div class="clearfix">
                            <span class="fl">￥${result[i].newprice}</span>
                            <span class="fl">￥${result[i].oldprice}</span>
                        </div>
                    </li>`;
                }
                $ul8.html(str);
                var $lis13 = $ul8.find("li");
                $lis13.click(function(){
                    var id = $(this).attr("data_id");
                    location.href="./html/details.html?id="+id;
                });
            }
        });
    });
    // 点击导航进入列表页
    var $lis14 = $(".nav_r>li");
    for(var i=1;i<$lis14.length;i++){
        $lis14[i].onclick = function(){
            location.href = "./html/list.html";
        }
    }
})