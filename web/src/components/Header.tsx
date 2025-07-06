import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import StatusModal from './StatusModal';
import { useStatus } from '../hooks/useStatus';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { status, loading, checkStatus } = useStatus();

  const handleStatusClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCheckStatus = async () => {
    await checkStatus();
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">
            <i className="fas fa-robot me-2"></i>
            NutJS API
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#" onClick={handleStatusClick}>
                <i className="fas fa-heartbeat me-1"></i>
                Status
              </Nav.Link>
              <Nav.Link
                href="https://github.com/frederico-kluser/huu-desktop-api-automation/blob/main/API_DOCUMENTATION.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-book me-1"></i>
                Docs
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <StatusModal
        show={showModal}
        onHide={() => setShowModal(false)}
        status={status}
        loading={loading}
        onCheckStatus={handleCheckStatus}
      />
    </>
  );
};

export default Header;
