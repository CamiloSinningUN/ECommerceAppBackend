import { Order } from '@models';
import { testApp } from '../utils';

describe('Order Controller', () => {
  // Preparando los datos para las pruebas
  let token: string;
  let userId: string;
  let orderId: string;

  beforeAll(async () => {
    // Supongamos que hemos creado un usuario y obtenemos un token para ese usuario
    // ... código para obtener el token y el userId ...
  });

  // 1. Prueba unitaria del método controlador, con respuesta exitosa.
  it('should create a new order successfully', async () => {
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

  // 2. Prueba unitaria del método controlador, con respuesta errónea.
  it('should fail to create a new order with invalid data', async () => {
    const res = await testApp
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product: '',
        quantity: 0,
        user: userId,
      });

    expect(res.statusCode).toEqual(400);
  });

  // 3. Prueba unitaria del endpoint, con respuesta exitosa.
  it('should retrieve the order', async () => {
    const res = await testApp
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('order');
    expect(res.body.order._id).toEqual(orderId);
  });

  // 4. Prueba unitaria del endpoint, con respuesta errónea.
  it('should fail to retrieve non-existent order', async () => {
    const res = await testApp
      .get('/api/orders/non_existent_id')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(404);
  });

  // 5. Prueba unitaria del endpoint, con respuesta exitosa.
  it('should retrieve all orders', async () => {
    const res = await testApp
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('orders');
    expect(res.body.orders).toBeInstanceOf(Array);
  });

  // 6. Prueba unitaria del endpoint, con respuesta exitosa.
  it('should update the order', async () => {
    const res = await testApp
      .put(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        product: 'productId',
        user: userId,
        name: 'new name',
        category: 'new category',
        description: 'new description',
        rating: 5,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('order');
    expect(res.body.order._id).toEqual(orderId);
    expect(res.body.order.name).toEqual('new name');
    expect(res.body.order.category).toEqual('new category');
    expect(res.body.order.description).toEqual('new description');
    expect(res.body.order.rating).toEqual(5);
  });

  // 7. Prueba unitaria del endpoint, con respuesta errónea.
  it('should fail to update non-existent order', async () => {
    const res = await testApp
      .put('/api/orders/non_existent_id')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product: 'productId',
        user: userId,
        name: 'new name',
        category: 'new category',
        description: 'new description',
        rating: 5,
      });

    expect(res.statusCode).toEqual(404);
  });

  // 8. Prueba unitaria del endpoint, con respuesta exitosa.

  // Continúa con más pruebas para 'getOrders', 'updateOrder'...
});
