export class User {
    constructor({ name, email, role, password }) {
        this.name = name;
        this.email = email;
        this.role = role || 'user';
        this.password = password;
        this.createdAt = new Date().toISOString();
    }

    toJSON() {
        return {
            name: this.name,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt

        };
    }
}