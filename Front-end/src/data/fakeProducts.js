// TODO: Remplazar con api
// GET /api/products
// GET /api/categories
// GET /api/brands

export const fakeProducts = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    brand: "Nike",
    price: 179.99,
    discount: 0,
    rating: 4.8,
    reviews: 234,
    // TODO: Real image URL should come from backend
    image: "/assets/images/default.webp",
    category: "basketball",
    isFeatured: true,
    isNew: true,
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["black", "red", "white"]
  },
  {
    id: 2,
    name: "Ultraboost 22",
    brand: "Adidas",
    price: 189.99,
    discount: 15,
    rating: 4.5,
    reviews: 187,
    // TODO: Real image URL should come from backend
    image: "/assets/images/default.webp",
    category: "running",
    isFeatured: true,
    isNew: false,
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ["white", "black", "blue"]
  },
  {
    id: 3,
    name: "Classic Leather",
    brand: "Reebok",
    price: 89.99,
    discount: 0,
    rating: 4.3,
    reviews: 156,
    // TODO: Real image URL should come from backend
    image: "/assets/images/default.webp",
    category: "casual",
    isFeatured: false,
    isNew: false,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["white", "black", "beige"]
  },
  {
    id: 4,
    name: "Old Skool",
    brand: "Vans",
    price: 69.99,
    discount: 0,
    rating: 4.7,
    reviews: 322,
    // TODO: Real image URL should come from backend
    image: "/assets/images/default.webp",
    category: "skateboarding",
    isFeatured: true,
    isNew: false,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ["black", "white", "red", "blue"]
  },
  {
    id: 5,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 59.99,
    discount: 10,
    rating: 4.6,
    reviews: 412,
    // TODO: Real image URL should come from backend
    image: "/assets/images/default.webp",
    category: "casual",
    isFeatured: false,
    isNew: false,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["black", "white", "red", "navy"]
  },
  {
    id: 6,
    name: "Suede Classic",
    brand: "Puma",
    price: 79.99,
    discount: 0,
    rating: 4.4,
    reviews: 178,
    // TODO: Real image URL should come from backend
    image: "/assets/images/default.webp",
    category: "casual",
    isFeatured: false,
    isNew: true,
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["black", "blue", "red", "grey"]
  },
  {
    id: 7,
    name: "574 Core",
    brand: "New Balance",
    price: 99.99,
    discount: 0,
    rating: 4.2,
    reviews: 145,
    // TODO: Real image URL should come from backend
    image: "/assets/images/default.webp",
    category: "running",
    isFeatured: false,
    isNew: false,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["grey", "navy", "black"]
  },
  {
    id: 8,
    name: "Air Force 1",
    brand: "Nike",
    price: 109.99,
    discount: 0,
    rating: 4.9,
    reviews: 532,
    // TODO: Real image URL should come from backend
    image: "/assets/images/default.webp",
    category: "casual",
    isFeatured: true,
    isNew: false,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["white", "black"]
  }
];

export const categories = [
  { id: 1, name: "running", label: "Running" },
  { id: 2, name: "basketball", label: "Basketball" },
  { id: 3, name: "casual", label: "Casual" },
  { id: 4, name: "skateboarding", label: "Skateboarding" }
];

export const brands = [
  { id: 1, name: "nike", label: "Nike" },
  { id: 2, name: "adidas", label: "Adidas" },
  { id: 3, name: "puma", label: "Puma" },
  { id: 4, name: "reebok", label: "Reebok" },
  { id: 5, name: "vans", label: "Vans" },
  { id: 6, name: "converse", label: "Converse" },
  { id: 7, name: "newbalance", label: "New Balance" }
];