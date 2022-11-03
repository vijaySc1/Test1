(function (root) {
	"use strict";
  window.firstRunFlag=true
	////////////////////
	// all functions. //
	////////////////////
	// first class instantiation.
	function proBar(options){

		this.colorBar = "#2a2a2a";
		this.wrapper_color = "#ecf0f1";
		this.speedAnimation = 0.3; // in seconds
		this.wrapper = "body"; // default value of appending.
		this.finishAnimation = true;
		this.classNameBar = "progressBar"; // default.
		this.wrapperId = "wrapper-progressBar"; // default.

		this.options = options || {};

		if(this.options.color) { this.colorBar = this.options.color }
		if(this.options.bgColor) { this.wrapper_color = this.options.bgColor }
		if(this.options.speed) { this.speedAnimation = this.options.speed }
		if(this.options.wrapper) { this.wrapper = this.options.wrapper }
		if(this.options.finishAnimation == false) { this.finishAnimation = this.options.finishAnimation;}
		if(this.options.classNameBar) { this.classNameBar = this.options.classNameBar }
		if(this.options.wrapperId) { this.wrapperId = this.options.wrapperId }

	    createBar(this.wrapper,this.classNameBar,this.colorBar,this.wrapperId,this.wrapper_color);

		// move the bar
		this.move = (percent) => {

			$("."+this.classNameBar).css({
				width: percent+"%",
				transition : "width "+this.speedAnimation+"s linear"
			});

			$("#"+this.wrapperId).css({
				"height": "2px"
			});

			// verify if is 100%
			setTimeout(() => {
				console.log("********************************");
				console.log(this.finishAnimation);
				console.log(percent == 100);
				console.log(percent == 100 && this.finishAnimation == true);
				console.log("********************************");

				if(percent == 100 && this.finishAnimation == true) {
					console.log("je vais faire l'animation bro");
					$("#"+this.wrapperId).css({
						"height": "0px",
						"transition" : "all 0.3s"
					});
					// reset bar to zero.
					$("."+this.classNameBar).css({
						width: "0%"
					});
				}
			},this.speedAnimation * 1000);
		}
		var setSpeed = (speed) => {
			this.speedAnimation = speed;
		}
		var setColor = (color) => {
			this.colorBar = color;
			$("."+this.classNameBar).css({
				"background-color" : this.colorBar
			});
		}
		var setWrapperColor = (color) => {
			this.wrapper_color = color;
			$("#"+this.wrapperId).css({
				"background-color" : this.wrapper_color
			});
		}
		var setFinishAnimation = (boolean) => {
			this.finishAnimation = boolean;
		}

		let ProBar = {
          setSpeed,
          setColor,
          setWrapperColor,
          setFinishAnimation,
          goto: (percent,time = null) => {
          	if(time != null) {setSpeed(time)}
          	this.move(percent);
          }
        };

		return ProBar;
	}


	var createBar = ( element,classNameBar,colorBar,wrapperId,wrapper_color ) => {
		var Css = `
			.${classNameBar} {
				width : 0px;
				height : 5px;
				background-color: ${colorBar};
			}
			#${wrapperId} {
				width : 100%;
				height : 5px;
				background-color : ${wrapper_color};
    			overflow: hidden;
			}
		`;

		var htmlBar = `<div id="${wrapperId}"><div class="${classNameBar}"></div></div>`;
		$(element).prepend(htmlBar);
		$("head").append(`
			<style>
				${Css}
			</style>
			`);
	}

	if (window.jQuery) {
    	console.log("JQuery is installed !");
	    root.ProBar = proBar;
    } else {
        // jQuery is not loaded
        console.warn("No Jquery - add it as CDN");
        return false;
    }
}(this));

