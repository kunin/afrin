$(function() {
    $(window).bind('hashchange', function(){
        var hash = location.hash;
        if ( !hash ) hash = $("#groups-menu a").first().attr('href');

        var parts = hash.split("/");
        var first = parts[0];
        var second = parts[1];

        $(first).show().siblings().hide();
        $("#groups-menu a[href$='" + first + "']").parent().addClass('active').siblings().removeClass('active');

        if ( second ) {
            var product = $("#" + second);
            if (product.length ) {
                product.show().siblings(".product-info").hide();
                product.siblings(".products-list").find("a[href$='/" + second + "']").parent().addClass('active').siblings().removeClass('active');
            }
        }
    }).trigger('hashchange');

    if ( !$.browser.msie || $.browser.version > 8 ) {
        $("#products .product-info .image img").reflect({
            "height" : 1/10,
            "opacity" : 0.5
        });
        $("#products .products-list li a img").reflect({
            "height" : 1/5,
            "opacity" : 0.3
        });
    }

    $('.fancybox-drug-facts').fancybox({
        "overlayColor" : "#fff",
        "padding": 0,
        "onStart" : function() { $("#fancybox-wrap").addClass('drug-facts-popup'); },
        "onClosed" : function() { $("#fancybox-wrap").removeClass('drug-facts-popup'); }
    });

    $('.buynow').fancybox({
        'type' : 'iframe',
        'width' : 638,
        'height' : 350,
        "padding" : 3,
        "showNavArrows" : false,
        "overlayColor" : "#fff"
    });
});
