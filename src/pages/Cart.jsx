import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalAmount', totalAmount.toString());
    setIsConfirmed(true);
    setTimeout(() => navigate('/payment'), 1500);
  };

  const handleDeleteItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleAddToCart = (item) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-[#4B5EAA] mb-10 text-center animate-fade-in-down tracking-tight">
        Your Pet Cart 🐾
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center animate-fade-in">
          <p className="text-lg text-gray-500">Your cart is empty.</p>
          <Link
            to="/all-pets"
            className="mt-4 inline-block text-[#4B5EAA] hover:text-[#3B4A8C] font-semibold transition-colors duration-300"
          >
            Start Shopping Now
          </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1 px-4 py-2 sm:py-0">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {item.category} | ${item.price} x {item.quantity}
                  </p>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="text-sm bg-gradient-to-r from-[#4B5EAA] to-[#7E60BF] text-white px-4 py-1 rounded-full hover:from-[#3B4A8C] hover:to-[#6A4EAA] transition-all duration-300"
                    >
                      Add More
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 hover:text-red-600 transition-all duration-200 transform hover:scale-110"
                    title="Remove Item"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center">
            <span className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Total:</span>
            <span className="text-3xl font-bold text-[#4B5EAA]">${totalAmount.toFixed(2)}</span>
          </div>

          <div className="mt-6">
            {isConfirmed ? (
              <div className="text-center text-green-600 font-semibold animate-pulse">
                Order Confirmed! Redirecting to payment...
              </div>
            ) : (
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-gradient-to-r from-[#4B5EAA] to-[#7E60BF] text-white py-3 rounded-xl hover:from-[#3B4A8C] hover:to-[#6A4EAA] transition-all duration-300 font-semibold text-lg transform hover:scale-105"
              >
                Confirm Order
              </button>
            )}
          </div>
        </div>
      )}

      <Link
        to="/all-pets"
        className="mt-8 inline-block text-[#4B5EAA] hover:text-[#3B4A8C] font-semibold transition-colors duration-300 text-center w-full"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default Cart;