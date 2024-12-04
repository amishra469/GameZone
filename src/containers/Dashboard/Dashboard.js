import React from "react";
import TickTakToeImz from "../../assets/ticktakktoe.png";
import RockPaperScissor from "../../assets/rockpaperscissor.jpg";
import gameList from "./gamelist.json";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const imzUrl = {
        ticktacktoe: TickTakToeImz,
        rockpaperscissor: RockPaperScissor,
    };

    return (
        <div className="flex flex-wrap justify-center gap-8 py-10 px-5">
            {gameList &&
                gameList.map((item) => (
                    <Link to={item.path} key={item.id} className="relative group">
                        <div className="w-60 bg-gray-800 border border-gray-700 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl">
                            <img
                                src={imzUrl[item.imzname]}
                                alt={item.gamename}
                                className="w-full h-60 rounded-t-lg"
                            />
                            <div className="p-3 bg-gray-900 text-center text-lg font-semibold text-gray-300 group-hover:text-white rounded-b-lg">
                                {item.gamename}
                            </div>
                        </div>
                    </Link>
                ))}
        </div>
    );
};

export default Dashboard;
