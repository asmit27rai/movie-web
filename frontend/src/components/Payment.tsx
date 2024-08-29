import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { movie, selectedSeats } = location.state as {
    movie: {
      title: string;
      description: string;
      startTime: string;
      endTime: string;
      image: string;
      id: number;
      price: number;
    };
    selectedSeats: { seatId: number; seatNumber: string }[];
  };

  const totalAmount = selectedSeats.length * movie.price;

  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }

  const handlePayment = async () => {
    const sessionCookie = getCookie("__session");
  
    if (!sessionCookie) {
      console.error("User is not logged in");
      return;
    }
  
    const data = {
      showtimeId: movie.id,
      seatIds: selectedSeats.map(seat => seat.seatId)
    };
  
    try {
      const response = await fetch(
        "https://movies-backend.aayush0325.workers.dev/api/v1/shows/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionCookie}`,
          },
          body: JSON.stringify(data),
        }
      );
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
  
        toast({
          title: "Payment Successful",
          description: "Thank you for your booking!",
        });
  
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
  
        toast({
          title: "Payment Failed",
          description: errorData.message || "There was an issue with your payment. Please try again.",
        });
      }
    } catch (error) {
      console.error("Payment failed:", error);
  
      toast({
        title: "Payment Failed",
        description: "There was an issue with your payment. Please try again.",
      });
    }
  };  

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-500">
        Payment Details
      </h1>
      <div className="flex flex-col items-center mb-8">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-64 h-96 object-cover rounded-lg shadow-md mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
        <p className="text-gray-400 mb-4">{movie.description}</p>
        <div className="text-lg font-semibold mb-2">
          Seats:{" "}
          <span className="text-yellow-500">
            {selectedSeats
              .map((seat) => `${seat.seatNumber} (ID: ${seat.seatId})`)
              .join(", ")}
          </span>
        </div>
        <div className="text-lg font-semibold">
          Total Amount:{" "}
          <span className="text-yellow-500">{totalAmount} INR</span>
        </div>
      </div>
      <button
        onClick={handlePayment}
        className="bg-yellow-500 text-gray-800 px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 w-full mt-4 font-bold"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
