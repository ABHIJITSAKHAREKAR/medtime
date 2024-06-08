import React, { Children, useState,useEffect } from 'react';

export const DrContext = React.createContext();


function DrContextProvider({children})
{

    const [DrnameCon,SetDrnameCon]=useState('');

    useEffect(() => {
        
        //const user = JSON.parse(localStorage.getItem('user'))
        const Drname=localStorage.getItem('Drname');
        if(Drname)
        {
            SetDrnameCon(Drname);
        }

        console.log("f10");
    }, []);
    
    return(
        <DrContext.Provider  value={{DrnameCon:DrnameCon,SetDrnameCon:SetDrnameCon}}>
            {children}
        </DrContext.Provider>

    )

};

export default DrContextProvider;