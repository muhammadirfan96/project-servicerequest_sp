import Home from "../page/Home.jsx";
import NotFound from "../page/NotFound.jsx";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import ForgotPassword from "../auth/ForgotPassword.jsx";
import ActivationUser from "../auth/ActivationUser.jsx";
import ResetPassword from "../auth/ResetPassword.jsx";
import { Routes, Route } from "react-router-dom";
import PunagayaDetection from "../page/punagaya/Detection.jsx";
import PunagayaPrediction from "../page/punagaya/Prediction.jsx";
import About from "../page/About.jsx";
import Contact from "../page/Contact.jsx";

const Container = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 mx-auto mt-[64px] overflow-x-auto pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/punagaya/detection" element={<PunagayaDetection />} />
          <Route path="/punagaya/prediction" element={<PunagayaPrediction />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/activation-user/:email" element={<ActivationUser />} />
          <Route path="/reset-password/:email" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default Container;
