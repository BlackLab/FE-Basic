$(document).ready(function() {
    var workTime = 25;
    var breakTime = 5;
    var beginTime = 0;
    var begin = false;
    var isWork = false;
    var timer;
    $(".work label").text(workTime);
    $(".break label").text(breakTime);
    $(".min").text(workTime);
    $(".second").text("00");
    $(".show").text(formatSecond(workTime * 60));

    $(".work .plus").click(function() {
        workTime++;
        $(".work label").text(workTime);
        $(".min").text(workTime);
        $(".second").text("00");
        $(".show").text(formatSecond(workTime * 60));
        clear();
    });

    $(".work .minus").click(function() {
        workTime--;
        if (workTime < 0) {
            workTime = 0;
        }
        $(".work label").text(workTime);
        $(".show").text(formatSecond(workTime * 60));
        clear();
    });

    $(".break .plus").click(function() {
        breakTime++;
        $(".break label").text(breakTime);
        $(".show").text(formatSecond(breakTime * 60));
        clear();
    });

    $(".break .minus").click(function() {
        breakTime--;
        if (breakTime < 0) {
            breakTime = 0;
        }
        $(".break label").text(breakTime);
        $(".show").text(formatSecond(breakTime * 60));
        clear();
    });

    $(".mask").click(function() {
        if (!begin) {
            begin = true;
            beginTime = workTime * 60;
            timer = setInterval(go, 1000);
        } else {
            begin = false;
            beginTime = 0;
            clearInterval(timer);
        }
    })

    function go() {
        isWork = true;
        beginTime--;
        if (beginTime > 0) {
            var show = formatSecond(beginTime);
            $(".show").text(show);
            render();
        } else {
            clearInterval(timer);
            beginTime = breakTime * 60;
            timer = setInterval(coffee, 1000);
        }
    }

    function coffee() {
        isWork = false;
        beginTime--;
        if (beginTime > 0) {
            var show = formatSecond(beginTime);
            $(".show").text(show);
            render();
        } else {
            clearInterval(timer);
            beginTime = workTime * 60;
            timer = setInterval(go, 1000);
        }
    }

    function render() {
        var per = 0;
        if (isWork) {
            console.log(beginTime);
            console.log(workTime);
            console.log((workTime*60) / beginTime);
            per = ((workTime * 60) * 100 / beginTime) - 100;
            console.log("per :" + per);
        } else {
            per = beginTime * 100 / breakTime * 60;
        }
        if (per <= 50) {
            $('.pie_right').css('transform','rotate('+(per * 3.6)+'deg)');
        } else {
            $('.pie_right').css('transform','rotate(180deg)');
            $('.pie_left').css('transform','rotate('+(per - 50 * 3.6)+'deg)');
        }
    }

    function formatSecond(value) {
        var time = parseInt(value);
        var min = 0;
        var second = 0;
        if (time > 60) {
            min = parseInt(time / 60);
            second = parseInt(time % 60);
        }
        if (second == 0) {
            second += "0";
        }
        return min + ":" + second;
    }

    function clear() {
        clearInterval(timer);
        $('.pie_right').css('transform','rotate(0deg)');
        $('.pie_right').css('transform','rotate(0deg)');
    }
})