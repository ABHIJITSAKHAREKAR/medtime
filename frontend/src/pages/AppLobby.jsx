// Home.js
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { DrContext } from '../context/DrContext';

const AppLobby = () => {

  const {DrnameCon,SetDrnameCon}=useContext(DrContext);
  const [Drname, SetDrname] = useState('');

  function handleClick(e) {
    console.log(e.target.getAttribute('name'));
    const drname = e.target.getAttribute('name');
    const drvalue = e.target.getAttribute('value');
    
    SetDrname(drname);
    SetDrnameCon(drvalue);
    localStorage.setItem('Drname',drvalue);
    console.log("dr cont in lobby",drvalue);
  }


  return (
    <div style={{ marginLeft: '5%' }}>


      {DrnameCon && <h2>{DrnameCon}</h2>}
      <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
        
        <Dropdown className='button'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose Dr
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleClick} name='Dr. Smith, Cardiologist' value='sc'>Dr. Smith, Cardiologist</Dropdown.Item>
            <Dropdown.Item onClick={handleClick} name='Dr. Johnson, Dermatologist' value='jd'>Dr. Johnson, Dermatologist</Dropdown.Item>
            <Dropdown.Item onClick={handleClick} name='Dr. Williams, Orthopedic Surgeon' value='wo'>Dr. Williams, Orthopedic Surgeon</Dropdown.Item>
            <Dropdown.Item onClick={handleClick} name='Dr. Brown, Neurologist' value='bn'>Dr. Brown, Neurologist</Dropdown.Item>
            <Dropdown.Item onClick={handleClick} name='Dr. Patel, Pediatrician' value='pp'>Dr. Patel, Pediatrician</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <input className='inputdr' type="text" id="doctorName" placeholder="Choose Dr Name" style={{ marginRight: '10px' }} value={Drname} readOnly />
        
      </div>

      <Button variant="success" href='/slotpage' className='button'>BooK Slot</Button>
    </div>
  );

}

export default AppLobby;
