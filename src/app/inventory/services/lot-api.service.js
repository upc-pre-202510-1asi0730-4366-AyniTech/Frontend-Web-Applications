import httpInstance from '../../shared/services/http.instance.js'
import NewLot from '../models/NewLot.entity.js'

/**
 * @class LotService
 * @description Service for managing lot-related API operations
 */
export class LotService {
    /** @type {string} API endpoint path */
    resourceEndpoint = import.meta.env.VITE_LOT_ENDPOINT_PATH

    /**
     * Retrieves all lots
     * @returns {Promise<NewLot[]>}
     */
    async getAll() {
        const res = await httpInstance.get(this.resourceEndpoint)
        return res.data.map(lot => new NewLot(lot))
    }

    /**
     * Retrieves a lot by ID
     * @param {string} id
     * @returns {Promise<NewLot>}
     */
    async getById(id) {
        const res = await httpInstance.get(`${this.resourceEndpoint}/${id}`)
        return new NewLot(res.data)
    }

    /**
     * Creates a new lot
     * @param {NewLot} lot
     * @returns {Promise<NewLot>}
     */
    async create(lot) {
        const res = await httpInstance.post(this.resourceEndpoint, lot)
        return new NewLot(res.data)
    }

    /**
     * Updates a lot by ID
     * @param {string} id
     * @param {NewLot} lot
     * @returns {Promise<NewLot>}
     */
    async update(id, lot) {
        const res = await httpInstance.put(`${this.resourceEndpoint}/${id}`, lot)
        return new NewLot(res.data)
    }

    /**
     * Deletes a lot by ID
     * @param {string} id
     * @returns {Promise<void>}
     */
    async delete(id) {
        await httpInstance.delete(`${this.resourceEndpoint}/${id}`)
    }

    /**
     * Retrieves lots by supplier (proveedor)
     * @param {string} proveedor
     * @returns {Promise<NewLot[]>}
     */
    async getByProveedor(proveedor) {
        const res = await httpInstance.get(`${this.resourceEndpoint}?proveedor=${proveedor}`);
        return res.data.map(l => new NewLot(l));
    }
}