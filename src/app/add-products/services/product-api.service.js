import http from '@/app/shared/services/http.instance';
import { API_CONFIG, CURRENT_ENV } from '@config/api.config';

const endpoints = API_CONFIG[CURRENT_ENV].ENDPOINTS;

class ProductApiService {
  async getAllProducts() {
    try {
      const response = await http.get(endpoints.PRODUCTS);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
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
      
      const response = await http.post(endpoints.PRODUCTS, formattedProduct);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }

  async updateProduct(id, productData) {
    try {
      const response = await http.put(`${endpoints.PRODUCTS}/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const response = await http.delete(`${endpoints.PRODUCTS}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await http.get(`${endpoints.PRODUCTS}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  }

  async getCategories() {
    try {
      const response = await http.get(endpoints.CATEGORIES);
      return response.data;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  }

  async getUnits() {
    try {
      const response = await http.get(endpoints.UNITS);
      return response.data;
    } catch (error) {
      console.error('Error al obtener unidades:', error);
      throw error;
    }
  }

  async getTags() {
    try {
      const response = await http.get(endpoints.TAGS);
      return response.data;
    } catch (error) {
      console.error('Error al obtener etiquetas:', error);
      throw error;
    }
  }
}

export default new ProductApiService(); 