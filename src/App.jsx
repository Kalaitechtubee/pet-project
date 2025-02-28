import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllPets from './pages/AllPets';
import Dogs from './pages/Dogs';
import Cats from './pages/Cats';
import Birds from './pages/Birds';
import Fish from './pages/Fish';
import Rabbits from './pages/Rabbits';
import PetDetails from './pages/PetDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserLogin from './pages/UserLogin';
import './index.css'; // Add this line if missing

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-pets" element={<AllPets />} />
            <Route path="/dogs" element={<Dogs />} />
            <Route path="/cats" element={<Cats />} />
            <Route path="/birds" element={<Birds />} />
            <Route path="/fish" element={<Fish />} />
            <Route path="/rabbits" element={<Rabbits />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-login" element={<UserLogin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;