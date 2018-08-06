var leftIndex = null;
var rightIndex = null;
var list = [];
var rightValues = [];
var leftValues = [];
var end = 0;
var el;
var correct = 0;
var img = [];
var leftImg = [];

function matchTheColumn(cat){
	if (cat == 1){
		img.push({src: ["images/apple.jpg","images/ball.jpg","images/cat.jpg","images/dog.jpg","images/elephant.jpg"]})
		rightValues.push("Apple","Ball","Cat","Doll","Elephant");
		list.push({leftColumn: ["A","B","C","D","E"],
			rightColumn: [3,2,5,1,4],
			rightAns:[4,2,1,5,3],
			traversed:[false,false,false,false,false]});
	}
	if (cat == 7){
		leftImg.push({src: ["images/nose.jpg","images/ear.jpg","images/eyes.jpg","images/hands.jpg","images/tongue.jpg"]});
		leftValues.push("nose","ear","eyes","hands","tongue");
		img.push({src: ["images/gloves.jpg","images/mango.jpg","images/bell.png","images/rose.jpg","images/goggles.jpg"]});
		rightValues.push("gloves","mango","bell","rose","goggles");
		list.push({leftColumn: [1,2,3,4,5],
			rightColumn: [1,2,3,4,5],
			rightAns:[4,3,5,1,2],
			traversed:[false,false,false,false,false]});
	}
	fillValues(cat);
	list[0].rightAns[leftIndex]
}

function fillValues(cat){
	if (cat == 1){
		for (var i=0;i<list[0].leftColumn.length;i++){
			var lCol = document.getElementById("questionAlpha");
		
			var qPara = document.createElement("p");
			qPara.setAttribute("style","font-size:50; width:50px;height:60");
			qPara.innerHTML = list[0].leftColumn[i];
			
			lCol.appendChild(qPara);
		}
	}
	if (cat == 7){
		for (var i=0;i<list[0].leftColumn.length;i++){
			var lCol = document.getElementById("questionAlpha");
		
			var qPara = document.createElement("img");
			qPara.setAttribute("style","width:100px;height:60");
			qPara.setAttribute("src",leftImg[0].src[list[0].leftColumn[i]-1]);
			qPara.innerHTML = leftValues[list[0].leftColumn[i]-1];
			
	
				// ans.setAttribute("style","color:green;font-size:50; width:250px;height:60");
			lCol.appendChild(qPara);
		}
	}
	
	for (var i=0;i<list[0].rightColumn.length;i++){
		var rCol = document.getElementById("answerImage");
	
		var aPara = document.createElement("img");
		aPara.setAttribute("style","width:100px;height:60");
		aPara.setAttribute("src",img[0].src[list[0].rightColumn[i]-1]);
		aPara.innerHTML = rightValues[list[0].rightColumn[i]-1];
		
		rCol.appendChild(aPara);
	}
	startup();
}
function startup() {
  el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchmove", handleMove, false);
  log("initialized.");
}

var imageData;
var ongoingTouches = [];

function handleStart(evt) {
  evt.preventDefault();
  // log("touchstart.");
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;
  imageData = ctx.getImageData(0,0,el.width,el.height);
  end = 0;
  leftIndex = null;
  rightIndex = null;
   for (var i = 0; i < touches.length; i++) {
    log("touchstart:" + i + "...");
    ongoingTouches.push(copyTouch(touches[i]));
    // var color = colorForTouch(touches[i]);
    // ctx.beginPath();
    // ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
    // ctx.fillStyle = color;
    // ctx.fill();
    // log("touchstart:" + i + ".");
  }
}

