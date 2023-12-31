import MainNavbar from "../../components/MainNavbar/MainNavbar";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";
import styles from "./UserProfilePage.module.css";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

function MySalesPage() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
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
    } else {
    }
  }, [userDetails, navigate]);
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/products/user/${
          JSON.parse(localStorage.getItem("userDetails")).userId
        }`
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {});
  }, [userDetails.userId, navigate]);

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

export default MySalesPage;
