//object to hold all game states
var gameObj = {gameActive:false, //gameActive is true if game has been started
			  playersName:"Human", //new player
				 numTurns:0, //numTurns starts at 0 for a new game and increments by 1 each turn. numTurns is used to determin whos turn by numTurns%2 === 0 therefore alpha otherwise beta's turn.
			    whosFirst:0, //whosFirst is 0 on game reset. Either player can go first making them alpha.
			   boardArray:[[,,],[,,],[,,]], //boardArray global 2D-array of the played moves.
			   boardStyle:undefined, //later defined on game start or reset to ensure DOM is ready, it is an array of board cells
			   nextPlayer:undefined};

//document.getElementById("resetBtn").addEventListener("click", readyNewGame ); //the game is being reset. opted for form refreshing the page
document.getElementById("computer").addEventListener("click", function() { setFirstPlayer("computer"); }); //the one getting clicked becomes alpha
document.getElementById("human").addEventListener("click", function() { setFirstPlayer("human"); }); //the one getting clicked becomes alpha

var readyNewGame = function() {
//	console.log("game reset");
//	gameObj.gameActive=false;
//	gameObj.playersName="Human";
//	gameObj.numTurns=0;
//	gameObj.whosFirst=0;
//	gameObj.boardArray=[[,,], [,,], [,,]];
	gameObj.boardStyle = document.getElementsByClassName("gameCell");

//	document.getElementsByClassName("showAfterName")[0].classList.add("hideMe");
//	document.getElementsByClassName("showAfterFirst")[0].classList.add("hideMe");

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

var addWinClass = function(winningCells) { //array of the winning cells. Ex. ["one-one", "one-two", "one-three"]
	for (var i=0, currentCell; i<3; i++) { //if the game board were a dynamic size then use i<winningCells.length
		currentCell=document.getElementByID(winningCells[i]); //set currentCell to the string of current array index
		currentCell.classList.add("thisWon");
	}
}; //end function addWinnerClass

var announceNextPlayer = function(currentPlayer) {
	if ( gameObj.numTurns < 9 ) {
		gameObj.nextPlayer = document.getElementById("nextPlayer");
		if ( currentPlayer === "human" ) {
			gameObj.nextPlayer.innerHTML = "computer";
		} else if (	currentPlayer === "computer") {
			gameObj.nextPlayer.innerHTML = gameObj.playersName;
		}
	} else {
		gameObj.nextPlayer = document.getElementById("nextMove");
		gameObj.nextPlayer.innerHTML = "Game Over!";
	}
};

var playHere = function(state) {  //this function handles "preview-move" and "play-move" via the passed in parameter.
	if ( event.target.classList.contains("movedHere") ) {
		return;
	}
	if ( gameObj.gameActive ) {
		if (state==="hover") {
			event.target.classList.add("playHere");
		} else if (state==="out") {
			event.target.classList.remove("playHere");
		} else if (state==="played") {
			event.target.classList.add("movedHere");
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
//			console.log(gameObj.numTurns);
//			console.log(event.target);
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
	var hideElements = document.getElementsByClassName("hideAfterFirst");
    for (var i = 0; i < hideElements.length; i++) {
    	hideElements[i].classList.add("hideMe");
    }
    var showElements = document.getElementsByClassName("showAfterFirst");
    for (var i = 0; i < showElements.length; i++) {
    	showElements[i].classList.remove("hideMe");
    }
    announceNextPlayer(setAlpha);
};

var capitalizeName = function(str) {
	var stringWords = str.split(" ");
	for (var i = 0; i < stringWords.length; i++) {
		var capitalizedLetter = stringWords[i].charAt(0).toUpperCase();
		stringWords[i] = capitalizedLetter + stringWords[i].substr(1);
	}
    return stringWords.join(" ");
}; //end capitalizeName function

var setPlayersName = function () {
	event.preventDefault(); //don't want page to reload
	var newNameElement = document.getElementById("getPlayersName");
	var newName = newNameElement.value.toString().trim();
	if ( newName === "" || newName === " " || newName === undefined) {
		window.location = "./index.html";
	}
	gameObj.playersName = capitalizeName(newName);
	newName = gameObj.playersName + ", shall we play a game?";
    var hideElements = document.getElementsByClassName("hideAfterName");
    for (var i = 0; i < hideElements.length; i++) {
    	hideElements[i].classList.add("hideMe");
    }
    var showElements = document.getElementsByClassName("showAfterName");
    for (var i = 0; i < showElements.length; i++) {
    	showElements[i].classList.remove("hideMe");
    }
    document.querySelector("h3.putName").innerHTML = newName;
    document.querySelector("#human>span").innerHTML = gameObj.playersName;
}; //end setPlayersName function

