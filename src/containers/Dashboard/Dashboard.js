import React from "react";
import TickTakToeImz from "../../assets/ticktakktoe.png";
import RockPaperScissor from "../../assets/rockpaperscissor.jpg"
import gameList from "./gamelist.json"
const Dashboard = () => {
    let imzUrl = {
        "ticktacktoe": TickTakToeImz,
        "rockpaperscissor": RockPaperScissor,
    }

    return (
        <div className="flex-grow p-5 flex flex-wrap justify-center items-center gap-10 overflow-auto">
            {gameList && gameList.map((item) => (
                <div key={item.id} className="w-60 border-solid border-2 border-indigo-600 transform transition duration-300 ease-in-out hover:scale-110 cursor-pointer">
                    <img src={imzUrl[item.imzname]} alt="Tick Tak Toe" className="w-60 h-60 mx-auto" />
                    <div className="bg-neutral-400 text-xl font-bold text-white p-3 flex justify-center">{item.gamename}</div>
                </div>
            ))}
        </div>
    )
}

export default Dashboard;