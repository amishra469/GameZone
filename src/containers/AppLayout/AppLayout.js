import React from 'react'

const AppLayout = ({ children }) => {
    return (
        <div className="h-screen bg-gray-500">
            {children}
        </div>
    )
}

export default AppLayout
