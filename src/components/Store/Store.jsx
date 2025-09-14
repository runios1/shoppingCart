import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

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
          <div key={item.id}>
            <img src={item.image} />
            <h3>{item.title}</h3>
            <p>{item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
