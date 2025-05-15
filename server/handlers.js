export const mockUsers = [
    {
        id: 1,
        email: "example@mail.com",
        password: "password123",
        first_name: "Test",
        last_name: "User"
    }
];

export const authHandlers = {
    register: (userData) => {
        const userExists = mockUsers.some(user => user.email === userData.email);
        if (userExists) throw new Error('Email already registered');

        const newUser = {
            id: mockUsers.length + 1,
            ...userData,
            first_name: userData.first_name,
            last_name: userData.last_name
        };

        mockUsers.push(newUser);
        return { user: newUser };
    },

    login: (credentials) => {
        const user = mockUsers.find(u =>
            u.email === credentials.email &&
            u.password === credentials.password
        );

        if (!user) throw new Error('Invalid credentials');
        return { user };
    }
};