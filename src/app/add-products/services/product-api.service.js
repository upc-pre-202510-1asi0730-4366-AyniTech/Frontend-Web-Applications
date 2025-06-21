import http from '@/shared/http-common';
import { productHandlers } from '../../../../server/handlers.js';

const useMockAPI = import.meta.env.VITE_USE_MOCK_API === 'true';

// Mock data para productos
const mockProducts = [
  {
    id: 1,
    name: 'Galleta de Chocolate',
    category: 'Golosina',
    stock: 20,
    quantity: 50,
    buyPrice: 0.50,
    sellPrice: 1.00,
    batch: 'LOTE001',
    expiryDate: '2024-12-25',
    notes: 'Galletas rellenas de chocolate',
    tags: ['Dulce', 'Chocolate', 'Rellenas']
  },
  {
    id: 2,
    name: 'Galleta de Vainilla',
    category: 'Golosina',
    stock: 15,
    quantity: 30,
    buyPrice: 0.45,
    sellPrice: 0.90,
    batch: 'LOTE002',
    expiryDate: '2025-01-20',
    notes: 'Galletas de vainilla tradicionales',
    tags: ['Dulce', 'Vainilla']
  },
  {
    id: 3,
    name: 'Galleta Salada',
    category: 'Golosina',
    stock: 25,
    quantity: 40,
    buyPrice: 0.40,
    sellPrice: 0.80,
    batch: 'LOTE003',
    expiryDate: '2025-02-15',
    notes: 'Galletas saladas para aperitivos',
    tags: ['Salado', 'Galletas']
  }
];

export class ProductApiService {
  constructor() {
    this.endpoint = '/api/products';
  }

  async getAllProducts() {
    if (useMockAPI) {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve(productHandlers.getAllProducts());
    }
    return http.get(this.endpoint);
  }

  async createProduct(productData) {
    if (useMockAPI) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return Promise.resolve(productHandlers.createProduct(productData));
    }
    return http.post(this.endpoint, productData);
  }

  async updateProduct(id, productData) {
    if (useMockAPI) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return Promise.resolve(productHandlers.updateProduct(id, productData));
    }
    return http.put(`${this.endpoint}/${id}`, productData);
  }

  async deleteProduct(id) {
    if (useMockAPI) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve(productHandlers.deleteProduct(id));
    }
    return http.delete(`${this.endpoint}/${id}`);
  }

  async getProductsByFilter(filters) {
    if (useMockAPI) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return Promise.resolve(productHandlers.getProductsByFilter(filters));
    }
    return http.get(`${this.endpoint}/filter`, { params: filters });
  }

  async getProductById(id) {
    if (useMockAPI) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return Promise.resolve(productHandlers.getProductById(id));
    }
    return http.get(`${this.endpoint}/${id}`);
  }
}

export default new ProductApiService(); 