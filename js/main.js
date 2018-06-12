"use strict";

(function (){
    require.config({
        paths       : {
            "async"                        : "../components/requirejs-plugins/src/async",
            "depend"                       : "../components/requirejs-plugins/src/depend",
            "font"                         : "../components/requirejs-plugins/src/font",
            "goog"                         : "../components/requirejs-plugins/src/goog",
            "image"                        : "../components/requirejs-plugins/src/image",
            "json"                         : "../components/requirejs-plugins/src/json",
            "mdown"                        : "../components/requirejs-plugins/src/mdown",
            "noext"                        : "../components/requirejs-plugins/src/noext",
            "propertyParser"               : "../components/requirejs-plugins/src/propertyParser",
            "Markdown.Converter"           : "../components/requirejs-plugins/lib/Markdown.Converter",
            "text"                         : "../components/requirejs-plugins/lib/text",

            "lodash"                       : "../components/lodash/dist/lodash.min",

            "jquery"                       : "../components/jquery/dist/jquery.min",
            "jquery-ui"                    : "../components/jquery-ui/jquery-ui.min",

            "semantic"                     : "../components/semantic/dist/semantic.min",

            "swiper"                       : "../components/swiper/dist/js/swiper",

            "angular"                      : "../components/angular/angular",
            "angular-ui-router"            : "../components/angular-ui-router/release/angular-ui-router.min",
            "angular-translate"            : "../components/angular-translate/angular-translate.min",
            "angular-translate-loader-url" : "../components/angular-translate-loader-url/angular-translate-loader-url.min",
            "angular-sanitize"             : "../components/angular-sanitize/angular-sanitize.min",
            "angular-storage"              : "../components/ngstorage/ngStorage.min",
            "angular-cookies"              : "../components/angular-cookies/angular-cookies.min",
            "angular-bootstrap"            : "../components/angular-bootstrap/ui-bootstrap.min"
        },
        shim        : {
            "jquery-ui"                    : ["jquery"],

            "semantic"                     : ["jquery"],

            "angular"                      : {
                "deps"    : ["lodash", "jquery-ui", "semantic", "swiper"],
                "exports" : "angular"
            },
            "angular-ui-router"            : ["angular"],
            "angular-translate"            : ["angular"],
            "angular-translate-loader-url" : ["angular-translate"],
            "angular-sanitize"             : ["angular"],
            "angular-storage"              : ["angular"],
            "angular-cookies"              : ["angular"],
            "angular-bootstrap"            : ["angular"],

            "app"                          : ["angular-ui-router", "angular-translate-loader-url", "angular-sanitize", "angular-storage", "angular-cookies", "angular-bootstrap"]
        },
        waitSeconds : 0
    });

    require(["app"], function (){
        $(window).load(function (){
            $(".loading").addClass("none");
            $(".area-loading").fadeOut(500);
            $("body").removeClass("no-scroll");
            $(".pusher").css("z-index", "2");
        });
    });
})();
