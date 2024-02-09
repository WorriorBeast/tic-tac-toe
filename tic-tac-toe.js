const gameBoard = (function() {
   const gameTile = document.querySelectorAll('.game-tile');

   const winningCombination = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
   let switchPlayer = 1;

   let player1Tiles = [];
   let player2Tiles = [];

   const checkPlayerWinner = () => {
      const player1Winner = winningCombination.some(combo => combo.every(index => player1Tiles.includes(index)));
      const player2Winner = winningCombination.some(combo => combo.every(index => player2Tiles.includes(index)));

      return {player1Winner, player2Winner};
   };

   const playGame = () => {
      for (let i = 0; i < gameTile.length; i++) {
         gameTile[i].addEventListener('click', function() {
            let emptyTile = this.firstElementChild.textContent;
            let pawn = this.firstElementChild;

            if (switchPlayer == 1 && emptyTile == '') {
               player1Tiles.push(i);

               this.firstElementChild.textContent = 'X';
               pawn.style.cssText = `color: ${player.player1.color}`;
               
               switchPlayer = 2;

            } else if (switchPlayer == 2 && emptyTile == '') {
               player2Tiles.push(i);

               this.firstElementChild.textContent = 'O';
               pawn.style.cssText = `color: ${player.player2.color}`;
               
               switchPlayer = 1;
            }

            const winner = checkPlayerWinner();
            const gameBoardFilled = player1Tiles.length + player2Tiles.length;

            if (winner.player1Winner && !winner.player2Winner) {
               updateScoreboard.updateScoreP1Winner();
               gameResult.showResult('Player 1 won!', `${player.player1.color}`);
               gameResult.closeResult();

            } else if (winner.player2Winner && !winner.player1Winner) {
               updateScoreboard.updateScoreP2Winner();
               gameResult.showResult('Player 2 won!', `${player.player2.color}`);
               gameResult.closeResult();
               
            } else if (!winner.player1Winner && !winner.player2Winner && gameBoardFilled !== 9) {
               console.log('no winner yet 1');

            } else if (gameBoardFilled == 9 && !winner.player1Winner && !winner.player2Winner) {
               updateScoreboard.updateTie();
               gameResult.showResult(`Draw!`, '#007fff');
               gameResult.closeResult();
            }
         });
      }
   }
   playGame();

   const resetGameBoard = () => {
      const pawn = document.querySelectorAll('.pawn');

      player1Tiles = [];
      player2Tiles = [];
      switchPlayer = 1;

      for (let i = 0; i < pawn.length; i++) {
         pawn[i].textContent = '';
      }
   };

   return {resetGameBoard};
})();

const player = (function() {
   const createPlayer = (user, pawn, color) => {
      let gameWin = 0;
      let gameLoss = 0;

      const getWins = () => gameWin;
      const wins = () => gameWin++;

      const getLoses = () => gameLoss;
      const loses = () => gameLoss++;

      return {user, pawn, color, getWins, wins, getLoses, loses};
   }

   const player1 = createPlayer('Player 1', 'X', '#818cf8');
   const player2 = createPlayer('Player 2', 'O', 'orange');
   
   return {player1, player2};
})();

const updateScoreboard = (function() {
   const player1 = player.player1;
   const player2 = player.player2;

   const updateScoreP1Winner = () => {
      const p1Win = document.querySelector('.p1-scoreboard .wins');
      const p2Loss = document.querySelector('.p2-scoreboard .loses');

      player1.wins();
      p1Win.textContent = `Wins: ${player1.getWins()}`;

      player2.loses();
      p2Loss.textContent = `Loses: ${player2.getLoses()}`;
   };

   const updateScoreP2Winner = () => {
      const p1Loss = document.querySelector('.p1-scoreboard .loses');
      const p2Win = document.querySelector('.p2-scoreboard .wins');

      player1.loses();
      p1Loss.textContent = `Loses: ${player1.getLoses()}`;

      player2.wins();
      p2Win.textContent = `Wins: ${player2.getWins()}`;
   };

   const updateTie = () => {
      const draw = document.querySelectorAll('.ties');
      let tieCount = 0;

      const incrementTie = () => tieCount++;
      incrementTie();

      const getTieCount = () => tieCount;

      for (let i = 0; i < draw.length; i++) {
         draw[i].textContent = `Ties: ${getTieCount()}`;
      }
   };

   return {updateScoreP1Winner, updateScoreP2Winner, updateTie};
})();

const gameResult = (function() {
   const dialog = document.querySelector('dialog');
   
   const showResult = (gameResult, textColor) => {
      dialog.textContent = gameResult;
      dialog.style.cssText = `color: ${textColor}`;
      dialog.showModal();
   };

   const closeResult = () => {
      if (dialog.open == true) {
         dialog.addEventListener('click', () => {
            gameBoard.resetGameBoard();
            dialog.close();
         })
      }
   };

   return {showResult, closeResult};
})();