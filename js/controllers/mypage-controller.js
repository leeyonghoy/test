"use strict";

define([], function (){
    return function ($scope, $http, $state, $localStorage){
        if(!$localStorage.user){
            $state.go("home");
        }
        
        $scope.userInfo=$localStorage.user.info;
    };
});
