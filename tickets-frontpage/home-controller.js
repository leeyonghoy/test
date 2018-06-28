"use strict";

define(["moment"], function (moment){
    return function ($window, $scope, $http, $localStorage, $interval){
        $scope.products=[];
        $scope.productsDiv=[];
        $scope.product={};
        $scope.productLatLng={};

        $http.get("api/products?locale="+($localStorage.locale || "ko")).then(function (response){
            $scope.products=response.data;
            if($scope.products.length){
                _($scope.products).each(function (product){
                    product.filePath=window.const.url.aws+"/"+product.filePath;
                });
                $scope.productsDiv=new Array(Math.ceil($scope.products.length/10));
                for(var i=0, length=$scope.productsDiv.length; i<length; i++){
                    $scope.productsDiv[i]={
                        first  : [],
                        second : []
                    };
                    for(var j=0, x=0; j<10; j++, x=j===5 ? 0 : x){
                        if(j<5){
                            $scope.productsDiv[i].first[x++]=$scope.products[(i*10)+j];
                            continue;
                        }
                        $scope.productsDiv[i].second[x++]=$scope.products[(i*10)+j];
                    }
                }
                $scope.selectProduct($scope.products[0]);
            }
        });

        var interval;
        $scope.selectProduct=function (prd){
            if(interval){
                $interval.cancel(interval);
                interval=undefined;
            }

            $scope.product=prd;
            $scope.productLatLng={
                title : prd.facilityNm,
                lat   : prd.gpsY,
                lng   : prd.gpsX
            };

            $scope.product.startDateStr=$.datepicker.formatDate("yy-mm-dd (D) ", new Date(moment(prd.startDate)))+(prd.entranceStartTime || "");
            if(prd.entranceType==="E" && prd.ords && !$scope.product.startDateStrArr){
                $scope.product.startDateStrArr=[];
                _(prd.ords).each(function (ord){
                    $scope.product.startDateStrArr.push($.datepicker.formatDate("yy-mm-dd (D) ", new Date(moment(ord.entranceDate, "YYYY-MM-DD")))+(ord.startTime || ""));
                });
            }

            $scope.product.reserveType=2;
            $scope.product.reserveStartDateStr=moment(prd.reserveStartDate+" "+prd.reserveStartTime).format("YYYY-MM-DD HH:mm");
prd.reserveStartDate="2018-06-20";
prd.reserveEndDate="2018-06-25";
prd.reserveStartTime="10:50";
prd.reserveEndTime="23:50";
            if(prd.reserveStartDate && prd.reserveStartTime && prd.reserveEndDate && prd.reserveEndTime){
                var currentTime=moment().unix(), reserveStartTime=moment(prd.reserveStartDate+" "+prd.reserveStartTime, "YYYY-MM-DD HH:mm").unix(), reserveEndTime=moment(prd.reserveEndDate+" "+prd.reserveEndTime, "YYYY-MM-DD HH:mm").unix(), duration, intervalFn=function (time, timeField){
                    duration=moment.duration((time-currentTime)*1000, "milliseconds");
                    interval=$interval(function (){
                        duration=moment.duration(duration.asMilliseconds()-1000, "milliseconds");
                        var days=moment.duration(duration).days();
                        $scope.product[timeField+"Str"]=(days===0 ? "" : days+"Day ")+moment.duration(duration).hours()+":"+moment.duration(duration).minutes()+":"+moment.duration(duration).seconds();
                        if(duration.asMilliseconds()<0){
                            $scope.selectProduct(prd);
                        }
                    }, 1000);
                };
                if(currentTime<reserveStartTime){
                    $scope.product.reserveType=1;
                    intervalFn(reserveStartTime, "reserveStartTime");
                }else if(currentTime>reserveStartTime && currentTime<reserveEndTime){
                    $scope.product.reserveType=2;
                    intervalFn(reserveEndTime, "reserveEndTime");
                }
            }
        };
        $scope.isCurrentProduct=function (prd){
            return $scope.product && $scope.product.productCd===prd.productCd;
        };

        $scope.productDetail=function (){
            $scope.modal($scope, "home-concert-detail", function ($modal){
                $modal.parent().addClass("c_detail_dimmer").find(".con_map .popup_close_btn").click();
            }, function ($modal){
                $modal.parent().removeClass("c_detail_dimmer")
            });
        };

        $scope.doReservation=function (){
            $("body").trigger("reservation.step.run", [$scope.product]);
        };

        $scope.posterSliderOption={
            spaceBetween  : 20,
            slidesPerView : 3,
            breakpoints   : {
                900 : {
                    slidesPerView  : 2,
                    centeredSlides : true,
                    pagination     : {
                        el             : ".swiper-pagination",
                        clickable      : true,
                        dynamicBullets : false
                    }
                }
            }
        };
        $scope.gridSliderOption={
            spaceBetween  : 150,
            slidesPerView : 1
        };
    };
});
