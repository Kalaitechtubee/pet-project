import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PetCard = ({ pet }) => {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Get existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if item already exists in cart
    const itemExists = cartItems.find(item => item.id === pet.id);
    let updatedCart;
    
    if (itemExists) {
      // If item exists, increase quantity
      updatedCart = cartItems.map(item =>
        item.id === pet.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // If item doesn't exist, add it with quantity 1
      updatedCart = [...cartItems, { ...pet, quantity: 1 }];
    }
    
    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Show added confirmation
    setIsAdded(true);
    
    // Navigate to cart page after a short delay
    setTimeout(() => {
      setIsAdded(false);
      navigate('/cart');
    }, 1000); // 1 second delay to show "Added!" feedback
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 p-4">
      <img
        src={pet.image || 'https://via.placeholder.com/300'}
        alt={pet.name}
        className="w-full h-56 object-cover rounded-xl"
      />
      <div className="mt-4 text-center">
        <h3 className="text-xl font-bold text-gray-800">{pet.name || 'Unnamed Pet'}</h3>
        <p className="text-gray-600 mt-1">${pet.price}</p>
        <p className="text-gray-500 text-sm">{pet.category} - {pet.type}</p>
        <p className="text-gray-500 text-sm">Age: {pet.age} years | {pet.gender}</p>

        <button
          onClick={handleAddToCart}
          className={`mt-4 w-full py-2 rounded-lg font-semibold transition-colors duration-300 ${
            isAdded ? 'bg-green-500 text-white' : 'bg-[#7E60BF] text-white hover:bg-[#6A4EAA]'
          }`}
        >
          {isAdded ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default PetCard;
