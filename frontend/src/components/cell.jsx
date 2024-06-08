import { useContext, useEffect, useRef, useState } from "react";
import { SlotContext } from "../context/Context";




function Cell(props) {

    const [clicked, SetClicked] = useState(false);

    const { Numslot, setNumslot,SlotSel,setSlotsel } = useContext(SlotContext);

    const redButton =
    {
        backgroundColor: "red"
    }

    function handleClick(e) {
        if(!props.content)return;
        if (Numslot == 1 && !clicked) return;
        console.log(e);
        const {name,value}=e.target;
        console.log(name," ",value);

        if(!clicked)setSlotsel({day:value,slot:name});
        else setSlotsel({day:"",slot:null});
        SetClicked(!clicked);
    }


    const initialrender = useRef(true);

    useEffect(() => {

        if (initialrender.current) {
            initialrender.current = false;
            return;
        }
        if (clicked) setNumslot(Numslot + 1);
        else setNumslot(Numslot - 1);

    }, [clicked]);

    

    return (<td ><button name={props.slot} value={props.day} className="green-button" style={clicked || !props.content ? redButton : null} onClick={handleClick
    }>{props.content ? "Available" : "Booked"}</button></td >);

}

export default Cell;