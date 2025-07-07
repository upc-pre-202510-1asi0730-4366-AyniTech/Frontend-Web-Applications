import http from '@/shared/http-common';

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
      const response = await http.get(`${this.endpoint}/units`);
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