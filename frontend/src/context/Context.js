import React, { Children, useState } from 'react';

export const SlotContext = React.createContext();


function SlotContextProvider({children})
{

    const [Numslot,setNumslot]=useState(0);
    const [SlotSel,setSlotsel]=useState({day:"",slot:null})
    
    return(
        <SlotContext.Provider  value={{Numslot:Numslot,setNumslot:setNumslot,SlotSel:SlotSel,setSlotsel:setSlotsel}}>
            {children}
        </SlotContext.Provider>

    )

};

export default SlotContextProvider;