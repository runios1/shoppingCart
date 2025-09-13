import { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";

export default function Store() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div>
      <h1>Store</h1>
      <ul>
        {items.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
          />
        ))}
      </ul>
    </div>
  );
}
