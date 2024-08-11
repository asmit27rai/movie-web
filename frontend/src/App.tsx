import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SigninPage from "./components/SigninPage";
import ContactUs from "./components/ContactUs";
import SeatBooking from "./components/SeatBooking";

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/seats" element={<SeatBooking />} />
            </Routes>
          </div>
        </SignedIn>
      </header>
    </Router>
  );
}

export default App;
