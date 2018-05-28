function myFunction() {
    var search = window.location.search;
    var msg = search.substring(search.indexOf("=")+1);
    createJoyceWall();
    showMessage(msg);
	
}

// Creates the wall with the alphabets and bulbs
function createJoyceWall(){
	var txt = " "
	var wall = document.getElementById("wall");
	for (i = 0; i < 26; i++) {
		// Get the alphabet
		var char = String.fromCharCode(65 + i)

		// Create a bulb
		var bulb = document.createElement("span");
		bulb.setAttribute("class","dot");
		bulb.setAttribute("id","bulb_"+char);
		wall.appendChild(bulb);

		// Create the alphabet
		var alphabet = document.createElement("span");
		alphabet.innerHTML = char;
		alphabet.setAttribute("class", "alphabet");
		alphabet.setAttribute("id",char);
		wall.appendChild(alphabet);

		// Line break after H and Q
		if (char == "H" || char == "Q"){
			var linebreak = document.createElement("br");
			wall.appendChild(linebreak);
		}
	}
}

// Lights up the bulb object for 0.5s, lights back down
function lightUp(bulb){
	var originalColor = bulb.style.backgroundColor;
	bulb.style.backgroundColor = "white";
	
	var head = document.getElementsByTagName('head')[0];
	var glowScript = document.createElement("script");
	glowScript.setAttribute("type","text/javascript");
	glowScript.innerHTML = "$(document).ready(\nfunction(){\n$(\"#"+bulb.id+"\").glow({radius:\"10\",color:\""+"green"+"\"});\n});"
	head.appendChild(glowScript);
	
	setTimeout(function(){bulb.style.backgroundColor = originalColor;var head = document.getElementsByTagName('head')[0];
	var glowScript = document.createElement("script");
	glowScript.setAttribute("type","text/javascript");
	glowScript.innerHTML = "$(document).ready(\nfunction(){\n$(\"#"+bulb.id+"\").glow({radius:\"0\",color:\""+"green"+"\"});\n});"
	head.appendChild(glowScript);},500);
		
}

// Lights up the letters of message one by one
function showMessage(message){
	var i = 0;
	function show(){
		var char = message.charAt(i).toUpperCase();
		var bulb = document.getElementById("bulb_"+char);
		lightUp(bulb);
		if(++i < message.length){
			setTimeout(show,1000);
		}
	}
	setTimeout(show,1000);

}




