export const API_CONFIG = {
    PROD: {
        BASE_URL: 'https://stockwise-a4g5evcsbyh9c3df.centralus-01.azurewebsites.net',
        ENDPOINTS: {
            ALERTS: '/api/alerts',
            PRODUCTS: '/api/v1/products',
            CATEGORIES: '/api/v1/categories',
            UNITS: '/api/v1/units',
            TAGS: '/api/v1/tags',
            INVENTORY: '/api/v1/inventory',
            COMBOS: '/api/v1/combos',
            REPORTS: {
                BASE: '/api/v1/reports',
                CATEGORY: '/api/v1/reports/category',
                CATEGORY_BY_DATE: '/api/v1/reports/category/by-date',
                STOCK_AVERAGE: '/api/v1/reports/stock-average',
                STOCK_AVERAGE_BY_DATE: '/api/v1/reports/stock-average/by-date'
            },
            AUTH: {
                SIGN_UP: '/api/v1/authentication/sign-up',
                SIGN_IN: '/api/v1/authentication/sign-in'
            }
        }
    },
    LOCAL: {
        BASE_URL: 'http://localhost:5159',
        ENDPOINTS: {
            ALERTS: '/api/alerts',
            PRODUCTS: '/api/v1/products',
            CATEGORIES: '/api/v1/categories',
            UNITS: '/api/v1/units',
            TAGS: '/api/v1/tags',
            INVENTORY: '/api/v1/inventory',
            COMBOS: '/api/v1/combos',
            REPORTS: {
                BASE: '/api/v1/reports',
                CATEGORY: '/api/v1/reports/category',
                CATEGORY_BY_DATE: '/api/v1/reports/category/by-date',
                STOCK_AVERAGE: '/api/v1/reports/stock-average',
                STOCK_AVERAGE_BY_DATE: '/api/v1/reports/stock-average/by-date'
            },
            AUTH: {
                SIGN_UP: '/api/v1/authentication/sign-up',
                SIGN_IN: '/api/v1/authentication/sign-in'
            }
        }
    }
}

export const CURRENT_ENV = 'PROD';
