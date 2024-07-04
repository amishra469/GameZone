import React from 'react'
import { useRouteError } from 'react-router-dom';


const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div id="error-page" className="h-screen flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">Oops!</h1>
            <p className="text-lg mb-2 text-white">Sorry, an unexpected error has occurred.</p>
            <p className="text-sm text-gray-500">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>

    )
}

export default ErrorPage
