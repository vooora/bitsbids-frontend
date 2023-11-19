import MainNavbar from "../../components/MainNavbar/MainNavbar";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";
import styles from "./UserProfilePage.module.css";
import { Button, Form, FormControl, Row, Col } from "react-bootstrap";
import SalesProductCard from "../../components/ProductCard/SalesProductCard";

function MySalesPage() {
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
                <div className="mt-4">
                  <Row>
                    <SalesProductCard />
                    <SalesProductCard />
                  </Row>
                  <Row>
                    <SalesProductCard />
                    <SalesProductCard />
                  </Row>
                </div>
              </Col>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MySalesPage;
