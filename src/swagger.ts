import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eberto Polo Ecommerce API Documentation',
      version: '1.0.0',
    },
  },
  apis: [
    `${ path.join(__dirname, './routes/public/*') }`,
    `${ path.join(__dirname, './routes/v1/*') }`,
    `${ path.join(__dirname, './routes/indexrouter/*') }`
  ],
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec