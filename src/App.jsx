import NavigationBar from "./componenets/NavigationBar/NavigationBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const cartID = 1;

  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/carts/${cartID}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => setCart(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading in progress</p>;
  if (error) return <p>Network error, try again later</p>;

  return (
    <>
      <NavigationBar cartItemCount={cart.products.length} />
      <main>
        <Outlet context={[cart, setCart]} />
      </main>
    </>
  );
}

export default App;
