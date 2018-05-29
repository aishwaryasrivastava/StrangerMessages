function myFunction() {
    var search = window.location.search;
    var msg = search.substring(search.indexOf("=")+1);
    msg = msg.replaceAll("+","");
    createJoyceWall();
    showMessage(msg);
	
}

function isValid(str){
 return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?1234567890]/g.test(str);
}

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

// Creates the wall with the alphabets and bulbs
function createJoyceWall(){
	var colors = ["#f7f0c3","#1a07f7","#f707eb","#f78b07"];
	var txt = " "
	var wall = document.getElementById("wall");
	for (i = 0; i < 26; i++) {
		color = i%colors.length;
		// Get the alphabet
		var char = String.fromCharCode(65 + i)

		

		


		// Create the alphabet
		var alphabet = document.createElement("span");
		alphabet.innerHTML = char;
		alphabet.setAttribute("class", "alphabet");
		alphabet.setAttribute("id",char);
		wall.appendChild(alphabet);

		var rect = alphabet.getBoundingClientRect();
		console.log(rect.top, rect.left);

		// Create a bulb
		var bulb = document.createElement("span");
		bulb.setAttribute("class","dot");
		bulb.setAttribute("id","bulb_"+char);
		bulb.style.backgroundColor = colors[color];
		bulb.style.position = "relative";
		bulb.style.left = String(-2*rect.width/3) + "px";
		bulb.style.top = String((-2*rect.height/3)) + "px";
		wall.appendChild(bulb);
		

		

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
	//var originalFilter = bulb.style.filter;
	bulb.style.backgroundColor = "white";
	var head = document.getElementsByTagName('head')[0];
	var glowScript = document.createElement("script");
	glowScript.setAttribute("type","text/javascript");
	glowScript.innerHTML = "$(document).ready(\nfunction(){\n$(\"#"+bulb.id+"\").glow({radius:\"30\",color:\""+originalColor+"\"});\n});"
	head.appendChild(glowScript);
	
	setTimeout(
		function(){
			bulb.style.backgroundColor = originalColor;
			//bulb.style.filter = "brightness(40%)"; 
			var head = document.getElementsByTagName('head')[0];
			var glowScript = document.createElement("script");
			glowScript.setAttribute("type","text/javascript");
			glowScript.innerHTML = "$(document).ready(\nfunction(){\n$(\"#"+bulb.id+"\").glow({radius:\"0\",color:\""+originalColor+"\"});\n});"
			head.appendChild(glowScript);
		},500);
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




