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
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop"
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
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594969904906-c58ba4d2e3d0?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&h=500&fit=crop"
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
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop"
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
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
    ],
    stock: 45,
    isNew: false,
    isFeatured: true
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
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=500&fit=crop"
    ],
    stock: 30,
    isNew: true,
    isFeatured: true
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
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594969904906-c58ba4d2e3d0?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=500&fit=crop"
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
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=500&fit=crop"
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
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
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