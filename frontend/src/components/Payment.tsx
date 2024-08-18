import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { title, selectedSeats, selectedDate } = location.state as {
    title: string;
    selectedSeats: string[];
    selectedDate: string;
  };

  const seatNumbers = selectedSeats;
  const date = new Date(selectedDate).toLocaleDateString();
  const price = seatNumbers.length * 10; // Assume $10 per seat

  const handlePaymentClick = () => {
    toast({
      title: "Payment Successful",
      description: "Thank you for your booking!",
    })
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center py-10">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-500">Payment Summary</h2>
        
        <div className="mb-6">
          <p className="text-lg font-light">Movie Name:</p>
          <p className="text-2xl font-semibold">{title}</p>
        </div>
        
        <div className="mb-6">
          <p className="text-lg font-light">Date:</p>
          <p className="text-2xl font-semibold">{date}</p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-light">Selected Seats:</p>
          <p className="text-2xl font-semibold">{seatNumbers.join(', ')}</p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-light">Total Price:</p>
          <p className="text-2xl font-semibold">${price.toFixed(2)}</p>
        </div>

        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mt-6"
          onClick={handlePaymentClick}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
