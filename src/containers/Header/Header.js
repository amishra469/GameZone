import React from 'react'
import GameZone from "../../assets/gamezone2.png"
const Header = () => {
    return (
        <div className="bg-[#111] text-2xl font-bold text-white flex justify-center p-2">
            <img src={GameZone} alt="Game Zone" className="shadow-lg" />
        </div>
    )
}

export default Header
