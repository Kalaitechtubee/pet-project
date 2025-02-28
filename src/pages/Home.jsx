import React from 'react';
import { Link } from 'react-router-dom';
import { FaDog, FaCat, FaDove, FaFish, FaCarrot, FaPaw } from 'react-icons/fa'; // Pet-related icons
import homepage from '../assets/images/bg.jpg';

const Home = () => {
  const petCategories = [
    { to: '/dogs', label: 'Dogs', icon: <FaDog className="w-12 h-12" /> },
    { to: '/cats', label: 'Cats', icon: <FaCat className="w-12 h-12" /> },
    { to: '/birds', label: 'Birds', icon: <FaDove className="w-12 h-12" /> },
    { to: '/fish', label: 'Fish', icon: <FaFish className="w-12 h-12" /> },
    { to: '/rabbits', label: 'Rabbits', icon: <FaCarrot className="w-12 h-12" /> },
    { to: '/all-pets', label: 'All Pets', icon: <FaPaw className="w-12 h-12" /> },
  ];

  return (
    <div 
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${homepage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 text-white max-w-3xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">Welcome to Pet Store</h1>
        <p className="text-xl font-light max-w-2xl mx-auto drop-shadow-md">
          Discover your perfect pet companion with us. Explore our wide range of adorable pets today!
        </p>
      </div>

      {/* Grid Section */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mt-12">
        {petCategories.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 flex flex-col items-center justify-center"
          >
            <div className="mb-4 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
              {item.icon}
            </div>
            <span className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="relative z-10 text-center mt-12 text-white">
        <p className="text-lg italic drop-shadow-md">
          "Bringing joy to homes, one pet at a time."
        </p>
      </div>
    </div>
  );
};

export default Home;