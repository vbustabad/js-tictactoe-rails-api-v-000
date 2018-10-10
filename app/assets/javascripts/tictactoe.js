WIN_COMBINATIONS = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

var turn = 0;

var currentGame = 0;

var player = () => turn % 2 ? 'O' : 'X' 

function updateState(clicked_square) {
  var token = player();
  clicked_square.innerHTML = token;
}

function setMessage(string) {
  document.getElementById('message').innerHTML = string;
}

function checkWinner() {
  console.log("Check winner.");

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

function resetBoard() {
  $('td').empty();
  turn = 0;
<<<<<<< HEAD
=======
  $('td').empty();
>>>>>>> 8c981eaec84d1af64eed50b1d602ba26d1e76822
  currentGame = 0;
}

function doTurn(clicked_square) {
  updateState(clicked_square);
  turn += 1;
  
  if (checkWinner()) {
    saveGame();
    resetBoard();
  } else if (turn === 9) {
    setMessage("Tie game.");
    resetBoard();
  } 
}

function saveGame() {
  console.log("In saveGame");

  var state = [];

  $('td').text((index, square) => {
     state.push(square);
   });

  game_data = {state: state};

  if (currentGame) {
    $.ajax({
        type: 'PATCH',
        url: `/games/${currentGame}`,
        data: game_data
      });
  } else {
        $.post('/games', game_data, (game) => { currentGame = game.data.id; });
      }
}

function showPreviousGames() {
  console.log("In showPreviousGames");
  $.get('/games', savedGames)
    // .done(function(data)){
    //   data.forEach(createButton)
    //   var createButton = document.createElement("button");
    //   button.innerHTML 
    //   });
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
