
//鍏ㄥ眬 閿欒娆℃暟
var error = 0;
if (window != top)
top.location.href = location.href;
//鍏ㄥ眬 椤圭洰璺熺洰褰�
var path = getRootPath();
/*
 //jsp鍩� 涓� action鍩�
	window.onload = function (){ TestMe();}
	function TestMe(){
		$.ajax({
			url:'login.action?a='+new Date(),
			data :{'txt':"txt"},
			success:function(){
					
			}
		});
	}
*/

//瀹炴椂鏌ヨ閿欒娆℃暟
function errorTimes(){
		var $Nam = $("#username").val();
		var var1 = 0;
		$.ajax({
			url:path + '/LoginErrorTime.action?a='+new Date(),
			async:false,
			data:{'uName':$Nam},
			success:function(Dt){
				var1 = Dt;
			}
		});
		if(var1>=3){
			$("#checkCode").show();
		}else{
			$("#checkCode").hide();
		}
	}

//闅忔満
function getRandomNum() {
	var minNum = 1; 
	var maxNum = 1000;
    var rev = minNum + Math.round((Math.random() * (maxNum - minNum)));
    return rev;
}

//琛ㄥ崟楠岃瘉
	$(document).ready(function(){
		
		/*var $Nm = $("#username").val();
		if($Nm!='')	{
			errorTimes();
		}else{
			$("#checkCode").hide();
		}	*/	
		$.formValidator.initConfig({
			formID : "mainForm",
			onError : function() {				
				alert("璇锋鏌ュ～鍐欏唴瀹规槸鍚︽纭�");				
			}
		});
		
		$("#username").formValidator({
			onShow : "璇疯緭鍏ョ櫥褰曞悕",
			onCorrect : "杈撳叆姝ｇ‘"
		}).regexValidator({
			regExp : "notempty",
			dataType : "enum",
			onError : "鐢ㄦ埛鍚嶄笉鑳界┖"
		});

		$("#password").formValidator({
			onShow : "璇疯緭鍏ュ瘑鐮�",
			onCorrect : "杈撳叆姝ｇ‘"
		}).regexValidator({
			regExp : "notempty",
			dataType : "enum",
			onError : "瀵嗙爜涓嶈兘涓虹┖"
		});
			
	});
	 // 鐢ㄦ埛鐧婚檰
	function login(){
		var $Nam  = $("#username").val();
		if (!$.formValidator.pageIsValid('1'))
						return false; //濡傛灉涓嶉€氳繃鍒欎笉鎻愪氦
		var loginString = path + '/login.action?d='+getRandomNum();
		$.ajax({
			 url:loginString,
			 async: false,
			 data:$("form").serialize(),//鑷姩鎻愪氦琛ㄥ崟涓殑鍊�
			 success:function(msg){
			 	if(msg==1){
			 		savecookie();
			 		begin();//鑾峰彇鏉冮檺鑼冨洿鍐呯殑鑿滃崟
			 	}else if(msg==0){
			 		error += 1;
			 		alert("鐧诲綍瀵嗙爜鍑洪敊");
			 		errorTimes();
			 		$("#password").val("");
			 		$("#myimg").click();
			 	}else if(msg==-1){
			 		alert("鐢ㄦ埛涓嶅瓨鍦�");
			 	}else if(msg==-2){
			 		alert("鐢ㄦ埛鍚嶉噸澶嶏紝璇疯仈绯荤鐞嗗憳");
			 	}else if(msg==-3){
			 		alert("璇峰厛婵€娲婚偖绠�");
			 		window.location.href= path + "/activePrompt.action?show=To&Nam="+$Nam;
			 	}else if(msg==-4){
			 		alert("楠岃瘉鐮佽緭鍏ラ敊璇�");
			 		$("#code").val("");
			 		$("#myimg").click();
			 	}else if(msg==-5){
			 		alert("鏃犳硶鑾峰彇楠岃瘉鐮�");
			 		window.location.href=window.location.href;
			 	}else if(msg==-6){
			 		alert("鐢ㄦ埛涓嶅瓨鍦�");
			 		$("#username,#password").val("");
			 	}else{
			 		alert("绯荤粺閿欒锛岃鑱旂郴绠＄悊鍛�");
			 		location.href = location.href;
			 	}
			 }
		});
	}
	
	//淇濆瓨cookie淇℃伅
	function savecookie(){
		var boo = $(":checked").length;
		if(boo == 1){
			//alert('save');
			var userName = $("#username").val(); 
			var passWord = $("#password").val(); 
			$.cookie("rmbUser", "true", { expires: 7 }); 
			$.cookie("userName", userName, { expires: 7 }); 
			$.cookie("passWord", passWord, { expires: 7 }); 
		}else{
			//alert('notsave');
			$.cookie("rmbUser", "false", { expires: -1 }); 
			$.cookie("userName", '', { expires: -1 }); 
			$.cookie("passWord", '', { expires: -1 }); 
		}
	}
	
	//闅忔満鏁�
	function randomNum() {
		var minNum = 1; 
		var maxNum = 10000;
	    var rev = minNum + Math.round((Math.random() * (maxNum - minNum)));
	    return rev;
	}

	//鑿滃崟鍊�
	function begin(){
		//var url = $("#urlTo").val(); 
		$.ajax({
			url: path + '/queryMenus.action',
			async: false,
			data:{'data':randomNum()}
		});
		window.location.href= path + "/index.html";//urlTo="+url;
	}
	
	//鍥炶溅鐧婚檰===浠ュ墠鐗堟湰鍙湁涓€涓寜閽彲浠ュ洖杞︾櫥褰曪紝鏂扮晫闈袱涓寜閽紝涓嶈兘鍥炶溅鐧诲綍
/*$(function(){
	document.onkeydown = function(e){ 
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	           login();
	     }
	};
}); */

//璁颁綇鐢ㄦ埛鍚�
$(document).ready(function (){	
	var coo = $.cookie("rmbUser");
	if (coo == "true") { 
		$("#rmbUser").attr("checked", "checked"); 
		$("#username").val($.cookie("userName")); 
		$("#password").val($.cookie("passWord")); 
		$("#checkCode").hide();
		//濡傛灉杈撳叆妗嗚幏寰楃劍鐐瑰垯榛樿閲嶆柊杈撳叆鐢ㄦ埛鍚嶅瘑鐮�
		$("#username").focus(function(){
			$("#username").val(""); 
			$("#password").val("");
			//娓呯┖cookie鎵€璁板綍鐢ㄦ埛淇℃伅
			$.cookie("rmbUser", "false", { expires: -1 }); 
			$.cookie("userName", '', { expires: -1 }); 
			$.cookie("passWord", '', { expires: -1 }); 
		});
	} 
});

$(function() {
	var $Nm = $("#username").val();
	if ($Nm != '') {
		errorTimes();
	} else {
		$("#checkCode").hide();
	}
});
