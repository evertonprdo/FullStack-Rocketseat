import http from 'node:http'

import { jsonBodyHandler } from './middlewares/json-body-handler.ts'
import { RouteModule } from './routes/routes.module.ts'
import { JsonDatabaseModule } from './json-db/json-db.module.ts'

const database = new JsonDatabaseModule()
const routes = new RouteModule(database)

const server = http.createServer(async (request, response) => {
   await jsonBodyHandler(request, response)
   routes.handler(request, response)
})

server.listen(3333)
