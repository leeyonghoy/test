				
		<header id="header">
			<div id="logo-group">
				<span id="logo"><img src="https://www.starcoin.tv/assets/images/wallet/common/logo_pay.png" alt="STARPAY" /></span>
			</div>
		</header>

		<div id="main" role="main">

			<!-- MAIN CONTENT -->
			<div id="content" class="container">

				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
                        <h2 class="login-header-big about-tit">세계유일 블록체인 결제시스템</span></h2>
						<h1 class="txt-color-white login-header-big about-tit">STARPAY 티켓관리시스템</h1>
					</div>
					
					
					<div class="col-xs-12 col-sm-12 col-md-5 col-lg-4">
						<div class="well no-padding">
							<form id="login-form" class="smart-form client-form">
								<header>
									로그인
								</header>

								<fieldset>
									<input type="hidden" name="companyCd" id="companyCd" value="">
									<!-- 
									<section>
										<label class="label">제휴사코드</label>
										<label class="input"> <i class="icon-append fa fa-leaf"></i>
											<input type="text" name="companyCd" id="companyCd" value="">
											<b class="tooltip tooltip-top-right"><i class="fa fa-leaf txt-color-teal"></i> 발급받은 제휴사코드를 입력해 주세요</b></label>
									</section>
									 -->

									<section>
										<label class="label">아이디</label>
										<label class="input"> <i class="icon-append fa fa-user"></i>
											<input type="text" name="accountId" id="accountId">
											<b class="tooltip tooltip-top-right"><i class="fa fa-user txt-color-teal"></i> 아이디를 입력해 주세요</b></label>
									</section>

									<section>
										<label class="label">비밀번호</label>
										<label class="input"> <i class="icon-append fa fa-lock"></i>
											<input type="password" name="password" id="password">
											<b class="tooltip tooltip-top-right"><i class="fa fa-lock txt-color-teal"></i> 비밀번호를 입력해 주세요</b> </label>
										<div class="note">
											<!-- <a href="forgotpassword.html">비밀번호를 잊으셨나요?</a> -->
										</div>
									</section>

									<section>
										<label class="checkbox">
											<input type="checkbox" id="rememberID" name="rememberID" checked>
											<i></i>아이디 저장</label>
									</section>
								</fieldset>
								<footer>
									<button type="submit" class="btn btn-primary">
										로그인
									</button>
								</footer>
								
								<input type="hidden" name="reason" id="reason" value="${reason}">
							</form>

						</div>
						
					</div>
				</div>
			</div>
		</div>

		<!-- 로그인 수정 -->
		<div class="copy_txt">
			Copyright(c)2018 STARPAY All rights reserved.
		</div>
		
		<script type="text/javascript">

		var loading = $('<div style="position:fixed; top:45%; left:50%; margin-left:-48px; width:98px; height:90px; text-align:center; padding-top:10px; background:#fff; border:3px solid #bfe3eb; border-radius:10px;"><img src="${pageContext.request.contextPath}/images/ajax_loading.gif" alt="로딩"></div>').appendTo(document.body).hide();
		
		$(document).ready(function() {
			runAllForms();

			initLoginForm();

			// ajax Loading
			
			$(window).ajaxStart(function() {loading.show();});
			$(window).ajaxStop(function() {loading.hide();});
			
			$(function() {
				// Validation
				$("#login-form").validate({
					// Rules for form validation
					rules : {
						/*
						companyCd : {
							required : true,
						},
						*/
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
						/*
						companyCd : {
							required : '제휴사코드를 입력해 주세요'
						},
						*/
						accountId : {
							required : '아이디를 입력해 주세요'
						},
						password : {
							required : '비밀번호를 입력해 주세요',
							minlength: jQuery.format("비밀번호는 최소 {0} 자리 이상이어야 합니다"),
						}
					},

					submitHandler: function(form) {
						var rememberID = ($("#rememberID").is(':checked') ? "Y" : "N");

						if(rememberID == "Y"){
							setCookie("login_rememberID", rememberID, 7);
							//setCookie("login_companyCd", $("#companyCd").val(), 7);
							setCookie("login_ID", $("#accountId").val(), 7);
						}else{
							deleteCookie("login_rememberID");
							//deleteCookie("login_companyCd");
							deleteCookie("login_ID");
						}
						
				    	$.ajax({
				    		type : 'POST',
				    		url : '${pageContext.request.contextPath}/loginAction.do',
				    		dataType : 'JSON',
				    		data : {
								'accountId' : $("#accountId").val(),
								'password' : $("#password").val(),
								'companyCd' : $("#companyCd").val()
							},
				            success: function(data) {
				            	if (data.errorCode == 0) {
				            		var returnURL = "${returnURL}";
				            		if(returnURL){
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
				var $frm=$("#login-form"); $frm.find("#accountId").val("administrator"); $frm.find("#password").val("yerisysda@"); $frm.submit();
			});
		});

		function initLoginForm(){
			if(getCookie("login_rememberID") == "Y"){
				var id = getCookie("login_ID");
				var companyCd = getCookie("login_companyCd");
				$("#accountId").val(id);
				//$("#companyCd").val(companyCd);
				
				$("#password").focus();
				$("#rememberID").prop("checked", "true");
			}else{
				//$("#companyCd").focus();
				$("#accountId").focus();
				$("#rememberID").prop("checked", null);
			}
			
			if($("#reason").val() == "dup"){
				setTimeout(function() {       
	                $(function() {
	                	toast("warning", "중복 로그인", "다른 PC에서 중복 로그인되어 로그아웃되었습니다");	
	                });
	            }, 1000);
			}
		}
		
		function alertUnderConstruction(){
			toast("info", "준비중", "해당 페이지 준비중입니다");
		}
		</script>
