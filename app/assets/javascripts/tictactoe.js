WIN_COMBINATIONS = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

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
  turn = 0;
  $('td').empty;
}

function doTurn(clicked_square) {
  updateState(clicked_square);
  window.turn += 1;
  
  if (checkWinner()) {
    saveGame();
    resetBoard();
  } else if (turn === 9) {
    setMessage("Tie game.");
    resetBoard();
  } 
}

// function saveGame() {
// }

function attachListeners() {
  $('td').on('click', function() {
      doTurn(this);
  });
  $('#save').on('click', () => saveGame());
  $('#previous').on('click', () => showPreviousGames());
  $('#clear').on('click', () => resetBoard());
}
