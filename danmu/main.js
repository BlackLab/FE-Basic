$(document).ready(function() {
    var config = {
        authDomain: "k-danmuku.wilddog.com",
        syncURL : 'https://k-danmuku.wilddogio.com'
    }
    wilddog.initializeApp(config);
    var ref = wilddog.sync().ref();
    var danmu = [];

    $('#biu').click(function() {
        var _text = $('#dm_text').val();
        ref.child('danmuku').push(_text);
    })

    $('#remove').click(function() {
        ref.child('danmuku').remove();
    })

    ref.child('danmuku').on('child_added', function(data) {
        var _text = data.val();
        danmu.push(_text);
        var dmObj = $("<div class=\"danmu\"></div>");
        dmObj.text(_text);
        $('#dm_wall').append(dmObj);
        move(dmObj);
    })

    ref.child('danmuku').on('child_removed', function() {
        danmu = [];
        $('#dm_wall').html('');
    })

    var topMin = $('#dm_wall').offset().top;
    var topMax = topMin + $('#dm_wall').height();
    var top = topMin;

    var move = function(dmObj) {
        var from = $('#dm_wall').width() - dmObj.width();
        top = top + 40;
        if (top > topMax) {
            top = topMin;
        }
        dmObj.css({
            left : from,
            top : top,
            color : randomColor()
        })
        dmObj.animate({
            left: '-' + from + 'px'
        }, 10000, function() {
            dmObj.remove();
        });
    }

    var randomColor = function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    var randomBiu = function() {
        if (danmu.length > 0) {
            var text = danmu[Math.floor(Math.random() * danmu.length + 1) - 1];
            var dmObj = $("<div class=\"danmu\"></div>");
            dmObj.text(text);
            $('#dm_wall').append(dmObj);
            move(dmObj);
        }
        setTimeout(randomBiu, 1000);
    }

    randomBiu();

});