import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import landing_page from "../../assets/landing-page.svg";
import bids_logo from "../../assets/bids.png";
import bits_logo from "../../assets/bits.png";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import ProductList from "../../components/ProductList/ProductList";
import { Search } from "@material-ui/icons";
import styles from "./LandingPage.module.css";
import MessageDisplay from "../../components/MessageDisplay/MessageDisplay";

const baseUrl = "http://localhost:8080";

function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching products: ", error);
      });
  }, []);

  return (
    <Container fluid className={`${styles.containerClass} p-0`}>
      <MainNavbar />
      <MessageDisplay />
      <div className={styles.main}>
        <img
          src={landing_page}
          alt="landing page background"
          className={styles.bgImage}
        />
        <div className={styles.mainForm}>
          <div className={styles.logo}>
            <img src={bits_logo} alt="Logo" className={styles.logoPart1} />
            <img src={bids_logo} alt="Logo" className={styles.logoPart2} />
          </div>
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
      <ProductList products={products} />
    </Container>
  );
}

export default LandingPage;
