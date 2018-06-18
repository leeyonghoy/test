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

            "moment"                       : "../components/moment/min/moment.min",

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
            "angular-bootstrap"            : "../components/angular-bootstrap/ui-bootstrap.min",

            "gmap"                         : "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEh-PAa1LwctEI4gz3m2HOrAwvgMmwm5w"
        },
        shim        : {
            "jquery-ui"                    : ["jquery"],

            "utils"                        : ["lodash", "jquery-ui"],

            "semantic"                     : ["utils"],

            "angular"                      : {
                "deps"    : ["semantic", "swiper"],
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

    require(["gmap", "app"], function (){
        $(document).ready(function (){
            $(".loading").addClass("none");
            $(".area-loading").fadeOut(500);
            $("body").removeClass("no-scroll");
            $(".pusher").css("z-index", "2");

            $.datepicker.setDefaults({
                closeText       : "닫기",
                currentText     : "오늘",
                monthNames      : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                monthNamesShort : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                dayNames        : ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
                dayNamesShort   : ["일", "월", "화", "수", "목", "금", "토"],
                dateFormat      : "yy-mm-dd"
            });
        });
    });
})();
