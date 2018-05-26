function myFunction() {
    var x = document.getElementById("message");
    var msg = x.elements[0].value + "<br>";
	
}

function createJoyceWall(){
	var txt = " "
	for (i = 0; i < 26; i++) {
		txt = txt + String.fromCharCode(65 + i) + " ";
		if (i == 7 || i == 16){
			txt = txt + "<br><br>"
		}
}
	document.getElementById("joyce-wall").innerHTML = txt;

}
