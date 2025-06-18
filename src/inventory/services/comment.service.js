import httpInstance from "../../shared/services/http.instance.js"

export class CommentService {
    resourceEndpoint = import.meta.env.VITE_COMMENTS_ENDPOINT_PATH

    getAllByLotId(lotId) {
        return httpInstance.get(`${this.resourceEndpoint}?lotId=${lotId}`);
    }

    create(comment) {
        return httpInstance.post(this.resourceEndpoint, comment);
    }
}