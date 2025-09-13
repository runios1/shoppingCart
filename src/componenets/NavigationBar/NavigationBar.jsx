import { Link } from "react-router-dom";
import { House, Store, ShoppingCart } from "lucide-react";

export default function NavigationBar({ cartItemNumber }) {
  return (
    <>
      <Link to="/">
        <House />
      </Link>
      <Link to="/store">
        <Store />
      </Link>
      <Link to="/cart">
        <ShoppingCart />
        {cartItemNumber > 0 && <span>{cartItemNumber}</span>}
      </Link>
    </>
  );
}
