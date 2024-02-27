import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  totalQuantity: number;
  totalPrice: number; // Added totalPrice to the interface
  // addToCart: (product: CartItem) => void;
  setCart: (state: { cart: CartItem[]; totalQuantity: number; totalPrice: number,  }) => void;
}

export const useCartStore = create<CartStore>((set) => {
  // Load cart data from session storage
  const storedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');

  return {
    cart: storedCart,
    totalQuantity: 0,
    totalPrice: 0,
   /*  addToCart: (product) =>
      set((state) => {
        const existingProduct = state.cart.find((p) => p.id === product.id);
        if (existingProduct) {
          // If product already exists in the cart, updates the quantity and total price
          return {
            cart: state.cart.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
            totalQuantity: state.totalQuantity + 1,
            totalPrice: state.totalPrice + parseInt(product.price),
          };
        } else {
          // If product does not exist in the cart, adding a new entry
          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
            totalQuantity: state.totalQuantity + 1,
            totalPrice: state.totalPrice + parseInt(product.price),
          };
        }
      }), */
    setCart: (state) => {
      // Save cart data to session storage
      sessionStorage.setItem("cart", JSON.stringify(state.cart));

      // Update the cart state
      set(state);
    },
  };
});

export default useCartStore;