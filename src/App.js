import { useState } from 'react'; 

function Square({value, onSquareClick}) { 
  return ( 
    <button 
      className="bg-white border-2 border-gray-400 text-5xl font-bold h-20 w-20 m-0 p-0 text-center cursor-pointer transition-all duration-200 rounded-lg hover:bg-gray-100 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300" 
      onClick={onSquareClick}
    > 
      {value} 
    </button> 
  ); 
} 

function Board({ xIsNext, squares, onPlay }) { 
  function handleClick(i) { 
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); 
    if (xIsNext) { 
      nextSquares[i] = 'X'; 
    } else { 
      nextSquares[i] = 'O'; 
    } 
    onPlay(nextSquares); 
  } 

  const winner = calculateWinner(squares); 
  let status; 
  if (winner) { 
    status = 'Winner: ' + winner; 
  } else { 
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); 
  } 

  return ( 
    <> 
      <div className="text-3xl font-bold mb-5 text-center text-gray-800 py-3 px-5 bg-gray-50 rounded-lg border-2 border-gray-200">
        {status}
      </div> 
      <div className="flex justify-center"> 
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> 
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} /> 
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} /> 
      </div> 
      <div className="flex justify-center"> 
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} /> 
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} /> 
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} /> 
      </div> 
      <div className="flex justify-center"> 
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} /> 
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} /> 
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} /> 
      </div> 
    </> 
  ); 
} 

export default function Game() { 
  const [history, setHistory] = useState([Array(9).fill(null)]); 
  const [currentMove, setCurrentMove] = useState(0); 
  const currentSquares = history[currentMove]; 
  const xIsNext = currentMove % 2 === 0; 

  function handlePlay(nextSquares) { 
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; 
    setHistory(nextHistory); 
    setCurrentMove(nextHistory.length - 1); 
  } 

  function jumpTo(nextMove) { 
    setCurrentMove(nextMove); 
  } 

  const moves = history.map((squares, move) => {
    let description; 
    if (move > 0) { 
      description = 'Go to move #' + move; 
    } else { 
      description = 'Go to game start'; 
    } 
    return ( 
      <li key={move} className="mb-2.5"> 
        <button 
          className="bg-indigo-600 text-white border-none py-3 px-6 text-base rounded-lg cursor-pointer w-full text-left transition-all duration-200 hover:bg-indigo-700 hover:translate-x-1"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button> 
      </li> 
    ); 
  }); 

  return ( 
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="flex flex-col items-center bg-blue-500 rounded-3xl shadow-2xl p-10 max-w-4xl w-full">
        <div className="mb-8"> 
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> 
        </div> 
        <div className="w-full max-w-md"> 
          <ol className="pl-8 max-h-72 overflow-y-auto">{moves}</ol> 
        </div> 
      </div>
    </div>
  ); 
} 

function calculateWinner(squares) { 
  const lines = [ 
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ]; 
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; 
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null; 
}
