import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isVisible: true,
  setIsVisible: () => null,
  cartItems: [],
  addItemToCart: () => null,
  cartCount: 0,
});

const AddItem = (cartItems, productToAdd) => {
  //  find if item already exists in cart

  const existingItem = cartItems.find((item) => item.id === productToAdd.id);

  // if item already exists then increment quantity
  if (existingItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }
  // Return Array with new item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0),
    );
  }, [cartItems]);

  const addItemToCart = (item) => {
    setCartItems(AddItem(cartItems, item));
  };

  return (
    <CartContext.Provider
      value={{ isVisible, setIsVisible, addItemToCart, cartItems, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
