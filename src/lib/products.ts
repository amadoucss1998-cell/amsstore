export type Category =
  | "women"
  | "men"
  | "kids"
  | "home"
  | "accessories"
  | "shoes";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: Category;
  subcategory: string;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew: boolean;
  isTrending: boolean;
  sheinUrl?: string;
}

export const products: Product[] = [
  {
    id: "p001",
    name: "Floral Print Wrap Dress",
    price: 24.99,
    originalPrice: 49.99,
    discount: 50,
    category: "women",
    subcategory: "dresses",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral Blue", "Floral Pink"],
    description:
      "Elegant wrap dress featuring a vibrant floral print, V-neckline, and self-tie waist belt. Perfect for brunch, dates, or casual outings.",
    rating: 4.5,
    reviews: 1247,
    inStock: true,
    isNew: false,
    isTrending: true,
  },
  {
    id: "p002",
    name: "Ribbed Knit Crop Top",
    price: 12.99,
    originalPrice: 22.99,
    discount: 43,
    category: "women",
    subcategory: "tops",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Black", "Beige", "Sage"],
    description:
      "Stretchy ribbed knit crop top with short sleeves and a fitted silhouette. A versatile wardrobe staple for any casual look.",
    rating: 4.3,
    reviews: 892,
    inStock: true,
    isNew: true,
    isTrending: true,
  },
  {
    id: "p003",
    name: "High-Waist Wide Leg Jeans",
    price: 34.99,
    originalPrice: 59.99,
    discount: 42,
    category: "women",
    subcategory: "bottoms",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&q=80",
    ],
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31", "32"],
    colors: ["Light Wash", "Dark Wash", "Black"],
    description:
      "Trendy high-waist wide-leg jeans with a relaxed fit through the hips and thighs. Features five pockets and a button-zip closure.",
    rating: 4.4,
    reviews: 2104,
    inStock: true,
    isNew: false,
    isTrending: true,
  },
  {
    id: "p004",
    name: "Oversized Graphic Tee",
    price: 14.99,
    originalPrice: 24.99,
    discount: 40,
    category: "men",
    subcategory: "tops",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["White", "Black", "Gray", "Navy"],
    description:
      "Comfortable oversized graphic tee with a relaxed fit. Made from 100% cotton for breathability and all-day comfort.",
    rating: 4.2,
    reviews: 567,
    inStock: true,
    isNew: true,
    isTrending: false,
  },
  {
    id: "p005",
    name: "Slim Fit Chino Pants",
    price: 29.99,
    originalPrice: 54.99,
    discount: 45,
    category: "men",
    subcategory: "bottoms",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    ],
    sizes: ["28x30", "30x30", "32x30", "32x32", "34x30", "34x32", "36x32"],
    colors: ["Khaki", "Navy", "Olive", "Black"],
    description:
      "Classic slim-fit chino pants with a straight leg cut. Features a flat front, side pockets, and back welt pockets.",
    rating: 4.6,
    reviews: 1089,
    inStock: true,
    isNew: false,
    isTrending: false,
  },
  {
    id: "p006",
    name: "Kids Rainbow Hoodie",
    price: 19.99,
    originalPrice: 34.99,
    discount: 43,
    category: "kids",
    subcategory: "tops",
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    ],
    sizes: ["3T", "4T", "5", "6", "7", "8", "10", "12"],
    colors: ["Rainbow", "Pink", "Blue"],
    description:
      "Fun and colorful hoodie for kids with a rainbow graphic print. Soft fleece interior for extra warmth and comfort.",
    rating: 4.7,
    reviews: 432,
    inStock: true,
    isNew: true,
    isTrending: false,
  },
  {
    id: "p007",
    name: "Boho Macramé Wall Hanging",
    price: 22.99,
    originalPrice: 39.99,
    discount: 43,
    category: "home",
    subcategory: "decor",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    ],
    sizes: ["One Size"],
    colors: ["Natural", "White"],
    description:
      "Handcrafted boho macramé wall hanging with intricate knotwork. Perfect for adding a bohemian touch to any room.",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isNew: false,
    isTrending: false,
  },
  {
    id: "p008",
    name: "Chunky Chain Necklace",
    price: 9.99,
    originalPrice: 18.99,
    discount: 47,
    category: "accessories",
    subcategory: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519eb7a3d8a?w=600&q=80",
    ],
    sizes: ["One Size"],
    colors: ["Gold", "Silver"],
    description:
      "Statement chunky chain necklace in gold or silver tone. Adds an edgy, fashion-forward touch to any outfit.",
    rating: 4.1,
    reviews: 678,
    inStock: true,
    isNew: true,
    isTrending: true,
  },
  {
    id: "p009",
    name: "Platform Chunky Sneakers",
    price: 39.99,
    originalPrice: 69.99,
    discount: 43,
    category: "shoes",
    subcategory: "sneakers",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
    ],
    sizes: ["5", "6", "7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Pink"],
    description:
      "Trendy platform chunky sneakers with lace-up closure and thick rubber sole. Adds height while keeping you comfortable.",
    rating: 4.4,
    reviews: 1567,
    inStock: true,
    isNew: false,
    isTrending: true,
  },
  {
    id: "p010",
    name: "Satin Slip Midi Dress",
    price: 29.99,
    originalPrice: 52.99,
    discount: 43,
    category: "women",
    subcategory: "dresses",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Dusty Rose", "Sage Green", "Champagne", "Navy"],
    description:
      "Elegant satin slip midi dress with adjustable spaghetti straps and a bias-cut silhouette. Goes from day to night effortlessly.",
    rating: 4.6,
    reviews: 3021,
    inStock: true,
    isNew: false,
    isTrending: true,
  },
  {
    id: "p011",
    name: "Linen Blend Blazer",
    price: 44.99,
    originalPrice: 79.99,
    discount: 44,
    category: "women",
    subcategory: "outerwear",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=600&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Black", "Camel"],
    description:
      "Sophisticated linen blend blazer with notched lapels, front pockets, and a relaxed fit. Perfect for smart casual or office wear.",
    rating: 4.5,
    reviews: 445,
    inStock: true,
    isNew: true,
    isTrending: false,
  },
  {
    id: "p012",
    name: "Athletic Jogger Set",
    price: 37.99,
    originalPrice: 64.99,
    discount: 42,
    category: "men",
    subcategory: "activewear",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961d28d?w=600&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Heather Gray", "Black", "Navy"],
    description:
      "Matching athletic jogger set with moisture-wicking fabric. Includes a zip-up hoodie and tapered jogger pants with elastic waist.",
    rating: 4.3,
    reviews: 789,
    inStock: true,
    isNew: false,
    isTrending: false,
  },
  {
    id: "p013",
    name: "Mini Crossbody Bag",
    price: 18.99,
    originalPrice: 32.99,
    discount: 42,
    category: "accessories",
    subcategory: "bags",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    ],
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Cream", "Pink"],
    description:
      "Cute mini crossbody bag with adjustable strap, zip closure, and multiple compartments. Perfect for keeping essentials close.",
    rating: 4.2,
    reviews: 1234,
    inStock: true,
    isNew: true,
    isTrending: true,
  },
  {
    id: "p014",
    name: "Strappy Block Heel Sandals",
    price: 27.99,
    originalPrice: 49.99,
    discount: 44,
    category: "shoes",
    subcategory: "heels",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&q=80",
    ],
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["Nude", "Black", "White"],
    description:
      "Chic strappy sandals with a 3-inch block heel for comfort and style. Features adjustable ankle strap and cushioned footbed.",
    rating: 4.3,
    reviews: 867,
    inStock: true,
    isNew: false,
    isTrending: false,
  },
  {
    id: "p015",
    name: "Plush Throw Blanket",
    price: 16.99,
    originalPrice: 29.99,
    discount: 43,
    category: "home",
    subcategory: "bedding",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    ],
    sizes: ["50x60 in", "60x80 in"],
    colors: ["Cream", "Gray", "Blush Pink", "Sage"],
    description:
      "Ultra-soft plush throw blanket made from premium microfiber. Machine washable and perfect for cozy movie nights.",
    rating: 4.9,
    reviews: 3456,
    inStock: true,
    isNew: false,
    isTrending: false,
  },
  {
    id: "p016",
    name: "Vintage Wash Denim Jacket",
    price: 42.99,
    originalPrice: 74.99,
    discount: 43,
    category: "women",
    subcategory: "outerwear",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Light Wash", "Dark Wash"],
    description:
      "Classic vintage-wash denim jacket with distressed details, chest pockets, and a relaxed fit. A timeless layering piece.",
    rating: 4.7,
    reviews: 2890,
    inStock: true,
    isNew: false,
    isTrending: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getTrendingProducts(): Product[] {
  return products.filter((p) => p.isTrending);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: "women", label: "Women", emoji: "👗" },
  { id: "men", label: "Men", emoji: "👔" },
  { id: "kids", label: "Kids", emoji: "🧒" },
  { id: "home", label: "Home", emoji: "🏠" },
  { id: "accessories", label: "Accessories", emoji: "👜" },
  { id: "shoes", label: "Shoes", emoji: "👟" },
];
