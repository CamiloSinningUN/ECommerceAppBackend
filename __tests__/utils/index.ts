import app from '@/app';
import request from 'supertest';

// wrapper for supertest
export const testApp = request(app);
