import React, { useState, useContext, useEffect, useCallback } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Sms, Person, Add, Home } from "@material-ui/icons";
import styles from "./MainNavbar.module.css";
import "./MainNavbar.module.css";
import "./MainNavbar.css";
import whitelogo from "../../assets/whitelogo.png";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const serverBaseUrl = process.env.REACT_APP_BACKEND_URL;

function MainNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { isLoggedIn, checkAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUserById = useCallback(
    async (userId) => {
      try {
        const response = await axios.get(`${serverBaseUrl}/user/${userId}`, {
          withCredentials: true,
        });
        setUserDetails(response.data);
      } catch (error) {
        navigate("/", {
          state: { message: "Some error occured.", variant: "danger" },
        });
      }
    },
    [navigate]
  );

  axios.defaults.withCredentials = true;

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await axios.get(`${serverBaseUrl}/user/me`, {
        withCredentials: true,
      });
      fetchUserById(response.data);
    } catch (error) {
      navigate("/", {
        state: { message: "Some error occured.", variant: "danger" },
      });
    }
  }, [fetchUserById, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn, fetchUserDetails]);

  const goToUserProfile = () => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    navigate("/user", { state: { userDetails } });
  };
  const goToWallet = () => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    navigate("/wallet", { state: { userDetails } });
  };
  const goToSales = () => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    navigate("/sales", { state: { userDetails } });
  };
  const goToBids = () => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    navigate("/bids", { state: { userDetails } });
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${serverBaseUrl}/logout`, {
        withCredentials: true,
      });
      checkAuthStatus();
      window.location.reload();
    } catch (error) {}
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
              <Nav.Link href="/messages" title="Messages">
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
                <NavDropdown.Item onClick={goToSales}>
                  My Sales
                </NavDropdown.Item>
                <NavDropdown.Item onClick={goToBids}>My Bids</NavDropdown.Item>
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
