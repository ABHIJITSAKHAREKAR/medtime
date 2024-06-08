import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
function NavbarComp() {
  const { LogUser, setLoguser,setLogState,setUserToken } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log("f11");
  //   const user = JSON.parse(localStorage.getItem('user'))
  //   if (user) setLoguser(user);

  //   console.log("f12");
  // }, []);

  function handleclick() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('Drname')
    
    setLoguser(null);
    setLogState(false);
    setUserToken(null);
  }


  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href='/'>MedTime</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">

            <Nav.Link href='/'>Home</Nav.Link>

            <Nav.Link href='/about'>About</Nav.Link>

            {LogUser && (<Nav.Link href='/userreg'>Register</Nav.Link>)}

          </Nav>


          <Nav>


            <Nav.Link>{LogUser && (<span>{LogUser.email}</span>)}</Nav.Link>


            <Nav.Link>{LogUser && (<button onClick={handleclick}>Log out</button>)}</Nav.Link>


            {!LogUser && (<Nav.Link href='/login'>Login</Nav.Link>)}
            {!LogUser && (<Nav.Link href='/signup'>Signup</Nav.Link>)}


          </Nav>




        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;