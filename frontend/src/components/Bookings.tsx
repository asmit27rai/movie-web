import React, { useEffect, useState } from 'react';

interface Booking {
  theatreName: string;
  movieName: string;
  seats: string[];
}

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const sessionCookie = getCookie("__session");

      if (!sessionCookie) {
        setError("You are not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://movies-backend.aayush0325.workers.dev/api/v1/users/bookings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionCookie}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBookings(data.bookings);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

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
                <h2 className="text-xl font-semibold">{booking.movieName}</h2>
                <p className="text-sm text-gray-300">Theatre: {booking.theatreName}</p>
                <p className="text-sm text-gray-300">Seats: {booking.seats.join(', ')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
