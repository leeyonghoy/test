"use strict";

define([], function (){
        return function ($httpProvider){
            $httpProvider.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";

            $httpProvider.defaults.headers.post["Cache-Control"]="no-cache, must-revalidate";
            $httpProvider.defaults.headers.post["Pragma"]="no-cache";

            $httpProvider.interceptors.push(function ($q, $rootScope){
                function checkArray(object){
                    if(!object){
                        return false;
                    }
                    if(_.isArray(object)){
                        return true;
                    }
                    if(_.isObject(object)){
                        var keys=_.keys(object), value;
                        for(var i=0; i<keys.length; i++){
                            value=object[keys[i]];
                            if(_.isArray(value) || (_.isObject(value) && checkArray(value))){
                                return true;
                            }
                        }
                    }
                    return false;
                }
                return {
                    request       : function (config){
                        if(config.method==="POST" && checkArray(config.data)){
                            config.headers["Content-Type"]="application/json;charset=utf-8";
                            config.data=JSON.stringify(config.data);
                        }else if(config.data){
                            config.headers["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8";
                            config.data=_.isObject(config.data) ? $.param(config.data) : config.data;
                        }

                        var url=_.filter(config.url.split("/"), function (str){ return str; }), urlPrefix=url.shift(), host=window.const.url[urlPrefix];
                        if(host===undefined || host===null){
                            console.error("host not found. [", config.url, "]");
                            return;
                        }
                        config.url=host+"/"+url.join("/");

                        if(config.isEmptyHeaders){
                            delete config.headers;
                        }else if(config.customHeaders){
                            config.headers=config.customHeaders;
                        }

                        return $q.when(config);
                    },
                    requestError  : function (rejection){
                        return $q.reject(rejection);
                    },
                    response      : function (response){
                        return response;
                    },
                    responseError : function (rejection){
                        return $q.reject(rejection);
                    }
                };
            });
        };
    }
);
