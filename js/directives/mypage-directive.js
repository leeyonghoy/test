"use strict";

define([], function (){
    var app=angular.module(window.name+".mypage.directive", []);

    app.directive("mypage", function (){
        return {
            restrict : "A",
            link     : function (scope, element, attrs){
                element.find(".mp_menu_list li").on("click", function (){

                    var index=$(this).parent().find("li").removeClass("active").filter(this).addClass("active").index();
                    element.find(".mp_container").hide().eq(index).fadeIn();
                }).filter(":first").click();

                element.find(".search_period button").on("click", function (){
                    $(this).parent().find("button").removeClass("grey purple").addClass("grey").filter(this).removeClass("grey").addClass("purple")
                }).filter(":eq(2)").click();

                element.find(".search_filter_list li").on("click", function (){
                    $(this).parent().find("li").removeClass("active").filter(this).addClass("active");
                }).filter(":first").click();

                element.find(".search_filter_list_2 li").on("click", function (){
                    var index=$(this).parent().find("li").removeClass("active").filter(this).addClass("active").index();
                    element.find(".starpay_pages").hide().eq(index).fadeIn();
                }).filter(":first").click();

                element.find(".js-sch-range").on("click", function (){
                    var $this=$(this), $calendar=$this.parent().find("button").removeClass("on").filter(this).addClass("on").closest(".date-search").find("input.calendar"), $startDate=$calendar.filter("[name=startDate]"), $endDate=$calendar.filter("[name=endDate]"), startDate=toDate($startDate.val());

                    $startDate.val($.datepicker.formatDate("dd/mm/yy", startDate));

                    startDate.setDate(startDate.getDate()+Number($this.attr("range") || $this.attr("data-range")));
                    $endDate.val($.datepicker.formatDate("dd/mm/yy", startDate));
                }).filter(":first").click();
            }
        };
    });

    function toDate(dateStr){
        return !dateStr ? new Date() : new Date(dateStr.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
    }

    return app;
});
