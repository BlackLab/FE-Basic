

$(document).ready(function() {

    var bg = [
        "https://obsov0bhj.qnssl.com/Sun.png",
        "https://obsov0bhj.qnssl.com/Moon.png",
        "https://obsov0bhj.qnssl.com/Blood.png"
    ];
    var now = new Date();
    var hours = now.getHours();
    if (hours >= 6 && hours <= 18) {
        $(".w-card").css("background-image","url(" + bg[0] +")")
    } else if (hours >= 19 && hours <= 23) {
        $(".w-card").css("background-image","url(" + bg[1] +")")
    } else {
        $(".w-card").css("background-image","url(" + bg[2] +")")
    }

    var key = "6caca3471f3f83f97ebd374ccd6d49f1";
    $.get("http://ipinfo.io", function(response) {
        console.log(response.ip);
        var app = new Vue({
            el: '#weather',
            data: {
                weather : "阵雨转小雨",
                city : "上海",
                temp: 20,
                future : [
                    {
                        week: "星期一",
                        temperature: "18℃~22℃"
                    },
                    {
                        week: "星期二",
                        temperature: "16℃~20℃"
                    },
                    {
                        week: "星期三",
                        temperature: "12℃~18℃"
                    }
                ]
            }
        });
        $.getJSON("http://v.juhe.cn/weather/ip?callback=?", {
            "format" : 2,
            "dtype" : "jsonp",
            "ip" : response.ip,
            "key" : key
        }, function(data) {
            app.weather = data.result.today.weather,
            app.city = data.result.today.city,
            app.temp = data.result.sk.temp,
            app.future = [
                data.result.future[0],
                data.result.future[1],
                data.result.future[2],
            ]
        })
    }, "jsonp")
})