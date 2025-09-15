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
    const newCart = {
      ...cart,
      products: [...cart.products, item],
    };
    setCart(newCart);
    fetch(`https://fakestoreapi.com/carts/${cart.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCart),
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  }

  return (
    <div>
      <h1>Store</h1>
      {items.map((item) => (
        <ProductCard key={item.id} {...item}>
          <button
            onClick={() => handleAddToCart({ productId: item.id, quantity: 1 })}
            data-testid={"Add to Cart " + item.id}
          >
            Add to Cart
          </button>
          {/* FIXME quantity is a placeholder here */}
        </ProductCard>
      ))}
    </div>
  );
}
