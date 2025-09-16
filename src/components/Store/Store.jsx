import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ProductCard from "../ProductCard/ProductCard";
import { updateCart } from "../../utils/cartFunctions";

export default function Store() {
  const [cart, setCart] = useOutletContext();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
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

  if (loading) return <p>Loading in progress</p>;
  if (error) return <p>Network error, try again later</p>;

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
