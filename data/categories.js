export const categories = [
  {
    categoryId: 'cat_electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Gadgets and devices',
  },
  {
    categoryId: 'cat_laptops',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Powerful and portable computers',
    parentCategoryId: 'cat_electronics', // Child of Electronics
  },
  {
    categoryId: 'cat_smartphones',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Mobile phones with advanced features',
    parentCategoryId: 'cat_electronics', // Child of Electronics
  },
  {
    categoryId: 'cat_books',
    name: 'Books',
    slug: 'books',
    description: 'Printed and digital books',
  },
];