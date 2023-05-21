import { IOrder } from '@models';

export type updateOrderBody = Partial<
  Pick<IOrder, 'quantity' | 'comment' | 'rating'>
>;
