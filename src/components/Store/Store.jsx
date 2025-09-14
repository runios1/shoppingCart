import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ProductCard from "../ProductCard/ProductCard";

export default function Store() {
  const [cart, setCart] = useOutletContext();
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  function handleAddToCart(item) {
    setCart({
      ...cart,
      products: [...cart.products, item],
    });
  }

  return (
    <div>
      <h1>Store</h1>
      <ul>
        {items.map((item) => (
          <ProductCard key={item.id} {...item}>
            <button
              onClick={() =>
                handleAddToCart({ productId: item.id, quantity: 1 })
              }
            >
              Add to Cart
            </button>
            {/* FIXME quantity is a placeholder here */}
          </ProductCard>
        ))}
      </ul>
    </div>
  );
}
