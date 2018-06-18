"use strict";

define(["swiper", "moment"], function (Swiper, moment){
    var app=angular.module(window.name+".index.directive", []);

    app.directive("index", function ($state, $timeout){
        return function (scope, element, attrs){
            element.on("click", "[ui-sref], [data-ui-sref]", function (e){
                //사이드바 닫기
                $(".menu-close__btn, .member-menu-close").click();
            }).on("click", ".close-btn, .close-step", function (){
                //모달 닫기
                $(".ui.large.modal").css("animation-name", "slidedown").modal("hide");
            }).on("click", ".notice_close", function (){
                //대화창 닫기
                var $dialog=$(".notice_layer_popup"), onClose=$dialog.data("dialog.onClose");
                _.isFunction(onClose) && onClose($dialog);
                $dialog.remove();
            }).on("click", ".concert_detail .detail_map_btn", function (){
                //공연상세 팝업 지도 클릭
                element.find(".con_map").fadeIn(300);
            }).on("click", ".concert_detail .popup_close_btn", function (){
                //공연상세 팝업 지도 닫기 클릭
                element.find(".con_map").fadeOut(300);
            });

            //예매하기
            function step(step, fn){
                element.find(".close-btn, .close-step").click();
                _.isFunction(fn) && fn();
                scope.modal(scope, "reserv-step-"+step);
            }
            $("body").on("reservation.step.run", function (e, product){
                scope.product=product;

                scope.reservationStep1(true);
            });
            scope.reservationStep1=function (ignore){
                step(1, function (){
                    scope.sales=new Array(Number(scope.product.limitSaleCount));
                    if(ignore){
                        scope.reservation={
                            //step1
                            saleCount    : 1,
                            //step2
                            entranceDate : null,
                            entranceTime : null,
                            ordNum       : null
                        };
                    }
                });
            };
            scope.reservationStep2=function (){
                step(2, function (){
                    var isOrds=scope.product.entranceType==="E", startDate=isOrds ? new Date(moment(scope.product.ords[0].entranceDate, "YYYY-MM-DD")) : new Date(scope.product.startDate), startDateStr=$.datepicker.formatDate("yy-mm-dd", startDate);
                    scope.reservationStep2DatepickerOption={
                        disabled           : !isOrds,
                        dayNamesMin        : ["일", "월", "화", "수", "목", "금", "토"],
                        showMonthAfterYear : true,
                        onSelect           : function (date){
                            scope.reservation.entranceDate="";
                            scope.reservation.entranceTime="";
                            scope.reservation.ordNum="";
                            scope.reservationStep2Ords=scope.reservationStep2OrdsGroup[date];
                        }
                    };
                    scope.reservationStep2Ords=[];
                    if(isOrds){
                        scope.reservationStep2DatepickerOption.defaultDate=startDate;

                        scope.reservationStep2OrdsGroup=_(scope.product.ords).groupBy("entranceDate").value();
                        scope.reservationStep2Ords=scope.reservationStep2OrdsGroup[startDateStr];

                        scope.reservationStep2OrdDisable=false;
                    }else{
                        scope.reservationStep2DatepickerOption.defaultDate=startDate;

                        scope.reservation.entranceDate=startDateStr;
                        scope.reservation.entranceTime=scope.product.entranceStartTime;

                        scope.reservationStep2OrdDisable=true;
                    }
                });
            };
            scope.reservationStep2setEntranceTime=function (ord){
                scope.reservation.entranceDate=ord.entranceDate;
                scope.reservation.entranceTime=ord.startTime;
                scope.reservation.ordNum=ord.ordNum;
            };
            scope.reservationStep3=function (){
                step(3, function (){
                    //step3 accordion
                    $(".reserv-step-3 .ui.accordion").accordion();

                    //step3 menu_btn slide
                    $(".concert_menu_btn").click(function (){
                        if($(this).hasClass("c_up")){
                            $(".concert_pay_wrap").css({"transform" : "translateY(-46%)", "transition-duration" : "0.3s"});
                            $(this).removeClass("c_up").addClass("c_down");
                        }
                        else{
                            $(".concert_pay_wrap").css({"transform" : "translateY(15%)", "transition-duration" : "0.3s"});
                            $(this).removeClass("c_down").addClass("c_up");
                        }
                    });
                });
            };
            scope.reservationStep4=function (){
                step(4, function (){
                    /*티켓예매 플로우 - 예매자 동의 체크박스*/
                    //checkbox_master
                    $(".modal_title .master.checkbox").checkbox({
                        // check all children
                        onChecked   : function (){
                            var $childCheckbox=$(".reserv_agree").find(".checkbox");
                            $childCheckbox.checkbox("check");
                        },
                        // uncheck all children
                        onUnchecked : function (){
                            var $childCheckbox=$(".reserv_agree").find(".checkbox");
                            $childCheckbox.checkbox("uncheck");
                        }
                    });
                    //checkbox_child
                    $(".reserv_agree .child.checkbox").checkbox({
                        // Fire on load to set parent value
                        fireOnInit : true,
                        // Change parent state on each child checkbox change
                        onChange   : function (){
                            var
                                $listGroup=$(this).closest(".reserv_agree"),
                                $parentCheckbox=$(".modal_title").children(".checkbox"),
                                $checkbox=$listGroup.find(".checkbox"),
                                allChecked=true,
                                allUnchecked=true
                            ;
                            // check to see if all other siblings are checked or unchecked
                            $checkbox.each(function (){
                                if($(this).checkbox("is checked")){
                                    allUnchecked=false;
                                }
                                else{
                                    allChecked=false;
                                }
                            });
                            // set parent checkbox state, but dont trigger its onChange callback
                            if(allChecked){
                                $parentCheckbox.checkbox("set checked");
                            }
                            else if(allUnchecked){
                                $parentCheckbox.checkbox("set unchecked");
                            }
                            else{
                                $parentCheckbox.checkbox("set indeterminate");
                            }
                        }
                    });
                });
            };
            scope.reservationStep5=function (){
                step(5, function (){
                    new Swiper(".faceticket_slide", {
                        slidesPerView : 3,
                        spaceBetween  : 10
                    });

                    //step5 탭&dropdown
                    $(".menu .item").tab();

                    //step5 연락처 input 국가번호 드랍다운
                    $(".reserv_contact").focus(function (){
                        $(this).css({"width" : "82%", "border-bottom" : "none"});
                        $(".country_code").css("display", "block").css({"width" : "18%"});
                        $(".contact_field").css("border-bottom", "1px solid #6b58a7");
                        $(this).focusout(function (){
                            $(".contact_field").css("border-bottom", "1px solid #c6c6c6");
                        });
                    });
                    $(".country_code").dropdown();

                    //step5 우편배송 체크박스
                    $(".tab_post .tab_checkbox .checkbox").checkbox();
                });
            };
            scope.reservationStep6=function (){
                step(6);
            };
            scope.reservationStep7=function (){
                step(7);
            };
            scope.reservationStepEnd=function (name){
                $state.go(name);
            };

            $timeout(function (){
                element.find(".hd-menu").sidebar("attach events", ".hd-menu__btn").sidebar("attach events", ".menu-close__btn", "hide");
                element.find(".hd-member-menu").sidebar("attach events", ".hd-member__btn").sidebar("attach events", ".member-menu-close", "hide");
            });
        };
    });

    return app;
});
