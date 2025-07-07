import http from '@/app/shared/services/http.instance';

class ProductApiService {
  constructor() {
    this.endpoint = '/api/v1';
  }

  async getProducts() {
    try {
      console.log('Fetching products from:', `${this.endpoint}/products`);
      const response = await http.get(`${this.endpoint}/products`);
      console.log('Products response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
        throw new Error('No se pudo conectar con el servidor. Por favor, verifica que el backend esté corriendo.');
      }
      throw error;
    }
  }

  async createProduct(product) {
    try {
      const formattedProduct = {
        name: product.name,
        description: product.description,
        purchasePrice: product.purchasePrice,
        salePrice: product.salePrice,
        internalNotes: product.internalNotes,
        categoryId: product.categoryId,
        unitId: product.unitId,
        tagIds: product.tagIds || []
      };
      
      const response = await http.post(`${this.endpoint}/products`, formattedProduct);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }

  async updateProduct(id, productData) {
    return http.put(`${this.endpoint}/products/${id}`, productData);
  }

  async deleteProduct(id) {
    return http.delete(`${this.endpoint}/products/${id}`);
  }

  async getProductById(id) {
    return http.get(`${this.endpoint}/products/${id}`);
  }

  async getCategories() {
    try {
      const response = await http.get(`${this.endpoint}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  }

  async getUnits() {
    try {
      const response = await http.get(`${this.endpoint}/units`);
      return response.data;
    } catch (error) {
      console.error('Error fetching units:', error);
      throw error;
    }
  }

  async getTags() {
    try {
      const response = await http.get(`${this.endpoint}/tags`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }
}

export default new ProductApiService(); 