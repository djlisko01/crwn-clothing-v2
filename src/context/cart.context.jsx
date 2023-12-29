import { createContext, useState } from "react";

export const CartContext = createContext({
  isVisible: true,
  setIsVisible: () => null,
});

export const CartProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <CartContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </CartContext.Provider>
  );
};
