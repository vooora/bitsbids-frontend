import MainNavbar from "../../components/MainNavbar/MainNavbar";
import bids_logo from "../../assets/bids.png";
import styles from "./UserProfilePage.module.css";
import { Button, Form, FormControl, Row, Col } from "react-bootstrap";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";

function UserProfilePage() {
  return (
    <>
      <MainNavbar />
      <div className={styles.main}>
        <div className={styles.appContainer}>
          <LeftColumnProfile />
          <div
            className={`${styles.rightColumn} d-flex align-items-center justify-content-center`}
          >
            <div
              className={`${styles.centeredContent} d-flex flex-column align-items-center justify-content-center`}
            >
              <Col>
                <Row style={{ marginBottom: "2rem" }}>
                  <Col>//insert the image</Col>
                  <Col>
                    <h1 className="display-5 mb-0">Advik Sinha</h1>
                    <h1 className="display-11 mb-2">f20222004</h1>
                    <Form className="mb-3 d-flex">
                      <FormControl
                        type="text"
                        placeholder=" "
                        className={styles.enterMoneyForm1}
                      />
                    </Form>
                  </Col>
                </Row>
                <Row className="align-items-center justify-content-center">
                  <Col>
                    <h5 className="display-11 mb-4">Mobile Number</h5>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <h5 className="display-11 mb-4"> 8978505458</h5>
                      </Col>
                      <Col>/edit</Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  className="align-items-center justify-content-center"
                  style={{ marginBottom: "5rem" }}
                >
                  <Col>
                    <h5 className="display-11 mb-4">BITS Email ID</h5>
                  </Col>
                  <Col>
                    <Form className="mb-3 d-flex">
                      <FormControl
                        type="text"
                        placeholder=" "
                        className={styles.enterMoneyForm2}
                      />
                    </Form>
                  </Col>
                </Row>
              </Col>
              <Row>
                <Button
                  variant="primary"
                  size="md"
                  className={styles.longButton}
                >
                  Log Out
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className={styles.longButton}
                >
                  Change Password
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
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
