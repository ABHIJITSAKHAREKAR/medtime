// Home.js

import React from 'react';
import Tablecomp from '../components/table';
import SlotContextProvider from '../context/Context';

const About = () => {
  return (
    <div>
      <h2>Choose Slot</h2>
      <SlotContextProvider>
      
      <Tablecomp/>
      </SlotContextProvider>
      
    </div>
  );
}

export default About;
