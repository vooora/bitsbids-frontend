import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Notifications, Sms, Person } from "@material-ui/icons";
import "./MainNavbar.css";

function MainNavbar() {
  return (
    <Navbar expand="lg" className="navbar-col">
      <Container fluid>
        <Navbar.Brand href="/" className="white-icon">
          BITSBIDS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="action-icons">
          <Nav>
            <Nav.Link href="/">
              <Notifications className="white-icon" />
            </Nav.Link>
            <Nav.Link href="/">
              <Sms className="white-icon" />
            </Nav.Link>
            <Nav.Link href="/">
              <Person className="white-icon" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
