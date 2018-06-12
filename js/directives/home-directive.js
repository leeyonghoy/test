"use strict";

define(["swiper"], function (Swiper){
    var app=angular.module(window.name+".home.directive", []);

    app.directive("dropdown", function (){
        return {
            restrict : "A",
            link     : function (scope, element, attrs){
                element.dropdown();
            }
        };
    });

    app.directive("datepicker", function (){
        return {
            restrict : "A",
            link     : function (scope, element, attrs){
                element.datepicker();
            }
        };
    });

    app.directive("menuMove", function ($state){
        return {
            restrict : "A",
            link     : function (scope, element, attrs){
                var $menuCloseBtn=$(".menu-close__btn, .member-menu-close");
                element.on("click", function (){
                    $state.go(attrs.menuMove);
                    $menuCloseBtn.click();
                });
            }
        };
    });

    app.directive("inputEffect", function ($state){
        return {
            restrict : "A",
            link     : function (scope, element, attrs){
                var $element=$(element);
                $element.add($element.find(".input--effect")).on("focus", function (){
                    var $this=$(this);
                    if(!$this.val()){
                        $this.prev(".input-label").addClass("active");
                    }
                }).on("blur", function (){
                    var $this=$(this);
                    if(!$this.val()){
                        $this.prev(".input-label").removeClass("active");
                    }else{
                        $this.prev(".input-label").addClass("active");
                    }
                });
            }
        };
    });

    app.directive("index", function ($timeout){
        return {
            restrict : "A",
            link     : function (scope, element, attrs){
                $timeout(function (){
                    element.find(".hd-menu").sidebar("attach events", ".hd__logo").sidebar("attach events", ".menu-close__btn", "hide");
                    element.find(".hd-member-menu").sidebar("attach events", ".hd-member__btn").sidebar("attach events", ".member-menu-close", "hide");
                });
            }
        };
    });

    app.directive("home", function (){
        return {
            restrict : "A",
            link     : function (scope, element, attrs){
                new Swiper(".kstar-poster.square", {
                    grabCursor     : true,
                    centeredSlides : false,
                    loop           : true,
                    spaceBetween   : 50,
                    slidesPerView  : 3,
                    pagination     : {
                        el                 : ".swiper-pagination",
                        clickable          : true,
                        dynamicBullets     : true,
                        dynamicMainBullets : 1
                    },
                    navigation     : {
                        nextEl : ".swiper-button-next",
                        prevEl : ".swiper-button-prev"
                    },
                    breakpoints    : {
                        900 : {
                            slidesPerView  : 2.5,
                            centeredSlides : true,
                            pagination     : {
                                el             : ".swiper-pagination",
                                clickable      : true,
                                dynamicBullets : false
                            }
                        }
                    }
                });

                new Swiper(".kstar-poster.grid", {
                    grabCursor     : true,
                    centeredSlides : false,
                    loop           : false,
                    spaceBetween   : 150,
                    slidesPerView  : 1,
                    pagination     : {
                        el                 : ".swiper-pagination",
                        clickable          : true,
                        dynamicBullets     : true,
                        dynamicMainBullets : 1
                    },
                    navigation     : {
                        nextEl : ".swiper-button-next",
                        prevEl : ".swiper-button-prev"
                    }
                });

                element.find(".grid_view i").on("click", function (){
                    var index=$(this).parent().find("i").removeClass("on").filter(this).addClass("on").index()-1;
                    element.find(".swiper-container").hide().eq(index).show();
                }).filter(":first").click();

                element.find(".kstar-poster.grid img").click(function (){
                    $(this).closest(".grid").find("img").removeClass("img_active").filter(this).addClass("img_active");
                });
            }
        };
    });

    return app;
});
