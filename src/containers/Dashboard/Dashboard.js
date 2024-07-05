import React from "react";
import TickTakToeImz from "../../assets/ticktakktoe.png";
import RockPaperScissor from "../../assets/rockpaperscissor.jpg";
import gameList from "./gamelist.json";
import { Link } from "react-router-dom";
// import backgroundImage from "../../assets/game-background.jpeg"
const Dashboard = () => {
    let imzUrl = {
        "ticktacktoe": TickTakToeImz,
        "rockpaperscissor": RockPaperScissor,
    }

    return (
        <div className="bg-cover bg-center bg-no-repeat flex flex-wrap flex-grow justify-center p-5 items-center gap-10 overflow-auto py-10">
            {gameList && gameList.map((item) => (
                <Link to={item.path}>
                    <div key={item.id} className="w-60 border-solid border-2 border-indigo-600 transform transition duration-300 ease-in-out hover:scale-110 cursor-pointer">
                        <img src={imzUrl[item.imzname]} alt="Tick Tak Toe" className="w-60 h-60 mx-auto" />
                        <div className="bg-neutral-400 text-xl font-bold text-white p-3 flex justify-center">{item.gamename}</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Dashboard;