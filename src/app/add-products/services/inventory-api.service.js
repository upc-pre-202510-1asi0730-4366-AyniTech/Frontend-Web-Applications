import http from '@/shared/http-common';
import { API_CONFIG, CURRENT_ENV } from '../../../../api.config';

class InventoryApiService {
  constructor() {
    this.endpoint = '/api/v1/inventory';
  }

  async createInventory(inventoryData) {
    try {
      // Formatear los datos según el formato esperado por el API
      const formattedData = {
        categoria: inventoryData.categoria,
        producto: inventoryData.producto,
        fechaEntrada: inventoryData.entryDate,
        cantidad: {
          value: Number(inventoryData.quantity)
        },
        precio: {
          value: Number(inventoryData.price)
        },
        stockMinimo: {
          value: Number(inventoryData.minStock)
        },
        unidadMedida: {
          value: inventoryData.unitName
        }
      };

      console.log('Enviando datos de inventario:', formattedData);

      const response = await http.post(
        API_CONFIG[CURRENT_ENV].ENDPOINTS.INVENTORY + '/by-product',
        formattedData
      );
      return response.data;
    } catch (error) {
      console.error('Error al crear inventario:', error);
      throw error;
    }
  }

  async deleteProductInventory(id) {
    try {
      const response = await http.delete(
        API_CONFIG[CURRENT_ENV].ENDPOINTS.INVENTORY + `/by-product/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error al eliminar inventario por producto:', error);
      throw error;
    }
  }

  async deleteBatchInventory(id) {
    try {
      const response = await http.delete(
        API_CONFIG[CURRENT_ENV].ENDPOINTS.INVENTORY + `/by-batch/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error al eliminar inventario por lote:', error);
      throw error;
    }
  }
}

export default new InventoryApiService(); 