import React from 'react'

const GameWinModal = ({ winner, closeModal }) => {

    console.log(winner)
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[500px] h-[200px] bg-white rounded-lg p-2 shadow-lg relative">
                <div className=''>
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                        &times;
                    </button>
                </div>
                <div>
                    <div className='my-5 text-center text-3xl font-semibold'>Player Won</div>
                    <div className='my-5 text-center text-xl font-semibold'>You Won in 6 moves</div>
                    <div className='flex justify-evenly'>
                        <button className='bg-green-600 p-2 border-solid border border-green-600 rounded-md text-white' >Review Game</button>
                        <button className='bg-red-600 p-2 border-solid border border-red-600 rounded-md text-white'>Play Again</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameWinModal;