import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="relative w-screen h-screen bg-black flex flex-col items-center">
      <Navbar />
      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
