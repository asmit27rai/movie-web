import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SigninPage from "./components/SigninPage";
import ContactUs from "./components/ContactUs";
import SeatBooking from "./components/SeatBooking";
import Payment from "./components/Payment";
import AdminPage from "./components/AdminPage";
import { Toaster } from "./components/ui/toaster";
import { useAuth } from "@/AuthContext";

function App() {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <SigninPage />;
  }

  return (
    <Router>
      <header>
        <SignedOut>
          <SigninPage />
        </SignedOut>
        <SignedIn>
          <div className="relative bg-black flex flex-col items-center">
            {role === 'user' && <Navbar />}
            <Toaster />
            <Routes>
              <Route path="/" element={role === 'admin' ? <Navigate to="/admin" /> : <Home />} />
              <Route path="/contact" element={role === 'admin' ? <Navigate to="/admin" /> : <ContactUs />} />
              <Route path="/seats" element={role === 'admin' ? <Navigate to="/admin" /> : <SeatBooking />} />
              <Route path="/pay" element={role === 'admin' ? <Navigate to="/admin" /> : <Payment />} />
              <Route path="/admin" element={role === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
            </Routes>
          </div>
        </SignedIn>
      </header>
    </Router>
  );
}

export default App;
