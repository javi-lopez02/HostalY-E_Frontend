import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/navbar/NavBar";
import Home from "./pages/Home";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/auth.context";
import { NextUIProvider } from "@nextui-org/react";
import Page404 from "./pages/404Page";
import { Toaster } from "sonner";
import Oferts from "./pages/Oferts";
import Gastronomics from "./pages/Gastronomics";
import Desserts from "./pages/Desserts";
import Drinks from "./pages/Drinks";
import Snacks from "./pages/Snacks";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import ContactUs from "./pages/ContactUs";
import CarShop from "./pages/CarShop";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster richColors expand={true} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Page404 />} />

            <Route element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/oferts" element={<Oferts />} />
              <Route path="/gastronomics" element={<Gastronomics />} />
              <Route path="/desserts" element={<Desserts />} />
              <Route path="/drinks" element={<Drinks />} />
              <Route path="/snacks" element={<Snacks />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<ContactUs />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/carShop" element={<CarShop />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
