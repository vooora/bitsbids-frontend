import { useLocation, useNavigate } from "react-router-dom";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import styles from "./UserProfilePage.module.css";
import "./UserProfilePage.css";
import { Button, Row, Col } from "react-bootstrap";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";
import { useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const serverBaseUrl = "http://localhost:8080";

function UserProfilePage() {
  const location = useLocation();
  const userDetails = location.state?.userDetails;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { checkAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    if (window.innerWidth <= 768) {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${serverBaseUrl}/logout`, {
        withCredentials: true,
      });
      checkAuthStatus();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <MainNavbar />
      <div className={styles.main}>
        <Button
          className={`${styles.menuButton} d-md-none`}
          onClick={toggleDrawer}
          aria-controls="basic-navbar-nav"
          aria-expanded={isDrawerOpen}
        >
          {isDrawerOpen ? <span>&#9660;</span> : <span>&#9654;</span>}{" "}
        </Button>
        <div className={styles.appContainer}>
          <div class={`${isDrawerOpen ? "open" : "closed"}`}>
            <LeftColumnProfile userDetails={userDetails} />
          </div>
          {!isDrawerOpen ? (
            <div
              className={`${styles.rightColumn} d-flex align-items-center justify-content-center`}
            >
              <div
                className={`${styles.centeredContent} d-flex flex-column align-items-center justify-content-center`}
              >
                <Col lg={6}>
                  <Row style={{ marginBottom: "2rem" }}>
                    <Col lg={6}>insert the image</Col>
                    <Col lg={6}>
                      <h1 className="display-5 mb-2">
                        <b>
                          {userDetails.firstName + " " + userDetails.lastName}
                        </b>
                      </h1>
                      <h1 className="mb-2">{userDetails.username}</h1>
                    </Col>
                  </Row>
                  <Row className="align-items-center justify-content-center">
                    <Col lg={6}>
                      <h3 className="mb-4">
                        <b>Mobile Number</b>
                      </h3>
                    </Col>
                    <Col lg={6}>
                      <Row>
                        <Col>
                          <h5 className="mb-4">8978505458</h5>
                        </Col>
                        <Col>/edit</Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row
                    className="align-items-center justify-content-center"
                    style={{ marginBottom: "5rem" }}
                  >
                    <Col lg={6}>
                      <h3 className="mb-4">
                        <b>BITS Email ID</b>
                      </h3>
                    </Col>
                    <Col lg={6}>
                      <h5 className="mb-4">{userDetails.email}</h5>
                    </Col>
                  </Row>
                </Col>
                <Row>
                  <Button
                    variant="primary"
                    size="md"
                    className={styles.longButton}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className={styles.longButton}
                  >
                    Delete Account
                  </Button>
                </Row>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
