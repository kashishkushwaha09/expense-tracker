import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ExpenseNav = () => {
    const navigate = useNavigate();
     const {token,logout}=useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
            <Nav className="ms-auto">
           {token && <Nav.Link href="/">Home</Nav.Link>}
            {!token && <Nav.Link href="/login">Login</Nav.Link>}
              {!token &&  <Nav.Link href="/signup">Sign up</Nav.Link>}
             { token && <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>}
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    
    </>
  
  )
}

export default ExpenseNav