import http from 'node:http'

import { jsonHandler } from './middlewares/json-handler.js'
import { routeHandler } from './middlewares/route-handler.js'

async function listener(request, response) {
   await jsonHandler(request, response)

   routeHandler(request, response)
   return response.end()
}

http.createServer(listener).listen(3333)
