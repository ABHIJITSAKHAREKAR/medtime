import React, { Children, useEffect, useState } from 'react';

export const AuthContext = React.createContext();


function AuthContextProvider({ children }) {

    const [LogUser, setLoguser] = useState(null);
    const [LogState, setLogState] = useState(false);
    const [UserToken, setUserToken] = useState(null);
    
    
    console.log("f8");
    
    useEffect(() => {
        console.log("f9");
        //const user = JSON.parse(localStorage.getItem('user'))
        const user=localStorage.getItem('user');
        const token=localStorage.getItem('token');
        console.log("UserToken in authcont ", token);
        if(user)
        {
            setLoguser({email:user});
            setLogState(true);
            setUserToken({token});
        }

        console.log("f10");
    }, []);


    return (
        <AuthContext.Provider value={{ LogUser: LogUser, setLoguser: setLoguser,LogState,setLogState,UserToken,setUserToken }}>
            {children}
        </AuthContext.Provider>

    )

};

export default AuthContextProvider;