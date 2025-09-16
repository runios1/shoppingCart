export function updateCart(cartID, setCart, newCart) {
  setCart(newCart);
  fetch(`https://fakestoreapi.com/carts/${cartID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCart),
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
}
