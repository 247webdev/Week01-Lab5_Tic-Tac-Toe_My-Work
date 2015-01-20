var gameActive = false,  // true if game has been started
	whosTurn, // starts at 1 if alpha player starts and 2 if beta player starts
	gameBoardArray, // 
	gameBoardSytle = document.getElementsByClassName("gameCell");



var resetBoard = function() {
	console.log("reset");
	whosTurn=0;

	gameBoardArray = [  [,,],
						[,,],
						[,,] ];

	for (var i = 0; i < gameBoardSytle.length; i++) {
		$('.gameCell').removeClass("xPlayed");
		$('.gameCell').removeClass("oPlayed");
	}
};

var playHere = function(state) {
	if ( gameActive ) {
		console.log("hover");
	};
	
	/*
	if (state === 1) {
		event.target.addClass('playHere')
	} else {
		event.target.removeClass('playHere')
	};
*/
}

/*	for (var i = 0; i < 3; i++) {
		for (var ii = 0; i < 3; i++) {
			gameBoardArray[i][ii]=undefined;
		};
	};
	*/
/*
var initalizeGame = function() {
	resetBoard();
}; 
$( document ).ready(initalizeGame);  don' need since initalize happens on start game
*/
// hover state for game board prior to selecting a move
gameBoardSytle.addEventListener("hover", playHere(1));
gameBoardSytle.addEventListener("mouseleave", playHere(2));

//$(".gameCell").on("mouseenter", playHere(1), showPhotos).on("mouseleave", playHere(2) );

