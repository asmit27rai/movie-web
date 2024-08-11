import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SigninPage from "./components/SigninPage";

function App() {
  return (
    <header>
    <SignedOut>
      <SigninPage />
    </SignedOut>
    <SignedIn>
    <div className="relative bg-black flex flex-col items-center">
      <Navbar />
      <div>
        <Home />
      </div>
    </div>
    </SignedIn>
  </header>
  );
}

export default App;
