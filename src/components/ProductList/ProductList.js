import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

function ProductList() {
  return (
    <div className={styles.productContainer}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default ProductList;
