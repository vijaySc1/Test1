(function() {
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





window.loginauthentication = {
    "enteremail": function() {
        console.log('enter email function called');
        var emailauth = setInterval(function() {
            if (document.querySelectorAll('input[type=email]').length > 0 && document.querySelectorAll('#EmailForm > section.EmailPage__submit.mod-submit > div.ta-right > button').length > 0 && typeof dispatchEvent != "undefined") {
                setNativeValue(document.querySelector('input[type=email]'), emailid)
                document.querySelector('#EmailForm > section.EmailPage__submit.mod-submit > div.ta-right > button').click();
                loginauthentication.requestotp();
                loginauthentication.enterpassword();
                loginauthentication.confirmloginscreen();
                //chooseAccount();
                clearInterval(emailauth);
            }
        }, 100);
    },
    "enterotp": function() {

        console.log('calling function enterotp');
        GM.xmlHttpRequest({
            method: "GET",
            url: "https://nb7jihrfpj.execute-api.us-east-1.amazonaws.com/V1/get-otp",
            onprogress: function(e) {
                console.log('onprogress', (e.loaded / e.total), e);
            },
            onload: function(response) {
                if (JSON.parse(response.responseText).OTP != "NaN") {
                    console.log("response is" + response.responseText);
                    localStorage.setItem('otpvalue', JSON.parse(response.responseText).OTP);
                    let otpvariable = localStorage.getItem('otpvalue');
                    for (let i = 1; i < 7; i++) {
                        setNativeValue(document.querySelector('.ChallengeCode-CodeInput > div > input:nth-child(' + i + ')'), otpvariable.charAt(i - 1));
                        if (i == 6) {
                            setTimeout(loginauthentication.wrongotp, 6000);
                        }
                    }

                } else {
                    console.log("No Respond found");
                    if (countressendOTPcall > 0) {
                        $('button[data-id="ChallengeCodePage-Resend"]').click();
                        setTimeout(loginauthentication.enterotp, timerOTPcalling);
                        countressendOTPcall--;
                    }
                }

            },
            onerror: function(r) {
                console.error('onerror', r);
            }
        });
    },
    "requestotp": function() {
		console.log('calling function requestotp');
        var otpoauth = setInterval(function() {
            if ($('.ChallengeCode-CodeInput > div > input:nth-child(6)').length > 0) {
                //fetching the OTP from the API
                setTimeout(loginauthentication.enterotp, timerOTPcalling);
                clearInterval(otpoauth);
            }
        }, 100);
    },
    "wrongotp": function() {
		console.log('calling function wrongotp');
        if (countressendOTPcall > 0) {
            if (document.querySelectorAll('div.ChallengeCode__message-container > span.color-red.fs-smaller').length > 0) {
                console.log("OTP is invalid");
                $('button[data-id="ChallengeCodePage-Resend"]').click();
                setTimeout(loginauthentication.enterotp, timerOTPcalling);

            }
            countressendOTPcall = countressendOTPcall - 1;
        }
    },
    "enterpassword": function() {
		console.log('calling function enterpassword');
        var Passwordauth = setInterval(function() {
            if ($('#PasswordPage-PasswordField').length > 0) {
                setNativeValue(document.querySelector('#PasswordPage-PasswordField'), password);
                $('#PasswordForm > section.PasswordPage__action-buttons-wrapper > div:nth-child(2) > button').click();
                //$('body').css("opacity","0");
                clearInterval(Passwordauth);
            }
        }, 100);
    },
    "confirmloginscreen": function() {
		console.log('calling function confirmloginscreen');
        var authaccountinterval = setInterval(function() {
            if ($('#App > div > div > section > div > div > section > div.Route > section > div > div > section > section > section.Page__actions > button').length > 0) {
                $('#App > div > div > section > div > div > section > div.Route > section > div > div > section > section > section.Page__actions > button').click();
                clearInterval(authaccountinterval);
            }
        }, 1000);
    }

}

})();