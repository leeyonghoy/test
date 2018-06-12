"use strict";

define([], function (){
        return function ($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise("/home");

            $stateProvider.state("home", {
                url         : "/home",
                controller  : "homeController as ctrl",
                templateUrl : "context/html/home.html"
            }).state("mypage", {
                url         : "/mypage",
                controller  : "mypageController as ctrl",
                templateUrl : "context/html/mypage.html"
            }).state("cs", {
                url         : "/cs",
                controller  : "csController as ctrl",
                templateUrl : "context/html/cs.html"
            });
        };
    }
);
