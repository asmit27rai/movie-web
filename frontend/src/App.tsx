import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SigninPage from "./components/SigninPage";
import ContactUs from "./components/ContactUs";
import SeatBooking from "./components/SeatBooking";
import Payment from "./components/Payment";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <header>
        <SignedOut>
          <SigninPage />
        </SignedOut>
        <SignedIn>
          <div className="relative bg-black flex flex-col items-center">
            <Navbar />
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/seats" element={<SeatBooking />} />
              <Route path="/pay" element={<Payment />} />
            </Routes>
          </div>
        </SignedIn>
      </header>
    </Router>
  );
}

export default App;
