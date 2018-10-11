var proverbs = [
"A bad excuse is better than none",
"A friend in need is a friend indeed",
"A room without books is a body without soul",
"All roads lead to Rome",
"Bad news travels fast",
"Beauty is only skin deep",
"Boys will be boys",
"Half a loaf is better than none",
"Honesty is the best policy",
"Let sleeping dogs lie",
"curiosity killed the cat",
"My house is my castle",
"Nothing venture nothing gain",
"Rome was not built in a day",
"Time is a great healer",
"Too many cooks spoil the broth",
"Truth is stranger than fiction",
"Practice makes perfect",
"Only two things are infinite the universe and human stupidity"
];


var text = proverbs[Math.floor(Math.random() * proverbs.length)];
text = text.toUpperCase();

//////////audios////////////////////////////
var plus = new Audio("sounds/plus.wav");
var minus = new Audio("sounds/minus.wav");
var win = new Audio("sounds/win.wav");
var lose = new Audio("sounds/lose.wav");
///////////////////////////////////////////////

var mistakesCounter = 1; // bo liczy od obrazka

var dashText = "";
var textLength = text.length

for(i = 0; i < textLength; i++){
	if(text.charAt(i) == " ")
		dashText += " ";
	
	else
		dashText += "-";
}

function getText(){
	document.getElementById("gameboard").innerHTML = dashText;
}

///////////////START/////////////////////////
window.onload = startGame;
////////////////////////////////////////////

var alphabetArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"] ;


function startGame(){
	
	var alphabetText = "";
	
	for(i = 0; i <= 25; i++){
		var element = "let" + i; //let - letter
		alphabetText += '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + alphabetArray[i] + '</div>';	
		if((i + 1) % 7 == 0)
			alphabetText += '<div style="clear:both;"></div>';
	}
	
	document.getElementById("alphabet").innerHTML = alphabetText;
	
	getText();
}


String.prototype.setUpChar = function(index, newChar){
	if(index > this.length - 1){//this odnosi sie do obiektu stringa np if(index > text.length - 1) 
		return this.toString();
	}
	
	else{
		return this.substr(0, index) + newChar + this.substr(index + 1); // text.substr(from, howManyChars);
	}
}

function check(letterNumber){
	var checkedChar = false;
	for(i = 0; i < textLength; i++){
		if(text.charAt(i) == alphabetArray[letterNumber]){
			checkedChar = true;
			dashText = dashText.setUpChar(i, alphabetArray[letterNumber]);
		}
	}
	//if letter exist in text
	if(checkedChar == true){
		plus.play();
		var element = "let" + letterNumber;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		
		getText();// jeśli trafione to odświeża text, bo pojawia się nowa litera
	}
	//if mistake
	else{
		minus.play();
		var element = "let" + letterNumber;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick", ";");// zamienia akcje z onclicka na 'nic nie robienie'
		
		mistakesCounter++;
		
		var picture = '<img src="imgs/' + mistakesCounter + '.png"/>';
		document.getElementById("hangman").innerHTML = picture;
	}
	
	//if you window
	if(text == dashText){
		win.play();
		document.getElementById("alphabet").innerHTML = "You entered correct proverb. The proverb is : " + text + 
		'<br/><br/><span class="reset" onclick="location.reload()">PLAY AGAIN?</span>';//location.reload() - reload the site
		document.getElementById("gameboard").style.color = "#00C000";
	
	}
	if(mistakesCounter >= 10){
		lose.play();
		document.getElementById("alphabet").innerHTML = "You have lost this game. The proverb is : " + text + 
		'<br/><br/><span class="reset" onclick="location.reload()">PLAY AGAIN?</span>';//location.reload() - reload the site
		document.getElementById("gameboard").style.color = "#C00000";
	}

}

