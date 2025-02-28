import React, { useState, useEffect } from 'react';
import PetCard from '../components/PetCard';
import { fetchPets } from '../api';

const Birds = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPets = async () => {
      setLoading(true);
      const data = await fetchPets('bird'); // Fetch birds
      setPets(data);
      setLoading(false);
    };
    getPets();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Birds</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Birds;