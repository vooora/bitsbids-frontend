import React, { useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Notifications, Sms, Person, Add } from "@material-ui/icons";
import "./MainNavbar.css";
import whitelogo from "../../assets/whitelogo.png";

function MainNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Navbar expand="sm" className="navbar-col" expanded={isExpanded}>
      <Container fluid>
        <Navbar.Brand href="/" className="white-icon">
          <img
            src={whitelogo}
            alt="BITSBIDS Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="action-icons">
          <Nav>
            <Nav.Link href="/">
              <Notifications className="white-icon" />
              {isExpanded && (
                <span className="navbar-text">Notifications</span>
              )}{" "}
            </Nav.Link>
            <Nav.Link href="/">
              <Add className="white-icon" />
              {isExpanded && <span className="navbar-text">Add Product</span>}
            </Nav.Link>
            <Nav.Link href="/">
              <Sms className="white-icon" />
              {isExpanded && <span className="navbar-text">Messages</span>}
            </Nav.Link>
            <NavDropdown
              title={<Person className="white-icon" />}
              id="user-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item href="/">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/">My Wallet</NavDropdown.Item>
              <NavDropdown.Item href="/">My Bids</NavDropdown.Item>
              <NavDropdown.Item href="/">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
