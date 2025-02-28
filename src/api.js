import axios from 'axios';

const API_KEY = 'Tk21ap3mVHhetx3KKpWGfO9jLeiEomY7vOhYH9WlwU86JxyCptwJjnHv';
const API_URL = 'https://api.pexels.com/v1/search';

// Mock data for pet types and names based on category
const petDetails = {
  dogs: {
    types: ['Golden Retriever', 'Labrador', 'German Shepherd', 'Bulldog', 'Poodle'],
    names: ['Max', 'Bella', 'Charlie', 'Luna', 'Rocky'],
  },
  cats: {
    types: ['Persian', 'Maine Coon', 'Siamese', 'Ragdoll', 'Sphynx'],
    names: ['Whiskers', 'Mittens', 'Shadow', 'Simba', 'Lily'],
  },
  birds: {
    types: ['Parrot', 'Canary', 'Cockatiel', 'Finch', 'Lovebird'],
    names: ['Tweety', 'Sunny', 'Sky', 'Pippin', 'Blue'],
  },
  fish: {
    types: ['Goldfish', 'Betta', 'Guppy', 'Tetra', 'Angelfish'],
    names: ['Bubbles', 'Finny', 'Splash', 'Coral', 'Nemo'],
  },
  rabbits: {
    types: ['Holland Lop', 'Netherland Dwarf', 'Flemish Giant', 'Rex', 'Mini Lop'],
    names: ['Flopsy', 'Bunny', 'Hopper', 'Coco', 'Thumper'],
  },
};

// Array of possible genders
const genders = ['Male', 'Female'];

export const fetchPets = async (query) => {
  try {
    const response = await axios.get(`${API_URL}?query=${query}&per_page=20`, {
      headers: { Authorization: API_KEY },
    });

    // Normalize query to match petDetails keys
    const category = query.toLowerCase().includes('dog')
      ? 'dogs'
      : query.toLowerCase().includes('cat')
      ? 'cats'
      : query.toLowerCase().includes('bird')
      ? 'birds'
      : query.toLowerCase().includes('fish')
      ? 'fish'
      : query.toLowerCase().includes('rabbit')
      ? 'rabbits'
      : query.toLowerCase();

    // Get type and name arrays for the category, default to generic if not found
    const types = petDetails[category]?.types || ['Unknown Type'];
    const names = petDetails[category]?.names || ['Pet'];

    return response.data.photos.map((photo, index) => ({
      id: index + 1,
      name: `${names[index % names.length]}`, // Cycle through names
      image: photo.src.medium,
      price: Math.floor(Math.random() * 500) + 10, // Random price between $10 and $509
      category: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize category
      type: types[index % types.length], // Cycle through types
      age: Math.floor(Math.random() * 10) + 1, // Random age between 1 and 10 years
      gender: genders[Math.floor(Math.random() * genders.length)], // Randomly assign Male or Female
    }));
  } catch (error) {
    console.error(`Error fetching ${query}:`, error);
    return [];
  }
};