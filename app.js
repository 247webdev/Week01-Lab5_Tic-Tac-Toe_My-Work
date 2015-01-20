//object to hold all game states
var gameObj = {gameActive:false, //gameActive is true if game has been started
			  playersName:"Human", //new player
				 numTurns:0, //numTurns starts at 0 for a new game and increments by 1 each turn. numTurns is used to determin whos turn by numTurns%2 === 0 therefore alpha otherwise beta's turn.
			    whosFirst:0, //whosFirst is 0 on game reset. Either player can go first making them alpha.
			   boardArray:[[,,],[,,],[,,]], //boardArray global 2D-array of the played moves.
			   boardStyle:undefined}; //later defined on game start or reset to ensure DOM is ready, it is an array of board cells

var readyNewGame = function() {
	gameObj.gameActive=false;
	gameObj.playersName="Human";
	gameObj.numTurns=0;
	gameObj.whosFirst=0;
	gameObj.boardArray=[[,,], [,,], [,,]];
	gameObj.boardStyle = document.getElementsByClassName("gameCell");

	for (var i=0; i<9; i++) { //gameObj.boardStyle.length is 9 in a 3x3 sized game
	//clear any previous CSS styles
		gameObj.boardStyle[i].innerHTML="";
		gameObj.boardStyle[i].classList.remove("thisWon");
		gameObj.boardStyle[i].style.backgroundColor = "white";
		gameObj.boardStyle[i].style.color = "black";

	//hover state for game board prior to selecting a move
		gameObj.boardStyle[i].addEventListener("mouseover", function() { playHere("hover"); });
		gameObj.boardStyle[i].addEventListener("mouseout", function() { playHere("out"); });
		gameObj.boardStyle[i].addEventListener("click", function() { playHere("played"); });
	}

}; //end function readyNewGame

var addPlayerName = function(event) {
	console.log("adding players name");
	gameObj.playersName = event.target.value;
}; //end function add player's name

document.getElementById("resetBtn").addEventListener("click", readyNewGame ); //the game is being reset

document.getElementById("computer").addEventListener("click", function() { setFirstPlayer("computer"); }); //the one getting clicked becomes alpha
document.getElementById("human").addEventListener("click", function() { setFirstPlayer("human"); }); //the one getting clicked becomes alpha

var addWinClass = function(winningCells) { //array of the winning cells. Ex. ["one-one", "one-two", "one-three"]
	for (var i=0, currentCell; i<3; i++) { //if the game board were a dynamic size then use i<winningCells.length
		currentCell=document.getElementByID(winningCells[i]); //set currentCell to the string of current array index
		currentCell.classList.add("thisWon");
	}
}; //end function addWinnerClass

var playHere = function(state) {  //this function handles "preview-move" and "play-move" via the passed in parameter.
	if ( gameObj.gameActive || !event.target.classList.contains("playHere") ) {
		if (state==="hover") {
			event.target.classList.add("playHere");
		} else if (state==="out") {
			event.target.classList.remove("playHere");
		} else if (state==="played") {
			if(gameObj.numTurns%2===0) {
				//beta's turn
				event.target.innerHTML = "X";
				event.target.style.backgroundColor = "red";
			} else {
				//alpha's turn
				event.target.innerHTML = "O";
				event.target.style.backgroundColor = "blue";
				event.target.style.color = "white";
			}//end if of which player
			gameObj.numTurns++;
			console.log(gameObj.numTurns);
//			document.getElementById("one-one").removeEventListener("mouseover", function() { playHere("hover"); });
//			event.target.removeEventListener("mouseover", function() { playHere("hover"); });
//			event.target.removeEventListener("mouseout", function() { playHere("out"); });
//			event.target.removeEventListener("click", function() { playHere("played"); });
			console.log(event.target);
		}//end if of state
	} //end if gameActive
}; //end of playHere function

/*	for (var i = 0; i < 3; i++) {
		for (var ii = 0; i < 3; i++) {
			boardArray[i][ii]=undefined;
		};
	};
*/

var setFirstPlayer = function (setAlpha) {
	readyNewGame();
	if ( setAlpha === "human" ) {
		gameObj.whosFirst = "human"; //set human as first player (alpha)
	} else if (	setAlpha === "computer") {
		gameObj.whosFirst = "computer"; //set computer as first player (alpha)
	}
	gameObj.gameActive=true;
	gameObj.numTurns=0;
//	gameObj.boardStyle[i].classList.remove("oPlayed");
};

var setPlayersName = function () {
	event.preventDefault();
	var newName = document.getElementById("getPlayersName").value;
	newName = newName.charAt(0).toUpperCase() + newName.slice(1);
	var newName = "Hello, " + newName + ". Shall we play a game?";
    document.querySelector("h3.getName").innerHTML = newName;
    document.getElementsByClassName("hideAfterName")[0].classList.add("hideMe");

};

/*

	for(var i=0, selectedElems=document.querySelectorAll("li"); i<selectedElems.length; i++){  //when reset button is clicked: remove class `selected` from each `<li>`
		selectedElems[i].classList.remove("selected");
	}


	for(var i=0, boardStyle=document.getElementsByClassName("gameCell"); i<liElems.length; i++){
		liElems[i].style.backgroundColor="yellow";  //set each <li> to backgroundColor `yellow`
	}
*/

//event.target.classList.add("selected");
//event.target.classList.remove("selected");
//.playHere