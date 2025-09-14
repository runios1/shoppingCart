import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ProductCard from "../ProductCard/ProductCard";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cart] = useOutletContext();
  console.log(cart);

  useEffect(() => {
    const fetchPromises = cart.products.map((item) =>
      fetch(`https://fakestoreapi.com/products/${item.productId}`).then(
        (response) => response.json()
      )
    );
    Promise.all(fetchPromises).then((allItems) => {
      setCartItems(allItems);
    });
  }, []);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
}
