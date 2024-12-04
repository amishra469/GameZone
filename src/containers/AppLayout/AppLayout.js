import React from "react";

const AppLayout = ({ children }) => {
    return (
        <div className="h-[calc(100vh-90px)] bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white overflow-auto">
            {children}
        </div>


    );
};

export default AppLayout;
