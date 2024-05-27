import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../Store/CartContext";
import { useContext } from "react";
import UserProgressContext from "../Store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowcart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button onClick={handleShowcart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
