import http from '../../../shared/http-common';
import { API_CONFIG, CURRENT_ENV } from '../../../../api.config';

export async function fetchProducts() {
    try {
        // Cambiar a endpoint de inventario por producto
        const response = await http.get('/api/v1/inventory/by-product');
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function createProduct(product) {
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
        const response = await http.post(API_CONFIG[CURRENT_ENV].ENDPOINTS.PRODUCTS, formattedProduct);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

export async function updateProduct(id, product) {
    try {
        const response = await http.put(`${API_CONFIG[CURRENT_ENV].ENDPOINTS.PRODUCTS}/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

export async function deleteProduct(id) {
    try {
        await http.delete(`${API_CONFIG[CURRENT_ENV].ENDPOINTS.PRODUCTS}/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

export async function createInventoryByProduct(body) {
    try {
        console.log('Body enviado a inventario:', body);
        const response = await http.post('/api/v1/inventory/by-product', body);
        return response.data;
    } catch (error) {
        console.error('Error creando inventario por producto:', error);
        throw error;
    }
}