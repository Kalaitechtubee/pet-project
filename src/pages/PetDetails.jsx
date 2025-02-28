// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchPets } from '../api'; // Assuming this fetches all pets for demo purposes

// const PetDetails = () => {
//   const { id } = useParams(); // Get the pet ID from the URL
//   const navigate = useNavigate();
//   const [pet, setPet] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdded, setIsAdded] = useState(false);

//   useEffect(() => {
//     const getPetDetails = async () => {
//       setLoading(true);
//       try {
//         // Fetch all pets and find the one with the matching ID
//         const allPets = await fetchPets('all'); // Adjust this based on your API
//         const selectedPet = allPets.find((p) => p.id === parseInt(id));
//         if (selectedPet) {
//           setPet(selectedPet);
//         } else {
//           // Handle case where pet is not found
//           setPet(null);
//         }
//       } catch (error) {
//         console.error('Error fetching pet details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPetDetails();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!pet) return;

//     // Get existing cart items from localStorage
//     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const itemExists = cartItems.find((item) => item.id === pet.id);
//     let updatedCart;

//     if (itemExists) {
//       updatedCart = cartItems.map((item) =>
//         item.id === pet.id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//     } else {
//       updatedCart = [...cartItems, { ...pet, quantity: 1 }];
//     }

//     // Update localStorage
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
//     // Show added confirmation and navigate to cart
//     setIsAdded(true);
//     setTimeout(() => {
//       setIsAdded(false);
//       navigate('/cart');
//     }, 1000);
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto p-6 flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (!pet) {
//     return (
//       <div className="container mx-auto p-6 text-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Pet Not Found</h1>
//         <p className="text-gray-600">Sorry, we couldn’t find the pet you’re looking for.</p>
//         <button
//           onClick={() => navigate('/all-pets')}
//           className="mt-4 bg-[#7E60BF] text-white py-2 px-4 rounded-lg hover:bg-[#6A4EAA] transition-colors duration-300"
//         >
//           Back to All Pets
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 min-h-screen">
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
//         <div className="flex flex-col md:flex-row">
//           {/* Pet Image */}
//           <div className="md:w-1/2">
//             <img
//               src={pet.image || 'https://via.placeholder.com/400'}
//               alt={pet.name}
//               className="w-full h-96 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
//             />
//           </div>

//           {/* Pet Details */}
//           <div className="md:w-1/2 p-6">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">{pet.name}</h1>
//             <p className="text-gray-600 text-lg mb-2">
//               <span className="font-semibold">Price:</span> ${pet.price}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">Category:</span> {pet.category}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">Type:</span> {pet.type}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">Age:</span> {pet.age} years
//             </p>
//             <p className="text-gray-600 mb-4">
//               <span className="font-semibold">Gender:</span> {pet.gender}
//             </p>

//             {/* Add to Cart Button */}
//             <button
//               onClick={handleAddToCart}
//               className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
//                 isAdded ? 'bg-green-500 text-white' : 'bg-[#7E60BF] text-white hover:bg-[#6A4EAA]'
//               }`}
//             >
//               {isAdded ? 'Added!' : 'Add to Cart'}
//             </button>

//             {/* Back Button */}
//             <button
//               onClick={() => navigate(-1)} // Go back to previous page
//               className="mt-4 w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
//             >
//               Back
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PetDetails;
import React from 'react'

const PetDetails = () => {
  return (
    <div>
      
    </div>
  )
}

export default PetDetails
