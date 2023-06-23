import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Menswear from "./Components/Menswear";
import WomensWear from "./Components/WomensWear";
import TextPage from "./Components/TextPage";
import Cart from "./Components/Cart";
import Signup from "./Components/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mens-wear" element={<Menswear />} />
        <Route path="/womens-wear" element={<WomensWear />} />
        <Route path="/text" element={<TextPage/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/signup" element={<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
