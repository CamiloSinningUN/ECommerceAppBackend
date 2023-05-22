import dotenv from 'dotenv';
import connect from '../../src/database';
dotenv.config({
  path: '.env.test',
});

connect();

import app from '@/app';
import request from 'supertest';

// wrapper for supertest
export const testApp = request(app);

export const testProducts = [
  {
    user: '5f8d0a7d8b0c0a2a1c9d4c9d',
    name: 'test product 1',
    category: 'test category 1',
    description: 'test description 1',
    price: 100,
    rating: 4.5,
  },
  {
    user: '5f8d0a7d8b0c0a2a1c9d4c9d',
    name: 'test product 2',
    category: 'test category 2',
    description: 'test description 2',
    price: 100,
    rating: 4.5,
  },
  {
    user: '5f8d0a7d8b0c0a2a1c9d4c9d',
    name: 'test product 3',
    category: 'test category 3',
    description: 'test description 3',
    price: 100,
    rating: 4.5,
  },
];

export const testOrders = [
  {
    user: '5f8d0a7d8b0c0a2a1c9d4c9d',
    product: '5f8d0ad8b0c0a2a1c9d4c9d',
    quantity: 1,
    comment: 'test comment 1',
    rating: 4.5,
    orderDate: new Date(),
  },
  {
    user: '5f8d0a7d8b0c0a2a1c9d4c9d',
    product: '5f8d0ad8b0c0a2a1c9d4c9d',
    quantity: 1,
    comment: 'test comment 2',
    rating: 4.5,
    orderDate: new Date(),
  },
  {
    user: '5f8d0a7d8b0c0a2a1c9d4c9d',
    product: '5f8d0ad8b0c0a2a1c9d4c9d',
    quantity: 1,
    comment: 'test comment 3',
    rating: 4.5,
    orderDate: new Date(),
  },
];

export const testUsers = [
  {
    email: 'test_user1@testmail.com',
    password: '123456',
    name: 'test user 1',
  },
  {
    email: 'test_user2@testmail.com',
    password: '123456',
    name: 'test user 3',
  },
  {
    email: 'test_user3@testmail.com',
    password: '123456',
    name: 'test user 3',
  },
];
