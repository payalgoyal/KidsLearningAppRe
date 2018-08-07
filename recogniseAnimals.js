var list = [];
var animalSrc = [];
var optionKeys;
var blankCount;
function recogniseAnimals(){
	document.getElementById("wrapper").setAttribute("style","background-image: url('images/animalsBg.png');background-size:cover");
	animalSrc.push("images/cat.jpg",
			"images/dog.jpg",
			"images/elephant.jpg")
	list.push({key: 2,
		optionValue: "ELEPHANT"});
		
	list.push({key: 1,
		optionValue: "DOG"});
	
	list.push({key: 0,
		optionValue: "CAT"});
	
	document.getElementById("header").innerHTML = "<img src='images/identifyAnimalHeader.png' style='margin-top:-5%'>";
	if (document.getElementById("play_area").children.length > 0){
		document.getElementById("play_area").removeChild(document.getElementById("play_area").children[0]);
	}
	
	ran = Math.floor(Math.random() * list.length);
	
	queryLetter = list[ran].key;
	
	var queryArea = document.getElementById("play_area");
	queryArea.setAttribute("style","width:110%");
	var img = document.createElement("img");
	img.setAttribute("src",animalSrc[queryLetter]);
	img.setAttribute("style","width:40%;height:100%");
	queryArea.appendChild(img);
	
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
		
	// document.getElementById("footer").setAttribute("style","width:50%;margin-left:25%;margin-right:25%");
	// var pAgain = document.getElementById('play_again');
		// pAgain.setAttribute("style","visibility:hidden");
}