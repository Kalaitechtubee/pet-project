import axios from 'axios';

const API_KEY = 'Tk21ap3mVHhetx3KKpWGfO9jLeiEomY7vOhYH9WlwU86JxyCptwJjnHv';
const API_URL = 'https://api.pexels.com/v1/search';

// Mock data for pet types and names based on category
const petDetails = {
  dogs: {
    types: [
      'Golden Retriever',
      'Labrador',
      'German Shepherd',
      'Bulldog',
      'Poodle',
      'Rottweiler',
      'Siberian Husky',
      'Doberman',
      'Great Dane',
      'Beagle',
      'Indian Spitz',
      'Pug',
      'Boxer',
      'Dalmatian',
      'Shih Tzu',
      'Chihuahua',
      'Saint Bernard',
      'Cocker Spaniel',
      'Pitbull',
      'Border Collie'
    ],
    names: [
      'Raja',
      'Sheru',
      'Bruno',
      'Rocky',
      'Tiger',
      'Moti',
      'Leo',
      'Lucky',
      'Tommy',
      'Buddy',
      'Shadow',
      'Simba',
      'Pluto',
      'Arya',
      'Zara',
      'Pepper',
      'Ginger',
      'Brownie',
      'Angel',
      'Ruby'
    ],
  },
  cats: {
    types: [
      'Persian',
      'Maine Coon',
      'Siamese',
      'Ragdoll',
      'Sphynx',
      'Bengal',
      'British Shorthair',
      'Russian Blue',
      'Scottish Fold',
      'American Shorthair',
      'Himalayan',
      'Bombay',
      'Turkish Angora',
      'Abyssinian',
      'Norwegian Forest',
      'Birman',
      'Oriental Shorthair',
      'Exotic Shorthair',
      'Munchkin',
      'Devon Rex'
    ],
    names: [
      'Whiskers',
      'Mittens',
      'Shadow',
      'Simba',
      'Lily',
      'Luna',
      'Milo',
      'Oliver',
      'Bella',
      'Nala',
      'Leo',
      'Kitty',
      'Charlie',
      'Lucy',
      'Tiger',
      'Smokey',
      'Oreo',
      'Coco',
      'Princess',
      'Oscar'
    ],
  },
  birds: {
    types: [
      'Parrot',
      'Canary',
      'Cockatiel',
      'Finch',
      'Lovebird',
      'Budgerigar',
      'African Grey',
      'Macaw',
      'Cockatoo',
      'Conure',
      'Parakeet',
      'Dove',
      'Amazon Parrot',
      'Eclectus',
      'Quaker Parrot',
      'Ringneck',
      'Lorikeet',
      'Pionus',
      'Caique',
      'Rosella'
    ],
    names: [
      'Tweety',
      'Sunny',
      'Sky',
      'Pippin',
      'Blue',
      'Rio',
      'Kiwi',
      'Mango',
      'Phoenix',
      'Angel',
      'Pepper',
      'Ziggy',
      'Rainbow',
      'Storm',
      'Echo',
      'Peachy',
      'Jade',
      'Cloud',
      'Flash',
      'Sparkle'
    ],
  },
  fish: {
    types: [
      'Goldfish',
      'Betta',
      'Guppy',
      'Tetra',
      'Angelfish',
      'Molly',
      'Platy',
      'Swordtail',
      'Discus',
      'Clownfish',
      'Zebrafish',
      'Barb',
      'Cichlid',
      'Koi',
      'Rainbowfish',
      'Danio',
      'Corydoras',
      'Rasbora',
      'Killifish',
      'Gouramis'
    ],
    names: [
      'Bubbles',
      'Finny',
      'Splash',
      'Coral',
      'Nemo',
      'Neptune',
      'Pearl',
      'Wave',
      'Finn',
      'Goldie',
      'Aqua',
      'Marina',
      'Ripple',
      'Flash',
      'Shimmer',
      'Ocean',
      'River',
      'Azure',
      'Coral',
      'Sunny'
    ],
  },
  rabbits: {
    types: [
      'Holland Lop',
      'Netherland Dwarf',
      'Flemish Giant',
      'Rex',
      'Mini Lop',
      'Dutch',
      'English Angora',
      'French Lop',
      'Lionhead',
      'Polish',
      'American Fuzzy Lop',
      'Mini Rex',
      'English Spot',
      'Californian',
      'New Zealand White',
      'Dwarf Hotot',
      'Jersey Wooly',
      'Satin',
      'Britannia Petite',
      'Belgian Hare'
    ],
    names: [
      'Flopsy',
      'Bunny',
      'Hopper',
      'Coco',
      'Thumper',
      'Cotton',
      'Daisy',
      'Oreo',
      'Snowball',
      'Pepper',
      'Nibbles',
      'Biscuit',
      'Clover',
      'Peanut',
      'Marshmallow',
      'Maple',
      'Nutmeg',
      'Velvet',
      'Caramel',
      'Ziggy'
    ],
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
      price: (Math.floor(Math.random() * 500) + 10) * 83, // Random price between ₹830 and ₹42,330
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