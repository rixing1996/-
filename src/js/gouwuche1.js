jQuery(function($){
    // 喧嚷购物车
    var $ul1 = $(".che_3");
    $.ajax({
        url: "./api/gouwuche1.php",
        success: function (res) {
            var result = JSON.parse(res);
            var str = "";
            for(var i=0;i<result.length;i++){
                str += `<li class="clearfix" data_id="${result[i].id}">
                    <input type="checkbox" class="fl">
                    <a href="javascript:;" class="fl">
                        <img src="${result[i].url}" alt="">
                    </a>
                    <a href="javascript:;" class="fl">
                    ${result[i].title.slice(0,7)}
                    </a> 
                    <span class="fl">￥${result[i].oldprice}</span>
                    <span class="fl">￥${result[i].newprice}</span>
                    <p class="clearfix fl">
                        <span class="fl">-</span>
                        <span class="fr">+</span>
                        <span class="fl">1</span>
                    </p>
                    <span class="fl zj">￥${result[i].newprice}</span>
                    <p class="fl">
                        <a href="javascript:;">删除</a>
                        <a href="javascript:;">移入收藏</a>
                    </p>
                </li>`;
            }
            $ul1.html(str);
            // 点击删除按钮删除数据
            var $as3 = $(".che_3>li>p>a").filter(":contains(删除)");
            $as3.click(function(){
                var $parentli = $(this).parents("li");
                var $id = $parentli.attr("data_id");
                $.ajax({
                    url: "./api/gouwuche3.php",
                    data: {
                        id:$id
                    },
                    success: function (res3) {
                        console.log("删除成功");
                        location.href = "./html/gouwuche.html";
                    }
                });
                $parentli.remove();
            })
            // 点击全选，全部打勾
            var $btns = $(":checkbox");//全部的复选框
            var qx1 = $btns[0];//第一个复选框（全选框）
            var qx2 = $btns[$btns.length-1];//最后一个复选框（全选框）
            var $dx = $(".che_3").find(":checkbox");//单选
            $(qx1).click(function(){
                $btns.not($(this)).prop("checked",$(this).prop("checked"));
                var len = $dx.filter(":checked").length;
                $($jnum[0]).text(len);

            })
            $(qx2).click(function(){
                $btns.not($(this)).prop("checked",$(this).prop("checked"));
                var len = $dx.filter(":checked").length;
                $($jnum[0]).text(len);
            })
            // 点击单选，当单选全选之后，全选框勾上
            $dx.click(function(){
                if($dx.filter(":checked").length == $dx.length){
                    $(qx1).prop("checked",true);
                    $(qx2).prop("checked",true);
                }else{
                    $(qx1).prop("checked",false);
                    $(qx2).prop("checked",false);
                }
                var len = $dx.filter(":checked").length;
                $($jnum[0]).text(len);
            })
            $btns.click(function(){
                var $xzs2 = $dx.filter(":checked").parent();
                var all = 0;
                for(var i=0;i<$xzs2.length;i++){
                    var zj2 = $($xzs2[i]).find(".zj").text().slice(1);
                    all += parseInt(zj2);
                }
                $($jnum[1]).text(all);
            })
            // 删除勾选的商品
            var $as4 = $(".sale_1>a").filter(":contains(删除选中的商品)");
            $as4.click(function(){
                var $xzs = $dx.filter(":checked").parent();
                for(var i=0;i<$xzs.length;i++){
                    var $id1 = $($xzs[i]).attr("data_id");
                    $.ajax({
                        url: "./api/gouwuche3.php",
                        data: {
                            id:$id1
                        },
                        success: function (res4) {
                            location.href = "./html/gouwuche.html";                            
                        }
                    });
                }
                $xzs.remove();
            })
            // 点击+-号增加减少数据
            var $jias = $(".che_3>li>p>span").filter(":contains(+)");
            var $jians = $(".che_3>li>p>span").filter(":contains(-)");
            var num = 1;
            var $jnum = $(".sale_3>p").filter(":contains(已选择)").find("span");
            $jias.click(function(){
                num++;
                var $cont = $(this).next();
                $cont.text(num);
                var $add = $(this).parent().next();
                var $count = $(this).parent().prev();
                var add = "￥" + ($cont.text() * ($count.text().slice(1))).toFixed(1);
                $add.text(add);
            });
            $jians.click(function(){
                num--;
                if(num <= 1){
                    num = 1;
                }
                var $cont = $(this).next().next();
                $cont.text(num);
                var $add = $(this).parent().next();
                var $count = $(this).parent().prev();
                var add = "￥" + ($cont.text() * ($count.text().slice(1))).toFixed(1);
                $add.text(add);
            });
        }
    });
    // 中图推荐区域
    var $ul2 = $(".move_2");
    $.ajax({
        url: "./api/gouwuche2.php",
        success: function (res1) {
            var result1 = JSON.parse(res1);
            var str = "";
            for(var i=0;i<result1.length;i++){
                str += `<li data_id="${result1[i].id}">
                    <a href="javascript:;">
                        <img src="${result1[i].url}" alt="">
                    </a>
                    <a href="javascript:;">
                    ${result1[i].title.slice(0,7)}
                    </a>
                    <p class="clearfix">
                        <span class="fl">￥${result1[i].newprice}</span>
                        <span class="fr">￥${result1[i].oldprice}</span>
                    </p>
                    <button>加入购物车</button>
                </li>`;
            }
            $ul2.html(str);
            var $as2 = $ul2.find("a");
            $as2.click(function(){
                var $id = $(this).parent().attr("data_id");
                location.href="./html/details.html?id="+$id;
            })
            // 加入购物车
            var $btn1 = $(".move_2>li>button");
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