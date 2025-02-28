import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiHome, BiCart, BiUser, BiShield, BiMenu, BiX, BiChevronDown } from 'react-icons/bi';
import { FaDog, FaCat, FaDove, FaFish, FaCarrot } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [petsMenuOpen, setPetsMenuOpen] = useState(false);

  return (
    <nav className="text-white shadow-md sticky top-0 z-50" style={{ backgroundColor: '#7E60BF' }}>
      <div className="container mx-auto px-4 py-3 ">
        {/* Main Navbar */}
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center gap-2 transition-transform hover:scale-105"
          >
            <BiHome style={{ color: '#7E60BF' }} className="text-white bg-white rounded-full p-1" /> 
            <span className="tracking-tight">Pet Haven 🐾</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <div 
              className="relative group"
              onMouseEnter={() => setPetsMenuOpen(true)}
              onMouseLeave={() => setPetsMenuOpen(false)}
            >
              <button className="flex items-center gap-1 font-medium hover:text-gray-200 transition-colors">
                Pets <BiChevronDown />
              </button>
              {petsMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-200">
                  {[
                    { to: "/dogs", icon: FaDog, text: "Dogs" },
                    { to: "/cats", icon: FaCat, text: "Cats" },
                    { to: "/birds", icon: FaDove, text: "Birds" },
                    { to: "/fish", icon: FaFish, text: "Fish" },
                    { to: "/rabbits", icon: FaCarrot, text: "Rabbits" }
                  ].map((item) => (
                    <Link 
                      key={item.to}
                      to={item.to}
                      className="flex items-center gap-3 px-4 py-3 hover:text-white transition-colors"
                      style={{ '&:hover': { backgroundColor: '#7E60BF' } }}
                    >
                      <item.icon style={{ color: '#7E60BF' }} />
                      {item.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {[
              { to: "/cart", icon: BiCart, text: "Cart" },
              { to: "/user-login", icon: BiUser, text: "Login" },
              { to: "/admin-login", icon: BiShield, text: "Admin" }
            ].map((item) => (
              <Link 
                key={item.to}
                to={item.to}
                className="flex items-center gap-1 font-medium hover:text-gray-200 transition-colors"
              >
                <item.icon /> {item.text}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-3xl p-2 rounded-lg hover:text-gray-200 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <BiX /> : <BiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slide-down">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <button 
                  className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:text-gray-200 transition-colors"
                  style={{ backgroundColor: '#7E60BF' }}
                  onClick={() => setPetsMenuOpen(!petsMenuOpen)}
                >
                  Pets <BiChevronDown className={`${petsMenuOpen ? 'rotate-180' : ''} transition-transform`} />
                </button>
                {petsMenuOpen && (
                  <div className="mt-2 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {[
                      { to: "/dogs", icon: FaDog, text: "Dogs" },
                      { to: "/cats", icon: FaCat, text: "Cats" },
                      { to: "/birds", icon: FaDove, text: "Birds" },
                      { to: "/fish", icon: FaFish, text: "Fish" },
                      { to: "/rabbits", icon: FaCarrot, text: "Rabbits" }
                    ].map((item) => (
                      <Link 
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-3 hover:text-white transition-colors"
                        style={{ '&:hover': { backgroundColor: '#7E60BF' } }}
                        onClick={() => setMenuOpen(false)}
                      >
                        <item.icon style={{ color: '#7E60BF' }} />
                        {item.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {[
                { to: "/cart", icon: BiCart, text: "Cart" },
                { to: "/user-login", icon: BiUser, text: "Login" },
                { to: "/admin-login", icon: BiShield, text: "Admin" }
              ].map((item) => (
                <Link 
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 py-2 px-4 rounded-lg hover:text-gray-200 transition-colors"
                  style={{ backgroundColor: '#7E60BF' }}
                  onClick={() => setMenuOpen(false)}
                >
                  <item.icon /> {item.text}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;