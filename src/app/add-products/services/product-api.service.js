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
    const formattedProduct = {
      name: product.name?.trim() || '',
      description: product.description?.trim() || '',
      purchasePrice: Number(product.purchasePrice) || 0,
      salePrice: Number(product.salePrice) || 0,
      internalNotes: product.internalNotes?.trim() || '',
      categoryId: Number(product.categoryId) || 0,
      unitId: Number(product.unitId) || 0,
      tagIds: Array.from(new Set((product.tagIds || []).map(Number)))
    };
    if (
      !formattedProduct.name ||
      !formattedProduct.description ||
      !formattedProduct.purchasePrice ||
      !formattedProduct.salePrice ||
      !formattedProduct.categoryId ||
      !formattedProduct.unitId
    ) {
      alert('Completa todos los campos obligatorios.');
      throw new Error('Campos obligatorios incompletos');
    }
    try {
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
      const response = await http.get(`/api/v1/units`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener unidades:', error);
      return {
        data: [
          { id: 1, name: 'Mililitros', abbreviation: 'ml' },
          { id: 2, name: 'Litros', abbreviation: 'L' },
          { id: 3, name: 'Gramos', abbreviation: 'g' },
          { id: 4, name: 'Kilogramos', abbreviation: 'kg' },
          { id: 5, name: 'Unidades', abbreviation: 'und' },
          { id: 6, name: 'Paquetes', abbreviation: 'paq' },
          { id: 7, name: 'Botellas', abbreviation: 'bot' },
          { id: 8, name: 'Latas', abbreviation: 'lat' },
          { id: 9, name: 'Cajas', abbreviation: 'caj' },
          { id: 10, name: 'Docenas', abbreviation: 'doc' },
          { id: 11, name: 'Metros', abbreviation: 'm' },
          { id: 12, name: 'Piezas', abbreviation: 'pz' }
        ]
      };
    }
  }

  async getTags() {
       try {
      const response = await http.get(`${this.endpoint}/tags`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener etiquetas:', error);
      return {
        data: [
          { id: 1, name: 'Orgánico' },
          { id: 2, name: 'Sin Gluten' },
          { id: 3, name: 'Vegano' },
          { id: 4, name: 'Light' },
          { id: 5, name: 'Premium' },
          { id: 6, name: 'Promoción' },
          { id: 7, name: 'Nuevo' },
          { id: 8, name: 'Descontinuado' },
          { id: 9, name: 'Temporada' },
          { id: 10, name: 'Local' },
          { id: 11, name: 'Importado' },
          { id: 12, name: 'Artesanal' },
          { id: 13, name: 'Sin Azúcar' },
          { id: 14, name: 'Bajo en Sodio' },
          { id: 15, name: 'Rica en Fibra' }
        ]
      };
    }
  }
}

export default new ProductApiService(); 