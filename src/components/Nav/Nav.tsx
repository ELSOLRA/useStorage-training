import Logo from "../UI/Logo/Logo";
import Cart from "../../assets/cart.svg";
import Navigation from "./Navigation";
import "./nav.scss";
import { navigationLinks } from "../constants/constants";
import { useCartStore } from "../../store/cartStore";
// import { useNavigate } from "react-router-dom";
import CartModal from "../CartModal/CartModal";
import { useEffect, useState } from "react";
// import { useCountStore } from "../../store/count";

const Nav = () => {
  const { totalQuantity, setCart } = useCartStore();
  // const navigate = useNavigate();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  // const { count } = useCountStore();

  useEffect(() => {
    // Retrieve cart data from sessionStorage
    const storedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");

    // Calculate total quantity from the stored cart
    const newTotalQuantity = storedCart.reduce(
      (acc: number, item: { quantity: number }) => acc + item.quantity,
      0
    );

    // Update the total quantity in the state
    setCart({
      cart: storedCart,
      totalQuantity: newTotalQuantity,
      totalPrice: 0, // You might want to update totalPrice from sessionStorage as well
    });
  }, [setCart]);

  const openCartModal = () => {
    setCartModalOpen(true);
  };
  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  return (
    <nav className="nav">
      <Logo />
      <Navigation navigationLinks={navigationLinks} />
      <picture className="nav__image-wrapper" onClick={openCartModal}>
        <img src={Cart} alt="" />
        {totalQuantity > 0 && (
          <p className="nav__image-wrapper--count">{totalQuantity}</p>
        )}
        
      </picture>
      {cartModalOpen && (
        <CartModal onClose={closeCartModal} />
      )}
    </nav>
  );
};

export default Nav;
