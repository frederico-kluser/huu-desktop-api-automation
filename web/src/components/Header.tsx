import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          <i className="fas fa-robot me-2"></i>
          NutJS API
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/api/health">
              <i className="fas fa-heartbeat me-1"></i>
              Status
            </Nav.Link>
            <Nav.Link href="#" disabled>
              <i className="fas fa-book me-1"></i>
              Docs
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
