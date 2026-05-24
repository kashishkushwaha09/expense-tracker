import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const ExpenseNav = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
            <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
             <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign up</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    
    </>
  
  )
}

export default ExpenseNav