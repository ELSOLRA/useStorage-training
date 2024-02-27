import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import "./cartModal.scss";
import { useEffect, useState } from "react";

interface CartModalProps {
    onClose: () => void;
  }

  const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const { cart, totalQuantity, setCart } = useCartStore();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    let quantity = 0;
    let price = 0;

    cart.forEach((item) => {
      quantity += item.quantity;
      const priceString = item.price;
      price += parseInt(priceString.replace(/[^0-9.]/g, '')) * item.quantity; 
    });


    setTotalPrice(price);
  }, [cart]);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {

    onClose();
  };

  const handleToCartClick = () => {
     navigate("/cart");
  }

  const handleRemoveItem = (itemId: string) => {

    const itemIndex = cart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
        //  the cart array copy is to avoid mutating the state directly
        const updatedCart = [...cart];
  
        // decrease the quantity 
        updatedCart[itemIndex].quantity--;
  
        // If the quantity zero, remove the item from the cart
        if (updatedCart[itemIndex].quantity <= 0) {
          updatedCart.splice(itemIndex, 1);
        }

        setCart({
            cart: updatedCart,
            totalQuantity: totalQuantity - 1,
            totalPrice: totalPrice - (parseInt(cart[itemIndex].price) * 1),
          });

        }

  }

  return (
    <div className="cart-modal" onClick={handleOverlayClick}>
      <div className="cart-modal__content"  onClick={handleModalClick}>

        <h2>YOUR CART</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}{" "}
                    <button onClick={() => handleRemoveItem(item.id)}>
                    Remove
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Price: ${totalPrice}</p>
        <button className="cart-modal--chart-btn" onClick={handleToCartClick}>TO MY CART</button>
      </div>

    </div>
  );
};

export default CartModal;