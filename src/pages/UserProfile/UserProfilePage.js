import { useLocation, useNavigate } from "react-router-dom";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import styles from "./UserProfilePage.module.css";
import "./UserProfilePage.css";
import { Button, Row, Col } from "react-bootstrap";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { Avatar } from "@material-ui/core";
import image from "../../assets/icons8-avatar-48.png";

const serverBaseUrl = process.env.REACT_APP_BACKEND_URL;

function UserProfilePage() {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(
    location.state?.userDetails
      ? location.state?.userDetails
      : localStorage.getItem("userDetails")
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { checkAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    if (window.innerWidth <= 768) {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };
  const getUserDetail = (detail) => {
    return userDetails && userDetails[detail] !== "NA"
      ? userDetails[detail]
      : "Not provided";
  };
  const completeProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${serverBaseUrl}/logout`, {
        withCredentials: true,
      });
      checkAuthStatus();
      navigate("/");
    } catch (error) {
      navigate("/", {
        state: { message: "Some error occured.", variant: "danger" },
      });
    }
  };

  useEffect(() => {
    if (!userDetails) {
      const storedDetails = localStorage.getItem("userDetails");
      if (storedDetails) {
        setUserDetails(JSON.parse(storedDetails));
      }
    } else {
    }
  }, [userDetails]);

  useEffect(() => {
    const storedDetails = localStorage.getItem("userDetails");
    if (storedDetails) {
      setUserDetails(JSON.parse(storedDetails));
    }
  }, []);

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
                    <Col lg={6}>
                      <Avatar
                        src={image}
                        style={{ width: "60%", height: "80%" }}
                      />
                    </Col>
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
                          <h5 className="mb-4">{getUserDetail("phoneNo")}</h5>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="align-items-center justify-content-center">
                    <Col lg={6}>
                      <h3 className="mb-4">
                        <b>BITS Email ID</b>
                      </h3>
                    </Col>
                    <Col lg={6}>
                      <h5 className="mb-4">{userDetails.email}</h5>
                    </Col>
                  </Row>
                  <Row
                    className="align-items-center justify-content-center"
                    style={{ marginBottom: "5rem" }}
                  >
                    <Col lg={6}>
                      <h3 className="mb-4">
                        <b>Hostel</b>
                      </h3>
                    </Col>
                    <Col lg={6}>
                      <h5 className="mb-4">{getUserDetail("hostel")}</h5>
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
                  {(getUserDetail("phoneNo") === "Not provided" ||
                    getUserDetail("hostel") === "Not provided") && (
                    <Button
                      variant="primary"
                      size="md"
                      className={styles.longButton}
                      onClick={completeProfile}
                    >
                      Complete Profile
                    </Button>
                  )}
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
