var leftIndex = null;
var rightIndex = null;
var list = [];
var rightValues = [];
var end = 0;

function matchTheColumn(){
	
	rightValues.push("Apple","Ball","Cat","Doll","Elephant");
	list.push({leftColumn: ["A","B","C","D","E"],
		rightColumn: [3,2,5,1,4],
		rightAns:[4,2,1,5,3],
		traversed:[false,false,false,false,false]});
	fillValues();
	list[0].rightAns[leftIndex]
}

function fillValues(){
	for (var i=0;i<list[0].leftColumn.length;i++){
		var lCol = document.getElementById("questionAlpha");
	
		var qPara = document.createElement("p");
		qPara.setAttribute("style","font-size:50; width:50px;height:60");
		qPara.innerHTML = list[0].leftColumn[i];
		
		lCol.appendChild(qPara);
	}
	for (var i=0;i<list[0].rightColumn.length;i++){
		var rCol = document.getElementById("answerImage");
	
		var aPara = document.createElement("p");
		aPara.setAttribute("style","font-size:50; width:250px;height:60");
		aPara.innerHTML = rightValues[list[0].rightColumn[i]-1];
		
		rCol.appendChild(aPara);
	}
}
function startup() {
  var el = document.getElementsByTagName("canvas")[0];
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
  for (var i = 0; i < touches.length; i++) {
    // log("touchstart:" + i + "...");
    ongoingTouches.push(copyTouch(touches[i]));
	var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
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
	  
		var query = document.getElementById("questionAlpha").children[leftIndex];
	  if (ongoingTouches[idx].pageX > 40 && ongoingTouches[idx].pageX < 301){
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
	  if (leftIndex == null){
		   // var yDiv = touches[i].pageY /60;
		  // var yMod = touches[i].pageY %60;
		  // if((yDiv == 0 && yMod >= 0 && yMod <= 60 ) || (yDiv == 1 && yMod == 0)){
			  // leftIndex = 0;
		  // }
		  // if((yDiv == 1 && yMod >= 0 && yMod <= 60 ) || (yDiv == 2 && yMod == 0)){
			  // leftIndex = 1;
		  // }
		  // if((yDiv == 2 && yMod >= 0 && yMod <= 60 ) || (yDiv == 3 && yMod == 0)){
			  // leftIndex = 2;
		  // }
		  // if((yDiv == 3 && yMod >= 0 && yMod <= 60 ) || (yDiv == 4 && yMod == 0)){
			  // leftIndex = 3;
		  // }
		  // if((yDiv == 4 && yMod >= 0 && yMod <= 60 ) || (yDiv == 5 && yMod == 0)){
			  // leftIndex = 4;
		  // }
		  // log("leftIndex "+ leftIndex);
		  
		  if (ongoingTouches[idx].pageX > 20){
			  if (end == 0){
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
			  }
		  }
	  }
	  if (rightIndex == null){
		  if ((ongoingTouches[idx].pageX > 200)){
			  if (end == 0){
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
			 }
		 }
	  }
     
    } else {
      log("can't figure out which touch to continue");
    }
  }
  if ((rightIndex+1) == list[0].rightAns[leftIndex]){
	  log("Correct Match for "+list[0].leftColumn[leftIndex]);
	  list[0].traversed[leftIndex] = true;
	  log(list[0].leftColumn[leftIndex] + list[0].traversed[leftIndex]);
	  imageData = context.getImageData(0,0,canvas.width,canvas.height);
	  // leftIndex = null;
	  // rightIndex = null;
  }
  else{
	  imageData = context.putImageData(0,0,canvas.width,canvas.height);
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
  leftIndex = null;
  rightIndex = null;
  end = 1;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
      ongoingTouches.splice(idx, 1);  // remove it; we're done
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