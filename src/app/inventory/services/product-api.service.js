import http from '../../../shared/http-common';
import { API_CONFIG, CURRENT_ENV } from '../../../../api.config';

export async function fetchProducts() {
    try {
        const response = await http.get(API_CONFIG[CURRENT_ENV].ENDPOINTS.PRODUCTS);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function createProduct(product) {
    try {
        const response = await http.post(API_CONFIG[CURRENT_ENV].ENDPOINTS.PRODUCTS, product);
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