
var TURN = false;       // decides whose turn is now, 0- player1, 1 - player2
var marks = ["X","0"];  // marks for the players
var tiles;              //array containing all the buttons
var player;             // holds the current player number ( 0 or 1 )
var tilesUsed = 0;      // number of tiles marked so far in the game
var win;                //result after the each move like draw or win or continue
function generateTiles(){
    //initialze game
    console.log("game restarted");
    tilesUsed = 0;
    TURN = false;  
    tiles = document.getElementsByClassName("tile");
    
    for(var index = 0; index < tiles.length; index++){
        //create buttons 
        var button = document.createElement("button");
        button.setAttribute("class","tileButton");
        button.setAttribute("type","button");
        button.addEventListener("click",mark);
        //add the button to each tile div
        tiles[index].appendChild(button);
    }
}
// function to be called after the click event is fired on any tile button
function mark(event){
    
   // decide the current player
    player = TURN ? 1 : 0;
    //increment the number of tiles used
    tilesUsed++;
    event.target.textContent = marks[player];
    //once marked, the tile cannot be changed, so disable the clikc event on that tile
    removeHandler(event.target);
    // check the result of the current move
    checkEndGame();
    //check if the cyrrent player wins
    if(win == 0 || win == 1){
        alert("Player " + (win +1 ) + "wins");
        // reset the game 
        restartTheGame();
    }
    //all the tiles are ued and nobody wins
    else if( win == 2){
        alert("Game draw!");
        //reset the game
        restartTheGame();
    }
    // otherwise game continues
    //change the player
    TURN = !TURN;
}
function restartTheGame() {
    //reset and start
    deleteAllTiles();
    generateTiles();
}
function removeHandler(target){
    target.removeEventListener("click",mark);
}
function deleteAllTiles(){
    
    for(var i = 0; i < tiles.length; i++){
        tiles[i].removeChild(tiles[i].firstChild);
    }
}
function checkEndGame(){
    
    //if all the marks in a row or a column or a diagonal aresame, the player wins
       
    //check the rows
    if((tiles[0].textContent == marks[player] && tiles[1].textContent == marks[player] &&            tiles[2].textContent == marks[player]) ||
       (tiles[3].textContent == marks[player] && tiles[4].textContent == marks[player] && tiles[5].textContent == marks[player]) ||
       (tiles[6].textContent == marks[player] && tiles[7].textContent == marks[player] && tiles[8].textContent == marks[player]) ||
       //check the columns
       (tiles[0].textContent == marks[player] && tiles[3].textContent == marks[player] && tiles[6].textContent == marks[player]) ||
       (tiles[1].textContent == marks[player] && tiles[4].textContent == marks[player] && tiles[7].textContent == marks[player]) ||
       (tiles[2].textContent == marks[player] && tiles[5].textContent == marks[player] && tiles[8].textContent == marks[player]) ||
       //check the diagonals
        (tiles[0].textContent == marks[player] && tiles[4].textContent == marks[player] && tiles[8].textContent == marks[player]) ||
       (tiles[2].textContent == marks[player] && tiles[4].textContent == marks[player] && tiles[6].textContent == marks[player]))
        win = player;
    else if(tilesUsed == 9)
        win = 2;   // noby wins
    else
        win = 3;   // game is not ended, so continue
       
}

$(document).ready(function() {
   //start the new game
    generateTiles();
});