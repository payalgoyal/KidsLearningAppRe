var list = [];
var optionKeys;
var blankCount;
function guessIt(){
	list.push({key: "Used to hear",
		optionValue: "EARS"});
		
	list.push({key: "Used to see",
		optionValue: "EYES"});
	
	list.push({key: "Used to speak",
		optionValue: "MOUTH"});
	
	document.getElementById("header").innerHTML = "Guess It";
	
	ran = Math.floor(Math.random() * list.length);
	
	queryLetter = list[ran].key;
	
	var querySpan = document.createElement("span");
	querySpan.setAttribute("style","font-size:2em;");
	querySpan.innerHTML = queryLetter;
	
	var queryArea = document.getElementById("play_area");
	document.getElementById("play_area").innerHTML = '';
	queryArea.appendChild(querySpan);
	
	optionKeys = list[ran].optionValue;
	
	var gameArea = document.getElementById("game_area");
	
	ansLength = optionKeys.length;
	blankCount = ansLength;
	
	var blankSpanAnswered = document.getElementsByClassName("blank");
	while(blankSpanAnswered[0]){
		blankSpanAnswered[0].parentNode.removeChild(blankSpanAnswered[0]);
	}
	
	for (var i =0;i<ansLength;i++){
		var ansSpan = document.createElement("span");
				ansSpan.setAttribute("class","blank");
				ansSpan.setAttribute("id","blank"+i);
				ansSpan.setAttribute("style","font-size:2em");
				ansSpan.innerHTML = "_ ";
				
				var queryAreaElem = document.getElementById("game_area");
				queryAreaElem.appendChild(ansSpan);
	}
	
	var ansDiv = document.createElement("div");
	ansDiv.setAttribute("id","ansDiv");
	// ansDiv.setAttribute("style","width:30%;height:100%;background-color:green;float:right");
	gameArea.appendChild(ansDiv);
	
	var ansPara = document.createElement("p");
	ansPara.setAttribute("id","ansPara");
	
	ansDiv.appendChild(ansPara);
	
	for (keys = 65; keys <= 90; keys++){
			var key = document.createElement("button");
			key.setAttribute("type","button");
			key.setAttribute("value","&#"+keys);
			key.setAttribute("class","keys");
			key.setAttribute("onclick","registerEnteredKey(this)");
			key.innerHTML = String.fromCharCode(keys);
			
			var keyBrd = document.getElementById("keyBoard");
			keyBoard.appendChild(key);
		}
		// for (keys = 48; keys <= 57; keys++){
			// var key = document.createElement("button");
			// key.setAttribute("type","button");
			// key.setAttribute("value","&#"+keys);
			// key.setAttribute("class","keys");
			// key.setAttribute("onclick","registerEnteredKey(this)");
			// key.innerHTML = String.fromCharCode(keys);
			
			// var keyBrd = document.getElementById("keyBoard");
			// keyBrd.appendChild(key);
		// }
		
	// document.getElementById("footer").setAttribute("style","width:50%;margin-left:25%;margin-right:25%");
	// var pAgain = document.getElementById('play_again');
		// pAgain.setAttribute("style","visibility:hidden");
}
