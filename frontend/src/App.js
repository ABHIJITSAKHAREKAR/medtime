import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SlotContextProvider from './context/Context';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import NavbarComp from './components/navbar';
import About from './pages/About';
import UserReg from './pages/UserReg';
import { AuthContext } from './context/AuthContext';
import AppLobby from './pages/AppLobby';
import SlotPage from './pages/SlotPage'



function App() {

  const { LogUser,LogState } = useContext(AuthContext);
  console.log("loguse in app", LogUser);
  console.log("f1");
  
  return (
    

      
        <Router>

          <NavbarComp />
          <Routes>
            {console.log("f2")}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />


            <Route path="/login" element={!LogState? <Login />: <Home/> } />
            <Route path="/signup" element={!LogState? <Signup /> : <Home/>} />
            <Route path="/userReg" element={LogState? <UserReg /> : <Home/>} />
            <Route path="/applobby" element={LogState? <AppLobby /> : <Home/>} />
            <Route path="/slotpage" element={LogState? <SlotPage /> : <Home/>} />

            {console.log("f3")}

  
          </Routes>


        </Router>

     

  );
}

export default App;
