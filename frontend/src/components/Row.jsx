import Cell from "./cell";

//Array.from({ length: 7 })
function Row(props) {

    // console.log("timeslot ",props.timeslot);

    return(
        <tr>

        <td>{props.date}</td>

        {props.timeslot && props.timeslot.map((itr, index) => (
            <Cell key={index} content={itr} day={props.date} slot={index} />
        ))}

    </tr>
    );

}


export default Row;