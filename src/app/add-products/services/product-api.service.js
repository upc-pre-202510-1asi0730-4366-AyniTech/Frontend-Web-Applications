import http from '@/app/shared/services/http.instance';

class ProductApiService {
  constructor() {
    this.endpoint = '/api/v1';
  }

  async getAllProducts() {
    return http.get(this.endpoint);
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
    return http.put(`${this.endpoint}/${id}`, productData);
  }

  async deleteProduct(id) {
    return http.delete(`${this.endpoint}/${id}`);
  }

  async getProductById(id) {
    return http.get(`${this.endpoint}/${id}`);
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
      const response = await http.get('/api/v1/units');
      return response.data;
    } catch (error) {
      console.error('Error fetching units:', error);
      throw error;
    }
  }

  async getTags() {
    try {
      const response = await http.get('/api/v1/tags');
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const response = await http.get('/api/v1/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      const response = await http.post('/api/v1/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
}

export default new ProductApiService(); 