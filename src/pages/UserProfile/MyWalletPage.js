import MainNavbar from "../../components/MainNavbar/MainNavbar";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";
import bids_logo from "../../assets/bids.png";
import styles from "./UserProfilePage.module.css";
import { Button, Form, FormControl, Row, Col } from "react-bootstrap";

function MyWalletPage() {
  return (
    <>
      <MainNavbar />
      <div className={styles.main}>
        <div className={styles.appContainer}>
          <LeftColumnProfile />
          <div
            className={`${styles.rightColumn} d-flex justify-content-center`}
          >
            <div
              className={`${styles.centeredContent} d-flex flex-column align-items-center justify-content-center`}
            >
              <h1 className="display-5 mb-4">Pranathi Voora's Wallet</h1>

              <h1 className="display-8 mb-2">Balance: 100</h1>
              <Form className="mb-3 d-flex">
                <FormControl
                  type="text"
                  placeholder=" "
                  className={styles.enterMoneyForm}
                />
                <Button
                  variant="primary"
                  size="lg"
                  className={styles.mediumButton}
                >
                  Add Money
                </Button>
              </Form>
              <Row className="mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  className={styles.smallButton}
                >
                  100
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className={styles.smallButton}
                >
                  500
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className={styles.smallButton}
                >
                  1000
                </Button>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyWalletPage;
