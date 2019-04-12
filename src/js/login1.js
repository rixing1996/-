$(function(){
    var show_num = [];
    draw(show_num);
    var $uname = $("#uname");
    var $p1 = $(".p1");
    var $upwd = $("#upwd");
    var $p2 = $(".p2");
    var $code = $("#code");
    var $p3 = $(".p3");
    $.ajax({
        url: "../api/login1.php",
        success: function (res) {
            var result = JSON.parse(res);
            // 用户名验证
            var a;
            $uname.focus(function(){
                $p1.css({"display":"block","color":"#333"}).text("请输入用户名/邮箱/已验证手机");
            }).blur(function(){
                var $uname_val = $(this).val();
                for(var i=0;i<result.length;i++){
                    if($uname_val == result[i].uname){
                        $p1.text("用户名正确").css({"color":"green"});
                        a = i;
                        break;
                    }else{
                        if($uname_val == ""){
                            $p1.text("用户名不能为空").css({"color":"red"});
                        }else{
                            $p1.text("用户名不正确").css({"color":"red"});
                        }
                    }
                }
            });
            // 密码验证
            $upwd.focus(function(){
                $p2.css({"display":"block","color":"#333"}).text("请输入密码");
            }).blur(function(){
                var $upwd_val = $(this).val();
                if($upwd_val == result[a].pwd){
                    $p2.text("密码正确").css({"color":"green"});
                }else{
                    if($upwd_val == ""){
                        $p2.text("密码不能为空").css({"color":"red"});
                    }else{
                        $p2.text("密码不正确").css({"color":"red"});
                    }
                }
            });
            // 验证码验证
            $code.focus(function(){
                $p3.css({"display":"block","color":"#333"}).text("请填写图片中的字符，不区分大小写");
            }).blur(function(){
                var val = $(".input-val").val().toLowerCase();
                var num = show_num.join("");
                if(val==''){
                    $p3.text("验证码不能为空").css({"color":"red"});
                }else if(val == num){
                    $p3.text("验证码正确").css({"color":"green"});
                }else{
                    $p3.text("验证码不正确").css({"color":"red"});
                }
            })
            // 点击登录按键跳转、存数据
            var $btn = $(".btn");
            $btn.click(function(){
                if($p1.text() == "用户名正确" && $p2.text() == "密码正确" && $p3.text() == "验证码正确"){
                    var uname = result[a].uname;
                    var pwd = result[a].pwd;
                    $.ajax({
                        url: "../api/login2.php",
                        data: {
                            uname:uname,
                            pwd:pwd
                        },
                        success: function (sul) {
                            console.log(提交成功);
                        }
                    });
                    location.href = "../index.html?true";
                    return false;
                }
            })
        }
    });

    $("#canvas").on('click',function(){
        draw(show_num);
    })
    // $(".btn").on('click',function(){
    //     var val = $(".input-val").val().toLowerCase();
    //     var num = show_num.join("");
    //     if(val==''){
    //         alert('请输入验证码！');
    //     }else if(val == num){
    //         alert('提交成功！');
    //         $(".input-val").val('');
    //         // draw(show_num);

    //     }else{
    //         alert('验证码错误！请重新输入！');
    //         $(".input-val").val('');
    //         // draw(show_num);
    //     }
    // })
})