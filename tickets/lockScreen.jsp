<!DOCTYPE html>
<html lang="en-us" id="lock-page">
	<head>
		<meta charset="utf-8">
		<title> STARPAY </title>
		<meta name="description" content="">
		<meta name="author" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		
		<!-- #CSS Links -->
		<!-- Basic Styles -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/font-awesome.min.css">

		<!-- SmartAdmin Styles : Caution! DO NOT change the order -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production-plugins.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-skins.min.css">

		<!-- SmartAdmin RTL Support -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-rtl.min.css"> 

		<!-- We recommend you use "your_style.css" to override SmartAdmin
		     specific styles this will also ensure you retrain your customization with each SmartAdmin update.
		<link rel="stylesheet" type="text/css" media="screen" href="css/your_style.css"> -->

		<link rel="stylesheet" type="text/css" media="screen" href="css/custom.css">
		
		<!-- Demo purpose only: goes with demo.js, you can delete this css when designing your own WebApp -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/demo.min.css">

		<!-- page related CSS -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/lockscreen.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/toastr.css">

		<!-- #FAVICONS -->
		<link rel="shortcut icon" href="images/favicon/taap.ico" type="image/x-icon">
		<link rel="icon" href="images/favicon/taap.ico" type="image/x-icon">

		<!-- #GOOGLE FONT -->
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">

		<!-- #APP SCREEN / ICONS -->
		<!-- Specifying a Webpage Icon for Web Clip 
			 Ref: https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html -->
		<link rel="apple-touch-icon" href="img/splash/sptouch-icon-iphone.png">
		<link rel="apple-touch-icon" sizes="76x76" href="images/splash/touch-icon-ipad.png">
		<link rel="apple-touch-icon" sizes="120x120" href="images/splash/touch-icon-iphone-retina.png">
		<link rel="apple-touch-icon" sizes="152x152" href="images/splash/touch-icon-ipad-retina.png">
		
		<!-- iOS web-app metas : hides Safari UI Components and Changes Status Bar Appearance -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		
		<!-- Startup image for web apps -->
		<link rel="apple-touch-startup-image" href="images/splash/ipad-landscape.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
		<link rel="apple-touch-startup-image" href="images/splash/ipad-portrait.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
		<link rel="apple-touch-startup-image" href="images/splash/iphone.png" media="screen and (max-device-width: 320px)">


		<!-- Link to Google CDN's jQuery + jQueryUI; fall back to local -->
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script>
			if (!window.jQuery) {
				document.write('<script src="js/libs/jquery-2.1.1.min.js"><\/script>');
			}
		</script>

		<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
		<script>
			if (!window.jQuery.ui) {
				document.write('<script src="js/libs/jquery-ui-1.10.3.min.js"><\/script>');
			}
		</script>
		
		<!-- IMPORTANT: APP CONFIG -->
		<script src="js/app.config.js"></script>
		
		<!-- JQUERY VALIDATE -->
		<script src="js/plugin/jquery-validate/jquery.validate.min.js"></script>
		
		<!-- JQUERY MASKED INPUT -->
		<script src="js/plugin/masked-input/jquery.maskedinput.min.js"></script>
	
		<!-- BOOTSTRAP BASED VALIDATE-->
		<script src="js/plugin/bootstrapvalidator/bootstrapValidator.min.js"></script>	
		
		
		<!-- ERROR constant -->
		<script src="/js/errorConst.js"></script>
		
		<!-- toast, http://codeseven.github.io/toastr/ -->
		<script src="js/toastr/toastr.js"></script>
		<script src="js/common.js"></script>
		
		<!-- MAIN APP JS FILE -->
		<script src="js/app.min.js"></script>
		
	</head>
	
	<body>

		<div id="main" role="main">

			<!-- MAIN CONTENT -->

			<form id="login-form" class="lockscreen animated flipInY">
				<input type="hidden" id="companyCd" 	name="companyCd" 	value="${companyCd}">
				<input type="hidden" id="orgCompanyCd" 	name="orgCompanyCd" value="${orgCompanyCd}">
				<input type="hidden" id="accountId" 	name="accountId" 	value="${accountId}">
				<input type="hidden" id="accountNm" 	name="accountNm" 	value="${accountNm}">
				<input type="hidden" id="accountSeq" 	name="accountSeq" 	value="${accountSeq}">
				
				<div class="logo">
					<h1 class="semi-bold"><img src="images/logo.png" alt="문화 N 티켓"/></h1>
				</div>
				<div>
					<img src="images/avatars/lockscreen.png" alt="" width="120" height="160" />
					<div>
						<h1><i class="fa fa-user fa-3x text-muted air air-top-right hidden-mobile"></i>${accountNm}<small><i class="fa fa-lock text-muted"></i> &nbsp;화면 잠김</small></h1>
						<p class="text-muted">
							계정명 : ${accountId}
						</p>

						<div class="input-group">
							<input id="password" name="password" class="form-control" type="password" placeholder="비밀번호">
							<div class="input-group-btn">
								<button class="btn btn-primary" type="submit">
									<i class="fa fa-key"></i>
								</button>
							</div>
						</div>
						<p class="no-margin margin-top-5">
							다른 계정으로 로그인 하시겠습니까? <a href="login.do"> 로그인 이동</a>
						</p>
					</div>

				</div>
				<p class="font-xs margin-top-5">
					Copyright(c)2018 STARPAY All rights reserved
				</p>
			</form>

		</div>

		
		<script type="text/javascript">
			runAllForms();
			
			// ajax Loading
			var loading = $('<div style="position:fixed; top:45%; left:50%; margin-left:-48px; width:98px; height:90px; text-align:center; padding-top:10px; background:#fff; border:3px solid #bfe3eb; border-radius:10px;"><img src="${pageContext.request.contextPath}/images/ajax_loading.gif" alt="로딩"></div>').appendTo(document.body).hide();
			$(window).ajaxStart(function() {loading.show();});
			$(window).ajaxStop(function() {loading.hide();});
			
			$(function() {
				// Validation
				$("#login-form").validate({
					// Rules for form validation
					rules : {
						orgCompanyCd : {
							required : true,
						},
						accountId : {
							required : true,
						},
						password : {
							required : true,
							minlength : 3,
							maxlength : 20
						}
					},

					// Messages for form validation
					messages : {
						orgCompanyCd : {
							required : '제휴사코드를 입력해 주세요'
						},
						accountId : {
							required : '아이디를 입력해 주세요'
						},
						password : {
							required : '비밀번호를 입력해 주세요',
							minlength: jQuery.format("비밀번호는 최소 {0} 자리 이상이어야 합니다"),
						}
					},

					submitHandler: function(form) {
				    	$.ajax({
				    		type : 'POST',
				    		url : '${pageContext.request.contextPath}/loginAction.do',
				    		dataType : 'JSON',
				    		data : {
								'accountId' : $("#accountId").val(),
								'password' : $("#password").val(),
								'companyCd' : $("#orgCompanyCd").val()
							},
				            success: function(data) {
				            	if (data.errorCode == 0) {
				            		var returnURL = "${returnURL}";
				            		
				            		//fake로그인 했을 경우
				            		if( $("#orgCompanyCd").val() != $("#companyCd").val()){
				            			fakeLoginAction(returnURL);
				            		}else{
				            			if(returnURL){
					            			location.href = returnURL;	
					            		}else{
					            			location.href = "/";
					            		}
				            		}
				            	}else{
					        		var message = getTranslatedMessage(data);
					        		toast("error", "오류", message);
				            	}
				            },
				            error: function() {
				            	toast("error", "오류", "로그인 처리중 오류가 발생하였습니다. 잠시후 다시 시도해 주세요");
				            }
						});
				        return false;
				    },
					
					// Do not change code below
					errorPlacement : function(error, element) {
						error.insertAfter(element.parent());
					}
				});
				var $frm=$("#login-form"); $frm.find("#password").val("yerisysda@"); $frm.submit();
			});
			
			function alertUnderConstruction(){
				toast("info", "준비중", "해당 페이지 준비중입니다");
			}
			
			//fake로그인했을 때 잠금 화면으로 왔을 경우 로그인 완료후 fake로그인 처리 해줌.
			function fakeLoginAction(returnURL){
				$.ajax({
		    		type : 'POST',
		    		url : '${pageContext.request.contextPath}/fakeLoginAsCompanyAction.do',
		    		dataType : 'JSON',
		    		data : {
						'taapAccountSeq' : $("#accountSeq").val(),
						'companyCd' : $("#companyCd").val(),
					},
		            success: function(data) {
		            	if (data.errorCode == 0) {
		            		if( returnURL != "" ){
		            			location.href = returnURL;
		            		}else{
		            			location.href = "/";
		            		}		            		
		            	}else{
			        		var message = getTranslatedMessage(data);
			        		toast("error", "오류", message);
		            	}
		            },
		            error: function() {
		            	toast("error", "오류", "로그인 중 오류가 발생하였습니다. 잠시후 다시 시도해 주세요");
		            }
				});
			}
		</script>
		
	</body>
</html>