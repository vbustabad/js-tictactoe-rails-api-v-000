const WIN_COMBINATIONS = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],
                    [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

var turn = 0;

var currentGame = 0;

$(document).ready(function() {
    attachListeners();
});

var player = () => turn % 2 ? 'O' : 'X'

function updateState(squares){
  var token = player();
  $(squares).text(token);
}

function setMessage(msg){
  $('#message').text(msg);
}

function checkWinner(){

  var board = {};
  
  var winner = false;

  var input = (index, square) => (
        board[index] = square
      );

  $('td').text(input);

    WIN_COMBINATIONS.some(
      function(array) {
     if (board[array[0]] !== "" &&
         board[array[0]] === board[array[1]] &&
         board[array[1]] === board[array[2]]) {
       setMessage(`Player ${board[array[0]]} Won!`);
       return winner = true;
     }
   });
    return winner;
}

function doTurn(clicked_square) {
  updateState(clicked_square);
  turn++;

  if (checkWinner()) {
    saveGame();
    resetBoard();
  } else if (turn === 9) {
    setMessage("Tie game.");
    saveGame();
    resetBoard();
  }
}


function resetBoard(){
  $('td').empty();
  turn = 0;
  currentGame = 0;
}

function saveGame(){

  var state = [];

  $('td').text((index, square) => {
     state.push(square);
   });

  game_data = {state: state};

  if(currentGame){
    $.ajax({
        type: 'PATCH',
        url: `/games/${currentGame}`,
        data: game_data
      });
  }else{
        $.post('/games', game_data, (game) => {
            currentGame = game.data.id;
        });
      }
}

function showPreviousGames() {
  $('#games').empty();
  $.get('/games', (savedGames) => {
    if (savedGames.data.length) {
      savedGames.data.forEach(function(game) {
        return previousGameButtons(game);
      })
    }
  });
}

 function previousGameButtons(game){
   $('#games').append(`<button id="gameid-${game.id}">${game.id}</button><br>`);
   $(`#gameid-${game.id}`).on('click', () => reloadGame(game.id));
 }

 function reloadGame(game_id){
   console.log("In reloadGame.");

   $.get(`/games/${game_id}`, (game) => {
     console.log(game.data);

    function boardValues(game) {
      var state = game.data.attributes.state;

      var board = document.querySelectorAll("td");

      for (let index = 0; index < board.length; index++) {
        board[index].innerHTML = state[index];
      }
      
      // board.forEach(function(square) => {
      //    square.innerHTML = state[index]
      //  });
      // };
    }
   
    // debugger;
  
    currentGame = game_id;

    if (!checkWinner() && turn === 9) {
      setMessage('Tie game.');
    }

   }; 

function attachListeners(){
 $('td').on('click', function() {
    if(!$.text(this) && !checkWinner()){
      doTurn(this);
    }
 });

    $('#save').on('click', () => saveGame());
   $('#previous').on('click', () => showPreviousGames());
   $('#clear').on('click', () => resetBoard());
}
