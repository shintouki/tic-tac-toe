$(document).ready(function() {
  let playerSymbol = "O";
  let computerSymbol = "X";
  let whoIsGoing;
  let spacesOpen = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  $("#modal_X_button").click(function() {
    playerSymbol = "X";
    computerSymbol = "O";
    $("#modal").css("display", "none");
  });

  $("#modal_O_button").click(function() {
    playerSymbol = "O";
    computerSymbol = "X";
    $("#modal").css("display", "none");
  });

  $(".inner_box").click(function() {
    let winFound = false;
    whoIsGoing = "Player";
    // Get id of clicked selected box
    let boxId = $(this).attr('id');
    let boxIdWithHash = "#" + boxId;
    let boxNum = parseInt(boxId.substring(3));
    let indexOfBoxNum = spacesOpen.indexOf(boxNum);
    spacesOpen.splice(indexOfBoxNum, 1);
    if ($(boxIdWithHash).text() === "") {
      $(boxIdWithHash).text(playerSymbol);
      winFound = checkForWin();
      if (winFound) return;
      whoIsGoing = "Computer";
      computerTurn();
      checkForWin();
    }

  });

  // Check if there is a winner.
  function checkForWin() {
    if (spacesOpen.length === 0) {
      console.log("tie");
      clearBoard();
      $("#winner_report").text("Tie");
      setTimeout(function() {
        $("#winner_report").text("");
      }, 3000);
      return true;
    }
    let box1 = $("#box1").text();
    let box2 = $("#box2").text();
    let box3 = $("#box3").text();
    let box4 = $("#box4").text();
    let box5 = $("#box5").text();
    let box6 = $("#box6").text();
    let box7 = $("#box7").text();
    let box8 = $("#box8").text();
    let box9 = $("#box9").text();
    let winnerFound = false;

    if (box1 !== "" && box1 === box2 && box2 === box3) {
      winnerFound = true;
    } else if (box4 !== "" && box4 === box5 && box5 === box6) {
      winnerFound = true;
    } else if (box7 !== "" && box7 === box8 && box8 === box9) {
      winnerFound = true;
    } else if (box1 !== "" && box1 === box4 && box4 === box7) {
      winnerFound = true;
    } else if (box2 !== "" && box2 === box5 && box5 === box8) {
      winnerFound = true;
    } else if (box3 !== "" && box3 === box6 && box6 === box9) {
      winnerFound = true;
    } else if (box1 !== "" && box1 === box5 && box5 === box9) {
      winnerFound = true;
    } else if (box3 !== "" && box3 === box5 && box5 === box7) {
      winnerFound = true;
    }

    if (winnerFound) {
      console.log(whoIsGoing + " is the winner");
      clearBoard();
      $("#winner_report").text(whoIsGoing + " wins");
      setTimeout(function() {
        $("#winner_report").text("");
      }, 3000);
    }
    return winnerFound;
  }

  // Computer's turn.
  // Computer chooses an empty square randomly
  function computerTurn() {
    // console.log("adsf");
    console.log(spacesOpen);
    let randomIndex = Math.floor(Math.random() * spacesOpen.length);
    let randomIdNum = spacesOpen[randomIndex];
    let randomId = "#box" + randomIdNum;
    console.log(randomId);
    $(randomId).text(computerSymbol);
    // remove coputer's choice from spacesOpen array
    spacesOpen.splice(randomIndex, 1);
  }

  // Clear board.
  function clearBoard() {
    spacesOpen = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Turn off buttons so user can't click any more boxes after game is over
    $(".inner_box").prop('disabled', true);
    setTimeout(function() {
      $(".inner_box").text("");
      // Turn buttons back on after 2 seconds
      $(".inner_box").prop('disabled', false);
    }, 2000);
  }

});