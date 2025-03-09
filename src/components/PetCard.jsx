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
    <div className="p-4 overflow-hidden transition-transform duration-300 transform bg-white shadow-lg rounded-2xl hover:scale-105">
      <img
        src={pet.image || 'https://via.placeholder.com/300'}
        alt={pet.name}
        className="object-cover w-full h-56 rounded-xl"
      />
      <div className="mt-4 text-center">
        <h3 className="text-xl font-bold text-gray-800">{pet.name || 'Unnamed Pet'}</h3>
        <p className="mt-1 text-gray-600">{pet.price}</p>
        <p className="text-sm text-gray-500">{pet.category} - {pet.type}</p>
        <p className="text-sm text-gray-500">Age: {pet.age} years | {pet.gender}</p>

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
