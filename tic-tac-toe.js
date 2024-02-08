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

            if (switchPlayer == 1 && emptyTile == '') {
               player1Tiles.push(i);

               this.firstElementChild.textContent = 'X';

               switchPlayer = 2;

            } else if (switchPlayer == 2 && emptyTile == '') {
               player2Tiles.push(i);

               this.firstElementChild.textContent = 'O';

               switchPlayer = 1;
            }

            const winner = checkPlayerWinner();
            const gameBoardFilled = player1Tiles.length + player2Tiles.length;

            if (winner.player1Winner && !winner.player2Winner) {
               console.log('p1 winner');

            } else if (winner.player2Winner && !winner.player1Winner) {
               console.log('p2 winner');
               
            } else if (!winner.player1Winner && !winner.player2Winner && gameBoardFilled !== 9) {
               console.log('no winner yet 1');

            } else if (gameBoardFilled == 9 && !winner.player1Winner && !winner.player2Winner) {
               console.log('draw');
            }
         });
      }
   }
   playGame();
})();

const player = (function() {
   const createPlayer = (user, pawn) => {
      let gameWin = 0;
      let gameLoss = 0;
      let draw = 0;

      const getWins = () => gameWin;
      const wins = () => gameWin++;

      const getLoses = () => gameLoss;
      const loses = () => gameLoss++;

      const getTies = () => draw;
      const ties = () => draw++;

      return {user, pawn, getWins, wins, getLoses, loses, getTies, ties};
   }

   const player1 = createPlayer('Player 1', 'X');
   const player2 = createPlayer('Player 2', 'O');
   
   return {player1, player2};
})();