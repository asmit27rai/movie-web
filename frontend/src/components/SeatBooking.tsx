import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface BookedSeats {
  [date: string]: string[];
}

const bookedSeats: BookedSeats = {
  '2024-08-15': ['A1', 'B3', 'C5'],
  '2024-08-20': ['A2', 'B4', 'D6'],
};

const SeatBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state as {
    title: string;
    description: string;
    director: string;
    rating: string;
    showtime: string;
    image: string;
  };
  
  const [selectedDate, setSelectedDate] = useState<string>('2024-08-15');
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const rows = Array.from({ length: 100 }, (_, i) => i + 1);
  const columns = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
    setSelectedSeats(new Set());
  };

  const handleSeatClick = (seat: string) => {
    if (bookedSeats[selectedDate]?.includes(seat)){
      return;
    };
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
    const data = {
      title: movie.title,
      selectedSeats: Array.from(selectedSeats),
      selectedDate,
    };
    navigate('/pay', { state: data });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-900 text-white rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">{movie.title} - Seat Booking</h1>

      <div className="mb-8">
        <label htmlFor="date" className="block text-lg font-semibold mb-2">Select Date:</label>
        <select
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-gray-800 text-white p-2 rounded-md w-full"
        >
          {Object.keys(bookedSeats).map(date => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-auto">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-[repeat(27,_minmax(0,_1fr))] gap-2 text-center">
            <div className="w-10 h-10"></div>
            {columns.map((col) => (
              <div key={col} className="text-xs font-semibold text-gray-300">{col}</div>
            ))}
            {rows.map((row) => (
              <React.Fragment key={row}>
                <div className="text-xs font-semibold text-gray-300">{row}</div>
                {columns.map((col) => {
                  const seat = `${col}${row}`;
                  const isBooked = bookedSeats[selectedDate]?.includes(seat);
                  const isSelected = selectedSeats.has(seat);
                  return (
                    <button
                      key={seat}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold ${
                        isBooked ? 'bg-red-600 cursor-not-allowed' : isSelected ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-500'
                      } text-white ${
                        isBooked ? 'opacity-70' : 'transition-colors duration-300'
                      }`}
                      onClick={() => !isBooked && handleSeatClick(seat)}
                      disabled={isBooked}
                    >
                      {row}{col}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-yellow-500 text-gray-800 px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 w-full mt-8"
      >
        Submit
      </button>
    </div>
  );
};

export default SeatBooking;