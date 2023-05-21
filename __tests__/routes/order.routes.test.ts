import request from 'supertest';
import { testApp } from '../utils';

describe('Order Routes', () => {
  let token: string;
  let userId: string;
  let orderId: string;

  beforeAll(async () => {
    // Supongamos que hemos creado un usuario y obtenemos un token para ese usuario
    // ... código para obtener el token y el userId ...
  });

  // Prueba la ruta POST /api/orders
  it('should create a new order', async () => {
    const res = await testApp
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product: 'productId',
        quantity: 1,
        user: userId,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('order');
    orderId = res.body.order._id;
  });

  // Prueba la ruta GET /api/orders/:id
  it('should get an order by id', async () => {
    const res = await testApp
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('order');
    expect(res.body.order._id).toEqual(orderId);
  });

  // Prueba la ruta GET /api/orders
  it('should get all orders for the user', async () => {
    const res = await testApp
      .get(`/api/orders`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Prueba la ruta PATCH /api/orders/:id
  it('should update an order', async () => {
    const res = await testApp
      .patch(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        rating: 5,
        comment: 'Great product!',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('order');
    expect(res.body.order.rating).toEqual(5);
    expect(res.body.order.comment).toEqual('Great product!');
  });
});
