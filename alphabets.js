var queryLetter;
	optionKeys = [];
	var list = [];

function alphabetsIdentify(){
	list.push({key: "A",
		optionValue: ["B","A","E","C","D"]});
		
	list.push({key: "B",
		optionValue: ["B","A","E","C","D"]});
	
	list.push({key: "C",
		optionValue: ["B","A","E","C","D"]});
	
	list.push({key: "D",
		optionValue: ["B","A","E","C","D"]});
		
	list.push({key: "E",
		optionValue: ["B","A","E","C","D"]});
	
	ran = Math.floor(Math.random() * list.length);
	for (var inc = 0;inc<list[ran].optionValue.length;inc++){
		optionKeys.push(list[ran].optionValue[inc]);
	}
	document.getElementById("header").innerHTML = "Identify Alphabets";
	queryLetter = list[ran].key;
	
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
	var querySpan = document.createElement("span");
	querySpan.setAttribute("class","query");
	querySpan.setAttribute("id","query");
	querySpan.setAttribute("style","font-size:2.5em");
	querySpan.innerHTML = queryLetter;
					
	var queryAreaElem = document.getElementById("queryArea");
	queryAreaElem.appendChild(querySpan);
	
	document.getElementById("footer").setAttribute("style","width:50%;margin-left:25%;margin-right:25%");
	var pAgain = document.getElementById('play_again');
		pAgain.setAttribute("style","visibility:hidden")

}



