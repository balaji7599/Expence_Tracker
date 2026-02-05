import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import IndexPage from "./pages/Idx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import ProtectedRoute from "./components/Protectedroutes";
import { Premium } from "./components/Premium";
function App() {
const [isPremium, setIsPremium] = useState(
    localStorage.getItem("isPremium") === "true"
  );



  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isPremium={isPremium}/>}>
            <Route index element={<IndexPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<ProtectedRoute><Home isPremium={isPremium}/></ProtectedRoute>} /> {/*protected route*/}
            <Route path="/premium" element={<ProtectedRoute><Premium setIsPremium={setIsPremium}/></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
