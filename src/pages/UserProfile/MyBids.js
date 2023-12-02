import MainNavbar from "../../components/MainNavbar/MainNavbar";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";
import styles from "./UserProfilePage.module.css";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import axios from "axios";
import { useLocation } from "react-router-dom";

const baseUrl = "http://localhost:8080";

function MyBidsPage() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(
    location.state?.userDetails
      ? location.state?.userDetails
      : localStorage.getItem("userDetails")
  );

  useEffect(() => {
    if (!userDetails) {
      const storedDetails = localStorage.getItem("userDetails");
      if (storedDetails) {
        setUserDetails(JSON.parse(storedDetails));
      }
    }
  }, [userDetails]);
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/products/user/bids/${
          JSON.parse(localStorage.getItem("userDetails")).userId
        }`
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching products: ", error);
      });
  }, [userDetails.userId]);

  return (
    <>
      <MainNavbar />
      <div className={styles.main}>
        <div className={styles.appContainer}>
          <LeftColumnProfile />
          <div className={`${styles.rightColumn} `}>
            <div className={styles.searchResultsContainer}>
              {products.length === 0 ? (
                <div className={styles.noProductsMessage}>
                  No products to display.
                </div>
              ) : (
                <ProductList products={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBidsPage;
