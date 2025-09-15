import { Link } from "react-router-dom";
import { House, Store, ShoppingCart } from "lucide-react";

export default function NavigationBar({ cartItemCount }) {
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
        {cartItemCount > 0 && <span>{cartItemCount}</span>}
      </Link>
    </>
  );
}
