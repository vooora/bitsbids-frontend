import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

function ProductList({ products }) {
  return (
    <div className={styles.productContainer}>
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
