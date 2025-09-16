import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ProductCard from "../ProductCard/ProductCard";
import { updateCart } from "../../utils/cartFunctions";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useOutletContext();

  useEffect(() => {
    const fetchPromises = cart.products.map((item) =>
      fetch(`https://fakestoreapi.com/products/${item.productId}`)
        .then((response) => response.json())
        .then((response) => ({ ...response, quantity: item.quantity }))
    );
    Promise.all(fetchPromises).then((allItems) => {
      setCartItems(allItems);
    });
  }, [cart.products]);

  function calculateTotal() {
    let total = 0;
    cartItems.map((item) => (total += item.price * item.quantity));
    return total;
  }

  function changeItemQuantity(itemID, newQuantity) {
    const itemIndex = cart.products.findIndex(
      (product) => product.productId === itemID
    );
    const updatedProducts = [...cart.products];
    updatedProducts[itemIndex] = {
      ...updatedProducts[itemIndex],
      quantity: newQuantity,
    };
    updateCart(cart.id, setCart, { ...cart, products: updatedProducts });
  }

  function deleteItem(itemID) {
    updateCart(cart.id, setCart, {
      ...cart,
      products: cart.products.filter((product) => product.productId !== itemID),
    });
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div>
        {cartItems.map((item) => (
          <ProductCard key={item.id} {...item}>
            <label>
              Qty:
              <input
                type="number"
                min="1"
                max="10"
                value={item.quantity}
                onChange={(e) =>
                  changeItemQuantity(
                    item.id,
                    Math.max(1, Math.min(10, Number(e.target.value)))
                  )
                }
              />
            </label>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </ProductCard>
        ))}
      </div>
      <h3>Your total is: {calculateTotal()} USD</h3>
    </div>
  );
}
