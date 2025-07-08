import http from '@/app/shared/services/http.instance';
import { API_CONFIG, CURRENT_ENV } from '@config/api.config';

class KitProductsService {
  constructor() {
    this.endpoint = API_CONFIG[CURRENT_ENV].ENDPOINTS.INVENTORY;
    this.comboEndpoint = API_CONFIG[CURRENT_ENV].ENDPOINTS.COMBOS;
  }

  async getInventoryProducts() {
    try {
      const response = await http.get(`${this.endpoint}/by-product`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos del inventario:', error);
      throw error;
    }
  }

  async createCombo(combo) {
    try {
      const response = await http.post(`${this.comboEndpoint}`, combo);
      return response.data;
    } catch (error) {
      console.error('Error al crear el combo:', error);
      throw error;
    }
  }

  async getAllCombos() {
    try {
      const response = await http.get(`${this.comboEndpoint}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los combos:', error);
      throw error;
    }
  }
}

export default new KitProductsService();