$(document).ready(function() {

    function getHitokoto(callback) {
        $.getJSON('http://api.hitokoto.cn/',function(data) {
            callback(data);
        });
    }

    function setTwitter(text) {
        $("#quote-tweet").attr('href', 'https://twitter.com/intent/tweet?hashtags=hitokoto&related=geekaven&text=' + encodeURIComponent(text));
    }

    $("#new-quote").click(function() {
        $(".quote").addClass("e-hidden").removeClass("animated fadeIn e-visible");
        getHitokoto(function(data) {
            $(".quote-text").text(data['hitokoto']);
            $(".quote-from").text("-「" + data['from'] + "」");
            $(".quote").removeClass("e-hidden").addClass("animated fadeIn e-visible");
            setTwitter(data['hitokoto'] + " -" +data['from']);
         });
    });

    getHitokoto(function(data) {
        $(".quote-text").text(data['hitokoto']);
        $(".quote-from").text("-「" + data['from'] + "」");
        $(".quote").removeClass("e-hidden").addClass("animated fadeIn e-visible");
        setTwitter(data['hitokoto'] + " -" +data['from']);
    });
})