import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ProductCard from "../ProductCard/ProductCard";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cart] = useOutletContext();

  useEffect(() => {
    const fetchPromises = cart.products.map((item) =>
      fetch(`https://fakestoreapi.com/products/${item.productId}`)
        .then((response) => response.json())
        .then((response) => ({ ...response, quantity: item.quantity }))
    );
    Promise.all(fetchPromises).then((allItems) => {
      setCartItems(allItems);
    });
  }, []);

  function calculateTotal() {
    let total = 0;
    cartItems.map((item) => (total += item.price * item.quantity));
    return total;
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div>
        {cartItems.map((item) => (
          <ProductCard key={item.id} {...item}>
            <p>Qty: {item.quantity}</p>
          </ProductCard>
        ))}
      </div>
      <h3>Your total is: {calculateTotal()} USD</h3>
    </div>
  );
}