function handleMove(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      // log("continuing touch "+idx);
	  if (leftIndex == null){
		  if (ongoingTouches[idx].pageX > -1 && ongoingTouches[idx].pageX < 80){
			  // if (end == 0){
				  if(touches[i].pageY >= 0 && touches[i].pageY <= 60){
					  leftIndex = 0;
				  }
				  if(touches[i].pageY > 60 && touches[i].pageY <= 120){
					  leftIndex = 1;
				  }
				  if(touches[i].pageY > 120 && touches[i].pageY <= 180){
					  leftIndex = 2;
				  }
				  if(touches[i].pageY > 180 && touches[i].pageY <= 240){
					  leftIndex = 3;
				  }
				  if(touches[i].pageY > 240 && touches[i].pageY <= 300){
					  leftIndex = 4;
				  }
				  log("leftIndex "+ leftIndex);
			  // }
		  }
	  }
	  if (rightIndex == null && leftIndex != null){
		  if ((ongoingTouches[idx].pageX > 250)){
			  // if (end == 0){
				  var yDiv = touches[i].pageY /60;
				  var yMod = touches[i].pageY %60;
				  if(touches[i].pageY >= 0 && touches[i].pageY <= 60){
					  rightIndex = 0;
				  }
				  if(touches[i].pageY > 60 && touches[i].pageY <= 120){
					  rightIndex = 1;
				  }
				  if(touches[i].pageY > 120 && touches[i].pageY <= 180){
					  rightIndex = 2;
				  }
				  if(touches[i].pageY > 180 && touches[i].pageY <= 240){
					  rightIndex = 3;
				  }
				  if(touches[i].pageY > 240 && touches[i].pageY <= 300){
					  rightIndex = 4;
				  }
				  log("rightIndex "+ rightIndex);
			 // }
		 }
	  }
	  if (leftIndex != null && list[0].traversed[leftIndex] == false){
		  if (ongoingTouches[idx].pageX > -1 && ongoingTouches[idx].pageX < 300){
			  ctx.beginPath();
			   // log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
			  ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
			  // log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
			  ctx.lineTo(touches[i].pageX, touches[i].pageY);
			  ctx.lineWidth = 4;
			  ctx.strokeStyle = color;
			  ctx.stroke();

			  ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
			  // log(".");
		  }
	  }
     
    } else {
      log("can't figure out which touch to continue");
    }
  }
  if (rightIndex != null && ((rightIndex+1) == list[0].rightAns[leftIndex])){
	  log("Correct Match for "+list[0].leftColumn[leftIndex]);
	  list[0].traversed[leftIndex] = true;
	  log(list[0].leftColumn[leftIndex] + list[0].traversed[leftIndex]);
	  correct = 1;
	  // imageData = context.getImageData(0,0,el.width,el.height);
	  // leftIndex = null;
	  // rightIndex = null;
  }
  else{
	  correct = 0;
	  // imageData = context.putImageData(0,0,el.width,el.height);
	  // leftIndex = null;
	  // rightIndex = null;
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  log("touchend");
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;
   
   if (leftIndex != null){
	    var query = document.getElementById("questionAlpha").children[leftIndex];
		 // var ans = document.getElementById("answerImage").children[rightIndex];
		if(correct == 1){
			query.setAttribute("style","background-color:green;font-size:50; width:50px;height:60");
			// ans.setAttribute("style","color:green;font-size:50; width:250px;height:60");
		}
		else{
			query.setAttribute("style","background-color:red;font-size:50; width:50px;height:60");
			// ans.setAttribute("style","color:red;font-size:50; width:250px;height:60");
		}
		list[0].traversed[leftIndex] = true;
   }
   
   correct = 0;
  leftIndex = null;
  rightIndex = null;
  end = 1;
  list[0].traversed[leftIndex] = true;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
		// if ((ongoingTouches[idx].pageX > 250) && (ongoingTouches[idx].pageX < 260)){
			  // ctx.lineWidth = 4;
			  // ctx.fillStyle = color;
			  // ctx.beginPath();
			  // ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
			  // ctx.lineTo(touches[i].pageX, touches[i].pageY);
			  // ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
			  ongoingTouches.splice(idx, 1);  // remove it; we're done
		// }
    } else {
      log("can't figure out which touch to end");
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  log("touchcancel.");
  var touches = evt.changedTouches;
  
  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1);  // remove it; we're done
  }
}

function colorForTouch(touch) {
  var r = touch.identifier % 16;
  var g = Math.floor(touch.identifier / 3) % 16;
  var b = Math.floor(touch.identifier / 7) % 16;
  r = r.toString(16); // make it a hex digit
  g = g.toString(16); // make it a hex digit
  b = b.toString(16); // make it a hex digit
  var color = "#" + r + g + b;
  log("color for touch with identifier " + touch.identifier + " = " + color);
  return color;
}

function copyTouch(touch) {
  return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;
    
    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}

function log(msg) {
  var p = document.getElementById('log');
  p.innerHTML = msg + "\n" + p.innerHTML;
}

function onTouch(evt) {
  evt.preventDefault();
  if (evt.touches.length > 1 || (evt.type == "touchend" && evt.touches.length > 0))
    return;

  var newEvt = document.createEvent("MouseEvents");
  var type = null;
  var touch = null;

  switch (evt.type) {
    case "touchstart": 
      type = "mousedown";
      touch = evt.changedTouches[0];
      break;
    case "touchmove":
      type = "mousemove";
      touch = evt.changedTouches[0];
      break;
    case "touchend":        
      type = "mouseup";
      touch = evt.changedTouches[0];
      break;
  }

  newEvt.initMouseEvent(type, true, true, evt.originalTarget.ownerDocument.defaultView, 0,
    touch.screenX, touch.screenY, touch.clientX, touch.clientY,
    evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);
  evt.originalTarget.dispatchEvent(newEvt);
}