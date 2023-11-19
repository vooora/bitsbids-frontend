import React, { useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Notifications, Sms, Person, Add } from "@material-ui/icons";
import styles from "./MainNavbar.module.css";
import "./MainNavbar.module.css";
import "./MainNavbar.css";
import whitelogo from "../../assets/whitelogo.png";

function MainNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Navbar expand="sm" className={styles.navbarCol} expanded={isExpanded}>
      <Container fluid>
        <Navbar.Brand href="/" className={styles.whiteIcon}>
          <img
            src={whitelogo}
            alt="BITSBIDS Logo"
            height="20"
            className="align-center"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.actionIcons}>
          <Nav>
            <Nav.Link href="/">
              <Notifications className={styles.whiteIcon} />
              {isExpanded && (
                <span className={styles.navbarText}>Notifications</span>
              )}{" "}
            </Nav.Link>
            <Nav.Link href="/new-product">
              <Add className={styles.whiteIcon} />
              {isExpanded && (
                <span className={styles.navbarText}>Add Product</span>
              )}
            </Nav.Link>
            <Nav.Link href="/">
              <Sms className={styles.whiteIcon} />
              {isExpanded && (
                <span className={styles.navbarText}>Messages</span>
              )}
            </Nav.Link>
            <NavDropdown
              title={
                <>
                  <Person className={styles.whiteIcon} />
                  {isExpanded && (
                    <span className={styles.navbarText}>User</span>
                  )}
                </>
              }
              id="user-dropdown"
              className={styles.customDropdown}
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
