import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SeatBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state as {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    image: string;
    id: number;
    price: number;
  };

  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [bookedSeats, setBookedSeats] = useState<{ seatId: number; seatNumber: string }[]>([]);
  const [seatIdMap, setSeatIdMap] = useState<Map<string, number>>(new Map());
  const [seats, setSeats] = useState<{ seatId: number; seatNumber: string; isBooked: boolean }[]>([]);

  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }

  useEffect(() => {
    const fetchBookedSeats = async () => {
      const sessionCookie = getCookie("__session");

      if (!sessionCookie) {
        console.error("User is not logged in");
        return;
      }

      try {
        const response = await fetch(
          `https://movies-backend.aayush0325.workers.dev/api/v1/shows/seats/${movie.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionCookie}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          
          // Sort seats by their ID
          const sortedSeats = data.seats.sort((a: any, b: any) => a.seatId - b.seatId);
          
          setSeats(sortedSeats);

          const booked = sortedSeats
            .filter((seat: any) => seat.isBooked)
            .map((seat: any) => ({
              seatId: seat.seatId,
              seatNumber: seat.seatNumber,
            }));

          setBookedSeats(booked);

          const seatMap = new Map<string, number>();
          sortedSeats.forEach((seat: any) => {
            seatMap.set(seat.seatNumber, seat.seatId);
          });
          setSeatIdMap(seatMap);
        } else {
          console.log("Failed to fetch seat status.");
        }
      } catch (error) {
        console.log("Failed to fetch seat status.");
      }
    };
    fetchBookedSeats();
  }, [movie.id]);

  const handleSeatClick = (seat: string) => {
    if (bookedSeats.some((bookedSeat) => bookedSeat.seatNumber === seat)) {
      return; // Seat is booked
    }
    setSelectedSeats((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(seat)) {
        newSet.delete(seat);
      } else {
        newSet.add(seat);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    const selectedSeatData = Array.from(selectedSeats).map((seatNumber) => ({
      seatNumber,
      seatId: seatIdMap.get(seatNumber) || null, // Get the corresponding seatId
    }));

    const data = {
      movie,
      selectedSeats: selectedSeatData,
    };

    navigate("/pay", { state: data });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-900 text-white rounded-lg shadow-2xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">{movie.title} - Seat Booking</h1>
      <h2 className="text-xl font-semibold mb-6 text-center">Price: {movie.price} INR Per Seat</h2>

      <div className="overflow-x-auto mb-8">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-10 gap-2">
            {seats.map((seat) => {
              const isBooked = seat.isBooked;
              const isSelected = selectedSeats.has(seat.seatNumber);
              return (
                <button
                  key={seat.seatNumber}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isBooked
                      ? "bg-red-600 cursor-not-allowed"
                      : isSelected
                      ? "bg-green-500"
                      : "bg-gray-600 hover:bg-gray-500"
                  } text-white ${
                    isBooked
                      ? "opacity-70"
                      : "transition-colors duration-300"
                  }`}
                  onClick={() => !isBooked && handleSeatClick(seat.seatNumber)}
                  disabled={isBooked}
                >
                  {seat.seatNumber}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleSubmit}
          className="bg-yellow-500 text-gray-800 px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SeatBooking;
