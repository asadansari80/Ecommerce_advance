import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatePassword from "./Pages/UpdatePassword";
import CreateProduct from "./Pages/product/CreateProduct";
import ProductWrapper from "./Pages/product/ProductWrapper";
import ProductDetails from "./Pages/product/ProductDetails";
import EditProduct from "./Pages/product/EditProduct";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/UpdatePassword" element={<UpdatePassword />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
          <Route path="/Product" element={<ProductWrapper />} />
          {/* for dynamic id we use colan */}
          <Route path="/Product/:productId" element={<ProductDetails />} />
          <Route path="/Product/:productId/edit" element={<EditProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
