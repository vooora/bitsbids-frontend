import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import landing_page from "../../assets/landing-page.svg";
import bids_logo from "../../assets/bids.png";
import bits_logo from "../../assets/bits.png";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import ProductList from "../../components/ProductList/ProductList";
import styles from "./LandingPage.module.css";
import MessageDisplay from "../../components/MessageDisplay/MessageDisplay";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (shouldNavigate) {
      navigate(`/search?query=${searchQuery}`);
      setShouldNavigate(false);
      setSearchQuery("");
    }
  }, [shouldNavigate, searchQuery, navigate]);

  const handleSubmit = (searchQuery) => {
    setShouldNavigate(true);
  };

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
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <ProductList products={products} />
    </Container>
    
  );
}

export default LandingPage;
