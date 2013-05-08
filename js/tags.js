TagsJS = {}
TagsJS.config = {
    "atlas" : {},
    "ga" : {
        "account" : "UA-5343693-1"
    }
}

/**
 * [TYPE, TAG, SELECTOR, EVENT], where
 * TYPE     - type of tags. atlas or ga. Required
 * TAG      - tag for chosen type. Required
 *      May be function, which returns actuall tag
 * SELECTOR - one or array of selectors.
 *      Element to add event handler to fire tag.
 *      Hash selector is wildcard. Make sure use ~ to espace #
 *      If empty - tag is fired onload
 * EVENT    - event to bind handler. Defauls is 'click'
 * BIND FUNCTION - live or bind. Default is bind
 */
TagsJS.tags = {
    "*" : [
        ["ga",["_trackEvent","Wisdom Button", "Click"],"#wisdom-button"],
        ["ga",function() {
            if ( window.afrin_anthem_video_played )
                return false;
            window.afrin_anthem_video_played = true;
            return ["_trackEvent","Video", "Afrin Anthem", "Play"];
        },"#afrin-anthem-video","play"],
        ["ga",function() {
            var text = $.trim($(this).parent().children(".poll-item").text());
            return ["_trackEvent","Poll", text];
        },"#poll-block a"],
        ["atlas","cbnafr_SaveNowButton_1",".save-now"],
        ["ga",['_trackEvent', 'SaveNow', 'SaveNow'],".save-now"]
    ],
    "home/index.jspa" : [
        ["atlas","cbnafr_Homepage1_1"]
    ],
    "products/index.jspa" : [
        ["atlas","cbnafr_Products_1"],
        ["atlas","cbnafr_OriginalTab_1","afrin","hash"],
        ["atlas","cbnafr_OriginalNasalSpray_1","afrin/AfrinOriginalNasalSpray","hash"],
        ["atlas","cbnafr_OriginalPumpMist_1","afrin/AfrinOriginalPumpMist","hash"],
        ["atlas","cbnafr_SinusNasalSpray_1","afrin/AfrinSinusNasalSpray","hash"],
        ["atlas","cbnafr_SevereCongestionNasalSpray_1","afrin/AfrinSevereCongestionNasalSpray","hash"],
        ["atlas","cbnafr_ProductsNoDripTab_1","afrin-nodrip","hash"],
        ["atlas","cbnafr_NoDripOriginalPumpMist_1","afrin-nodrip/AfrinNoDripOriginalPumpMist","hash"],
        ["atlas","cbnafr_NoDripExtraMoisturizing_1","afrin-nodrip/AfrinNoDripExtraMoistPumpMist","hash"],
        ["atlas","cbnafr_NoDripSinusPumpMist_1","afrin-nodrip/AfrinNoDripSinusPumpMist","hash"],
        ["atlas","cbnafr_NoDripSevereCongesxtionPimpMist_1","afrin-nodrip/AfrinNoDripSevereCongestionPumpMist","hash"],
        ["ga",function() {
            return ['_trackPageview', 'Product', location.hash];
        },"afrin*","hash"],
        ["ga",['_trackEvent', 'BuyNow', 'BuyNow'],".buynow"]
    ],
    "compare/index.jspa" : [
        ["atlas","cbnafr_CompareAfrinProducts_1"]
    ],
    "how-to-use/index.jspa" : [
        ["ga",["_trackPageview", "Drug Facts"],".fancybox-drug-facts"],
        ["ga",function() {
            return ['_trackPageview', 'How to Use',  'Tab', location.hash];
        },"*","hash"],
    ],
    "home/coupon.jspa" : [
        ["ga",['_trackEvent', 'CouponContinue', 'CouponContinue'],"#confirmLink"]
    ],
    "home/buy-now.jspa" : [
        ["ga", ['_trackEvent', 'BuyNow', 'Click', 'CVS'],".stores a.cvs"],
        ["ga", ['_trackEvent', 'BuyNow', 'Click', 'Drugstore'],".stores a.drugstore"]
    ]
};
