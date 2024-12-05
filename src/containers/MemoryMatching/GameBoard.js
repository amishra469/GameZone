import React, { useState } from "react";
import Card from "./Card";

const GameBoard = ({ cards, setCards, moves, setMoves }) => {
    const [selectedCards, setSelectedCards] = useState([]);

    const handleCardClick = (card) => {
        if (selectedCards.length < 2 && !card.flipped && !card.matched) {
            const updatedCards = cards.map(c =>
                c.id === card.id ? { ...c, flipped: true } : c
            );
            setCards(updatedCards);

            setSelectedCards([...selectedCards, card]);

            if (selectedCards.length === 1) {
                setMoves(moves + 1);
                if (selectedCards[0].symbol === card.symbol) {
                    const matchedCards = updatedCards.map(c =>
                        c.symbol === card.symbol ? { ...c, matched: true } : c
                    );
                    setCards(matchedCards);
                } else {
                    setTimeout(() => {
                        const resetCards = updatedCards.map(c =>
                            c.id === card.id || c.id === selectedCards[0].id
                                ? { ...c, flipped: false }
                                : c
                        );
                        setCards(resetCards);
                    }, 1000);
                }
                setSelectedCards([]);
            }
        }
    };

    return (
        <div className="mm-game-board">
            {cards.map((card) => (
                <Card key={card.id} card={card} onClick={handleCardClick} />
            ))}
        </div>
    );
};

export default GameBoard;
