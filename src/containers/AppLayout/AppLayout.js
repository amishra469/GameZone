import React from "react";

const AppLayout = ({ children }) => {
    return (
        <div className="h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
            <div className="h-full overflow-auto">{children}</div>
        </div>
    );
};

export default AppLayout;
