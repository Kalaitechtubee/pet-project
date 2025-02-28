import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart details from localStorage
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedTotal = localStorage.getItem('totalAmount') || '0';
    setCartItems(storedItems);
    setTotalAmount(parseFloat(storedTotal));
  }, []);

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    // Simulate payment processing based on method
    let message = '';
    switch (paymentMethod) {
      case 'upi':
        message = 'Processing UPI payment... (To be implemented)';
        break;
      case 'card':
        message = 'Processing Card payment... (To be implemented)';
        break;
      case 'cod':
        message = 'Order placed with Cash on Delivery!';
        break;
      default:
        message = 'Payment processing...';
    }

    alert(message);

    // Save order to localStorage for AdminDashboard
    const newOrder = {
      id: Date.now(), // Unique ID based on timestamp
      items: cartItems,
      total: totalAmount,
      paymentMethod,
      status: 'Pending', // Initial status
      date: new Date().toLocaleString(),
    };
    const storedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    localStorage.setItem('completedOrders', JSON.stringify([...storedOrders, newOrder]));

    // Clear cart (except for COD if needed)
    if (paymentMethod !== 'cod') {
      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalAmount');
    }

    // Navigate to home page after a short delay
    setTimeout(() => {
      navigate('/');
    }, 1000); // 1-second delay to allow user to see the alert
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Payment
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center text-base sm:text-lg">
          No items to process for payment.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-base sm:text-lg text-gray-800 font-medium">
                        {item.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {item.category} | {item.type} | {item.gender} | Age: {item.age} yrs
                      </p>
                      <p className="text-gray-600 text-sm">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-gray-900 mt-2 sm:mt-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg sm:text-xl font-semibold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Select Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* UPI Option */}
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  paymentMethod === 'upi'
                    ? 'border-[#7E60BF] bg-purple-50'
                    : 'border-gray-200 hover:border-[#7E60BF]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mr-3 accent-[#7E60BF]"
                />
                <span className="text-gray-700 font-medium">UPI</span>
              </label>

              {/* Card Option */}
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  paymentMethod === 'card'
                    ? 'border-[#7E60BF] bg-purple-50'
                    : 'border-gray-200 hover:border-[#7E60BF]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mr-3 accent-[#7E60BF]"
                />
                <span className="text-gray-700 font-medium">Credit/Debit Card</span>
              </label>

              {/* Cash on Delivery Option */}
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  paymentMethod === 'cod'
                    ? 'border-[#7E60BF] bg-purple-50'
                    : 'border-gray-200 hover:border-[#7E60BF]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mr-3 accent-[#7E60BF]"
                />
                <span className="text-gray-700 font-medium">Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            className="w-full bg-[#7E60BF] text-white py-3 rounded-lg hover:bg-[#6A4EAA] transition-colors duration-300 font-semibold text-base sm:text-lg"
          >
            Complete Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;