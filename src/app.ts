import 'dotenv/config'

import swaggerUi from 'swagger-ui-express'
import express from 'express'
import cors from 'cors'

import routes from './routes'
import swaggerDocs from './swagger.json'

class App {
    server: any
    
    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(cors())
        this.server.use(express.json())
    }

    routes() {
        this.server.use('/v1', routes)
        this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    }
}

export default new App().server