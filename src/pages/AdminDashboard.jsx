import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const navigate = useNavigate();

  // Check if admin is authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
    }
  }, [navigate]);

  // Load orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    setOrders(storedOrders);
  }, []);

  // Edit order (start editing)
  const startEditing = (order) => {
    setEditingOrder({ ...order });
  };

  // Save edited order
  const saveEditedOrder = () => {
    const updatedOrders = orders.map((order) =>
      order.id === editingOrder.id ? editingOrder : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders));
    setEditingOrder(null);
  };

  // Delete order
  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders));
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-[#1F2A44] text-white p-6 sm:p-8 lg:p-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold font-['Poppins'] tracking-wide bg-gradient-to-r from-[#00DDEB] to-[#FF6F61] bg-clip-text text-transparent">
            Admin Dashboard - Orders
          </h1>
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 bg-[#FF6F61] text-white px-5 py-2 rounded-full font-['Poppins'] font-semibold hover:bg-[#FF5240] transition-all duration-300 shadow-lg hover:shadow-[#FF6F61]/50"
          >
            Logout
          </button>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <p className="text-center text-[#A0AEC0] text-lg font-['Roboto']">
            No orders yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#2D3B55] rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 border border-[#00DDEB]/20"
              >
                {editingOrder && editingOrder.id === order.id ? (
                  <div className="space-y-4">
                    <input
                      type="number"
                      value={editingOrder.total}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, total: parseFloat(e.target.value) })
                      }
                      className="w-full p-3 bg-[#1F2A44] text-white border border-[#00DDEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DDEB] transition-all"
                      placeholder="Total Amount"
                    />
                    <select
                      value={editingOrder.status}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, status: e.target.value })
                      }
                      className="w-full p-3 bg-[#1F2A44] text-white border border-[#00DDEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DDEB] transition-all"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <select
                      value={editingOrder.paymentMethod}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, paymentMethod: e.target.value })
                      }
                      className="w-full p-3 bg-[#1F2A44] text-white border border-[#00DDEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DDEB] transition-all"
                    >
                      <option value="upi">UPI</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="cod">Cash on Delivery</option>
                    </select>
                    <div className="flex gap-3">
                      <button
                        onClick={saveEditedOrder}
                        className="flex-1 bg-[#00DDEB] text-[#1F2A44] px-4 py-2 rounded-lg font-['Poppins'] font-semibold hover:bg-[#00C4D1] transition-all duration-300 shadow-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingOrder(null)}
                        className="flex-1 bg-[#A0AEC0] text-white px-4 py-2 rounded-lg font-['Poppins'] font-semibold hover:bg-[#8B97A8] transition-all duration-300 shadow-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[#E2E8F0] font-['Roboto']">
                      <span className="font-medium text-[#00DDEB]">Order ID:</span> {order.id}
                    </p>
                    <p className="text-[#E2E8F0] font-['Roboto']">
                      <span className="font-medium text-[#00DDEB]">Date:</span> {order.date}
                    </p>
                    <p className="text-[#E2E8F0] font-['Roboto']">
                      <span className="font-medium text-[#00DDEB]">Payment:</span> {order.paymentMethod}
                    </p>
                    <p className="text-[#E2E8F0] font-['Roboto']">
                      <span className="font-medium text-[#00DDEB]">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-500' :
                        order.status === 'Shipped' ? 'bg-blue-500' :
                        order.status === 'Pending' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        {order.status}
                      </span>
                    </p>
                    <div className="mt-3 space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-full border border-[#00DDEB]/30"
                          />
                          <div className="text-left">
                            <p className="text-[#E2E8F0] font-['Roboto'] font-medium">{item.name}</p>
                            <p className="text-[#A0AEC0] text-xs">
                              {item.category} | {item.type} | {item.gender}
                            </p>
                            <p className="text-[#A0AEC0] text-xs">
                              ${item.price} x {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-lg font-semibold text-[#00DDEB] mt-3 font-['Poppins']">
                      Total: ${order.total.toFixed(2)}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => startEditing(order)}
                        className="flex-1 bg-[#FFD700] text-[#1F2A44] px-4 py-2 rounded-lg font-['Poppins'] font-semibold hover:bg-[#FFC107] transition-all duration-300 shadow-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="flex-1 bg-[#FF6F61] text-white px-4 py-2 rounded-lg font-['Poppins'] font-semibold hover:bg-[#FF5240] transition-all duration-300 shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;