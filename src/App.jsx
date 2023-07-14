import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  getUserIdFromLocalStorage,
  setUserIdInLocalStorage,
} from "./helpers/localStorage";
import { useEffect, useState } from "react";

import AppNavBar from "./layout/navbar";
import { Container } from "reactstrap";
import { CreateProduct } from "./components/create-product";
import { Deals } from "./pages/deals";
import { MakeADeal } from "./components/make-deal";
import { MakeOrder } from "./components/make-order";
import { OrderNotifications } from "./components/OrderNotifications";
import { Orders } from "./pages/orders";
import { Products } from "./pages/products";
import { Toaster } from "react-hot-toast";
import { generateString } from "./helpers/functions";

function App() {
  const [userId, setUserId] = useState(getUserIdFromLocalStorage());
  useEffect(() => {
    if (getUserIdFromLocalStorage()) {
      return;
    }
    const userId = generateString(10);
    setUserIdInLocalStorage(userId);
    setUserId(userId);
  }, []);
  return (
    <BrowserRouter>
      <Toaster
        position={"top-right"}
        toastOptions={{
          duration: 5000,
        }}
      />
      <AppNavBar />
      <Container className="mt-3">
        <OrderNotifications userId={userId} />
        <Routes>
          <Route index path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/create" element={<MakeADeal />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/create" element={<MakeOrder />} />
          <Route path="*" element={"Page not found"} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
