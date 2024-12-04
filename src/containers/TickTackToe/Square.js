import React from "react";

const Square = ({ value, onSquareClick }) => {
    return (
        <button className="h-[100px] w-[100px] text-center bg-white border-solid border border-[#999] float-left text-3xl font-semibold leading-6 " style={{color: "#000"}} onClick={onSquareClick}>
            {value}
        </button>
    )
}

export default Square;