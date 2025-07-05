export class StockAlert {
    constructor({ id, alert_type, product_category, product_name, alert_date, severity, details }) {
        this.id = id;
        this.alert_type = alert_type;
        this.product_category = product_category;
        this.product_name = product_name;
        this.alert_date = alert_date;
        this.severity = severity;
        this.details = details;
    }
}