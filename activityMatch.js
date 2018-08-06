var queryLetter;
	optionKeys = [];
	
	var list = [];
	var queryImages = [];
	var boxImages = [];

function activityMatch(cat){
	var playArea = document.getElementById("play_area");
	while (playArea.firstChild){
		playArea.removeChild(playArea.firstChild);
	}
	var foot = document.getElementById("footer");
	foot.setAttribute("style","bottom:"+0+"px;left:"+0+"px");
	while (foot.firstChild){
		foot.removeChild(foot.firstChild);
	}
	
	if (cat == 8){
		queryImages.push("images/RedStar.png","images/BlueStar.png");
		
		var queryArea = document.getElementById("play_area");
		list.push({key: "RED",
			optionValue: ["images/RedBox.png","images/BlueBox.png"],
			correct: 0});
			
		list.push({key: "BLUE",
			optionValue: ["images/BlueBox.png","images/RedBox.png"],
			correct: 0});
	}
	
	if (cat == 9){
		
	}
	
	optionKeys = [];
	ran = Math.floor(Math.random() * list.length);
	for (var inc = 0;inc<list[ran].optionValue.length;inc++){
		optionKeys.push(list[ran].optionValue[inc]);
	}
	document.getElementById("header").innerHTML = "Match Color";
	
	for (var box=0;box<list[ran].optionValue.length;box++){
		var boxImg = document.createElement("img");
		boxImg.setAttribute("src",list[ran].optionValue[box]);
		boxImg.setAttribute("style","width:40%;height:80%");
		boxImg.setAttribute("id","queryCont"+box);
	
		playArea.appendChild(boxImg);
	}
	
	var queryImg = document.createElement("img");
	queryImg.setAttribute("src",queryImages[ran]);
	queryImg.setAttribute("id","queryImg");
	foot.appendChild(queryImg);
	
	queryImgEvents();
}

function queryImgEvents() {
  query = document.getElementById("queryImg");
  query.addEventListener("touchstart", queryStart, false);
  query.addEventListener("touchend", queryEnd, false);
  // query.addEventListener("touchcancel", queryCancel, false);
  query.addEventListener("touchmove", queryMove, false);
}

var ongoingTouches = [];
var startX = 0;
var startY = 0;
var distX = 0;
var distY = 0;

function queryStart(evt){
	 evt.preventDefault();
	 var touches = evt.changedTouches[0];
	 startX = parseInt(touches.clientX);
	 startY = parseInt(touches.clientY);
	 // for (var i = 0; i < touches.length; i++) {
		// ongoingTouches.push(copyTouch(touches[i]));
	 // }
}

function queryMove(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches[0];
  
  distX = parseInt(touches.clientX) - startX;
  distY = startY - parseInt(touches.clientY);
  document.getElementById("footer").setAttribute("style","bottom:"+distY+"px;left:"+distX+"px");
}

function queryEnd(evt){
	evt.preventDefault();
	var touches = evt.changedTouches[0];
	
	correctAnsId = list[ran].correct;
	var correctCont = $("#queryCont"+correctAnsId);
	if ((touches.clientX > correctCont.position().left && touches.clientX < correctCont.position().left+correctCont.width())
		&& (touches.clientY > correctCont.position().top && touches.clientY < correctCont.position().top+correctCont.height())){
			var statusDiv = document.createElement("div");
			statusDiv.setAttribute("style","visibility:visible;margin-top:-100px;");
			statusDiv.setAttribute("id","statusDiv");
			statusDiv.innerHTML = "Correct";
			playArea.appendChild(statusDiv);
			setTimeout(function(){
				var a = document.getElementById("statusDiv");
				a.parentNode.removeChild(a);
				activityMatch();
			}, 1000);
			
		}
	else{
		var statusDiv = document.createElement("div");
		statusDiv.setAttribute("style","visibility:visible;margin-top:-100px;");
		statusDiv.setAttribute("id","statusDiv");
		statusDiv.innerHTML = "Try Again";
		playArea.appendChild(statusDiv);
		setTimeout(function(){
			var a = document.getElementById("statusDiv");
			a.parentNode.removeChild(a);
			document.getElementById("footer").setAttribute("style","bottom:"+0+"px;left:"+0+"px");
		}, 500);
	}
}
