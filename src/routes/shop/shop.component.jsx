import { ProductsContext } from "../../context/product.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";
import { useContext } from "react";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  if (!products) {
    return <div> Loading...</div>;
  }

  return (
    <div className="products-container">
      {products.map(({ id, ...otherCollectionProps }) => (
        <ProductCard key={id} product={otherCollectionProps} />
      ))}
    </div>
  );
};

export default Shop;
