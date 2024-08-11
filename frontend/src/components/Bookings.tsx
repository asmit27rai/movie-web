import React from 'react';

interface Booking {
  movieTitle: string;
  date: string;
  seatNumber: string;
}

const BookingsPage: React.FC = () => {
  const bookings: Booking[] = [
    { movieTitle: 'Inception', date: '2024-08-15', seatNumber: 'A12' },
    { movieTitle: 'The Matrix', date: '2024-08-20', seatNumber: 'B07' },
    { movieTitle: 'Interstellar', date: '2024-08-25', seatNumber: 'C05' },
    { movieTitle: 'Avatar', date: '2024-09-01', seatNumber: 'D10' },
    { movieTitle: 'The Dark Knight', date: '2024-09-05', seatNumber: 'E08' },
    { movieTitle: 'Forrest Gump', date: '2024-09-10', seatNumber: 'F04' },
    { movieTitle: 'Pulp Fiction', date: '2024-09-15', seatNumber: 'G03' },
    { movieTitle: 'Fight Club', date: '2024-09-20', seatNumber: 'H06' },
    { movieTitle: 'The Shawshank Redemption', date: '2024-09-25', seatNumber: 'I11' },
  ];

  return (
    <div className="bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>
      <div
        className="mx-auto h-[400px] overflow-y-scroll max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>
          {`
            .custom-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {bookings.length === 0 ? (
          <p className="text-center text-lg">You have no bookings at the moment.</p>
        ) : (
          <ul className="space-y-4 custom-scrollbar">
            {bookings.map((booking, index) => (
              <li key={index} className="bg-gray-900 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{booking.movieTitle}</h2>
                <p className="text-sm text-gray-300">Date: {booking.date}</p>
                <p className="text-sm text-gray-300">Seat Number: {booking.seatNumber}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
