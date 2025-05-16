const config = {
    baseURL: import.meta.env.VITE_API_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT,
    useMock: import.meta.env.VITE_API_MOCK === 'true'
}

export default config