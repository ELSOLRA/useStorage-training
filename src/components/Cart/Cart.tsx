
import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import "./cart.scss"


const Cart = () => {
    const { cart, totalQuantity, setCart } = useCartStore();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
  
      const storedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
      setCart(storedCart);
    }, [setCart]);

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
  
    useEffect(() => {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart,  setCart]);
  

  return (
    <section className="cart">
      <h2>Men, it's your cart!Take It!</h2>
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
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Price: ${totalPrice}</p>
    </section>
  );
};

  export default Cart;