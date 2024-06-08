// Home.js

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';

const Home = () => {


  const { LogUser,LogState} = useContext(AuthContext);

  
  
  
  console.log("loguser in homw ", LogUser,LogState);
  

  return (
    <div className='home'>
      <h2>Home Page</h2>
      {LogState && <h2>Welcome, Book your Appointment </h2>}
      
      
      {LogState && <Button variant="success" href='/applobby' className='button'>Appointment Lobby</Button>}
      {!LogState && <Button variant="success" href='/login' className='button'>Login</Button>}
      {!LogState && <Button variant="success" href='/signup'>Signup</Button>}
      
    </div>
    
  );
}

export default Home;
