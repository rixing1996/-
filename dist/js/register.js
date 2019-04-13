"use strict";

$(function () {
    var show_num = [];
    draw(show_num);

    $("#canvas").on('click', function () {
        draw(show_num);
    });
    var $uname = $("#uname");
    var $p1 = $(".p1");
    var $upwd = $("#upwd");
    var $p2 = $(".p2");
    var $uupwd = $("#uupwd");
    var $p3 = $(".p3");
    var $code = $("#code");
    var $p4 = $(".p4");
    var $btn = $(".btn");
    $.ajax({
        url: "../api/register1.php",
        success: function success(res) {
            var result = JSON.parse(res);
            var $uname_val;
            // 用户名验证
            $uname.focus(function () {
                $p1.css({ "display": "block", "color": "#333" }).text("请输入用户名");
            }).blur(function () {
                $uname_val = $(this).val();
                for (var i = 0; i < result.length; i++) {
                    if ($uname_val == result[i].uname) {
                        $p1.text("用户名不可用").css({ "color": "red" });
                        break;
                    } else {
                        if ($uname_val == "") {
                            $p1.text("用户名不能为空").css({ "color": "red" });
                        } else {
                            $p1.text("用户名可用").css({ "color": "green" });
                        }
                    }
                }
            });
            // 密码设置
            var $upwd_val;
            $upwd.focus(function () {
                $p2.css({ "display": "block", "color": "#333" }).text("请设置6到16位登录密码");
            }).blur(function () {
                $upwd_val = $(this).val();
                if ($upwd_val.length > 16 || $upwd_val.length < 6) {
                    $p2.text("请设置6到16位登录密码").css({ "color": "red" });
                } else {
                    $p2.text("密码设置成功").css({ "color": "green" });
                }
            });
            // 确认密码设置
            var $uupwd_val;
            $uupwd.focus(function () {
                $p3.css({ "display": "block", "color": "#333" }).text("请重复输入密码");
            }).blur(function () {
                $uupwd_val = $(this).val();
                if ($uupwd_val.length <= 16 && $uupwd_val.length >= 6) {
                    if ($uupwd_val == $upwd_val) {
                        $p3.text("密码一致").css({ "color": "green" });
                    } else {
                        $p3.text("密码不一致").css({ "color": "red" });
                    }
                }
            });
            // 验证码验证
            $code.focus(function () {
                $p4.css({ "display": "block", "color": "#333" }).text("请填写图片中的字符，不区分大小写");
            }).blur(function () {
                var val = $(".input-val").val().toLowerCase();
                var num = show_num.join("");
                if (val == '') {
                    $p4.text("验证码不能为空").css({ "color": "red" });
                } else if (val == num) {
                    $p4.text("验证码正确").css({ "color": "green" });
                } else {
                    $p4.text("验证码不正确").css({ "color": "red" });
                }
            });
            // 点击登录按键跳转、存数据
            $btn.click(function () {
                if ($p1.text() == "用户名可用" && $p2.text() == "密码设置成功" && $p3.text() == "密码一致" && $p4.text() == "验证码正确") {
                    var uname = $uname_val;
                    var pwd = $upwd_val;
                    $.ajax({
                        url: "../api/register2.php",
                        data: {
                            uname: uname,
                            pwd: pwd
                        },
                        success: function success(sul) {
                            console.log(提交成功);
                        }
                    });
                    location.href = "../html/login.html";
                    return false;
                }
            });
        }
    });
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
});