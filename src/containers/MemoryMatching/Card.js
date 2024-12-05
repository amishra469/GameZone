import React from "react";

const Card = ({ card, onClick }) => {
    return (
        <div
            className={`mm-card ${card.flipped ? "flipped" : ""}`}
            onClick={() => onClick(card)}
        >
            {card.flipped || card.matched ? card.symbol : "❓"}
        </div>
    );
};

export default Card;
