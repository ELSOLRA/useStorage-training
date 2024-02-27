import { useParams } from "react-router-dom";
import { Props } from "../components/Card/Card";
import { data, imageString } from "../components/constants/constants";
import "./product.scss";
import { useState } from "react";

import { CartItem, useCartStore } from "../store/cartStore";


const Product = () => {
  const { id } = useParams<{ id?: string }>();
  const [show, setShow] = useState(false);
  const {  setCart, cart, totalQuantity, totalPrice } = useCartStore();
 
 

  const pokemon = data.find((pokemon) => pokemon.id === id);

  if (!pokemon) {
   
    return <p>NO Pokemon to you!!!</p>;
  }

  const { desc, name, buttonText, price } = pokemon as Props;

  const handleClick = () => {
    setShow((prevValue) => !prevValue);
  };
  const handleAddToCart = () => {
    if (id !== undefined) {
      const existingProduct = cart.find((item) => item.id === id);
  
      if (existingProduct) {
        // If product already exists in the cart, updating the quantity
        setCart({
          cart: cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          totalQuantity: totalQuantity + 1,
          totalPrice: totalPrice + parseInt(price),
        });
      } else {
        // If product does not exist in the cart, adding a new entry
        const cartItem: CartItem = {
          id: id,
          name,
          price,
          quantity: 1,
        };
  
        setCart({
          cart: [...cart, cartItem],
          totalQuantity: totalQuantity + 1,
          totalPrice: totalPrice + parseInt(price),
        });
      }
    }
  };
  
  return (
    <section className="product-wrapper">
      <picture>
        <img src={imageString} alt="" />
      </picture>
      <article className="product-wrapper__product-info">
        {show && (
          <>
            <h4>{name}</h4>
            <p>{desc}</p>
            <p>{price}</p>
            <button className="cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
          </>
        )}
        <button onClick={handleClick}>{buttonText}</button>
      </article>
    </section>
  );
  };

export default Product;
