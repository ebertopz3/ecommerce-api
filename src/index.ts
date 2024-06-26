import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import swaggerUi from "swagger-ui-express";
import swaggerSpec from './swagger';
import router from '@routes/indexrouter/indexrouter'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}
const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))
const port = process.env.PORT ?? 5000

/***** Routes ******/
app.use(router)

/**** Implement swagger ****/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port, () => {
  console.log(`Server running on port ${ port }`)
})
