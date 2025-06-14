// Mock database utility for browser environment
// In a real application, you would use a backend API with SQLite

export const shoesData = [
  {
    id: 1,
    name: "Nike Air Max 270",
    brand: "Nike",
    price: 150,
    originalPrice: 180,
    category: "Running",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Black", "White", "Red", "Blue"],
    rating: 4.5,
    reviews: 1250,
    description: "The Nike Air Max 270 delivers visible cushioning under every step. The design draws inspiration from the Air Max 93 and Air Max 180, featuring Nike's biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks.",
    features: [
      "Nike's largest heel Air unit for maximum cushioning",
      "Engineered mesh upper for breathability",
      "Rubber outsole with waffle pattern for traction",
      "Foam midsole for lightweight comfort"
    ],
    images: [
      "/images/nike-air-max-270-1.jpg",
      "/images/nike-air-max-270-2.jpg",
      "/images/nike-air-max-270-3.jpg",
      "/images/nike-air-max-270-4.jpg",
      "/images/nike-air-max-270-5.jpg",
      "/images/nike-air-max-270-6.jpg"
    ],
    stock: 25,
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    price: 190,
    originalPrice: 220,
    category: "Running",
    sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    colors: ["Black", "White", "Grey", "Navy"],
    rating: 4.7,
    reviews: 890,
    description: "The Adidas Ultraboost 22 features responsive BOOST midsole technology and a Primeknit upper for the ultimate running experience. Designed for runners who demand performance and style.",
    features: [
      "BOOST midsole for energy return",
      "Primeknit upper for adaptive fit",
      "Continental rubber outsole",
      "Torsion System for midfoot support"
    ],
    images: [
      "/images/adidas-ultraboost-22-1.jpg",
      "/images/adidas-ultraboost-22-2.jpg",
      "/images/adidas-ultraboost-22-3.jpg",
      "/images/adidas-ultraboost-22-4.jpg",
      "/images/adidas-ultraboost-22-5.jpg",
      "/images/adidas-ultraboost-22-6.jpg"
    ],
    stock: 18,
    isNew: false,
    isFeatured: true
  },
  {
    id: 3,
    name: "Jordan 1 Retro High",
    brand: "Jordan",
    price: 170,
    originalPrice: 170,
    category: "Basketball",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Black/Red", "White/Black", "Royal Blue"],
    rating: 4.8,
    reviews: 2100,
    description: "The Air Jordan 1 Retro High brings back the classic silhouette that started it all. Premium materials and iconic colorways make this a must-have for any sneaker collection.",
    features: [
      "Premium leather upper",
      "Air-Sole unit in heel",
      "Rubber outsole with pivot points",
      "Classic high-top silhouette"
    ],
    images: [
      "/images/jordan-1-retro-high-1.jpg",
      "/images/jordan-1-retro-high-2.jpg",
      "/images/jordan-1-retro-high-3.jpg",
      "/images/jordan-1-retro-high-4.jpg",
      "/images/jordan-1-retro-high-5.jpg",
      "/images/jordan-1-retro-high-6.jpg"
    ],
    stock: 12,
    isNew: false,
    isFeatured: true
  },
  {
    id: 4,
    name: "Converse Chuck Taylor All Star",
    brand: "Converse",
    price: 65,
    originalPrice: 75,
    category: "Casual",
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    colors: ["Black", "White", "Red", "Navy", "Pink"],
    rating: 4.3,
    reviews: 3500,
    description: "The iconic Converse Chuck Taylor All Star is a timeless classic. With its distinctive silhouette and versatile style, it's perfect for any casual occasion.",
    features: [
      "Canvas upper for durability",
      "Rubber toe cap and outsole",
      "Metal eyelets for lacing",
      "Classic All Star patch"
    ],
    images: [
      "/images/converse-chuck-taylor-1.jpg",
      "/images/converse-chuck-taylor-2.jpg",
      "/images/converse-chuck-taylor-3.jpg",
      "/images/converse-chuck-taylor-4.jpg",
      "/images/converse-chuck-taylor-5.jpg",
      "/images/converse-chuck-taylor-6.jpg"
    ],
    stock: 45,
    isNew: false,
    isFeatured: false
  },
  {
    id: 5,
    name: "Vans Old Skool",
    brand: "Vans",
    price: 65,
    originalPrice: 65,
    category: "Skateboarding",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ["Black/White", "Navy/White", "Red/White", "All Black"],
    rating: 4.4,
    reviews: 1800,
    description: "The Vans Old Skool is the original skate shoe and still the most popular. With its iconic side stripe and durable construction, it's built for skating and style.",
    features: [
      "Durable suede and canvas upper",
      "Reinforced toe caps",
      "Padded collar for comfort",
      "Signature rubber waffle outsole"
    ],
    images: [
      "/images/vans-old-skool-1.jpg",
      "/images/vans-old-skool-2.jpg",
      "/images/vans-old-skool-3.jpg",
      "/images/vans-old-skool-4.jpg",
      "/images/vans-old-skool-5.jpg",
      "/images/vans-old-skool-6.jpg"
    ],
    stock: 30,
    isNew: false,
    isFeatured: false
  },
  {
    id: 6,
    name: "New Balance 990v5",
    brand: "New Balance",
    price: 185,
    originalPrice: 185,
    category: "Running",
    sizes: [7, 8, 9, 10, 11, 12, 13],
    colors: ["Grey", "Navy", "Black", "Burgundy"],
    rating: 4.6,
    reviews: 750,
    description: "The New Balance 990v5 represents the pinnacle of premium running shoe craftsmanship. Made in USA with superior materials and construction.",
    features: [
      "ENCAP midsole technology",
      "Premium pigskin and mesh upper",
      "Blown rubber outsole",
      "Made in USA"
    ],
    images: [
      "/images/new-balance-990v5-1.jpg",
      "/images/new-balance-990v5-2.jpg",
      "/images/new-balance-990v5-3.jpg",
      "/images/new-balance-990v5-4.jpg",
      "/images/new-balance-990v5-5.jpg",
      "/images/new-balance-990v5-6.jpg"
    ],
    stock: 15,
    isNew: true,
    isFeatured: true
  },
  {
    id: 7,
    name: "Puma RS-X",
    brand: "Puma",
    price: 110,
    originalPrice: 130,
    category: "Lifestyle",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["White/Blue", "Black/Red", "Grey/Yellow"],
    rating: 4.2,
    reviews: 650,
    description: "The Puma RS-X brings back the bold aesthetic of the 80s with modern comfort technology. Perfect for those who want to make a statement.",
    features: [
      "RS foam for cushioning",
      "Mesh and synthetic upper",
      "Rubber outsole",
      "Bold retro design"
    ],
    images: [
      "/images/puma-rs-x-1.jpg",
      "/images/puma-rs-x-2.jpg",
      "/images/puma-rs-x-3.jpg",
      "/images/puma-rs-x-4.jpg",
      "/images/puma-rs-x-5.jpg",
      "/images/puma-rs-x-6.jpg"
    ],
    stock: 22,
    isNew: false,
    isFeatured: false
  },
  {
    id: 8,
    name: "Reebok Classic Leather",
    brand: "Reebok",
    price: 75,
    originalPrice: 90,
    category: "Casual",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ["White", "Black", "Grey", "Navy"],
    rating: 4.1,
    reviews: 1200,
    description: "The Reebok Classic Leather is a timeless icon that never goes out of style. Simple, clean, and comfortable for everyday wear.",
    features: [
      "Soft leather upper",
      "Die-cut EVA midsole",
      "High abrasion rubber outsole",
      "Classic design"
    ],
    images: [
      "/images/reebok-classic-leather-1.jpg",
      "/images/reebok-classic-leather-2.jpg",
      "/images/reebok-classic-leather-3.jpg",
      "/images/reebok-classic-leather-4.jpg",
      "/images/reebok-classic-leather-5.jpg",
      "/images/reebok-classic-leather-6.jpg"
    ],
    stock: 35,
    isNew: false,
    isFeatured: false
  }
];

// Mock database functions
export const getShoes = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(shoesData), 100);
  });
};

export const getShoeById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shoe = shoesData.find(shoe => shoe.id === parseInt(id));
      resolve(shoe);
    }, 100);
  });
};

export const getShoesByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredShoes = shoesData.filter(shoe => 
        shoe.category.toLowerCase() === category.toLowerCase()
      );
      resolve(filteredShoes);
    }, 100);
  });
};

export const getFeaturedShoes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featuredShoes = shoesData.filter(shoe => shoe.isFeatured);
      resolve(featuredShoes);
    }, 100);
  });
};

export const searchShoes = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchResults = shoesData.filter(shoe =>
        shoe.name.toLowerCase().includes(query.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(query.toLowerCase()) ||
        shoe.category.toLowerCase().includes(query.toLowerCase())
      );
      resolve(searchResults);
    }, 100);
  });
};