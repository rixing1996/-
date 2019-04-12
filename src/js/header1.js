jQuery(function($){
    $div1 = $(".login_l_p2");
    $.ajax({
        url: "./api/header1.php",
        success: function (res) {
            var result = JSON.parse(res);
            var $len = result.length;
            $div1.html(result[$len-1].uname);
        }
    });
    $div1.click(function(){
        location.href = "./html/login.html";
    });
})