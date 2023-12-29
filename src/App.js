import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";

import { UserProvider } from "./context/user.context";
import { ProductProvider } from "./context/product.context";
import { CartProvider } from "./context/cart.context";

const App = () => {
  return (
    <ProductProvider>
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="auth" element={<Authentication />} />
            </Route>
          </Routes>
        </CartProvider>
      </UserProvider>
    </ProductProvider>
  );
};

export default App;