'use strict';
 function divHeadings()
    {$('body').prepend("<div id='headingtop' style='width:100%;position:absolute;height:47px;top:0;z-index:999;display:flex;background:#fff;font-family: adobe-clean;'><div class='adobeanalyticslogo' style='margin-left:9px;margin-right:20px;'> <img style='width:27px;position:relative;top:9px;' src='https://exc-unifiedcontent.experience.adobe.net/assets/HeroIcons.3046d3d8.svg#AdobeExperienceSubCloud'> <span class='spectrum-Shell-logoLabel'id='spectrum-Shell-logoLabel' style='margin: 0 5px;margin-right: 22px;'>Adobe Analytics</span></div></div>");

        // Create headings based on dashboard names
        $("#headingtop").after("<div class='myProBar' style='z-index:9999;top:50px;width:100%;position:fixed'></div>")
     window.probar = new ProBar({
         wrapper : ".myProBar",
         wrapperId : "wrapperSetBar",
         color:"#26C0C7",
         speed:2
     });
        let currentURL=window.location.href;
		let dashdataforheading=GM_getValue('dataforDashboard');

		let numberofDashboards =   Object.keys(dashdataforheading).length
		var headingchange=setInterval(function(){
			if($('#spectrum-Shell-logoLabel').length>0){
				for ( let x=0;x<numberofDashboards;x++)
				  {
					$('#headingtop').append('<span id="span'+x+'" class="headingelements">'+dashdataforheading[x].name+'</span>')
					if(dashdataforheading[x].src==currentURL){
					$('#span'+x).css("border-bottom","2px solid rgb(38, 192, 199)");
                    $('#span'+x).css("color","#323232");
                    }
					if(x+1==numberofDashboards){
						clearInterval(headingchange);
					}

			}
			}},100);

        // Add Power by DWAO and Blank Header
      var styles = `.spectrum-Shell-workspace-container, .spectrum-Shell-rightContainer{display:none !important}.headingelements{    width: auto;    margin:0 7px;    color: rgb(58 58 58);    font-size: 13px;    display: flex;font-weight:600; justify-content: flex-start;    height: 46px;    align-items: center;font-family: sans-serif;font-family: 'adobe-clean';}`
       var styleSheet = document.createElement("style")
       styleSheet.innerText = styles
       document.head.appendChild(styleSheet)
       $('body').append('<div style="position: absolute;    width: 152px;    bottom: 0px;    right: 1px;   background: #fff;    height: 13px;   flex-direction: column;    border-radius: 5px 5px 0px 0px;    font-family: sans-serif;    font-size: 13px;    display: flex;    align-items: center;    padding: 10px;    color: #fff;    background-color: #0d66d0;">Powered by DWAO</div>');
    }
	function closeTabonTimeout()
    {
           GM_addValueChangeListener("activetab",function()
         {
            let workspaceid = window.location.href
            workspaceid = workspaceid.substring(workspaceid.lastIndexOf("/")+1)
            console.log([workspaceid,GM_getValue("activetab")])
            if (workspaceid != GM_getValue("activetab"))
            {
            console.log("Closing Tab")
            window.close()
            }
            else
            {
                console.log("No Need of closing");
                console.log("Starting Timer");
                let currentURL=window.location.href;
                let dashdataforheading=GM_getValue('dataforDashboard');
                let numberofDashboards =   Object.keys(dashdataforheading).length
                for ( let x=0;x<numberofDashboards;x++)
				  {
                      console.log(x)
                      if(dashdataforheading[x].src==currentURL)
                      {

                                          window.probar.goto(100,dashdataforheading[x].time);
                      }
                  }

            }
        })
    }
	
	// Functions gets updated JSON after each round and shows the respective dashboards it also calls the auto switcher.
function getUpdatedJSON()
    {
    GM.xmlHttpRequest({
    method: "GET",
    url: "https://y4vs6aal1d.execute-api.ap-south-1.amazonaws.com/v2/tv-dashboard-v2",
    onload: function(response) {
    let dataforDashboard=JSON.parse(response.responseText);
        console.log(dataforDashboard)
    GM_setValue("dataforDashboard", dataforDashboard);
    starttherotation(dataforDashboard)
  },
   onerror: function(r) {
        console.error('onerror', r);
    }
    })
    }
function starttherotation(dataforD)
        {
         let   dataforDashboard=dataforD
      let countTime = 0
      let openbeoreSeconds = 20
      let numberofDashboards =   Object.keys(dataforDashboard).length
      for ( let x=0;x<numberofDashboards;x++)
      {
          console.log(window.firstRunFlag)
          console.log(window.firstRunFlag && x==0)
          if (window.firstRunFlag && x==0)
          {
              GM_openInTab(dataforDashboard[0].src,{active:true})
              console.log("Opening Tab For First Time:  "+dataforDashboard[x].src.substring(dataforDashboard[x].src.lastIndexOf("/")+1))
              GM_setValue("activetab",dataforDashboard[0].src.substring(dataforDashboard[0].src.lastIndexOf("/")+1))
              console.log(GM_getValue("activetab"))
              countTime+=dataforDashboard[x].time
              window.firstRunFlag=false
              console.log(x)
              console.log(0)
              continue
          }
          else if (x==0)
          {
              GM_openInTab(dataforDashboard[0].src,{insert:true})
              console.log("Opening Tab:  "+dataforDashboard[0].src.substring(dataforDashboard[0].src.lastIndexOf("/")+1))
              setTimeout(function(){GM_setValue("activetab",dataforDashboard[0].src.substring(dataforDashboard[0].src.lastIndexOf("/")+1));
                                   console.log(GM_getValue("activetab"));
                                   },openbeoreSeconds*1000)
              countTime+=dataforDashboard[x].time+openbeoreSeconds
              console.log(x)
              console.log(0)
              console.log(20)
              continue
          }
        setTimeout(function(){
            GM_openInTab(dataforDashboard[x].src,{insert:true})
            console.log("Opening Tab:  "+dataforDashboard[x].src.substring(dataforDashboard[x].src.lastIndexOf("/")+1))
                             },(countTime-openbeoreSeconds)*1000)
        setTimeout(function(){
            GM_setValue("activetab",dataforDashboard[x].src.substring(dataforDashboard[x].src.lastIndexOf("/")+1))
            console.log(GM_getValue("activetab"))
        },(countTime)*1000)
        console.log(x)
        console.log((countTime-openbeoreSeconds))
        console.log(countTime)
        countTime+=dataforDashboard[x].time


          if(x==numberofDashboards-1)
          {
              setTimeout(function(){getUpdatedJSON();
                                   console.log("Calling for the function again");
                                   },(countTime-openbeoreSeconds)*1000)
          }

      }}