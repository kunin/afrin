(function($) {
    /**
     * Project indendent Main logic
     * DO NOT Edit this until you know, what you're doing
     **/
    $(function() {
        if ( !window.TagsJS || !TagsJS.config || !TagsJS.tags ) {
            window.console && console.error("Tags are not initialized");
            return false;
        }
        //Init each type of tagging
        $.each(types, function(name, type) {
            try {
                type.init(TagsJS.config[name]);
            } catch(err) {
                window.console && console.log("Error: " + err);
            }
        });
        var fireTag = function(type, tag, element, arg) {
            if ( typeof tag == "function" ) {
                if (typeof arg == "undefined") {
                    arg = [];
                }
                tag = tag.apply(element, arg);
                if ( tag == false ) return;
            }
            types[type].fire(tag);
        }
        $.each(TagsJS.tags,function(page,rules) {
            //Check page
            if ( RegExp.fromWildExp(page).test(window.location.href) ) {
                $.each(rules,function(index,rule) {
                    var type = $.trim(rule[0]),
                        tag = rule[1],
                        selectors = rule[2];

                    if ( !selectors ) {
                        fireTag(type, tag, window);
                    } else {
                        var event = rule[3]? rule[3] : 'click';
                        var bind_func = rule[4]? rule[4] : 'bind';
                        if ( typeof selectors != "object" ) { selectors = [selectors]; }

                        $.each(selectors,function(index,selector) {
                            if ( event == "hash" ) {
                                callback = function() {
                                    //? is for # symbol.
                                    //Maybe, some browser returns hash without leading #
                                    pattern = RegExp.fromWildExp("?" + selector, "a");
                                    if( pattern.test(window.location.hash) ) {
                                        fireTag(type, tag, window)
                                    }
                                }
                                callback();
                                $(window).bind("hashchange",callback);
                            } else {
                                $(selector)[bind_func](event, function(ev) {
                                    fireTag(type, tag, this, Array.prototype.slice.call(arguments, 1));
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    var types = {
        "atlas" : {
            "init" : function(cfg) {},
            "fire" : function(actionId) {
                try{
                    $('body').append($('<iframe src="http://view.atdmt.com/iaction/'+ actionId +'" width="1" height="1" frameborder="0" scrolling="No" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0"></iframe>'));
                    window.console && console.log('attachAtlas("'+actionId+'")');
                }catch (e) {
                    window.console && console.error(e);
                }

            }
        },
        "ga" : {
            "init" : function(cfg) {
                if ( typeof _gaq == "undefined" ) {
                    _gaq = [];
                }
                _gaq.push(['_setAccount', cfg.account]);
                _gaq.push(['_trackPageview']);
                window.console && console.log("Init GA");

                (function() {
                    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                })();
            },
            "fire" : function(values) {
                try {
                    _gaq.push(values);
                    window.console && console.log("GA Event: " + values);
                } catch(err) {
                    window.console && console.error(err);
                }
            }
        }
    };
})(jQuery);


/*
 jPaq - A fully customizable JavaScript/JScript library
 http://jpaq.org/

 Copyright (c) 2011 Christopher West
 Licensed under the MIT license.
 http://jpaq.org/license/

 Version: 1.0.6.000G
 Revised: April 6, 2011
*/
(function(){jPaq={toString:function(){return"jPaq - A fully customizable JavaScript/JScript library created by Christopher West."}};RegExp.fromWildExp=function(c,b){for(var f=b&&b.indexOf("o")>-1,e,a,d="",g=b&&b.indexOf("l")>-1?"":"?",h=RegExp("~.|\\[!|"+(f?"{\\d+,?\\d*\\}|[":"[")+(b&&b.indexOf("p")>-1?"":"\\(\\)")+"\\{\\}\\\\\\.\\*\\+\\?\\:\\|\\^\\$%_#<>]");(e=c.search(h))>-1&&e<c.length;)d+=c.substring(0,e),d+=(a=c.match(h)[0])=="[!"?"[^":a.charAt(0)=="~"?"\\"+a.charAt(1):a=="*"||a=="%"?".*"+g:
a=="?"||a=="_"?".":a=="#"?"\\d":f&&a.charAt(0)=="{"?a+g:a=="<"?"\\b(?=\\w)":a==">"?"(?:\\b$|(?=\\W)\\b)":"\\"+a,c=c.substring(e+a.length);d+=c;b&&(/[ab]/.test(b)&&(d="^"+d),/[ae]/.test(b)&&(d+="$"));return RegExp(d,b?b.replace(/[^gim]/g,""):"")}})();
