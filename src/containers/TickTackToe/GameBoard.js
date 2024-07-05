import React from "react";
import Square from "./Square";

const GameBoard = ({ xIsNext, squares, onPlay, setWinner, calculateWinner }) => {

    const handleClick = (i) => {
        const winner = calculateWinner(squares);
        if (winner || squares[i]) {
            let status;
            if (winner === "X") status = 'First Player';
            else status = 'Second Player';
            setWinner(status)
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

    return (
        <div className="m-5">
            <div className="flex justify-center text-center">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="flex justify-center text-center">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="flex justify-center text-center">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </div>
    )
}

export default GameBoard;