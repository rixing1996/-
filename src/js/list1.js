jQuery(function($){
    // 渲染数据
    var $ul1 = $(".render_r");
    $.ajax({
        url: "./api/list1.php",
        success: function (res) {
            var result = JSON.parse(res);
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
        }
    });
})