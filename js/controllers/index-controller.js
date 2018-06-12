"use strict";

define(["swiper"], function (Swiper){
    return function ($window, $rootScope, $scope, $http, $state, $localStorage, $timeout){
        $scope.signin={
            username:"",
            password:""
        };

        $scope.signin=function (){
            $http.post("/user/oauth/token?"+$.param($.extend({}, window.const.oauth, {username : $scope.signin.username, password : $scope.signin.password})), {}, {isEmptyHeaders : true}).then(function (response){
                response.data && setUserInfo(response.data);
            }, function (error){
                cosnole.error(error);
            });
        };
        function setUserInfo(token){
            $http.get("/user/api/member", {customHeaders : {Authorization : token.token_type+" "+token.access_token}}).then(function (response){
                if(response.data){
debugger;
                    $localStorage.user={
                        token : token,
                        info  : response.data
                    };
                    window.location.reload();
                }
            }, function (error){
                cosnole.error(error);
            });
        }

        $scope.singout=function (){
            delete $localStorage.user;
            window.location.reload();
        };

        $scope.userInfo=$localStorage.user && $localStorage.user.info;


        //예매 스텝
        $scope.viewDetail=function (){
            $(".ui.large.modal").hide().filter(".concert_detail").css("animation-name", "slideup").modal("show");
        };

        $scope.step1=function (){
            $(".ui.large.modal").hide().filter(".large.modal.reserv-step-1").css("animation-name", "slideup").modal("show");
            
            //modal radio select 관련 script
            $(".modal_select label").click(function (){
                var label_for=$(this).attr("for");
                $(this).siblings("input[type=radio]").attr("checked", false);
                $(this).siblings("input[type=radio][id="+label_for+"]").attr("checked", "");
                $(".modal_select label").not(this).removeClass("label_on");
                $(this).addClass("label_on");
            });
        };

        $scope.step2=function (){
            $(".ui.large.modal").hide().filter(".large.modal.reserv-step-2").css("animation-name", "slideup").modal("show");
        };

        $scope.step3=function (){
            $(".ui.large.modal").hide().filter(".large.modal.reserv-step-3").css("animation-name", "slideup").modal("show");

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
        };

        $scope.step4=function (){
            $(".ui.large.modal").hide().filter(".large.modal.reserv-step-4").css("animation-name", "slideup").modal("show");

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
            $(".reserv_agree .child.checkbox")
                .checkbox({
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
        };

        $scope.step5=function (){
            $(".ui.large.modal").hide().filter(".large.modal.reserv-step-5").css("animation-name", "slideup").modal("show");

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
        };

        $scope.step6=function (){
            $(".ui.large.modal").hide().filter(".large.modal.reserv-step-6").css("animation-name", "slideup").modal("show");
        };

        $scope.step7=function (){
            $(".ui.large.modal").hide().filter(".large.modal.reserv-step-7").css("animation-name", "slideup").modal("show");
        };

        $timeout(function (){
            $(".ui.large.modal").on("click", ".close-btn, .close-step", function (){
                $(".ui.large.modal").css("animation-name", "slidedown").modal("hide");
            });
        });
    };
});
