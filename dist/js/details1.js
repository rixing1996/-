"use strict";

// ==============放大镜的代码======================
jQuery(function ($) {
    var $sign = $(".sign");
    var $rbox = $(".big_img");
    var $rimg = $rbox.find("img");
    $(".big_l").mouseover(function () {
        $sign.show();
        $rbox.show();
    }).mousemove(function () {
        var x = event.x - $sign.width() / 2 - $(this).offset().left;
        var y = event.y - $sign.height() / 2 - $(this).offset().top;
        var max_x = $(this).width() - $sign.width();
        var max_y = $(this).height() - $sign.height();
        if (x > max_x) {
            x = max_x;
        }
        if (y > max_y) {
            y = max_y;
        }
        if (x <= 0) {
            x = 0;
        }
        if (y <= 0) {
            y = 0;
        }
        $sign.css({ "left": x + "px", "top": y + "px" });
        $rimg.css({ "left": -2 * x + "px", "top": -2 * y + "px" });
    }).mouseout(function () {
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
        data: { id: id },
        success: function success(res) {
            var result = JSON.parse(res);
            $spic.prop("src", result[0].url);
            $bpic.prop("src", result[0].url);
            str = "<div class=\"big_c1\">\n                <h4>\n                    " + result[0].title + "\n                </h4>\n                <p class=\"p1\">\n                    " + result[0].desc + "\n                </p>\n                <p class=\"p2\">\n                    \u4F5C\u8005\uFF1A <a href=\"#\">" + result[0].author + "</a>\n                </p>\n                <p class=\"p3\">\n                    \u51FA\u7248\u793E\uFF1A \n                    <a href=\"#\">" + result[0].club + "</a>\n                    \u51FA\u7248\u65F6\u95F4\uFF1A \n                    <span>" + result[0].outtime + "</span>\n                </p>\n                <p class=\"p4\">\n                    \u5F00\u672C\uFF1A \n                    <span>" + result[0].kaiben + "</span>\n                    \u9875\u6570\uFF1A \n                    <span>" + result[0].page + "</span>\n                </p>\n                <p class=\"p5\">\n                    \u8BFB\u8005\u8BC4\u5206\uFF1A \n                    <span>" + result[0].grade + "</span>\n                    <i class=\"iconfont icon-xingxing\"></i>\n                    <i class=\"iconfont icon-xingxing\"></i>\n                    <i class=\"iconfont icon-xingxing\"></i>\n                    <i class=\"iconfont icon-xingxing\"></i>\n                    <i class=\"iconfont icon-yiban\"></i>\n                    <a href=\"#\">" + result[0].comment + "\u6761\u8BC4\u8BBA</a>\n                </p>\n                <p class=\"p6\">\n                    \u6392\u540D\uFF1A \n                    <a href=\"#\">" + result[0].rankname + "</a>\n                    \u7B2C<span>" + result[0].ranknum + "</span>\u4F4D\n                </p>\n            </div>\n            <div class=\"big_c2\">\n                <div class=\"clearfix\">\n                    <p class=\"fl\">\n                        \u4E2D\u56FE\u4EF7\uFF1A \n                        <span>\uFFE5" + result[0].newprice + "</span>\n                    </p>\n                    <p class=\"fl\">\n                        <span>(" + result[0].count + "\u6298)</span>\n                        \u5B9A\u4EF7:<span>\uFFE5" + result[0].oldprice + "</span>\n                        <a href=\"#\">\u767B\u5F55\u540E\u53EF\u770B\u5230\u4F1A\u5458\u4EF7</a>\n                    </p>\n                </div>\n                <p>\n                    \u4FC3\u9500\u6D3B\u52A8\uFF1A \n                    <a href=\"#\">3-5\u6298|\u6BCF\u6EE199\u51CF30</a>\n                    <a href=\"#\">\u65B0\u4E0A\u67B6\u7279\u60E0\u4E0B\u5355\u6298\u4E0A\u4E03\u6298</a>\n                </p>\n            </div>\n            <div class=\"big_c3 clearfix\">\n                <a href=\"#\" class=\"fl\">\n                    <i class=\"iconfont icon-gouwuche\"></i>\n                    \u52A0\u5165\u8D2D\u7269\u8F66\n                </a>\n                <a href=\"#\" class=\"fl\">\u6536\u85CF</a>\n                <a href=\"#\" class=\"fl\">\u8FD0\u8D396\u5143\uFF0C\u6EE169\u5143\u514D\u8FD0\u8D39</a>\n            </div>\n            <div class=\"big_c4\">\n                <span>\u6E29\u99A8\u63D0\u793A\uFF1A</span>\n                5\u6298\u4EE5\u4E0B\u56FE\u4E66\u4E3B\u8981\u4E3A\u51FA\u7248\u793E\u5C3E\u8D27\uFF0C\u5927\u90E8\u5206\u4E3A\u5168\u65B0\uFF0C\u4E2A\u522B\u56FE\u4E66\u54C1\u76F88-9\u6210\u65B0\u3001\u5207\u53E3\n                \u6709\u5212\u7EBF\u6807\u8BB0\u3001\u5149\u76D8\u7B49\u9644\u4EF6\u4E0D\u5168\n            </div>";
            $render.html(str);

            // 加入购物车
            var btn = $(".big_c3>a")[0];
            $(btn).click(function () {
                $.ajax({
                    url: "./api/list3.php",
                    data: { id: id },
                    success: function success(res2) {
                        var result2 = JSON.parse(res2);
                        $.ajax({
                            url: "./api/list4.php",
                            data: {
                                id: result2[0].id,
                                title: result2[0].title,
                                url: result2[0].url,
                                oldprice: result2[0].oldprice,
                                newprice: result2[0].newprice
                            },
                            success: function success(res2) {
                                location.href = "./html/gouwuche.html";
                            }
                        });
                    }
                });
                return false;
            });
        }
    });
    // 本类畅销渲染
    // var $ul3 = $(".detail_l2>div>ul");
    // $.ajax({
    //     url: "./api/details3.php",
    //     success: function (res3) {
    //         var result3 = JSON.parse(res3);
    //         var str1 ="";
    //         for(var i=0;i<result3.length;i++){
    //             str += `<li data_id="${result3[i].id}">
    //                 <a href="javascript:;">
    //                     <img src="${result3[i].url}" alt="">
    //                 </a>
    //                 <a href="javascript:;">${result3[i].title.slice(0,7)}</a>
    //                 <p>${result3[i].author.slice(0,7)}</p>
    //                 <div>
    //                     <span>￥${result3[i].newprice}</span>
    //                     <span>￥${result3[i].oldprice}</span>
    //                 </div>
    //             </li>`;
    //         }
    //         $ul3.html(str);
    //     }
    // });
    // 买过本商品的人还买了
    var $ul1 = $(".detail_r1>div>ul");
    $.ajax({
        url: "./api/details1.php",
        success: function success(res) {
            var result = JSON.parse(res);
            str = "";
            for (var i = 0; i < result.length; i++) {
                str += "<li data_id=\"" + result[i].id + "\">\n                    <a href=\"javascript:;\">\n                        <img src=\"" + result[i].url + "\" alt=\"\">\n                    </a>\n                    <a href=\"javascript:;\">" + result[i].title.slice(0, 9) + "</a>\n                    <p>" + result[i].author.slice(0, 7) + "</p>\n                    <div>\n                        <span>\uFFE5" + result[i].newprice + "</span>\n                        <span>\uFFE5" + result[i].oldprice + "</span>\n                    </div>\n                </li>";
            }
            $ul1.html(str);
            var $lis1 = $ul1.find("li>a");
            $lis1.click(function () {
                var $id = $(this).parent().attr("data_id");
                location.href = "./html/details.html?id=" + $id;
            });
        }
    });
    // 左右按键
    var $btns = $(".detail_r1>div>div>i");
    var $zuo = $btns.filter(".fl");
    var $you = $btns.filter(".fr");
    var a = true;
    $you.click(function () {
        if (a) {
            $ul1.css({ "transform": "translate(-980px)" });
            a = false;
        }
    });
    $zuo.click(function () {
        if (!a) {
            $ul1.css({ "transform": "translate(0px)" });
            a = true;
        }
    });
    // 逻辑推荐区域
    var $ul2 = $(".edit>ul");
    $.ajax({
        url: "./api/details2.php",
        success: function success(res) {
            var result = JSON.parse(res);
            str = "";
            for (var i = 0; i < result.length; i++) {
                str += "<li data_id=\"" + result[i].id + "\">\n                    <a href=\"javascript:;\">\n                        <img src=\"" + result[i].url + "\" alt=\"\">\n                    </a>\n                    <a href=\"javascript:;\">" + result[i].title.slice(0, 7) + "</a>\n                    <p>" + result[i].author.slice(0, 7) + "</p>\n                    <div>\n                        <span>\uFFE5" + result[i].newprice + "</span>\n                        <span>\uFFE5" + result[i].oldprice + "</span>\n                    </div>\n                    <button>\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                </li>";
            }
            $ul2.html(str);
            var $lis2 = $ul2.find("li>a");
            $lis2.click(function () {
                var $id = $(this).parent().attr("data_id");
                location.href = "./html/details.html?id=" + $id;
            });
            // 加入购物车
            var $btn1 = $(".edit>ul>li>button");
            $btn1.click(function () {
                var id1 = $(this).parent().attr("data_id");
                $.ajax({
                    url: "./api/list3.php",
                    data: { id: id1 },
                    success: function success(res1) {
                        var result1 = JSON.parse(res1);
                        $.ajax({
                            url: "./api/list4.php",
                            data: {
                                id: result1[0].id,
                                title: result1[0].title,
                                url: result1[0].url,
                                oldprice: result1[0].oldprice,
                                newprice: result1[0].newprice
                            },
                            success: function success(res2) {
                                location.href = "./html/gouwuche.html";
                            }
                        });
                    }
                });
            });
        }
    });
});