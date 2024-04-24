import config from './config.js';

const port = config.port;

export const swaggerConfig = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Product and Cart API',
            description: 'Documentation for the API endpoints related to products and carts',
            version: '1.0.0'
        }
    },
    apis: ['src/docs/**/*.yaml']
}