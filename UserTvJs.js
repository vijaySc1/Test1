// ==UserScript==
// @name         Login Authentication
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://auth.services.adobe.com/*/deeplink.htm*
// @match        https://experience.adobe.com/*
// @match        https://www4.an.adobe.com/spa/index.html*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require https://code.jquery.com/jquery-3.6.1.min.js
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlHttpRequest
// @grant        GM_addElement
// ==/UserScript==

(function() {

//testing if the code updates
//popup code starts
window.popuploading =function(){
$('body').append('<style>body{opacity:0;}.popupcode .loader_inner {z-index:999; position: absolute; background: rgb(255 255 255 / 80%); top: 0px; bottom: 0px; left: 0px;  right: 0px; text-align: center; padding-top: 230px;}  .popupcode .heading1 { line-height: 46px; color: #3b536f; margin-bottom: 20px; } .popupcode .logo1 {  position: absolute;    z-index: 1000;    top: 0px;    padding: 5px;width: 70px; } .popupcode .logo2 { width: 145px; margin-left: 8px; } .popupcode .pbFont {     font-size: 24px; color: #3b536f; } </style>');
 $('body').append('<div class="popupcode"></div>');

    GM_addElement(document.querySelector('.popupcode'), 'img', {
  style: 'z-index:800; position: fixed; top: 0px; bottom: 0px; left: 0px; right: 0px;background-size: cover; background-position: center; width:100vw',
    src:'https://webhost.dwao.in/HDFC_Bank/b7.gif',
    class:'loader-main'
});

$('.popupcode').append('<div class="loader_inner"> <h1 class="heading1">Real-Time Analytics Dashboard</h1></div>');

/*GM_addElement(document.querySelector('.pbFont'), 'img', {
  src: 'https://webhost.dwao.in/HDFC_Bank/HDFC_Bank_logo.png',
   class:'logo2'
});*/

GM_addElement(document.querySelector('.popupcode'), 'img', {
  src: 'https://webhost.dwao.in/HDFC_Bank/Dwao.png',
  class:'logo1'
});
setTimeout(function(){
$('body').css("opacity","1");
},2000);
}
window.hidepoup= function(){
$('.popupcode').css({'display':'none'});
}


//popup code end
//login authentication code start
 window.setNativeValue=function(el, value){
  const previousValue = el.value;

  if (el.type === 'checkbox' || el.type === 'radio') {
    if ((!!value && !el.checked) || (!!!value && el.checked)) {
      el.click();
    }
  } else el.value = value;

  const tracker = el._valueTracker;
  if (tracker) {
    tracker.setValue(previousValue);
  }

  // 'change' instead of 'input', see https://github.com/facebook/react/issues/11488#issuecomment-381590324
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

window.emailprefill =function(){
var emailauth=setInterval(function(){
if(document.querySelectorAll('input[type=email]').length>0 && document.querySelectorAll('#EmailForm > section.EmailPage__submit.mod-submit > div.ta-right > button').length>0 && typeof dispatchEvent !="undefined"){
setNativeValue(document.querySelector('input[type=email]'),emailid)
document.querySelector('#EmailForm > section.EmailPage__submit.mod-submit > div.ta-right > button').click();
otpprefill();
Passwordprefill();
authaccount();
//chooseAccount();
clearInterval(emailauth);
}
},100);

}
window.authaccount=function(){
	var authaccountinterval=setInterval(function(){
		if($('#App > div > div > section > div > div > section > div.Route > section > div > div > section > section > section.Page__actions > button').length>0){
		$('#App > div > div > section > div > div > section > div.Route > section > div > div > section > section > section.Page__actions > button').click();
	authaccountinterval();
	}
	},1000);
	
}
window.chooseAccount =function(){
var chooseAccountinterval=setInterval(function(){
if(document.querySelectorAll('div.ActionList.IdentitiesPage__chooser > div:nth-child(1)').length>0 ){
document.querySelector('div.ActionList.IdentitiesPage__chooser > div:nth-child(1)').click();
otpprefill();
clearInterval(chooseAccountinterval);
}
},100);

}

window.otpprefill=function(){
console.log('first function called');
var otpoauth=setInterval(function(){
if($('.ChallengeCode-CodeInput > div > input:nth-child(6)').length>0){
//fetching the OTP from the API
console.log('OTP calling step 1 initialised');
setTimeout(callforOTP,timerOTPcalling);
clearInterval(otpoauth);
}
},100);
}


window.callforOTP = function(){
console.log('calling for OTP');
GM.xmlHttpRequest({
  method: "GET",
  url: "https://nb7jihrfpj.execute-api.us-east-1.amazonaws.com/V1/get-otp",
  onprogress: function(e) {
        console.log('onprogress', (e.loaded / e.total), e);
    },
  onload: function(response) {
  if(JSON.parse(response.responseText).OTP!="NaN"){
   console.log("response is" +response.responseText);
   localStorage.setItem('otpvalue',JSON.parse(response.responseText).OTP);
	let otpvariable=localStorage.getItem('otpvalue');
	for(let i=1;i<7;i++){
	setNativeValue(document.querySelector('.ChallengeCode-CodeInput > div > input:nth-child('+i+')'),otpvariable.charAt(i-1));
	if(i==6){
		setTimeout(checkforOTPValidity,6000);
	}
	}

  }else{
	  console.log("No Respond found");
	  if(countressendOTPcall>0){
	  $('button[data-id="ChallengeCodePage-Resend"]').click();
	  setTimeout(callforOTP,timerOTPcalling);
	  countressendOTPcall--;
	  }
  }

  },
   onerror: function(r) {
        console.error('onerror', r);
    }
});
}

window.checkforOTPValidity =function(){
	if(countressendOTPcall>0){
	if(document.querySelectorAll('div.ChallengeCode__message-container > span.color-red.fs-smaller').length>0){
		console.log("OTP is invalid");
		$('button[data-id="ChallengeCodePage-Resend"]').click();
		setTimeout(callforOTP,timerOTPcalling);

	}else{
		Passwordprefill();
		console.log("OTP is valid");
	}
	countressendOTPcall=countressendOTPcall-1;
	}
}
window.Passwordprefill = function(){
var Passwordauth=setInterval(function(){
if($('#PasswordPage-PasswordField').length>0){
setNativeValue(document.querySelector('#PasswordPage-PasswordField'),password);
$('#PasswordForm > section.PasswordPage__action-buttons-wrapper > div:nth-child(2) > button').click();
//$('body').css("opacity","0");
objectforDataManipulation.AdditionofTab();
clearInterval(Passwordauth);
}
},100);
}

//login authentication code end
//workspace code started

     var styles = `
    .TipOfTheDay-container  {
        display: None;
    }
    .spectrum-Shell-rightContainer {
        display: None;
    }

   .Loading{
	position: relative;
    width: 100%;
    height: 2px;
    background: rgba(255,255,255,.05);
    border-radius: 25px;
    display: flex;
    align-items: center;
}
.Loading span{
	position:absolute;
	width:0%;
	height:100%;
	background-color:#0fbcf9;
	border-radius:25px;
}
.Loading span {
  transition: width 1s linear;
}
.headertabcss {
  width: 22%;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rail.dock-left.is-pinned.tabs-visible {
        width: 0px!important;
    }
.an-workspace-header{
display: none !important;
}
.rail-contents{
display:none !important;
}
`
console.log("Welcome")
var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)


window.callloadfunctionprogressbar=function(){
 $( "iframe" ).one( "load", function() {
                   console.log( "This will be displayed only once." );
     setTimeout(objectforDataManipulation.progressbar, 10000);
               });
}

var objectforDataManipulation = {

"fetchDashData" :function(){
	GM.xmlHttpRequest({
  method: "GET",
  url: "https://y4vs6aal1d.execute-api.ap-south-1.amazonaws.com/v1/tb-dashboard",
  onload: function(response) {
 
	dashData=JSON.parse(response.responseText);
	objectforDataManipulation.AdditionofTab();
	objectforDataManipulation.tooltipaddition();
  },
   onerror: function(r) {
        console.error('onerror', r);
    }
});
	},
    "ChangetheHeading": function() {
        window.timerforLogo = setInterval(function() {
            if ((document.getElementsByClassName("spectrum-Shell-logoLabel").length) == 1) {
                //document.getElementsByClassName("spectrum-Shell-logoLabel")[0].innerText = "Adobe Analytics Dashboards Powered by DWAO";
                clearInterval(window.timerforLogo);
            }
        }, 50)
    },
	"tooltipaddition":function(){

        $('body').append('<div style="position: absolute;    width: 152px;    bottom: 0px;    right: 1px;   background: #fff;    height: 13px;   flex-direction: column;    border-radius: 5px 5px 0px 0px;    font-family: sans-serif;    font-size: 13px;    display: flex;    align-items: center;    padding: 10px;    color: #fff;    background-color: #0d66d0;">Powered by DWAO</div>');
	},
    "AdditionofTab": function() {
		

		progressbartimer=(100/(parseInt(((dashData[0].time).split('sec'))[0])));

        window.timerforDashboardNames = setInterval(function() {

            if ($(".spectrum-Shell-workspace-container").children().children().length > 0) {

                let div = $(".spectrum-Shell-workspace-container").children().children()[0]

                let divDashboard = []
                for (let x in dashData) {
                    //let newDiv = $(div).clone().text(dashData[x].name)
                    let newDiv = $(div).clone().attr('id', 'dwaoheader' + x).text(dashData[x].name)
                    divDashboard.push(newDiv)
                    console.log($(newDiv).text())
                }
                $(".spectrum-Shell-workspace-container").children().empty()
                for (let x in divDashboard) {
                    $(".spectrum-Shell-workspace-container").children().append(divDashboard[x]);
					$('#dwaoheader' + x).addClass('headertabcss');
                }


                //Enable the tab with their respective dashboard
                for (let x in divDashboard) {

                    $('#dwaoheader' + x).click(function() {
                        $('iframe').attr('src', dashData[x].src);
                        $('.spectrum-Tabs-item').attr('style', 'border-bottom:0px');
                        $('#dwaoheader' + x).attr('style', 'border-bottom:2px solid blue');
						progressbartimer=(100/(parseInt(((dashData[x].time).split('sec'))[0])));
                        if (typeof MyCounter != "undefined") {
                            clearInterval(MyCounter);
                            getCounter = 0;
                            $('.containerofprogressbar').attr('id', x);
                            $('.Loading span').css({
                                'display': 'none'
                            });
                        }
						callloadfunctionprogressbar();
                    })
                }
				//setting the first tab as default
				$('#dwaoheader0').attr('style', 'border-bottom:2px solid blue');
				$('iframe').attr('src', dashData[0].src);

                //Enable the progressbar
                $('.workspacesPresent').after('<div class="containerofprogressbar" id="0"><div class="Loading"><span data-charge="100"></span></div>	</div>');
				callloadfunctionprogressbar();
                setTimeout(hidepoup,10000);



                clearInterval(window.timerforDashboardNames);
            }
        }, 50)
    },
    "progressbar": function() {
        $('.Loading span').css({
            'display': 'block',
            'width': '0%'
        });

        MyCounter = setInterval(function() {
            if (getCounter < 97) {
                //$('.container i').text(getCounter++ + '%');
				getCounter = getCounter + progressbartimer;
			  $('.Loading span').css({
                    'width': getCounter + '%'
                });
              /*  getCounter = getCounter + 3;
                $(".Loading span").animate({
                    width: getCounter + '%'
                }, 1000, 'linear');
*/

            } else {
                positionnumber = parseInt($('.containerofprogressbar').attr('id'));
                //alert("position number is" +positionnumber );
                positionnumber++;
                if (Object.keys(dashData).length == positionnumber) {
                    positionnumber = 0;
                }
				progressbartimer=(100/(parseInt(((dashData[positionnumber].time).split('sec'))[0])));
                $('iframe').attr('src', dashData[positionnumber].src);
                $('.spectrum-Tabs-item').attr('style', 'border-bottom:0px');
                $('#dwaoheader' + positionnumber).attr('style', 'border-bottom:2px solid blue');
                getCounter = 0;
                $('.Loading span').css({
                    'width': 0 + '%'
                });
                $('.Loading span').css({
                    'display': 'none'
                });
                $('.containerofprogressbar').attr({
                    'id': positionnumber
                });
				callloadfunctionprogressbar();
                clearInterval(MyCounter);

                //	alert("finish");
            };

        }, 1000);
    }
}



objectforDataManipulation.fetchDashData();


//reset();


    //API Call After on cycle.
    //GM_SEt
    //GM_GetValue DataLayer
    //Rotational Logic
})();