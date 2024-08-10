import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <header>
    <SignedOut>
      <SignInButton />
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
