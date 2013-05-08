(function($) {

    /* Squeeze for Wisdom */
    $(function() {
        var fadeSpeed = 100;
        var spraySpeed = 500;
        var spray = $("#wisdom-spray");
        var stick = $("#wisdom-stick");
        var stickSpeed = 180;
        var stickOffset = 10;

        var text = $("#wisdom-text");
        var textSpeed = ($.browser.msie && $.browser.version <= 8 ) ? 0 : 500;

        var slides = 7;

        $("#wisdom-button").click(function() {
            //Spray
            spray.fadeIn(fadeSpeed).children("img").animate({
                "top" : "-150px",
                "width" : "100%",
            }, spraySpeed, "linear", function() {
                $(this).css({
                    "top": 0,
                    "width" : "0%",
                }).parent().hide();
            });
            stick.animate({
                "height" : "-=" + stickOffset + "px"
            },stickSpeed,function() {
                $(this).animate({
                    "height" : "+=" + stickOffset + "px"
                },stickSpeed);
            });

            var slide = text.data("slide") || 1;
            var newSlide = (slide%slides)+1;
            text.fadeOut(textSpeed,function() {
                $(this).html("");
                $(this).removeClass("text-"+slide);
                $(this).addClass("text-"+newSlide);
                $(this).data("slide",newSlide);
                $(this).fadeIn(textSpeed);
            })
            return false;
        });
    });

    /* Polls */
    $(function() {
        var pollSpeed = 500;
        var pollBlock = $("#poll-block");

        var vote = function(pollId, answer){
            answer = answer % 2;
            $.getJSON('/afrin/vote.json', {"pollId":pollId,"answer":answer}, function(data){
                if(!data.integerList){
                    alert('Server communication error has been occured');
                    return;
                }
                var r = data.integerList;

                $.each([".left-poll",".right-poll"], function(index,value) {
                    var percent = $("<p/>").addClass("percent");
                    $(value + " .poll-item").prepend(percent);
                    percent.html(r[index]+"%").each(function() {
                        if( r[index] >= 100 ) $(this).addClass("full")
                    });
                });

                $(".poll a", pollBlock).add($(".poll-item img", pollBlock)).fadeOut(pollSpeed);
                $((r[0]>r[1]) ? ".right-poll" : ".left-poll", pollBlock).addClass("down");
            });
        };

        var pollId = pollBlock.data("poll") || 0;
        $(".poll a", pollBlock).click(function() {
            vote(pollId, parseInt(this.href.split("#vote-")[1]));
            $.cookie("poll",pollId);
            return false;
        });
        if ($.cookie("poll") == pollId) {
            pollSpeed = 0;
            $("#poll-block .poll a").unbind("click");
            vote(pollId, -1);
        }
    });

    /* Save now coupon */
    $(function() {
        $('a[href*="home/coupon.jspa"]').fancybox({
            'type' : 'iframe',
            'width' : 638,
            'height' : 388,
            "padding" : 3,
            "showNavArrows" : false,
            "overlayColor" : "#fff"
        });
    });
})(jQuery);
