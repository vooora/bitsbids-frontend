import MainNavbar from "../../components/MainNavbar/MainNavbar";
import styles from "./ErrorPage.module.css";
import { Button, Form, FormControl, Row, Col } from "react-bootstrap";

function ErrorPage() {
  return (
    <>
      <MainNavbar />
      <div className={styles.main}>
        <div className={styles.appContainer}>
          <div
            className={`${styles.myColumn} d-flex align-items-center justify-content-center`}
          >
            <Row className={"align-items-center justify-content-center"}>
              <Col>
                <div
                  className={`${styles.centeredContent} d-flex flex-column align-items-center justify-content-center`}
                >
                  <h1 className="display-1 mb-0">
                    <strong>
                      <b>OOPS!</b>
                    </strong>
                  </h1>
                  <h1 className="display-6 mb-5">
                    We are unable to find the page you are currently looking
                    for...
                  </h1>
                  <Button
                    variant="primary"
                    size="lg"
                    className={styles.myButton}
                  >
                    Back
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
