import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const movieName = "Inception";
  const seatNumbers = ['A1', 'A2', 'A3'];
  const date = "August 20, 2024";
  const price = 30.00;
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center py-10">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-500">Payment Summary</h2>
        
        <div className="mb-6">
          <p className="text-lg font-light">Movie Name:</p>
          <p className="text-2xl font-semibold">{movieName}</p>
        </div>
        
        <div className="mb-6">
          <p className="text-lg font-light">Seat Numbers:</p>
          <p className="text-2xl font-semibold">{seatNumbers.join(', ')}</p>
        </div>
        
        <div className="mb-6">
          <p className="text-lg font-light">Date:</p>
          <p className="text-2xl font-semibold">{date}</p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-light">Price:</p>
          <p className="text-2xl font-semibold">${price.toFixed(2)}</p>
        </div>

        <div className="mb-8">
          <p className="text-lg font-light mb-3">Payment Option:</p>
          <select className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300">
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>PayPal</option>
            <option>Google Pay</option>
          </select>
        </div>

        <button onClick={handlePayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:translate-y-1">
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
