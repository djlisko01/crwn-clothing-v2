import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from "./routes/authentication/authentication.component";


import { UserProvider } from "./context/user.context";

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
