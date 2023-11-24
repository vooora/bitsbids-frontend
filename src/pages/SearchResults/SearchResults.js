import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import ProductList from "../../components/ProductList/ProductList";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./SearchResults.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const baseUrl = "http://localhost:8080";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("query");
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery || "");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchQuery(urlSearchQuery || "");
  }, [urlSearchQuery]);

  const fetchProducts = async (query) => {
    try {
      const searchResponse = await axios.get(
        `${baseUrl}/api/products/search?query=${query}`
      );
      const productIds = searchResponse.data.map((product) => product.id);

      const detailsResponse = await axios.post(
        `${baseUrl}/products/bulk`,
        productIds
      );
      setProducts(detailsResponse.data);
    } catch (error) {
      console.log("Error in product search or detail retrieval: ", error);
    }
  };

  useEffect(() => {
    if (urlSearchQuery) {
      fetchProducts(urlSearchQuery);
    }
  }, [urlSearchQuery]);

  const handleSearch = async (event) => {
    event.preventDefault();
    navigate(`?query=${searchQuery}`);
    fetchProducts(searchQuery);
  };

  return (
    <Container fluid className="p-0">
      <MainNavbar />

      <div className={styles.searchBarContainer}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSubmit={handleSearch}
        />
      </div>
      <div className={styles.searchResultsContainer}>
        {products.length === 0 ? (
          <div className={styles.noProductsMessage}>
            No products to display.
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </Container>
  );
}

export default SearchResults;
