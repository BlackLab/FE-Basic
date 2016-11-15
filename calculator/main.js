$(document).ready(function(){
    var exp = "";
    var isClear = false;
    var res = 0;

    $(".keyboard").click(function(e){
        var text = $(e.target).text();
        if (text === "ac") {
            exp = "";
            res = 0;
            $(".exp").val(exp);
            $(".result").text(res);
        } else if (text === "ce") {
            exp = exp.slice(0, exp.length - 1);
            $(".exp").val(exp);
        } else if (text === "√") {

        } else if (text === "=") {
            console.log(exp);
            res = eval(exp);
            isClear = true;
            $(".result").text(res);
        } else {
            if (!isClear) {
                exp += text;
            } else {
                exp = text;
                isClear = false;
                $(".result").text(0);
            }
            $(".exp").val(exp);
        }
    });
})