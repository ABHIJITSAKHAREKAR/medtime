import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import DrContextProvider from './context/DrContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>

        <AuthContextProvider>
            <DrContextProvider>
                <App />
            </DrContextProvider>
        </AuthContextProvider>

    </div>
);
