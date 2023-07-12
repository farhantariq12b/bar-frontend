import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppNavBar from "./layout/navbar";
import { Container } from "reactstrap";
import { CreateProduct } from "./components/create-product";
import { Deals } from "./pages/deals";
import { MakeADeal } from "./components/make-deal";
import { MakeOrder } from "./components/make-order";
import { Orders } from "./pages/orders";
import { Products } from "./pages/products";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function App() {
  useEffect(() => {
    if (!localStorage.getItem("user_id")) {
      localStorage.setItem("user_id", generateString(10));
    }
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
