// We don't hash passwords here. The seeder script will do it.
export const users = [
  {
    userId: 'user_admin001',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    isActive: true,
  },
  {
    userId: 'user_seller001',
    firstName: 'Alice',
    lastName: 'Seller',
    email: 'seller@example.com',
    password: 'password123',
    role: 'seller',
    isActive: true,
  },
  {
    userId: 'user_customer001',
    firstName: 'Bob',
    lastName: 'Customer',
    email: 'customer@example.com',
    password: 'password123',
    role: 'customer',
    isActive: true,
  },
];