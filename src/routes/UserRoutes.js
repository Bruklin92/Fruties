import React from "react";
import Hader from "../component/Hader/Hader";
import { Route, Routes } from "react-router-dom";
import Home from "../container/Home/Home";
import Cart from "../container/Cart/Cart";
import Chackout from "../container/Chackout/Chackout";
import Shop from "../container/Shop/Shop";
import Shop_Detail from "../container/Shop-Detail/Shop_Detail";
import Tastimonial from "../container/Tastimonial/Tastimonial";
import Error from "../container/404/Error";
import Footer from "../component/Footer/Footer";
import Contect from "../container/Contect/Contect";

function UserRoutes(props) {
  return (
    <>
      <Hader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/chackout" element={<Chackout />} />
        <Route path="/Contect" element={<Contect />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Shop_Detail />} />
        <Route path="/tastimonial" element={<Tastimonial />} />
        <Route path="/error" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRoutes;
