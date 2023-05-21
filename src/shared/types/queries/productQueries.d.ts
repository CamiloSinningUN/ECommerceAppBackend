// * "El endpoint retorna los datos de los productos que correspondan a el usuario, el texto de busqueda, y/o categoría proveída."
export type GetProductsQueryParams = {
  userId?: string;
  search?: string;
  category?: string;
};
