import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import logo from '../img/logoIbik.png'; // Ganti path dengan lokasi logo Anda

const NavbarNav = () => {
  const navbarStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 2px -2px purple'
  };

  const textStyle = {
    color: 'purple'
  };

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container fluid>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <span style={{ marginLeft: '10px', ...textStyle }}>Perpustakaan IBI Kesatuan</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Button variant="link" href="#data-peminjaman" style={textStyle}>
              Data Peminjaman
            </Button>
            <Button variant="link" href="#logout" style={textStyle}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarNav;
