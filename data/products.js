export const products = [
  {
    productId: 'prod_macbookpro',
    name: 'MacBook Pro 14"',
    slug: 'macbook-pro-14',
    description:
      'The MacBook Pro 14" with M3 chip is a powerhouse for professionals, offering exceptional performance, a stunning Liquid Retina XDR display, and all-day battery life. Perfect for video editing, coding, and creative work.',
    price: 1999.99,
    stock: 25,
    sku: 'MBP14-M3-512',
    categoryId: 'cat_laptops', // Belongs to Laptops
    sellerId: 'user_seller001', // Sold by Alice Seller
    images: ['/uploads/sample_laptop1.jpg', '/uploads/sample_laptop2.jpg'],
    specifications: {
      RAM: '16GB',
      Storage: '512GB SSD',
      Processor: 'Apple M3',
      Color: 'Space Gray',
    },
    tags: ['apple', 'laptop', 'professional'],
    rating: 4.9,
  },
  {
    productId: 'prod_pixel8',
    name: 'Google Pixel 8',
    slug: 'google-pixel-8',
    description:
      'The Google Pixel 8 features the powerful Google Tensor G3 chip, an amazing camera system with AI-powered editing tools, and a beautiful display. It is the smartest and most helpful phone from Google.',
    price: 699.0,
    stock: 50,
    sku: 'GGL-PXL8-128',
    categoryId: 'cat_smartphones', // Belongs to Smartphones
    sellerId: 'user_seller001', // Sold by Alice Seller
    images: ['/uploads/sample_phone1.jpg'],
    specifications: {
      RAM: '8GB',
      Storage: '128GB',
      Camera: '50MP',
      Color: 'Obsidian',
    },
    tags: ['google', 'pixel', 'android', 'smartphone'],
    rating: 4.7,
  },
  {
    productId: 'prod_atomic_habits',
    name: 'Atomic Habits',
    slug: 'atomic-habits',
    description:
      'An easy and proven way to build good habits and break bad ones. James Clear, an expert on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    price: 27.0,
    discountPrice: 16.99,
    stock: 150,
    sku: 'BK-9780735211292',
    categoryId: 'cat_books', // Belongs to Books
    sellerId: 'user_admin001', // Sold by Admin User
    images: ['/uploads/sample_book1.jpg'],
    specifications: {
      Author: 'James Clear',
      Pages: '320',
      Format: 'Hardcover',
    },
    tags: ['self-help', 'habits', 'bestseller'],
    rating: 4.8,
  },
];