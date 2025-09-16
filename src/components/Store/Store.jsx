import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ProductCard from "../ProductCard/ProductCard";
import { updateCart } from "../../utils/cartFunctions";

export default function Store() {
  const [cart, setCart] = useOutletContext();
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  function handleAddToCart(itemId) {
    const itemIndex = cart.products.findIndex(
      (product) => product.productId === itemId
    );
    if (itemIndex === -1)
      updateCart(cart.id, setCart, {
        ...cart,
        products: [...cart.products, { productId: itemId, quantity: 1 }],
      });
    else {
      const updatedProducts = [...cart.products];
      updatedProducts[itemIndex] = {
        ...updatedProducts[itemIndex],
        quantity: updatedProducts[itemIndex].quantity + 1,
      };
      updateCart(cart.id, setCart, {
        ...cart,
        products: updatedProducts,
      });
    }
  }

  return (
    <div>
      <h1>Store</h1>
      {items.map((item) => (
        <ProductCard key={item.id} {...item}>
          <button
            onClick={() => handleAddToCart(item.id)}
            data-testid={"Add to Cart " + item.id}
          >
            Add to Cart
          </button>
        </ProductCard>
      ))}
    </div>
  );
}
