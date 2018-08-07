var queryLetter;
	optionKeys = [];
	var list = [];

function colorRecognise(){
	var queryArea = document.getElementById("play_area");
	list.push({key: "RED",
		optionValue: ["Red","Blue","Green"]});
		
	list.push({key: "BLUE",
		optionValue: ["Red","Blue","Green"]});
	
	list.push({key: "GREEN",
		optionValue: ["Red","Blue","Green"]});
	
	optionKeys = [];
	ran = Math.floor(Math.random() * list.length);
	for (var inc = 0;inc<list[ran].optionValue.length;inc++){
		optionKeys.push(list[ran].optionValue[inc]);
	}
	document.getElementById("header").innerHTML = "<img src='images/identifyColorHeader.png' style='margin-top:-5%'>";
	queryLetter = list[ran].key;
	
	queryArea.setAttribute("style","margin-left:auto;margin-right:auto;width:50%;height:50%;background-color:"+queryLetter);
	
	var gameArea = document.getElementById("game_area");
	var ansDiv = document.createElement("div");
	ansDiv.setAttribute("id","ansDiv");
	// ansDiv.setAttribute("style","width:30%;height:100%;background-color:green;float:right");
	gameArea.appendChild(ansDiv);
	
	var ansPara = document.createElement("p");
	ansPara.setAttribute("id","ansPara");
	
	ansDiv.appendChild(ansPara);
	
	keyLength = optionKeys.length;
	
	for (var keys=0;keys<keyLength;keys++){
		var key = document.createElement("button");
		key.setAttribute("type","button");
		key.setAttribute("value",optionKeys[keys]);
		key.setAttribute("class","keys");
		key.setAttribute("onclick","registerKey(this)");
		key.innerHTML = optionKeys[keys];
		
		var keyBrd = document.getElementById("keyBoard");
		keyBrd.appendChild(key);
		
		keyBrd.setAttribute("style","text-align:center");		
	}
		
	// document.getElementById("footer").setAttribute("style","width:50%;margin-left:25%;margin-right:25%");
	// var pAgain = document.getElementById('play_again');
		// pAgain.setAttribute("style","visibility:hidden");

}

