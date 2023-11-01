import { Container, Form, Button } from "react-bootstrap";
import landing_page from "../../assets/landing-page.svg";
import logo from "../../assets/whitelogo.png";
import MainNavbar from "../MainNavbar/MainNavbar";
import ProductCard from "../ProductCard/ProductCard";
import { Search } from "@material-ui/icons";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <Container fluid className={`${styles.containerClass} p-0`}>
      <MainNavbar />
      <div className={styles.main}>
        <div className="main-img">
          <img
            src={landing_page}
            alt="landing page background"
            className={styles.bgImage}
          />
        </div>
        <div className={styles.mainForm}>
          {/* - TODO: logo for mobile */}
          <img src={logo} alt="Logo" className={styles.logo} />
          <Form inline className={styles.searchForm}>
            <Form.Control
              type="text"
              placeholder="Search"
              className={`${styles.searchInput} mr-sm-2`}
            />
            <Button type="submit" className={styles.searchButton}>
              <Search />
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default LandingPage;
