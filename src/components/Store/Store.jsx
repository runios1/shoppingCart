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

  function handleAddToCart(itemId) {
    const itemIndex = cart.products.findIndex(
      (product) => product.productId === itemId
    );
    if (itemIndex === -1)
      updateCart({
        ...cart,
        products: [...cart.products, { productId: itemId, quantity: 1 }],
      });
    else {
      const updatedProducts = [...cart.products];
      updatedProducts[itemIndex] = {
        ...updatedProducts[itemIndex],
        quantity: updatedProducts[itemIndex].quantity + 1,
      };
      updateCart({
        ...cart,
        products: updatedProducts,
      });
    }
  }

  function updateCart(newCart) {
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
