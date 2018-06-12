"use strict";

require([
        "configuration/providerHttp",
        "configuration/providerRouter",

        "controllers/index-controller",
        "controllers/home-controller",
        "controllers/mypage-controller",
        "controllers/cs-controller",

        "directives/home-directive",
        "directives/mypage-directive"
    ],
    function (providerHttp, providerRouter, indexController, homeController, mypageController, csController){
        var app=angular.module(window.name, [
            "ui.router",
            "pascalprecht.translate",
            "ngSanitize",
            "ngStorage",
            "ngCookies",

            window.name+".home.directive",
            window.name+".mypage.directive"
        ]);

        app.config(providerHttp).config(providerRouter).config(function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }).config(function ($translateProvider){
            $translateProvider.useUrlLoader("/api/i18n");
            $translateProvider.useStorage("i18nStorage");
            $translateProvider.preferredLanguage("ko");
            $translateProvider.fallbackLanguage("ko");
        }).factory("i18nStorage", function ($location){
            return {
                put : function (name, value){
                },
                get : function (name){
                    return $location.search()["lang"]
                }
            };
        });

        app.controller("indexController", indexController);
        app.controller("homeController", homeController);
        app.controller("mypageController", mypageController);
        app.controller("csController", csController);
        
        angular.element(document).ready(function (){
            angular.bootstrap($("html").get(0), [app.name]);
        });
    }
);
