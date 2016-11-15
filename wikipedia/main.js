$(document).ready(function() {
    var api = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb  = '&callback=JSON_CALLBACK';
    var cur = 'https://en.wikipedia.org/?curid=';

    function search(key){
        $(".list").html("");
        $.get(api + key + cb, function(data){
            // data.search.pages;
            console.log(JSON.stringify(data));
            for(var item in data.query.pages) {
                var page = data.query.pages[item];
                var li = $("<li></li>").addClass("item animated fadeIn");
                var a = $("<a></a>").attr({
                    "href" : cur + item,
                    "target" : "_black"
                })
                a.append($("<h1></h1>").text(page['title']));
                a.append($("<p></p>").text(page['extract']));
                li.append(a);
                $(".list").append(li);
            }
        }, "jsonp");
    }

    $(this).keyup(function(event) {
        /* Act on the event */
        if (event.keyCode == 13) {
            $("#key").focus();
        }
    });

    $("#key").keyup(function(event) {
        if (event.keyCode == 13) {
            search($("#key").val());
        }
    });
})