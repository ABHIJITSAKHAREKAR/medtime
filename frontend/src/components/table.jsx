import Table from 'react-bootstrap/Table';
import { SlotContext } from '../context/Context';
import { useContext, useEffect, useState } from 'react';
import Row from './Row'
import { DrContext } from '../context/DrContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function strtoDate(param) {
  const obj1 = new Date(param);
  const formattedDate = obj1.toLocaleString('en-US', { month: 'short', day: '2-digit' });
  return formattedDate;
}



function Tablecomp() {
  const { UserToken} = useContext(AuthContext);
  const navigate=useNavigate();

  console.log("rendering table comp");

  const { Numslot, setNumslot, SlotSel, setSlotsel } = useContext(SlotContext);
  const {DrnameCon,SetDrnameCon}=useContext(DrContext);
  const [AppData, setAppData] = useState(null);
  const [RErender,setRErender]=useState(false);
  

  const timeslot = ["9-10", "10-11", "11-12", "12-1", "2-3", "3-4", "4-5"];

  console.log("Dr context ",DrnameCon);
  

  useEffect(() => {

    async function getfetchapp() {

      try {

        const payload={Drcode:DrnameCon};
        
        const response = await fetch('/api/secure/getapp',{

          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${UserToken.token}`
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log("Appointment data",data);
        setAppData(data)


        return data;
      } catch (err) {
        console.log(err);
      }

    }

    getfetchapp();
  

  }, [RErender]);


  async function handleSubmit(event) {

    if(SlotSel.day=="" && SlotSel.slot==null)return ;

    const payload={day:SlotSel.day,reqslot:SlotSel.slot,Drcode:DrnameCon};

    try {
      const response = await fetch('/api/secure/bookapp',{

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${UserToken.token}`
        },
        body: JSON.stringify(payload)
      });
      console.log("post req",response);
      const data = await response.json();
      console.log("post req",data);
      setRErender(!RErender);
      localStorage.removeItem('Drname')
      SetDrnameCon('');
      navigate('/')
      
    } catch (err) {
      console.log(err);
    }



  }


  return (

    <>

      {DrnameCon && <h2>here {DrnameCon}</h2>}
      
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            {timeslot.map((itr, index) => (
              <th key={index}>{itr}</th>
            ))}
          </tr>
        </thead>


        <tbody>

          <Row date={AppData && strtoDate(AppData[0].date)} timeslot={AppData && AppData[0].slot} />

          <Row date={AppData && strtoDate(AppData[1].date)} timeslot={AppData && AppData[1].slot} />

          <Row date={AppData && strtoDate(AppData[2].date)} timeslot={AppData && AppData[2].slot} />


        </tbody>
      </Table>

      <button onClick={handleSubmit} className="green-button">Booked Appointment</button>
    </>
  );
}

export default Tablecomp;