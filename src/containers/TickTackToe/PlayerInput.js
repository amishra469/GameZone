import React, { useState, useEffect, useRef } from 'react';

const PlayerInput = ({ player, setPlayer, playerType, currentPlayer }) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsEditing(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef]);

    const isCurrentPlayer = currentPlayer === playerType;
    const bgColor = isCurrentPlayer ? 'bg-green-300' : 'bg-transparent';

    return (
        <div className={`text-center p-5 border-solid border border-white rounded-md w-[250px] ${bgColor}`}>
            <div>{playerType}</div>
            <div ref={inputRef}>
                {isEditing ? (
                    <input
                        type='text'
                        value={player}
                        onChange={(e) => setPlayer(e.target.value)}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                    />
                ) : (
                    <div onClick={() => setIsEditing(true)}>
                        {player.length > 0 ? player : 'Enter Your Name Here'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayerInput;
