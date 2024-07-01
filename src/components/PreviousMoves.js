import React from "react";

const PreviousMoves = ({ gamehistory, jumpTo }) => {

    const moves = gamehistory.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });
    return (
        <>
            {moves}
        </>
    )
}

export default PreviousMoves;