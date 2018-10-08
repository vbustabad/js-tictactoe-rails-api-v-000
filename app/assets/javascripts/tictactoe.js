function player() {
  if (window.turn % 2 === 0) {
    return 'X';
  } else {
    return 'O';
  }
}

function updateState(clicked_square) {
  token = player();
  clicked_square.innerHTML = token;
}

function setMessage(string) {
  document.getElementById('message').innerHTML = string;
}

function checkWinner() {
  if squares[0] === squares[1] === squares[2] || squares[3] === squares[4] === squares[5] || squares[6] === squares[7] === squares[8] {
    return true;
  } else if { squares[0] === squares[4] === squares[8] || squares[2] === squares[4] === squares[6]
    return true;
  } else { squares[0] === squares[3] === squares[6] || squares[1] === squares[4] === squares[7] || squares[2] === squares[5] === squares[8]
    return true;
  }
}

function doTurn() {
  window.turn += 1;
  updateState(clicked_square);
  checkWinner();
}

function attachListeners() {
}
