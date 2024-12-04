import React from "react";
import GameZone from "../../assets/gamezone2.png";

const Header = () => {
    return (
        <div className="flex items-center justify-center p-4 shadow-md" style={{background: 'rgb(17,17,17)', height: '90px'}}>
            <img src={GameZone} alt="Game Zone" className="h-14" />
        </div>
    );
};

export default Header;
