import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [players, setPlayers] = useState({
    "X": "Player 1",
    "O": "Player 2",
  })
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null;
  let hasDraw = gameTurns.length === 9 && !winner;


  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  function deriveActivePlayer(gameTurns) {
    let activePlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      activePlayer = "O"
    }

    return activePlayer;
  }
  

  function handlePlayerChange(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      // Don't use the activePlayer var because it is set in the other state
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O"
      }

      let updatedTurns = [{
        square: {
          row: rowIndex,
          col: colIndex
        },
        player: currentPlayer
      }, ...prevTurns];

      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player
          initialName="Player 1"
          symbol="X"
          isActive={deriveActivePlayer(gameTurns) === "X"}
          onChangeName={handlePlayerNameChange} />
        <Player
          initialName="Player 2"
          symbol="O"
          isActive={deriveActivePlayer(gameTurns) === "O"}
          onChangeName={handlePlayerNameChange} />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
      <GameBoard onSelectSquare={handlePlayerChange} board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  </main>

}

export default App;
