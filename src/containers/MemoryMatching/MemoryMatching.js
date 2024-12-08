import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import "./MemoryMatching.css";

const themes = {
    space: ["🌕", "🌌", "⭐", "🚀", "🪐", "🌠", "👽", "🌍", "🌳", "🌸", "🌊", "🌞", "🌈", "🍂", "🍁", "🌻"],
};

const MemoryMatching = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(120);
    const [gameOver, setGameOver] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const [isInitialFlip, setIsInitialFlip] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const initializeGame = () => {
        const themeCards = themes.space;
        const shuffledCards = shuffle([...themeCards]);
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTimer(120);
        setGameOver(false);
        setIsDialogOpen(false);
        setTimerStarted(false);
        setIsInitialFlip(true);

        // Reveal all cards for 2 seconds, then hide them
        setTimeout(() => {
            setFlippedCards(shuffledCards.map((_, index) => index)); // Flip all cards
            setTimeout(() => {
                setFlippedCards([]); // Hide all cards after 2 seconds
                setIsInitialFlip(false);
                setTimerStarted(true); // Start the timer after flipping back
            }, 2000);
        }, 500);
    };

    useEffect(() => {
        if (timer > 0 && !gameOver && timerStarted) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setGameOver(true);
        }
    }, [timer, gameOver, timerStarted]);

    const handleCardClick = (index) => {
        if (
            isInitialFlip || // Prevent clicks during the initial reveal
            flippedCards.length === 2 ||
            flippedCards.includes(index) ||
            matchedCards.includes(index)
        ) {
            return;
        }

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves((prev) => prev + 1);
            const [first, second] = newFlippedCards;
            if (cards[first] === cards[second]) {
                setMatchedCards((prev) => [...prev, first, second]);
                setFlippedCards([]);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    const renderCard = (card, index) => {
        const isFlipped =
            flippedCards.includes(index) || matchedCards.includes(index);
        return (
            <motion.div
                key={index}
                className={`mm-card ${isFlipped ? "flipped" : ""}`}
                onClick={() => handleCardClick(index)}
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="front">{card}</div>
                <div className="back">❓</div>
            </motion.div>
        );
    };

    return (
        <Box className="memory-game">
            {/* Start Dialog */}
            <Dialog open={isDialogOpen}>
                <DialogTitle>Memory Matching Game</DialogTitle>
                <DialogContent>
                    <Typography>Are you ready to start the game?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={initializeGame} variant="contained">
                        Let's Start!
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Header */}
            <Box className="mm-header">
                <Typography variant="h4" className="title">
                    🌟 Memory Matching Game 🌟
                </Typography>
            </Box>

            {/* Scoreboard */}
            <Box className="mm-scoreboard">
                <Typography variant="h6">Moves: {moves}</Typography>
                <Typography variant="h6">
                    Cards Left: {cards.length - matchedCards.length}
                </Typography>
                <Typography variant="h6">Matched: {matchedCards.length / 2}</Typography>
                <Typography variant="h6">Timer: {timer}s</Typography>
            </Box>

            {/* Game Over Screen */}
            {gameOver ? (
                <Box className="mm-game-over">
                    <Typography variant="h5">
                        {matchedCards.length === cards.length ? "🎉 You Win!" : "⏳ Time's Up!"}
                    </Typography>
                    <Button variant="contained" onClick={initializeGame} className="restart-button">
                        Restart
                    </Button>
                </Box>
            ) : (
                <motion.div className="mm-card-grid" layout>
                    {cards.map((card, index) => renderCard(card, index))}
                </motion.div>
            )}
        </Box>
    );
};

export default MemoryMatching;
