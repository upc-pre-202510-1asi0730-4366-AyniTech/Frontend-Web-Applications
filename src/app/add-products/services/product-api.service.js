import http from '@/shared/http-common';
import axios from 'axios';

const API_URL = 'https://stockwise-a4g5evcsbyh9c3df.centralus-01.azurewebsites.net/api/v1';

export class ProductApiService {
  constructor() {
    this.endpoint = 'https://stockwise-a4g5evcsbyh9c3df.centralus-01.azurewebsites.net/api/products';
  }

  async getAllProducts() {
    return http.get(this.endpoint);
  }

  async createProduct(product) {
    // Asegurarnos que los IDs sean números
    const formattedProduct = {
      ...product,
      categoryId: Number(product.categoryId),
      unitId: Number(product.unitId),
      purchasePrice: Number(product.purchasePrice),
      salePrice: Number(product.salePrice),
      tagIds: product.tagIds.map(id => Number(id))
    };
    
    return await axios.post(`${API_URL}/products`, formattedProduct);
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
    return http.get(`${this.endpoint}/categories`);
  }

  async getUnits() {
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

  async getTags() {
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

export default new ProductApiService(); 