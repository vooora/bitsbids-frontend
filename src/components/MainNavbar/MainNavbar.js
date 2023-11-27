import React, { useState, useContext, useEffect, useCallback } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Notifications, Sms, Person, Add, Home } from "@material-ui/icons";
import styles from "./MainNavbar.module.css";
import "./MainNavbar.module.css";
import "./MainNavbar.css";
import whitelogo from "../../assets/whitelogo.png";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const serverBaseUrl = "http://localhost:8080";

function MainNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { isLoggedIn, checkAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await axios.get(`${serverBaseUrl}/user/me`, {
        withCredentials: true,
      });
      fetchUserById(response.data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, []);

  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`${serverBaseUrl}/user/${userId}`, {
        withCredentials: true,
      });
      setUserDetails(response.data);
    } catch (error) {
      console.log("Error fetching user by ID:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn, fetchUserDetails]);

  const goToUserProfile = () => {
    navigate("/user", { state: { userDetails } });
  };
  const goToWallet = () => {
    navigate("/wallet", { state: { userDetails } });
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${serverBaseUrl}/logout`, {
        withCredentials: true,
      });
      checkAuthStatus();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="sm" className={styles.navbarCol} expanded={isExpanded}>
      <Container fluid>
        <Navbar.Brand href="/" className={styles.whiteIcon} title="BITS BIDS">
          <img
            src={whitelogo}
            alt="BITSBIDS Logo"
            height="20"
            className="align-center d-none d-md-inline"
          />
          <Home className="d-inline d-md-none" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.actionIcons}>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link href="/" title="Notifications">
                <Notifications className={styles.whiteIcon} />
                {isExpanded && (
                  <span className={styles.navbarText}>Notifications</span>
                )}{" "}
              </Nav.Link>
            ) : null}

            <Nav.Link
              href="/products"
              title="Add Product"
              onClick={(e) => {
                localStorage.setItem("redirectPath", `/products`);
              }}
            >
              <Add className={styles.whiteIcon} />
              {isExpanded && (
                <span className={styles.navbarText}>Add Product</span>
              )}
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link href="/" title="Messages">
                <Sms className={styles.whiteIcon} />
                {isExpanded && (
                  <span className={styles.navbarText}>Messages</span>
                )}
              </Nav.Link>
            ) : null}
            {isLoggedIn ? (
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
                <NavDropdown.Item onClick={goToUserProfile}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={goToWallet}>
                  My Wallet
                </NavDropdown.Item>
                <NavDropdown.Item href="/">My Bids</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
            {!isLoggedIn ? (
              <Nav.Link
                href="/login"
                title="Login"
                onClick={(e) => {
                  localStorage.setItem(
                    "redirectPath",
                    window.location.pathname
                  );
                }}
              >
                <Person className={styles.whiteIcon} />
                {isExpanded && (
                  <span className={styles.navbarText}>Login</span>
                )}{" "}
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
