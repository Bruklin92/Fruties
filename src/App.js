import { Route, Routes } from "react-router-dom";
import Footer from "./component/Footer/Footer";
import Hader from "./component/Hader/Hader";
import Error from "./container/404/Error";
import Cart from "./container/Cart/Cart";
import Chackout from "./container/Chackout/Chackout";
import Contetct from "./container/Contetct/Contetct";
import Home from "./container/Home/Home";
import Shop_Detail from "./container/Shop-Detail/Shop_Detail";
import Shop from "./container/Shop/Shop";
import Tastimonial from "./container/Tastimonial/Tastimonial";

function App() {
  return (
   <>
   <Hader />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contect" element={<Contetct/>} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/chackout" element={<Chackout />} />
    <Route path="/contect" element={<Contetct />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/shop/:id" element={<Shop_Detail />} />
    <Route path="/tastimonial" element={<Tastimonial />} />
    <Route path="/error" element={<Error />} />
    </Routes>
   <Footer />
   </>
  );
}

export default App;
