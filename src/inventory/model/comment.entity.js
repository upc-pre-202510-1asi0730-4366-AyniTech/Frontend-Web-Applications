/**
 * @entity Comment
 * @summary Comment entity model.
 * @description Representa un comentario asociado a un lote y producto, con información de usuario, texto y fecha de creación.
 * @author Tu Nombre
 */
export class Comment {
    constructor({
                    id = 0,
                    lotId = 0,
                    product = "",
                    user = "",
                    text = "",

                }) {
        this.id = id;
        this.lotId = lotId;
        this.product = product;
        this.user = user;
        this.text = text;
    }
}